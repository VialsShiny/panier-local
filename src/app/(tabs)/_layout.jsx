import { Colors } from "@/constants/theme";
import "@/global.css";
import { NativeTabs } from "expo-router/native-tabs";
import { useColorScheme } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
  const { colorScheme } = useColorScheme();
  const tintColor =
    colorScheme === "dark" ? Colors.dark.tabTint : Colors.light.primary;

  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-dark-background">
      <NativeTabs
        labelStyle={{
          color: tintColor,
        }}
        tintColor={tintColor}
      >
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="map">
          <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="map" md="map" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="scan">
          <NativeTabs.Trigger.Label>Scan</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="qrcode" md="qrcode" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="person" md="person" />
        </NativeTabs.Trigger>
      </NativeTabs>
    </SafeAreaView>
  );
}
