import React, {useState} from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import {createBrand} from '../../http/deviceApi'

const CreateBrand = ({ show, onHide }) => {
    const [value, setValue] = useState('')

    const addBrand = async () => {
        try {
            const result = await createBrand({ name: value })
            setValue()
            onHide()
        } catch (error) {
            console.error('Error adding type:', error)
        }
    }

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити бренд
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        placeholder={'Введіть назву бренду...'}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
                <Button variant='outline-success' onClick={addBrand}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateBrand