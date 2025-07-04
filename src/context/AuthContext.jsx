import { createContext, useContext, useEffect,useState } from "react";
import { AppRoutes } from "../constants/AppRoutes";
import axios from 'axios'
const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true); // added loading state
    useEffect(() => {
        
        console.log(user);
        const token = localStorage.getItem('token')
        console.log(token);
        if (token && !user) {
            getUserInfo(token)
        }
        
    }, [])
    const getUserInfo = async (token) => {
        try {
            const response = await axios.get(AppRoutes.userInfo, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            setUser(response?.data?.data?.email)
            
        } catch (error) {
            console.log(error);
            
            const status = error.response?.status
            const apiErrors = error.response?.data?.errors || {};
            if (status === 401 || status === 403) {
                localStorage.removeItem('token')
                setUser(null)
            }
        }
        finally {
            setLoading(false)
        }
    }
    return <AuthContext.Provider value={{user,setUser}}>
        {children}
    </AuthContext.Provider>
}

 const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within a AuthProvider');
    }
    return context;
}

export {AuthContextProvider,useAuth}