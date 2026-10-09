import { AppText } from '@/components/ui/index';
import { View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <AppText className="text-xxl" variant='title'>Panier local</AppText>
    </View>
  );
}