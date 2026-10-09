import BasketCard from '@/components/BasketCard';
import { AppText } from '@/components/ui/index';
import { getBasketsId } from '@/services/basketsService';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [baskets, setBaskets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBaskets = async () => {
      const data = await getBasketsId("basket-001");
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
    <View className="flex-1 items-center justify-center">
      <AppText className="text-xxl" variant='title'>Panier local</AppText>
      <BasketCard data={baskets} />
    </View>
  );
}