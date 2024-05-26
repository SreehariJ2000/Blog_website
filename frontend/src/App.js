
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import Create from './components/Create';
import Edit from './components/Edit';
import Delete from './components/Delete';
import NewReg from './components/NewReg';
import FetchAndDisplayCards from './components/FetchAndDisplayCards';
import ImageUploadForm from './components/ImageUploadForm';
import Register from './components/Register';
import Login from './components/Login';


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
           <Route path="/cardview" element={<FetchAndDisplayCards/>}/>
           <Route path="/imageupload" element={<ImageUploadForm/>}/>
           <Route path="/register" element={<Register/>}/>
           <Route path="/login" element={<Login/>}/>
           
         
         </Routes>
       }
       />
    </div>
  );
}

export default App;
