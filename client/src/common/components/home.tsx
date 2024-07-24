import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../components/home.css"

type CardType = string | any;
const map = new Map([
    ["book1", require("../../assets/images/book1.jpg")],
    ["book2", require("../../assets/images/book29.jpg")],
    ["book3", require("../../assets/images/book3.jpeg")],
    ["book4", require("../../assets/images/book4.jpeg")],
    ["book5", require("../../assets/images/book5.png")],
    ["book6", require("../../assets/images/book6.jpeg")],
    ["book7", require("../../assets/images/book7.jpeg")],
    ["book8", require("../../assets/images/book8.jpeg")],
    ["book9", require("../../assets/images/book9.jpeg")],
    ["book10", require("../../assets/images/book10.jpeg")],
    ["book11", require("../../assets/images/book11.jpeg")],
    ["book12", require("../../assets/images/book12.jpeg")],
    ["book13", require("../../assets/images/book13.jpeg")],
    ["book14", require("../../assets/images/book14.jpg")],
    ["book15", require("../../assets/images/book15.jpg")],
    ["book16", require("../../assets/images/book16.jpg")],
    ["book17", require("../../assets/images/book17.jpg")],
    ["book18", require("../../assets/images/book18.jpg")],
    ["book19", require("../../assets/images/book19.jpg")],
    ["book20", require("../../assets/images/book20.jpg")],
    ["book21", require("../../assets/images/book21.jpg")],
    ["book22", require("../../assets/images/book22.jpg")],
    ["book23", require("../../assets/images/book23.jpg")],
    ["book24", require("../../assets/images/book24.jpg")],
    ["book25", require("../../assets/images/book25.jpg")],
    ["book26", require("../../assets/images/book26.jpg")],
    ["book27", require("../../assets/images/book27.jpg")],
    ["book28", require("../../assets/images/book28.jpg")],


])

export class CardViewModel {
    flip: boolean = false
    front: CardType;
    back: CardType;
    cardViewModels: any;

    constructor(front: CardType, back: CardType) {
        makeAutoObservable(this);
        this.front = front
        this.back = back
    }

    get cardFace(): CardType {
        return this.flip ? this.back : this.front;
    }

    async init() {
    }

    get getFlipStyle() {
        return {
            transform: this.flip ? 'scaleY(-1)' : 'scaleY(1)',
            transition: 'transform 0.5s ease',
            borderRadius: 5,
        };
    }
}
function RenderCardType(value: CardType, style: any) {
    if (map.has(value)) {
        return <img style={style} src={map.get(value)} height={400} width={325} />
    }
    return <p style={{ ...style, padding: 20 }}>{value}</p>

}
function CardViewBuilder() {
    return observer(({ viewModel }: { viewModel: CardViewModel }) => {
        return <div
            style={{ ...viewModel.getFlipStyle, width: 325, height: 400, border: '1px solid black', paddingTop: '20%', }} onClick={() => {
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
        new CardViewModel("book1", "back"),
        new CardViewModel("book2", "back"),
        new CardViewModel("book3", "back"),
        new CardViewModel("book4", "back2"),
        new CardViewModel("book5", "book2"),
        new CardViewModel("book6", "back2"),
        new CardViewModel("book6", "back2"),
        new CardViewModel("book7", "back2"),
        new CardViewModel("book8", "back2"),
        new CardViewModel("book9", "back2"),
        new CardViewModel("book10", "back2"),
        new CardViewModel("book11", "back2"),
        new CardViewModel("book12", "back2"),
        new CardViewModel("book13", "back2"),
        new CardViewModel("book14", "back2"),
        new CardViewModel("book15", "back2"),
        new CardViewModel("book16", "back2"),
        new CardViewModel("book17", "back2"),
        new CardViewModel("book18", "back2"),
        new CardViewModel("book19", "back2"),
        new CardViewModel("book20", "back2"),
        new CardViewModel("book21", "back2"),
        new CardViewModel("book22", "back2"),
        new CardViewModel("book23", "back2"),
        new CardViewModel("book24", "back2"),
        new CardViewModel("book25", "back2"),
        new CardViewModel("book26", "back2"),
        new CardViewModel("book27", "back2"),
        new CardViewModel("book28", "back2"),

    ]
}
export function HomeViewBuilder() {
    return observer(({ viewModel }: { viewModel: HomeViewModel }) => {
        return <div style={{
            margin: "10%", width: "80%", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"
        }}>
            {viewModel.cardViewModels.map(card => <CardView viewModel={card} />)}
        </div >
    }
    )
}
export const HomeView = HomeViewBuilder();