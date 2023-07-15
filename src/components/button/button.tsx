import { clsx } from 'clsx'
import React from 'react'

type Props = Omit<React.ComponentProps<'button'>, 'className'> & {}

const Button = React.forwardRef<HTMLButtonElement, Props>(({ children, ...props }, ref) => (
  <button
    ref={ref}
    {...props}
    className={clsx(
      'inline-flex select-none items-center justify-center rounded-md py-1 px-1 text-sm font-medium',
      'bg-gray-200 text-gray-700 ',
      // 'hover:bg-gray-50',
      'focus:outline-none',
      // Register all radix states
      'group',
      'radix-state-open:bg-gray-50',
      // 'radix-state-on:bg-gray-50',
      'radix-state-delayed-open:bg-gray-50 radix-state-instant-open:bg-gray-50',
      'z-50 mt-2 max-w-fit space-y-4'
    )}
  >
    {children}
  </button>
))

Button.displayName = 'Button'
export default Button
