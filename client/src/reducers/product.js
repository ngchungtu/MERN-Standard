import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage, isEmptyOrNil } from "../common";
import * as L_type from '../common/type'

const initialState = {
    productList: [],
    cartItems: [],
    totalQuantity: 0,
    totalPrice: 0,
}

export const productSlice = createSlice({
    name: 'productReducer',
    initialState,
    reducers: {
        addProductToCart: (state, action) => {
            /* #region  basic */
            // console.log(action.payload);
            // if (!isEmptyOrNil(action.payload)) {
            //     state.cartItems.push(action.payload);
            //     /* #region  note tgian cho cookie */
            //     //cookie set date: yy-mm-dd
            //     //time trong broswer là GTM,còn tgian set trong code là local time nên tgian set trong code -7 sẽ = tgian được set trong cookie (vì tgian tại VN là GMT +7)
            //     /* #endregion */
            //     /* #region  set cart to cookie */
            //     // document.cookie = (`name=${JSON.stringify(action.payload)}; expires=${new Date('2023-10-21 10:00:00').toUTCString()}`)
            //     /* #endregion */
            // }
            /* #endregion */

            const productData = action.payload
            const itemIndex = state.cartItems.findIndex((i) => i.id === productData.id)
            /* #region  note for if method */
            /*
            findIndex lọc qua các giá trị trong mảng
            trả về -1 nếu ko tìm thấy giá trị thỏa mãn
            itemIndex >= 0 tức là có tìm thấy giá trị trong mảng (mảng ở đây đang đề cập là mảng trong giỏ hàng)
            tìm thấy có -> chỉ cần tăng giá trị cartQuantity trong product item, ko cần push thêm product item vào mảng
            (thông thường nều ko sử dụng hàm if thì 1 produc item sẽ push vào trong mảng nhiều lần (bị lặp lại)) 
                => check trong redux toolkit (state)
            */
            /* #endregion */
            if (!isEmptyOrNil(itemIndex) && itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1
            } else {
                const tempProduct = { ...productData, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                // setLocalStorage(L_type.typeLocalStorage.productInCart, tempProduct)
            }
        },

        getcartTotal: (state, action) => {
            /* #region  basic */
            // console.log(action.payload);
            // let productList = action.payload
            // let quantityDefault = 0
            // const totalQuantityInCart = productList.reduce((accumulator, currentValue) => {
            //     return accumulator + currentValue.cartQuantity
            // },quantityDefault)
            // state.totalQuantity = totalQuantityInCart,
            /* #endregion */

            let productList = action.payload
            let { totalQuantity, totalPrice } = productList.reduce((accumulator, currentValue) => {
                const { price, cartQuantity } = currentValue
                const itemTotalPrice = price * cartQuantity
                accumulator.totalPrice += itemTotalPrice
                accumulator.totalQuantity += cartQuantity
                return accumulator
            }, { totalQuantity: 0, totalPrice: 0 })
            state.totalQuantity = totalQuantity
            state.totalPrice = totalPrice
        },

        incrementQuantity: (state, action) => {
            // console.log("+", action.payload);
            const itemIndex = state.cartItems.findIndex((i) => i.id === action.payload.id)

            //có product trong cart thì + thêm
            if (!isEmptyOrNil(state.cartItems[itemIndex].cartQuantity)) {
                state.cartItems[itemIndex].cartQuantity += 1
            }
        },

        decrementQuantity: (state, action) => {
            // console.log("-", action.payload);
            const itemIndex = state.cartItems.findIndex((i) => i.id === action.payload.id)

            //nếu trong cart có product (cartQuantity > 1) thì thực hiện giảm
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1
            }
            /* #region note else if method */
            //nếu cartQuantity mà vẫn muốn giảm thì xóa product khỏi giỏ hàng, filter lại những cái itemId !== itemProduct trong giỏ hàng
            //comment đoạn else if này thì sp trong giỏ hàng trả về 1 và ko xóa hẳn.
            /* #endregion */
            else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const card = state.cartItems.filter((i) => i.id !== action.payload.id)
                state.cartItems = card
            }
        },

        deleteProductInCart: (state, action) => {
            // console.log("del", action.payload);
            const product = action.payload
            if (!isEmptyOrNil(product)) {
                const card = state.cartItems.filter((i) => i.id !== product.id)
                state.cartItems = card
            }
        },

        checkoutCard: (state, action) => {
            // console.log('get localstore', getLocalStorage(L_type.typeLocalStorage.productInCart));
            const data = getLocalStorage(L_type.typeLocalStorage.productInCart)
            // console.log(data);
            if (!isEmptyOrNil(data)) {
                state.cartItems = data
            }
        }
    }
})

export const { addProductToCart, getcartTotal,
    incrementQuantity, decrementQuantity,
    deleteProductInCart, getAllProduct,
    checkoutCard } = productSlice.actions
export default productSlice.reducer;