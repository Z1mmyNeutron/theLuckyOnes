import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
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
type Poem = {
    title: string;
    content: string;
}

const poems: Poem[] = [
    {
        title: "One",
        content: `He was all talk.\n
        To drink life in before spitting it out arduously,\n
        A task not bestowed upon the faint hearted. He bemoaned.\n
        One fit for those with the spirit of a warrior sure, but the shaking dog that stood before me dismantling the progress of anyone he deemed too close to capture another milestone?\n 
        Boasting of chasing the tail of a dying dream,\n
        That he had spirited himself out of.`},
    {
        title: "Two",
        content: `It seems rather difficult to comprehend why you would ever bother to be envious of the albatross.\n 
        Have you yourself forgotten that you’re an angel walking amongst man?`},
    {
        title: "Three",
        content: `How could a house with you ever become a home when my thoughts around you have zoning codes?`
    }
]
export class PoemViewModel {
    poemPreivew: string = "Please enjoy some of my work.";
    poems: Poem[] = poems;

    constructor() {
        makeAutoObservable(this);

    }
    async init() {

    }

}
export function PoemViewBuilder() {
    return observer(({ viewModel }: { viewModel: PoemViewModel }) => {
        return <div style={{
            paddingLeft: "10%", color: "white", width: "80%", display: "grid", gridTemplateColumns: "1r 1r 1r"
        }}>
            <p>{viewModel.poemPreivew}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {viewModel.poems.map((poem, index) => (
                    <div key={index} style={{ alignItems: "center", width: "600", height: "600", border: '1px solid black', paddingTop: '5%' }}>
                        <h3>{poem.title}</h3>
                        <p>{poem.content}</p>
                    </div>
                ))}
            </div>
        </div>
    }
    )
}
export const PoemView = PoemViewBuilder();

