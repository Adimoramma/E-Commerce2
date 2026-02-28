import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { clearCart } from '../../store/cartSlice'

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.length);
  const [menu, setMenu] = useState("shop");

  return (
    <div className="navbar">
       <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>DE STORE</p>
        </div>
        <ul className="nav-menu">
            <li onClick={() => {setMenu("shop")}}><Link style={{textDecoration: 'none'}} to="/">Shop</Link> {menu==="shop"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("clothes")}}><Link style={{textDecoration: 'none'}} to="/clothes">Clothes</Link> {menu==="clothes"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("wigs")}}><Link style={{textDecoration: 'none'}} to="/wigs">Wigs</Link> {menu==="wigs"?<hr/>:<></>}</li>
            <li onClick={() => {setMenu("perfumes")}}><Link style={{textDecoration: 'none'}} to="/perfumes">Perfumes</Link> {menu==="perfumes"?<hr/>:<></>}</li>
        </ul>
        <div className="nav-login-cart">
          {user ? (
            <button
              onClick={() => {
                dispatch(logout());
                dispatch(clearCart());
                navigate('/');
              }}
            >
              Logout
            </button>
          ) : (
            <Link to="/login"><button>Login</button></Link>
          )}
          <Link to="/cart"><img src={cart_icon} alt="Cart Icon" /></Link>
          <div className="nav-cart-count">{cartCount}</div>
        </div>
    </div>
  )
}

export default Navbar