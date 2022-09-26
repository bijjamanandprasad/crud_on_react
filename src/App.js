import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home/Home';
import AddStudent from './AddStudent/AddStudent';
import PageNotFound from './PageNotFound/PageNotFound';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/students" element={<AddStudent />} />
        <Route exact path="/students/:id" element={<AddStudent />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
