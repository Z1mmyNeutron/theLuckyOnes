import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../components/home.css"



export class ContactViewModel {
    artist: string = "Christina Zimmer";
    myEmail: string = "crzimmer2@gmail.com";
    instagram: string = "Christina_La_Dom";
    tiktok: string = "TheLuckyOnes"
    constructor() {
        makeAutoObservable(this);

    }
    async init() {

    }
}
export function ContactViewBuilder() {
    return observer(({ viewModel }: { viewModel: ContactViewModel }) => {
        return <div style={{
            color: "white", margin: "10%", width: "80%", display: "grid", gridTemplateColumns: "1r 1r 1r"
        }}>
            <p>{viewModel.artist}</p>
            <p>{viewModel.myEmail}</p>
            <p>{viewModel.instagram}</p>
            <p>{viewModel.tiktok}</p>


        </div>
    }
    )
}
export const ContactView = ContactViewBuilder();

