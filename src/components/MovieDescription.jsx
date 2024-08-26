import { useParams } from "react-router-dom";
import { description, cast, fetchMovieVideos, fetchSimilarMovies, fetchRecommendedMovies } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import MovieDisplay from "./MovieDisplay";
import Stack from '@mui/joy/Stack';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

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

function MovieDescritpion() {
    const {movieID} = useParams();
    const dispatch = useDispatch();
    const [selectedVideo, setSelectedVideo] = useState(null);

    useEffect(() => {
        dispatch(description(movieID));
        dispatch(cast(movieID));
        dispatch(fetchMovieVideos(movieID));
        dispatch(fetchSimilarMovies(movieID));
        dispatch(fetchRecommendedMovies(movieID));
    }, [dispatch, movieID]);

    const {singleDescription, castArray, movieVideos, similarMovies, recommendedMovies} = useSelector((state) => {
        return state.movieReducer;
    });

    // console.log("Recommended Movies:", recommendedMovies);
    // console.log("Similar Movies:", similarMovies);
    // console.log("Single Description:", singleDescription);
    // console.log("Cast Array: ", castArray);
    // console.log("Movie Videos: ", movieVideos);
    // console.log("Keys: ", Object.keys(castArray));

    function ratingColor(rating) {
        if(rating >= 7.0) {
            return 'success';
        }
        else if(rating >= 5.0 && rating < 7.0) {
            return 'warning';
        }
        else {
            return 'danger';
        }
    }

    function directorName() {
        if (!castArray.crew) return ''; // Check if crew is undefined
    
        let director = new Set();
    
        castArray.crew.forEach((crew) => {
            if (crew.department.toLowerCase() === 'directing') {
                director.add(crew.name);
            }
        });
    
        return [...director].length === 0 ? 'NA' : [...director].join(', ');
    }
    
    function writerName() {
        if (!castArray.crew) return ''; // Check if crew is undefined
    
        let writer = new Set();
    
        castArray.crew.forEach((crew) => {
            if (crew.department.toLowerCase() === 'writing') {
                writer.add(crew.name);
            }
        });
    
        return [...writer].length === 0 ? 'NA' : [...writer].join(', ');
    }

    function openModal(video) {
        if(video) {
            setSelectedVideo(video);
        }
        else {
            setSelectedVideo({message: 'No trailer available'});
        }
    }

    function closeModal() {
        setSelectedVideo(null);
    }

    function handleWatchTrailerClick() {
        // console.log("Trailer clicked", movieVideos);
        if (movieVideos && movieVideos.results && movieVideos.results.length > 0) {
            openModal(movieVideos.results[0]);
        } else {
            // console.log("No trailer available");
            openModal(null);
        }
    }

    return (
        Object.keys(singleDescription).length === 0 ? <p>Loading...</p> :
        <div className="mb-10">
            <div 
                className="description relative"
                style={{
                    backgroundImage: singleDescription
                    ? `url(${img_base_path + singleDescription.backdrop_path})`
                    : 'none'
                }}
            >
                {/* <div className="layer w-full h-full absolute"></div> */}
                <div className="relative z-10 flex md:flex-row flex-col gap-10 xl:w-5/6 w-[95%] mx-auto pt-24 pb-10">
                    {
                        singleDescription.poster_path ? 
                        <img
                            className="lg:w-[30%] md:w-1/2 w-full rounded-xl md:block hidden movie-poster"
                            src={img_base_path + singleDescription.poster_path} alt="" 
                        /> :
                        <img
                            className="lg:w-[30%] md:w-1/2 w-full rounded-xl md:block hidden movie-poster"
                            src="/no-poster-4xa9LmsT.png" alt="" 
                        />
                    }
                    <div className="flex flex-col md:items-start items-center">
                        <p className="text-4xl font-medium pb-1">{singleDescription.title || singleDescription.original_title || singleDescription.name || singleDescription.original_name}</p>
                        <p className="text-xl font-medium text-[#757E8B] italic pb-3">{singleDescription.tagline}</p>
                        <div className="flex items-center gap-2">
                            {
                                singleDescription.genres.map((genre, index) => {
                                    return <p key={index} className="text-xs bg-[#DA2F68] px-2 py-1 rounded">{genre.name}</p>;
                                })
                            }
                        </div>
                        <div className="flex gap-5 py-5">
                            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
                                <Stack spacing={2}>
                                    <CircularProgress color={ratingColor(singleDescription.vote_average.toFixed(1))} size="lg" determinate value={singleDescription.vote_average.toFixed(1) * 10}>
                                        <Typography sx={{color: 'white'}}>{singleDescription.vote_average.toFixed(1)}</Typography>
                                    </CircularProgress>
                                </Stack>
                            </Stack>
                            {/* <button onClick={handleWatchTrailerClick}>Watch Trailer</button> */}
                            <div className="flex gap-2 items-center cursor-pointer relative" onClick={handleWatchTrailerClick}>
                                <PlayCircleFilledWhiteOutlinedIcon sx={{fontSize: '5rem'}}></PlayCircleFilledWhiteOutlinedIcon>
                                <p className="text-xl">Watch Trailer</p>
                            </div>
                        </div>
                        <div className="pb-8">
                            <p className="text-2xl pb-1">Overview</p>
                            <p className="md:w-5/6 w-full">{singleDescription.overview}</p>
                        </div>
                        <div>
                            <div className="flex gap-5 pb-3">
                                <p className="text-[#757E8B]"><span className="text-white font-semibold">Status:</span> {singleDescription.status}</p>
                                <p className="text-[#757E8B]"><span className="text-white font-semibold">Release Date:</span> {formatDate(singleDescription.release_date || singleDescription.first_air_date)}</p>
                                <p className="text-[#757E8B]"><span className="text-white font-semibold">Runtime:</span> {singleDescription.runtime}</p>
                            </div>
                            <hr className="border-[#1E2D42]" />
                            <div className="py-3">
                                <p className="text-[#757E8B]"><span className="text-white">Director:</span> {directorName()}</p>
                            </div>
                            <hr className="border-[#1E2D42]" />
                            <div className="pt-3">
                                <p className="text-[#757E8B]"><span className="text-white">Writer:</span> {writerName()}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-5/6 mx-auto mt-10">
                <p className="text-2xl pb-8">Top Cast</p>
                <div className="cast flex gap-8 overflow-x-scroll pb-5">
                    {
                        castArray && castArray.cast && castArray.cast.length > 0 ? (
                            castArray.cast.map((cast, index) => (
                                <div key={index} className="flex-none flex flex-col items-center">
                                    {
                                        cast.profile_path ? 
                                        <img className="cast-photo lg:w-[10rem] w-[8rem] lg:h-[10rem] h-[8rem] object-cover rounded-full" src={img_base_path + cast.profile_path} alt="" /> :
                                        <img className="cast-photo lg:w-[10rem] w-[8rem] lg:h-[10rem] h-[8rem] object-cover rounded-full" src='/no-cast-photo.png' alt="" />
                                    }
                                    <p className="md:text-lg text-sm font-semibold mt-4">{cast.name}</p>
                                    <p className="text-[#757E8B] md:text-base text-sm font-medium">{cast.character}</p>
                                </div>
                            ))
                        ) : <p>Loading...</p>
                    }
                </div>
            </div>
            <div className="my-10 w-5/6 mx-auto">
                <p className="text-2xl pb-8">Official Videos</p>
                <div className="videos flex gap-8 overflow-x-scroll pb-8">
                    {
                        movieVideos && movieVideos.results ? (
                            movieVideos.results.length > 0 ? (
                                movieVideos.results.map((video, index) => (
                                    <div className="thumbnail cursor-pointer" key={index} onClick={() => openModal(video)}>
                                        <div className="thumb-img relative">
                                            <img 
                                                className="relative z-[-2] rounded-xl official-videos"
                                                src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`} 
                                                alt={video.name} 
                                            />
                                            <PlayCircleIcon
                                                className="absolute lg:top-[40%] top-[35%] lg:left-[40%] left-[35%]"
                                                style={{
                                                    fontSize: '50px'
                                                }}
                                            ></PlayCircleIcon>
                                            <div className="thumb-layer absolute top-0 left-0 w-full h-full rounded-xl"></div>
                                        </div>
                                        <p className="pt-4">{video.name}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No videos available</p>
                            )
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </div> 
                {
                    selectedVideo && (
                    <div className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-75 z-50">
                        <button className="text-4xl xl:w-[50%] lg:w-[60%] sm:w-5/6 w-[95%] text-right font-bold text-white hover:text-red-600" onClick={closeModal}>
                            &times;
                        </button>
                        <div className="relative bg-[#04152D] sm:p-4 p-2 xl:w-[50%] lg:w-[60%] sm:w-5/6 w-[95%]">
                            {selectedVideo.key ? (
                                <iframe
                                    className="w-full h-56 md:h-96 rounded-xl"
                                    src={`https://www.youtube.com/embed/${selectedVideo.key}`}
                                    frameBorder="0"
                                    allowFullScreen
                                    title="Video Trailer"
                                ></iframe>
                            ) : (
                                <p>{selectedVideo.message}</p>
                            )}
                        </div>
                    </div>
                )
            }
            </div>
            <div className="my-10 w-5/6 mx-auto">
                <p className="text-2xl pb-8">Similar Movies</p>
                <div className="movies-wrapper flex overflow-x-scroll gap-5 pb-4">
                    {
                        similarMovies && similarMovies.results && similarMovies.results.length > 0 ? (
                            similarMovies.results.map((movie, index) => (
                                <MovieDisplay movie={movie} key={index} />
                            ))
                        ) : <p>Loading...</p>
                    }
                </div>
            </div>
            <div className="my-10 w-5/6 mx-auto">
                <p className="text-2xl pb-8">Reccomendations</p>
                <div className="movies-wrapper flex overflow-x-scroll gap-5 pb-4">
                    {
                        recommendedMovies && recommendedMovies.results && recommendedMovies.results.length > 0 ? (
                            recommendedMovies.results.map((movie, index) => (
                                <MovieDisplay movie={movie} key={index} />
                            ))
                        ) : <p>Loading...</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieDescritpion;
