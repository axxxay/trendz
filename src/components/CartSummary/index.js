import './index.css'

const cartSummary = props => {
  const {totalCartItems, totalCartPrice} = props
  return (
    <div className="cart-summary-container">
      <div className="cart-summary-content">
        <div className="order-total-con">
          <h1 className="order-total-text">Order Total:</h1>
          <p className="order-total-price">Rs {totalCartPrice}/-</p>
        </div>
        <p className="total-cart-items-count">{totalCartItems} items in cart</p>
      </div>
      <button type="button" className="checkout-button">
        Checkout
      </button>
    </div>
  )
}

export default cartSummary
