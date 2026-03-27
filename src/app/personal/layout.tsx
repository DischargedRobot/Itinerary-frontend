import { NavBar } from "@/widgets/NavBar/ui/NavBar"
import { Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"

interface Props {
    children: React.ReactNode
}

const PersonalLayout = (props: Props) => {

    const { 
        children
    } = props

    return (
        <Layout className="flex w-full gap-5">
            <Header style={{padding: 0}} className="sticky top-0 w-full">
                <NavBar/>
            </Header>
            <Content className="mx-auto px-4 max-w-5xl w-full justify-items-center ">
                {children}
            </Content>
        </Layout>
    )
}
export default PersonalLayout