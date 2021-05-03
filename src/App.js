import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Signin from './components/Signin'
import Signup from './components/Signup'
import Forgotpassword from './components/Forgotpassword'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import City from './components/City';
import Logout from './components/Logout';
import Restaurant from './components/Restaurant';
import Category from './components/Category';
import Cart from './components/Cart';
import PlaceOrder from './components/PlaceOrder';
import MyOrders from './components/MyOrders';
import Myprofile from './components/Myprofile';
import { useEffect, useState } from 'react';
import axiosInstance from './axios';

// import Card  from './components/Card';



function App() {

  const access_token = localStorage.getItem('access_token')
    useEffect(() => {
        if (access_token) {
            getCart()
        }

    }, []);



    const [total_item, setTotal] = useState([])

    const getCart = async () => {
        try {
            const res = await axiosInstance.get('/cart/')
            console.log(res.data)
            const total = res.data.orders.length
            setTotal(total)
            console.log(total_item)          

        } catch (err) {
            alert(err.message);

        }
    }


  return (

    <Router>

      <div className="App">
        <Switch>

          <Route path='/Logout'>
            <Logout />
          </Route>

          <Route path='/City'>
            <Header getCart={getCart} total_item = {total_item} />

            <City />
          </Route>



          <Route path='/Restaurant'>
            <Header getCart={getCart} total_item={total_item} />
            <Restaurant />
          </Route>

          <Route path='/Cart'>
            <Header  />
            <Cart Ocart={getCart} total_item={total_item} />

          </Route>



          <Route path='/Menu'>
            <Header getCart={getCart} total_item={total_item} />
            <Category getCart={getCart} />
          </Route>

          <Route path='/Forgotpassword'>
            <Forgotpassword />
          </Route>

          <Route path='/Signin'>
            <Signin />
          </Route>

          <Route path='/Signup'>
            <Signup />
          </Route>

          <Route path='/PlaceOrder'>
            <Header getCart={getCart} total_item={total_item}  />
            <PlaceOrder />
          </Route>

          <Route path='/MyOrders'>
            <Header />
            <MyOrders />
          </Route>

          <Route path='/Myprofile'>
          <Header />
            <Myprofile />
          </Route>

          <Route path='/'>
            <Header />
            <Home />
          </Route>




        </Switch>

      </div>

    </Router>



  );
}

export default App;
