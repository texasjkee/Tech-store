import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedCategory, selectCategories, selectSelectedCategory } from '../store/deviceSlice'
import ListGroup from 'react-bootstrap/ListGroup'

const CategoryBar = () => {
    const categories = useSelector(selectCategories)
    const selectedCategory = useSelector(selectSelectedCategory)
    const dispatch = useDispatch()

    const handleCategoryClick = (category) => {
        dispatch(setSelectedCategory(category))
    }

    return (
        <ListGroup>
            {categories.map((category, index) => (
                <ListGroup.Item
                    key={category.id}
                    style={{ cursor: 'pointer', backgroundColor: category._id === selectedCategory?.id ? '#2125293d' : '#21252980' }}
                    onClick={() => handleCategoryClick(category)}
                >
                    {category.name}
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default CategoryBar

