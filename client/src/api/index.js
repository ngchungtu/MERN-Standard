import axios from "axios"
import * as _API from "./API_Url";

export const getApiProduct = async () => {
    return new Promise((resolve, reject) => {
        try {
            const data = axios.get(_API.BASE_API_URL)
                .then((response) => {
                    if (response) {
                        resolve(response)
                        // console.log(response);
                    } else {
                        console.log("cannot get response");
                        return null;
                    }
                })
            return data;
        } catch (error) {
            console.log('err to call api');
            reject('Error!...', error)
        }
    })
}

export const getProductById = async (productId) => {
    return new Promise((resolve, reject) => {
        try {
            const data = axios.get(_API.BASE_API_URL)
                .then((response) => {
                    if (response) {
                        const productItem = response.data.filter((item) => item.id === Number(productId))
                        productItem ? resolve(productItem) : console.log('Cannot get product item');
                        // console.log('productItem', productItem);
                    } else {
                        console.log("Cannot get data");
                    }
                })
            return data
        } catch (error) {
            console.log("Cannot get product item");
            reject("Error get product item", error)
        }
    })
}