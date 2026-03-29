import { APIJSONRequest } from "@/shared/api"
import { APIError } from "@/shared/api"
import { showToast } from "@/shared/model"

export const executorsAPI = {

    getExecutor: async () => {
        
        try {
            const executors = await APIJSONRequest('Executors')

            return executors

        } catch(error) {
            if (error instanceof APIError) {
                console.log(error, 'error')

                showToast({
                    message: error?.customMessage ?? error.message,
                    type: 'error',
                    duration: 3000, 
                })
            }
        }
    }
}