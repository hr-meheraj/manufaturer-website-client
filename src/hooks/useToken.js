import axios from 'axios'
import React, {useState,useEffect} from 'react'
const useToken = (user) => {
    const [token, setToken] = useState('');
    console.log(user);
    const email = {email : user?.user?.email}
    const getToken = async () => {
        const { data } = await axios.put(`https://manufacturer-server.hrmeheraj.repl.co/${user?.email}`, email);
        const accessToken = data?.token
        localStorage.setItem("accessToke", accessToken);
        setToken(accessToken );        
    }
    useEffect(() =>{
        getToken();
    },[user])

    return [token]
}

export default useToken;