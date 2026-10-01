import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";
import { api } from "../services/api";

const screenWidth = Dimensions.get("window").width;
const HORIZONTAL_PADDING = 20;

const bottomTabs = [
  {
    key: "inicio",
    label: "Início",
    icon: "home",
    routes: ["Dashboard", "Inicio", "Início"],
    active: true,
  },
  {
    key: "horta",
    label: "Horta",
    icon: "sprout",
    routes: ["Crops"],
    active: false,
  },
  {
    key: "historico",
    label: "Histórico",
    icon: "chart-bar",
    routes: ["Historico", "Histórico", "History"],
    active: false,
  },
  {
    key: "configuracoes",
    label: "Config.",
    icon: "cog-outline",
    routes: ["Configuracoes", "Configurações", "Config", "Settings"],
    active: false,
  },
] as const;

interface TelemetryData {
  temp: number;
  ph: number;
  salinity: number;
  statusText: string;
  healthHistory: HealthHistoryPoint[];
}

interface DashboardScreenProps {
  navigation: any;
  route?: {
    params?: {
      userName?: string;
      gardenName?: string | null;
      monitoringEnabled?: boolean;
    };
  };
  userName?: string | null;
  gardenName?: string | null;
  monitoringEnabled?: boolean;
}

interface HealthHistoryPoint {
  dateKey: string;
  label: string;
  healthy: boolean;
}

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function createInitialHealthHistory(): HealthHistoryPoint[] {
  const exampleStatuses = [true, true, false, true, true, true, true];
  const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return exampleStatuses.map((healthy, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - (exampleStatuses.length - 1 - index));

    return {
      dateKey: getLocalDateKey(date),
      label:
        index === exampleStatuses.length - 1 ? "Hoje" : weekdays[date.getDay()],
      healthy,
    };
  });
}

function isHydroponicReadingHealthy({
  temp,
  ph,
  salinity,
}: Pick<TelemetryData, "temp" | "ph" | "salinity">) {
  return (
    temp >= 20 &&
    temp <= 30 &&
    ph >= 5.8 &&
    ph <= 6.8 &&
    salinity >= 1.2 &&
    salinity <= 2.0
  );
}

interface MetricCardProps {
  icon: keyof typeof Feather.glyphMap;
  iconColor: string;
  iconBackground: string;
  label: string;
  value: string;
  unit?: string;
  status: string;
  statusColor: string;
}

function MetricCard({
  icon,
  iconColor,
  iconBackground,
  label,
  value,
  unit,
  status,
  statusColor,
}: MetricCardProps) {
  return (
    <View style={styles.metricCard}>
      <View style={styles.metricCardTop}>
        <View style={[styles.metricIcon, { backgroundColor: iconBackground }]}>
          <Feather name={icon} size={18} color={iconColor} />
        </View>
        <View
          style={[styles.metricStatusDot, { backgroundColor: statusColor }]}
        />
      </View>

      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        <Text style={styles.metricValue}>{value}</Text>
        {!!unit && <Text style={styles.metricUnit}>{unit}</Text>}
      </View>
      <Text style={[styles.metricStatus, { color: statusColor }]}>
        {status}
      </Text>
    </View>
  );
}

