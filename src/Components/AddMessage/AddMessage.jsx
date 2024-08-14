import React from 'react'
import { useState } from "react"
import axios from 'axios'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import Joi from "joi"
export default function AddMessage() {
    let [errorList, setErrorList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState(
        {
            sentTo: "",
            body: "",
        }
    )
    // get data
    function getMessage(e) {
        let _user = { ...user }
        _user[e.target.name] = e.target.value;
        setUser(_user)
    }
    function validateRegister() {
        let schema = Joi.object({
            sentTo: Joi.string().required().min(24).max(24),
            body: Joi
                .string()
                .required(),
        })
        return (schema.validate(user, { abortEarly: false }))
    }
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/message/messageToUser`, user,
            {
                "Content-Type": "application/json",
            },
        ).then((response) => {
            setIsLoading(false)
            toast.success(response.data?.message, {
                position: "top-center"
            });
            setUser({
                sentTo: "",
                body: "",
            })
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
        let validation = validateRegister()
        if (validation.error) {
            setIsLoading(false)
            setErrorList(validation.error.details)
            errorList.map((item) => {
                return toast.error(item.message, {
                    position: "top-center"
                });
            })
        } else {
            sendData()
        }
    }
    return <>
        <section className="py-5 container">
            <h3 className="my-4">Send Message To User</h3>
            <form onSubmit={submitForm} action="">
                <div className="first-wrapper">
                    <div>
                        <input
                            type="text"
                            placeholder="Send To"
                            onChange={getMessage}
                            name='sentTo'
                            value={user.sentTo}
                            className='form-control my-2'
                        />
                        <textarea rows={8}
                            placeholder="Message"
                            onChange={getMessage}
                            id="body"
                            type="text"
                            className="form-control my-2 "
                            name='body'
                            value={user.body}
                        />
                        <button className='my-4 btn btn-primary' type="submit">{isLoading ? <div className="spinner-border " role="status">
                            <span className="visually-hidden  ">Loading...</span>
                        </div> : "Send Message"}</button>
                    </div>
                </div>
            </form>
        </section>
        <ToastContainer />
    </>
}