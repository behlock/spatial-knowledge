import { clsx } from 'clsx'
import Image from 'next/image'
import { Fragment, useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowLeftIcon, ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons'

import Button from '@/components/button'
import ImagesCarousel from '@/components/carousel'
// import { Language, isEnglish, changeLanguage} from '@/modules/language'

interface AlertDialogProps {
  children: React.ReactNode
  isOpen?: boolean
  isMobile?: boolean
  // language: Language
  // setLanguage: (language: Language) => void
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

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>{props.children}</AlertDialogPrimitive.Trigger>
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
                'h-fit w-[95vw] max-w-xl rounded-lg p-10 md:w-full',
                'left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-gray-100',
                'focus:outline-none',
                'flex flex-col px-8'
              )}
            >
              {/* <button
                className="absolute top-3.5 right-0 mb-4 flex items-center space-x-2 px-4 py-8 align-middle"
                onClick={() => {
                  props.setLanguage(changeLanguage(props.language))
                }}
              >
                {isEnglish(props.language) ? (
                  <>
                    <GlobeIcon className="h-4 w-4" />
                    <text className="text-sm">{changeLanguage(props.language)}</text>
                  </>
                ) : (
                  <>
                    <text className="text-sm">{changeLanguage(props.language)}</text>
                    <GlobeIcon className="h-4 w-4" />
                  </>
                )}
              </button> */}
              <div className="flex h-fit flex-row items-center justify-center">
                <AlertDialogPrimitive.Title className="h-fit text-lg font-bold text-gray-900">
                  {pageTitle(section, props.pageNumber)}
                </AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Cancel asChild onClick={() => props.setPageNumber(1)}>
                  <button className="flex  w-fit flex-auto justify-end  focus:outline-none">
                    <Cross1Icon />
                  </button>
                </AlertDialogPrimitive.Cancel>
              </div>
              <AlertDialogPrimitive.Description className="color-white space-pre-wrap mb-4 mt-4 flex flex-grow flex-col justify-center space-y-4 align-middle text-sm font-normal text-gray-700 ">
                {/* {props.isMobile ? mobileContent(props.pageNumber) : desktopContent(props.pageNumber)} */}
                {content(props.pageNumber, section, setSection, props.isMobile)}
              </AlertDialogPrimitive.Description>
              <div className="flex flex-row justify-end align-bottom">
                {numberOfPages(section) != 0 ? (
                  <>
                    <div className="flex flex-row justify-start">
                      {previousPageButton(props.pageNumber, props.setPageNumber) ? (
                        <div className="mr-3 flex flex-row items-center">
                          {previousPageButton(props.pageNumber, props.setPageNumber)}
                        </div>
                      ) : (
                        <></>
                      )}
                      {/* <div className="mt-2 flex flex-row flex-grow items-center">
                        <p className="text-sm font-normal text-gray-500">{`${props.pageNumber} / ${props.totalPages}`}</p>
                      </div> */}
                    </div>
                    <div className="flex h-fit w-fit  flex-auto justify-end ">
                      {forwardPageButton(props.pageNumber, props.setPageNumber, numberOfPages(section))}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </AlertDialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </AlertDialogPrimitive.Portal>
    </AlertDialogPrimitive.Root>
  )
}

const previousPageButton = (pageNumber: number, setPageNumber: (pageNumber: number) => void) => {
  switch (pageNumber) {
    case 1:
      return null

    default:
      return (
        <Button onClick={() => setPageNumber(pageNumber - 1)}>
          <ArrowLeftIcon className="h-5 w-5" />
        </Button>
      )
  }
}

const forwardPageButton = (
  pageNumber: number,
  setPageNumber: (pageNumber: number) => void,
  totalPages: number | undefined
) => {
  switch (pageNumber) {
    case totalPages:
      return (
        <></>
        // <AlertDialogPrimitive.Action
        //   className={clsx(
        //     'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
        //     'bg-neutral-900 text-white',
        //     'border border-transparent',
        //     'focus:outline-none'
        //   )}
        // >
        //   Start Exploring
        // </AlertDialogPrimitive.Action>
      )

    default:
      return (
        <Button onClick={() => setPageNumber(pageNumber + 1)}>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      )
  }
}

