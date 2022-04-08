import cookies from "js-cookie";
import Router from "next/router";


//set in cookie
export const setCookie = (key, value) => {
    if(window !== undefined){
        cookies.set(key, value, {
            expires: 1
        })
    }
}

//remove from cookie
export const removeCookie = key => {
    if(window !== undefined){
        cookies.set(key)
    }
}

//Get information from cookie such as stored token
export const getCookie = ( key, req ) => {
    return window ? getCookieFromBrowser(key) : getCookieFromServer( key, req)
}

export const getCookieFromBrowser = key => {
    return cookies.get(key)
}

export const getCookieFromServer = ( key, req ) => {
    if(!req.headers.cookies){
        return undefined;
    }
    console.log('req.headers.cookies', req.headers.cookies)
    let token = req.headers.cookies.split(';').find(c => c.trim().startsWith(`${key}=`))
    if(!token){
        return undefined
    }
    let tokenValue = token.split('=')[1]
    console.log('getCookieFromServer', tokenValue);
    return tokenValue
}

//set in Localstorage
export const setLocalStorage = ( key , value )=> {
    if(window !== undefined){
        localStorage.setItem(key, JSON.stringify(value))
    }
}

//remove from Localstorage
export const removeLocalStorage = key => {
    if(window !== undefined){
        localStorage.removeItem(key)
    }
}


//authenticate user by passing data to cookie and localstorage
export const authenticate = ( response, next ) => {
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user)
    next()
}

export const isAuth = () => {
    if(window !== undefined){
        const cookieChecked = getCookie('token')
        if(cookieChecked){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }
}
export const logout = () => {
    removeCookie('token');
    removeLocalStorage('user');
    Router.push('/login')
}