"use client"

export const SelectCircle = ({
	isSelected,
	setIsSelected,
}: {
	isSelected: boolean
	setIsSelected?: () => void
}) => {
	return (
		<div style={{ cursor: "pointer" }} className="w-4">
			{isSelected ? (
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="8"
						cy="8"
						r="7.5"
						fill="#0D6EFD"
						stroke="black"
					/>
					<path
						d="M11.5 6.25L7.375 10.375L5.5 8.5"
						stroke="white"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			) : (
				<svg
					width="16"
					height="16"
					viewBox="0 0 16 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle
						cx="8"
						cy="8"
						r="7.5"
						fill="#F8F8F8"
						stroke="black"
					/>
				</svg>
			)}
			<input
				type="checkbox"
				className="hidden"
				checked={isSelected}
				onClick={(e) => e.stopPropagation()}
				onChange={() => {
					if (setIsSelected !== undefined) {
						setIsSelected()
					}
				}}
			/>
		</div>
	)
}
