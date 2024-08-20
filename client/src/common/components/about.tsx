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
    name: string = "Hi, my name is Christina Zimmer.";
    bio: string = "I'm a coder, author, artist and I built this website to showcase my love of poetry.";
    description: string = " The Lucky Ones is a compilation of my experiences in South Carolina, New Jersey and a compilation of heartbreak, heartache and repentance. It combines original artwork from memories and the words I could not find to explain them until it was too late to say them to everyone that mattered.";
    buy: string = "It is available now on Amazon Kindle and compatible with IOS books library. Look out for the second edition coming soon, but in the mean time enjoy some of my work. It was paid through blood, sweat, pain and tears; while the lessons were hard to learn they were well worth it. I hope you enjoy.";
    linkDirection: string = "Purchase at the top.";
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
            <p>{viewModel.name}</p>
            <p>{viewModel.bio}</p>
            <p>{viewModel.description}</p>
            <p>{viewModel.buy}</p>
            <p>{viewModel.linkDirection}</p>

        </div>
    }
    )
}
export const AboutView = AboutViewBuilder();

