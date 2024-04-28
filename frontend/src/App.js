
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Edit from './components/Edit';
import Delete from './components/Delete';
import NewReg from './components/NewReg';


function App() {
  const myWidth = 220
  return (
    <div className="App">
      <Navbar 
       drawerWidth={myWidth}
       content = {
         <Routes>
           <Route path="" element={<Home/>}/>
           <Route path="/about" element={<About/>}/>
           <Route path="/create" element={<Create/>}/>
           <Route path="/edit/:id" element={<Edit/>}/>
           <Route path="/delete/:id" element={<Delete/>}/>
           <Route path="/newreg" element={<NewReg/>}/>
           
         
         </Routes>
       }
       />
    </div>
  );
}

export default App;
