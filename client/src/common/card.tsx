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
])

function RenderCardType(value: CardType, style: any) {
    if (map.has(value)) {
        return <img style={style} src={map.get(value)} height={200} width={200} />
    }
    return <p style={{ ...style, padding: 20 }}>{value}</p>

}
function CardViewBuilder() {
    return observer(({ viewModel }: { viewModel: CardViewModel }) => {
        return <div
            style={{ ...viewModel.getFlipStyle, width: 200, height: 200, border: '1px solid black' }} onClick={() => {
                viewModel.flip = !viewModel.flip
            }}>
            {RenderCardType(viewModel.cardFace, viewModel.getFlipStyle)}
        </div>
    }
    )
}
export const CardView = CardViewBuilder();
