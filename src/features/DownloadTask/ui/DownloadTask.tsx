"use client"

import { Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { useIntl } from "react-intl"
import { useDownloadTask } from "../model"

interface DownloadTaskProps {
	executors: {
		id: number
		products: {
			id: number
			operations: {
				id: number
			}[]
		}[]
	}[]
	disabled?: boolean
}

export const DownloadTask = ({ executors, disabled }: DownloadTaskProps) => {
	const { handleDownload, isLoading } = useDownloadTask()
	const intl = useIntl()

	return (
		<Button
			icon={<DownloadOutlined />}
			loading={isLoading}
			disabled={disabled || executors.length === 0}
			onClick={() => handleDownload(executors)}
		>
			{intl.formatMessage({ id: "download_excel" })}
		</Button>
	)
}
