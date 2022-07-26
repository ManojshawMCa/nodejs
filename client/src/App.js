import React , {useEffect,useState} from 'react';
import axios from "axios";
import './App.css';
import MovieList from './components/MoviesList';
function App() {

  const [movies,setmovies] = useState([]);
  
  const getMoviesList = async () => 
  {
    axios.get('http://localhost:4000/movieList').then((res) => {
      setmovies(res.data);
      console.log(res.data.movies);
    }).catch(err => { console.log(err) })

  };

  useEffect(() => {
		getMoviesList();
	}, []);
 
  
  return (
		<div className='container-fluid movie-app'>
			<div className='row'>
				<MovieList  movies={movies} />
			</div>
		</div>
	);
}

export default App;
