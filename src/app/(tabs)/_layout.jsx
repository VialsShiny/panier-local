import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import '../../global.css';

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Accueil', tabBarIcon: () => <MaterialCommunityIcons name="home-flood" size={24} color="black" />, tabBarActiveTintColor: "red" }} />
      <Tabs.Screen name="map" options={{ title: 'Carte', tabBarIcon: () => <MaterialCommunityIcons name="map-marker" size={24} color="black" /> }} />
      <Tabs.Screen name="scan" options={{ title: 'Scanner', tabBarIcon: () => <MaterialCommunityIcons name="qrcode-scan" size={24} color="black" /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profil', tabBarIcon: () => <MaterialCommunityIcons name="account" size={24} color="black" /> }} />
    </Tabs>
  );
}
