import { UserAuthorization } from "@/features/UserProfileAction/Authorization"
import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"

const AuthPage = () => {

    return (
        <Layout className="w-full gap-5">
            <Content className="flex mx-auto px-4 max-w-5xl w-full items-center justify-center">
                <UserAuthorization />
            </Content>
        </Layout>
    )
}
export default AuthPage
