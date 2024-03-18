import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import TypeBar from '../components/TypeBar'
import BrandBar from '../components/BrandBar'
import DeviceList from '../components/DeviceList'
import Pages from '../components/Pages'
import CategoryBar from '../components/CategoryBar'
import { fetchBrands, fetchDevices, fetchTypes, fetchCategory } from '../http/deviceApi'
import { setTypes, setBrands, setDevices, setTotalCount, setCategories, setSelectedBrand } from '../store/deviceSlice'

const Shop = () => {
    const dispatch = useDispatch()
    const device = useSelector((state) => state.device)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const types = await fetchTypes()
                dispatch(setTypes(types))

                const brands = await fetchBrands()
                dispatch(setBrands(brands))

                const categories = await fetchCategory()
                dispatch(setCategories(categories))

                // Оновлення обраного бренду при зміні категорії
                dispatch(setSelectedBrand({})) // Скидаємо обраний бренд
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData()
    }, [dispatch, device.selectedType])

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (device.selectedBrand) {
                    const newDevices = await fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 3)
                    dispatch(setDevices(newDevices))
                    dispatch(setTotalCount(newDevices.totalDevicesCount))
                } else if (device.selectedType) {
                    const newDevices = await fetchDevices(device.selectedType.id, null, device.page, 3)
                    dispatch(setDevices(newDevices))
                    dispatch(setTotalCount(newDevices.totalDevicesCount))
                }
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        if (device.selectedBrand || (device.selectedType && device.selectedBrand)) {
            fetchData()
        }
    }, [dispatch, device.page, device.selectedType, device.selectedBrand])

    return (
        <Container>
            <Row className='mt-2'>
                <Col md={3}>
                    <CategoryBar />
                    <TypeBar />
                </Col>
                <Col md={9}>
                    <BrandBar />
                    <DeviceList />
                    <Pages />
                </Col>
            </Row>
        </Container>
    );
};

export default Shop

