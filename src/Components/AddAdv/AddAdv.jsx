import React, { useEffect } from 'react'
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';
export default function AddAdv() {
    const [categories, setCategories] = useState([])
    async function getCategory() {
        const { data } = await axios.get('https://zunis-node-js.vercel.app/category');
        setCategories(data.categories);
    };
    useEffect(() => {
        getCategory()
        console.log(categories);
    }, [categories])
    return <>
        <section className="py-5 container">

                <div className='d-flex justify-content-center  align-items-center  '>
                    {categories.length > 0 ? categories.map((item, index) => (
                        <div key={index} className='mx-2'><Link to={`/fieldAdv/${item._id}`} ><button className='btn btn-primary px-3' type='submit'>ADD {item.name.toUpperCase()}</button></Link></div>
                    )) : <div className='add-buttons'>"No Categories yet"</div>}

                </div>
            </section>
    </>
}