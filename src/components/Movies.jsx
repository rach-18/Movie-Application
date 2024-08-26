import { useEffect, useRef } from "react";
import { fetchMovieList, fetchMovieGenre } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import MovieDisplay from "./MovieDisplay";

function Movies() {
    const dispatch = useDispatch();
    const { movieList, movieHasMore, movieLoading, movieGenre } = useSelector((state) => state.movieReducer);
    const loaderRef = useRef(null);
    const currentPage = movieList.page;

    // Fetch movies on component mount and when currentPage changes
    useEffect(() => {
        if (movieHasMore) {
            dispatch(fetchMovieList(currentPage));
        }
    }, [dispatch, currentPage, movieHasMore]);

    useEffect(() => {
        dispatch(fetchMovieGenre());
    }, [dispatch]);

    // Set up infinite scrolling with IntersectionObserver
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && movieHasMore && !movieLoading) {
                dispatch(fetchMovieList(currentPage + 1));
            }
        }, options);

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [movieHasMore, movieLoading, currentPage, dispatch]);

    // console.log("Movie List:", movieList);
    // console.log("Movie Genre:", movieGenre);

    return (
        <div className="xl:w-5/6 w-[90%] mx-auto mt-24 mb-10">
            <div className="flex justify-between items-center">
                <p className="text-2xl pb-8">Explore Movies</p>
                <div className="flex gap-2">
                {/* <select className="bg-[#173D77] py-2 px-5 rounded-full outline-none" name="" id="">
                    <option value="" disabled>
                        {movieGenre.genres && movieGenre.genres.length > 0 ? 'Select Genres' : 'Loading genres...'}
                    </option>
                    {
                        movieGenre.genres && movieGenre.genres.length > 0 &&
                        movieGenre.genres.map((genre, index) => (
                            <option key={index} value={genre.id}>{genre.name}</option>
                        ))
                    }
                </select> */}
                    {/* <select name="" id="">
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                    </select> */}
                </div>
            </div>
            <div className="flex gap-5 flex-wrap">
                {
                    movieList.results.map((movie, index) => {
                        return <MovieDisplay key={index} category='infinite' movie={movie} />
                    })
                }
            </div>
            <div ref={loaderRef}>
                {movieLoading && <p>Loading more movies...</p>}
            </div>
        </div>
    );
}

export default Movies;
