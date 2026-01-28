import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { clsx } from 'clsx'

function Tooltip({ children, content, ...props }: { children: React.ReactNode; content: React.ReactNode }) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="left"
          align="center"
          sideOffset={8}
          className={clsx(
            'te-panel px-2 py-1',
            'text-xs font-mono text-foreground',
            'animate-in fade-in-0 slide-in-from-right-1',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-right-1',
            'z-50'
          )}
          {...props}
        >
          {content}
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  )
}

export default Tooltip
