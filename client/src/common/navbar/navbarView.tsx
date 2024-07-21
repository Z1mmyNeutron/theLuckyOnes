
// import { makeAutoObservable } from "mobx";
// import { observer } from "mobx-react";
// import { NavLink } from "react-router-dom";
// import React from "react";

import { observer } from "mobx-react";
import { NavbarViewModel } from "./navbarViewModel";
import React from "react";


// type RouteType = string | any;
// export class RouteViewModel {
//     route: RouteType;


//     constructor(Route: RouteType) {
//         makeAutoObservable(this);

//         this.route = Route
//     }

//     getRouteData(): RouteType {
//         return this.getRouteData;
//     }

//     async init() {
//     }

// }

// const map = new Map([
//     ["Home", require("./home.tsx")],
//     ["About", require("./about.tsx")]

// ])

// function RenderCardType(value: RouteType, style: any) {
//     if (map.has(value)) {
//         return <img style={style} src={map.get(value)} height={300} width={300} />
//     }
//     return <p style={{ ...style, padding: 20 }}>{value}</p>

// }
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
