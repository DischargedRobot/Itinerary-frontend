import React from "react"
import Image from 'next/image'
import img from './Ellipse2.png'

// interface Props { 
//     imgPath: string
// }

const Avatar = () => {
    return (
        <Image 
            className="min-w-[64] rounded-full border-black border-solid border"
            src={img} 
            alt="Avatar" 
            width={64} 
            height={64} 
        />
    )
}
export default Avatar