import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../../App.css"

function Link(href: string, text: string) {
    console.log(window.location)
    return <a
        href={href}
        target="_blank"
    >
        {text}
    </a>

}
export class AboutViewModel {
    bio: string = "I'm Christina Zimmer—a coder, author, and artist. I created this website to share my passion for poetry and creativity with you";
    buy: string = "The Lucky Ones is a heartfelt compilation of my experiences across South Carolina and New Jersey, weaving together stories of heartbreak, heartache, and repentance. This work pairs original artwork inspired by cherished memories with the words I struggled to find until it was too late to share them with the people who mattered most."
    linkDirection: string = "The collection is available now on Amazon Kindle and compatible with the iOS Books Library. Keep an eye out for the second edition, coming soon!";
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

            <p>{viewModel.bio}</p>
            <p>{viewModel.buy}</p>
            <p>{viewModel.linkDirection}</p>

        </div>
    }
    )
}
export const AboutView = AboutViewBuilder();

