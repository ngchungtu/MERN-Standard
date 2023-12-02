import * as L_type from '../../common/type'

export const getElementsfromLocalStorage = () => {
    let data = [];
    if (localStorage.getItem(L_type.typeLocalStorage.productInCart)) {
        data = JSON.parse(localStorage.getItem(L_type.typeLocalStorage.productInCart));
    }
    return data;
};

export const removeElementLocalStorage = (productId) => {
    let data = getElementsfromLocalStorage();
    data = data.filter(element => element.id !== productId);
    localStorage.setItem(L_type.typeLocalStorage.productInCart, JSON.stringify(data));
};

export const lockituSDT = (phoneNumber) => {
    const validPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    return validPhone.test(phoneNumber)
}

export const generateRandomNumber = () => {
    var minm = 100000;
    var maxm = 999999;
    return Math.floor(Math
        .random() * (maxm - minm + 1)) + minm;
}