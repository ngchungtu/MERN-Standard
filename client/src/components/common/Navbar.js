import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../styles/navbar.css'
import Tooltip from './Tooltip'

const Navbar = () => {
    const productInState = useSelector(state => state.product.cartItems)
    // console.log('productInState',productInState);

    const [offset, setOffset] = useState(0);
    const [activeTooltip, setActiveTooltip] = useState(false)
    // const [quantityItemInCart, setQuantityItemInCart] = useState('')

    const scrollToSetSticky = () => {
        const onScroll = () => setOffset(window.pageYOffset);
        // clean up code
        window.removeEventListener('scroll', onScroll);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }

    useEffect(() => {
        scrollToSetSticky()
    }, []);

    return (
        <>
            <div className={offset > 0 ? 'navbar_container navbar_container-sticky' : 'navbar_container'}>
                <div className='navbar_logo'>
                    <h2>MERN Standard</h2>
                </div>
                <div className='navbar_item'>
                    <ul>
                        <li>
                            <a href='/' as={Link} className='nav_item'>Cửa hàng <i className="ri-store-3-line"></i></a>
                        </li>
                        <li>
                            <span className='nav_item nav_item-card' onClick={() => setActiveTooltip(!activeTooltip)}>Giỏ hàng <i className="ri-shopping-cart-2-line"></i>
                                {/* <span className={productInState.length ? 'nav_item-card-badges' : ""}>
                                    {productInState.length ? productInState.length : null}
                                </span> */}
                                <span className={productInState.length ? 'nav_item-card-badges' : ""}>
                                    {productInState.length ? productInState.length : null}
                                </span>
                            </span>
                            {
                                activeTooltip &&
                                <div className='tooltip'>
                                    <Tooltip productInState={productInState} />
                                </div>
                            }
                        </li>
                        <li>
                            <a href='/todo' as={Link} className='nav_item'>Todo <i className="ri-list-check-2"></i></a>
                        </li>
                        <li>
                            <a href='/checklocation' as={Link} className='nav_item'>Check Lat Lng <i className="ri-map-pin-user-line"></i></a>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar