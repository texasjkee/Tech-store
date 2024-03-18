import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedBrand, selectBrands, selectSelectedBrand } from '../store/deviceSlice'
import { Card, Row } from 'react-bootstrap'

const BrandBar = () => {
    const brands = useSelector(selectBrands)
    const selectedBrand = useSelector(selectSelectedBrand)
    const dispatch = useDispatch()

    const handleBrandClick = (brand) => {
        dispatch(setSelectedBrand(brand))
    }

    return (
        <Row className="d-flex flex-wrap">
            {brands.map((brand) => (
                <Card
                    style={{cursor: 'pointer', width: '200px', margin: '10px' }}
                    key={brand.id}
                    border={ brand.id === selectedBrand?.id ? '#6c757d' : 'light'}
                    onClick={() => handleBrandClick(brand)}
                >
                    {brand.name}
                </Card>
            ))}
        </Row>
    )
}

export default BrandBar