import React, {useState,createContext} from 'react'

export const UserContext = createContext()

export const UserProvider = props =>{
	const currentUser = JSON.parse(localStorage.getItem('socialite-user')) 
	const initiateUser = currentUser ? currentUser : null
	const [user,setUser] = useState(initiateUser)
	const [token,setToken] = useState(JSON.parse(localStorage.getItem('socialite-token')))
	

	return (
		<UserContext.Provider value={[user,setUser,token]} >
			{props.children}
		</UserContext.Provider>
		)
}