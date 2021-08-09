import { GET_ARTICLES, ERROR_GLOBAL, SUCCESS_GLOBAL, CLEAR_NOTIFICATION, AUTH_USER, SIGN_OUT, SITE_LAYOUT, GET_ARTICLE, CLEAR_CURRENT_ARTICLE, ADD_ARTICLE, GET_ADMIN_ARTICLES, UPDATE_ARTICLE_STATUS, REMOVE_ARTICLE, CHANGE_USER_EMAIL, UPDATE_USER_PROFILE, VERIFY_ACCOUNT, GET_CATEGORIES, ADD_CATEGORY, NAV_SEARCH } from '../types'

export const addArticle = (article) => ({
    type: ADD_ARTICLE,
    payload: article
})

export const getArticles = (articles) => ({
    type: GET_ARTICLES,
    payload: articles
})
export const getArticle = (article) => ({
    type: GET_ARTICLE,
    payload: article
})

export const getPaginateArticles = (articles) => ({
    type: GET_ADMIN_ARTICLES,
    payload: articles
})

export const updateArticleStatus = (article) => ({
    type: UPDATE_ARTICLE_STATUS,
    payload: article
})

export const clearCurrentArticle = () => ({
    type: CLEAR_CURRENT_ARTICLE
})


export const errorGlobal = (msg) => ({
    type: ERROR_GLOBAL,
    payload: msg
})

export const successGlobal = (msg) => ({
    type: SUCCESS_GLOBAL,
    payload: msg
})

export const clearNotification = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAR_NOTIFICATION
        })
    }
}

export const getCategories = (categories) => ({
    type: GET_CATEGORIES,
    payload: categories
})

export const addCategory = (categories) => ({
    type: ADD_CATEGORY,
    payload: categories
})

export const navSearch = (articles) => ({
    type: NAV_SEARCH,
    payload: articles
})

export const removeArticle = () => ({
    type: REMOVE_ARTICLE
})

export const authUser = (user) => ({
    type: AUTH_USER,
    payload: user
})

export const signOut = () => ({
    type: SIGN_OUT,
})

export const changeUserEmail = (data) => ({
    type: CHANGE_USER_EMAIL,
    payload: data

})

export const updateUserProfile = (userdata) => ({
    type: UPDATE_USER_PROFILE,
    payload: userdata
})
export const accountVerify = (token) => ({
    type: VERIFY_ACCOUNT
})

export const appLayout = (layout) => ({
    type: SITE_LAYOUT,
    payload: layout
})