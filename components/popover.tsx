import { Cross1Icon, GlobeIcon } from '@radix-ui/react-icons'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { clsx } from 'clsx'
import { useState } from 'react'
import Button from './button'
import Checkbox from './checkbox'
import Slider from './slider'

interface PopoverProps {
  layers: [number]
  setLayers: (layers: [number]) => void
  maxDepth: number
  allTags: string[]
  selectedTags: string[]
  updateTag: (tag: string, checked: boolean) => void
}

const Popover = (props: PopoverProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(true)
  const updatePopoverOpen = (checked: boolean) => {
    setIsPopoverOpen(checked)
  }

  return (
    <div className="relative inline-block text-left z-10 ">
      <PopoverPrimitive.Root open={isPopoverOpen} onOpenChange={updatePopoverOpen}>
        <PopoverPrimitive.Trigger asChild>
          <Button>
            <div className="flex space-x-2 items-center">
              <GlobeIcon style={{ marginBottom: '1.7px' }} />
              <span>Explore Mind Map</span>
            </div>
          </Button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Content
          align="center"
          sideOffset={4}
          className={clsx(
            'radix-side-top:animate-slide-up radix-side-bottom:animate-slide-down',
            'z-50 w-64 rounded-lg p-4 shadow-md md:w-96',
            'bg-white dark:bg-gray-900',
            'z-10 ml-4'
          )}
        >
          <PopoverPrimitive.Arrow className="fill-current text-white dark:text-gray-800" />
          <h3 className="text-m font-medium text-gray-900 dark:text-gray-100">Exploration Parameters</h3>

          <form className="mt-4 space-y-2">
            <fieldset key={`popover-items-layers`} className="flex flex-col align-middle space-y-2">
              <label
                htmlFor={'layers'}
                className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400"
              >
                {'How much complexity to you want to see?'}
              </label>
              <Slider value={props.layers} min={0} max={props.maxDepth} step={1} onValueChange={props.setLayers} />
              <label
                htmlFor={'tags'}
                className="mr-4 shrink-0 grow text-s font-medium text-gray-700 dark:text-gray-400"
              >
                {'Which themes are you interested in?'}
              </label>
            </fieldset>
            {props.allTags.map((tag) => (
              <fieldset key={`popover-items-checkbox-${tag}`} className="flex align-middle ">
                <Checkbox
                  label={tag}
                  checked={props.selectedTags.includes(tag)}
                  onCheckedChange={(checked) => props.updateTag(tag, checked)}
                />
              </fieldset>
            ))}
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
