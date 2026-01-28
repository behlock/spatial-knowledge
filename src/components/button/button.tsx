import { clsx } from 'clsx'
import React from 'react'

type ButtonVariant = 'default' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'default' | 'lg'

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ children, variant = 'default', size = 'default', ...props }, ref) => (
    <button
      ref={ref}
      {...props}
      className={clsx(
        // Base styles
        'inline-flex select-none items-center justify-center font-mono',
        'transition-all duration-150 ease-in-out',
        'focus:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'active:scale-[0.98]',
        'rounded',
        // Variant styles
        {
          // Default: filled background
          'bg-secondary text-foreground border border-border hover:bg-muted':
            variant === 'default',
          // Outline: transparent with border
          'bg-transparent text-foreground border border-border hover:bg-secondary':
            variant === 'outline',
          // Ghost: no border, subtle hover
          'bg-transparent text-muted-foreground border-none hover:text-foreground hover:bg-secondary/50':
            variant === 'ghost',
        },
        // Size styles
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'default',
          'px-4 py-2 text-base': size === 'lg',
        }
      )}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
export default Button
