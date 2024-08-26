import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import SearchResults from './components/SearchResults'
import MovieDescritpion from './components/MovieDescription'
import ShowDescription from './components/ShowDescription'
import Movies from './components/Movies'
import TVShows from './components/TVShows'
import './App.css'

function First() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/search/:searchTerm' element={<SearchResults />}></Route>
                <Route path='/movie/:movieID' element={<MovieDescritpion />}></Route>
                <Route path='/tv/:showID' element={<ShowDescription />}></Route>
                <Route path='/movieslist' element={<Movies />}></Route>
                <Route path='/tvshows' element={<TVShows />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    )
}

export default First
