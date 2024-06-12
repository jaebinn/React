import {useState} from 'react';
import {Link, Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';

const App = () => {
    const [movies, setMovies] = useState([
        {id:1, title:'Movie 1', genre:'Drama', release_date:'2024-06-12'},
        {id:2, title:'Movie 2', genre:'Action', release_date:'2024-07-12'},
        {id:3, title:'Movie 3', genre:'Horror', release_date:'2024-08-12'}
    ])
    const handleRemove = (id) => {
        const updateMovies = movies.filter(
            (movie) => movie.id != id
        )
        setMovies(updateMovies);
    }

    const [newMovie, setNewMovie] = useState(
        {id:'', title:'', genre:'', release_date:''}
    )
    const handleInputChange = (e)=>{
        const { name,value } = e.target;
        setNewMovie({...newMovie, [name]:value});
    }
    const handleAddMovie = () => {
        if(!newMovie.id || !newMovie.title || !newMovie.genre || !newMovie.release_date){
            alert("모든 입력값을 채워주세요")
            return;
        }
        const isDuplicate = movies.some(movie => movie.id == newMovie.id)
        if(isDuplicate){
            alert("이미 존재하는 ID입니다!")
            setNewMovie({...newMovie, ['id']:''});
            return;
        }
        setMovies([...movies,newMovie]);
        setNewMovie({id:'', title:'', genre:'', release_date:''})
    }

    return (
        <Router>
            <div className='container'>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">List</Link>
                        </li>
                        <li>
                            <Link to="/create">Add New Movie</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/" element={<Home movies={movies} onDelete={handleRemove}></Home>}></Route>
                    <Route path="/create" element={<Create newMovie={newMovie} onInputChange={handleInputChange} onAddMovie={handleAddMovie}></Create>}></Route>
                </Routes>
            </div>
        </Router>
    )
}

const Home = ({movies, onDelete}) => {
    return (
        <div>
            <h1>Movies</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Release Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movies.map( (movie) => (
                                <tr key={movie.id}>
                                    <td>{movie.id}</td>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.release_date}</td>
                                    <td>
                                        <button onClick={()=>{
                                            onDelete(movie.id) 
                                        }}>Delete</button>
                                    </td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}

const Create = ({newMovie,onInputChange,onAddMovie}) => {
    return (
        <div>
            <h1>Create Movie</h1>
            <form>
                <div>
                    <input type="number" name="id" placeholder='Input Movie Id' value={newMovie.id} onChange={onInputChange}/>
                </div>
                <div>
                    <input type="text" name="title" placeholder='Input Movie Title' value={newMovie.title} onChange={onInputChange}/>
                </div>
                <div>
                    <input type="text" name="genre" placeholder='Input Movie Genre' value={newMovie.genre} onChange={onInputChange}/>
                </div>
                <div>
                    <input type="date" name="release_date" value={newMovie.release_date} onChange={onInputChange}/>
                </div>
            </form>
            <button onClick={onAddMovie}>Add Movie</button>
        </div>
    )
}
export default App;