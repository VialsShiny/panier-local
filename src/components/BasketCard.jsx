import { AppText, Badge, Card } from "@/components/ui";
import { View } from "react-native";

export default function BasketCard(data) {
  if (data.data) data = data.data;

  return (
    <Card className="mt-4 p-6 max-w-sm">
      <View className="w-full flex-row items-start">
        <AppText className="flex-1 text-lg font-medium">{data.title}</AppText>
        <Badge status={data.status} className="ml-3" />
      </View>
      <AppText className="mt-4" variant="caption">{data.pickupLocation}</AppText>
      <AppText className="mt-6 text-right text-xs" variant="caption">{data.timeSlot}</AppText>
    </Card>
  )
}