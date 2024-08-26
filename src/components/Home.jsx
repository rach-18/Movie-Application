import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Search from "./Search";
import { fetchTrendingMovies, fetchPopularMovies, fetchTopRatedMovies, cast } from "../slice";
import MoviesDisplay from "./MoviesDisplay";

function Home() {
    const dispatch = useDispatch();
    const {trendingMoviesByDay, trendingMoviesByWeek, popularMovies, popularTVShows, topRatedMovies, topRatedTVShows, castArray} = useSelector((state) => {
        return state.movieReducer;
    });

    useEffect(() => {
        dispatch(fetchTrendingMovies())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchPopularMovies())
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchTopRatedMovies())
    }, [dispatch]);

    useEffect(() => {
        dispatch(cast(1023922))
    }, [dispatch]);

    // console.log(trendingMoviesByDay, trendingMoviesByWeek, popularMovies, popularTVShows, topRatedMovies, topRatedTVShows);
    // console.log("Check", castArray);

    return (
        <>
            <Search />
            <MoviesDisplay 
                heading='Trending'
                option1={trendingMoviesByDay}
                option2={trendingMoviesByWeek}
                choice1='Day'
                choice2='Week'
            />
            <MoviesDisplay 
                heading="What's Popular?"
                option1={popularMovies}
                option2={popularTVShows}
                choice1='Movies'
                choice2='TV Shows'
            />
            <MoviesDisplay 
                heading="Top Rated"
                option1={topRatedMovies}
                option2={topRatedTVShows}
                choice1='Movies'
                choice2='TV Shows'
            />
            {/* <MoviesDisplay data={trendingMoviesByWeek} /> */}
        </>
    )
}

export default Home;
