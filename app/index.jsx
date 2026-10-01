import { Redirect } from 'expo-router';
import '../global.css';

export default function IndexRoute() {
  return <Redirect href="/(tabs)" />;
}