const legendEntry = (color: string, text: string) => (
  <div className="flex h-10 flex-row">
    <svg className="w-10">
      <circle cx="10" cy="10" r="10" fill={color} />
    </svg>
    <text className="text-left align-baseline">{text}</text>
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

// const mobileContent = (pageNumber: number, language: Language) => {
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
          return true ? (
            <>
              <p>
                <b>Collective Creation Games</b> create situations of emancipation where groups of people collaborate in
                giving shape to their collective imagination, motion and inspiration.
              </p>
              <p>
                These experiences take the form of interventions, installations and workshops. They engage our
                spontaneity, intuition and will to explore in order to draw us into a state of creative flow.
              </p>
              <p>
                Between 2021 and 2022, the <b>Pedagogy of Games</b> program was co-developed with 3 groups of youth.
                Combining arts research and critical pedagogy, all sessions were context specific, inclusive and
                creative experiences.
              </p>
              <p>
                We played, designed the systems of interaction and critically reflected on the dynamics emerging from
                these experiences.
              </p>
            </>
          ) : (
            <div className="space-y-2 text-right">
              <p>
                تخلق ألعاب الإبداع الجماعي مواقف من التحرر حيث تتعاون مجموعات من الناس في تشكيل خيالهم الجماعي، حركتهم
                وإلهامهم
              </p>
              <p>
                تأخذ هذه التجارب شكل مداخلات وتركيبات وورش عمل. تفعّل من عبرها عفويّتنا وحدسنا وإرادتنا في الاستكشاف، من
                أجل جذبنا إلى حالة من التدفق والإنسجام الإبداعي
              </p>
            </div>
          )

        case 2:
          return true ? (
            <>
              <p>
                This page is a tool to visualize the ongoing development of this methodology. You are invited to
                discover all operations at play between the facilitator, the group and the system at different stages of
                the process. To see it in action, check out{' '}
                <text className=" cursor-pointer text-blue-600" onClick={() => setSection('pictures')}>
                  our pictures
                </text>
                , and
                <a
                  className="ml-1 text-blue-600"
                  href="https://www.youtube.com/@ramichahine8875/videos"
                  target="_blank"
                  rel="noreferrer"
                >
                  videos
                </a>
                .
              </p>
              <p>With the support of:</p>
              <p>
                <Image src="/assets/AFAC.jpg" alt="AFAC" width={100} height={50} className="mx-auto mt-2 flex" />
              </p>
            </>
          ) : (
            <div className="space-y-2 text-right">
              <p>
                هذه الصفحة هي وسيلة مرئية للتعبير عن خصوصيّة هذه الممارسة. تدعوك لاستكشاف الإطار المنهجي الذي قمنا
                بتطويره، واكتشاف جميع العمليات التي تبني اللعب بين الميسر والمجموعة والنظام في مراحل مختلفة من العملية:
                .التخطيط ما قبل الجلسة، التيسير أثناء الجلسة و انعكاس ما بعد الجلسة
              </p>
              <p>
                <a
                  className="ml-1 mr-1 text-blue-600"
                  href="https://www.youtube.com/@ramichahine8875/videos"
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
                يتم استكمالها بمقاطع فيديو لجميع التجارب على القناة الخاصة بنا. إضغط هنا
              </p>
              <p>
                :بدعم من
                <Image src="/assets/AFAC.jpg" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
              </p>
            </div>
          )

        default:
          return null
      }
    case 'howto':
      switch (pageNumber) {
        case 1:
          return (
            <div className="flex flex-col space-y-1">
              {!isMobile && (
                <div className="flex w-fit flex-grow flex-col items-center pl-10 pt-2">
                  <Image src="/assets/check-boxes.svg" alt="check-boxes" width={80} height={40} />
                  Select
                </div>
              )}
              <div className="mt-2 flex flex-row">
                <div className="flex flex-grow flex-col items-center">
                  <Image
                    src="/assets/node-click-expand.svg"
                    alt="node-click-expand"
                    width={isMobile ? 100 : 160}
                    height={isMobile ? 60 : 70}
                    className="mx-auto "
                  />
                  Expand/Collapse
                </div>
              </div>
              <div className="flex flex-row">
                <div className="flex flex-grow flex-col items-center">
                  <Image
                    src="/assets/figure-rotate.svg"
                    alt="figure-rotate"
                    width={100}
                    height={50}
                    className="mx-auto "
                  />
                  Rotate
                </div>
                <div className="flex flex-col pt-10 text-center font-bold">
                  <text>Click and connect the dots </text>
                  <text>to discover our method</text>
                </div>

                <div className="flex flex-grow flex-col items-center">
                  <Image src="/assets/taskbar.svg" alt="taskbar" width={100} height={50} className="mx-auto " />
                  Find info
                </div>
              </div>
              <div className="flex flex-grow flex-col items-center">
                <Image
                  src="/assets/zoom-out.svg"
                  alt="zoom-out"
                  width={isMobile ? 100 : 160}
                  height={isMobile ? 60 : 70}
                  className="mx-auto "
                />
                Zoom in/out
              </div>
            </div>
          )
        case 2:
          return (
            <div className="flex w-full flex-col">
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
            <div className="text-s flex flex-col items-center space-y-2">
              <Image
                src="/assets/profile-pic.jpg"
                alt="profile-pic"
                width={180}
                height={100}
                className="mx-auto mt-2"
              />
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
                appropriate Collective creation game(s) for the situation.It can take the form of: A consultancy, a
                short intervention (From 15 mins to 1hr), a workshop (From 1 to 6 days) or a program (Long term).
              </p>
              <p>
                Phone:
                <a className="ml-1 text-blue-600" href="tel:+961 3 593660">
                  +9613593660
                </a>
              </p>
              <p>
                Email:
                <a className="ml-1 text-blue-600" href="mailto:rami.o.chahine@gmail.com">
                  rami.o.chahine@gmail.com
                </a>
              </p>
              <p>
                Youtube:
                <a className="ml-1 text-blue-600" href="https://www.youtube.com/@ramichahine8875/videos">
                  Collective Creation Games
                </a>
              </p>
              <p>
                Instagram:
                <a className="ml-1 text-blue-600" href="https://www.instagram.com/ramichahine.atwork/">
                  @ramichahine.atwork
                </a>
              </p>
              <p>
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
