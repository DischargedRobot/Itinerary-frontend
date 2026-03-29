import { APIJSONRequest } from "@/shared/api"
import { APIError } from "@/shared/api/apiError"

const executorsApi = {

    getExecutor: () => {
        
        try {
            const executors = APIJSONRequest('sss')

            return executors

        } catch(error) {
            if (error instanceof APIError) {
                showToast('error')
            }
        }
    }
}