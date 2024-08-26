import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchTrendingMovies = createAsyncThunk('fetchTrending', async () => {
    try {
        const [day, week] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
            axios.get("https://api.themoviedb.org/3/trending/movie/week?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY)
        ]);

        return {
            trendingMoviesByDay: day.data.results,
            trendingMoviesByWeek: week.data.results
        }
    }
    catch(err) {
        return err;
    }
});

export const fetchPopularMovies = createAsyncThunk('fetchPopular', async () => {
    try {
        const [movies, tv] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/movie/popular?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
            axios.get("https://api.themoviedb.org/3/tv/popular?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY)
        ]);

        return {
            popularMovies: movies.data.results,
            popularTVShows: tv.data.results
        }
    }
    catch(err) {
        return err;
    }
});

export const fetchTopRatedMovies = createAsyncThunk('fetchTopRated', async () => {
    try {
        const [movies, tv] = await Promise.all([
            axios.get("https://api.themoviedb.org/3/movie/top_rated?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY),
            axios.get("https://api.themoviedb.org/3/tv/top_rated?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY)
        ]);

        return {
            topRatedMovies: movies.data.results,
            topRatedTVShows: tv.data.results
        }
    }
    catch(err) {
        return err;
    }
});

export const searchMovies = createAsyncThunk('searchMovie', async (searchTerm) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/search/movie?query=" + searchTerm + "&include_adult=false&language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log(result);
        return result.data.results;
    }
    catch(err) {
        return err;
    }
});

