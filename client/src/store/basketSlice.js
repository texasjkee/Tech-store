import { createSlice } from '@reduxjs/toolkit'

export const getItemCountLS = () => {
  const itemCount = localStorage.getItem('itemCount')
  return itemCount ? JSON.parse(itemCount) : 0
}

const initialState = {
  basketItems: [],
  totalPrice: 0,
  basketItemCount: getItemCountLS()
}

// Function to save the number of goods in the local storage
export const saveItemCountLS = itemCount => {
  localStorage.setItem('itemCount', JSON.stringify(itemCount))
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      const newItem = action.payload
      state.basketItems.push(newItem)
      state.totalPrice += newItem.price
      state.basketItemCount += 1
      saveItemCountLS(state.basketItemCount) // Store the updated number of items in the cart in local storage
    },
    removeFromBasket: (state, action) => {
      const itemIdToRemove = action.payload
      const indexToRemove = state.basketItems.findIndex(item => item.device_id === itemIdToRemove)

      if (indexToRemove !== -1) {
        const itemToRemove = state.basketItems[indexToRemove]
        state.basketItems.splice(indexToRemove, 1)
        state.totalPrice -= itemToRemove.price
        state.basketItemCount -= 1
        saveItemCountLS(state.basketItemCount)
      }
    },
    clearBasket: state => {
      state.basketItems = []
      state.totalPrice = 0
      state.basketItemCount = 0
      saveItemCountLS(state.basketItemCount) // Remove the number of products in the cart from local storage when emptying the cart
    },
    updateBasketItemCount: (state, action) => {
      state.basketItemCount = action.payload
      saveItemCountLS(state.basketItemCount)
    }
  }
})

export const { addToBasket, removeFromBasket, clearBasket, updateBasketItemCount } =
  basketSlice.actions

export const selectBasketItems = state => state.basket.basketItems
export const selectTotalPrice = state => state.basket.totalPrice
export const selectItemCount = state => state.basket.basketItemCount

export default basketSlice.reducer
