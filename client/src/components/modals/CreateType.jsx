import React, { useState, useEffect } from 'react'
import { Modal, Form, Button, Dropdown } from 'react-bootstrap'
import { createType, fetchCategory } from '../../http/deviceApi'
import { useDispatch, useSelector } from 'react-redux'
import { setTypes, selectCategories, setCategories } from '../../store/deviceSlice'

const CreateType = ({ show, onHide }) => {
    const [name, setName] = useState('')
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const dispatch = useDispatch()
    const selectedCategories = useSelector(selectCategories)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesData = await fetchCategory()
                // console.log('Received categories from server:', categoriesData)
                dispatch(setCategories(categoriesData))
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }

        fetchData()
    }, [dispatch])

    const handleCreateType = async () => {
        try {
            const newType = await createType({ name, categoryId: selectedCategoryId })
            dispatch(setTypes([...selectedCategories, newType]))
            onHide()
        } catch (error) {
            console.log(error)
        }
    }
    
    // console.log('selectedCategories:', selectedCategories)

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Створити тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTypeName">
                        <Form.Label>Назва типу</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть назву типу"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formCategorySelect">
                        <Form.Label>Оберіть категорію</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle>
                                {selectedCategoryId ? selectedCategories.find(cat => cat.id === selectedCategoryId)?.name : 'Оберіть категорію'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {selectedCategories && selectedCategories.map(category => (
                                    <Dropdown.Item
                                        key={category._id}
                                        onClick={() => {
                                            console.log('Selected category id:', category._id);
                                            setSelectedCategoryId(category._id);
                                        }}
                                    >
                                        {category.name}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleCreateType}>
                    Створити
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateType


