import Header from '../Header'
import CartListView from '../CartListView'
import CartSummary from '../CartSummary'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      let totalCartPrice = 0
      if (cartList.length !== 0) {
        totalCartPrice = cartList.reduce(
          (acc, eachCart) => acc + eachCart.quantity * eachCart.price,
          0,
        )
      }
      // TODO: Update the functionality to remove all the items in the cart

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <div className="cart-content">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    onClick={removeAllCartItems}
                    className="remove-all-cart-items"
                  >
                    Remove All
                  </button>
                  <CartListView />
                </div>
                {/* TODO: Add your code for Cart Summary here */}
                <CartSummary
                  totalCartPrice={totalCartPrice}
                  totalCartItems={cartList.length}
                />
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
