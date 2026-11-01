import { View } from "react-native";

/**
 * @param {{ className?: string }} props
 */
export function Skeleton({ className = "" }) {
  return (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      className={`rounded-md bg-muted/10 dark:bg-dark-muted/15 ${className}`}
    />
  );
}
