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
              <b>Collective Creation Games (CCG)</b> creates spaces of possibility, where groups of people come together
              in shaping extraordinary creative visual experiences.
            </p>
            <p>
              By <b>critically engaging</b> as groups, in the design and trial of such an <b>art of games</b>, using
              <b> mainly found materials and the surrounding environment</b>, we fulfill a place where we can explore
              the subtle dynamics at play between <b>the individual and the collective</b>, where we can develop our
              <b> collective imagination</b>, our <b>capacities to co-create</b>, transform materials and spaces and our{' '}
              <b>disposition to rethink and try out our systems of cooperation</b>.
            </p>
          </>
        )

      case 2:
        return (
          <>
            <p>
              Both these claims have been put into the test during street interventions, festivals, workshop sessions
              with groups, collectives, alternative education endeavors, and grassroots organizations.
            </p>
            <p>
              A methodological framework has been developed in praxis with 3 groups of youth between 2021 and 2022 in a
              rich laboratory program combining creative process and critical pedagogy. It has brought to light the main
              faculties which engage our attention at different phases of the process, mainly designing the game
              boundaries, understanding/embracing the role of the facilitator and the importance of the critical
              reflection, observing the individual/group dynamics and tending the creative process.
            </p>
            <p>
              This page is a visual mind map depicting relationships between all the processes and faculties at play at
              the different stages of planning, facilitating, and reflecting on the sessions.
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
              The <b>3D mindmap</b> is an invitation to explore, to build relationships and approach things from
              different perspectives.
            </p>
            <p>
              By clicking on a central <b>node</b>, you reveal its <b>leaves</b>. By clicking on it again you collapse
              them.
            </p>
            <Image src="/assets/node click expand traced.png" alt="click" width={70} height={40} className="mx-auto " />
            <p>You can rotate around the map</p>
            <Image src="/assets/figure rotate traced.png" alt="click" width={70} height={40} className="mx-auto " />
            <p>You can zoom in/out</p>
            <Image src="/assets/zoom out traced.png" alt="rotate" width={70} height={40} className="mx-auto " />
            <p>
              Depending on your interest you can choose one of the topics from the <b>Themes</b> dropdown menu
            </p>
            <Image src="/assets/choosing topics traced.png" alt="topics" width={70} height={40} className="mx-auto " />
            <p>
              You can isolate the nodes which will link you to the videos. And you can also visit our Youtube channel
              <a className="ml-1 text-blue-600" href="https://www.youtube.com/@ramichahine8875/videos">
                Collective Creation Games
              </a>
              .
            </p>
            <Image src="/assets/video toggle traced.png" alt="video" width={70} height={40} className="mx-auto " />
          </>
        )

      case 4:
        return (
          <>
            <p>
              Our method has many applications which might benefit you and your organization. If it's related to
              individuals and collectives, learning, thinking, designing, trying and creating then we can probably work
              together.
            </p>
            <p>
              Have a look at the topic <b>"How can we work together?"</b> or even better, contact us so that we can
              better understand how we can help you achieve what you need.
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
        return <></>

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
