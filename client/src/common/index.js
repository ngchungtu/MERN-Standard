export const autoId = () => {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}

export function isEmptyOrNil(value) {
    return ['', [], null, undefined].indexOf(value) !== -1;
}

// export const setCookie = (name, expires) => {
//     let dataCookie = encodeURIComponent(name) + ';' + encodeURIComponent(expires)
//     document.cookie = dataCookie;
// }

export const setLocalStorage = (type, value) => {
    return localStorage.setItem(type, JSON.stringify(value))
    
}

export const getLocalStorage = (value) => {
    return JSON.parse(localStorage.getItem(value))
}

export const clearLocalStorage = () => {
    return localStorage.clear()
}