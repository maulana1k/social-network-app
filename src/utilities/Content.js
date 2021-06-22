import React from 'react'

export const Content = React.createContext()

export const ContentProvider = props =>{
	const [feeds,setFeeds] = React.useState([])
	const [feedsPage,setFeedsPage] = React.useState(0)

	return(
		<Content.Provider value={[feeds,setFeeds,feedsPage,setFeedsPage]} >
			{props.children}
		</Content.Provider>
		)
}