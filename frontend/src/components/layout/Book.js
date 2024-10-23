import React, { useEffect, useState } from "react";

export default function Book() {
    const [title, setTitle] = useState(null);
    const [body, setBody] = useState(null);


    useEffect(() => {
        const url = window.location.href
        const splitUrl = url.split('/')
        const id = splitUrl[4]

        console.log(`ID: ${id}`)

        let req = `/story/${id}`
        fetch(req)
        .then(res => res.json())
        .then(data => {
            console.log(`Data: ${data}`)
            setTitle(data.title);
            setBody(data.body);
        });
    }, [])

    return (
        <div className="h-3/5 w-3/5 absolute left-1/2 top-20 sm:top-24 md:top-36 xl:top-44 flex flex-col -translate-x-1/2 smooth-transition">
            <div
                id="story-page"
                className="h-full w-1/2 absolute left-0 flex flex-col border-8 border-r border-brown_dark border-r-black bg-yellow-100">
                <div className="mt-4 text-center font-cinzel text-xl font-bold">{title}</div>
                <div className="h-full w-full p-4 font-serif font-normal border-2 border-blue-400">{body}</div>
            </div>

            <div
                id="options-page"
                className="h-full w-1/2 absolute flex flex-col right-0 border-8 border-l border-brown_dark border-l-black bg-yellow-100">
                <div className="text-center">Options</div>
            </div>
        </div>
    )
};