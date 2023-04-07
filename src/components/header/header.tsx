import Image from 'next/image'
import Link from 'next/link'

import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import AlertDialog from '@/components/alert-dialog'
import Button from '@/components/button'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'

const Header = () => {
  const [cookies, setCookie] = useCookies(['showDialog'])
  let [page, setPage] = useState(1)

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
              <a className="ml-1 text-blue-600" href="https://www.youtube.com/@ramichahine8875">
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

  const pageButton = () => {
    switch (page) {
      case 1:
        return (
          <>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setPage(page + 1)}>
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </>
        )

      case 2:
        return (
          <>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setPage(page + 1)}>
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </>
        )

      case 3:
        return (
          <>
            <div className="mt-4 flex justify-end space-x-2">
              <Button onClick={() => setPage(page + 1)}>
                <ArrowRightIcon className="h-5 w-5" />
              </Button>
            </div>
          </>
        )

      case 4:
        return (
          <div className="mt-4 flex justify-end space-x-2">
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
          </div>
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
      <div className="z-20 mb-2 mr-8 flex flex-row flex-wrap space-x-2 text-3xl font-extrabold">
        <Link href="/">
          <h3>Collective Creation Games</h3>
        </Link>
        {cookies.showDialog && (
          <AlertDialog isOpen={cookies.showDialog === 'true'} content={pageContent()} button={pageButton()} />
        )}
      </div>
    </header>
  )
}

export default Header
