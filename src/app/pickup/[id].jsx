import { AppText, Badge, Card } from "@/components/ui";
import { getBasketsById } from "@/services/basketsService";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PickupDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [basketDetails, setBasketDetails] = useState({
    status: false,
    message: "",
    data: null,
  });

  const getBascketDetails = async (id) => {
    const data = await getBasketsById(id);
    setBasketDetails(data);
  };

  useEffect(() => {
    if (id) {
      getBascketDetails(id);
    }
  }, [id]);

  const basket = basketDetails.data;

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="mx-auto w-full max-w-sm px-4 pb-8">
          <AppText className="mt-6" variant="title">
            Détail du panier
          </AppText>

          {!basket && (
            <Card className="mt-4 p-6">
              <AppText>
                {basketDetails.message || "Aucun panier sélectionné"}
              </AppText>
            </Card>
          )}

          {basket && (
            <Card className="mt-4 p-6">
              <View className="flex-row items-start justify-between">
                <AppText className="flex-1 pr-3 text-lg font-medium">
                  {basket.title}
                </AppText>
                <Badge status={basket.status} />
              </View>

              <View className="mt-6 border-t border-border pt-4">
                <AppText variant="caption">Lieu de retrait</AppText>
                <AppText className="mt-1">{basket.pickupLocation}</AppText>
              </View>

              <View className="mt-5">
                <AppText variant="caption">Date et horaire</AppText>
                <AppText className="mt-1">{basket.timeSlot}</AppText>
              </View>

              <View className="mt-5 rounded-lg bg-background p-4">
                <AppText variant="caption">Code du panier</AppText>
                <AppText className="mt-1 font-medium">{basket.qrCode}</AppText>
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
