import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    if (cartList.length !== 0) {
      const isProductExists = cartList.find(eachCart => eachCart.id === id)
      if (isProductExists.quantity <= 1) {
        this.removeCartItem(id)
      } else {
        this.setState(prevState => ({
          cartList: prevState.cartList.map(eachCart => {
            if (eachCart.id === id) {
              return {
                ...eachCart,
                quantity: eachCart.quantity - 1,
              }
            }
            return eachCart
          }),
        }))
      }
    }
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    if (cartList.length !== 0) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === id) {
            return {
              ...eachCart,
              quantity: eachCart.quantity + 1,
            }
          }
          return eachCart
        }),
      }))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updatedCartList})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const isProductExists = cartList.find(
      eachCart => eachCart.id === product.id,
    )

    if (isProductExists === undefined) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    } else {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCart => {
          if (eachCart.id === product.id) {
            return {
              ...eachCart,
              quantity: product.quantity,
            }
          }
          return eachCart
        }),
      }))
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
