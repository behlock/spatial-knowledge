import { clsx } from 'clsx'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

import Button from '@/components/button'
import ImagesCarousel from '@/components/carousel'

interface AlertDialogProps {
  children: React.ReactNode
  isOpen?: boolean
  isMobile?: boolean
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
  section: string
  onImagesClick?: () => void
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)
  let [section, setSection] = useState(props.section)

  useEffect(() => {
    setSection(props.section)
  }, [isOpen])

  const totalPages = numberOfPages(section)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>{props.children}</AlertDialogPrimitive.Trigger>
      <AlertDialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <AlertDialogPrimitive.Overlay forceMount className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <AlertDialogPrimitive.Content
              forceMount
              className={clsx(
                'fixed z-50',
                'h-fit w-[95vw] max-w-xl p-6 md:w-full',
                'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                'te-panel',
                'focus:outline-none',
                'flex flex-col'
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <AlertDialogPrimitive.Title className="text-base font-mono text-foreground">
                  {pageTitle(section, props.pageNumber)}
                </AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Cancel asChild onClick={() => props.setPageNumber(1)}>
                  <button className="text-xs font-mono text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
                    [x]
                  </button>
                </AlertDialogPrimitive.Cancel>
              </div>

              {/* Dashed divider */}
              <div className="border-t border-dashed border-border mb-4" />

              {/* Content */}
              <AlertDialogPrimitive.Description asChild>
                <div className="flex-grow text-sm font-mono text-muted-foreground space-y-3 mb-4">
                  {content(props.pageNumber, section, setSection, props.isMobile)}
                </div>
              </AlertDialogPrimitive.Description>

              {/* Footer with navigation */}
              {totalPages > 0 && (
                <>
                  {/* Dashed divider */}
                  <div className="border-t border-dashed border-border mb-4" />

                  <div className="flex items-center justify-between">
                    {/* Previous button */}
                    <div className="w-16">
                      {props.pageNumber > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => props.setPageNumber(props.pageNumber - 1)}>
                          [&larr;]
                        </Button>
                      )}
                    </div>

                    {/* Page indicator */}
                    <span className="text-xs font-mono text-muted-foreground">
                      {props.pageNumber}/{totalPages}
                    </span>

                    {/* Next button */}
                    <div className="w-16 flex justify-end">
                      {props.pageNumber < totalPages && (
                        <Button variant="ghost" size="sm" onClick={() => props.setPageNumber(props.pageNumber + 1)}>
                          [&rarr;]
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

const legendEntry = (color: string, text: string) => (
  <div className="flex items-center gap-3">
    <svg className="w-4 h-4 flex-shrink-0">
      <circle cx="8" cy="8" r="6" fill={color} />
    </svg>
    <span className="text-xs">{text}</span>
  </div>
)

const pageTitle = (section: string, pageNumber: number) => {
  switch (section) {
    case 'info':
      return 'What is Collective Creation Games?'

    case 'howto':
      switch (pageNumber) {
        case 2:
          return 'Legend'

        default:
          return 'Welcome to Collective Creation Games'
      }

    case 'profile':
      switch (pageNumber) {
        case 2:
          return 'Contact'

        default:
          return 'About the Creative Worker'
      }

    case 'pictures':
      return 'Pictures'

    default:
      return ''
  }
}

const numberOfPages = (section: string) => {
  switch (section) {
    case 'info':
      return 2

    case 'howto':
      return 2

    case 'profile':
      return 2

    default:
      return 0
  }
}

const content = (
  pageNumber: number,
  section: string,
  setSection: (s: string) => void,
  isMobile: boolean | undefined
) => {
  switch (section) {
    case 'info':
      switch (pageNumber) {
        case 1:
          return (
            <>
              <p>
                <strong className="text-foreground">Collective Creation Games</strong> create situations of emancipation
                where groups of people collaborate in giving shape to their collective imagination, motion and
                inspiration.
              </p>
              <p>
                These experiences take the form of interventions, installations and workshops. They engage our
                spontaneity, intuition and will to explore in order to draw us into a state of creative flow.
              </p>
              <p>
                Between 2021 and 2022, the <strong className="text-foreground">Pedagogy of Games</strong> program was
                co-developed with 3 groups of youth. Combining arts research and critical pedagogy, all sessions were
                context specific, inclusive and creative experiences.
              </p>
              <p>
                We played, designed the systems of interaction and critically reflected on the dynamics emerging from
                these experiences.
              </p>
            </>
          )

        case 2:
          return (
            <>
              <p>
                This page is a tool to visualize the ongoing development of this methodology. You are invited to
                discover all operations at play between the facilitator, the group and the system at different stages of
                the process. To see it in action, check out{' '}
                <span
                  className="text-foreground cursor-pointer hover:underline"
                  onClick={() => setSection('pictures')}
                >
                  our pictures
                </span>
                , and
                <a
                  className="ml-1 text-foreground hover:underline"
                  href="https://www.youtube.com/@ramichahine8875/videos"
                  target="_blank"
                  rel="noreferrer"
                >
                  videos
                </a>
                .
              </p>
            </>
          )

        default:
          return null
      }
    case 'howto':
      switch (pageNumber) {
        case 1:
          return (
            <div className="flex flex-col space-y-4">
              {!isMobile && (
                <div className="flex flex-col items-center">
                  <Image src="/assets/check-boxes.svg" alt="check-boxes" width={90} height={60} className="invert" />
                  <span className="text-xs mt-1">Select</span>
                </div>
              )}
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/node-click-expand.svg"
                  alt="node-click-expand"
                  width={isMobile ? 100 : 140}
                  height={isMobile ? 60 : 70}
                  className="invert"
                />
                <span className="text-xs mt-1">Expand/Collapse</span>
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-col items-center">
                  <Image src="/assets/figure-rotate.svg" alt="figure-rotate" width={80} height={50} className="invert" />
                  <span className="text-xs mt-1">Rotate</span>
                </div>
                <div className="flex flex-col items-center text-center px-2">
                  <span className="text-xs">Click & connect the dots</span>
                  <span className="text-xs">to discover our method</span>
                </div>
                <div className="flex flex-col items-center">
                  <Image src="/assets/taskbar.svg" alt="taskbar" width={80} height={50} className="invert" />
                  <span className="text-xs mt-1">Find info</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <Image
                  src="/assets/zoom-out.svg"
                  alt="zoom-out"
                  width={isMobile ? 100 : 140}
                  height={isMobile ? 60 : 70}
                  className="invert"
                />
                <span className="text-xs mt-1">Zoom in/out</span>
              </div>
            </div>
          )
        case 2:
          return (
            <div className="flex flex-col space-y-2">
              {legendEntry('#ba0938', 'Initial Nodes')}
              {legendEntry('#e092aa', 'Operations during street intervention')}
              {legendEntry('#e14b52', 'Operations during a workshop session')}
              {legendEntry('#a88bc9', 'Post-session reflection')}
              {legendEntry('#8e5397', 'Post-street intervention reflection')}
              {legendEntry('#9daa53', 'Pre-session planning')}
              {legendEntry('#abb675', 'Planning street intervention')}
              {legendEntry('#c5a228', 'Concepts & insights')}
            </div>
          )

        default:
          return null
      }

    case 'profile':
      switch (pageNumber) {
        case 1:
          return (
            <div className="flex flex-col space-y-3">
              <p>
                Rami Chahine (1987, Lebanon) has developed experimental painting processes, built installations, painted
                murals, designed a sketching pouch, designed art games, made street interventions inviting all passersby
                to participate in creation, and co-founded the Zayraqoun street performance collective.
              </p>
              <p>
                He taught Visual Arts at the International College in 2018/19 and has since been developing the method
                of "Collective Creation Games": using games to provide the adequate fertile grounds for the emergence of
                creative, systems thinking and critical reflection.
              </p>
              <p>
                He now provides it as a service in the form of workshops or consultancies for educational and social
                endeavors and researchers aiming to engage people in collective creative actions. Rami holds a B.A in
                business administration from AUB, and a B.A in product design from ALBA.
              </p>
            </div>
          )

        case 2:
          return (
            <>
              <p>
                If your endeavor is related to individuals learning, trying and creating together then we can
                collaborate. Get in touch, share the theme you are working on and together we can develop the
                appropriate Collective creation game(s) for the situation. It can take the form of: A consultancy, a
                short intervention (From 15 mins to 1hr), a workshop (From 1 to 6 days) or a program (Long term).
              </p>
              <div className="space-y-1">
                <p>
                  Email:{' '}
                  <a className="text-foreground hover:underline" href="mailto:rami.o.chahine@gmail.com">
                    rami.o.chahine@gmail.com
                  </a>
                </p>
                <p>
                  Youtube:{' '}
                  <a
                    className="text-foreground hover:underline"
                    href="https://www.youtube.com/@ramichahine8875/videos"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Collective Creation Games
                  </a>
                </p>
                <p>
                  Instagram:{' '}
                  <a
                    className="text-foreground hover:underline"
                    href="https://www.instagram.com/ramichahine.atwork/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @ramichahine.atwork
                  </a>
                </p>
              </div>
              <p className="text-xs opacity-70 mt-2">
                Sustaining myself is important, but creating such experiences with people in the streets is equally so.
                Therefore part of the fee of any commissioned project will be used to fund street interventions.
              </p>
            </>
          )
      }

    case 'pictures':
      return <ImagesCarousel />

    default:
      return <></>
  }
}

export default AlertDialog
