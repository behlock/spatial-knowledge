import * as SwitchPrimitive from '@radix-ui/react-switch'
import { clsx } from 'clsx'

interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
}

const Switch = (props: SwitchProps) => {
  return (
    <SwitchPrimitive.Root
      className={clsx(
        'group',
        'radix-state-checked:bg-gray-200',
        'radix-state-unchecked:bg-gray-200 dark:radix-state-unchecked:bg-gray-800',
        'relative inline-flex h-[24px] w-[44px] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus-visible:ring '
      )}
      checked={props.checked}
      onCheckedChange={props.onChange}
    >
      <SwitchPrimitive.Thumb
        className={clsx(
          'group-radix-state-checked:translate-x-5',
          'group-radix-state-unchecked:translate-x-0',
          'pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full transition duration-200 ease-in-out',
          `${props.checked ? 'bg-gray-900' : 'bg-gray-100'}`,
          'mt-0.5'

        )}
      />
    </SwitchPrimitive.Root>
  )
}

export default Switch
