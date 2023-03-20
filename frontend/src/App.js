import { Routes, Route } from 'react-router-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout/Layout';
import ToDo from './features/List/ToDo';
import Login from './features/Auth/Registration/Login';
import Logout from './features/Auth/Registration/Logout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<ToDo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
