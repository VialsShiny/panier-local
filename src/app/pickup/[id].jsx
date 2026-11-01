import { AppText, Badge, Card } from "@/components/ui";
import { getBasketById } from "@/services/basketsService";
import { useLocalSearchParams } from "expo-router";
import QRCode from "react-native-qrcode-svg";
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
  const [isLoading, setIsLoading] = useState(true);

  const getBascketDetails = async (id) => {
    setIsLoading(true);
    const data = await getBasketById(id);
    setBasketDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (id) {
      getBascketDetails(id);
    }
  }, [id]);

  const basket = basketDetails.data;

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
        <ScrollView>
          <View className="mx-auto w-full max-w-sm px-4 pt-6">
            <Card className="mt-4 p-6">
              <AppText>Chargement des détails du panier...</AppText>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    !isLoading && (
      <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
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

                <View className="mt-6 border-t border-border pt-4 dark:border-dark-border">
                  <AppText variant="caption">Lieu de retrait</AppText>
                  <AppText className="mt-1">{basket.pickupLocation}</AppText>
                </View>

                <View className="mt-5">
                  <AppText variant="caption">Date et horaire</AppText>
                  <AppText className="mt-1">{basket.timeSlot}</AppText>
                </View>

                <View className="mt-6 items-center rounded-lg bg-background p-5 dark:bg-dark-background">
                  <AppText className="text-center font-medium">
                    QR code de retrait
                  </AppText>
                  {basket.qrCode ? (
                    <View
                      accessible
                      accessibilityRole="image"
                      accessibilityLabel={`QR code du panier ${basket.qrCode}`}
                      className="mt-4 rounded-lg bg-white p-3"
                    >
                      <QRCode
                        value={basket.qrCode}
                        size={200}
                        color="#0F172A"
                        backgroundColor="#FFFFFF"
                      />
                    </View>
                  ) : (
                    <AppText className="mt-4 text-center" variant="caption">
                      Aucun code de retrait disponible.
                    </AppText>
                  )}
                  {basket.qrCode && (
                    <>
                      <AppText className="mt-3 text-center" variant="caption">
                        Présentez ce code au point de retrait.
                      </AppText>
                      <AppText className="mt-2 text-center font-medium">
                        {basket.qrCode}
                      </AppText>
                    </>
                  )}
                </View>
              </Card>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
}
