import axios from "axios";
import Api from "./api";


axios.interceptors.request.use(config=>{
    if(localStorage.getItem('token').length>0){
        config.headers.common["Authorization"]="Beare"+localStorage.getItem("token")
    }
    
    return config;
},error=>{
    console.log(error.message);
    return Promise.reject(error);
})
