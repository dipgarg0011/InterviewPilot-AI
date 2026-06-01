import {useContext,useEffect} from 'react';
import {AuthContext} from '../auth.context';
import {login,register,logout, getMe} from '../services/auth.api';

export const useAuth=()=>{
    const context=useContext(AuthContext);
    const {user,setUser, loading,setLoading}=context;

    const handleLogin= async({email,password})=>{
        
        setLoading(true);
        try{
            const data= await login({email,password});
        setUser(data.user);
        }catch(error){
            console.error("Login failed:", error);
        }
        setLoading(false);
    }

    const handleRegister= async({username,email,password})=>{
        setLoading(true);
        try{
            const data= await register({username,email,password});
        setUser(data.user);
        }catch(error){
            console.error("Registration failed:", error);
        }
        
        setLoading(false);
    }

    const handleLogout= async()=>{
        setLoading(true);
        try{
            await logout();
        setUser(null);
        }catch(error){
            console.error("Logout failed:", error);
        }
        setLoading(false);
    }

    const handleGetMe= async()=>{
        setLoading(true);
        const data= await getMe();
        setUser(data.user);
        setLoading(false);
    }

    useEffect(() => {
    const getSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
      setLoading(false);
    };
    
    getSetUser();
  }, []);

    return {user, loading, handleLogin, handleRegister, handleLogout, handleGetMe};
}