import { AppText } from "@/components/ui/AppText";
import { Button } from "@/components/ui/Button";
import { View } from "react-native";

/**
 * @param {{
 *   title: string;
 *   description: string;
 *   actionLabel?: string;
 *   onAction?: () => void;
 *   className?: string;
 * }} props
 */
export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}) {
  return (
    <View className={`items-center px-6 py-10 ${className}`}>
      <AppText className="text-center font-semibold">{title}</AppText>
      <AppText className="mt-2 text-center" variant="caption">
        {description}
      </AppText>
      {actionLabel && onAction && (
        <Button
          title={actionLabel}
          onPress={onAction}
          className="mt-5"
        />
      )}
    </View>
  );
}