export function DashboardScreen({
  navigation,
  route,
  userName: userNameProp,
  gardenName: gardenNameProp,
  monitoringEnabled: monitoringEnabledProp,
}: DashboardScreenProps) {
  const [loading, setLoading] = useState(false);
  const userName =
    userNameProp?.trim() || route?.params?.userName?.trim() || "Cultivador";
  const gardenName =
    gardenNameProp !== undefined ? gardenNameProp : route?.params?.gardenName;
  const hasGarden = Boolean(gardenName?.trim());
  const isMonitoringActive = Boolean(
    hasGarden &&
      (monitoringEnabledProp ?? route?.params?.monitoringEnabled ?? false),
  );
  const [telemetry, setTelemetry] = useState<TelemetryData>({
    temp: 26,
    ph: 6.2,
    salinity: 1.8,
    statusText: "Sua horta está saudável e os sensores estão dentro do ideal.",
    // Série ilustrativa até a tela receber o histórico real do backend.
    healthHistory: createInitialHealthHistory(),
  });

  const health = useMemo(() => {
    const tempOk = telemetry.temp >= 20 && telemetry.temp <= 30;
    const phOk = telemetry.ph >= 5.8 && telemetry.ph <= 6.8;
    const ceOk = telemetry.salinity >= 1.2 && telemetry.salinity <= 2.0;
    const healthyItems = [tempOk, phOk, ceOk].filter(Boolean).length;

    if (healthyItems === 3) {
      return {
        title: "Tudo saudável",
        subtitle: "Ambiente ideal para o cultivo",
        percentage: 100,
        color: "#2E8B57",
        softColor: "#E7F6EC",
        isHealthy: true,
      };
    }

    return {
      title: "Atenção necessária",
      subtitle: `${healthyItems} de 3 indicadores estão no ideal`,
      percentage: Math.round((healthyItems / 3) * 100),
      color: "#C77A17",
      softColor: "#FFF4E4",
      isHealthy: false,
    };
  }, [telemetry]);

  const chartData = useMemo(() => {
    return {
      labels: telemetry.healthHistory.map((point) => point.label),
      values: telemetry.healthHistory.map((point) => (point.healthy ? 100 : 0)),
    };
  }, [telemetry.healthHistory]);

  // Mantém o endpoint original para testar o aplicativo sem Arduino conectado.
  async function handleSimulateSensorReading() {
    setLoading(true);

    try {
      const newTemp = Math.floor(Math.random() * (32 - 18 + 1)) + 18;
      const newPh = Number((Math.random() * (7.2 - 5.2) + 5.2).toFixed(1));
      const newCE = Number((Math.random() * (2.4 - 0.8) + 0.8).toFixed(1));
      const readingHealthy = isHydroponicReadingHealthy({
        temp: newTemp,
        ph: newPh,
        salinity: newCE,
      });

      await api.post("/sensor-readings", {
        device_code: "HORTA-001",
        temp: newTemp,
        ph: newPh,
        salinity: newCE,
      });

      const todayKey = getLocalDateKey(new Date());
      setTelemetry((previous) => {
        const todayPoint: HealthHistoryPoint = {
          dateKey: todayKey,
          label: "Hoje",
          healthy: readingHealthy,
        };
        const existingTodayIndex = previous.healthHistory.findIndex(
          (point) => point.dateKey === todayKey,
        );
        const healthHistory = [...previous.healthHistory];

        if (existingTodayIndex >= 0) {
          healthHistory[existingTodayIndex] = todayPoint;
        } else {
          healthHistory.push(todayPoint);
        }

        return {
          ...previous,
          temp: newTemp,
          ph: newPh,
          salinity: newCE,
          statusText: readingHealthy
            ? "Leitura atualizada. Os indicadores da solução estão ideais."
            : "Atenção: um ou mais indicadores precisam de ajuste.",
          healthHistory: healthHistory.slice(-7),
        };
      });

      Alert.alert(
        "Leitura atualizada",
        "Os novos dados do sensor foram salvos com sucesso.",
      );
    } catch (error) {
      console.log("Erro ao simular leitura:", error);
      Alert.alert(
        "Leitura atualizada",
        "Os dados foram atualizados apenas na interface.",
      );
    } finally {
      setLoading(false);
    }
  }

  function handleBottomTabPress(routes: readonly string[]) {
    let currentNavigation = navigation;

    while (currentNavigation) {
      const availableRoutes = currentNavigation.getState?.()?.routeNames ?? [];
      const matchingRoute = routes.find((route) =>
        availableRoutes.includes(route),
      );

      if (matchingRoute) {
        currentNavigation.navigate(matchingRoute);
        return true;
      }

      currentNavigation = currentNavigation.getParent?.();
    }

    return false;
  }

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F4" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, {userName}</Text>
            <Text style={styles.brandTitle}>Cultiva Tech</Text>
          </View>

          <TouchableOpacity
            style={styles.notificationButton}
            accessibilityRole="button"
            accessibilityLabel="Ver notificações"
            onPress={() =>
              Alert.alert(
                "Sem novas notificações",
                isMonitoringActive
                  ? "Sua horta está sendo monitorada."
                  : "O monitoramento da horta está desativado.",
              )
            }
          >
            <Feather name="bell" size={21} color="#183B2A" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        <View style={styles.locationRow}>
          <Feather name="map-pin" size={14} color="#60806D" />
          <Text style={styles.locationText}>
            {hasGarden ? gardenName : "Sem Nenhuma Horta"}
          </Text>
          <View style={styles.locationDivider} />
          <View
            style={[styles.onlineDot, !isMonitoringActive && styles.offlineDot]}
          />
          <Text
            style={[
              styles.onlineText,
              !isMonitoringActive && styles.offlineText,
            ]}
          >
            {isMonitoringActive
              ? "Monitoramento Ativo"
              : "Monitoramento Desativado"}
          </Text>
        </View>

        <View
          style={[
            styles.healthCard,
            !isMonitoringActive && styles.healthCardOff,
          ]}
        >
          <View style={styles.healthDecorCircle} />
          <View style={styles.healthTopRow}>
            <View style={styles.healthIconContainer}>
              <Feather name="heart" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.healthBadge}>
              <View
                style={[
                  styles.healthBadgeDot,
                  !isMonitoringActive && styles.healthBadgeDotOff,
                ]}
              />
              <Text style={styles.healthBadgeText}>
                {isMonitoringActive ? "EM TEMPO REAL" : "DESATIVADO"}
              </Text>
            </View>
          </View>

          <Text style={styles.healthTitle}>
            {isMonitoringActive
              ? health.title
              : hasGarden
                ? "Monitoramento desligado"
                : "Comece sua horta"}
          </Text>
          <Text style={styles.healthDescription}>
            {isMonitoringActive
              ? telemetry.statusText
              : hasGarden
                ? "Ative o monitoramento para acompanhar os sensores e a saúde das plantas."
                : "Cadastre sua primeira horta para acompanhar o cultivo pelo app."}
          </Text>

          {isMonitoringActive ? (
            <View style={styles.healthFooter}>
              <View style={styles.healthProgressArea}>
                <View style={styles.healthProgressLabels}>
                  <Text style={styles.healthProgressLabel}>Saúde da horta</Text>
                  <Text style={styles.healthProgressValue}>
                    {health.percentage}%
                  </Text>
                </View>
                <View style={styles.healthProgressTrack}>
                  <View
                    style={[
                      styles.healthProgressFill,
                      { width: `${health.percentage}%` },
                    ]}
                  />
                </View>
              </View>
              <View style={styles.leafCircle}>
                <MaterialCommunityIcons
                  name="sprout"
                  size={28}
                  color="#D8F8DE"
                />
              </View>
            </View>
          ) : (
            <View style={styles.healthOffFooter}>
              <Feather
                name={hasGarden ? "pause-circle" : "plus-circle"}
                size={17}
                color="#D4EFD9"
              />
              <Text style={styles.healthOffFooterText}>
                {hasGarden
                  ? "Ative quando quiser acompanhar sua horta"
                  : "Adicione uma horta para começar"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Acessos rápidos</Text>
          <Text style={styles.sectionHint}>Gerencie sua horta</Text>
        </View>

        <View style={styles.quickActions}>
          <TouchableOpacity
            style={[styles.quickAction, styles.quickActionPrimary]}
            onPress={() => navigation.navigate("Bluetooth")}
            accessibilityRole="button"
            accessibilityLabel="Conectar sensor por Bluetooth"
          >
            <View style={styles.quickActionIconPrimary}>
              <Feather name="bluetooth" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.quickActionCopy}>
              <Text style={styles.quickActionPrimaryTitle}>
                Conectar sensor
              </Text>
              <Text style={styles.quickActionPrimaryCaption}>
                Via Bluetooth
              </Text>
            </View>
            <Feather name="chevron-right" size={19} color="#D9EBDD" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.quickActionSecondary,
              !isMonitoringActive && styles.quickActionDisabled,
            ]}
            onPress={handleSimulateSensorReading}
            disabled={loading || !isMonitoringActive}
            accessibilityRole="button"
            accessibilityLabel="Atualizar leitura do sensor"
          >
            <View style={styles.quickActionIconSecondary}>
              {loading ? (
                <ActivityIndicator size="small" color="#2E8B57" />
              ) : (
                <Feather name="refresh-cw" size={19} color="#2E8B57" />
              )}
            </View>
            <Text style={styles.quickActionSecondaryText}>
              {loading
                ? "Atualizando..."
                : isMonitoringActive
                  ? "Atualizar dados"
                  : "Monitoramento Off"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.libraryQuickAction}
          onPress={() => {
            if (!handleBottomTabPress(["PlantLibrary", "Library"])) {
              Alert.alert(
                "Biblioteca de plantas",
                "Adicione a rota PlantLibrary ao navegador para abrir o catálogo.",
              );
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Abrir biblioteca de plantas"
        >
          <View style={styles.libraryQuickIcon}>
            <Feather name="book-open" size={19} color="#2E7549" />
          </View>
          <View style={styles.libraryQuickCopy}>
            <Text style={styles.libraryQuickTitle}>Biblioteca de plantas</Text>
            <Text style={styles.libraryQuickCaption}>
              Explore espécies, variedades e sistemas de cultivo
            </Text>
          </View>
          <Feather name="chevron-right" size={19} color="#64816C" />
        </TouchableOpacity>

        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>Status da horta</Text>
          <View
            style={[
              styles.statusPill,
              {
                backgroundColor: isMonitoringActive
                  ? health.softColor
                  : "#E9EDE9",
              },
            ]}
          >
            <View
              style={[
                styles.statusPillDot,
                {
                  backgroundColor: isMonitoringActive
                    ? health.color
                    : "#758079",
                },
              ]}
            />
            <Text
              style={[
                styles.statusPillText,
                { color: isMonitoringActive ? health.color : "#68746B" },
              ]}
            >
              {isMonitoringActive
                ? health.isHealthy
                  ? "Normal"
                  : "Atenção"
                : "Off"}
            </Text>
          </View>
        </View>

        {isMonitoringActive ? (
          <>
            <View style={styles.metricsGrid}>
              <MetricCard
                icon="thermometer"
                iconColor="#D2693E"
                iconBackground="#FFF0E8"
                label="Temperatura"
                value={`${telemetry.temp}`}
                unit="°C"
                status={
                  telemetry.temp >= 20 && telemetry.temp <= 30
                    ? "Ideal"
                    : "Verificar"
                }
                statusColor={
                  telemetry.temp >= 20 && telemetry.temp <= 30
                    ? "#2E8B57"
                    : "#C77A17"
                }
              />
              <MetricCard
                icon="activity"
                iconColor="#8466C8"
                iconBackground="#F0EAFF"
                label="pH da solução"
                value={`${telemetry.ph}`}
                status={
                  telemetry.ph >= 5.8 && telemetry.ph <= 6.8
                    ? "Equilibrado"
                    : "Verificar"
                }
                statusColor={
                  telemetry.ph >= 5.8 && telemetry.ph <= 6.8
                    ? "#2E8B57"
                    : "#C77A17"
                }
              />
              <MetricCard
                icon="zap"
                iconColor="#BD8C16"
                iconBackground="#FFF6DB"
                label="Nutrientes"
                value={`${telemetry.salinity}`}
                unit="mS/cm"
                status={
                  telemetry.salinity >= 1.2 && telemetry.salinity <= 2.0
                    ? "Ideal"
                    : "Verificar"
                }
                statusColor={
                  telemetry.salinity >= 1.2 && telemetry.salinity <= 2.0
                    ? "#2E8B57"
                    : "#C77A17"
                }
              />
            </View>

            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <View>
                  <Text style={styles.chartTitle}>Saúde das plantas</Text>
                  <Text style={styles.chartSubtitle}>
                    Estado das plantas nos últimos 7 dias
                  </Text>
                </View>
              </View>

              <View style={styles.chartLegend}>
                <View style={styles.chartLegendItem}>
                  <View style={styles.chartLegendDot} />
                  <Text style={styles.chartLegendText}>Saudável (100)</Text>
                </View>
                <View style={styles.chartLegendItem}>
                  <View style={styles.chartLegendWarningDot} />
                  <Text style={styles.chartLegendText}>Atenção (0)</Text>
                </View>
              </View>

              <LineChart
                data={{
                  labels: chartData.labels,
                  datasets: [{ data: chartData.values }],
                }}
                width={screenWidth - HORIZONTAL_PADDING * 2 - 40}
                height={190}
                withInnerLines
                withOuterLines={false}
                withVerticalLines={false}
                withHorizontalLabels={false}
                fromZero
                chartConfig={{
                  backgroundColor: "#FFFFFF",
                  backgroundGradientFrom: "#FFFFFF",
                  backgroundGradientTo: "#FFFFFF",
                  decimalPlaces: 0,
                  color: (opacity = 1) => `rgba(46, 139, 87, ${opacity})`,
                  labelColor: () => "#809084",
                  fillShadowGradientFrom: "#6EC58A",
                  fillShadowGradientTo: "#FFFFFF",
                  fillShadowGradientFromOpacity: 0.22,
                  fillShadowGradientToOpacity: 0,
                  propsForBackgroundLines: {
                    stroke: "#E8EEE9",
                    strokeDasharray: "4 5",
                  },
                  propsForDots: {
                    r: "4",
                    strokeWidth: "3",
                    stroke: "#FFFFFF",
                  },
                  propsForLabels: {
                    fontSize: 10,
                  },
                }}
                style={styles.chart}
              />
            </View>

            <View style={styles.lastReading}>
              <Feather name="clock" size={14} color="#748579" />
              <Text style={styles.lastReadingText}>
                Última leitura: agora mesmo
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.monitoringEmptyCard}>
            <View style={styles.monitoringEmptyIcon}>
              <Feather
                name={hasGarden ? "pause-circle" : "home"}
                size={22}
                color="#5C7966"
              />
            </View>
            <View style={styles.monitoringEmptyCopy}>
              <Text style={styles.monitoringEmptyTitle}>
                {hasGarden ? "Status da horta Off" : "Nenhuma horta cadastrada"}
              </Text>
              <Text style={styles.monitoringEmptyDescription}>
                {hasGarden
                  ? "Ative o monitoramento para mostrar as leituras e o histórico aqui."
                  : "Quando você adicionar uma horta e ativar o monitoramento, os dados aparecerão aqui."}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.bottomBar}>
        {bottomTabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.bottomTab, tab.active && styles.bottomTabActive]}
            onPress={() => handleBottomTabPress(tab.routes)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: tab.active }}
          >
            <MaterialCommunityIcons
              name={tab.icon}
              size={21}
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
    flex: 1,
    backgroundColor: "#F6F8F4",
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 56,
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 24,
  },
  bottomBar: {
    alignItems: "center",
    backgroundColor: "#123F2A",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  greeting: {
    color: "#66806E",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },
  brandTitle: {
    color: "#183B2A",
    fontSize: 27,
    fontWeight: "800",
    letterSpacing: -0.7,
  },
  notificationButton: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E6ECE6",
    borderRadius: 16,
    borderWidth: 1,
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  notificationDot: {
    backgroundColor: "#F07945",
    borderColor: "#FFFFFF",
    borderRadius: 6,
    borderWidth: 2,
    height: 10,
    position: "absolute",
    right: 9,
    top: 8,
    width: 10,
  },
  locationRow: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    rowGap: 8,
  },
  locationText: {
    color: "#60806D",
    fontSize: 12,
    flexShrink: 1,
    fontWeight: "600",
    marginLeft: 4,
  },
  locationDivider: {
    backgroundColor: "#C6D2C8",
    height: 13,
    marginHorizontal: 9,
    width: 1,
  },
  onlineDot: {
    backgroundColor: "#43A866",
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  offlineDot: {
    backgroundColor: "#98A29A",
  },
  onlineText: {
    color: "#4E7960",
    fontSize: 12,
    flexShrink: 1,
    fontWeight: "600",
    marginLeft: 5,
  },
  offlineText: {
    color: "#7B867E",
  },
  healthCard: {
    backgroundColor: "#1F6B43",
    borderRadius: 25,
    marginTop: 22,
    minHeight: 222,
    overflow: "hidden",
    padding: 20,
  },
  healthCardOff: {
    backgroundColor: "#52695A",
  },
  healthDecorCircle: {
    backgroundColor: "#FFFFFF",
    borderRadius: 150,
    height: 265,
    opacity: 0.06,
    position: "absolute",
    right: -78,
    top: -104,
    width: 265,
  },
  healthTopRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  healthIconContainer: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 13,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  healthBadge: {
    alignItems: "center",
    backgroundColor: "rgba(8,41,24,0.22)",
    borderRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  healthBadgeDot: {
    backgroundColor: "#95F2AE",
    borderRadius: 4,
    height: 7,
    marginRight: 6,
    width: 7,
  },
  healthBadgeDotOff: {
    backgroundColor: "#D7C89A",
  },
  healthBadgeText: {
    color: "#E0F8E6",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.45,
  },
  healthTitle: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
    letterSpacing: -0.6,
    marginTop: 17,
  },
  healthDescription: {
    color: "#D4EFD9",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
    marginTop: 5,
    maxWidth: "81%",
  },
  healthFooter: {
    alignItems: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  healthOffFooter: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 18,
  },
  healthOffFooterText: {
    color: "#D4EFD9",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 7,
  },
  healthProgressArea: {
    flex: 1,
    marginRight: 15,
  },
  healthProgressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 7,
  },
  healthProgressLabel: {
    color: "#D7F1DC",
    fontSize: 11,
    fontWeight: "600",
  },
  healthProgressValue: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  healthProgressTrack: {
    backgroundColor: "rgba(0,0,0,0.17)",
    borderRadius: 10,
    height: 7,
    overflow: "hidden",
  },
  healthProgressFill: {
    backgroundColor: "#A1E6AD",
    borderRadius: 10,
    height: "100%",
  },
  leafCircle: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.13)",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  sectionHeading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
    marginTop: 26,
  },
  sectionTitle: {
    color: "#1D382A",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionHint: {
    color: "#7A8C7E",
    fontSize: 12,
    fontWeight: "500",
  },
  quickActions: {
    flexDirection: "row",
    gap: 10,
  },
  quickAction: {
    borderRadius: 18,
  },
  libraryQuickAction: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E9E3",
    borderRadius: 17,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 9,
    minHeight: 66,
    paddingHorizontal: 12,
  },
  libraryQuickIcon: {
    alignItems: "center",
    backgroundColor: "#E9F6EC",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    marginRight: 10,
    width: 40,
  },
  libraryQuickCopy: {
    flex: 1,
  },
  libraryQuickTitle: {
    color: "#254A32",
    fontSize: 12,
    fontWeight: "800",
  },
  libraryQuickCaption: {
    color: "#7A8C7E",
    fontSize: 10,
    marginTop: 3,
  },
  quickActionPrimary: {
    alignItems: "center",
    backgroundColor: "#183B2A",
    flex: 1.25,
    flexDirection: "row",
    minHeight: 76,
    paddingHorizontal: 13,
  },
  quickActionIconPrimary: {
    alignItems: "center",
    backgroundColor: "#3C7D58",
    borderRadius: 12,
    height: 40,
    justifyContent: "center",
    marginRight: 9,
    width: 40,
  },
  quickActionCopy: {
    flex: 1,
  },
  quickActionPrimaryTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  quickActionPrimaryCaption: {
    color: "#BFDCC7",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 2,
  },
  quickActionSecondary: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E2E9E3",
    borderRadius: 18,
    borderWidth: 1,
    flex: 0.75,
    justifyContent: "center",
    minHeight: 76,
    paddingHorizontal: 8,
  },
  quickActionDisabled: {
    opacity: 0.62,
  },
  quickActionIconSecondary: {
    alignItems: "center",
    backgroundColor: "#E9F6EC",
    borderRadius: 10,
    height: 32,
    justifyContent: "center",
    width: 32,
  },
  quickActionSecondaryText: {
    color: "#2A5F3F",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 5,
    textAlign: "center",
  },
  statusPill: {
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  statusPillDot: {
    borderRadius: 4,
    height: 6,
    marginRight: 5,
    width: 6,
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "800",
  },
  monitoringEmptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E6ECE7",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 2,
    padding: 16,
  },
  monitoringEmptyIcon: {
    alignItems: "center",
    backgroundColor: "#EEF4EF",
    borderRadius: 14,
    height: 44,
    justifyContent: "center",
    marginRight: 12,
    width: 44,
  },
  monitoringEmptyCopy: {
    flex: 1,
  },
  monitoringEmptyTitle: {
    color: "#294A34",
    fontSize: 13,
    fontWeight: "800",
  },
  monitoringEmptyDescription: {
    color: "#748579",
    fontSize: 11,
    lineHeight: 16,
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EEE9",
    borderRadius: 18,
    borderWidth: 1,
    flexGrow: 0,
    flexShrink: 0,
    minHeight: 143,
    padding: 14,
    width: (screenWidth - HORIZONTAL_PADDING * 2 - 10) / 2,
  },
  metricCardTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metricIcon: {
    alignItems: "center",
    borderRadius: 10,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  metricStatusDot: {
    borderRadius: 4,
    height: 7,
    width: 7,
  },
  metricLabel: {
    color: "#708174",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 13,
  },
  metricValueRow: {
    alignItems: "baseline",
    flexDirection: "row",
    marginTop: 2,
  },
  metricValue: {
    color: "#1D382A",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: -0.6,
  },
  metricUnit: {
    color: "#718176",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 3,
  },
  metricStatus: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E8EEE9",
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 22,
    overflow: "hidden",
    paddingTop: 18,
  },
  chartHeader: {
    alignItems: "flex-start",
    flexDirection: "column",
    paddingHorizontal: 18,
  },
  chartTitle: {
    color: "#1D382A",
    fontSize: 17,
    fontWeight: "800",
  },
  chartSubtitle: {
    color: "#798B7E",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
  },
  chartLegend: {
    alignItems: "center",
    flexDirection: "row",
    gap: 16,
    marginLeft: 18,
    marginTop: 12,
  },
  chartLegendItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  chartLegendDot: {
    backgroundColor: "#2E8B57",
    borderRadius: 4,
    height: 7,
    marginRight: 5,
    width: 7,
  },
  chartLegendWarningDot: {
    backgroundColor: "#C77A17",
    borderRadius: 4,
    height: 7,
    marginRight: 5,
    width: 7,
  },
  chartLegendText: {
    color: "#66806E",
    fontSize: 10,
    fontWeight: "700",
  },
  chart: {
    marginBottom: 4,
    marginLeft: -9,
    marginTop: 4,
  },
  lastReading: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 19,
  },
  lastReadingText: {
    color: "#748579",
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 6,
  },
});
