import { APIJSONRequest } from "@/shared/api"
import { APIError } from "@/shared/api/apiError"
import { showToast } from "@/shared/model/Toast/useToastStore"

const executorsApi = {

    getExecutor: async () => {
        
        try {
            const executors = await APIJSONRequest('sss')

            return executors

        } catch(error) {
            if (error instanceof APIError) {
                showToast({
                    message: error?.customMessage ?? error.message,
                    type: 'error',
                    duration: 3000, 
                })
            }
        }
    }
}