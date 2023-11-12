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
  removeCartItem = productId => {
    this.setState(prevState => {
      const {cartList} = prevState
      return {cartList: cartList.filter(ele => ele.id !== productId)}
    })
  }

  addCartItem = product => {
    const {cartList} = this.state
    const itemIndex = cartList.findIndex(item => item.id === product.id)
    console.log(itemIndex)
    if (itemIndex === -1) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      this.setState({
        cartList: cartList.map(item =>
          product.id === item.id
            ? {...item, quantity: item.quantity + product.quantity}
            : item,
        ),
      })
    }
    //   TODO: Update the code here to implement addCartItem
  }

  incrementCartItemQuantity = itemId => {
    // this.setState(prevState => {
    //   const {cartList} = prevState
    //   const itemIndex = cartList.findIndex(product => product.id === itemId)
    //   cartList[itemIndex] = {
    //     ...cartList[itemIndex],
    //     quantity: cartList[itemIndex].quantity + 1,
    //   }
    //   console.log('incrementCartItemQuantity : ', cartList)
    //   return {cartList}
    // })
    const {cartList} = this.state
    this.setState({
      cartList: cartList.map(product =>
        product.id === itemId
          ? {...product, quantity: product.quantity + 1}
          : product,
      ),
    })
  }

  decrementCartItemQuantity = itemId => {
    // ########## my code ################
    // const {cartList} = this.state
    // const item = cartList.filter(product => product.id === itemId)
    // if (item.quantity === 1) {
    //   removeCartItem(itemId)
    // } else {
    //   this.setState({
    //     cartList: cartList.map(product =>
    //       product.id === itemId
    //         ? {...product, quantity: product.quantity - 1}
    //         : product,
    //     ),
    //   })
    // }
    this.setState(prevState => {
      const updatedCartList = prevState.cartList.map(product =>
        product.id === itemId
          ? {...product, quantity: product.quantity - 1}
          : product,
      )

      const filteredCartList = updatedCartList.filter(
        product => product.quantity > 0,
      )

      return {cartList: filteredCartList}
    })
    console.log('decrementCartItemQuantity : ')
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
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
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
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
