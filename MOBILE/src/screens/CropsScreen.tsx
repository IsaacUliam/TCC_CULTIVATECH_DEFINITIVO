import React from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export interface CropRecord {
  id: string;
  name: string;
  variety?: string | null;
  plantedAt?: string | null;
}

interface CropsScreenProps {
  navigation?: any;
  route?: {
    params?: {
      gardenName?: string | null;
      crops?: CropRecord[];
    };
  };
  gardenName?: string | null;
  crops?: CropRecord[];
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
    active: true,
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

export function CropsScreen({
  navigation,
  route,
  gardenName: gardenNameProp,
  crops: cropsProp,
}: CropsScreenProps) {
  const gardenName =
    gardenNameProp !== undefined
      ? gardenNameProp
      : (route?.params?.gardenName ?? null);
  const hasGarden = Boolean(gardenName?.trim());
  const crops = cropsProp ?? route?.params?.crops ?? [];
  const visibleCrops = hasGarden ? crops : [];

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

  function handlePrimaryAction() {
    const routes = hasGarden
      ? [
          "PlantLibrary",
          "Library",
          "AddCrop",
          "NovoCultivo",
          "AdicionarCultivo",
        ]
      : ["CreateGarden", "NovaHorta", "AdicionarHorta", "AddGarden"];
    const didNavigate = navigateToRoute(routes);

    if (!didNavigate) {
      Alert.alert(
        hasGarden ? "Cadastro de cultivo" : "Cadastro de horta",
        "Esta ação será disponibilizada quando a tela de cadastro estiver conectada ao aplicativo.",
      );
    }
  }

  function handleExploreLibrary() {
    if (!navigateToRoute(["PlantLibrary", "Library"])) {
      Alert.alert(
        "Biblioteca de plantas",
        "Adicione a rota PlantLibrary ao navegador para abrir o catálogo.",
      );
    }
  }

  function renderCrop({ item }: { item: CropRecord }) {
    return (
      <View style={styles.cropCard}>
        <View style={styles.cropIcon}>
          <MaterialCommunityIcons name="sprout" size={23} color="#2E8B57" />
        </View>
        <View style={styles.cropInfo}>
          <Text style={styles.cropName} numberOfLines={1}>
            {item.name}
          </Text>
          {!!item.variety && (
            <Text style={styles.cropVariety} numberOfLines={1}>
              {item.variety}
            </Text>
          )}
          {!!item.plantedAt && (
            <Text style={styles.cropDate}>Plantado em {item.plantedAt}</Text>
          )}
        </View>
        <Feather name="chevron-right" size={19} color="#8A9B8E" />
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F4" />

      <FlatList
        data={visibleCrops}
        keyExtractor={(item) => item.id}
        renderItem={renderCrop}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cropSeparator} />}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.eyebrow}>CULTIVA TECH</Text>
                <Text style={styles.title}>Minha Horta</Text>
                <Text style={styles.subtitle}>
                  {hasGarden ? gardenName : "Cultivos vinculados à sua conta"}
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <MaterialCommunityIcons
                  name="sprout"
                  size={24}
                  color="#1F6B43"
                />
              </View>
            </View>

            {hasGarden ? (
              <View style={styles.gardenCard}>
                <View style={styles.gardenCardTop}>
                  <View style={styles.gardenIcon}>
                    <Feather name="home" size={19} color="#FFFFFF" />
                  </View>
                  <View style={styles.gardenBadge}>
                    <View style={styles.gardenBadgeDot} />
                    <Text style={styles.gardenBadgeText}>CADASTRADA</Text>
                  </View>
                </View>
                <Text style={styles.gardenName}>{gardenName}</Text>
                <Text style={styles.gardenDescription}>
                  {visibleCrops.length === 1
                    ? "1 cultivo cadastrado nesta horta"
                    : `${visibleCrops.length} cultivos cadastrados nesta horta`}
                </Text>
              </View>
            ) : (
              <View style={styles.noGardenBanner}>
                <View style={styles.noGardenBannerIcon}>
                  <Feather name="info" size={18} color="#82651F" />
                </View>
                <Text style={styles.noGardenBannerText}>
                  Esta conta ainda não possui uma horta cadastrada.
                </Text>
              </View>
            )}

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Cultivos</Text>
                <Text style={styles.sectionSubtitle}>
                  {hasGarden
                    ? `${visibleCrops.length} ${visibleCrops.length === 1 ? "planta cadastrada" : "plantas cadastradas"}`
                    : "Nenhum cultivo para mostrar"}
                </Text>
              </View>
              {visibleCrops.length > 0 && (
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>
                    {visibleCrops.length}
                  </Text>
                </View>
              )}
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <MaterialCommunityIcons
                name={hasGarden ? "sprout-outline" : "home-plus-outline"}
                size={31}
                color="#5E8068"
              />
            </View>
            <Text style={styles.emptyTitle}>
              {hasGarden ? "Nenhum cultivo cadastrado" : "Sem Nenhuma Horta"}
            </Text>
            <Text style={styles.emptyDescription}>
              {hasGarden
                ? "Quando você cadastrar plantas nesta horta, elas aparecerão aqui."
                : "Cadastre uma horta para começar. Não há plantas de demonstração nesta tela."}
            </Text>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handlePrimaryAction}
              accessibilityRole="button"
              accessibilityLabel={
                hasGarden ? "Adicionar cultivo" : "Cadastrar horta"
              }
            >
              <Feather name="plus" size={17} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>
                {hasGarden ? "Adicionar cultivo" : "Cadastrar horta"}
              </Text>
            </TouchableOpacity>
            {!hasGarden && (
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleExploreLibrary}
                accessibilityRole="button"
                accessibilityLabel="Explorar biblioteca de plantas"
              >
                <Feather name="book-open" size={16} color="#2E7549" />
                <Text style={styles.secondaryButtonText}>
                  Explorar biblioteca
                </Text>
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
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  gardenCard: {
    backgroundColor: "#1F6B43",
    borderRadius: 24,
    marginTop: 22,
    overflow: "hidden",
    padding: 20,
  },
  gardenCardTop: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  gardenIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 13,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  gardenBadge: {
    alignItems: "center",
    backgroundColor: "rgba(8,41,24,0.22)",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  gardenBadgeDot: {
    backgroundColor: "#95F2AE",
    borderRadius: 4,
    height: 7,
    marginRight: 6,
    width: 7,
  },
  gardenBadgeText: {
    color: "#E0F8E6",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.45,
  },
  gardenName: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    letterSpacing: -0.5,
    marginTop: 17,
  },
  gardenDescription: {
    color: "#D4EFD9",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 5,
  },
  noGardenBanner: {
    alignItems: "center",
    backgroundColor: "#FFF7E4",
    borderColor: "#F0E3BB",
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: "row",
    marginTop: 20,
    paddingHorizontal: 13,
    paddingVertical: 12,
  },
  noGardenBannerIcon: {
    alignItems: "center",
    backgroundColor: "#F8EDCE",
    borderRadius: 10,
    height: 34,
    justifyContent: "center",
    marginRight: 9,
    width: 34,
  },
  noGardenBannerText: {
    color: "#75612D",
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 17,
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 27,
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
  countBadge: {
    alignItems: "center",
    backgroundColor: "#E5F3E8",
    borderRadius: 13,
    height: 28,
    justifyContent: "center",
    minWidth: 28,
    paddingHorizontal: 8,
  },
  countBadgeText: {
    color: "#2E7549",
    fontSize: 12,
    fontWeight: "800",
  },
  cropCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5ECE6",
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 76,
    padding: 13,
  },
  cropIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 13,
    height: 44,
    justifyContent: "center",
    width: 44,
  },
  cropInfo: {
    flex: 1,
    marginHorizontal: 11,
  },
  cropName: {
    color: "#1D382A",
    fontSize: 14,
    fontWeight: "800",
  },
  cropVariety: {
    color: "#748579",
    fontSize: 11,
    marginTop: 3,
  },
  cropDate: {
    color: "#88968C",
    fontSize: 10,
    marginTop: 4,
  },
  cropSeparator: {
    height: 9,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E6ECE7",
    borderRadius: 22,
    borderWidth: 1,
    marginTop: 1,
    paddingHorizontal: 22,
    paddingVertical: 25,
  },
  emptyIcon: {
    alignItems: "center",
    backgroundColor: "#EEF4EF",
    borderRadius: 22,
    height: 64,
    justifyContent: "center",
    width: 64,
  },
  emptyTitle: {
    color: "#294A34",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "center",
  },
  emptyDescription: {
    color: "#748579",
    fontSize: 12,
    lineHeight: 18,
    marginTop: 6,
    textAlign: "center",
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 14,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 48,
    paddingHorizontal: 17,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
  secondaryButton: {
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#EFF6EF",
    borderColor: "#D8E8DA",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 10,
    minHeight: 44,
  },
  secondaryButtonText: {
    color: "#2E7549",
    fontSize: 12,
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
