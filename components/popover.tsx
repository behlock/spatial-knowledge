import { Cross1Icon, MixerHorizontalIcon } from '@radix-ui/react-icons'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { clsx } from 'clsx'
import Button from './button'
import Slider from './slider'

interface PopoverProps {
  layers: [number]
  setLayers: (layers: number) => void
  maxDepth: number
}

const Popover = (props: PopoverProps) => {
  return (
    <div className="relative inline-block text-left">
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger asChild>
          <Button>
            <MixerHorizontalIcon />
          </Button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'z-50 w-48 rounded-lg p-4 shadow-md md:w-56',
            'bg-white dark:bg-gray-800'
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Filters</h3>

          <form className="mt-4 space-y-2">
            <fieldset key={`popover-items-layers`} className="flex items-center">
              <label
                htmlFor={'layers'}
                className="mr-4 shrink-0 grow text-xs font-medium text-gray-700 dark:text-gray-400"
              >
                {'Levels'}
              </label>
              <Slider
                value={props.layers}
                min={1}
                max={props.maxDepth}
                step={1}
                onValueChange={props.setLayers}
              />
            </fieldset>
          </form>

          <PopoverPrimitive.Close
            className={clsx(
              'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
              'focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
            )}
          >
            <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
          </PopoverPrimitive.Close>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Root>
    </div>
  )
}

export { Popover }
