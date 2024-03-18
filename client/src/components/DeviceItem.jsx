import React from 'react'
import { Col, Card } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import {useNavigate} from 'react-router-dom'
import {DEVICE_ROUTE} from '../utils/consts'

const DeviceItem = ({device}) => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(DEVICE_ROUTE + '/' + device._id)
    }

    return (
        <Col md={3} className={'mt-3'}
            onClick={handleClick}
            >
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img[0]} />
                <div className='mt-1 d-flex text-black-50 align-items-center justify-content-between'>
                    <div>{device.brandId.name}</div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    )
}

export default DeviceItem