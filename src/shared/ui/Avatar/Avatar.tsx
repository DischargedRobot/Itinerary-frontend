import React from "react"
import Image from "next/image"
import img from "./furryAV.jpeg"

interface Props {
	size: number
	className?: string
}

const Avatar = ({ size, className }: Props) => {
	return (
		<Image
			className={`min-w-[${size}] rounded-full border-black border-solid border ${className}`}
			loading="eager"
			src={img}
			alt="Avatar"
			width={size}
			height={size}
		/>
	)
}
export default Avatar
