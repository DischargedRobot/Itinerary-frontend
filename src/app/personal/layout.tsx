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
        <Layout className="gap-5">
            <Header style={{padding: 0}}>
                <NavBar/>
            </Header>
            <Content className="!mx-auto !px-4">
                {children}
            </Content>
        </Layout>
    )
}
export default PersonalLayout