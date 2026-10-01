import { useLocalSearchParams } from 'expo-router';

import FeaturePlaceholder from '../../components/feature-placeholder';

export default function PickupDetailsScreen() {
  const { id } = useLocalSearchParams();

  return <FeaturePlaceholder title={`Point de collecte ${id}`} />;
}
