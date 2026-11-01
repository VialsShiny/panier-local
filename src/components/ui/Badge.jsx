import { Text, View } from 'react-native';

const statuses = {
  upcoming: {
    label: 'À venir',
    container: 'bg-warning/10 dark:bg-dark-warning/10',
    text: 'text-warning dark:text-dark-warning',
  },
  ready: {
    label: 'Prêt',
    container: 'bg-success/10 dark:bg-dark-success/10',
    text: 'text-success dark:text-dark-success',
  },
  'picked-up': {
    label: 'Retiré',
    container: 'bg-muted/10 dark:bg-dark-muted/10',
    text: 'text-muted dark:text-dark-muted',
  },
  missed: {
    label: 'Manqué',
    container: 'bg-error/10 dark:bg-dark-error/10',
    text: 'text-error dark:text-dark-error',
  },
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
