import axios from 'axios'
import React, {useState,useEffect} from 'react'
const useToken = (user) => {
    const [token, setToken] = useState('');
    console.log(user);
    const email = user?.user?.email || user?.email;
    console.log(email);
    const body = {email : email };
    const getToken = async () => {
      if(email){
        const { data } = await axios.put(`https://manufacturer-server.hrmeheraj.repl.co/users/${user?.email}`, body);
        const accessToken = data?.token
        console.log(data, email);
        localStorage.setItem("accessToken", accessToken);
        setToken(accessToken );        
      }
    }
    useEffect(() =>{
        getToken();
    },[user])

    return [token]
}

export default useToken;