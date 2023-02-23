import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { Fragment, useState } from 'react'

interface AlertDialogProps {
  isOpen?: boolean
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        <InfoCircledIcon className="cursor-pointer" />
      </AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay forceMount className="fixed inset-0 z-20 bg-black/50" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className={clsx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none'
              )}
            >
              <AlertDialogPrimitive.Title className="text-m font-medium text-gray-900">
                What is Collective Creation Games?
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 whitespace-pre-wrap space-y-4">
                <p>
                  Collective Creation Games was born out of a desire to create a space for people to come together and
                  create something new. We believe that the best games are the ones that are created through
                  playfulness, experimentation, and collaboration.
                </p>

                <p>
                  This exploratory space explains the processes we used to create the games and most importantly the
                  principles we used to guide our work. This is a work in progress, and we hope to continue to add to it
                  as we learn more about the vast world of game design.
                </p>

                <p>
                  The three dimensional "Mind Map" can be navigated by scrolling and panning around. Clicking on a node
                  will collapse or expand the node and its children. The exploration parameters can also be adjusted.
                </p>

                <p>We hope you enjoy our games, and we hope you'll join us in creating something new.</p>
              </AlertDialogPrimitive.Description>
              <div className="mt-4 flex justify-end space-x-2">
                <AlertDialogPrimitive.Action
                  className={clsx(
                    'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                    'bg-gray-600 text-white',
                    'border border-transparent',
                    'focus:outline-none'
                  )}
                >
                  Start Exploring
                </AlertDialogPrimitive.Action>
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export default AlertDialog
