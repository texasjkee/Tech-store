import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedType, selectTypes, selectSelectedType, selectSelectedCategory } from '../store/deviceSlice'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = () => {
    const types = useSelector(selectTypes)
    const selectedType = useSelector(selectSelectedType)
    const selectedCategory = useSelector(selectSelectedCategory)
    const dispatch = useDispatch()

    const filteredTypes = selectedCategory ? types.filter(type => type.categoryId._id === selectedCategory.id) : types

    const handleTypeClick = (type) => {
        dispatch(setSelectedType(type))
    }

    return (
        <div>
            <ListGroup>
                {filteredTypes.map((type) => (
                    <ListGroup.Item
                        key={type.id}
                        style={{ cursor: 'pointer', backgroundColor: type.id === selectedType?.id ? '#6c757d' : 'inherit' }}
                        onClick={() => handleTypeClick(type)}
                    >
                        {type.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    )
}

export default TypeBar

