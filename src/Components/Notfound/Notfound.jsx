import React from 'react'
import {Link} from "react-router-dom"
export default function Notfound() {
    return (<>
        <div className="vh-100 d-flex justify-content-center align-items-center ">
            <div className='text-center'>
                <h3 className='h1'>404</h3>
                <h3 className='h1'>Page Not Found</h3>
                <Link className='btn btn-primary px-4 my-3' to="/">Home</Link>
                
            </div>
        </div>
    </>
    )
}