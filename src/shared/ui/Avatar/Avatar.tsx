import React from "react"
import Image from 'next/image'
import img from './Ellipse2.png'

interface Props { 
    size: number
}

const Avatar = ({size} : Props) => {
    return (
        <Image 
            className={`min-w-[${size}] rounded-full border-black border-solid border`}
            loading="eager"
            src={img} 
            alt="Avatar" 
            width={size} 
            height={size} 
        />
    )
}
export default Avatar