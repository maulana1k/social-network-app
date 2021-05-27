
import Main from './utilities/Main.js'
import {ChakraProvider} from '@chakra-ui/react'
import {UserProvider} from './utilities/UserContext.js'
import './App.css';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'


function App() {
  return (
  	<UserProvider>
	    <ChakraProvider>
	      <div className="App">
	        <Main/>
	      </div>
	    </ChakraProvider> 
  	</UserProvider>
  );
}

export default App;
