import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Main from './pages/Main'
import Info from './pages/Info'
import Join from './pages/Join'
import BoardList from './pages/BoardList'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Product from './pages/Product'

const App = () => {
    return (
        <BrowserRouter>
            <Header></Header>
            <Routes>
                <Route path="/" element={<Main></Main>}></Route>
                <Route path="/info" element={<Info></Info>}></Route>
                <Route path="/join" element={<Join></Join>}></Route>
                <Route path="/board" element={<BoardList></BoardList>}></Route>
                <Route path="/product/:prodnum" element={<Product></Product>} ></Route>
            </Routes>
            <Footer></Footer>
        </BrowserRouter>
    )
}
export default App;