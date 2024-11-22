import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchMovies } from "../slice";
import MovieDisplay from "./MovieDisplay";
import StarIcon from "@mui/icons-material/Star";

const img_base_path = 'https://image.tmdb.org/t/p/original/';

function SearchResults() {
    function formatDate(dateString) {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const date = new Date(dateString);
        
        return date.toLocaleDateString('en-US', options);
    }

    function ratingColor(rating) {
        if(rating >= 7.0) {
            return '#008000';
        }
        else if(rating >= 5.0 && rating < 7.0) {
            return '#FFA500';
        }
        else {
            return '#FF0000';
        }
    }

    const {searchTerm} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(searchMovies(searchTerm));
    }, [dispatch, searchTerm]);

    const {searchResults} = useSelector((state) => {
        return state.movieReducer;
    });

    // console.log(searchResults);

    return (
        <div className="w-5/6 mx-auto mt-20 mb-10">
            <p className="text-2xl mb-5">Search results for '{searchTerm}'</p>
            {
                searchResults ? 
                <div className="flex flex-wrap gap-5">
                    {
                        searchResults.map((movie, index) => {
                            return (
                                <MovieDisplay key={index} movie={movie} />
                                // <div key={index} className="movie">
                                //     <img 
                                //         className="w-full rounded-lg"
                                //         src={movie.poster_path ? img_base_path + movie.poster_path : '/no-poster-4xa9LmsT.png'} 
                                //         alt={movie.title || movie.original_title || movie.name || movie.original_name} 
                                //     />
                                //     <div className='flex mt-5 items-start justify-between'>
                                //         <p className='text-xl'>{movie.title || movie.original_title || movie.name || movie.original_name}</p>
                                //         <p 
                                //             className='text-sm rounded-md py-1 px-2 flex items-center gap-1'
                                //             style={{
                                //                 backgroundColor: ratingColor(movie.vote_average.toFixed(1))
                                //             }}
                                //         >
                                //                 <StarIcon sx={{fontSize: '1rem'}}></StarIcon>
                                //                 {movie.vote_average.toFixed(1)}
                                //         </p>
                                //     </div>
                                //     {/* <p>{movie.vote_average.toFixed(1)}</p>
                                //     <p>{movie.title || movie.original_title || movie.name || movie.original_name}</p> */}
                                //     <p className='text-sm text-[#757E8B]'>{formatDate(movie.release_date || movie.first_air_date)}</p>
                                // </div>
                            )
                        })
                    }
                </div> : ""
            }
        </div>
    )
}

export default SearchResults;
