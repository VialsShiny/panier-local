import { BasketCard } from "@/components/BasketCard";
import { AppText } from "@/components/ui/index";
import { getBaskets } from "@/services/basketsService";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [baskets, setBaskets] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadBaskets = useCallback(async () => {
    const data = await getBaskets();
    setBaskets(data);
    setIsLoading(false);
    setRefreshing(false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadBaskets();
  }, [loadBaskets]);

  useEffect(() => {
    loadBaskets();
  }, [loadBaskets]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText className="text-xxl" variant="title">
          Chargement...
        </AppText>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 pb-2">
      <FlatList
        data={baskets.data ?? []}
        renderItem={({ item }) => <BasketCard data={item} />}
        keyExtractor={(item) => item.id}
        className="flex-1 mx-auto"
        ListHeaderComponent={
          <View className="mx-auto px-4">
            <AppText className="text-xxl" variant="title">
              Panier local
            </AppText>
          </View>
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
