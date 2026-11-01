import { BasketCard } from "@/components/BasketCard";
import { AppText, Card, EmptyState, Skeleton } from "@/components/ui";
import { getBaskets } from "@/services/basketsService";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [baskets, setBaskets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState("upcoming");
  const [loadError, setLoadError] = useState(null);

  const loadBaskets = useCallback(async () => {
    setIsLoading(true);
    setLoadError(null);
    try {
      const response = await getBaskets();
      if (!response?.status) {
        throw new Error(
          response?.message || "Impossible de charger les paniers.",
        );
      }
      if (!Array.isArray(response.data)) {
        throw new Error("La liste des paniers reçue est invalide.");
      }
      setBaskets(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des paniers :", error);
      setLoadError(
        error instanceof Error
          ? error.message
          : "Une erreur inattendue est survenue.",
      );
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBaskets();
  }, [loadBaskets]);

  useEffect(() => {
    loadBaskets();
  }, [loadBaskets]);

  const visibleBaskets = baskets.filter((basket) =>
    activeFilter === "upcoming"
      ? ["upcoming", "ready"].includes(basket.status)
      : ["picked-up", "missed"].includes(basket.status),
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
        <View className="mx-auto w-full max-w-sm px-4 pt-6">
          <Skeleton className="h-8 w-48" />
          <View className="mt-4 flex-row rounded-xl bg-muted/10 p-1 dark:bg-dark-muted/10">
            <Skeleton className="h-11 flex-1 bg-card dark:bg-dark-card" />
            <Skeleton className="ml-1 h-11 flex-1" />
          </View>
          {[0, 1, 2].map((item) => (
            <Card key={item} className="mt-4 p-6">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-6 h-4 w-1/2 self-end" />
            </Card>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background pb-2 dark:bg-dark-background">
      <FlatList
        data={visibleBaskets}
        renderItem={({ item }) => <BasketCard data={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1 mx-auto"
        ItemSeparatorComponent={() => (
          <View className="mx-4 my-2 h-px bg-border" />
        )}
        ListHeaderComponent={
          <View className="mx-auto w-full max-w-sm px-4 pb-6">
            <AppText className="text-xxl" variant="title">
              {activeFilter === "upcoming"
                ? "Prochain retrait"
                : "Paniers passés"}
            </AppText>
            <View className="mt-4 flex-row rounded-xl bg-muted/10 p-1 dark:bg-dark-muted/10">
              {[
                { key: "upcoming", label: "À venir" },
                { key: "past", label: "Passés" },
              ].map((filter) => {
                const selected = activeFilter === filter.key;

                return (
                  <Pressable
                    key={filter.key}
                    onPress={() => setActiveFilter(filter.key)}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    className={`flex-1 items-center rounded-lg px-4 py-3 ${
                      selected ? "bg-card dark:bg-dark-card" : ""
                    }`}
                  >
                    <AppText
                      className={
                        selected
                          ? "font-medium"
                          : "text-muted dark:text-dark-muted"
                      }
                    >
                      {filter.label}
                    </AppText>
                  </Pressable>
                );
              })}
            </View>
            {loadError && (
              <EmptyState
                title="Impossible de charger les paniers"
                description={loadError}
                actionLabel="Réessayer"
                onAction={onRefresh}
                className="mt-2"
              />
            )}
          </View>
        }
        ListEmptyComponent={
          !loadError ? (
            <EmptyState
              title={
                baskets.length === 0
                  ? "Aucun panier pour le moment"
                  : activeFilter === "upcoming"
                    ? "Aucun panier à venir"
                    : "Aucun panier passé"
              }
              description={
                baskets.length === 0
                  ? "Vos paniers apparaîtront ici dès qu’ils seront disponibles."
                  : activeFilter === "upcoming"
                    ? "Vous n’avez pas de retrait à venir."
                    : "Vos paniers récupérés ou manqués apparaîtront ici."
              }
              className="mx-auto max-w-sm"
            />
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={"#64748B"}
          />
        }
      />
    </SafeAreaView>
  );
}
