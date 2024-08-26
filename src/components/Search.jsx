import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNowPlaying } from "../slice";
import { useDispatch, useSelector } from "react-redux";

const img_base_path = 'https://image.tmdb.org/t/p/original/';

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
    const [randomIndex, setRandomIndex] = useState(null);  // Store the random index
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNowPlaying());
    }, [dispatch]);

    const { nowPlaying } = useSelector((state) => state.movieReducer);

    useEffect(() => {
        if (nowPlaying?.results?.length > 0 && randomIndex === null) {
            setRandomIndex(Math.floor(Math.random() * nowPlaying.results.length));  // Set random index on mount
        }
    }, [nowPlaying, randomIndex]);

    function handleSubmit(e) {
        e.preventDefault();
        navigate('/search/' + searchTerm);
    }

    return (
        <div
            style={{
                backgroundImage: nowPlaying?.results?.length > 0 && randomIndex !== null
                    ? `url(${img_base_path + nowPlaying.results[randomIndex].backdrop_path})`
                    : 'none'
            }}
            className="search"
        >
            <div className="flex flex-col items-center justify-center 2xl:h-[85vh] h-[95vh] relative z-10">
                <p className="md:text-8xl text-5xl font-bold">Welcome!</p>
                <p className="my-4 md:text-2xl text-lg font-medium text-center">Millions of movies, TV shows and people to discover. Explore now.</p>
                <form 
                    onSubmit={handleSubmit} 
                    className="flex items-center justify-evenly lg:w-[60%] w-full lg:mx-auto px-5 md:text-xl text-sm mt-5"
                >
                    <input 
                        type="text" 
                        placeholder="Search for a movie or TV Show..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}  
                        className="w-full bg-white py-3 px-8 rounded-l-full outline-none text-black"  
                    />
                    <button className="gradient-bg text-white py-3 px-8 rounded-r-full" type="submit">Search</button>
                </form>
            </div>
        </div>
    );
}

export default Search;
