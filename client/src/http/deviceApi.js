import {$authHost, $host} from "./index"

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    // console.log('Types data:', data);
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/device', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
    const {data} = await $host.get('api/device', {params: {
        typeId, brandId, page, limit,
    }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}

export const fetchDeviceById = async (deviceId) => {
    try {
        const response = await $authHost.get(`api/device/${deviceId}`)
        return response.data
    } catch (error) {
        console.error('Error fetching device by id:', error)
        throw error
    }
}

export const createCategory = async (category) => {
    try {
        const { data } = await $authHost.post('api/category', category)
        return data
    } catch (error) {
        console.error('Error creating category:', error)
        throw error
    }
}

export const fetchCategory = async () => {
    const { data } = await $host.get('api/category')
    return data
}
