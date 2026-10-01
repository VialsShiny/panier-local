import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import ExploreGuide from '../../components/explore-guide';
import FeaturePlaceholder from '../../components/feature-placeholder';
import { ThemedText } from '../../components/themed-text';
import { Spacing } from '../../constants/theme';

export default function ProfileScreen() {
  const [showGuide, setShowGuide] = useState(false);

  if (showGuide) {
    return (
      <View style={styles.guide}>
        <Pressable onPress={() => setShowGuide(false)} accessibilityRole="button">
          <ThemedText type="link">Retour au profil</ThemedText>
        </Pressable>
        <ExploreGuide />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FeaturePlaceholder title="Profil" />
      <Pressable onPress={() => setShowGuide(true)} accessibilityRole="button">
        <ThemedText type="link">Guide de démarrage</ThemedText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guide: {
    flex: 1,
    paddingTop: Spacing.three,
  },
});
