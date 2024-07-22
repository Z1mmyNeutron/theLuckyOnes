

import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import React from "react";

function NavbarViewBuilder() {
    return observer(({ viewModel }: { viewModel: NavbarViewModel }) => {
        return <div>
            <h1>This works</h1>
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
