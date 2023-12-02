import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import Cart from './common/Cart'
import { getApiProduct } from '../api'

const Product = () => {
    const [products, setProducts] = useState([])

    const getProductDataFromApi = async () => {
        try {
            return await getApiProduct().then((response) => {
                if (response) {
                    setProducts(response.data)
                } else {
                    console.log('Err to call api');
                }
            })
        } catch (error) {
            console.log('Cannot get data from Api Product', error);
        }
    }
    useEffect(() => {
        getProductDataFromApi()
    }, [])

    return (
        <>
            <div className='product_container'>
                {
                    products.map((product) => (
                        <div key={product.id}>
                            <Cart product={product} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default Product

// https://www.youtube.com/watch?v=A_vRvDAZuOo&ab_channel=NishaSingla