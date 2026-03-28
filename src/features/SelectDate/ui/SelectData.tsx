'use client'

import { Calendar } from "antd";
import { useEffect, useRef, useState } from "react";

export const SelectDate = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [date, setDate] = useState<Date>(new Date)

    const calendarRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
                setIsVisible(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)

        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div 
            ref={calendarRef}
            className="relative"
            onClick={(e) => {setIsVisible(true)}}
        >   
            {isVisible 
            ? <Calendar 
                classNames={
                    {
                        item: 'hover:text-active-text!'
                    }
                }
                className="absolute z-10 top-[150%] w-75"
                fullscreen={false}
                onSelect={date => setDate(date.toDate())}
            />
            : ''
            }
            <span className=" p-2 bg-foreground border borde-stroke rounded-md"> 
                {date.toLocaleDateString()}
            </span>
        </div>
    )
}