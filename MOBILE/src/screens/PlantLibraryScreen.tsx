import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { plantReferenceData } from "./PlantReferenceData";

export type PlantDifficulty =
  | "Muito fácil"
  | "Fácil"
  | "Médio"
  | "Médio / Avançado";

export interface PlantCatalogEntry {
  id: string;
  name: string;
  categoryId: string;
  varieties?: string[];
  note?: string;
  referenceNotes?: string;
  airHumidityRange?: string;
  temperatureRangeC?: string;
  growthCycleDays?: string;
  cycleBasis?: string;
  confidence?: "high" | "medium" | "low";
  sources?: PlantReferenceSource[];
}

export interface PlantReferenceSource {
  title: string;
  publisher: string;
  url: string;
  supports: string;
}

interface PlantLibraryScreenProps {
  navigation?: any;
  route?: {
    params?: {
      gardenId?: string | number | null;
      gardenName?: string | null;
    };
  };
  gardenId?: string | number | null;
  gardenName?: string | null;
  onAddPlant?: (plant: PlantCatalogEntry) => void | Promise<void>;
}

interface PlantCategory {
  id: string;
  title: string;
  difficulty: PlantDifficulty;
  system: string;
  shortSystem: string;
}

const categories: PlantCategory[] = [
  {
    id: "folhosas",
    title: "Hortaliças de folhas",
    difficulty: "Fácil",
    system: "NFT (perfis com fluxo de água) ou DWC (cultivo em solução).",
    shortSystem: "NFT ou DWC",
  },
  {
    id: "aromaticas",
    title: "Ervas, condimentos e aromáticas",
    difficulty: "Fácil",
    system: "NFT (perfis com fluxo de água) ou DWC (cultivo em solução).",
    shortSystem: "NFT ou DWC",
  },
  {
    id: "frutos",
    title: "Frutos e hortaliças de fruto",
    difficulty: "Médio / Avançado",
    system:
      "Gotejamento em substrato (fibra de coco ou argila) ou NFT de perfil largo.",
    shortSystem: "Gotejamento ou NFT largo",
  },
  {
    id: "microgreens",
    title: "Microgreens e brotos",
    difficulty: "Muito fácil",
    system:
      "Bandejas com papel ou fibra, sem recirculação contínua da solução.",
    shortSystem: "Bandejas sem recirculação",
  },
  {
    id: "raizes",
    title: "Raízes e tubérculos",
    difficulty: "Médio",
    system:
      "Substrato inerte (perlita e fibra de coco), com gotejamento ou subirrigação.",
    shortSystem: "Substrato + gotejamento",
  },
  {
    id: "flores",
    title: "Flores comestíveis",
    difficulty: "Médio",
    system:
      "Sistema e nível variam conforme a espécie; avaliar porte e suporte antes do plantio.",
    shortSystem: "Ajustar por espécie",
  },
];

