import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearStorage, getOrderSuccess } from '../reducers/product'
import '../styles/order-success.css'

const OrderSuccess = () => {
    const dispatch = useDispatch()
    const cardToCheckOut = useSelector((state) => state.product.cartSuccess)
    console.log('cardToCheckOut - success', cardToCheckOut);

    useEffect(() => {
        dispatch(getOrderSuccess())
        setTimeout(() => {
            dispatch(clearStorage())
            window.location.reload()
        }, 5000)
    }, [])

    return (
        <div className='os-container'>
            <div className='os-cart-content'>
                <div className='os-cart-status'>
                    <h2>Đặt hàng thành công</h2>
                </div>

                <div className='os-cart-detail' key={cardToCheckOut.id}>
                    <div className='os-cart-detail-header'>
                        <div className='os-customer-info'>
                            <h5>Họ tên: <span>{cardToCheckOut.name}</span></h5>
                            <h5>Số điện thoại: <span>{cardToCheckOut.phone}</span></h5>
                            <h5>Địa chỉ: <span>{cardToCheckOut.selectProvince}, {cardToCheckOut.selectDistrict}, {cardToCheckOut.selectWard}</span></h5>
                        </div>
                        <div className='os-cart-id'>
                            <h5>#{cardToCheckOut.id}</h5>
                        </div>
                    </div>

                    {
                        cardToCheckOut?.card?.map((c) => (
                            <div className='os-product-in-cart' key={c.id}>
                                <div className='os-product-img'>
                                    <img src={c.image} alt={c.title} />
                                </div>
                                <div className='os-product-detail'>
                                    <h4>{c.title}</h4>
                                    <h5>{c.price}</h5>
                                </div>
                            </div>
                        ))
                    }

                    <div className='os-cart-total'>
                        <h5>Tổng số lượng: <span>{cardToCheckOut.totalQuantity}</span></h5>
                        <h5>Tổng tiền: <span>{cardToCheckOut.totalPrice}</span></h5>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default OrderSuccess