import { createContext, useState, useContext } from "react";

const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user-data')) || '');
    const [isAuthenticated, setIsAuthenticated] = useState(token ? true : false);

    const setData = (data) => {
        setUserData(data)
        localStorage.setItem('user-data', JSON.stringify(data))
        setIsAuthenticated(true)
        setIsAuthenticated(true)
    }
    const setTokenValue = (token) => {
        setToken(token)
        localStorage.setItem('token', token)
    }

    const Logout = () => {
        console.log("signOut done")
        localStorage.clear('token')
        localStorage.clear('user-data')
        setIsAuthenticated(false)

    }
    return (

        <AuthContext.Provider
            value={{
                userData,
                setData,
                isAuthenticated,
                setToken,
                Logout,
                setTokenValue
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
