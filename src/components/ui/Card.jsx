import { View } from 'react-native';

/**
 * @typedef {import('react-native').ViewProps & {
 *   children: import('react').ReactNode;
 *   className?: string;
 * }} CardProps
 */

/** @param {CardProps} props */
export function Card({ children, className = '', ...props }) {
  return (
    <View
      {...props}
      className={`rounded-lg border border-border bg-card p-md ${className}`}
    >
      {children}
    </View>
  );
}
