import { useEffect, useState } from "react"
import privateAxios from '../api/privateAxios'
const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true);
    useEffect( () =>{
        const email = user?.email || user?.user?.email;
        console.log("Use Admin inside ", email);
        if(email){
            setAdminLoading(true);
           (async() =>{
            const { data } = await privateAxios.get(`https://tools-manufacture.herokuapp.com/users/admin/${email}`)
            setAdmin(data.admin);
            console.log("Use Amin insdie fucntion", data?.admin);
            setAdminLoading(false);
           })()
        }
    }, [user])

    return [admin, adminLoading]
}

export default useAdmin;