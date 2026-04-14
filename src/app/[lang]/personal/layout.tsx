import { InitApplication } from "@/_app/ui"
import { userAPI } from "@/entities/User/api/userAPI"
import { type IUser } from "@/entities/User/lib"
import { isAPIError } from "@/shared/api"
import Toasts from "@/shared/ui/Toast/Toasts"
import { NavBar } from "@/widgets/NavBar"
import { Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface Props {
	children: React.ReactNode
	params: Promise<{ lang: string }>
}

const PersonalLayout = async (props: Props) => {
	const { children, params } = props
	const { lang } = await params
	let currentUser: IUser | undefined

	const cookieStore = await cookies()
	const cookieHeader = cookieStore.toString()

	try {
		currentUser = await userAPI.getMe(cookieHeader)
	} catch (error) {
		if (isAPIError(error) && error.status === 401) {
			redirect(`/${lang}/auth`)
		}

		console.error("Failed to get current user", error)
	}

	return (
		<>
			<InitApplication user={currentUser} />
			<Layout className="flex w-full gap-5 relative">
				<Header className="sticky top-0 w-full p-0 z-20 ">
					<NavBar />
				</Header>
				<Content className="mx-auto px-4 max-w-5xl w-full justify-items-center ">
					{children}
				</Content>
				<Toasts />
			</Layout>
		</>
	)
}
export default PersonalLayout
