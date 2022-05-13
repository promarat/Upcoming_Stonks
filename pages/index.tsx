import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import EventCard from '../components/eventCard'
import type Event from '../types/_models'

type Props = {
  eventData: Array<Event>
}


const Home: NextPage<Props> = ({eventData}) => {

  const [filterString, SetFilterString] = useState<String>('');
  const [upcomingEvents, setUpcomingEvents] = useState<Array<Event>>([]);

  useEffect(() => {
    
    if (!filterString) {
      setUpcomingEvents(eventData)
      return
    }

    setUpcomingEvents(eventData.filter((data: Event) => {
      return data.name.toLowerCase().indexOf(filterString.toLocaleLowerCase()) != -1 || data.short_description.toLocaleLowerCase().indexOf(filterString.toLocaleLowerCase()) != -1;
    }));

  }, [filterString])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Stonks</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-blue-600" href="https://stonks.com/">
          Upcoming Events
          </a>
        </h1>
        <div className="flex justify-center mt-8">
          <div className="mb-3 xl:w-96">
            <input
              type="search"
              className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
              id="exampleSearch"
              placeholder="Filter"
              onChange={e => SetFilterString(e.target.value)}
            />
          </div>
        </div>
        <div className="p-4 gap-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 select-none">
          {upcomingEvents.map((eData: Event, index: number) => {
            return(
              <EventCard data={eData} key={index}/>
            )
          })}
        </div>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.stonks.com/principal/event?status=upcoming&perPage=25&orderBy=starts_at,ASC')
  const json = await res.json()
  return {
    props: {
      eventData: json.data,
    },
  }
}

export default Home
