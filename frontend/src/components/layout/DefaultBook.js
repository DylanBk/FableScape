import React, { useEffect, useState } from "react";

export default function Book() {
    const [title, setTitle] = useState(null);
    const [chapter, setChapter] = useState(null);
    const [body, setBody] = useState(null);
    const [options, setOptions] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const fetchPage = (pageId) => {
        let query = `/story/1/${pageId}`
        fetch(query)
            .then(res => res.json())
            .then(data => {
                setTitle(data.story.title);
                setChapter(data.page.chapter); 
                setBody(data.page.body);  
                setOptions(data.options);
            })
            .catch(error => console.error(`Error fetching data: ${error}`));
    };

    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    const handleOptionClick = (next_page) => {

        console.log(`button clicked, next page: ${next_page}`)
        setCurrentPage(next_page);
    };

    window.onbeforeunload = function() {
        return "Warning: All progress will be lost if you reload. Do you wish to continue?";
    };

    return (
        <div className="h-[35rem] w-3/5 flex flex-col flex-grow mx-auto my-20 smooth-transition">
            <div className="flex h-full">
                <div
                    id="story-page"
                    className="w-1/2 flex flex-col border-8 border-r border-brown_dark border-r-black bg-yellow-100">
                    {title ? (
                        <div className="mt-4 text-center font-cinzel font-bold">
                            <div className="text-xl">{title}</div>
                            <div className="text-lg">{chapter}</div>
                        </div>
                    ) : (
                        <p className="mt-4 text-center text-xl font-cinzel">Loading...</p>
                    )}
                    {body ? (
                        <div className="h-full w-full p-4 mb-4 font-serif font-cinzel text-sm overflow-y-scroll text-content">{body}</div>
                    ) : (
                        <p className="text-center text-lg font-cinzel">Loading...</p>
                    )}
                </div>
    
                <div
                    id="options-page"
                    className="w-1/2 flex flex-col border-8 border-l border-brown_dark border-l-black bg-yellow-100">
                    {options ? (
                        <div className="h-full flex flex-col items-center justify-evenly">
                            {options.map((option, index) => (
                                option[2] === "Play Again" ? (
                                    <button
                                        key={index}
                                        className="story-option-btn text-xs font-bold sm:font-normal sm:text-sm md:text-base"
                                        onClick={() => {
                                            window.onbeforeunload = null;
                                            window.location.reload();
                                        }}>
                                        Play Again
                                    </button>
                                ) : (
                                    <button
                                        key={option[0]}
                                        onClick={() => handleOptionClick(option[3])}
                                        className="story-option-btn text-xs font-bold sm:font-normal sm:text-sm md:text-base z-10">
                                        {option[2]}
                                    </button>
                                )
                            ))}
                        </div>
                    ) : (   
                        <p className="m-auto text-lg font-cinzel">Loading Options...</p>
                    )}
                </div>

            </div>
        </div>
    );
    
};