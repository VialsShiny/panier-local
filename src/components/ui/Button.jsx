import { Pressable, Text } from 'react-native';

const variants = {
  primary: { container: 'bg-primary', text: 'text-white' },
  secondary: { container: 'bg-secondary', text: 'text-white' },
  outline: { container: 'border border-primary bg-transparent', text: 'text-primary' },
};

/**
 * @typedef {'primary' | 'secondary' | 'outline'} ButtonVariant
 * @typedef {Omit<import('react-native').PressableProps, 'children'> & {
 *   title: string;
 *   variant?: ButtonVariant;
 *   className?: string;
 * }} ButtonProps
 */

/** @param {ButtonProps} props */
export function Button({
  title,
  variant = 'primary',
  className = '',
  disabled = false,
  accessibilityLabel,
  accessibilityState,
  ...props
}) {
  const style = variants[variant];

  return (
    <Pressable
      {...props}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ ...accessibilityState, disabled }}
      disabled={disabled}
      className={`items-center justify-center rounded-lg px-5 py-3 active:opacity-80 ${style.container} ${disabled ? 'opacity-50' : ''} ${className}`}
    >
      <Text className={`text-base font-medium ${style.text}`}>
        {title}
      </Text>
    </Pressable>
  );
}
