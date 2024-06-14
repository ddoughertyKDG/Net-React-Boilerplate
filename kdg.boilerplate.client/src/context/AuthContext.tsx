import { createContext, useContext, useState } from "react"
import { TUserAuth } from "../types/common/auth"
import Storage from "../common/storage"

type TAuthContext = {
  user:TUserAuth|null
  login:(_:TUserAuth)=>void
  logout:()=>void
}

const AuthContext = createContext<TAuthContext|undefined>(undefined)

type TProviderProps = {
  children:React.ReactNode
}
export const AuthContextProvider = ({children}:TProviderProps) => {
  const [user,setUser] = useState<TUserAuth|null>(null)

  const login = (auth:TUserAuth) => {
    Storage.storeAuthToken(auth.jwt)
    setUser(auth)
  }

  const logout = () => {
    Storage.clearAuthToken()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error("useAuthContext called outside context provider")

  return authContext
}
