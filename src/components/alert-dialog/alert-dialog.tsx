import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Cross1Icon, InfoCircledIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { Fragment, useState } from 'react'

interface AlertDialogProps {
  isOpen?: boolean
  pageNumber?: number
  content: any
  button: any
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        <InfoCircledIcon className="cursor-pointer w-2 h-2" />
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
                'w-[95vw] max-w-xl rounded-lg p-14 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none',
                'flex flex-col space-y-4'
              )}
            >
              <AlertDialogPrimitive.Cancel asChild>
                <button className="absolute top-0 right-0 p-8">
                  <Cross1Icon />
                </button>
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Title className="text-lg font-bold text-gray-900">
                What is Collective Creation Games?
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 space-y-4 whitespace-pre-wrap text-sm font-normal text-gray-700">
                {props.content}
              </AlertDialogPrimitive.Description>

              <div className="mt-4 flex flex-row align-middle">
                <div className="flex flex-grow flex-row justify-start">
                  <div className="mt-5 flex flex-row items-center">
                    <p className="text-sm font-normal text-gray-500">{`Page ${props.pageNumber} of 4`}</p>
                  </div>
                </div>
                <div className="flex flex-grow flex-row justify-end">
                  <div className="flex flex-row items-center">{props.button}</div>
                </div>
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export default AlertDialog
