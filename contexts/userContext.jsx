"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()


export function UserProvider({ children }) {
  const [user, setUser] = useState({ username: "user", name: "user"})

  // para mantener el usuario en el localStorage al hacer f5 
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // hook para guardar cada vez que se cambia la variable
/*   useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user]) */


  const login = (username, name) => {
    setUser({ username, name })
    localStorage.setItem('user', JSON.stringify({ username, name })) // solo hace falta 1 vez porque es la sesion
  }

  const logout = () => setUser(null)

  return (
    <UserContext.Provider value={{ user, login }}>
      {children}
    </UserContext.Provider>
  )
}

// 3️⃣ Hook personalizado para usarlo fácilmente
export function useUserContext() {
  return useContext(UserContext)
}