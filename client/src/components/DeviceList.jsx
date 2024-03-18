import React from 'react'
import { useSelector } from 'react-redux'
import { selectDevices } from '../store/deviceSlice'
import Row from 'react-bootstrap/Row'
import DeviceItem from './DeviceItem'

const DeviceList = () => {
    const device = useSelector(selectDevices).devices
    

    if (!device || device.length === 0) {
        return <p>Loading...</p>
    }

    return (
        <Row className="d-flex flex-wrap">
            {device.map(device => (
                <DeviceItem key={device.id} device={device} />
            ))}
        </Row>
    )
}

export default DeviceList