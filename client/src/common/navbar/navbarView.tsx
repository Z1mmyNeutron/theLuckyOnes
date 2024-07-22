
import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import React from "react";

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
        return <div>
            <h1>{viewModel.name}</h1>
            <h2>{viewModel.author}</h2>
            <p>
                {Link(viewModel.link, viewModel.linkText)}
            </p>
            {viewModel.routes.map(route => {
                return (
                    <button onClick={() => { viewModel.currentRoute = route.url }}>{route.name}</button>
                )
            })}

        </div>
    }
    )
}

export const NavbarView = NavbarViewBuilder();
