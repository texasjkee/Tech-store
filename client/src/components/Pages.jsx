import React from 'react'
import { Pagination } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../store/deviceSlice'

const Pages = () => {
    const dispatch = useDispatch()
    const device = useSelector((state) => state.device)

    const pageCount = Math.ceil(device.totalCount / device.limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className='mt-3'>
            {pages.map((page) => (
                <Pagination.Item
                    key={page}
                    active={device.page === page}
                    onClick={() => { 
                        dispatch(setPage(page));
                        console.log('Clicked on page:', page)
                    }}
                >
                    {page}
                </Pagination.Item>
            ))}
        </Pagination>
    )
}

export default Pages


