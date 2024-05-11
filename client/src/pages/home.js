import React, { useState, useEffect } from "react";


function Home() {

    return (
        <div className="Home">
            <h1>
                <div>
                    <ul>
                        <li><a href="/pages/home.js">Home</a></li>
                        <li><a href="/pages/about.js">About</a></li>
                        <li><a href="/pages/poetry.js">Poems</a></li>
                    </ul>
                </div>
            </h1>
            <h1>Home Page</h1>
        </div>
    );
}

export default Home