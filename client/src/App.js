import './App.css';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Product from './components/Product';
import Todo from './components/Todo';
import GetLatLngLocation from './components/GetLatLngLocation';
import Navbar from './components/common/Navbar';
import 'remixicon/fonts/remixicon.css'
import CartDetail from './components/common/CartDetail';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { isEmptyOrNil } from './common';
import { checkoutCard } from './reducers/product';
import OrderComponent from './components/OrderComponent';
import OrderSuccess from './components/OrderSuccess'

function App() {

  const dispatch = useDispatch()
  const cardToCheckOut = useSelector((state) => state.product.cartItems)
  // console.log(cardToCheckOut);

  const handleCheckoutProduct = () => {
    if (!isEmptyOrNil(cardToCheckOut)) {
      dispatch(checkoutCard())
    }
  }

  useEffect(() => {
    handleCheckoutProduct()
  }, [])

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
      <Route index element={<Product />}></Route>
      <Route path="/san-pham/:id" element={<CartDetail />}></Route>
      <Route path="/thanh-toan" element={<OrderComponent />}></Route>
      <Route path="/OrderSuccess" element={<OrderSuccess />}></Route>
      <Route path="/todo" element={<Todo />}></Route>
      <Route path="/checklocation" element={<GetLatLngLocation />}></Route>
    </Route>
  ))

  return (
    <div className="App">
      <Navbar />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

// https://remixicon.com/