const basePlants: PlantCatalogEntry[] = [
  // Hortaliças de folhas
  {
    id: "alface",
    name: "Alface",
    categoryId: "folhosas",
    varieties: ["Crespa", "Lisa", "Americana", "Roxa", "Romana", "Mimosa"],
  },
  { id: "rucula", name: "Rúcula", categoryId: "folhosas" },
  {
    id: "agriao",
    name: "Agrião",
    categoryId: "folhosas",
    varieties: ["D'água", "De terra"],
  },
  { id: "espinafre", name: "Espinafre", categoryId: "folhosas" },
  { id: "couve-manteiga", name: "Couve-manteiga", categoryId: "folhosas" },
  {
    id: "couve-chinesa",
    name: "Couve-chinesa",
    categoryId: "folhosas",
    varieties: ["Pak Choi", "Bok Choy"],
  },
  {
    id: "almeirao",
    name: "Almeirão",
    categoryId: "folhosas",
    varieties: ["Pão de açúcar", "Folha larga"],
  },
  {
    id: "chicoria-escarola",
    name: "Chicória / Escarola",
    categoryId: "folhosas",
  },
  { id: "acelga", name: "Acelga", categoryId: "folhosas" },
  {
    id: "mostarda-folhas",
    name: "Mostarda (folhas)",
    categoryId: "folhosas",
  },
  { id: "radicchio", name: "Radicchio", categoryId: "folhosas" },
  { id: "mentrasto", name: "Mentrasto", categoryId: "folhosas" },
  { id: "serralha", name: "Serralha", categoryId: "folhosas" },

  // Ervas, condimentos e aromáticas
  {
    id: "manjericao",
    name: "Manjericão",
    categoryId: "aromaticas",
    varieties: ["Italiano", "Roxo", "Tailandês", "Genovês"],
  },
  { id: "cebolinha", name: "Cebolinha", categoryId: "aromaticas" },
  {
    id: "salsa",
    name: "Salsa",
    categoryId: "aromaticas",
    varieties: ["Lisa", "Crespa"],
  },
  { id: "coentro", name: "Coentro", categoryId: "aromaticas" },
  {
    id: "hortela",
    name: "Hortelã",
    categoryId: "aromaticas",
    varieties: ["Mentha"],
  },
  { id: "oregano", name: "Orégano", categoryId: "aromaticas" },
  { id: "manjerona", name: "Manjerona", categoryId: "aromaticas" },
  { id: "tomilho", name: "Tomilho", categoryId: "aromaticas" },
  { id: "alecrim", name: "Alecrim", categoryId: "aromaticas" },
  { id: "salvia", name: "Sálvia", categoryId: "aromaticas" },
  { id: "salvia-da-horta", name: "Sálvia-da-horta", categoryId: "aromaticas" },
  { id: "estragao", name: "Estragão", categoryId: "aromaticas" },
  { id: "camomila", name: "Camomila", categoryId: "aromaticas" },
  {
    id: "erva-cidreira",
    name: "Erva-cidreira",
    categoryId: "aromaticas",
    varieties: ["Melissa"],
  },
  { id: "capim-limao", name: "Capim-limão", categoryId: "aromaticas" },
  {
    id: "endro",
    name: "Endro",
    categoryId: "aromaticas",
    varieties: ["Dill"],
  },
  {
    id: "salsao",
    name: "Salsão / Aipo",
    categoryId: "aromaticas",
  },

  // Frutos e hortaliças de fruto
  { id: "morango", name: "Morango", categoryId: "frutos" },
  {
    id: "tomate",
    name: "Tomate",
    categoryId: "frutos",
    varieties: ["Cereja", "Italiano", "Salada", "Grape"],
  },
  {
    id: "pimentao",
    name: "Pimentão",
    categoryId: "frutos",
    varieties: ["Verde", "Amarelo", "Vermelho", "Mini-pimentão"],
  },
  {
    id: "pimentas",
    name: "Pimentas",
    categoryId: "frutos",
    varieties: [
      "Dedo-de-moça",
      "Jalapeño",
      "Habanero",
      "Biquinho",
      "Malagueta",
    ],
  },
  {
    id: "pepino",
    name: "Pepino",
    categoryId: "frutos",
    varieties: ["Japonês", "Mini-pepino"],
    note: "Aipim foi classificado em raízes e tubérculos.",
  },
  {
    id: "berinjela",
    name: "Berinjela",
    categoryId: "frutos",
    varieties: ["Mini", "Tradicional (com suporte)"],
  },
  {
    id: "abobrinha",
    name: "Abobrinha",
    categoryId: "frutos",
    varieties: ["Variedades arbustivas ou compactas"],
  },
  {
    id: "melao",
    name: "Melão",
    categoryId: "frutos",
    varieties: ["Mini-melão conduzido em treliça"],
  },
  {
    id: "melancia",
    name: "Melancia",
    categoryId: "frutos",
    varieties: ["Mini (com suporte para os frutos)"],
  },

  // Microgreens e brotos
  {
    id: "broto-girassol",
    name: "Broto de girassol",
    categoryId: "microgreens",
  },
  { id: "broto-ervilha", name: "Broto de ervilha", categoryId: "microgreens" },
  { id: "broto-alfalfa", name: "Broto de alfalfa", categoryId: "microgreens" },
  { id: "broto-trevo", name: "Broto de trevo", categoryId: "microgreens" },
  {
    id: "micro-repolho-roxo",
    name: "Microgreen de repolho roxo",
    categoryId: "microgreens",
  },
  {
    id: "micro-beterraba",
    name: "Microgreen de beterraba",
    categoryId: "microgreens",
  },
  {
    id: "micro-rabano",
    name: "Microgreen de rábano",
    categoryId: "microgreens",
  },
  {
    id: "micro-mostarda",
    name: "Microgreen de mostarda",
    categoryId: "microgreens",
  },

  // Raízes e tubérculos
  {
    id: "rabanete",
    name: "Rabanete",
    categoryId: "raizes",
    note: "Opção rápida entre as raízes.",
  },
  {
    id: "cenoura",
    name: "Cenoura",
    categoryId: "raizes",
    varieties: ["Variedades curtas ou mini"],
  },
  { id: "beterraba", name: "Beterraba", categoryId: "raizes" },
  { id: "nabo", name: "Nabo", categoryId: "raizes" },
  {
    id: "alho-cebola",
    name: "Alho e cebola",
    categoryId: "raizes",
    varieties: ["Folhas ou bulbos em substrato leve"],
  },
  {
    id: "batatas",
    name: "Batata-doce / Batata",
    categoryId: "raizes",
    varieties: ["Escala experimental/técnica; aeroponia ou substrato leve"],
  },
  {
    id: "aipim",
    name: "Aipim / Mandioca",
    categoryId: "raizes",
    note: "Classificado aqui como raiz/tubérculo; cultivo hidropônico é experimental.",
  },

  // Flores comestíveis
  { id: "capuchinha", name: "Capuchinha", categoryId: "flores" },
  { id: "amor-perfeito", name: "Amor-perfeito", categoryId: "flores" },
  { id: "calendula", name: "Calêndula", categoryId: "flores" },
  { id: "borragem", name: "Borragem", categoryId: "flores" },
  { id: "violas", name: "Violas", categoryId: "flores" },
];

