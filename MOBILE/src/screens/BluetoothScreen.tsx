import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Device } from "react-native-ble-plx";
import { bleManager, requestBluetoothPermissions } from "../services/bluetooth";

interface BluetoothScreenProps {
  navigation?: any;
}

export function BluetoothScreen({ navigation }: BluetoothScreenProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(
    null,
  );
  const scanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function stopScan() {
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
      scanTimeoutRef.current = null;
    }
    bleManager.stopDeviceScan();
    setIsScanning(false);
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
        return;
      }

      currentNavigation = currentNavigation.getParent?.();
    }
  }

  useEffect(() => {
    // Esconde o cabeçalho padrão gerado pelo React Navigation
    navigation?.setOptions?.({ headerShown: false });

    return () => {
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
      bleManager.stopDeviceScan();
    };
  }, [navigation]);

  const startScan = async () => {
    const hasPermission = await requestBluetoothPermissions();
    if (!hasPermission) {
      Alert.alert(
        "Permissão necessária",
        "Permita o acesso ao Bluetooth e à localização para encontrar os sensores.",
      );
      return;
    }

    setDevices([]);
    setIsScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        if (scanTimeoutRef.current) {
          clearTimeout(scanTimeoutRef.current);
          scanTimeoutRef.current = null;
        }
        bleManager.stopDeviceScan();
        setIsScanning(false);
        Alert.alert(
          "Não foi possível buscar",
          error.message ||
            "Verifique se o Bluetooth está ligado e tente novamente.",
        );
        return;
      }

      if (device?.name) {
        setDevices((previousDevices) => {
          if (previousDevices.some((item) => item.id === device.id)) {
            return previousDevices;
          }
          return [...previousDevices, device];
        });
      }
    });

    scanTimeoutRef.current = setTimeout(() => {
      bleManager.stopDeviceScan();
      scanTimeoutRef.current = null;
      setIsScanning(false);
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      stopScan();
      setConnectingDeviceId(device.id);

      const connected = await device.connect();
      await connected.discoverAllServicesAndCharacteristics();
      setConnectedDevice(connected);

      Alert.alert(
        "Conectado com sucesso",
        `Sensor conectado: ${device.name || device.id}`,
      );
    } catch (error: any) {
      Alert.alert(
        "Falha na conexão",
        error.message ||
          "Não foi possível conectar ao sensor. Tente novamente.",
      );
    } finally {
      setConnectingDeviceId(null);
    }
  };

  const renderDevice = ({ item }: { item: Device }) => {
    const isConnecting = connectingDeviceId === item.id;
    const isConnected = connectedDevice?.id === item.id;

    return (
      <TouchableOpacity
        style={styles.deviceCard}
        onPress={() => connectToDevice(item)}
        disabled={Boolean(connectingDeviceId) || isConnected}
        accessibilityRole="button"
        accessibilityLabel={`Conectar a ${item.name || "dispositivo sem nome"}`}
      >
        <View style={styles.deviceIcon}>
          <Feather name="bluetooth" size={20} color="#2E8B57" />
        </View>

        <View style={styles.deviceInfo}>
          <Text style={styles.deviceName} numberOfLines={1}>
            {item.name || "Dispositivo sem nome"}
          </Text>
          <Text style={styles.deviceId} numberOfLines={1}>
            ID: {item.id}
          </Text>
        </View>

        <View
          style={[
            styles.deviceAction,
            isConnected && styles.deviceActionConnected,
          ]}
        >
          {isConnecting ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : isConnected ? (
            <Feather name="check" size={17} color="#FFFFFF" />
          ) : (
            <Feather name="chevron-right" size={19} color="#FFFFFF" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.page} edges={["top", "left", "right"]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F4" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.topBarButton}
          onPress={() => navigation?.goBack?.()}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Feather name="arrow-left" size={23} color="#1F6B43" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Conectar Sensor</Text>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() =>
            navigateToRoute([
              "Configuracoes",
              "Configurações",
              "Config",
              "Settings",
            ])
          }
          accessibilityRole="button"
          accessibilityLabel="Abrir configurações"
        >
          <Feather name="settings" size={21} color="#60736A" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDevice}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.deviceSeparator} />}
        ListHeaderComponent={
          <>
            <View style={styles.connectionCard}>
              <View style={styles.connectionCardTop}>
                <View style={styles.connectionIcon}>
                  <MaterialCommunityIcons
                    name="bluetooth"
                    size={27}
                    color="#FFFFFF"
                  />
                </View>
                <View style={styles.connectionBadge}>
                  <View
                    style={[
                      styles.connectionDot,
                      isScanning && styles.connectionDotActive,
                      connectedDevice && styles.connectionDotActive,
                    ]}
                  />
                  <Text style={styles.connectionBadgeText}>
                    {connectedDevice
                      ? "CONECTADO"
                      : isScanning
                        ? "BUSCANDO"
                        : connectingDeviceId
                          ? "CONECTANDO"
                          : "PRONTO PARA CONECTAR"}
                  </Text>
                </View>
              </View>

              <Text style={styles.connectionTitle}>
                {connectedDevice
                  ? "Sensor conectado"
                  : isScanning
                    ? "Procurando sensores..."
                    : connectingDeviceId
                      ? "Conectando ao sensor..."
                      : "Sua horta, sempre conectada"}
              </Text>
              <Text style={styles.connectionDescription}>
                {connectedDevice
                  ? `${connectedDevice.name || connectedDevice.id} está pronto para enviar leituras.`
                  : connectingDeviceId
                    ? "Aguarde enquanto estabelecemos a conexão com o sensor."
                    : "Ative o Bluetooth e procure dispositivos próximos para acompanhar sua horta em tempo real."}
              </Text>

              <TouchableOpacity
                style={[
                  styles.scanButton,
                  (isScanning || Boolean(connectingDeviceId)) &&
                    styles.scanButtonDisabled,
                ]}
                onPress={startScan}
                disabled={isScanning || Boolean(connectingDeviceId)}
                accessibilityRole="button"
                accessibilityLabel="Procurar sensores Bluetooth próximos"
              >
                {isScanning || connectingDeviceId ? (
                  <>
                    <ActivityIndicator size="small" color="#1D5E3D" />
                    <Text
                      style={[
                        styles.scanButtonText,
                        styles.scanButtonTextSearching,
                      ]}
                    >
                      {isScanning
                        ? "Buscando dispositivos"
                        : "Conectando sensor"}
                    </Text>
                  </>
                ) : (
                  <>
                    <Feather name="search" size={17} color="#FFFFFF" />
                    <Text style={styles.scanButtonText}>
                      Procurar dispositivos
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {connectedDevice && (
              <View style={styles.connectedCard}>
                <View style={styles.connectedIcon}>
                  <Feather name="check" size={17} color="#2E8B57" />
                </View>
                <View style={styles.connectedInfo}>
                  <Text style={styles.connectedLabel}>Conectado agora</Text>
                  <Text style={styles.connectedName} numberOfLines={1}>
                    {connectedDevice.name || connectedDevice.id}
                  </Text>
                </View>
                <View style={styles.connectedStatus}>
                  <View style={styles.connectedStatusDot} />
                  <Text style={styles.connectedStatusText}>Ativo</Text>
                </View>
              </View>
            )}

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Dispositivos próximos</Text>
                <Text style={styles.sectionSubtitle}>
                  {devices.length > 0
                    ? `${devices.length} ${devices.length === 1 ? "sensor encontrado" : "sensores encontrados"}`
                    : "Sensores Bluetooth disponíveis"}
                </Text>
              </View>
              {isScanning && <View style={styles.scanningIndicator} />}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              {isScanning ? (
                <ActivityIndicator size="small" color="#2E8B57" />
              ) : (
                <Feather name="radio" size={23} color="#7C9181" />
              )}
            </View>
            <Text style={styles.emptyTitle}>
              {isScanning
                ? "Buscando dispositivos"
                : "Nenhum dispositivo encontrado"}
            </Text>
            <Text style={styles.emptyDescription}>
              {isScanning
                ? "Mantenha o sensor ligado e próximo do celular."
                : "Quando encontrar um sensor, ele aparecerá nesta lista."}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
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
    paddingTop: 18,
  },
  topBar: {
    alignItems: "center",
    backgroundColor: "#F6F8F4",
    borderBottomColor: "#E8EEE9",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 60,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  topBarButton: {
    alignItems: "center",
    backgroundColor: "#E7F2E9",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  topBarTitle: {
    color: "#1F6B43",
    flex: 1,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.35,
    marginHorizontal: 10,
    textAlign: "center",
  },
  settingsButton: {
    alignItems: "center",
    backgroundColor: "#E6E9E7",
    borderRadius: 22,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  connectionCard: {
    backgroundColor: "#1F6B43",
    borderRadius: 24,
    marginTop: 4,
    overflow: "hidden",
    padding: 20,
  },
  connectionCardTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  connectionIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 14,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  connectionBadge: {
    alignItems: "center",
    backgroundColor: "rgba(8,41,24,0.22)",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  connectionDot: {
    backgroundColor: "#B9C8BD",
    borderRadius: 4,
    height: 7,
    marginRight: 6,
    width: 7,
  },
  connectionDotActive: {
    backgroundColor: "#95F2AE",
  },
  connectionBadgeText: {
    color: "#E0F8E6",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.35,
  },
  connectionTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.4,
    marginTop: 18,
  },
  connectionDescription: {
    color: "#D4EFD9",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 19,
    marginTop: 6,
  },
  scanButton: {
    alignItems: "center",
    backgroundColor: "#2E8B57",
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 19,
    minHeight: 50,
    paddingHorizontal: 16,
  },
  scanButtonDisabled: {
    backgroundColor: "#E5F3E8",
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  scanButtonTextSearching: {
    color: "#1D5E3D",
  },
  connectedCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE9DE",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 14,
    padding: 14,
  },
  connectedIcon: {
    alignItems: "center",
    backgroundColor: "#E6F5EA",
    borderRadius: 12,
    height: 38,
    justifyContent: "center",
    width: 38,
  },
  connectedInfo: {
    flex: 1,
    marginLeft: 10,
  },
  connectedLabel: {
    color: "#718176",
    fontSize: 10,
    fontWeight: "600",
  },
  connectedName: {
    color: "#1D382A",
    fontSize: 13,
    fontWeight: "800",
    marginTop: 2,
  },
  connectedStatus: {
    alignItems: "center",
    backgroundColor: "#E8F6EC",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  connectedStatusDot: {
    backgroundColor: "#43A866",
    borderRadius: 4,
    height: 6,
    marginRight: 5,
    width: 6,
  },
  connectedStatusText: {
    color: "#2E7D4B",
    fontSize: 10,
    fontWeight: "800",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 28,
  },
  sectionTitle: {
    color: "#1D382A",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  sectionSubtitle: {
    color: "#7A8C7E",
    fontSize: 11,
    fontWeight: "500",
    marginTop: 3,
  },
  scanningIndicator: {
    backgroundColor: "#43A866",
    borderRadius: 5,
    height: 9,
    width: 9,
  },
  deviceCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 76,
    padding: 13,
  },
  deviceIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 13,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  deviceInfo: {
    flex: 1,
    marginHorizontal: 11,
  },
  deviceName: {
    color: "#1D382A",
    fontSize: 14,
    fontWeight: "800",
  },
  deviceId: {
    color: "#809084",
    fontSize: 10,
    marginTop: 4,
  },
  deviceAction: {
    alignItems: "center",
    backgroundColor: "#2E8B57",
    borderRadius: 12,
    height: 36,
    justifyContent: "center",
    width: 36,
  },
  deviceActionConnected: {
    backgroundColor: "#43A866",
  },
  deviceSeparator: {
    height: 9,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E6ECE7",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 1,
    paddingHorizontal: 22,
    paddingVertical: 25,
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
  },
  emptyDescription: {
    color: "#748579",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 5,
    textAlign: "center",
  },
});