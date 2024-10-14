import React from "react";
import { Link } from "react-router-dom";

export default function FeaturedStories() {
    return (
        <div
            id="featured-stories"
            className="h-calc-100-12 sm:h-calc-100-13 md:h-calc-100-16 xl:h-calc-100-18 sm:w-1/4 xl:w-1/5 absolute top-16 sm:top-20 md:top-32 xl:top-40 flex flex-col gap-5 items-center justify-evenly bg-secondary smooth-resize">
                <div className="h-1/4 w-5/6 rounded-sm bg-gray-300 smooth-resize"></div>
                <div className="h-1/4 w-5/6 rounded-sm bg-gray-300 smooth-resize"></div>
                <div className="h-1/4 w-5/6 rounded-sm bg-gray-300 smooth-resize"></div>
        </div>
    )
}