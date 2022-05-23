import axios from 'axios'
import React, {useState,useEffect} from 'react'
const useToken = (user) => {
    const [token, setToken] = useState('');
    const email = {email : user?.user?.email}
    const getToken = async () => {
        const { data } = await axios.put(`https://baseurl.com/${user?.email}`, email);
        localStorage.setItem("accessToke", data.token);
        setToken(accessToken );        
    }
    useEffect(() =>{
        gettToken
    },[user])

    return [token]
}

export default useToken;