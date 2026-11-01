import { AppText } from '@/components/ui/index';
import { View } from 'react-native';

export default function MapScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
      <AppText variant='title'>Carte</AppText>
    </View>
  );
}