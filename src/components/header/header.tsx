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

const Header = () => {
  const [cookies, setCookie] = useCookies(['showDialog'])
  let [page, setPage] = useState(1)

  const { isMobile } = useDeviceDetect()

  const pageContent = () => {
    switch (page) {
      case 1:
        return (
          <>
            <p>
              <b>Collective Creation Games (CCG)</b> create situations of possibility for groups of people to
              collaborate in giving shape to their collective imagination.
            </p>
            <p>
              Combining arts research and critical pedagogy, CCG's are context specific lab sessions for groups to
              engage in creative processes, where they experiment and design the games and systems of interaction and
              critically reflect on the individual and group dynamics emerging from these experiences.
            </p>
          </>
        )

      case 2:
        return (
          <>
            <p>
              These experiences have taken the form of interventions, installations, workshops and programs and have
              engaged individuals and collectives in the streets, in retreats, in formal and informal gatherings; in
              carnivalesque, social, educational or organizational contexts.
            </p>
            <p>
              Between 2021 and 2022 the “Pedagogy of games” program was co-developed with 3 groups of youth, drawing a
              methodological framework for this practice, and exploring deeper layers of learning emerging from such a
              shared engagement.
            </p>
            <p>
              This page invites you to explore that framework and discover all the operations building up the play
              between the facilitator, the group and the system at different stages of the process:
              <b>the pre-session planning, the in-session facilitation and the post-session reflection.</b>
            </p>
            <p>
              It is complemented by videos of the practice accessible on our
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
        )

      case 3:
        return (
          <>
            <p>
              <b>How to navigate it:</b>
            </p>
            <p>
              The map is partially visible when you first open the page. <b>Your exploration</b> will reveal the rest.
              The <text className="text-red-500">red nodes</text> are our main reference points.
            </p>
            <p>
              <b>Click</b> on a central "node", to reveal or collapse its leaves.
            </p>
            <Image
              src="/assets/node click expand traced.png"
              alt="click"
              width={100}
              height={60}
              className="mx-auto "
            />
            <p>
              <b>Rotate</b> around the map to move in space.
            </p>
            <Image src="/assets/figure rotate traced.png" alt="click" width={100} height={60} className="mx-auto " />
            <p>
              <b>Zoom</b> in for reading, <b>zoom out</b> to allow easier movement in space.
            </p>
            <Image src="/assets/zoom out traced.png" alt="rotate" width={70} height={40} className="mx-auto " />
          </>
        )

      case 4:
        return (
          <>
            <p>
              <b>Useful commands around the main title</b>
            </p>
            <p>The □ Checkboxes allow you to choose the stage of the process to explore.</p>
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
            <p>
              <b>Contact us</b>
            </p>
            <p>
              If your endeavor is related to <b>individuals learning, thinking, designing, trying, creating together</b>{' '}
              and you are curious to explore unusual ways to do so, then we can surely collaborate. Get in touch, let's
              have a chat and develop the appropriate Collective creation game for the situation.
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
            content={pageContent()}
            pageNumber={page}
            previousButton={previousPageButton()}
            forwardButton={forwardPageButton()}
          />
        )}
        <a href="https://www.youtube.com/@ramichahine8875/videos" target="_blank" rel="noreferrer">
          <svg
            fill="#FFFFFF"
            width="15px"
            height="15px"
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
