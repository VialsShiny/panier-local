import { Text } from 'react-native';

const variants = {
  body: 'text-base text-foreground',
  title: 'text-xl font-bold text-foreground',
  caption: 'text-sm text-muted',
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
