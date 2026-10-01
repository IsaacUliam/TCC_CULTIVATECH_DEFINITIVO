import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { api } from "../services/api";

export interface SensorHistoryRecord {
  id: string;
  deviceCode: string;
  recordedAt: string;
  temperature: number | null;
  ph: number | null;
  nutrients: number | null;
}

type VariableFilter = "Todas" | "Temperatura" | "pH" | "Nutrientes";
type PeriodFilter = "7 dias" | "30 dias" | "90 dias";
type SelectedPeriod = PeriodFilter | "Personalizado";

interface HistoryScreenProps {
  navigation?: any;
  route?: {
    params?: {
      gardenName?: string | null;
      deviceCode?: string | null;
    };
  };
  gardenName?: string | null;
  deviceCode?: string | null;
}

const variableFilters: VariableFilter[] = [
  "Todas",
  "Temperatura",
  "pH",
  "Nutrientes",
];
const periodFilters: PeriodFilter[] = ["7 dias", "30 dias", "90 dias"];

const bottomTabs = [
  {
    key: "inicio",
    label: "Início",
    icon: "home",
    routes: ["Dashboard", "Inicio", "Início"],
    active: false,
  },
  {
    key: "horta",
    label: "Horta",
    icon: "sprout",
    routes: ["Crops", "Horta", "CropsScreen"],
    active: false,
  },
  {
    key: "historico",
    label: "Histórico",
    icon: "chart-bar",
    routes: ["History", "Historico", "Histórico", "HistoryScreen"],
    active: true,
  },
  {
    key: "configuracoes",
    label: "Config.",
    icon: "cog-outline",
    routes: ["Configuracoes", "Configurações", "Config", "Settings"],
    active: false,
  },
] as const;

function toIsoDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDateDaysAgo(days: number) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return toIsoDate(date);
}

function toBrazilianDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-");
  return year && month && day ? `${day}/${month}/${year}` : "";
}

function parseBrazilianDate(value: string) {
  const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return null;

  const [, day, month, year] = match;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day));
  if (
    parsed.getFullYear() !== Number(year) ||
    parsed.getMonth() !== Number(month) - 1 ||
    parsed.getDate() !== Number(day)
  ) {
    return null;
  }

  return toIsoDate(parsed);
}

function getRecordDateKey(recordedAt: string) {
  const date = new Date(recordedAt);
  if (Number.isNaN(date.getTime())) return null;
  return toIsoDate(date);
}

function formatDateTime(recordedAt: string) {
  const date = new Date(recordedAt);
  if (Number.isNaN(date.getTime())) return "Data indisponível";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function parseNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizeRecords(payload: any, fallbackDeviceCode: string) {
  const rows = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.readings)
      ? payload.readings
      : Array.isArray(payload?.data)
        ? payload.data
        : [];

  return rows
    .map((row: any, index: number): SensorHistoryRecord | null => {
      const recordedAt =
        row?.recorded_at ??
        row?.created_at ??
        row?.timestamp ??
        row?.date ??
        row?.measured_at;
      if (!recordedAt || Number.isNaN(new Date(recordedAt).getTime()))
        return null;

      return {
        id: String(row?.id ?? `${recordedAt}-${index}`),
        deviceCode: String(row?.device_code ?? fallbackDeviceCode),
        recordedAt: String(recordedAt),
        temperature: parseNullableNumber(row?.temp ?? row?.temperature),
        ph: parseNullableNumber(row?.ph),
        nutrients: parseNullableNumber(
          row?.salinity ?? row?.ce ?? row?.ec ?? row?.nutrients,
        ),
      };
    })
    .filter(
      (record: SensorHistoryRecord | null): record is SensorHistoryRecord =>
        Boolean(record),
    )
    .sort(
      (first: SensorHistoryRecord, second: SensorHistoryRecord) =>
        new Date(second.recordedAt).getTime() -
        new Date(first.recordedAt).getTime(),
    );
}

function formatReading(value: number | null, unit: string) {
  if (value === null) return "—";
  return unit ? `${value} ${unit}` : String(value);
}

