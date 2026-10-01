import React, { useContext, useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../contexts/AuthContext";

export interface AlertSettings {
  notificationsEnabled: boolean;
  temperatureAlertEnabled: boolean;
  temperatureThreshold: number;
  phAlertEnabled: boolean;
  nutrientsAlertEnabled: boolean;
}

interface SettingsScreenProps {
  navigation?: any;
  route?: {
    params?: {
      userName?: string | null;
      email?: string | null;
      connectedDeviceName?: string | null;
    };
  };
  userName?: string | null;
  email?: string | null;
  connectedDeviceName?: string | null;
  initialAlertSettings?: Partial<AlertSettings>;
  onAlertSettingsChange?: (settings: AlertSettings) => void;
}

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
    active: false,
  },
  {
    key: "configuracoes",
    label: "Config.",
    icon: "cog-outline",
    routes: [
      "Settings",
      "Configuracoes",
      "Configurações",
      "Config",
      "SettingsScreen",
    ],
    active: true,
  },
] as const;

const defaultAlertSettings: AlertSettings = {
  notificationsEnabled: false,
  temperatureAlertEnabled: false,
  temperatureThreshold: 10,
  phAlertEnabled: false,
  nutrientsAlertEnabled: false,
};

export function SettingsScreen({
  navigation,
  route,
  userName: userNameProp,
  email: emailProp,
  connectedDeviceName: connectedDeviceNameProp,
  initialAlertSettings,
  onAlertSettingsChange,
}: SettingsScreenProps) {
  const { signOut } = useContext(AuthContext);
  const userName =
    userNameProp?.trim() || route?.params?.userName?.trim() || "";
  const email = emailProp?.trim() || route?.params?.email?.trim() || "";
  const connectedDeviceName =
    connectedDeviceNameProp !== undefined
      ? connectedDeviceNameProp
      : (route?.params?.connectedDeviceName ?? null);
  const [alertSettings, setAlertSettings] = useState<AlertSettings>(() => ({
    ...defaultAlertSettings,
    ...initialAlertSettings,
  }));

  function updateAlertSettings(changes: Partial<AlertSettings>) {
    const nextSettings = { ...alertSettings, ...changes };
    setAlertSettings(nextSettings);
    onAlertSettingsChange?.(nextSettings);
  }

  function navigateToRoute(routes: readonly string[]) {
    let currentNavigation = navigation;

    while (currentNavigation) {
      const availableRoutes = currentNavigation.getState?.()?.routeNames ?? [];
      const matchingRoute = routes.find((routeName) =>
        availableRoutes.includes(routeName),
      );

      if (matchingRoute) {
        currentNavigation.navigate(matchingRoute);
        return true;
      }

      currentNavigation = currentNavigation.getParent?.();
    }

    return false;
  }

  function handlePairDevice() {
    if (!navigateToRoute(["Bluetooth", "BluetoothScreen"])) {
      Alert.alert(
        "Pareamento Bluetooth",
        "Conecte esta ação à rota Bluetooth do navegador do aplicativo.",
      );
    }
  }

  function handleLogout() {
    Alert.alert(
      "Sair da conta?",
      "Você precisará entrar novamente para acessar sua horta.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: () => {
            signOut().catch((error) => {
              console.error("Erro ao sair da conta:", error);
              Alert.alert("Não foi possível sair", "Tente novamente.");
            });
          },
        },
      ],
    );
  }

  function renderSwitch(
    value: boolean,
    onValueChange: (nextValue: boolean) => void,
    disabled = false,
  ) {
    return (
      <Switch
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: "#D8E0D9", true: "#8BC89A" }}
        thumbColor={value ? "#2E8B57" : "#FFFFFF"}
        ios_backgroundColor="#D8E0D9"
        accessibilityRole="switch"
      />
    );
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
            <Text style={styles.eyebrow}>CULTIVA TECH</Text>
            <Text style={styles.title}>Configurações</Text>
            <Text style={styles.subtitle}>Perfil, alertas e dispositivos</Text>
          </View>
          <View style={styles.headerIcon}>
            <Feather name="settings" size={21} color="#1F6B43" />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Perfil do usuário</Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            {userName ? (
              <Text style={styles.avatarInitials}>
                {userName
                  .split(/\s+/)
                  .slice(0, 2)
                  .map((part) => part[0]?.toUpperCase())
                  .join("")}
              </Text>
            ) : (
              <Feather name="user" size={23} color="#2E8B57" />
            )}
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>
              {userName || "Nome não informado"}
            </Text>
            <Text style={styles.profileEmail} numberOfLines={1}>
              {email || "E-mail não informado"}
            </Text>
          </View>
          <Feather name="chevron-right" size={19} color="#8A9B8E" />
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Alertas e notificações</Text>
            <Text style={styles.sectionSubtitle}>
              Escolha o que deseja acompanhar
            </Text>
          </View>
        </View>

        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingIcon}>
              <Feather name="bell" size={17} color="#2E8B57" />
            </View>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Notificações</Text>
              <Text style={styles.settingDescription}>
                Permitir alertas da sua horta neste dispositivo
              </Text>
            </View>
            {renderSwitch(alertSettings.notificationsEnabled, (value) =>
              updateAlertSettings({ notificationsEnabled: value }),
            )}
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, styles.temperatureIcon]}>
              <Feather name="thermometer" size={17} color="#D2693E" />
            </View>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Alerta de temperatura</Text>
              <Text style={styles.settingDescription}>
                Avisar quando ficar abaixo do limite
              </Text>
            </View>
            {renderSwitch(
              alertSettings.temperatureAlertEnabled,
              (value) =>
                updateAlertSettings({ temperatureAlertEnabled: value }),
              !alertSettings.notificationsEnabled,
            )}
          </View>

          <View
            style={[
              styles.thresholdRow,
              (!alertSettings.notificationsEnabled ||
                !alertSettings.temperatureAlertEnabled) &&
                styles.disabledSetting,
            ]}
          >
            <Text style={styles.thresholdLabel}>Limite de temperatura</Text>
            <View style={styles.thresholdControls}>
              <TouchableOpacity
                style={styles.thresholdButton}
                onPress={() =>
                  updateAlertSettings({
                    temperatureThreshold: Math.max(
                      -5,
                      alertSettings.temperatureThreshold - 1,
                    ),
                  })
                }
                disabled={
                  !alertSettings.notificationsEnabled ||
                  !alertSettings.temperatureAlertEnabled
                }
                accessibilityRole="button"
                accessibilityLabel="Diminuir limite de temperatura"
              >
                <Feather name="minus" size={15} color="#2E7549" />
              </TouchableOpacity>
              <Text style={styles.thresholdValue}>
                &lt; {alertSettings.temperatureThreshold} °C
              </Text>
              <TouchableOpacity
                style={styles.thresholdButton}
                onPress={() =>
                  updateAlertSettings({
                    temperatureThreshold: Math.min(
                      60,
                      alertSettings.temperatureThreshold + 1,
                    ),
                  })
                }
                disabled={
                  !alertSettings.notificationsEnabled ||
                  !alertSettings.temperatureAlertEnabled
                }
                accessibilityRole="button"
                accessibilityLabel="Aumentar limite de temperatura"
              >
                <Feather name="plus" size={15} color="#2E7549" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, styles.phIcon]}>
              <MaterialCommunityIcons name="ph" size={17} color="#8466C8" />
            </View>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Alerta de pH</Text>
              <Text style={styles.settingDescription}>
                Avisar quando o pH sair da faixa configurada
              </Text>
            </View>
            {renderSwitch(
              alertSettings.phAlertEnabled,
              (value) => updateAlertSettings({ phAlertEnabled: value }),
              !alertSettings.notificationsEnabled,
            )}
          </View>

          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <View style={[styles.settingIcon, styles.nutrientsIcon]}>
              <Feather name="zap" size={17} color="#BD8C16" />
            </View>
            <View style={styles.settingCopy}>
              <Text style={styles.settingTitle}>Alerta de nutrientes</Text>
              <Text style={styles.settingDescription}>
                Avisar quando a concentração precisar de atenção
              </Text>
            </View>
            {renderSwitch(
              alertSettings.nutrientsAlertEnabled,
              (value) => updateAlertSettings({ nutrientsAlertEnabled: value }),
              !alertSettings.notificationsEnabled,
            )}
          </View>

          <Text style={styles.temperatureNote}>
            Temperatura é medida em °C; o limite inicial está em 10 °C.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Conexões Bluetooth</Text>
            <Text style={styles.sectionSubtitle}>
              Gerencie o pareamento do sensor
            </Text>
          </View>
        </View>

        <View style={styles.bluetoothCard}>
          <View style={styles.bluetoothIcon}>
            <MaterialCommunityIcons
              name="bluetooth"
              size={22}
              color="#2E8B57"
            />
          </View>
          <View style={styles.bluetoothCopy}>
            <Text style={styles.bluetoothTitle} numberOfLines={1}>
              {connectedDeviceName || "Nenhum sensor conectado"}
            </Text>
            <View style={styles.bluetoothStatusRow}>
              <View
                style={[
                  styles.bluetoothStatusDot,
                  !connectedDeviceName && styles.bluetoothStatusDotOff,
                ]}
              />
              <Text
                style={[
                  styles.bluetoothStatus,
                  !connectedDeviceName && styles.bluetoothStatusOff,
                ]}
              >
                {connectedDeviceName ? "Conectado" : "Desconectado"}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.pairButton}
            onPress={handlePairDevice}
            accessibilityRole="button"
            accessibilityLabel="Parear sensor por Bluetooth"
          >
            <Text style={styles.pairButtonText}>
              {connectedDeviceName ? "Gerenciar" : "Parear"}
            </Text>
            <Feather name="chevron-right" size={15} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          accessibilityRole="button"
          accessibilityLabel="Sair da conta"
        >
          <Feather name="log-out" size={18} color="#B94C48" />
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Cultiva Tech · configurações da conta
        </Text>
      </ScrollView>

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
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 28,
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
    height: 46,
    justifyContent: "center",
    width: 46,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 11,
    marginTop: 25,
  },
  sectionTitle: {
    color: "#1D382A",
    fontSize: 17,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#7A8C7E",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    padding: 15,
  },
  avatar: {
    alignItems: "center",
    backgroundColor: "#E5F3E8",
    borderRadius: 24,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  avatarInitials: {
    color: "#236340",
    fontSize: 15,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  profileName: {
    color: "#1D382A",
    fontSize: 14,
    fontWeight: "800",
  },
  profileEmail: {
    color: "#7A8C7E",
    fontSize: 11,
    marginTop: 4,
  },
  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  settingRow: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 69,
  },
  settingIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 11,
    height: 36,
    justifyContent: "center",
    width: 36,
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
  settingCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  settingTitle: {
    color: "#294A34",
    fontSize: 12,
    fontWeight: "800",
  },
  settingDescription: {
    color: "#829086",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 3,
  },
  settingDivider: {
    backgroundColor: "#EDF1ED",
    height: 1,
  },
  thresholdRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 11,
    paddingLeft: 46,
  },
  thresholdLabel: {
    color: "#758579",
    fontSize: 10,
    fontWeight: "600",
  },
  thresholdControls: {
    alignItems: "center",
    flexDirection: "row",
    gap: 9,
  },
  thresholdButton: {
    alignItems: "center",
    backgroundColor: "#E8F4EB",
    borderRadius: 9,
    height: 29,
    justifyContent: "center",
    width: 29,
  },
  thresholdValue: {
    color: "#245A3D",
    fontSize: 11,
    fontWeight: "800",
    minWidth: 62,
    textAlign: "center",
  },
  disabledSetting: {
    opacity: 0.48,
  },
  temperatureNote: {
    color: "#8A978D",
    fontSize: 9,
    lineHeight: 14,
    marginBottom: 12,
    marginLeft: 46,
    marginTop: -3,
  },
  bluetoothCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 19,
    borderWidth: 1,
    flexDirection: "row",
    padding: 14,
  },
  bluetoothIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  bluetoothCopy: {
    flex: 1,
    marginHorizontal: 10,
  },
  bluetoothTitle: {
    color: "#294A34",
    fontSize: 12,
    fontWeight: "800",
  },
  bluetoothStatusRow: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 5,
  },
  bluetoothStatusDot: {
    backgroundColor: "#43A866",
    borderRadius: 4,
    height: 6,
    marginRight: 5,
    width: 6,
  },
  bluetoothStatusDotOff: {
    backgroundColor: "#99A39B",
  },
  bluetoothStatus: {
    color: "#3C8054",
    fontSize: 10,
    fontWeight: "700",
  },
  bluetoothStatusOff: {
    color: "#7B867E",
  },
  pairButton: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 11,
    flexDirection: "row",
    gap: 3,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  pairButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  logoutButton: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#FFF5F3",
    borderColor: "#F0DEDA",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
    minHeight: 52,
  },
  logoutText: {
    color: "#B94C48",
    fontSize: 13,
    fontWeight: "800",
    marginLeft: 8,
  },
  footerNote: {
    color: "#98A49B",
    fontSize: 10,
    marginTop: 16,
    textAlign: "center",
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
