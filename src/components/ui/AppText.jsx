import { Text } from 'react-native';

const variants = {
  body: 'text-base text-foreground dark:text-dark-foreground',
  title: 'text-xl font-bold text-foreground dark:text-dark-foreground',
  caption: 'text-sm text-muted dark:text-dark-muted',
};

/**
 * @typedef {'body' | 'title' | 'caption'} AppTextVariant
 * @typedef {import('react-native').TextProps & {
 *   children: import('react').ReactNode;
 *   variant?: AppTextVariant;
 *   className?: string;
 * }} AppTextProps
 */

/** @param {AppTextProps} props */
export function AppText({ children, variant = 'body', className = '', ...props }) {
  return (
    <Text {...props} className={`${variants[variant]} ${className}`}>
      {children}
    </Text>
  );
}
