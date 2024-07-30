
import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import React from "react";
import "../components/home.css"


function Link(href: string, text: string) {
    console.log(window.location)
    return <a
        href={href}
        target="_blank"
    >
        {text}
    </a>
}
function NavbarViewBuilder() {
    return observer(({ viewModel }: { viewModel: NavbarViewModel }) => {
        const handleClick = (url: string) => {
            if (url.startsWith("http")) {
                window.location.href = url;
            } else {
                viewModel.currentRoute = url;
            }
        };

        return <div id="navbar">
            {viewModel.routes.map(route => (
                <button key={route.name} onClick={() => handleClick(route.url)}>
                    {route.name}
                </button>
            ))}
            <h1>{viewModel.name}</h1>
            <h2>{viewModel.author}</h2>
            <p>
                {Link(viewModel.link, viewModel.linkText)}
            </p>

        </div>
    }
    )
}

export const NavbarView = NavbarViewBuilder();
