import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardEmpty from './common/CardEmpty'
import Card from './Card'
import CustomerForm from './common/CustomerForm'
import { getcartTotal, setOrderSuccess } from '../reducers/product'
import Loading from './common/Loading'
import '../styles/card-content.css'
import { isEmptyOrNil } from '../common'

const OrderComponent = () => {
  const dispatch = useDispatch()
  const cardToCheckOut = useSelector((state) => state.product.cartItems)
  const productTotalQuantityInState = useSelector(state => state.product.totalQuantity)
  const productTotalPriceInState = useSelector(state => state.product.totalPrice)
  const [loading, setLoading] = useState(false)

  // const handleLoading = (param) => {
  //   if (param === true) {
  //     setLoading(true)
  //     localStorage.clear()
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 2000)
  //   } else {
  //     setLoading(false)
  //   }
  // }

  const handleOrder = (empData) => {
    if (empData) {
      setLoading(true)
      dispatch(setOrderSuccess(empData))
      window.location.replace('/OrderSuccess')
      // localStorage.clear()
      // setTimeout(() => {
      //   window.location.reload()
      // }, 2000)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(getcartTotal(cardToCheckOut))
  })

  return (
    <>
      {
        (cardToCheckOut.length !== 0 && !isEmptyOrNil(cardToCheckOut))
          ? <div className="cart-content_container">
            <div className="cart-content">
              {
                loading &&
                <div className="cart-loading">
                  <Loading />
                </div>
              }
              <Card
                cardToCheckOut={cardToCheckOut}
                productTotalQuantityInState={productTotalQuantityInState}
                productTotalPriceInState={productTotalPriceInState}
              />

              <CustomerForm
                cardToCheckOut={cardToCheckOut}
                productTotalQuantityInState={productTotalQuantityInState}
                productTotalPriceInState={productTotalPriceInState}
                handleOrder={handleOrder}
              />
            </div>
          </div>
          : <>
            <CardEmpty cardToCheckOut={cardToCheckOut} />
          </>
      }
    </>
  )
}

export default OrderComponent