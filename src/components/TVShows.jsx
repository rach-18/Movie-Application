import { useEffect, useRef } from "react";
import { fetchShowList } from "../slice";
import { useDispatch, useSelector } from "react-redux";
import MovieDisplay from "./MovieDisplay";

function TVShows() {
    const dispatch = useDispatch();
    const { showList, showHasMore, showLoading } = useSelector((state) => state.movieReducer);
    const loaderRef = useRef(null);
    const currentPage = showList.page;

    useEffect(() => {
        if (showHasMore) {
            dispatch(fetchShowList(currentPage));
        }
    }, [dispatch, currentPage, showHasMore]);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '20px',
            threshold: 1.0
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && showHasMore && !showLoading) {
                dispatch(fetchShowList(currentPage + 1));
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
    }, [showHasMore, showLoading, currentPage, dispatch]);

    // console.log("Show List:", showList);

    return (
        <div className="xl:w-5/6 w-[90%] mx-auto mt-24 mb-10">
            <div className="flex justify-between items-center">
                <p className="text-2xl pb-8">Explore TV Shows</p>
                <div className="flex gap-2">
                    {/* <select className="bg-[#173D77] py-2 px-5 rounded-full outline-none" name="" id="">
                        <option value="" disabled>Select Genres</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                    </select> */}
                    {/* <select className="bg-[#173D77] py-2 px-5 rounded-full" name="" id="">
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                        <option value="">Comedy</option>
                    </select> */}
                </div>
            </div>
            <div className="flex gap-5 flex-wrap">
                {
                    showList.results.map((show, index) => {
                        return <MovieDisplay key={index} category='infinite' movie={show} />
                    })
                }
            </div>
            <div ref={loaderRef}>
                {showLoading && <p>Loading more movies...</p>}
            </div>
        </div>
    )
}

export default TVShows;
