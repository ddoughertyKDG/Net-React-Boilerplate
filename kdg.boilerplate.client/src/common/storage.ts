
namespace Storage {
    const AuthTokenKey = "AuthTokenKey"
    export const getAuthToken = () => window.localStorage.getItem(AuthTokenKey)
    export const storeAuthToken = (jwt:string) => window.localStorage.setItem(AuthTokenKey,jwt)
    export const clearAuthToken = () => window.localStorage.clear()
}

export default Storage