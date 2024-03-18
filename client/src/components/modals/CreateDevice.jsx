import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { Dropdown } from 'react-bootstrap'
import { fetchBrands, fetchDevices, fetchTypes, createDevice, fetchDeviceById } from '../../http/deviceApi'
import { selectTypes, selectBrands, setSelectedType, setSelectedBrand, setTypes, setBrands, setDevices } from '../../store/deviceSlice'

const CreateDevice = ({ show, onHide }) => {
    const dispatch = useDispatch()
    const device = useSelector((state) => state.device)

    const types = useSelector(selectTypes)
    const brands = useSelector(selectBrands)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [files, setFiles] = useState([])
    const [info, setInfo] = useState([])

    const fetchData = async () => {
        try {
            const types = await fetchTypes()
            const brands = await fetchBrands()
            const devices = await fetchDevices()

            dispatch(setTypes(types))
            dispatch(setBrands(brands))
            dispatch(setDevices(devices))
        } catch (error) {
            console.error('Error fetching data:', error)
        }}

    useEffect(() => {
        fetchData()
    }, [dispatch])

    const addInfo = () => {
        setInfo([...info, { title: '', description: '', number: Date.now() }])
    }
    const removeInfo = (number) => {
        const updatedInfo = info.filter(i => i.number !== number)
        setInfo(updatedInfo)
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? { ...i, [key]: value } : i))
    }

    const selectFiles = (e) => {
        setFiles([...files, ...Array.from(e.target.files)])
    }

    const addDevice = async () => {
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('price', `${price}`)
            files.forEach(file => formData.append('img', file))
            formData.append('brandId', device.selectedBrand?.id)
            formData.append('typeId', device.selectedType?.id)
            formData.append('info', JSON.stringify(info))

            const data = await createDevice(formData)
            dispatch(setDevices(data))

            const newDevice = await fetchDeviceById(data._id)
            console.log('New Device:', newDevice)

            onHide()
        } catch (error) {
            console.error('Error adding device:', error)
        }}

    return (
        <Modal
            size="lg"
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Добавити пристрій
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className='mt-3 mb-2'>
                        <Dropdown.Toggle>{device.selectedType.name || 'Виберіть тип'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {types.map(type =>
                                <Dropdown.Item
                                    onClick={() => dispatch(setSelectedType(type))}
                                    key={type.id}>
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                        <Dropdown.Toggle>{device.selectedBrand.name || 'Виберіть бренд'}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {brands.map(brand =>
                                <Dropdown.Item
                                    onClick={() => dispatch(setSelectedBrand(brand))}
                                    key={brand.id}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className='mt-3'
                        placeholder='Введіть назву пристрою...'
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className='mt-3'
                        placeholder='Введіть ціну пристрою...'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFiles}
                        multiple // Дозволяє вибирати декілька файлів
                    />
                    <hr />
                    <Button
                        variant={'outline-dark'}
                        onClick={addInfo}
                    >
                        Добавити нову властивість
                    </Button>
                    {info.map(i =>
                        <Row className='mt-3' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder='Введіть назву характеристики'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder='Введіть описання характеристики'
                                />
                            </Col>
                            <Col md={4}>
                                <Button
                                    variant='outline-danger'
                                    onClick={() => removeInfo(i.number)}
                                >
                                    Видалити
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрити</Button>
                <Button variant='outline-success' onClick={addDevice}>Добавити</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateDevice
