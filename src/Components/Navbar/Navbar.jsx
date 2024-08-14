import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsHouseAddFill } from "react-icons/bs";
import { authContext } from '../../Context/AuthContext';
import { RiUserAddFill } from "react-icons/ri";
import { BiSolidMessageRoundedAdd } from "react-icons/bi";
import { IoMdAnalytics } from "react-icons/io";
import { TbCategoryPlus } from "react-icons/tb";
import { FaUserAlt } from 'react-icons/fa';
import logo from "../../images/logo.png"
export default function Navbar() {
    let { userData, setData } = useContext(authContext)
    let navigate = useNavigate();
    function logOut() {
        localStorage.removeItem('user')
        setData(null)
        navigate('login')
    }
    return <>
        <nav className="py-0 my-0  d-flex justify-content-between container-fluid align-items-center">
                <Link className="navbar-brand" to="/home">
                    <img src={logo} alt="" />
                </Link>
                {userData ? <div className='d-flex'>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/">
                        <TiHome />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/AddUser">
                        <RiUserAddFill />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/AddCategory">
                        <TbCategoryPlus />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/AddAdv">
                        <BsHouseAddFill />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/AddAdmin">
                        <IoPersonAddSharp />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/message">
                        <AiFillMessage />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/addMessage">
                        <BiSolidMessageRoundedAdd />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/analyze">
                        <IoMdAnalytics />
                    </Link>
                    <Link className="nav-link  fs-5 mx-2" aria-current="page" to="/login">
                        <RiLogoutBoxFill onClick={logOut} />
                    </Link>
                </div> : <>
                    <div className="nav-link  fs-5 mx-2" aria-current="page" >
                        <FaUserAlt />
                    </div>
                </>
                }
        </nav >
    </>
}