const plants: PlantCatalogEntry[] = basePlants.map((plant) => ({
  ...plant,
  ...plantReferenceData[plant.id],
}));

const difficultyFilters: Array<"Todas" | PlantDifficulty> = [
  "Todas",
  "Muito fácil",
  "Fácil",
  "Médio",
  "Médio / Avançado",
];

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");
}

function PlantMetric({
  icon,
  label,
  value,
  wide = false,
}: {
  icon: "wind" | "thermometer" | "clock";
  label: string;
  value: string;
  wide?: boolean;
}) {
  return (
    <View style={[styles.growthMetric, wide && styles.growthMetricWide]}>
      <View style={styles.growthMetricLabelRow}>
        <Feather name={icon} size={13} color="#5E8068" />
        <Text style={styles.growthMetricLabel}>{label}</Text>
      </View>
      <Text style={styles.growthMetricValue}>{value}</Text>
    </View>
  );
}

function PlantReferenceNotes({ notes }: { notes: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.referenceDetails}>
      <TouchableOpacity
        style={styles.referenceToggle}
        onPress={() => setExpanded((value) => !value)}
        accessibilityRole="button"
        accessibilityLabel={
          expanded ? "Ocultar nota técnica" : "Ver nota técnica"
        }
      >
        <Feather
          name={expanded ? "chevron-up" : "info"}
          size={13}
          color="#52745D"
        />
        <Text style={styles.referenceToggleText}>
          {expanded ? "Ocultar observação técnica" : "Observação técnica"}
        </Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.referenceNotesText}>{notes}</Text>}
    </View>
  );
}

