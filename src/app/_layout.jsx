import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import '../global.css';

export function ErrorBoundary({ error, retry }) {
  return (
    <View className="flex-1 items-center justify-center bg-white p-6">
      <Text className="mb-2 text-2xl font-bold">Une erreur est survenue</Text>
      <Text className="mb-6 text-center text-gray-600">
        {__DEV__ ? error.message : "Quelque chose s'est mal passé. Réessayez dans un instant."}
      </Text>

      <View className="w-full gap-3">
        <Pressable
          onPress={retry}
          className="items-center rounded-lg bg-[#2e78b7] px-5 py-3 active:opacity-80"
        >
          <Text className="text-base font-medium text-white">Réessayer</Text>
        </Pressable>

        <Link href="/" replace asChild>
          <Pressable className="items-center rounded-lg border border-gray-300 px-5 py-3 active:opacity-80">
            <Text className="text-base font-medium text-gray-800">
              Retour à l'accueil
            </Text>
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
      <Stack.Screen name="pickup/[id]" options={{ title: 'Point de collecte' }} />
    </Stack>
  );
}
