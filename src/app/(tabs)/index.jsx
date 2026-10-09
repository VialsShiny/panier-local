import { BasketCard } from '@/components/BasketCard';
import { AppText } from '@/components/ui/index';
import { getBaskets } from '@/services/basketsService';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [baskets, setBaskets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const loadBaskets = async () => {
      const data = await getBaskets();
      setBaskets(data);
      setIsLoading(false);
    }

    loadBaskets();
  }, [baskets]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <AppText className="text-xxl" variant='title'>Chargement...</AppText>
      </View>
    )
  }

  return (
    <SafeAreaView className="flex-1 pb-2">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View className="flex-1 justify-center items-center">
          <AppText className="text-xxl" variant='title'>Panier local</AppText>
          <FlatList
            data={baskets}
            renderItem={({ item }) => <BasketCard data={item} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}