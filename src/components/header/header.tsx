import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import AlertDialog from '@/components/alert-dialog'
import Button from '@/components/button'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

import useDeviceDetect from '@/hooks/useDeviceDetect'

// @ts-ignore
const Header = ({ english, setEnglish }) => {
  const [cookies, setCookie] = useCookies(['showDialog'])
  let [page, setPage] = useState(1)

  const { isMobile } = useDeviceDetect()

  const setOpEnglish = () => {
    setEnglish(!english)
  }

  const desktopPageContent = () => {
    switch (page) {
      case 1:
        return english ? (
          <>
            <p>
              <b>Collective Creation Games</b> create situations of emancipation where groups of people collaborate in
              giving shape to their collective imagination, motion and inspiration.
            </p>
            <p>
              These experiences take the form of interventions, installations and workshops. They engage our
              spontaneity, intuition, and will to explore in order to draw us into a state of creative flow.
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
        return english ? (
          <p>
            Between 2021 and 2022 the <b>Pedagogy of games</b> program was co-developed with 3 groups of youth.Combining
            arts research and critical pedagogy, all sessions were context specific, inclusive, creative processes,
            where we played, designed the systems of interaction, and critically reflected on the dynamics emerging from
            these experiences.
          </p>
        ) : (
          <div className="space-y-2 text-right">
            بين عامي 2021 و 2022 تم تطوير برنامج "بيداغوجيا اللعب" بالتعاون مع ثلاث مجموعات شبابيّة. عبر دمج طرق البحث
            الفنّي والتعلّم النقدي ، كانت الجلسات عبارة عن عمليات إبداعية، متكيّفة بالموقف وشاملة لقدرات الجميع. حيث
            .لعبنا، صممنا أنظمة تفاعلاتنا، وفكّرنا نقديّاً بالديناميكيات الناشئة عن هذه التجارب
          </div>
        )

      case 3:
        return english ? (
          <>
            <p>
              This page is a visual means to communicate the quirkiness of this practice. It invites you to explore the
              methodological framework we developed for it and discover all the operations building up the play between
              the facilitator, the group and the system at different stages of the process:
              <b>the pre-session planning, the in-session facilitation and the post-session reflection.</b>
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
          <div className="space-y-2 text-right">
            <p>
              هذه الصفحة هي وسيلة مرئية للتعبير عن خصوصيّة هذه الممارسة. تدعوك لاستكشاف الإطار المنهجي الذي قمنا
              بتطويره، واكتشاف جميع العمليات التي تبني اللعب بين الميسر والمجموعة والنظام في مراحل مختلفة من العملية:
              .التخطيط ما قبل الجلسة، التيسير أثناء الجلسة و انعكاس ما بعد الجلسة
            </p>
            <p>
              <a
                className="ml-1 text-blue-600 mr-1"
                href="https://www.youtube.com/@ramichahine8875/videos"
                target="_blank"
                rel="noreferrer"
              >
                YouTube
              </a>
              يتم استكمالها بمقاطع فيديو لجميع التجارب على القناة
              الخاصة بنا. إضغط هنا
            </p>
            <p>
              :بدعم من
              <Image src="/assets/AFAC.png" alt="AFAC" width={100} height={50} className="mx-auto mt-4 flex" />
            </p>
          </div>
        )

      case 4:
        return english ? (
          <>
            <p>
              <b>How to navigate it:</b>
            </p>
            <p>
              The map is partially visible when you first open the page. <b>Your exploration</b> will reveal the rest.
              The <text className="text-red-500">Red Balls</text> are our starting points.
            </p>
            <p>
              <b>Click</b> on a ball, to reveal or collapse its leaves.
            </p>
            <Image
              src="/assets/node click expand traced.png"
              alt="click"
              width={150}
              height={80}
              className="mx-auto "
            />
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
            <Image
              src="/assets/node click expand traced.png"
              alt="click"
              width={150}
              height={80}
              className="mx-auto "
            />
            <p>دوروا حول الخريطة للتحرك في الفضاء</p>
            <Image src="/assets/figure rotate traced.png" alt="click" width={150} height={80} className="mx-auto " />
          </div>
        )

      case 5:
        return english ? (
          <>
            <p>
              <b>Zoom</b> in for reading, <b>zoom out</b> to allow easier movement in space.
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
        return english ? (
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
          </>
        ) : (
          <div className="space-y-2 text-right">
            <p>
              <b>اتصلوا بنا</b>
            </p>
            <p>
              إذا كان سعيكم مرتبطًا بأفراد تخلق ،تجرّب ،تصمّم وتطوّر فهمها سويّةً ، فيمكننا بالتأكيد التعاون. تواصلوا
              معنا ، فالنتحدث ونطور لعبة إبداع جماعي تناسب ألموقف
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
          </div>
        )
    }
  }

  const mobilePageContent = () => {
    switch (page) {
      case 1:
        return english ? (
          <>
            <p>
              Disclaimer: For compatibility and ease of navigation on mobile, only parts of the functionalities are
              enabled.
            </p>
            <p>
              <b>Collective Creation Games (CCG)</b> create situations of emancipation where groups of people
              collaborate in giving shape to their collective imagination, motion and inspiration.
            </p>
            <p>
              These experiences take the form of interventions, installations or workshops. They engage our spontaneity,
              intuition, and will to explore in order to draw us into a state of creative flow.
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
            <p>ملاحظة: من أجل تسهيل التنقل ، إضطرّينا إلى تمكين فقط جزء من الوظائف على هاتفكم</p>
          </div>
        )

      case 2:
        return english ? (
          <p>
            Between 2021 and 2022 the <b>Pedagogy of games</b> program was co-developed with 3 groups of youth.Combining
            arts research and critical pedagogy, all sessions were context specific, inclusive, creative processes,
            where we played, designed the systems of interaction, and critically reflected on the dynamics emerging from
            these experiences.
          </p>
        ) : (
          <div className="space-y-2 text-right">
            بين عامي 2021 و 2022 تم تطوير برنامج "بيداغوجيا اللعب" بالتعاون مع ثلاث مجموعات شبابيّة. عبر دمج طرق البحث
            الفنّي والتعلّم النقدي ، كانت الجلسات عبارة عن عمليات إبداعية، متكيّفة بالموقف وشاملة لقدرات الجميع. حيث
            لعبنا، صممنا أنظمة تفاعلاتنا، وفكّرنا نقديّاً بالديناميكيات الناشئة عن هذه التجارب
          </div>
        )

      case 3:
        return english ? (
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
              هذه الصفحة هي وسيلة مرئية للتعبير عن خصوصيّة هذه الممارسة. تدعوك لاستكشاف الإطار المنهجي الذي قمنا
              بتطويره، واكتشاف جميع العمليات التي تبني اللعب بين الميسر والمجموعة والنظام في مراحل مختلفة من العملية:
              التخطيط ما قبل الجلسة، التيسير أثناء الجلسة و انعكاس ما بعد الجلسة
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
        return english ? (
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
              من أجل تسهيل التنقل ، إضطرّينا إلى تمكين فقط جزء من الوظائف على هاتفك. تظهر فقط العمليات في "أثناء
              الجلسة". للحصول على تجربة استكشاف كاملة، يرجى الوصول صفحتنا على جهاز كمبيوتر
            </p>
            <p>
              <b>كيفية الإستكشاف</b>
            </p>
            <p>دوروا حول الخريطة للتحرك في الفضاء</p>
            <Image src="/assets/figure rotate traced.png" alt="click" width={200} height={100} className="mx-auto " />
          </div>
        )

      case 5:
        return english ? (
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
        return english ? (
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
            </p>
          </>
        ) : (
          <div className="space-y-2 text-right">
            <p>
              <b>اتصلوا بنا</b>
            </p>
            <p>
              إذا كان سعيكم مرتبطًا بأفراد تخلق ،تجرّب ،تصمّم وتطوّر فهمها سويّةً ، فيمكننا بالتأكيد التعاون. تواصلوا
              معنا ، فالنتحدث ونطور لعبة إبداع جماعي تناسب ألموقف
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
          </div>
        )
    }
  }

  const previousPageButton = () => {
    switch (page) {
      case 1:
        return null

      case 2:
        return (
          <Button onClick={() => setPage(page - 1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )

      case 3:
        return (
          <Button onClick={() => setPage(page - 1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )

      case 4:
        return (
          <Button onClick={() => setPage(page - 1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )
      case 5:
        return (
          <Button onClick={() => setPage(page - 1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )
      case 6:
        return (
          <Button onClick={() => setPage(page - 1)}>
            <ArrowLeftIcon className="h-5 w-5" />
          </Button>
        )
    }
  }

  const forwardPageButton = () => {
    switch (page) {
      case 1:
        return (
          <Button onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )

      case 2:
        return (
          <Button onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )

      case 3:
        return (
          <Button onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )
      case 4:
        return (
          <Button onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )
      case 5:
        return (
          <Button onClick={() => setPage(page + 1)}>
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
        )

      case 6:
        return (
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
        )
    }
  }

  useEffect(() => {
    if (cookies.showDialog === undefined) {
      setCookie('showDialog', true, { path: '/' })
    } else {
      setCookie('showDialog', false, { path: '/' })
    }
  })

  return (
    <header className="z-20">
      <div className="z-20 mb-2 mr-8 flex flex-row flex-wrap space-x-2 font-extrabold">
        <Link href="/">{isMobile ? <h3>Collective Creation Games</h3> : <h3>Collective Creation Games</h3>}</Link>
        {cookies.showDialog && (
          <AlertDialog
            isOpen={cookies.showDialog === 'true'}
            language={english ? 'العربية' : 'English'}
            changeLanguage={setOpEnglish}
            content={isMobile ? mobilePageContent() : desktopPageContent()}
            pageNumber={page}
            previousButton={previousPageButton()}
            forwardButton={forwardPageButton()}
          />
        )}
        <a href="https://www.youtube.com/@ramichahine8875/videos" target="_blank" rel="noreferrer">
          <svg
            fill="#FFFFFF"
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path d="M23,9.71a8.5,8.5,0,0,0-.91-4.13,2.92,2.92,0,0,0-1.72-1A78.36,78.36,0,0,0,12,4.27a78.45,78.45,0,0,0-8.34.3,2.87,2.87,0,0,0-1.46.74c-.9.83-1,2.25-1.1,3.45a48.29,48.29,0,0,0,0,6.48,9.55,9.55,0,0,0,.3,2,3.14,3.14,0,0,0,.71,1.36,2.86,2.86,0,0,0,1.49.78,45.18,45.18,0,0,0,6.5.33c3.5.05,6.57,0,10.2-.28a2.88,2.88,0,0,0,1.53-.78,2.49,2.49,0,0,0,.61-1,10.58,10.58,0,0,0,.52-3.4C23,13.69,23,10.31,23,9.71ZM9.74,14.85V8.66l5.92,3.11C14,12.69,11.81,13.73,9.74,14.85Z" />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default Header
