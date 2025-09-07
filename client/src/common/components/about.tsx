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
                            Christina Zimmer is a multifaceted creative—a software developer, poet, and visual artist
                            whose work bridges the gap between technology and human emotion. Based between South Carolina
                            and New Jersey, she crafts digital experiences and literary works that explore the complexities
                            of modern life, relationships, and personal growth.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">About The Lucky Ones</h2>
                        <p className="about-text">
                            <em>The Lucky Ones</em> is a deeply personal collection that captures the raw essence of
                            human experience through poetry and original artwork. Born from moments of heartbreak,
                            reflection, and redemption, this work represents the words that often come too late—the
                            thoughts we wish we could have shared with those who mattered most.
                        </p>
                        <p className="about-text">
                            Each piece in this collection is paired with carefully crafted artwork, creating a
                            multimedia experience that speaks to both the heart and the mind. The poems traverse
                            themes of love, loss, faith, and the journey toward self-discovery.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">The Creative Process</h2>
                        <p className="about-text">
                            This collection represents years of introspection and artistic exploration. Each poem
                            began as a moment of clarity or confusion, transformed through the lens of experience
                            and time. The accompanying artwork serves not merely as illustration, but as an integral
                            part of the storytelling process.
                        </p>
                    </section>

                    <section className="about-section">
                        <h2 className="about-title">Availability</h2>
                        <p className="about-text">
                            <em>The Lucky Ones</em> is now available on Amazon Kindle and is compatible with the
                            iOS Books Library. A second edition is currently in development, promising even more
                            depth and artistic exploration.
                        </p>
                        <div className="about-cta">
                            <p className="cta-text">Experience the collection that has touched readers across the digital landscape.</p>
                        </div>
                    </section>
                </div>
            </div>
        );
    })
}

export const AboutView = AboutViewBuilder();

