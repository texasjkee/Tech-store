import React, { useState } from 'react'
import { Button, Container } from 'react-bootstrap'
import CreateDevice from '../components/modals/CreateDevice'
import CreateType from '../components/modals/CreateType'
import CreateBrand from '../components/modals/CreateBrand'
import CreateCategory from '../components/modals/createCategory'

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false)
    const [typeVisible, setTypeVisible] = useState(false)
    const [deviceVisible, setDeviceVisible] = useState(false)
    const [categoryVisible, setCategoryVisible] = useState(false)

    return (
        <Container className='d-flex flex-column'>
            <Button
                variant={'outline-dark'}
                className='mt-3 p-2'
                onClick={() => setCategoryVisible(true)}
            >
                Добавити категорію
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-3 p-2'
                onClick={() => setTypeVisible(true)}
            >
                Добавити тип
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-3 p-2'
                onClick={() => setBrandVisible(true)}
            >
                Добавити бренд
            </Button>
            <Button
                variant={'outline-dark'}
                className='mt-3 p-2'
                onClick={() => setDeviceVisible(true)}
            >
                Добавити пристрій
            </Button>
            <CreateCategory show={categoryVisible} onHide={() => setCategoryVisible(false)} />
            <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
            <CreateDevice show={deviceVisible} onHide={() => setDeviceVisible(false)} />
            <CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
        </Container>
    )
}

export default Admin