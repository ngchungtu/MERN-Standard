import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { decrementQuantity, incrementQuantity } from '../reducers/product';
import { isEmptyOrNil } from '../common';
import '../styles/card.css'
import { removeElementLocalStorage } from '../store/common/function';
import Loading from './common/Loading';

const Card = ({ cardToCheckOut, productTotalQuantityInState, productTotalPriceInState }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)

  const incrementQuantityProduct = (product) => {
    if (!isEmptyOrNil(product)) {
      dispatch(incrementQuantity(product))
    }
  }

  const decrementQuantityProduct = (product) => {
    if (!isEmptyOrNil(product)) {
      dispatch(decrementQuantity(product))
    }
  }

  const handleDeleteProduct = (productId) => {
    removeElementLocalStorage(productId)
    setLoading(true)
  }

  // useEffect(() => {
  //   console.log('cardToCheckOut', cardToCheckOut);
  // }, [])

  return (
    <div className="card">
      {
        loading
          ? <Loading />
          : <>
            {
              cardToCheckOut.map((i) => (
                <div className="card_container" key={i.id}>
                  <div className="card_container-img">
                      <img src={i.image} className='card_img' alt={i.title} />
                      <i className="ri-close-circle-line" onClick={() => handleDeleteProduct(i.id)}></i>
                  </div>
                  <div className='card_content'>
                    <h3 className='card_title'>{i.title}</h3>
                    <h4 className='card_price'>$ {i.price}</h4>
                    <h5 className='card_name-cate'>{i.category}</h5>
                    <h5>Rating: {i.rating.rate} ✰</h5>
                  </div>
                  <div className='card_item-product-quantity'>
                    <h5>Số lượng:</h5>
                    <div className='card_item-product-quantity-de-increment'>
                      <input type="button" value="-" onClick={() => decrementQuantityProduct(i)} />
                      <p>{i.cartQuantity}</p>
                      <input type="button" value="+" onClick={() => incrementQuantityProduct(i)} />
                    </div>
                  </div>
                </div>
              ))
            }
            <div className="card_total">
              <h5>Số lượng: {productTotalQuantityInState}</h5>
              <h5>Tổng tiền: {productTotalPriceInState}</h5>
            </div>
          </>
      }
    </div >
  )
}

export default Card