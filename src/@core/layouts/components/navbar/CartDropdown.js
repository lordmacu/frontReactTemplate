// ** React Imports
import { useEffect, Fragment, useState } from 'react'
import { Link } from 'react-router-dom'

// ** Custom Components
import NumberInput from '@components/number-input'

// ** Third Party Components
import { ShoppingCart, X } from 'react-feather'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Media, Badge, Button } from 'reactstrap'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
 
const CartDropdown = () => {
  // ** State
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)

 
  // ** Function to toggle Dropdown
  const toggle = () => setDropdownOpen(prevState => !prevState)

 
  // ** Loops through Cart Array to return Cart Items
  const renderCartItems = () => {
    if (store.cart.length) {
      let total = 0

      return (
        <Fragment>
          
        </Fragment>
      )
    } else {
      return <p className='m-0 p-1 text-center'>Your cart is empty</p>
    }
  }

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} tag='li' className='dropdown-cart nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link position-relative'>
        <ShoppingCart className='ficon' />
        {store.cart.length > 0 ? (
          <Badge pill color='primary' className='badge-up'>
            {store.cart.length}
          </Badge>
        ) : null}
      </DropdownToggle>
      <DropdownMenu right tag='ul' className='dropdown-menu-media dropdown-cart mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem tag='div' className='d-flex' header>
            <h4 className='notification-title mb-0 mr-auto'>My Cart</h4>
            <Badge color='light-primary' pill>
              {store.cart.length || 0} Items
            </Badge>
          </DropdownItem>
        </li>
        {renderCartItems()}
      </DropdownMenu>
    </Dropdown>
  )
}

export default CartDropdown