export const description = createAsyncThunk('description', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/" + id + "?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log(result);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const cast = createAsyncThunk('check', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/credits?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log(result);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchMovieVideos = createAsyncThunk('fetchMovieVideo', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/videos?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchSimilarMovies = createAsyncThunk('fetchSimilarMovies', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/similar?language=en-US&page=1&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchRecommendedMovies = createAsyncThunk('fetchRecommendedMovies', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/" + id + "/recommendations?language=en-US&page=1&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchShowDescription = createAsyncThunk('fetchShowDescription', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/tv/" + id + "?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchShowCast = createAsyncThunk('fetchShowCast', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/credits?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchShowVideos = createAsyncThunk('fetchShowVideos', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/videos?language=en-US&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchSimilarShows = createAsyncThunk('fetchSimilarShows', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/similar?language=en-US&page=1&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchRecommendedShows = createAsyncThunk('fetchRecommendedShows', async (id) => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/tv/" + id + "/recommendations?language=en-US&page=1&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchNowPlaying = createAsyncThunk('fetchNowPlaying', async () => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

export const fetchMovieList = createAsyncThunk('movies/fetchMovieList', async (page = 1) => {
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        return result.data;
    } catch (err) {
        throw err;
    }
});

export const fetchShowList = createAsyncThunk('shows/fetchShowsList', async (page = 1) => {
    try {
        const result = await axios.get(`https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&api_key=${import.meta.env.VITE_TMDB_API_KEY}`);
        return result.data;
    } catch (err) {
        throw err;
    }
});

export const fetchMovieGenre = createAsyncThunk('fetchMovieGenre', async () => {
    try {
        const result = await axios.get("https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=" + import.meta.env.VITE_TMDB_API_KEY);

        // console.log("Videos:", result.data);
        return result.data;
    }
    catch(err) {
        return err;
    }
});

// https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US

// console.log("result", description());

// https://api.themoviedb.org/3/movie/movie_id?language=en-US

const slice = createSlice({
    name: 'movieSlice',
    initialState: {
        trendingMoviesByDay: [],
        trendingMoviesByWeek: [],
        popularMovies: [],
        popularTVShows: [],
        topRatedMovies: [],
        topRatedTVShows: [],
        searchResults: [],
        singleDescription: {},
        castArray: {},
        movieVideos: {},
        similarMovies: {},
        recommendedMovies: {},
        showDescription: {},
        showCast: {},
        showVideos: {},
        similarShows: {},
        recommendedShows: {},
        nowPlaying: {},
        movieList: {
            results: [],
            page: 1,
            total_pages: 1,
        },
        movieLoading: false,
        movieHasMore: true,
        status: 'idle',
        showList: {
            results: [],
            page: 1,
            total_pages: 1
        },
        showLoading: false,
        showHasMore: true,
        movieGenre: [],
        error: null
    },
    reducers: {},
    extraReducers: (buiilder) => {
        buiilder
        .addCase(fetchTrendingMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
            state.trendingMoviesByDay = action.payload.trendingMoviesByDay;
            state.trendingMoviesByWeek = action.payload.trendingMoviesByWeek;
        })
        .addCase(fetchTrendingMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchPopularMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchPopularMovies.fulfilled, (state, action) => {
            state.popularMovies = action.payload.popularMovies;
            state.popularTVShows = action.payload.popularTVShows;
        })
        .addCase(fetchPopularMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchTopRatedMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
            state.topRatedMovies = action.payload.topRatedMovies;
            state.topRatedTVShows = action.payload.topRatedTVShows;
        })
        .addCase(fetchTopRatedMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(searchMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(searchMovies.fulfilled, (state, action) => {
            state.searchResults = action.payload;
        })
        .addCase(searchMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(description.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(description.fulfilled, (state, action) => {
            state.singleDescription = action.payload;
        })
        .addCase(description.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(cast.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(cast.fulfilled, (state, action) => {
            state.castArray = action.payload;
        })
        .addCase(cast.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchMovieVideos.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchMovieVideos.fulfilled, (state, action) => {
            state.movieVideos = action.payload;
        })
        .addCase(fetchMovieVideos.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchSimilarMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
            state.similarMovies = action.payload;
        })
        .addCase(fetchSimilarMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchRecommendedMovies.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
            state.recommendedMovies = action.payload;
        })
        .addCase(fetchRecommendedMovies.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchShowDescription.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchShowDescription.fulfilled, (state, action) => {
            state.showDescription = action.payload;
        })
        .addCase(fetchShowDescription.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchShowCast.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchShowCast.fulfilled, (state, action) => {
            state.showCast = action.payload;
        })
        .addCase(fetchShowCast.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchShowVideos.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchShowVideos.fulfilled, (state, action) => {
            state.showVideos = action.payload;
        })
        .addCase(fetchShowVideos.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchSimilarShows.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchSimilarShows.fulfilled, (state, action) => {
            state.similarShows = action.payload;
        })
        .addCase(fetchSimilarShows.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchRecommendedShows.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchRecommendedShows.fulfilled, (state, action) => {
            state.recommendedShows = action.payload;
        })
        .addCase(fetchRecommendedShows.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchNowPlaying.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchNowPlaying.fulfilled, (state, action) => {
            state.nowPlaying = action.payload;
        })
        .addCase(fetchNowPlaying.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchMovieList.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchMovieList.fulfilled, (state, action) => {
            // state.movieList = action.payload;
            state.movieLoading = false;
            state.movieList.results = [...state.movieList.results, ...action.payload.results];
            state.movieList.page = action.payload.page;
            state.movieList.total_pages = action.payload.total_pages;
            state.movieHasMore = action.payload.page < action.payload.total_pages;
        })
        .addCase(fetchMovieList.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchShowList.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchShowList.fulfilled, (state, action) => {
            // state.movieList = action.payload;
            state.showLoading = false;
            state.showList.results = [...state.showList.results, ...action.payload.results];
            state.showList.page = action.payload.page;
            state.showList.total_pages = action.payload.total_pages;
            state.showHasMore = action.payload.page < action.payload.total_pages;
        })
        .addCase(fetchShowList.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
        .addCase(fetchMovieGenre.pending, (state, action) => {
            state.status = 'Loading...';
        })
        .addCase(fetchMovieGenre.fulfilled, (state, action) => {
            state.movieGenre = action.payload;
        })
        .addCase(fetchMovieGenre.rejected, (state, action) => {
            state.status = 'There is an error';
            state.error = action.payload;
        })
    }
});

export const sliceReducer = slice.reducer;

// https://developer.themoviedb.org/reference/movie-videos
