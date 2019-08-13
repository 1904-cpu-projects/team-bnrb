import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';

// Product Actions
const SET_PRODUCTS = 'SET_PRODUCTS';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// Category Actions
const SET_CATEGORIES = 'SET_CATEGORIES';

// Login Actions
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

// User Actions
const CREATE_USER = 'CREATE_USER';

// Catch Errors
const CATCH_ERROR = 'CATCH_ERROR';

// Cart Actions
const ADD_PRODUCT = "ADD_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";
const CHANGE_QUANTITY = "SUBTRACT_QUANTITY";
const SET_CART = 'SET_CART';

//Admin Actions
const GET_ALL_USERS = 'GET_ALL_USERS'
const REMOVE_USER = 'REMOVE_USER'

const adminReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      state = [...state, action.users].flat();
      break;
      case REMOVE_USER:
      state = state.filter(user => user.id !== action.userId)
      break;
  }
  return state
}

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      state = [...state, action.products].flat();
      break;
    case REMOVE_PRODUCT:
      state = state.filter(product => product.id !== action.productId)
      break;
  }
  return state;
};

const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.categories;
  }
  return state;
};

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return action.user
    case LOGOUT_USER:
      state = {};
      return state;
  }
  return state;
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
  }
  return state;
};

const errorReducer = (state = '', action) => {
  switch (action.type) {
    case CATCH_ERROR:
      return action.error;
  }
  return state;
};

const cartReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart;

    case ADD_PRODUCT:
      const alreadyAdded = state.forEach(product => {
        if (product.id === action.addedProduct.id) {
          product.quantity++;
          return alreadyAdded;
        }
      });
      action.addedProduct.quantity = 1;
      return [...state, action.addedProduct];
    case DELETE_PRODUCT:

      const updatedProducts = state.filter(product => { return product.id !== action.deletedProduct.id })
      return updatedProducts
    case CHANGE_QUANTITY:
      state.forEach(product => {
        if (product.id === action.product.productId) {
          product.quantity = action.product.newQuantity
        }
      return state
      })
  }
  return state;
};

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  loggedInUser: loginReducer,
  user: userReducer,
  error: errorReducer,
  cart: cartReducer,
  users: adminReducer
});

const _getUsers = users => {
  return {
    type: GET_ALL_USERS,
    users
  }
}

const _deleteUser = userId => {
  return {
    type: REMOVE_USER,
    userId
  }
}

const _setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  };
};

const _removeProduct = productId => {
  return {
    type: REMOVE_PRODUCT,
    productId
  }
}

const _setCategories = categories => {
  return {
    type: SET_CATEGORIES,
    categories
  };
};

const _loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  }
}

const _logoutUser = () => {
  return {
    type: LOGOUT_USER
  };
};

const _createUser = user => {
  return {
    type: CREATE_USER,
    user
  };
};

const _catchError = error => {
  return {
    type: CATCH_ERROR,
    error
  };
};

const _setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
}

const _addProduct = addedProduct => {
  return {
    type: ADD_PRODUCT,
    addedProduct
  };
};

const _deleteProduct = deletedProduct => {
  return {
    type: DELETE_PRODUCT,
    deletedProduct
  };
};

const _changeQuantity = (product) => {
  return {
    type: CHANGE_QUANTITY,
    product
  }
}

const setProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products');
    return dispatch(_setProducts(response.data));
  };
};

const removeProduct = productId => {
  return async dispatch => {
    await axios.delete(`/api/products/${productId}`)
    return dispatch(_removeProduct(productId))
  }
}

const setCategories = () => {
  return async dispatch => {
    const response = await axios.get('/api/categories');
    return dispatch(_setCategories(response.data));
  };
};

const loginUser = () => {
  return async dispatch => {
    const response = await axios.get("/login")
    dispatch(_loginUser(response.data))
    window.location.hash = '/';

  }
}

const logoutUser = () => {
  return async dispatch => {
    await axios.delete('/login');
    dispatch(_logoutUser());
  };
};

const createUser = user => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/users', user);
      dispatch(_createUser(response.data));
      window.location.hash = '/login';
    } catch (ex) {
      dispatch(_catchError(ex.response.data));
    }
  };
};

const setCart = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/cart');
      dispatch(_setCart(response.data));
    }
    catch (ex){
      console.log(ex);
    }
  }
}

const addProduct = addedProduct => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/cart', addedProduct);
      dispatch(_addProduct(response.data));
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteProduct = deletedProduct => {
  return async dispatch => {
    try {
      await dispatch(_deleteProduct(deletedProduct));
    } catch (err) {
      console.error(err);
    }
  };
};

const changeQuantity = (product) => {
  return async dispatch => {
    try {
      await dispatch(_changeQuantity(product))
    } catch (err) {
      console.error(err)
    }
  }
}

const getUsers = () => {
  return async dispatch => {
    try {
    const response = await axios.get('/api/users')
    dispatch(_getUsers(response.data))
    } catch (ex) {
    dispatch(_catchError(ex.response.data));
    }
  }
}

const deleteUser = userId => {
  return async dispatch => {
    await axios.delete(`/api/users/${userId}`)
    dispatch(_deleteUser(userId))
  }
}

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export {
  setProducts,
  setCategories,
  loginUser,
  createUser,
  logoutUser,
  addProduct,
  deleteProduct,
  changeQuantity,
  setCart,
  getUsers,
  deleteUser,
  removeProduct
};

