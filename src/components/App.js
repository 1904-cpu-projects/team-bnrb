import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Sidebar from './Sidebar';
import Products from './Products';
import Cart from './Cart';
import Login from './Login';
import SignUp from './SignUp';
import Checkout from './Checkout'
import { setProducts, setCategories, loginUser, setCart, getUsers, deleteCart } from '../store';
import { connect } from 'react-redux';
import SingleProduct from './SingleProduct';
import OrderConfirmation from './OrderConfirmation'
import AdminCP from './AdminCP'
import UserProfile from './UserProfile'

class App extends React.Component {
  componentDidMount() {
    this.props.loadProducts();
    this.props.loadCategories();
    this.props.loadSession();
    this.props.loadCart();
    this.props.loadUsers();
    this.props.emptyCart();
  }

  render() {
    return (
      <HashRouter>
        <h2>
          <img
            style={{ width: 100, height: 100 }}
            src="https://i.imgur.com/BOdXYeP.png"
          />
          Floppy Shoppy
        </h2>
        <Route path="/" component={Header} />
        <Route path="/" component={Sidebar} />
        <Route exact path="/" component={Home} />
        <Route path="/products/search/:name" />
        <Route path="/products/category/:id" component={Products} />
        <Route path="/products" exact component={Products} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orderconfirmation" component={OrderConfirmation} />
        {this.props.loggedInUser.isAdmin && <Route path="/admincp" component={AdminCP} />}
        <Route path="/userprofile" component={UserProfile} />
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ loggedInUser }) => {
  return {
    loggedInUser
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProducts: () => dispatch(setProducts()),
    loadCategories: () => dispatch(setCategories()),
    loadSession: () => dispatch(loginUser()),
    loadCart: () => dispatch(setCart()),
    loadUsers: () => dispatch(getUsers()),
    emptyCart: () => dispatch(deleteCart())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
