import * as users from './index'
import axios from 'axios'
import { getAuthHeaders, removeTokenCookie, getTokenCookie } from '../../utils/tools'

axios.defaults.headers.post['Content-Type'] = 'application/json'


export const registerUser = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post(`/api/users/register`, {
                email: values.email,
                password: values.password
            })
            dispatch(users.authUser({ data: user.data, auth: true }))
            dispatch(users.successGlobal('welcome !! check your email and validate your acount'))
        } catch (error) {
            console.log(error.response.data.message)
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const signInUser = (values) => {
    return async (dispatch) => {
        try {
            const user = await axios.post('/api/users/signin', {
                email: values.email,
                password: values.password
            })
            dispatch(users.authUser({ data: user.data, auth: true }))
            dispatch(users.successGlobal('Welcome !!'))
        } catch (error) {
            console.log(error.response.data.message)
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const isAuthUser = () => {
    return async (dispatch) => {
        try {
            if (!getTokenCookie) {
                throw new Error()
            }
            const user = await axios.get(`/api/users/isauth`, getAuthHeaders())
            dispatch(users.authUser({ data: user.data, auth: true }))
        } catch (error) {
            dispatch(users.authUser({ data: {}, auth: false }))
        }
    }
}

export const signOut = () => {
    return async (dispatch) => {
        removeTokenCookie()
        dispatch(users.signOut())
    }
}

export const changeEmail = (data) => {
    return async (dispatch) => {
        try {
            await axios.patch(`/api/users/update_email`, {
                email: data.email,
                newemail: data.newemail
            }, getAuthHeaders())
            dispatch(users.changeUserEmail(data.newemail))
            dispatch(users.successGlobal('Good Job!!'))

        } catch (error) {
            dispatch(users.errorGlobal(error.response.data.message))
        }

    }
}
export const updateUserProfile = (data) => {
    return async (dispatch, getState) => {
        try {
            const profile = await axios.patch(`/api/users/profile/`, data, getAuthHeaders())

            const userData = {
                ...getState().users.data,
                ...profile.data

            }
            dispatch(users.updateUserProfile(userData))
            dispatch(users.successGlobal('Profile Updated'))

        } catch (error) {
            dispatch(users.errorGlobal(error.response.data.message))
        }

    }
}


export const contactUs = (data) => {
    return async (dispatch) => {
        try {
            await axios.post(`/api/users/contact`, data);
            dispatch(users.successGlobal('We will contact you back'))
        } catch (error) {
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}

export const accountVerify = (token) => {
    return async (dispatch, getState) => {
        try {
            const user = getState().users.auth
            await axios.get(`/api/users/verify?validation=${token}`)
            if (user) {
                dispatch(users.accountVerify())
            }
            dispatch(users.successGlobal('Account verified'))
        } catch (error) {
            dispatch(users.errorGlobal(error.response.data.message))
        }
    }
}