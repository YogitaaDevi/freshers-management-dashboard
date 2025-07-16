import axios from "axios"
import Cookies from 'js-cookie'

export async function getUserCredentials(email: string, password: string) {
    try {
        const payload = {
            email,
            password
        }
        const response = await axios.post('/api/auth/signin', payload)
        if ((response.status === 200 || response.status === 201) && response.data.success) {
            Cookies.set("authToken", response.data.token)
            Cookies.set('isAdmin', 'true')
        }
        return response.data
    } catch (error: any) {
        if (error.response && error.response.data) {
            return error.response.data
        }
        return { error: 'Network error', message: 'Unable to connect to server' }
    }
}