function PlantReferenceSources({
  sources,
}: {
  sources: PlantReferenceSource[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.referenceDetails}>
      <TouchableOpacity
        style={styles.referenceToggle}
        onPress={() => setExpanded((value) => !value)}
        accessibilityRole="button"
        accessibilityLabel={
          expanded
            ? "Ocultar referências técnicas"
            : `Ver ${sources.length} referências técnicas`
        }
      >
        <Feather
          name={expanded ? "chevron-up" : "book-open"}
          size={13}
          color="#52745D"
        />
        <Text style={styles.referenceToggleText}>
          {expanded
            ? "Ocultar fontes"
            : `Ver fontes técnicas (${sources.length})`}
        </Text>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.referenceSourceList}>
          {sources.map((source, index) => (
            <TouchableOpacity
              key={`${source.url}-${index}`}
              style={styles.referenceSourceItem}
              onPress={() =>
                Linking.openURL(source.url).catch(() =>
                  Alert.alert("Link indisponível", source.title),
                )
              }
              accessibilityRole="link"
              accessibilityLabel={`Abrir ${source.title}, ${source.publisher}`}
            >
              <Text style={styles.referenceSourcePublisher}>
                {source.publisher}
              </Text>
              <Text style={styles.referenceSourceTitle}>{source.title}</Text>
              <Text style={styles.referenceSourceSupports}>
                {source.supports}
              </Text>
              <Text style={styles.referenceSourceOpen}>ABRIR FONTE ↗</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

function formatReferenceValue(value?: string) {
  if (!value) return "Não informado";
  if (/^não localizad[oa]/i.test(value.trim())) {
    return "Sem faixa confiável disponível";
  }
  return value;
}

export function PlantLibraryScreen({
  navigation,
  route,
  gardenId: gardenIdProp,
  gardenName: gardenNameProp,
  onAddPlant,
}: PlantLibraryScreenProps) {
  const gardenId =
    gardenIdProp !== undefined
      ? gardenIdProp
      : (route?.params?.gardenId ?? null);
  const gardenName =
    gardenNameProp !== undefined
      ? gardenNameProp
      : (route?.params?.gardenName ?? null);
  const hasGarden = Boolean(gardenId || gardenName?.trim());
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    "Todas" | PlantDifficulty
  >("Todas");
  const [addingPlantId, setAddingPlantId] = useState<string | null>(null);
  const [addedPlantIds, setAddedPlantIds] = useState<string[]>([]);

  const filteredPlants = useMemo(() => {
    const query = normalizeSearch(search.trim());

    return plants.filter((plant) => {
      const category = categories.find((item) => item.id === plant.categoryId);
      if (!category) return false;
      if (
        selectedCategory !== "todas" &&
        plant.categoryId !== selectedCategory
      ) {
        return false;
      }
      if (
        selectedDifficulty !== "Todas" &&
        category.difficulty !== selectedDifficulty
      ) {
        return false;
      }
      if (!query) return true;

      const searchableText = normalizeSearch(
        [
          plant.name,
          ...(plant.varieties ?? []),
          category.title,
          category.difficulty,
          category.system,
          plant.note ?? "",
        ].join(" "),
      );
      return searchableText.includes(query);
    });
  }, [search, selectedCategory, selectedDifficulty]);

  function handleBack() {
    if (navigation?.canGoBack?.()) {
      navigation.goBack();
      return;
    }
    const parentRoutes = ["Crops", "Horta"];
    let currentNavigation = navigation;
    while (currentNavigation) {
      const availableRoutes = currentNavigation.getState?.()?.routeNames ?? [];
      const targetRoute = parentRoutes.find((name) =>
        availableRoutes.includes(name),
      );
      if (targetRoute) {
        currentNavigation.navigate(targetRoute);
        return;
      }
      currentNavigation = currentNavigation.getParent?.();
    }
  }

  async function handleAddPlant(plant: PlantCatalogEntry) {
    if (!hasGarden) return;
    if (!onAddPlant) {
      Alert.alert(
        "Cadastro ainda não conectado",
        "O catálogo está pronto, mas a ação de salvar a planta precisa ser ligada ao cadastro de cultivos da horta.",
      );
      return;
    }

    setAddingPlantId(plant.id);
    try {
      await onAddPlant(plant);
      setAddedPlantIds((previous) =>
        previous.includes(plant.id) ? previous : [...previous, plant.id],
      );
    } catch (error) {
      console.error("Erro ao adicionar planta à horta:", error);
      Alert.alert("Não foi possível adicionar", "Tente novamente.");
    } finally {
      setAddingPlantId(null);
    }
  }

  function renderPlant({ item }: { item: PlantCatalogEntry }) {
    const category = categories.find((entry) => entry.id === item.categoryId);
    if (!category) return null;

    const wasAdded = addedPlantIds.includes(item.id);
    const isAdding = addingPlantId === item.id;
    const confidenceLabel = item.confidence
      ? { high: "Boa", medium: "Média", low: "Limitada" }[item.confidence]
      : null;

    return (
      <View style={styles.plantCard}>
        <View style={styles.plantCardTop}>
          <View style={styles.plantIcon}>
            <MaterialCommunityIcons
              name={item.categoryId === "flores" ? "flower-outline" : "sprout"}
              size={23}
              color="#2E8B57"
            />
          </View>
          <View style={styles.plantTitleGroup}>
            <Text style={styles.plantName}>{item.name}</Text>
            <Text style={styles.plantCategory}>{category.title}</Text>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              category.difficulty === "Muito fácil" && styles.veryEasyBadge,
              category.difficulty === "Fácil" && styles.easyBadge,
              category.difficulty === "Médio" && styles.mediumBadge,
              category.difficulty === "Médio / Avançado" &&
                styles.advancedBadge,
            ]}
          >
            <Text
              style={[
                styles.difficultyBadgeText,
                category.difficulty === "Muito fácil" && styles.veryEasyText,
                category.difficulty === "Fácil" && styles.easyText,
                category.difficulty === "Médio" && styles.mediumText,
                category.difficulty === "Médio / Avançado" &&
                  styles.advancedText,
              ]}
            >
              {category.difficulty}
            </Text>
          </View>
        </View>

        {!!item.varieties?.length && (
          <Text style={styles.varieties}>
            <Text style={styles.inlineLabel}>Variedades: </Text>
            {item.varieties.join(" · ")}
          </Text>
        )}
        {!!item.note && <Text style={styles.plantNote}>{item.note}</Text>}

        <View style={styles.growthMetrics}>
          <PlantMetric
            icon="wind"
            label="Umidade relativa do ar"
            value={formatReferenceValue(item.airHumidityRange)}
          />
          <PlantMetric
            icon="thermometer"
            label="Temperatura do ar"
            value={formatReferenceValue(item.temperatureRangeC)}
          />
          <PlantMetric
            icon="clock"
            label="Ciclo médio"
            value={formatReferenceValue(item.growthCycleDays)}
            wide
          />
        </View>
        {!!item.cycleBasis && (
          <Text style={styles.cycleBasis}>Período: {item.cycleBasis}</Text>
        )}
        {!!confidenceLabel && (
          <Text style={styles.confidenceText}>
            Nível de evidência: {confidenceLabel}
          </Text>
        )}
        {!!item.referenceNotes && (
          <PlantReferenceNotes notes={item.referenceNotes} />
        )}
        {!!item.sources?.length && (
          <PlantReferenceSources sources={item.sources} />
        )}

        <View style={styles.systemRow}>
          <Feather name="droplet" size={14} color="#5E8068" />
          <Text style={styles.systemText}>{category.shortSystem}</Text>
        </View>

        <TouchableOpacity
          style={[
            styles.addButton,
            (!hasGarden || wasAdded) && styles.addButtonDisabled,
          ]}
          onPress={() => handleAddPlant(item)}
          disabled={!hasGarden || wasAdded || isAdding}
          accessibilityRole="button"
          accessibilityLabel={
            !hasGarden
              ? `Cadastre uma horta antes de adicionar ${item.name}`
              : wasAdded
                ? `${item.name} adicionado`
                : `Adicionar ${item.name} à horta`
          }
        >
          {isAdding ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : wasAdded ? (
            <Feather name="check" size={16} color="#FFFFFF" />
          ) : (
            <Feather name="plus" size={16} color="#FFFFFF" />
          )}
          <Text style={styles.addButtonText}>
            {wasAdded
              ? "Adicionada"
              : hasGarden
                ? "Adicionar à horta"
                : "Cadastre uma horta para adicionar"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#F6F8F4" />

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBack}
          accessibilityRole="button"
          accessibilityLabel="Voltar"
        >
          <Feather name="arrow-left" size={22} color="#1F6B43" />
        </TouchableOpacity>
        <View style={styles.topBarTitles}>
          <Text style={styles.topBarTitle}>Biblioteca de plantas</Text>
          <Text style={styles.topBarSubtitle}>Catálogo de referência</Text>
        </View>
        <View style={styles.topBarIcon}>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={21}
            color="#1F6B43"
          />
        </View>
      </View>

      <FlatList
        data={filteredPlants}
        keyExtractor={(item) => item.id}
        renderItem={renderPlant}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cardGap} />}
        ListHeaderComponent={
          <>
            <View style={styles.introCard}>
              <View style={styles.introIcon}>
                <Feather name="book-open" size={20} color="#FFFFFF" />
              </View>
              <Text style={styles.introTitle}>Encontre sua próxima planta</Text>
              <Text style={styles.introText}>
                O catálogo apresenta espécies disponíveis para cultivo. Cada
                ficha traz referências de umidade relativa do ar, temperatura e
                ciclo médio para ajudar você a escolher o que plantar.
              </Text>
              <Text style={styles.catalogCount}>
                {plants.length} opções no catálogo
              </Text>
            </View>

            <Text style={styles.referenceNotice}>
              Em hidroponia, a umidade do solo não se aplica. As fichas mostram
              referências de umidade relativa e temperatura do ar; os valores
              podem variar por cultivar, ambiente e fase de crescimento.
            </Text>

            {!hasGarden && (
              <View style={styles.noGardenNotice}>
                <Feather name="info" size={17} color="#84691E" />
                <Text style={styles.noGardenText}>
                  Você pode explorar o catálogo. Para adicionar plantas,
                  primeiro cadastre uma horta.
                </Text>
              </View>
            )}

            <View style={styles.searchShell}>
              <Feather name="search" size={17} color="#7D8E81" />
              <TextInput
                value={search}
                onChangeText={setSearch}
                placeholder="Buscar planta, variedade ou sistema"
                placeholderTextColor="#95A198"
                style={styles.searchInput}
                returnKeyType="search"
                accessibilityLabel="Buscar no catálogo de plantas"
              />
              {!!search && (
                <TouchableOpacity
                  onPress={() => setSearch("")}
                  accessibilityRole="button"
                  accessibilityLabel="Limpar busca"
                >
                  <Feather name="x-circle" size={17} color="#94A096" />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.filterLabel}>Categorias</Text>
            <View style={styles.filterScrollContainer}>
              <FlatList
                horizontal
                data={[{ id: "todas", title: "Todas" }, ...categories]}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
                renderItem={({ item }) => {
                  const selected = selectedCategory === item.id;
                  return (
                    <TouchableOpacity
                      style={[styles.chip, selected && styles.chipSelected]}
                      onPress={() => setSelectedCategory(item.id)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected && styles.chipTextSelected,
                        ]}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <Text style={styles.filterLabel}>Nível de dificuldade</Text>
            <View style={styles.filterScrollContainer}>
              <FlatList
                horizontal
                data={difficultyFilters}
                keyExtractor={(item) => item}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.chipsRow}
                renderItem={({ item }) => {
                  const selected = selectedDifficulty === item;
                  return (
                    <TouchableOpacity
                      style={[styles.chip, selected && styles.chipSelected]}
                      onPress={() => setSelectedDifficulty(item)}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                    >
                      <Text
                        style={[
                          styles.chipText,
                          selected && styles.chipTextSelected,
                        ]}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <View style={styles.sectionHeader}>
              <View>
                <Text style={styles.sectionTitle}>Plantas</Text>
                <Text style={styles.sectionSubtitle}>
                  {filteredPlants.length}{" "}
                  {filteredPlants.length === 1 ? "resultado" : "resultados"}
                </Text>
              </View>
              <MaterialCommunityIcons name="sprout" size={20} color="#679073" />
            </View>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Feather name="search" size={22} color="#6E8774" />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma planta encontrada</Text>
            <Text style={styles.emptyDescription}>
              Tente outro termo ou remova algum filtro.
            </Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>
              Resumo do sistema ideal por grupo
            </Text>
            <Text style={styles.summaryIntro}>
              Referências gerais para planejar o cultivo hidropônico.
            </Text>
            {categories.map((category) => (
              <View key={category.id} style={styles.summaryRow}>
                <View style={styles.summaryTopLine}>
                  <Text style={styles.summaryGroup}>{category.title}</Text>
                  <View style={styles.summaryLevelBadge}>
                    <Text style={styles.summaryLevelText}>
                      {category.difficulty}
                    </Text>
                  </View>
                </View>
                <Text style={styles.summarySystem}>{category.system}</Text>
              </View>
            ))}
            <Text style={styles.summaryFootnote}>
              Raízes e tubérculos precisam de suporte físico em substrato
              inerte; não devem ficar imersos continuamente sem sustentação.
            </Text>
          </View>
        }
      />
    </View>
  );
}

export const LibraryScreen = PlantLibraryScreen;
export const Library = PlantLibraryScreen;
export default PlantLibraryScreen;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#F6F8F4",
    flex: 1,
  },
  topBar: {
    alignItems: "center",
    backgroundColor: "#F6F8F4",
    borderBottomColor: "#E8EEE9",
    borderBottomWidth: 1,
    flexDirection: "row",
    minHeight: 76,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "#E7F2E9",
    borderRadius: 21,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  topBarTitles: {
    flex: 1,
    marginHorizontal: 11,
  },
  topBarTitle: {
    color: "#1F6B43",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.25,
  },
  topBarSubtitle: {
    color: "#819083",
    fontSize: 10,
    marginTop: 2,
  },
  topBarIcon: {
    alignItems: "center",
    backgroundColor: "#E5F3E8",
    borderRadius: 21,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  listContent: {
    paddingBottom: 35,
    paddingHorizontal: 18,
    paddingTop: 17,
  },
  introCard: {
    backgroundColor: "#1F6B43",
    borderRadius: 22,
    marginBottom: 14,
    padding: 18,
  },
  introIcon: {
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 12,
    height: 41,
    justifyContent: "center",
    width: 41,
  },
  introTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
    marginTop: 13,
  },
  introText: {
    color: "#D4EFD9",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
  },
  catalogCount: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(8,41,24,0.23)",
    borderRadius: 12,
    color: "#E0F8E6",
    fontSize: 10,
    fontWeight: "800",
    marginTop: 12,
    overflow: "hidden",
    paddingHorizontal: 9,
    paddingVertical: 6,
  },
  referenceNotice: {
    backgroundColor: "#EFF5EF",
    borderColor: "#DDE9DE",
    borderRadius: 12,
    borderWidth: 1,
    color: "#5E7462",
    fontSize: 10,
    lineHeight: 15,
    marginBottom: 14,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  noGardenNotice: {
    alignItems: "flex-start",
    backgroundColor: "#FFF7E4",
    borderColor: "#F0E3BB",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  noGardenText: {
    color: "#75612D",
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },
  searchShell: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E3EAE4",
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 49,
    paddingHorizontal: 13,
  },
  searchInput: {
    color: "#294A34",
    flex: 1,
    fontSize: 12,
    minHeight: 47,
    paddingHorizontal: 10,
  },
  filterLabel: {
    color: "#526C58",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 7,
    marginTop: 17,
  },
  filterScrollContainer: {
    marginHorizontal: -18,
  },
  chipsRow: {
    paddingHorizontal: 18,
    gap: 7,
  },
  chip: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E8E1",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: "#1F6B43",
    borderColor: "#1F6B43",
  },
  chipText: {
    color: "#6E7F72",
    fontSize: 10,
    fontWeight: "700",
  },
  chipTextSelected: {
    color: "#FFFFFF",
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 23,
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
  plantCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E4EBE5",
    borderRadius: 17,
    borderWidth: 1,
    padding: 13,
  },
  plantCardTop: {
    alignItems: "center",
    flexDirection: "row",
  },
  plantIcon: {
    alignItems: "center",
    backgroundColor: "#E7F5EB",
    borderRadius: 12,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  plantTitleGroup: {
    flex: 1,
    marginHorizontal: 10,
  },
  plantName: {
    color: "#1D382A",
    fontSize: 13,
    fontWeight: "800",
  },
  plantCategory: {
    color: "#829086",
    fontSize: 9,
    marginTop: 3,
  },
  difficultyBadge: {
    borderRadius: 10,
    maxWidth: 105,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  veryEasyBadge: {
    backgroundColor: "#E7F5EB",
  },
  easyBadge: {
    backgroundColor: "#EDF4E0",
  },
  mediumBadge: {
    backgroundColor: "#FFF4DB",
  },
  advancedBadge: {
    backgroundColor: "#FBE8E3",
  },
  difficultyBadgeText: {
    fontSize: 8,
    fontWeight: "800",
    textAlign: "center",
  },
  veryEasyText: {
    color: "#267044",
  },
  easyText: {
    color: "#617A30",
  },
  mediumText: {
    color: "#956D12",
  },
  advancedText: {
    color: "#A24F3F",
  },
  varieties: {
    color: "#6F7F73",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 11,
  },
  inlineLabel: {
    color: "#45634C",
    fontWeight: "800",
  },
  plantNote: {
    color: "#85713A",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 7,
  },
  growthMetrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 11,
  },
  growthMetric: {
    backgroundColor: "#F7F9F7",
    borderColor: "#E8EEE8",
    borderRadius: 11,
    borderWidth: 1,
    flexBasis: "48%",
    flexGrow: 1,
    minHeight: 58,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  growthMetricWide: {
    flexBasis: "100%",
  },
  growthMetricLabelRow: {
    alignItems: "center",
    flexDirection: "row",
  },
  growthMetricLabel: {
    color: "#738176",
    fontSize: 9,
    fontWeight: "700",
    marginLeft: 5,
  },
  growthMetricValue: {
    color: "#294A34",
    fontSize: 11,
    fontWeight: "800",
    marginTop: 6,
  },
  cycleBasis: {
    color: "#7E8B81",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 6,
  },
  confidenceText: {
    color: "#718075",
    fontSize: 9,
    marginTop: 5,
  },
  referenceDetails: {
    marginTop: 6,
  },
  referenceToggle: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    minHeight: 28,
    paddingVertical: 5,
  },
  referenceToggleText: {
    color: "#3F6F4D",
    fontSize: 9,
    fontWeight: "800",
    marginLeft: 5,
  },
  referenceNotesText: {
    backgroundColor: "#F6F8F6",
    borderLeftColor: "#8FB59A",
    borderLeftWidth: 2,
    color: "#5F7063",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 3,
    paddingHorizontal: 9,
    paddingVertical: 8,
  },
  referenceSourceList: {
    gap: 7,
    marginTop: 3,
  },
  referenceSourceItem: {
    backgroundColor: "#F7F9F7",
    borderColor: "#E5ECE6",
    borderRadius: 10,
    borderWidth: 1,
    padding: 9,
  },
  referenceSourcePublisher: {
    color: "#55705D",
    fontSize: 8,
    fontWeight: "800",
    lineHeight: 12,
  },
  referenceSourceTitle: {
    color: "#294A34",
    fontSize: 9,
    fontWeight: "800",
    lineHeight: 13,
    marginTop: 3,
  },
  referenceSourceSupports: {
    color: "#66766A",
    fontSize: 8,
    lineHeight: 12,
    marginTop: 4,
  },
  referenceSourceOpen: {
    color: "#2E7549",
    fontSize: 8,
    fontWeight: "800",
    marginTop: 6,
  },
  systemRow: {
    alignItems: "center",
    backgroundColor: "#F5F8F5",
    borderRadius: 10,
    flexDirection: "row",
    marginTop: 11,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  systemText: {
    color: "#5F7665",
    flex: 1,
    fontSize: 9,
    fontWeight: "700",
    marginLeft: 6,
  },
  addButton: {
    alignItems: "center",
    backgroundColor: "#1F6B43",
    borderRadius: 11,
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    marginTop: 10,
    minHeight: 38,
    paddingHorizontal: 10,
  },
  addButtonDisabled: {
    backgroundColor: "#A7B7AA",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  cardGap: {
    height: 9,
  },
  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E4EBE5",
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  emptyIcon: {
    alignItems: "center",
    backgroundColor: "#EEF4EF",
    borderRadius: 20,
    height: 54,
    justifyContent: "center",
    width: 54,
  },
  emptyTitle: {
    color: "#294A34",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 12,
  },
  emptyDescription: {
    color: "#748579",
    fontSize: 11,
    lineHeight: 17,
    marginTop: 5,
    textAlign: "center",
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E4EBE5",
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 22,
    padding: 15,
  },
  summaryTitle: {
    color: "#1D382A",
    fontSize: 15,
    fontWeight: "800",
  },
  summaryIntro: {
    color: "#7A8C7E",
    fontSize: 10,
    lineHeight: 15,
    marginTop: 4,
  },
  summaryRow: {
    borderTopColor: "#EDF1ED",
    borderTopWidth: 1,
    marginTop: 11,
    paddingTop: 10,
  },
  summaryTopLine: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  summaryGroup: {
    color: "#365540",
    flex: 1,
    fontSize: 10,
    fontWeight: "800",
    marginRight: 8,
  },
  summaryLevelBadge: {
    backgroundColor: "#EFF5EF",
    borderRadius: 9,
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  summaryLevelText: {
    color: "#5B765F",
    fontSize: 8,
    fontWeight: "800",
  },
  summarySystem: {
    color: "#79877C",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 5,
  },
  summaryFootnote: {
    backgroundColor: "#F5F8F5",
    borderRadius: 10,
    color: "#64796A",
    fontSize: 9,
    lineHeight: 14,
    marginTop: 14,
    overflow: "hidden",
    padding: 10,
  },
});