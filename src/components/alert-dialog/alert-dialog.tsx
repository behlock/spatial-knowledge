import { clsx } from 'clsx'
import Image from 'next/image'
import { Fragment, useState } from 'react'

import { Transition } from '@headlessui/react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowLeftIcon, ArrowRightIcon, Cross1Icon, GlobeIcon } from '@radix-ui/react-icons'

import Button from '@/components/button'
import { Language, isEnglish, changeLanguage} from '@/modules/language'

interface AlertDialogProps {
  isOpen?: boolean
  isMobile?: boolean
  language: Language
  setLanguage: (language: Language) => void
  pageNumber: number
  setPageNumber: (pageNumber: number) => void
}

const AlertDialog = (props: AlertDialogProps) => {
  let [isOpen, setIsOpen] = useState(props.isOpen)

  return (
    <AlertDialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogPrimitive.Trigger asChild>
        <svg
          width="25"
          height="25"
          viewBox="0 0 15 15"
          fill="background-color: rgb(23 23 23)"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-pointer"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
            fill="black"
          />
        </svg>
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
              </button>
              <AlertDialogPrimitive.Cancel asChild>
                <button className="absolute top-0 right-0 px-4 py-1 focus:outline-none">
                  <Cross1Icon />
                </button>
              </AlertDialogPrimitive.Cancel>
              <AlertDialogPrimitive.Title className="text-lg font-bold text-gray-900">
                What is Collective Creation Games?
              </AlertDialogPrimitive.Title>
              <AlertDialogPrimitive.Description className="mt-2 space-y-4 whitespace-pre-wrap text-sm font-normal text-gray-700">
                {props.isMobile
                  ? mobileContent(props.pageNumber, props.language)
                  : desktopContent(props.pageNumber, props.language)}
              </AlertDialogPrimitive.Description>

              <div className="mt-4 flex flex-row align-middle">
                <div className="flex flex-grow flex-row justify-start">
                  {previousPageButton(props.pageNumber, props.setPageNumber) ? (
                    <div className="mr-3 flex flex-row items-center">
                      {previousPageButton(props.pageNumber, props.setPageNumber)}
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className="mt-3 flex flex-row items-center">
                    <p className="text-sm font-normal text-gray-500">{`${props.pageNumber} / 6`}</p>
                  </div>
                </div>
                <div className="flex flex-row justify-end">
                  <div className="flex flex-row items-center">
                    {forwardPageButton(props.pageNumber, props.setPageNumber)}
                  </div>
                </div>
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

const forwardPageButton = (pageNumber: number, setPageNumber: (pageNumber: number) => void) => {
  switch (pageNumber) {
    case 6:
      return (
        <AlertDialogPrimitive.Action
          className={clsx(
            'inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium',
            'bg-neutral-900 text-white',
            'border border-transparent',
            'focus:outline-none'
          )}
        >
          Start Exploring
        </AlertDialogPrimitive.Action>
      )

    default:
      return (
        <Button onClick={() => setPageNumber(pageNumber + 1)}>
          <ArrowRightIcon className="h-5 w-5" />
        </Button>
      )
  }
}

const desktopContent = (pageNumber: number, language: Language) => {
  switch (pageNumber) {
    case 1:
      return isEnglish(language) ? (
        <>
          <p>
            <b>Collective Creation Games</b> create situations of emancipation where groups of people collaborate in
            giving shape to their collective imagination, motion and inspiration.
          </p>
          <p>
            These experiences take the form of interventions, installations and workshops. They engage our spontaneity,
            intuition and will to explore in order to draw us into a state of creative flow.
          </p>
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            تخلق ألعاب الإبداع الجماعي مواقف من التحرر حيث تتعاون مجموعات من الناس في تشكيل خيالهم الجماعي، حركتهم
            وإلهامهم
          </p>
          <p>
            تأخذ هذه التجارب شكل مداخلات وتركيبات وورش عمل. تفعّل من عبرها عفويّتنا وحدسنا وإرادتنا في الاستكشاف، من أجل
            جذبنا إلى حالة من التدفق والإنسجام الإبداعي
          </p>
        </div>
      )

    case 2:
      return isEnglish(language) ? (
        <p>
          Between 2021 and 2022, the <b>Pedagogy of Games</b> program was co-developed with 3 groups of youth. Combining
          arts research and critical pedagogy, all sessions were context specific, inclusive and creative. We played,
          designed the systems of interaction and critically reflected on the dynamics emerging from these experiences.
        </p>
      ) : (
        <div className="space-y-2 text-right">
          بين عامي 2021 و 2022 تم تطوير برنامج "بيداغوجيا اللعب" بالتعاون مع ثلاث مجموعات شبابيّة. عبر دمج طرق البحث
          الفنّي والتعلّم النقدي ، كانت الجلسات عبارة عن عمليات إبداعية، متكيّفة بالموقف وشاملة لقدرات الجميع. حيث
          .لعبنا، صممنا أنظمة تفاعلاتنا، وفكّرنا نقديّاً بالديناميكيات الناشئة عن هذه التجارب
        </div>
      )

    case 3:
      return isEnglish(language) ? (
        <>
          <p>
            This page is a visual means to communicate the quirkiness of this practice. It invites you to explore the
            methodological framework we developed for it and discover all the operations building up the play between
            the facilitator, the group and the system at different stages of the process:
            <b> the Pre-session planning, the In-session facilitation and the Post-session reflection.</b>
          </p>
          <p>
            It is complemented by videos of the entire experience on our
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
          <p>
            With the support of:
            <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
          </p>
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            هذه الصفحة هي وسيلة مرئية للتعبير عن خصوصيّة هذه الممارسة. تدعوك لاستكشاف الإطار المنهجي الذي قمنا بتطويره،
            واكتشاف جميع العمليات التي تبني اللعب بين الميسر والمجموعة والنظام في مراحل مختلفة من العملية: .التخطيط ما
            قبل الجلسة، التيسير أثناء الجلسة و انعكاس ما بعد الجلسة
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

    case 4:
      return isEnglish(language) ? (
        <>
          <p>
            <b>How to navigate it:</b>
          </p>
          <p>The map is partially visible when you first open the page so that your exploration reveals the rest.</p>
          <p>
            The <text className="text-red-500">Red Balls</text> are our starting points.
            <b> Click</b> on a ball, to reveal or collapse its leaves.
          </p>

          <Image src="/assets/node click expand traced.png" alt="click" width={150} height={80} className="mx-auto " />
          <p>
            <b>Rotate</b> around the map to move in space.
          </p>
          <Image src="/assets/figure rotate traced.png" alt="click" width={200} height={100} className="mx-auto " />
        </>
      ) : (
        <div className="space-y-0 text-right">
          <p>
            <b>كيفية الإستكشاف</b>
          </p>
          <p>
            تظهر الخريطة الذهنية جزئيًا عند فتح الصفحة، استكشافكم سوف يظهر الباقي. "الكرات" الحمراء هي نقاط انطلاقنا
          </p>
          <p>غطوا على كرة لفتح أو تسكير أطفالها</p>
          <Image src="/assets/node click expand traced.png" alt="click" width={150} height={80} className="mx-auto " />
          <p>دوروا حول الخريطة للتحرك في الفضاء</p>
          <Image src="/assets/figure rotate traced.png" alt="click" width={150} height={80} className="mx-auto " />
        </div>
      )

    case 5:
      return isEnglish(language) ? (
        <>
          <p>
            <b>Zoom</b> in for reading, <b>Zoom out</b> to allow easier movement in space.
          </p>
          <Image src="/assets/zoom out traced.png" alt="rotate" width={200} height={100} className="mx-auto " />
          <p>Check boxes □ to choose the stage of the process to explore.</p>
          <p>Click on ⓘ to re-open this dialog box.</p>
          <p>
            Click on ⏵ to open our
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
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>كبّرواالنص للقراءة ، و صغّروا لتسهيل الحركة بالفضاء</p>
          <Image src="/assets/zoom out traced.png" alt="rotate" width={200} height={100} className="mx-auto " />
          <p>ضعوا علامة في المربعات □ لاختيار مرحلة العملية المراد استكشافها.</p>
          <p>إضغط فوق ⓘ لإعادة فتح مربع الحوار هذا</p>
          <p>
            <a
              className="ml-1 text-blue-600"
              href="https://www.youtube.com/@ramichahine8875/videos"
              target="_blank"
              rel="noreferrer"
            >
              Youtube Channel
            </a>
            إضغط ⏵ لفتح قناة ال
          </p>
        </div>
      )

    case 6:
      return isEnglish(language) ? (
        <>
          <p>
            <b>Contact us</b>
          </p>
          <p>
            If your endeavor is related to <b>individuals creating, experimenting, designing and learning together</b>{' '}
            then we can surely collaborate. Get in touch, let's have a chat and develop the appropriate Collective
            creation game for the situation.
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
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            <b>اتصلوا بنا</b>
          </p>
          <p>
            إذا كان سعيكم مرتبطًا بأفراد تخلق ،تجرّب ،تصمّم وتطوّر فهمها سويّةً ، فيمكننا بالتأكيد التعاون. تواصلوا معنا
            ، فالنتحدث ونطور لعبة إبداع جماعي تناسب ألموقف
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
        </div>
      )
  }
}

const mobileContent = (pageNumber: number, language: Language) => {
  switch (pageNumber) {
    case 1:
      return isEnglish(language) ? (
        <>
          <p>
            Disclaimer: For compatibility and ease of navigation on mobile, only parts of the functionalities are
            enabled.
          </p>
          <p>
            <b>Collective Creation Games (CCG)</b> create situations of emancipation where groups of people collaborate
            in giving shape to their collective imagination, motion and inspiration.
          </p>
          <p>
            These experiences take the form of interventions, installations or workshops. They engage our spontaneity,
            intuition and will to explore in order to draw us into a state of creative flow.
          </p>
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            تخلق ألعاب الإبداع الجماعي مواقف من التحرر حيث تتعاون مجموعات من الناس في تشكيل خيالهم الجماعي، حركتهم
            وإلهامهم
          </p>
          <p>
            تأخذ هذه التجارب شكل مداخلات وتركيبات وورش عمل. تفعّل من عبرها عفويّتنا وحدسنا وإرادتنا في الاستكشاف، من أجل
            جذبنا إلى حالة من التدفق والإنسجام الإبداعي
          </p>
          <p>ملاحظة: من أجل تسهيل التنقل ، إضطرّينا إلى تمكين فقط جزء من الوظائف على هاتفكم</p>
        </div>
      )

    case 2:
      return isEnglish(language) ? (
        <p>
          Between 2021 and 2022 the <b>Pedagogy of games</b> program was co-developed with 3 groups of youth.Combining
          arts research and critical pedagogy, all sessions were context specific, inclusive, creative processes, where
          we played, designed the systems of interaction and critically reflected on the dynamics emerging from these
          experiences.
        </p>
      ) : (
        <div className="space-y-2 text-right">
          بين عامي 2021 و 2022 تم تطوير برنامج "بيداغوجيا اللعب" بالتعاون مع ثلاث مجموعات شبابيّة. عبر دمج طرق البحث
          الفنّي والتعلّم النقدي ، كانت الجلسات عبارة عن عمليات إبداعية، متكيّفة بالموقف وشاملة لقدرات الجميع. حيث
          لعبنا، صممنا أنظمة تفاعلاتنا، وفكّرنا نقديّاً بالديناميكيات الناشئة عن هذه التجارب
        </div>
      )

    case 3:
      return isEnglish(language) ? (
        <>
          <p>
            This page is a visual attempt to communicate the quirkiness of such a practice. It invites you to explore
            the methodological framework we developed for it and discover all the operations building up the play
            between the facilitator, the group and the system at different stages of the process:
            <b> the pre-session planning, the in-session facilitation and the post-session reflection.</b>
          </p>
          <p>
            It is complemented by videos of all experience on our
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
          <p>
            With the support of:
            <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
          </p>
        </>
      ) : (
        <div className="space-y-1 text-right">
          <p>
            هذه الصفحة هي وسيلة مرئية للتعبير عن خصوصيّة هذه الممارسة. تدعوك لاستكشاف الإطار المنهجي الذي قمنا بتطويره،
            واكتشاف جميع العمليات التي تبني اللعب بين الميسر والمجموعة والنظام في مراحل مختلفة من العملية: التخطيط ما
            قبل الجلسة، التيسير أثناء الجلسة و انعكاس ما بعد الجلسة
          </p>
          <p>
            يتم استكمالها بمقاطع فيديو لجميع التجارب على القناة الخاصة بنا
            <a
              className="ml-1 text-blue-600"
              href="https://www.youtube.com/@ramichahine8875/videos"
              target="_blank"
              rel="noreferrer"
            >
              إضغط هنا
            </a>
          </p>
          <p>
            بدعم من
            <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
          </p>
        </div>
      )

    case 4:
      return isEnglish(language) ? (
        <>
          <p>
            For compatibility and ease of navigation purposes, only part of the functionalities are enabled on your
            phone. Only the operations required <b>"during the session"</b> are visible. For a complete experience of
            exploration, please access the page on a desktop.
          </p>
          <p>
            <b>How to navigate it:</b>
          </p>
          <p>
            <b>Rotate</b> around the map to move in space.
          </p>
          <Image src="/assets/figure rotate traced.png" alt="click" width={200} height={100} className="mx-auto " />
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            من أجل تسهيل التنقل ، إضطرّينا إلى تمكين فقط جزء من الوظائف على هاتفك. تظهر فقط العمليات في "أثناء الجلسة".
            للحصول على تجربة استكشاف كاملة، يرجى الوصول صفحتنا على جهاز كمبيوتر
          </p>
          <p>
            <b>كيفية الإستكشاف</b>
          </p>
          <p>دوروا حول الخريطة للتحرك في الفضاء</p>
          <Image src="/assets/figure rotate traced.png" alt="click" width={200} height={100} className="mx-auto " />
        </div>
      )

    case 5:
      return isEnglish(language) ? (
        <>
          <p>
            <b>Zoom</b> in for reading, <b>zoom out</b> to allow easier movement in space.
          </p>
          <Image src="/assets/zoom out traced.png" alt="rotate" width={200} height={100} className="mx-auto " />
          <p>Click on ⓘ to re-open this dialog box.</p>
          <p>
            Click on ⏵ to open our
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
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>كبّرواالنص للقراءة ، و صغّروا لتسهيل الحركة بالفضاء</p>
          <Image src="/assets/zoom out traced.png" alt="rotate" width={200} height={100} className="mx-auto " />
          <p>إضغط فوق ⓘ لإعادة فتح مربع الحوار هذا</p>
          <p>
            <a
              className="ml-1 text-blue-600"
              href="https://www.youtube.com/@ramichahine8875/videos"
              target="_blank"
              rel="noreferrer"
            >
              Youtube Channel
            </a>
            إضغط ⏵ لفتح قناة ال .
          </p>
        </div>
      )

    case 6:
      return isEnglish(language) ? (
        <>
          <p>
            <b>Contact us</b>
          </p>
          <p>
            If your endeavor is related to <b>individuals creating, designing, experimenting and learning together</b>{' '}
            then we can surely collaborate. Get in touch, let's have a chat and develop the appropriate Collective
            creation game for the situation.
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
          </p>{' '}
          <p>
            Youtube:
            <a className="ml-1 text-blue-600" href="https://www.youtube.com/@ramichahine8875/videos">
              Collective Creation Games
            </a>
          </p>
        </>
      ) : (
        <div className="space-y-2 text-right">
          <p>
            <b>اتصلوا بنا</b>
          </p>
          <p>
            إذا كان سعيكم مرتبطًا بأفراد تخلق ،تجرّب ،تصمّم وتطوّر فهمها سويّةً ، فيمكننا بالتأكيد التعاون. تواصلوا معنا
            ، فالنتحدث ونطور لعبة إبداع جماعي تناسب ألموقف
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
        </div>
      )
  }
}

export default AlertDialog
