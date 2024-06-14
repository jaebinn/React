import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Join from './pages/user/Join';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/user/join" element={<Join></Join>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
