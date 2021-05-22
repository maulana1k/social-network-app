
import Main from './utilities/Main.js'
import {ChakraProvider} from '@chakra-ui/react'
import './App.css';
import 'tailwindcss/tailwind.css'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Main/>
      </div>
    </ChakraProvider> 
  );
}

export default App;
