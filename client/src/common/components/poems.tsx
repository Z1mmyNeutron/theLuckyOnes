

import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { poems, Poem } from "../data/poemsData.ts";
import { NavbarViewModel } from "../navbar/navbarViewModel";

import "../../App.css";

export class PoemViewModel {
    poemPreview: string = "Please enjoy some of my work.";
    poems: Poem[] = poems;

    constructor() {
        makeAutoObservable(this);
    }

    async init() {
        // Initialization logic here if needed
    }
}

const PoemViewComponent: React.FC<{ viewModel: PoemViewModel; navbar: NavbarViewModel }> = observer(({ viewModel, navbar }) => {
    const [expandedPoems, setExpandedPoems] = useState<boolean[]>(new Array(viewModel.poems.length).fill(false));

    // Function to truncate text to the first 10 words
    const getTruncatedText = (text: string, wordLimit: number = 10): string => {
        const words = text.split(' ');
        if (words.length <= wordLimit) {
            return text;
        }
        return words.slice(0, wordLimit).join(' ') + '...'; // Add ellipsis if truncated
    };

    const toggleExpand = (index: number) => {
        setExpandedPoems(prev => {
            const newExpandedPoems = [...prev];
            newExpandedPoems[index] = !newExpandedPoems[index];
            return newExpandedPoems;
        });
    };

    // Effect to handle selected poem from search
    useEffect(() => {
        if (navbar.selectedPoemId) {
            const poemIndex = parseInt(navbar.selectedPoemId.split('-')[1]) - 1; // Convert "poem-1" to index 0
            if (poemIndex >= 0 && poemIndex < viewModel.poems.length) {
                // Expand the selected poem
                setExpandedPoems(prev => {
                    const newExpandedPoems = [...prev];
                    newExpandedPoems[poemIndex] = true;
                    return newExpandedPoems;
                });

                // Scroll to the selected poem
                setTimeout(() => {
                    const element = document.getElementById(`poem-${poemIndex}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 100);

                // Clear the selected poem after handling
                navbar.clearSelectedPoem();
            }
        }
    }, [navbar.selectedPoemId, navbar, viewModel.poems.length]);

    // Filter poems based on search selection
    const poemsToShow = navbar.showOnlySelectedPoem && navbar.selectedPoemId
        ? viewModel.poems.filter((_, index) => `poem-${index + 1}` === navbar.selectedPoemId)
        : viewModel.poems;

    return (
        <>
            {navbar.showOnlySelectedPoem && (
                <div className="search-focus-header">
                    <p className="poem-preview">Search Result</p>
                    <button
                        className="show-all-button"
                        onClick={() => navbar.showAllPoems()}
                    >
                        Show All Poems
                    </button>
                </div>
            )}
            {!navbar.showOnlySelectedPoem && (
                <p className="poem-preview">{viewModel.poemPreview}</p>
            )}
            <div className={`poem-container ${navbar.showOnlySelectedPoem ? 'single-poem' : ''}`}>
                {poemsToShow.map((poem, originalIndex) => {
                    // Find the original index in the full poems array
                    const fullIndex = viewModel.poems.findIndex(p => p === poem);
                    const isHighlighted = navbar.selectedPoemId === `poem-${fullIndex + 1}`;
                    return (
                        <div
                            key={fullIndex}
                            id={`poem-${fullIndex}`}
                            className={`poem-card ${isHighlighted ? 'highlighted' : ''}`}
                            style={{
                                minHeight: expandedPoems[fullIndex] ? 'auto' : '120px',
                            }}
                        >
                            <button
                                onClick={() => toggleExpand(fullIndex)}
                                className="expand-collapse-button"
                            >
                                {expandedPoems[fullIndex] ? '×' : '⋯'}
                            </button>
                            <h3 className="poem-title">{poem.title}</h3>
                            <p className="poem-content" style={{
                                maxHeight: expandedPoems[fullIndex] ? 'none' : '3em',
                            }}>
                                {expandedPoems[fullIndex] ? poem.content : getTruncatedText(poem.content)}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
});

export const PoemView = PoemViewComponent;