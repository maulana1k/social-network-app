
import Main from './utilities/Main.js'
import {UserProvider} from './utilities/Context.js'
import './App.css';
import 'antd/dist/antd.css'
import 'tailwindcss/tailwind.css'


function App() {
  return (
  	<UserProvider>
	   
	      <div className="App">
	        <Main/>
	      </div>
	 
  	</UserProvider>
  );
}

export default App;
