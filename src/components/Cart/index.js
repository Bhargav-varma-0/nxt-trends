import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const showEmptyView = cartList.length === 0
      // TODO: Update the functionality to remove all the items in the cart
      const getTotalAmount = () => {
        let total = 0
        cartList.forEach(ele => {
          total += ele.price * ele.quantity
        })
        return total
      }

      return (
        <>
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <div className="remove-all-div">
                  <button
                    className="remove-all-btn"
                    type="button"
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />

                <div className="remove-all-div">
                  <div className="coloumn">
                    <h1>
                      Order Total:{' '}
                      <span className="rupees">Rs {getTotalAmount()}</span>
                    </h1>
                    <p>{cartList.length} items in cart</p>
                    <div>
                      <button
                        className="button add-to-cart-btn w-100"
                        type="button"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
