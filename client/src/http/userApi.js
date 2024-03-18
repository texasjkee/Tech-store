import { setUser } from '../store/userSlice'
import { jwtDecode } from "jwt-decode"
import { $authHost } from "./index"

export const registration = async (email, password) => {
    try {
        const { data } = await $authHost.post('api/user/registration', { email, password, role: 'ADMIN' })

        if (data) {
            localStorage.setItem('token', data.token.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
            return jwtDecode(data.token.accessToken)
        } else {
            console.error("No data received from the server")
            return null
        }
    } catch (error) {
        console.error("Error during API call:", error)
        return null
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await $authHost.post('api/user/login', { email, password })

        if (data) {
            localStorage.setItem('token', data.token.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)

            const decodedToken = jwtDecode(data.token.accessToken)
            const userWithRole = { ...decodedToken, role: decodedToken.role }

            setUser(userWithRole);
            //console.log('User role:', userWithRole);
            
            return decodedToken
        } else {
            console.error("No data received from the server")
            return null
        }
    } catch (error) {
        console.error("Error during API call:", error)
        return null
    }
};


export const check = async () => {
    try {
        const response = await $authHost.get('api/user/auth')
        
        if (response.data) {
            const data = response.data

            localStorage.setItem('token', data.token.accessToken)

            // Якщо є refreshToken, оновлюємо його в локальному сховищі
            if (data.refreshToken) {
                localStorage.setItem('refreshToken', data.refreshToken)
            }

            // Декодуємо токен та додаємо роль користувача
            const decodedToken = jwtDecode(data.token.accessToken)
            const userWithRole = { ...decodedToken, role: decodedToken.role }

            // Встановлюємо дані користувача у сторі
            setUser(userWithRole)
            //console.log('Data from server:', data);
            //console.log('User role:', userWithRole);

            return decodedToken
        } else {
            console.error("No data received from the server")
            return null
        }
    } catch (error) {
        if (error.response && error.response.data) {
            console.error("Error during check:", error.response.data)
        } else {
            console.error("Error during check:", error)
        }
        return null
    }
}