import { clsx } from 'clsx'
import Image from 'next/image'
import { Fragment, useState } from 'react'

import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowLeftIcon, ArrowRightIcon, Cross1Icon } from '@radix-ui/react-icons'

import Button from '@/components/button'
// import { Language, isEnglish, changeLanguage} from '@/modules/language'

interface AlertDialogProps {
  children: React.ReactNode
  isOpen?: boolean
  isMobile?: boolean
  // language: Language
  // setLanguage: (language: Language) => void
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
  title: string
  section: string
  hasPages: boolean
  totalPages?: number
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}  >
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
                'bg-gray-100 opacity-90',
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
                  {pageTitle(props.section, props.title, props.pageNumber)}
                </AlertDialogPrimitive.Title>
                <AlertDialogPrimitive.Cancel asChild onClick={() => props.setPageNumber(1)}>
                  <button className="flex  w-fit flex-auto justify-end  focus:outline-none">
                    <Cross1Icon />
                  </button>
                </AlertDialogPrimitive.Cancel>
              </div>
              <AlertDialogPrimitive.Description className="color-white space-pre-wrap flex flex-grow flex-col justify-center space-y-4 mt-4 mb-4 align-middle text-sm font-normal text-gray-700 ">
                {/* {props.isMobile ? mobileContent(props.pageNumber) : desktopContent(props.pageNumber)} */}
                {content(props.pageNumber, props.section)}
              </AlertDialogPrimitive.Description>
              <div className="flex flex-row justify-end align-bottom">
                {props.hasPages ? (
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
                      {forwardPageButton(props.pageNumber, props.setPageNumber, props.totalPages)}
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

const pageTitle = (section: string, title: string, pageNumber: number) => {
  switch (section) {
    case 'howto':
      switch (pageNumber) {
        case 2:
          return 'Legend'

        default:
          return title
      }
    default:
      return title
  }
}

// const mobileContent = (pageNumber: number, language: Language) => {
const content = (pageNumber: number, section: string) => {
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
                Between 2021 and 2022, the <b>Pedagogy of Games</b> program was co-developed with 3 groups of youth.
                Combining arts research and critical pedagogy, all sessions were context specific, inclusive and
                creative.
              </p>
              <p>
                We played, designed the systems of interaction and critically reflected on the dynamics emerging from
                these experiences.
              </p>
            </>
          ) : (
            <div className="space-y-2 text-right">
              بين عامي 2021 و 2022 تم تطوير برنامج "بيداغوجيا اللعب" بالتعاون مع ثلاث مجموعات شبابيّة. عبر دمج طرق البحث
              الفنّي والتعلّم النقدي ، كانت الجلسات عبارة عن عمليات إبداعية، متكيّفة بالموقف وشاملة لقدرات الجميع. حيث
              .لعبنا، صممنا أنظمة تفاعلاتنا، وفكّرنا نقديّاً بالديناميكيات الناشئة عن هذه التجارب
            </div>
          )

        case 3:
          return true ? (
            <>
              <p>
                This page is a visual means to communicate the quirkiness of this practice. It invites you to explore
                the methodological framework we developed for it and discover all the operations building up the play
                between the facilitator, the group and the system at different stages of the process. It is complemented
                by videos of the entire experience on our
                <a
                  className="ml-1 text-blue-600"
                  href="https://www.youtube.com/@ramichahine8875/videos"
                  target="_blank"
                  rel="noreferrer"
                >
                  Youtube Channel
                </a>
                .
              </p>
              <p>With the support of:</p>
              <p>
                <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-2 flex" />
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
                <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
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
            <>
              <div className="mt-4 flex flex-row">
                <div className="flex flex-grow flex-col items-center">
                  <Image src="/assets/check-boxes.svg" alt="check-boxes" width={180} height={60} className="mx-auto " />
                  Select
                </div>
                <div className="flex flex-grow flex-col items-center">
                  <Image
                    src="/assets/node-click-expand.svg"
                    alt="node-click-expand"
                    width={150}
                    height={60}
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
                    width={190}
                    height={60}
                    className="mx-auto "
                  />
                  Rotate
                </div>
                <div className="flex flex-grow flex-col items-center">
                  <Image src="/assets/taskbar.svg" alt="taskbar" width={200} height={60} className="mx-auto " />
                  Find info
                </div>
              </div>
              <div className="flex flex-grow flex-col items-center">
                <Image src="/assets/zoom-out.svg" alt="zoom-out" width={150} height={60} className="mx-auto " />
                Zoom in/out
              </div>
            </>
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
            <>
              <Image src="/assets/profile-pic.jpg" alt="profile-pic" width={450} height={180} className="mx-auto mt-2" />
              <p>
                Rami Chahine is a Lebanese creator and visual, game and street artist born in 1987 in Beirut. He holds a
                BA in business from the American University of Beirut and a Bachelor’s in Product Design from Académie
                Libanaise des Beaux-Arts.
              </p>
              <p>
                He's been developing his principles of creation since 2012 balancing collectivity and individuality,
                control and embrace, chaos and order, human action and natural growth.
              </p>
            </>
          )

        case 2:
          return (
            <>
              <p className="mb-8">Five main drives have guided this research:</p>
              <ul className="flex flex-col space-y-4">
                <li>✱ The will to setup profound, transformational experiences for people</li>
                <li>
                  ✱ The observation that creative thinking cannot be taught like a technique, it is rather ignited by
                  providing it with adequate situations for its emergence
                </li>

                <li>
                  ✱ The need to develop ways which facilitate the process of creating together, and bypass its usual
                  challenges
                </li>
                <li>✱ The quest to create while playing with nature</li>

                <li>
                  ✱ The idea that such collective creative practices can grow our capacities for critical reflection,
                  systems thinking and collaboration
                </li>
              </ul>
            </>
          )

        case 3:
          return (
            <>
              {/* <p>
                What he’s been doing:
              </p> */}
              <p>
                Rami has developed experimental painting processes, built installations, painted murals, designed art
                games, made street interventions inviting all passersby to participate in creation, and co-founded the
                Zayraqoun street performance collective. .
              </p>
              <p>
                He taught Visual Arts at the International College in 2018/19 and has since been developing the method
                of "Collective Creation Games"
              </p>
              <p>
                He now provides it as a service in the form of workshops or consultancies for educational and social
                endeavors and researchers aiming to engage people in collective creative actions.
              </p>
            </>
          )
      }

    case 'contact':
      return (
        <>
          <p>
            If your endeavor is related to individuals learning, thinking, designing, trying or creating together then
            we can surely collaborate. Get in touch and share the theme you are working on so that we can together
            develop the appropriate Collective Creation Game(s) for the situation.
          </p>
          <p>
            It can take the form of a consultancy, a short intervention (15mins to 1hr), a workshop (1 to 6 days) or a
            program (long term).
          </p>
          <p>
            Phone:
            <a className="ml-1 text-blue-600" href="tel:+961 3 593660">
              +961 3 593660
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
        </>
      )

    default:
      return <></>
  }
}

export default AlertDialog
