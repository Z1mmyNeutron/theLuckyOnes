import React, { useState, useEffect } from "react";


function About() {

    return (
        <div className="About">
            <h1>
                <div>
                    <ul>
                        <li><a href="/pages/home.js">Home</a></li>
                        <li><a href="/pages/about.js">About</a></li>
                        <li><a href="/pages/poetry.js">Poems</a></li>
                    </ul>
                </div>
            </h1>
            <h1>About Page</h1>
        </div>
    );
}

export default About