import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product'
import Shop from './Pages/Shop'
import Cart from './Pages/Cart'
import LoginSignup from './Pages/LoginSignup'
import Footer from './Components/Footer/Footer'
import Checkout from './Pages/Checkout'
import OrderConfirmation from './Pages/OrderConfirmation'
import MyOrders from './Pages/MyOrders'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AdminProducts from './Pages/Admin/AdminProducts'
import AdminCategories from './Pages/Admin/AdminCategories'
import AdminOrders from './Pages/Admin/AdminOrders'
import AdminAnalytics from './Pages/Admin/AdminAnalytics'
import AdminUsers from './Pages/Admin/AdminUsers'
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kids_banner from './Components/Assets/banner_kids.png'


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/clothes' element={<ShopCategory banner={men_banner} category="clothes" />} />
          <Route path='/wigs' element={<ShopCategory banner={women_banner} category="wigs" />} />
          <Route path='/perfumes' element={<ShopCategory banner={kids_banner} category="perfumes" />} />
          <Route path='/shop' element={<ShopCategory />} />
          <Route path='/shop/:category' element={<ShopCategory />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/order-confirmation/:orderId' element={<OrderConfirmation />} />
          <Route path='/orders' element={<MyOrders />} />
          
          {/* Admin Routes */}
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/products' element={<AdminProducts />} />
          <Route path='/admin/categories' element={<AdminCategories />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/analytics' element={<AdminAnalytics />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
  )
}

export default App
