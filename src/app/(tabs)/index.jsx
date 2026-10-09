import { AppText } from '@/components/ui/index';
import { getBasketsId } from '@/services/basketsService';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function HomeScreen() {
  const [baskets, setBaskets] = useState([]);

  useEffect(() => {
    const loadBaskets = async () => {
      const data = await getBasketsId("basket-001");
      setBaskets(data);
    }

    loadBaskets();
  }, [])

  console.log(baskets);

  return (
    <View className="flex-1 items-center justify-center">
      <AppText className="text-xxl" variant='title'>Panier local</AppText>
    </View>
  );
}