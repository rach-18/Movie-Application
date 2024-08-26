import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import '../App.css';

const img_base_path = 'https://image.tmdb.org/t/p/original/';

function formatDate(dateString) {
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const date = new Date(dateString);
    
    return date.toLocaleDateString('en-US', options);
}

function MovieDisplay({movie, category}) {
    const navigate = useNavigate();

    function handleClick() {
        const isMovie = movie.title || movie.original_title; // Check if it's a movie
        const path = isMovie ? '/movie/' : '/tv/';
        navigate(path + movie.id);
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

    // console.log("Movie:", movie);

    return (
        <div className={`${category === 'scroll' ? 'movie' : 'infinite'} cursor-pointer relative`} onClick={handleClick}>
            {
                movie.poster_path ? 
                    <img 
                        className="w-full rounded-lg movie-poster"
                        src={img_base_path + movie.poster_path} 
                        alt={movie.title || movie.original_title || movie.name || movie.original_name} 
                    /> :
                    <img src="/no-poster-4xa9LmsT.png" className='w-full rounded-lg' alt="" />
            }
            <div className='flex mt-5 items-start justify-between'>
                <p className='sm:text-xl text-base'>{movie.title || movie.original_title || movie.name || movie.original_name}</p>
                <p 
                    className='sm:text-sm text-xs rounded-md py-1 sm:px-2 px-1 flex items-center gap-1'
                    style={{
                        backgroundColor: ratingColor(movie.vote_average.toFixed(1))
                    }}
                >
                        <StarIcon sx={{fontSize: '1rem'}}></StarIcon>
                        {movie.vote_average.toFixed(1)}
                </p>
            </div>
            <p className='text-sm text-[#757E8B]'>{formatDate(movie.release_date || movie.first_air_date)}</p>
        </div> 
    )
}

export default MovieDisplay;