function csvCell(value: string | number | null) {
  if (value === null) return "";
  const text = String(value).replace(/"/g, '""');
  return `"${text}"`;
}

export function HistoryScreen({
  navigation,
  route,
  gardenName: gardenNameProp,
  deviceCode: deviceCodeProp,
}: HistoryScreenProps) {
  const gardenName =
    gardenNameProp !== undefined
      ? gardenNameProp
      : (route?.params?.gardenName ?? null);
  const deviceCode =
    deviceCodeProp !== undefined
      ? deviceCodeProp
      : (route?.params?.deviceCode ?? null);
  const hasGarden = Boolean(gardenName?.trim() || deviceCode?.trim());

  const [records, setRecords] = useState<SensorHistoryRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [variable, setVariable] = useState<VariableFilter>("Todas");
  const [period, setPeriod] = useState<SelectedPeriod>("7 dias");
  const [retryCount, setRetryCount] = useState(0);
  const [fromDate, setFromDate] = useState(() => getDateDaysAgo(6));
  const [toDate, setToDate] = useState(() => toIsoDate(new Date()));
  const [fromDateInput, setFromDateInput] = useState(() =>
    toBrazilianDate(getDateDaysAgo(6)),
  );
  const [toDateInput, setToDateInput] = useState(() =>
    toBrazilianDate(toIsoDate(new Date())),
  );

  useEffect(() => {
    let isCurrent = true;

    async function loadHistory() {
      if (!hasGarden || !deviceCode?.trim()) {
        setRecords([]);
        setLoadError(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setLoadError(null);

      try {
        // Busca as leituras persistidas pelo endpoint usado pelo sensor.
        // O backend deve consultar o SQLite e retornar os registros do device_code.
        const response = await api.get("/sensor-readings", {
          params: { device_code: deviceCode.trim() },
        });
        if (!isCurrent) return;
        setRecords(normalizeRecords(response.data, deviceCode));
      } catch (error) {
        console.error("Erro ao consultar histórico de sensores:", error);
        if (!isCurrent) return;
        setRecords([]);
        setLoadError(
          "Não foi possível consultar o histórico salvo. Tente novamente.",
        );
      } finally {
        if (isCurrent) setIsLoading(false);
      }
    }

    loadHistory();
    return () => {
      isCurrent = false;
    };
  }, [deviceCode, hasGarden, retryCount]);

  const filteredRecords = useMemo(() => {
    return records.filter((record) => {
      const dateKey = getRecordDateKey(record.recordedAt);
      if (!dateKey || dateKey < fromDate || dateKey > toDate) return false;

      if (variable === "Temperatura") return record.temperature !== null;
      if (variable === "pH") return record.ph !== null;
      if (variable === "Nutrientes") return record.nutrients !== null;
      return true;
    });
  }, [fromDate, records, toDate, variable]);

  function navigateToRoute(routes: readonly string[]) {
    let currentNavigation = navigation;

    while (currentNavigation) {
      const availableRoutes = currentNavigation.getState?.()?.routeNames ?? [];
      const matchingRoute = routes.find((routeName) =>
        availableRoutes.includes(routeName),
      );

      if (matchingRoute) {
        currentNavigation.navigate(matchingRoute);
        return;
      }

      currentNavigation = currentNavigation.getParent?.();
    }
  }

  function choosePeriod(nextPeriod: PeriodFilter) {
    const days =
      nextPeriod === "7 dias" ? 7 : nextPeriod === "30 dias" ? 30 : 90;
    const nextFromDate = getDateDaysAgo(days - 1);
    const nextToDate = toIsoDate(new Date());

    setPeriod(nextPeriod);
    setFromDate(nextFromDate);
    setToDate(nextToDate);
    setFromDateInput(toBrazilianDate(nextFromDate));
    setToDateInput(toBrazilianDate(nextToDate));
  }

  function applyCustomDates() {
    const parsedFromDate = parseBrazilianDate(fromDateInput);
    const parsedToDate = parseBrazilianDate(toDateInput);

    if (!parsedFromDate || !parsedToDate) {
      Alert.alert("Confira as datas", "Digite as datas no formato DD/MM/AAAA.");
      return;
    }
    if (parsedFromDate > parsedToDate) {
      Alert.alert(
        "Período inválido",
        "A data inicial precisa ser anterior à data final.",
      );
      return;
    }

    setPeriod("Personalizado");
    setFromDate(parsedFromDate);
    setToDate(parsedToDate);
  }

  async function exportCsv() {
    if (filteredRecords.length === 0) {
      Alert.alert(
        "Sem leituras",
        "Não há registros para exportar neste filtro.",
      );
      return;
    }

    const lines = [
      [
        "Data e hora",
        "Dispositivo",
        "Temperatura (°C)",
        "pH",
        "Nutrientes (mS/cm)",
      ]
        .map(csvCell)
        .join(";"),
      ...filteredRecords.map((record) =>
        [
          formatDateTime(record.recordedAt),
          record.deviceCode,
          record.temperature,
          record.ph,
          record.nutrients,
        ]
          .map(csvCell)
          .join(";"),
      ),
    ];

    try {
      await Share.share({
        title: "Histórico Cultiva Tech — CSV",
        message: lines.join("\n"),
      });
    } catch (error) {
      console.error("Erro ao compartilhar CSV:", error);
      Alert.alert(
        "Exportação indisponível",
        "Não foi possível abrir o compartilhamento.",
      );
    }
  }

  function renderReading({ item }: { item: SensorHistoryRecord }) {
    const showTemperature = variable === "Todas" || variable === "Temperatura";
    const showPh = variable === "Todas" || variable === "pH";
    const showNutrients = variable === "Todas" || variable === "Nutrientes";

    return (
      <View style={styles.readingCard}>
        <View style={styles.readingHeader}>
          <View style={styles.readingDateIcon}>
            <Feather name="clock" size={16} color="#2E8B57" />
          </View>
          <View style={styles.readingHeaderText}>
            <Text style={styles.readingDate}>
              {formatDateTime(item.recordedAt)}
            </Text>
            <Text style={styles.readingDevice}>Sensor {item.deviceCode}</Text>
          </View>
          <Feather name="chevron-right" size={18} color="#94A197" />
        </View>

        <View style={styles.readingDivider} />
        <View style={styles.readingMetrics}>
          {showTemperature && (
            <View style={styles.readingMetric}>
              <View style={[styles.metricIcon, styles.temperatureIcon]}>
                <Feather name="thermometer" size={15} color="#D2693E" />
              </View>
              <Text style={styles.metricLabel}>Temperatura</Text>
              <Text style={styles.metricValue}>
                {formatReading(item.temperature, "°C")}
              </Text>
            </View>
          )}
          {showPh && (
            <View style={styles.readingMetric}>
              <View style={[styles.metricIcon, styles.phIcon]}>
                <MaterialCommunityIcons name="ph" size={16} color="#8466C8" />
              </View>
              <Text style={styles.metricLabel}>pH</Text>
              <Text style={styles.metricValue}>
                {formatReading(item.ph, "")}
              </Text>
            </View>
          )}
          {showNutrients && (
            <View style={styles.readingMetric}>
              <View style={[styles.metricIcon, styles.nutrientsIcon]}>
                <Feather name="zap" size={15} color="#BD8C16" />
              </View>
              <Text style={styles.metricLabel}>Nutrientes</Text>
              <Text style={styles.metricValue}>
                {formatReading(item.nutrients, "mS/cm")}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  const emptyMessage = !hasGarden
    ? {
        icon: "home" as const,
        title: "Sem Nenhuma Horta",
        description:
          "O histórico aparecerá aqui depois que uma horta e um sensor forem vinculados a esta conta.",
      }
    : !deviceCode?.trim()
      ? {
          icon: "bluetooth" as const,
          title: "Sensor não vinculado",
          description:
            "Conecte um sensor à horta para consultar as leituras gravadas.",
        }
      : loadError
        ? {
            icon: "alert-circle" as const,
            title: "Não foi possível carregar",
            description: loadError,
          }
        : {
            icon: "file-text" as const,
            title: "Nenhuma leitura neste período",
            description:
              "Ainda não há registros do sensor para as datas e variáveis selecionadas.",
          };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F4" />

      <FlatList
        data={filteredRecords}
        keyExtractor={(item) => item.id}
        renderItem={renderReading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.readingSeparator} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>CULTIVA TECH</Text>
                <Text style={styles.title}>Histórico</Text>
                <Text style={styles.subtitle}>
                  Relatório das leituras dos sensores
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <Feather name="bar-chart-2" size={22} color="#1F6B43" />
              </View>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Feather name="activity" size={19} color="#FFFFFF" />
              </View>
              <View style={styles.summaryCopy}>
                <Text style={styles.summaryTitle}>
                  {gardenName?.trim() || "Histórico da horta"}
                </Text>
                <Text style={styles.summaryDescription}>
                  {isLoading
                    ? "Consultando leituras salvas..."
                    : `${filteredRecords.length} ${filteredRecords.length === 1 ? "leitura no período" : "leituras no período"}`}
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.exportButton,
                  filteredRecords.length === 0 && styles.exportButtonDisabled,
                ]}
                onPress={exportCsv}
                disabled={filteredRecords.length === 0}
                accessibilityRole="button"
                accessibilityLabel="Exportar leituras filtradas para CSV"
              >
                <Feather name="download" size={15} color="#FFFFFF" />
                <Text style={styles.exportButtonText}>CSV</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filtersCard}>
              <View style={styles.filterHeading}>
                <View>
                  <Text style={styles.filterTitle}>Período</Text>
                  <Text style={styles.filterHint}>
                    Escolha um intervalo rápido
                  </Text>
                </View>
                <Feather name="calendar" size={17} color="#68806E" />
              </View>

              <View style={styles.periodOptions}>
                {periodFilters.map((item) => {
                  const selected = item === period;
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.periodChip,
                        selected && styles.periodChipSelected,
                      ]}
                      onPress={() => choosePeriod(item)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.periodChipText,
                          selected && styles.periodChipTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <View style={styles.dateInputsRow}>
                <View style={styles.dateInputGroup}>
                  <Text style={styles.dateInputLabel}>De</Text>
                  <TextInput
                    value={fromDateInput}
                    onChangeText={setFromDateInput}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#9AA69D"
                    keyboardType="numbers-and-punctuation"
                    style={styles.dateInput}
                    accessibilityLabel="Data inicial, formato dia mês ano"
                  />
                </View>
                <Feather name="arrow-right" size={16} color="#91A095" />
                <View style={styles.dateInputGroup}>
                  <Text style={styles.dateInputLabel}>Até</Text>
                  <TextInput
                    value={toDateInput}
                    onChangeText={setToDateInput}
                    placeholder="DD/MM/AAAA"
                    placeholderTextColor="#9AA69D"
                    keyboardType="numbers-and-punctuation"
                    style={styles.dateInput}
                    accessibilityLabel="Data final, formato dia mês ano"
                  />
                </View>
                <TouchableOpacity
                  style={styles.applyDateButton}
                  onPress={applyCustomDates}
                  accessibilityRole="button"
                  accessibilityLabel="Aplicar intervalo de datas"
                >
                  <Feather name="check" size={17} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.filterDivider} />
              <View style={styles.filterHeading}>
                <View>
                  <Text style={styles.filterTitle}>Variável</Text>
                  <Text style={styles.filterHint}>
                    Filtre os dados exibidos
                  </Text>
                </View>
                <Feather name="sliders" size={17} color="#68806E" />
              </View>

              <View style={styles.variableOptions}>
                {variableFilters.map((item) => {
                  const selected = item === variable;
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.variableChip,
                        selected && styles.variableChipSelected,
                      ]}
                      onPress={() => setVariable(item)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.variableChipText,
                          selected && styles.variableChipTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Leituras</Text>
                <Text style={styles.sectionSubtitle}>
                  {toBrazilianDate(fromDate)} — {toBrazilianDate(toDate)}
                </Text>
              </View>
              {isLoading && <ActivityIndicator size="small" color="#2E8B57" />}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              {isLoading ? (
                <ActivityIndicator size="small" color="#2E8B57" />
              ) : (
                <Feather name={emptyMessage.icon} size={23} color="#6E8774" />
              )}
            </View>
            <Text style={styles.emptyTitle}>
              {isLoading ? "Carregando histórico" : emptyMessage.title}
            </Text>
            <Text style={styles.emptyDescription}>
              {isLoading
                ? "Buscando as leituras salvas no banco de dados."
                : emptyMessage.description}
            </Text>
            {!!loadError && hasGarden && !!deviceCode && (
              <TouchableOpacity
                style={styles.retryButton}
                onPress={() => setRetryCount((previous) => previous + 1)}
                accessibilityRole="button"
              >
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      <View style={styles.bottomBar}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.bottomTab, tab.active && styles.bottomTabActive]}
            onPress={() => navigateToRoute(tab.routes)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.active }}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={22}
              color={tab.active ? "#D3F1BB" : "#B3C9B8"}
            />
            <Text
              style={[
                styles.bottomTabLabel,
                tab.active && styles.bottomTabLabelActive,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F6F8F4",
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 20,
    paddingTop: 56,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  eyebrow: {
    color: "#66806E",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    color: "#183B2A",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  subtitle: {
    color: "#748579",
    fontSize: 13,
    fontWeight: "500",
    marginTop: 4,
  },
  headerIcon: {
    alignItems: "center",
    backgroundColor: "#E5F3E8",
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  summaryCard: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 20,
    flexDirection: "row",
    marginTop: 20,
    padding: 15,
  },
  summaryIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  summaryCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  summaryTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  summaryDescription: {
    color: "#D4EFD9",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 3,
  },
  exportButton: {
    alignItems: "center",
    backgroundColor: "#2E8B57",
    borderRadius: 11,
    flexDirection: "row",
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  exportButtonDisabled: {
    opacity: 0.45,
  },
  exportButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  filtersCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 16,
    padding: 16,
  },
  filterHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterTitle: {
    color: "#1D382A",
    fontSize: 14,
    fontWeight: "800",
  },
  filterHint: {
    color: "#849187",
    fontSize: 10,
    marginTop: 2,
  },
  periodOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  periodChip: {
    backgroundColor: "#F2F5F2",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  periodChipSelected: {
    backgroundColor: "#E4F3E8",
  },
  periodChipText: {
    color: "#718176",
    fontSize: 11,
    fontWeight: "700",
  },
  periodChipTextSelected: {
    color: "#21613D",
  },
  dateInputsRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 13,
  },
  dateInputGroup: {
    flex: 1,
  },
  dateInputLabel: {
    color: "#7A8C7E",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 5,
  },
  dateInput: {
    backgroundColor: "#F7F9F7",
    borderColor: "#E2E9E3",
    borderRadius: 10,
    borderWidth: 1,
    color: "#294A34",
    fontSize: 11,
    minHeight: 39,
    paddingHorizontal: 9,
  },
  applyDateButton: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 11,
    height: 39,
    justifyContent: "center",
    marginTop: 18,
    width: 40,
  },
  filterDivider: {
    backgroundColor: "#EDF1ED",
    height: 1,
    marginVertical: 16,
  },
  variableOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 12,
  },
  variableChip: {
    backgroundColor: "#F2F5F2",
    borderRadius: 10,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  variableChipSelected: {
    backgroundColor: "#1F6B43",
  },
  variableChipText: {
    color: "#718176",
    fontSize: 11,
    fontWeight: "700",
  },
  variableChipTextSelected: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
    marginTop: 24,
  },
  sectionTitle: {
    color: "#1D382A",
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#7A8C7E",
    fontSize: 10,
    marginTop: 3,
  },
  readingCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 18,
    borderWidth: 1,
    padding: 14,
  },
  readingHeader: {
    alignItems: "center",
    flexDirection: "row",
  },
  readingDateIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 11,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  readingHeaderText: {
    flex: 1,
    marginLeft: 10,
  },
  readingDate: {
    color: "#1D382A",
    fontSize: 12,
    fontWeight: "800",
  },
  readingDevice: {
    color: "#829086",
    fontSize: 10,
    marginTop: 3,
  },
  readingDivider: {
    backgroundColor: "#EDF1ED",
    height: 1,
    marginVertical: 12,
  },
  readingMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  readingMetric: {
    backgroundColor: "#F8FAF8",
    borderRadius: 12,
    flex: 1,
    minWidth: "30%",
    padding: 10,
  },
  metricIcon: {
    alignItems: "center",
    borderRadius: 9,
    height: 29,
    justifyContent: "center",
    width: 29,
  },
  temperatureIcon: {
    backgroundColor: "#FFF0E8",
  },
  phIcon: {
    backgroundColor: "#F0EAFF",
  },
  nutrientsIcon: {
    backgroundColor: "#FFF6DB",
  },
  metricLabel: {
    color: "#79887D",
    fontSize: 9,
    fontWeight: "600",
    marginTop: 7,
  },
  metricValue: {
    color: "#1D382A",
    fontSize: 12,
    fontWeight: "800",
    marginTop: 3,
  },
  readingSeparator: {
    height: 9,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 22,
    paddingVertical: 24,
  },
  emptyIcon: {
    alignItems: "center",
    backgroundColor: "#EEF4EF",
    borderRadius: 20,
    height: 58,
    justifyContent: "center",
    width: 58,
  },
  emptyTitle: {
    color: "#294A34",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 13,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#748579",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#1F6B43",
    borderRadius: 12,
    marginTop: 14,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  bottomBar: {
    alignItems: "center",
    backgroundColor: "#123F2A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 14,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  bottomTab: {
    alignItems: "center",
    borderRadius: 14,
    flex: 1,
    justifyContent: "center",
    minHeight: 52,
    paddingVertical: 5,
  },
  bottomTabActive: {
    backgroundColor: "#245A3D",
  },
  bottomTabLabel: {
    color: "#B3C9B8",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 3,
  },
  bottomTabLabelActive: {
    color: "#E3F5D4",
    fontWeight: "800",
  },
});
