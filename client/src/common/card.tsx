import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";

export class CardViewModel {
    front: string
    back: string
    constructor(front: string, back: string) {
        makeAutoObservable(this);

        this.front = front
        this.back = back
    }

    async init() {


    }

}

function CardViewBuilder() {
    return observer(({ viewModel }: { viewModel: CardViewModel }) => {
        return <div style={{ border: '1px solid black', width: "33%", padding: "5%" }}>
            <p>
                {viewModel.front}

            </p>
        </div>
    }
    )
}
export const CardView = CardViewBuilder();
