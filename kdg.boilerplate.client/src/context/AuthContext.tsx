import { createContext, useContext, useState } from "react"
import { TUserAuth } from "../types/common/auth"
import Storage from "../common/storage"

// MSAL imports
import { AuthInstance } from "../common/auth-instance";
import { AuthenticationResult } from "@azure/msal-browser";
import { b2cPolicies } from "../authConfig";
import { MsalProvider } from "@azure/msal-react";

type TAuthContext = {
  user:TUserAuth|null
  login:(_:TUserAuth)=>void
  logout:()=>void
  editProfile:()=>void
}

const AuthContext = createContext<TAuthContext|undefined>(undefined)

type TProviderProps = {
  children:React.ReactNode
}
export const AuthContextProvider = ({children}:TProviderProps) => {
  const [user,setUser] = useState<TUserAuth|null>(null)

  const login = (auth:TUserAuth) => {
    AuthInstance.instance.msalInstance.loginPopup().then((result:AuthenticationResult) => {
      if (result.account) {
        auth.jwt = result.accessToken
        Storage.storeAuthToken(auth.jwt)
        setUser(auth)
      }
    });
  }

  const logout = () => {
    AuthInstance.instance.msalInstance.logoutPopup().then(() => {
      Storage.clearAuthToken();
      setUser(null);
    });
  }

  const editProfile = () => {
      AuthInstance.instance.msalInstance.acquireTokenPopup(
        b2cPolicies.authorities.editProfile).then(() => {});
  }

  return (
    <MsalProvider instance={AuthInstance.instance.msalInstance}>
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          editProfile
        }}
      >
        {children}
      </AuthContext.Provider>
    </MsalProvider>
  )
}

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  if (!authContext) throw new Error("useAuthContext called outside context provider")

  return authContext
}
