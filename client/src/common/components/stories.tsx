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
export class StoryViewModel {
    stories: string = "Here are some stories";
    constructor() {
        makeAutoObservable(this);

    }
    async init() {

    }
}
export function StoryViewBuilder() {
    return observer(({ viewModel }: { viewModel: StoryViewModel }) => {
        return <div style={{
            color: "white", margin: "10%", width: "80%", display: "grid", gridTemplateColumns: "1r 1r 1r"
        }}>
            <p>{viewModel.stories}</p>


        </div>
    }
    )
}
export const StoryView = StoryViewBuilder();

