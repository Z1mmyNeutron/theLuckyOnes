import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../../App.css"

export class AboutViewModel {
    constructor() {
        makeAutoObservable(this);
    }

    async init() {
        // Initialization logic here if needed
    }
}

export function AboutViewBuilder() {
    return observer(({ viewModel }: { viewModel: AboutViewModel }) => {
        return (
            <div className="about-container">
                <div className="about-content">
                    <section className="about-section">
                        <h2 className="about-title">About the Author</h2>
                        <p className="about-text">
                            I'm Christina. I write code for a living and poetry to stay alive. I live in Philly now,
                            but most of my real living happens in the spaces between what I can say out loud and
                            what I have to write down.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">About The Lucky Ones</h2>
                        <p className="about-text">
                            <em>The Lucky Ones</em> started as the things I couldn't say to people's faces. The words
                            that came too late, the apologies that never got spoken, the love that got stuck in my throat.
                            It's the collection of moments when I was too afraid to be honest, so I wrote it down instead.
                        </p>
                        <p className="about-text">
                            Each poem is paired with artwork because sometimes words aren't enough. Sometimes you need
                            to see the feeling, not just read about it. This is what it looks like when someone tries
                            to make sense of heartbreak, faith, and the mess of being human.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">The Creative Process</h2>
                        <p className="about-text">
                            I don't have a process. I have moments when the words won't stay inside anymore.
                            I write them down, I paint what I can't say, and sometimes it makes sense later.
                            Most of the time it doesn't, but that's okay. The art isn't in having it figured out—it's
                            in the trying.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">Availability</h2>
                        <p className="about-text">
                            <em>The Lucky Ones</em> is on Amazon Kindle and works with iOS Books. I'm working on
                            a second edition because apparently I still have more to say. Or maybe I'm just not done
                            trying to get it right.
                        </p>
                        <div className="about-cta">
                            <p className="cta-text">If any of this sounds familiar, maybe you're one of the lucky ones too.</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    })
}

export const AboutView = AboutViewBuilder();

