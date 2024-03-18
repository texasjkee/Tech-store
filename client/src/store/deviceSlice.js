import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    types: [],
    brands: [],
    devices: [],
    categories: [],
    selectedType: {},
    selectedBrand: {},
    selectedDevice: {},
    selectedCategory: {},
    page: 1,
    totalCount: 0,
    limit: 3,
    loadedDevices: false,
};

export const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setTypes: (state, action) => {
            state.types = action.payload
        },
        setBrands: (state, action) => {
            state.brands = action.payload
        },
        setDevices: (state, action) => {
            state.devices = action.payload
        },
        setSelectedType: (state, action) => {
            state.page = 1
            state.selectedType = { id: action.payload._id, name: action.payload.name }
        },
        setSelectedBrand: (state, action) => {
            state.page = 1
            state.selectedBrand = { id: action.payload._id, name: action.payload.name }
        },
        setSelectedCategory: (state, action) => {
            state.page = 1
            state.selectedCategory = { id: action.payload._id, name: action.payload.name }
        },
        setSelectedDevice: (state, action) => {
            state.page = 1
            state.selectedDevice = action.payload
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload
        },
        setLimit: (state, action) => {
            state.limit = action.payload
        },
        setCategories: (state, action) => {
            state.categories = action.payload
            // console.log('Categories updated:', action.payload)
        },
        setLoadedDevices: (state, action) => {
            state.loadedDevices = action.payload
        },
    },
});

export const {
    setTypes,
    setBrands,
    setDevices,
    setSelectedType,
    setSelectedBrand,
    setSelectedDevice,
    setPage,
    setTotalCount ,
    setLimit,
    setSelectedCategory,
    setCategories,
    setLoadedDevices,
} = deviceSlice.actions

export const selectTypes = (state) => state.device.types
export const selectBrands = (state) => state.device.brands
export const selectDevices = (state) => state.device.devices
export const selectSelectedType = (state) => state.device.selectedType
export const selectSelectedBrand = (state) => state.device.selectedBrand
export const selectSelectedDevice = (state) => state.device.selectedDevice
export const selectPage = (state) => state.device.page
export const selectTotalCount = (state) => state.device.totalCount
export const selectLimit = (state) => state.device.limit
export const selectCategories = (state) => {
    const categories = state.device.categories
    // console.log('Selected categories:', categories)
    return categories
}
export const selectSelectedCategory = (state) => state.device.selectedCategory

export default deviceSlice.reducer