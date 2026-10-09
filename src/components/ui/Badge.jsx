import { Text, View } from 'react-native';

const statuses = {
  upcoming: { label: 'À venir', container: 'bg-warning/10', text: 'text-warning' },
  ready: { label: 'Prêt', container: 'bg-success/10', text: 'text-success' },
  'picked-up': { label: 'Retiré', container: 'bg-muted/10', text: 'text-muted' },
  missed: { label: 'Manqué', container: 'bg-error/10', text: 'text-error' },
};

/**
 * @typedef {'upcoming' | 'ready' | 'picked-up' | 'missed'} BadgeStatus
 * @typedef {{
 *   status: BadgeStatus;
 *   className?: string;
 * }} BadgeProps
 */

/** @param {BadgeProps} props */
export function Badge({ status, className = '' }) {
  const { label, container, text } = statuses[status];

  return (
    <View
      accessible
      accessibilityRole="text"
      accessibilityLabel={label}
      className={`self-start rounded-full px-3 py-1 ${container} ${className}`}
    >
      <Text className={`text-xs font-medium ${text}`}>
        {label}
      </Text>
    </View>
  );
}
