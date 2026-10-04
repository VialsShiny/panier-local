import { Link, Stack } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import '../global.css';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page introuvable' }} />
      <View className="flex-1 items-center justify-center p-6">
        <Text className="mb-2 text-xl font-semibold">
          Cette page n'existe pas.
        </Text>
        <Text className="mb-5 text-center">
          Le lien que vous avez suivi est invalide ou a expiré.
        </Text>
        <Link href="/" replace asChild>
          <Pressable className="rounded-lg bg-[#2e78b7] px-5 py-3 active:opacity-80">
            <Text className="text-base font-medium text-white">
              Retour à l'accueil
            </Text>
          </Pressable>
        </Link>
      </View>
    </>
  );
}