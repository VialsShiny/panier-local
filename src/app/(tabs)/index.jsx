import { BasketCard } from '@/components/BasketCard';
import { AppText } from '@/components/ui/index';
import { getBaskets } from '@/services/basketsService';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [baskets, setBaskets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      <View className="flex-1 items-center justify-center">
        <AppText className="text-xxl" variant='title'>Panier local</AppText>
        <FlatList
          data={baskets}
          renderItem={({ item }) => <BasketCard data={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
}