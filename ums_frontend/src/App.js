import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Join from './pages/user/Join';
import List from './pages/product/List';
import Add from './pages/product/Add';
import Get from './pages/product/Get';
import Modify from './pages/product/Modify';
import MyInfo from './pages/user/MyInfo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/user/join" element={<Join></Join>}></Route>
        <Route path="/user/myInfo" element={<MyInfo></MyInfo>}></Route>
        <Route path="/product/list" element={<List></List>}></Route>
        <Route path="/product/add" element={<Add></Add>}></Route>
        <Route path="/product/get/:prodnum" element={<Get></Get>}></Route>
        <Route path="/product/modify/:prodnum" element={<Modify></Modify>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
