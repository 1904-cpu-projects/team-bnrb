import React from 'react';
import { connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProduct, changeQuantity } from '../store';

const Cart = ({addedProduct, deleteProductFromCart, changeProductQuantity}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'}}>
      <p></p>
      <Link to='/checkout'><button>Checkout</button></Link>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: '2em'
        }}>
        {addedProduct.map(product =>
          <div key={product.id}
          className="card"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '250px',
            margin: '1em'
          }}
        >
          <img
            className="card-img-top"
            src={product.imageUrl}
            alt="product image"
            style={{ width: 200, height: 200 }}
          />
          <div className="card-body">
            <h5 className="card-title">{product.name}</h5>
            <p className="card-text">{product.description}</p>
            <p className="card-text">{`$${product.price}`}</p>
            <p className="card-text">Quantity:
            <select name='quantity' defaultValue={product.quantity} onChange={(event) => changeProductQuantity({newQuantity: event.target.value, productId: product.id})}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select></p>
            <Link to="/cart">
              <button onClick={() => deleteProductFromCart(product)}>Remove from Cart</button>
            </Link>
          </div>
        </div>)}
      </div>
    </div>
  );
}



const mapStateToProps = ({ addedProduct }) => {
  return {
    addedProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProductFromCart: event => dispatch(deleteProduct(event)),
    changeProductQuantity: event => dispatch(changeQuantity(event))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
