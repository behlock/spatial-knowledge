import Button from '@/components/button'
import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowRightIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import { Fragment, useRef, useState } from 'react'

interface AlertDialogProps {
  isOpen?: boolean
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)
  let [page, setPage] = useState(1)

  const buttonRef = useRef(null)

  const updatePage = () => {
    setPage(page + 1)
  }

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
                'w-[95vw] max-w-xl rounded-lg p-14 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white',
                'focus:outline-none',
                'flex flex-col space-y-4'
              )}
            >
              <AlertDialogPrimitive.Title className="text-lg font-bold text-gray-900">
                What is Collective Creation Games?
              </AlertDialogPrimitive.Title>
              {
                page === 1 ? (
                  <>
                    <AlertDialogPrimitive.Description className="mt-2 space-y-4 whitespace-pre-wrap text-sm font-normal text-gray-700">
                      <p>
                        <b>Collective Creation Games (CCG)</b> creates spaces of possibility, where groups of people
                        come together in shaping extraordinary creative visual experiences.
                      </p>
                      <p>
                        By <b>critically engaging</b> as groups, in the design and trial of such an <b>art of games</b>,
                        using
                        <b>mainly found materials and the surrounding environment</b>, we fulfill a place where we can
                        explore the subtle dynamics at play between <b>the individual and the collective</b>, where we
                        can develop our
                        <b>collective imagination</b>, our <b>capacities to co-create</b>, transform materials and
                        spaces and our <b>disposition to rethink and try out our systems of cooperation</b>.
                      </p>
                      <p>
                        Both these claims have been put into the test during street interventions, festivals, workshop
                        sessions with groups, collectives, alternative education endeavors, and grassroots
                        organizations. A methodological framework has been developed in praxis with 3 groups of youth
                        between 2021 and 2022 in a rich laboratory program combining creative process and critical
                        pedagogy. It has brought to light the main faculties which engage our attention at different
                        phases of the process, mainly designing the game boundaries, understanding/embracing the role of
                        the facilitator and the importance of the critical reflection, observing the individual/group
                        dynamics and tending the creative process.
                      </p>
                      <p>
                        This page is a visual mind map depicting relationships between all the processes and faculties
                        at play at the different stages of planning, facilitating, and reflecting on the sessions. With
                        the support of :
                        <image href="/assets/AFAC final logo with descriptor.png" />
                      </p>
                    </AlertDialogPrimitive.Description>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button ref={buttonRef} onClick={updatePage}>
                        <ArrowRightIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <AlertDialogPrimitive.Description className="mt-2 space-y-4 whitespace-pre-wrap text-sm font-normal text-gray-700">
                      <p>
                        The <b>3D mindmap</b> is an invitation to explore, to build relationships and approach things
                        from different perspectives.
                      </p>
                      <p>How to navigate it:</p>
                      <p>
                        By clicking on a central <i>node</i>, you reveal its <i>leaves</i>. By clicking on it again you
                        collapse them.
                      </p>
                      <img ref="/assets/3D mindmap.png" />
                      <p>You can rotate around the map.</p>
                      <img ref="/assets/3D mindmap.png" />
                      <p>You can zoom in/out.</p>
                      <img ref="/assets/3D mindmap.png" />
                      <p>
                        Depending on your interest you can choose one of the topics from the <i>Themes</i>dropdown menu.
                      </p>
                      <img ref="/assets/3D mindmap.png" />
                      <p>
                        You can isolate the nodes which will link you to the videos. And you can also visit our Youtube
                        channel <i>Collective creation games</i>.
                      </p>
                      <img ref="/assets/3D mindmap.png" />
                    </AlertDialogPrimitive.Description>
                    <div className="mt-4 flex justify-end space-x-2">
                      <Button ref={buttonRef} onClick={updatePage}>
                        <ArrowRightIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                )
                // else if (page === 3) {
                //   <>
                //     <AlertDialogPrimitive.Description className="mt-2 space-y-4 whitespace-pre-wrap text-sm font-normal text-gray-700">
                //       <p>
                //         Our method has many applications which might benefit you and your organization. If its related to
                //         individuals and collectives, learning, thinking, designing, trying, creating then we can probably
                //         work together.
                //       </p>
                //       <p>
                //         Have a look at the Topic "How can we work together?" or even better, contact us so that we can
                //         better understand how we can help you achieve what you need.
                //         <br></br>
                //         Phone: +961 3 593660
                //         <br></br>
                //         Email: Rami.o.chahine@gmail.com
                //       </p>
                //     </AlertDialogPrimitive.Description>
                //     <div className="mt-4 flex justify-end space-x-2">
                //       <AlertDialogPrimitive.Action
                //         className={clsx(
                //           'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
                //           'bg-gray-600 text-white',
                //           'border border-transparent',
                //           'focus:outline-none'
                //         )}
                //       >
                //         Start Exploring
                //       </AlertDialogPrimitive.Action>
                //     </div>
                //   </>
              }
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

export default AlertDialog
