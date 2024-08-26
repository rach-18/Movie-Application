import { useState, useRef, useEffect } from "react";
import MovieDisplay from "./MovieDisplay";

function MoviesDisplay({ heading, option1, option2, choice1, choice2 }) {
    const [visible, setVisible] = useState(true);
    const [translateX, setTranslateX] = useState(0);

    // console.log("Option1:", option1);
    // console.log("Option2:", option2);

    return (
        <div className="xl:w-[85%] w-[95%] mx-auto my-20">
            <div className="flex justify-between my-5">
                <p className="sm:text-2xl text-xl">{heading}</p>
                <div className="flex bg-white text-black lg:w-[20%] sm:w-[30%] w-1/2 justify-between items-center p-1 rounded-full sm:text-base text-xs">
                    <p
                        className={visible ? 'gradient-bg w-1/2 text-center rounded-full py-1 text-white cursor-pointer' : 'text-center w-1/2 py-1 cursor-pointer'}
                        onClick={() => setVisible(true)}
                    >
                        {choice1}
                    </p>
                    <p 
                        className={visible ? 'text-center w-1/2 py-1 cursor-pointer' : 'gradient-bg w-1/2 text-center rounded-full py-1 text-white cursor-pointer'}
                        onClick={() => setVisible(false)}
                    >
                        {choice2}
                    </p>
                </div>
            </div>
            <div className="carousel-container">
                <div className="carousel">
                    <div 
                        className="movies-wrapper flex overflow-x-scroll gap-5 pb-2"  
                        style={{ transform: `translateX(-${translateX}px)` }}
                    >
                        {
                            visible ? 
                            (option1.map((movie, index) => (
                                <MovieDisplay key={index} movie={movie} />
                            ))) :
                            (option2.map((movie, index) => (
                                <MovieDisplay key={index} movie={movie} />
                            )))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoviesDisplay;
