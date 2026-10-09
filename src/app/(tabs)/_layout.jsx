import { Colors } from '@/constants/theme';
import '@/global.css';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { DynamicColorIOS } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabsLayout() {
  return (
    <SafeAreaView className="flex-1">
      <NativeTabs
        labelStyle={{
          color: DynamicColorIOS({
            dark: Colors.dark.secondary,
            light: Colors.light.primary,
          }),
        }}
        tintColor={DynamicColorIOS({
          dark: Colors.dark.secondary,
          light: Colors.light.primary,
        })}>
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
