import * as TooltipPrimitive from '@radix-ui/react-tooltip'

function Tooltip({ children, content, ...props }) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Content
          side="top"
          align="center"
          style={{ background: 'rgb(23 23 23)' }}
          className="text-white p-1 rounded"
          {...props}
        >
          {content}
          <TooltipPrimitive.Arrow width={11} height={5} className='mb-2' />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export default Tooltip
