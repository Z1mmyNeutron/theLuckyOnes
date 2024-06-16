import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
type CardType = string | any;
export class CardViewModel {
    flip: boolean = false
    front: CardType;
    back: CardType;

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
        };
    }
}

const map = new Map([
    ["book1", require("../assets/images/book1.jpg")],
    ["book2", require("../assets/images/book1.jpg")],
    ["book3", require("../assets/images/book3.jpeg")],
    ["book4", require("../assets/images/book4.jpeg")],
    ["book5", require("../assets/images/book5.png")],
    ["book6", require("../assets/images/book6.jpeg")],
    ["book7", require("../assets/images/book7.jpeg")],
    ["book8", require("../assets/images/book8.jpeg")],
    ["book9", require("../assets/images/book9.jpeg")],
    ["book10", require("../assets/images/book10.jpeg")],
    ["book11", require("../assets/images/book11.jpeg")],
    ["book12", require("../assets/images/book12.jpeg")],
    ["book13", require("../assets/images/book13.jpeg")],
])

function RenderCardType(value: CardType, style: any) {
    if (map.has(value)) {
        return <img style={style} src={map.get(value)} height={300} width={300} />
    }
    return <p style={{ ...style, padding: 20 }}>{value}</p>

}
function CardViewBuilder() {
    return observer(({ viewModel }: { viewModel: CardViewModel }) => {
        return <div
            style={{ ...viewModel.getFlipStyle, width: 300, height: 300, border: '1px solid black' }} onClick={() => {
                viewModel.flip = !viewModel.flip
            }}>
            {RenderCardType(viewModel.cardFace, viewModel.getFlipStyle)}
        </div>
    }
    )
}
export const CardView = CardViewBuilder();
