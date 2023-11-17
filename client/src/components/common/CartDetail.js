import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProductById } from '../../api'
import { useState } from 'react'
import '../../styles/product-detail.css'

const CartDetail = () => {
  const params = useParams()
  const [product, setProduct] = useState([])

  useEffect(() => {
    const getProducItem = async () => {
      return await getProductById(params.id).then((product) => {
        // console.log(product);
        setProduct(product)
      })
    }
    getProducItem()
  }, [params.id])

  return (
    <div className='product_item'>
      {
        product.map((i) => (
          <div key={i.id} className="product_item-container">
            <div className="product_item-container-img">
              <div className="product_item-img">
                <img src={i.image} alt={i.title} />
              </div>
              {/* <span><i className="ri-close-circle-line"></i> Xóa</span> */}
            </div>
            <div className="product_item-detail">
              <h4>Tên sản phẩm: {i.title}</h4>
              <h5>Loại: {i.category}</h5>
              <h5>Giá: {i.price}</h5>
            </div>
            <div className='product_item-quantity'>
              <div className='product_item-quantity-de-increment'>
                {/* <h5>Số lượng:</h5>
                <div>
                  <input type="button" value="-" />
                  <p>1</p>
                  <input type="button" value="+" />
                </div> */}
              </div>
              <button>Thêm vào giỏ hàng</button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default CartDetail