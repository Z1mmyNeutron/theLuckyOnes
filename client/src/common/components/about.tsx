import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../components/home.css"

export class AboutViewModel {
    name: string = "Hi, my name is Christina Zimmer.";
    bio: string = " I'm a coder, author, artist and I built this website to showcase my love of poetry. The Lucky Ones is a compilation of my experiences in South Carolina, New Jersey and a compilation of heartbreak, heartache and repentance. It combines original artwork from memories and the words I could not find to explain them until it was too late to say them to everyone that mattered. ";

    constructor() {
        makeAutoObservable(this);

    }
    async init() {

    }

}
export function AboutViewBuilder() {
    return observer(({ viewModel }: { viewModel: AboutViewModel }) => {
        return <div style={{
            color: "white", margin: "10%", width: "80%", display: "grid", gridTemplateColumns: "1r 1r 1r"
        }}>
            <p style={{ color: "white" }}>{viewModel.name}</p>
            <p>{viewModel.bio}</p>
        </div >
    }
    )
}
export const AboutView = AboutViewBuilder();
// export function About() {
//     return <h1>About Page</h1>;
// }
