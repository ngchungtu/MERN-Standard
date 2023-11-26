import React, { useEffect } from 'react'
import '../../styles/tooltip.css'
import { useDispatch } from 'react-redux'
import { deleteProductInCart, getcartTotal } from '../../reducers/product'
import { isEmptyOrNil, setLocalStorage } from '../../common'
import * as L_type from '../../common/type'
// import { CookiesProvider, useCookies } from "react-cookie";

const Tooltip = ({ productInState }) => {
    // console.log('productInState - tooltip', productInState);
    // const productTotalQuantityInState = useSelector(state => state.product.totalQuantity)
    // const productTotalPriceInState = useSelector(state => state.product.totalPrice)

    // const [cookies, setCookie] = useCookies(["cardList"]);

    const dispatch = useDispatch()

    const removeItem = (product) => {
        if (!isEmptyOrNil(product)) {
            dispatch(deleteProductInCart(product))
        }
    }

    const handleCheckout = (productToCheckout) => {
        if (!isEmptyOrNil(productToCheckout)) {
            setLocalStorage(L_type.typeLocalStorage.productInCart, productToCheckout)
            // dispatch(checkoutCard(cookies.cardList))
            // setCookie("cardList", productToCheckout);
        }
    }

    useEffect(() => {
        dispatch(getcartTotal(productInState))
    })
    return (
        <>
            <div className="tooltip_container">
                {
                    productInState.length === 0
                        ? <div className='empty-cart'>
                            <h4>Giỏ hàng trống <i className="ri-shopping-basket-2-line"></i></h4>
                        </div>
                        : <>
                            {
                                productInState.map((product) => (
                                    <div key={product.id} className='tooltip_item'>
                                        <div className='tooltip_item-img'>
                                            <img src={product.image} alt={product.title} />
                                            <i className="ri-close-circle-line" onClick={() => removeItem(product)}></i>
                                        </div>
                                        <div className='tooltip_item-detail'>
                                            <h4 className='tooltip_item-title'><span>Tên sản phẩm: </span>{product.title}</h4>
                                            <h5 className='tooltip_item-price'>Giá: {product.price}</h5>
                                            <h5 className='tooltip_item-category'>Cate: {product.category}</h5>
                                        </div>
                                    </div>
                                ))
                            }
                            <div className='tooltip_container-total'>
                                {/* <h5>Tổng số lượng: {productTotalQuantityInState}</h5>
                                <h5>Tổng tiền: {productTotalPriceInState}</h5> */}
                                <a href='/thanh-toan' onClick={() => handleCheckout(productInState)}>Đặt hàng</a>
                            </div>
                        </>
                }
            </div>
        </>
    )
}

export default Tooltip