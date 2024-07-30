
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
        return <div id="navbar">
            {viewModel.routes.map(route => {
                return (
                    <button onClick={() => { viewModel.currentRoute = route.url }}>{route.name}</button>
                )
            })}
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
