import { $authHost } from './index'

export const addToBasketApi = async (device_id, quantity) => {
  try {
    const { data } = await $authHost.post('api/basket/add', { device_id, quantity })
    //console.log('User ID:', data.user_id)
    return data
  } catch (error) {
    console.error('Error adding to basket:', error);
    throw error
  }
}

export const getBasketItemsApi = async () => {
  try {
    const { data } = await $authHost.get('api/basket/items')
    console.log('data.basketItems:', data.basketItems)
    return data.basketItems
  } catch (error) {
    console.error('Error fetching basket items:', error)
    throw error
  }
}

export const removeFromBasketApi = async (deviceId) => {
  try {
    const response = await $authHost.delete('api/basket/remove', { data: { device_id: deviceId } })
    return response.data
  } catch (error) {
    console.error('Error removing from basket:', error)
    throw error
  }
}