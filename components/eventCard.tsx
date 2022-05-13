import type { NextPage } from "next";
import type Event from '../types/_models';

type Props = {
    data: Event;
}

const EventCard: NextPage<Props> = ({data}) => {
  const startsAt = new Date(data.starts_at);
  const endsAt = new Date(data.ends_at);
  var options = { month: "short"} as const;
  return (
    <div className="flex flex-col w-full cursor-pointer rounded-md shadow-md shadow-gray-200 hover:shadow-blue-400/80 hover:shadow-2xl hover:bg-gray-50">
        <div className="w-full h-64 bg-top bg-cover rounded-t" style={{backgroundImage: `url(${data.hero_url})`}}></div>
        <div className="flex flex-col flex-1 w-full md:flex-row">
            <div className="flex flex-row justify-around p-4 font-bold leading-none text-gray-800 uppercase bg-gray-400 md:flex-col md:items-center md:justify-evenly md:w-1/4">
                <div>
                    <div className="md:text-md">{new Intl.DateTimeFormat('en-US', options).format(startsAt)}</div>
                    <div className="md:text-lg">{startsAt.getDate()}</div>
                    <div className="md:text-md">{startsAt.getHours() >= 12 ? (startsAt.getHours() % 12) + "pm" : startsAt.getHours() + "am"}</div>
                </div>
                <div>
                    <div className="md:text-md">{new Intl.DateTimeFormat('en-US', options).format(endsAt)}</div>
                    <div className="md:text-lg">{endsAt.getDate()}</div>
                    <div className="md:text-md">{endsAt.getHours() >= 12 ? (endsAt.getHours() % 12) + "pm" : endsAt.getHours() + "am"}</div>
                </div>
            </div>
            <div className="p-4 font-normal text-gray-800 md:w-3/4">
                <h1 className="flex items-center pt-2 font-bold text-lg whitespace">{data.name}</h1>
                <p className="text-left mt-4">{data.short_description}</p>
                <div className="flex flex-row items-center mt-4 text-gray-700">
                    <div className="w-1/2">
                        {data.partner.name}
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <img src={data.partner.logo_url} alt="" className="w-8"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EventCard
