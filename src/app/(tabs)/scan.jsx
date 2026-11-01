import { AppText } from '@/components/ui/index';
import { View } from 'react-native';

export default function ScanScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background dark:bg-dark-background">
      <AppText variant='title'>Scan</AppText>
    </View>
  );
}