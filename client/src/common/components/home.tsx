import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../../App.css"


type CardType = string | any;
const map = new Map([

    ["book2", require("../../assets/images/book2.jpg")],
    ["book3", require("../../assets/images/book3.jpg")],
    ["book4", require("../../assets/images/book4.jpg")],

    ["book6", require("../../assets/images/book6.jpg")],

    ["book9", require("../../assets/images/book9.jpg")],
    ["book10", require("../../assets/images/book10.jpg")],
    ["book11", require("../../assets/images/book11.jpg")],
    ["book12", require("../../assets/images/book12.jpg")],

    ["book14", require("../../assets/images/book14.jpg")],
    ["book15", require("../../assets/images/book15.jpg")],
    ["book16", require("../../assets/images/book16.jpg")],

    ["book18", require("../../assets/images/book18.jpg")],
    ["book19", require("../../assets/images/book19.jpg")],

    ["book22", require("../../assets/images/book22.jpg")],

    ["book24", require("../../assets/images/book24.jpg")],
    ["book25", require("../../assets/images/book25.jpeg")],

    ["book27", require("../../assets/images/book27.jpg")],

    ["book29", require("../../assets/images/book29.jpg")],
    ["book30", require("../../assets/images/book30.jpg")],

])

export class CardViewModel {
    flip: boolean = false
    front: CardType;
    back: CardType;
    cardViewModels: any;
    grayscale: number;

    constructor(front: CardType, back: CardType) {
        makeAutoObservable(this);
        this.front = front
        this.back = back
        this.grayscale = 100;
    }

    get cardFace(): CardType {
        return this.flip ? this.back : this.front;
    }

    async init() {
    }

    get getFlipStyle() {
        return {
            transform: this.flip ? 'scaleY(-1)' : 'scaleY(1)',
            transition: 'transform scaleY 0.5s ease',
            borderRadius: 5,
            fontSize: "large",




        };
    }
}
function RenderCardType(value: CardType, style: any) {
    if (map.has(value)) {
        return <img style={{ ...style, width: '100%', height: '100%', objectFit: 'cover' }} src={map.get(value)} alt="Book cover" />
    }
    return <p style={{ ...style, padding: 10, }}>{value}</p>

}
function CardViewBuilder() {
    return observer(({ viewModel }: { viewModel: CardViewModel }) => {
        return <div
            className="home-card"
            style={{ ...viewModel.getFlipStyle }}
            onClick={() => {
                viewModel.flip = !viewModel.flip
            }}>
            {RenderCardType(viewModel.cardFace, viewModel.getFlipStyle)}
        </div>
    }
    )
}
export const CardView = CardViewBuilder();

export class HomeViewModel {
    constructor() {
        makeAutoObservable(this);
    }
    cardViewModels: CardViewModel[] = [

        new CardViewModel("book2", "The last time I light up a marbolo red was five years, six months, seven hours, three minutes and fifteen seconds ago. It smelled like you."),
        new CardViewModel("book3", `I want to remember you as I used to, not as a prisoner during her great escape peering back over her shoulder as the alarm bells ring, wondering if she is going to be caught or if she has covered enough ground to put the past behind her. I want to remember you like you still love me.`),
        new CardViewModel("book4", "She was my savior, Jesus Christ found me later, no one else could dare replace her."),

        new CardViewModel("book6", `"Sometimes all you truly need is your dawg" -Gandi, probably"`),

        new CardViewModel("book9", "We are two forgotten Gods that have lost their tempers. Seldom. Exclusive. Ancient. And yet we are a spectacle so bright that even the mere mortals mark their calendars."),
        new CardViewModel("book10", "Oh I adore you and denounce you at the same time, when I hold a mirror all your sins reflect mine."),
        new CardViewModel("book11", "I'm playing poker with the Gods, they said to call my mama but it's a quarter to the witching hour and she hates when I cause drama."),
        new CardViewModel("book12", "And it was sweet and it was good and it felt right Pray tell, God what would have happened if I stayed that night? "),

        new CardViewModel("book14", "God tell me your sins, I need to know truth, If I'm made in your likeness are you like me too?"),
        new CardViewModel("book15", "I'm sorry. Maybe in another lifetime I got it right."),
        new CardViewModel("book16", "Oh, what’s become of me? I’m half the woman and twice the devil I used to be,how did anyone dare dream of saving me?When all that’s left is all I promised not to be."),

        new CardViewModel("book18", "Stolen sunglasses cover pupils bigger than your promises, part of just wishes you were honest."),
        new CardViewModel("book19", "No, we have exchanged our egos for our evolution, and when I greet you this time, I do not say hello.This time I welcome you home."),

        new CardViewModel("book22", "It won't matter in a moment, I gave them a warning; see they haven't me the monster I've been teaching conformance. If they thought love was too much, just wait for my next performance."),

        new CardViewModel("book24", `Oh my darling, what a mess I've made. Corpses of mistakes rising up from their graves. If I could go back I'd ask Father Time, "Would you be happier if I never made you mine?"`),
        new CardViewModel("book25", `Have you yourself forgotten that you’re an angel walking amongst man?`),

        new CardViewModel("book27", "Visiting the past is like trying to fall into a photograph, But the colors have faded and it’s not the same as before."),

        new CardViewModel("book29", "Let me tell you something, don't you worry about nothing, God's got ten fingers in on it and he bites."),
        new CardViewModel("book30", `One day you will live closer and we will build together, but never mind the future- it is forged from the present and you are not the diamond but you are a miner and that is worth so much more.`),

    ]
}
export function HomeViewBuilder() {
    return observer(({ viewModel }: { viewModel: HomeViewModel }) => {

        return <div className="home-grid">
            {viewModel.cardViewModels.map(card => <CardView viewModel={card} />)}
        </div >
    }
    )
}
export const HomeView = HomeViewBuilder();