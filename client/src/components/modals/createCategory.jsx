import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { createCategory } from '../../http/deviceApi'
import { useDispatch } from 'react-redux'

const CreateCategory = ({ show, onHide }) => {
    const [name, setName] = useState('')
    const [categories, setCategories] = useState([])

    const handleCreateCategory = async () => {
        try {
            const newCategory = await createCategory({ name })
            setCategories([...categories, newCategory])
            onHide()
        } catch (error) {
            console.error('Error creating category:', error)
        }
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Створити категорію</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formCategoryName">
                        <Form.Label>Назва категорії</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Введіть назву категорії"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрити
                </Button>
                <Button variant="primary" onClick={handleCreateCategory}>
                    Створити
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateCategory
