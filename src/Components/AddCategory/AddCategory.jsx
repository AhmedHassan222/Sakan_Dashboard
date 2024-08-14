import React from 'react'
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
export default function AddCategory() {
    const [name, setName] = useState("")
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [docAvatar, setDocAvatar] = useState("");
    const [docAvatarPreview, setDocAvatarPreview] = useState("");
    const formDataToSend = new FormData();
    // handel images 
    const handleAvatar = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setDocAvatarPreview(reader.result);
            setDocAvatar(file);
        };
        setImage(e.target.files[0]);
    };
    const handleDataChange = (e) => {
        setName(e.target.value);
    };
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/category/create`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data',
                "token": `Ahmed__${localStorage.getItem("user")}`
            },
        }).then((response) => {
            toast.success(response.data.message, {
                position: "top-center"
            });
            
            setIsLoading(false)
        }).catch((error) => {
            toast.error(error.response.data.Error, {
                position: "top-center"
            });
            setIsLoading(false)
        });
    }
    function submitForm(e) {
        e.preventDefault()
        setIsLoading(true)
        formDataToSend.append('image', image);
        formDataToSend.append('name', name);
        sendData();
    }
    return <>
        <section className="py-5 container">
                <h3 className="form-title my-4">Add New Category</h3>
                <form onSubmit={submitForm} action="" encType='multibart/form-data'>
                    <div className="first-wrapper">
                        <div>
                        
                            <input className='form-control my-2' multiple type="file" onChange={handleAvatar} />
                        </div>
                        <div>
                            <input
                                className='form-control my-2'
                                type="text"
                                placeholder="Name"
                                onChange={handleDataChange}
                                value={name}
                                name='name'
                            />
                            <button className='my-4 btn btn-primary' type="submit">{isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : "Add Category"}</button>

                        </div>
                    </div>
                </form>
            </section>
        <ToastContainer />
    </>
}