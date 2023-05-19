import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { Cross1Icon, GlobeIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { Fragment, useState } from 'react'

interface AlertDialogProps {
  isOpen?: boolean
  pageNumber?: number
  language?: string
  changeLanguage?: any
  content: any
  previousButton?: any
  forwardButton: any
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        <InfoCircledIcon className="h-5 w-5 cursor-pointer" />
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
              <button
                className="absolute flex space-x-2 align-middle items-center mb-4 top-3.5 right-0 px-20 py-8"
                onClick={() => {
                  props.changeLanguage()
                }}
              >
                <GlobeIcon className="h-4 w-4" />
                <text className='text-sm'>{props.language}</text>
              </button>
              <AlertDialogPrimitive.Cancel asChild>
                <button className="absolute top-0 right-0 p-8 focus:outline-none">
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
                  {props.previousButton ? (
                    <div className="mr-3 flex flex-row items-center">{props.previousButton}</div>
                  ) : (
                    <></>
                  )}
                  <div className="mt-3 flex flex-row items-center">
                    <p className="text-sm font-normal text-gray-500">{`${props.pageNumber} / 6`}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <div className="flex flex-row items-center">{props.forwardButton}</div>
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
