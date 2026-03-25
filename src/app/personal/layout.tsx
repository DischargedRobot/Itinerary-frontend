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
        <Layout>
            <Header>
                <NavBar/>
            </Header>
            <Content>
                {children}
            </Content>
        </Layout>
    )
}
export default PersonalLayout