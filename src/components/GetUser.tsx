import axios from 'axios'
import React, { useState } from 'react'
import { IResponseUser } from '../data/user/userModel';
import Api from '../utils/api'




const GetUser = () => {
    const [user,setUser] = useState<IResponseUser>();
    const  getAllOrders=async ()=>{
       axios.get(Api.baseUrl+"account/user").then((response)=>{
            console.log(response)
            setUser(response.data)
       },error =>{
           console.log(error.message)
       }) 
    }
    return (
        <div>
            <button onClick={getAllOrders}>
                Get All Orders
            </button>
            {user&&(
                <ul>
                    <li>{user.id}</li>
                    <li>{user.username}</li>
                </ul> 
            )}
            
        </div>
    )
}

export default GetUser
