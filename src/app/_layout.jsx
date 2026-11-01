import "@/global.css";
import { Link, Stack } from "expo-router";
import { Pressable, View } from "react-native";
import { AppText } from "@/components/ui/AppText";

export function ErrorBoundary({ error, retry }) {
  return (
    <View className="flex-1 items-center justify-center bg-background p-6 dark:bg-dark-background">
      <AppText className="mb-2 text-2xl font-bold">
        Une erreur est survenue
      </AppText>
      <AppText className="mb-6 text-center" variant="caption">
        {__DEV__
          ? error.message
          : "Quelque chose s'est mal passé. Réessayez dans un instant."}
      </AppText>

      <View className="w-full gap-3">
        <Pressable
          onPress={retry}
          className="items-center rounded-lg bg-primary px-5 py-3 active:opacity-80 dark:bg-dark-primary"
        >
          <AppText className="text-base font-medium text-white">
            Réessayer
          </AppText>
        </Pressable>

        <Link href="/" replace asChild>
          <Pressable className="items-center rounded-lg border border-border px-5 py-3 active:opacity-80 dark:border-dark-border">
            <AppText className="text-base font-medium text-foreground dark:text-dark-foreground">
              Retour à l'accueil
            </AppText>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="pickup/[id]"
        options={{ title: "Point de collecte", headerShown: false }}
      />
    </Stack>
  );
}
