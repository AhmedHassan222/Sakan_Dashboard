import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Joi from "joi"
import axios from "axios"
import logo from "../../images/logo.png"
export default function Login() {
    let navigate = useNavigate()
    const [user, setUser] = useState({
        email: "",
        password: "",
        role: "Admin"
    })
    const [error, setError] = useState('')
    const [errorList, setErrorList] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    // get user Login Info
    function getUserInfoLogin(e) {
        let _user = { ...user }
        _user[e.target.name] = e.target.value;
        setUser(_user)
    }
    // validation
    function LoginValidator() {
        let schema = Joi.object({
            email: Joi.string().email({ tlds: { allow: ["com", "net"] } }).required(),
            password: Joi.string().required(),
            role: Joi.string().required(),
        })
        return schema.validate(user, { abortEarly: false })
    }
    async function sendData() {
        await axios.post(`https://zunis-node-js.vercel.app/auth/signin`, user).then((response) => {
            localStorage.setItem('user', response.data.token);
            navigate("/home");
            setIsLoading(false);
        }).catch((error) => {
            setError(error.response.data.Error)
            setIsLoading(false);
        })
    }
    function submitLogin(e) {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        setErrorList("")
        let validation = LoginValidator()
        if (validation.error) {
            setIsLoading(false)
            setError("")
            setErrorList(validation.error.details)
        } else {
            sendData()
        }
    }
    return <>
        <section className='vh-100 w-100 d-flex justify-content-center align-items-center text-center '>
            <div assName="container  ">
                <div className="p-5 bg-light">
                    <div className="d-flex align-items-center">
                        <img src={logo} alt="logo" className="logo" />
                        <h3 className="form-title h5  fw-bold pt-2">| Dashboard</h3>
                    </div>
                    <p>Only Admins Are Allowed To Access These Resources!</p>
                    <form onSubmit={submitLogin}>
                        <input
                            onChange={getUserInfoLogin}
                            type="text"
                            placeholder="Email"
                            name="email"
                            className='form-control mb-2 mt-4' />
                        <input
                            onChange={getUserInfoLogin}
                            type="password"
                            placeholder="Password"
                            name='password'
                            className='form-control my-2' />
                        {false ? <input onChange={getUserInfoLogin} name="role" value={"Admin"} type="text" />
                            : ""}
                        {error ? <p className="text-danger">{error}</p> : ""}
                        {errorList.length > 0 ? <ul>
                            {errorList.map((item, index) => <li className="text-danger" key={index}>{item.message}</li>)}
                        </ul> : ""}
                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <button className='btn btn-primary w-100  my-4' type="submit">{isLoading ? <div className="spinner-border " role="status">
                                <span className="visually-hidden  ">Loading...</span>
                            </div> : "Login"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>
}