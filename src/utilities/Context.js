import React, {useState,createContext} from 'react'

export const UserContext = createContext()
export const Content = createContext()


export const ContentProvider = props =>{
	const [feeds,setFeeds] = React.useState([])
	const [feedsPage,setFeedsPage] = React.useState(0)
	const [notif,setNotif] = useState(null)
	const [profile,setProfile] = useState(null)
	const [userPost,setUserPost] = useState(null)
	const [explore,setExplore] = useState([])
	const [explorePage,setExplorePage] = useState(0)

	return(
		<Content.Provider value={{
			feedsState:[feeds,setFeeds,feedsPage,setFeedsPage],
			notifState:[notif,setNotif],
			profileState:[profile,setProfile],
			userPostState:[userPost,setUserPost],
			exploreState:[explore,setExplore],
			exPageState:[explorePage,setExplorePage]}} >
			{props.children}
		</Content.Provider>
		)
}


export const UserProvider = props =>{
	const currentUser = JSON.parse(localStorage.getItem('socialite-user')) 
	const initiateUser = currentUser ? currentUser : null
	const [user,setUser] = useState(initiateUser)
	const [token,setToken] = useState(JSON.parse(localStorage.getItem('socialite-token')))

	return (
		<UserContext.Provider value={[user,setUser,token,setToken]} >
			{props.children}
		</UserContext.Provider>
		)
}