import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import "../components/home.css";

function Link(href: string, text: string) {
    console.log(window.location);
    return (
        <a href={href} target="_blank">
            {text}
        </a>
    );
}

type Poem = {
    title: string;
    content: string;
};

const poems: Poem[] = [
    {
        title: "One",
        content: `He was all talk. 
To drink life in before spitting it out arduously, "A task not bestowed upon the faint hearted." He bemoaned. 

One fit for those with the spirit of a warrior sure, but the shaking dog that stood before me dismantling the progress of anyone he deemed too close to capture another milestone? 

Boasting of chasing the tail of a dying dream, That he had spirited himself out of.`
    },
    {
        title: "Two",
        content: `It seems rather difficult to comprehend why you would ever bother to be envious of the albatross.\n 
Have you yourself forgotten that you’re an angel walking amongst man?`
    },
    {
        title: "Three",
        content: `How could a house with you ever become a home when my thoughts around you have zoning codes?`
    },
    {
        title: "Four",
        content: `He sends me songs when I feel sad because I always do it for him. We clash in our tongues and our speeches are sullen but what we do not know how to phrase we show in our actions. Here, let me take your weight for a minute, here remember your future. Let me remind you of what is coming, remind you of who you have been and who you have become. Let us marvel at the vastness between the two as if you are the earth shaking its soul, to shed your skin mountains must crumble, the core must move so hard you find yourself with tectonic plates between your past and present. 

It is hard and it is painful, and it hurts but I will do my best to make it easier where I can just as you do the same for me. It is molten lava, hot, heavy, and endless but diamonds are forged in fires and you my dear are no butterfly, although you are wrapped in a cocoon of your own self-pity and sadness. 

You are sand in an hourglass of time constantly flipping itself back over and one day you won't speak to me in puzzles and I won’t get random code assignments, one day our conversations will be how can we get rich as fast as possible and the we will be emphasized in all the ways we do not know how to say, because even after our hiatus you are the only one that bore with me through the mud and there’s something so beautiful about being able to show someone the worst sides of you and know that they’ll still be there tomorrow. 

Or not tomorrow, but the next week or after that and it took us years to reconnect, but I would be lying if I didn’t say I fucking missed you during the process. One day we will talk about practical psychology and we will paint together, and the nuances of what we cannot find the words for will cease to matter, one day you will live closer and we will build together, but never mind the future- it is forged from the present and you are not the diamond but you are a miner and that is worth so much more.
`
    },
    {
        title: "Five",
        content: `What am I but a walking semblance of everything I wish I had prioritized? It’s almost as if regret could take my name's place.

Perhaps you and I are the same in that regard. Begging for pardon from our pasts, sunken eyes seeping through cracked plaster masks and when you kiss me, I taste myself on your tongue.

Here you stand like you’re back in my doorway. Halfway in, halfway out. My Dear, don’t you grow weary of this balancing act?
Tiptoeing between worlds.

A sentiment and testimonial that by will and proxy now you do not belong to nor in either of them.
You are eternal. Audacious. Forthcoming. Courageous. Who thought beneath all the layers there would be the face of a coward?
`
    },
    {
        title: "Six",
        content: `I was confused by your ambiguity. 
Rightfully so, the words seemed to speak for themselves - An echo of a symphony of an outdated language, one that had fled to a shadow called the shell. 

Speaking in tongues I hadn’t heard of, with wild patterns I knew not well enough by heart, but gracefully enough by the rapid keystrokes of my fingers.
And I tinkered with the idea that something more could come from c.

Something sharper, something that hit the high notes of a piano and sparked a ruby shade of red.

Something that struck the morning air like the strong richness of coffee beans roasting. 
Something that would prove that coding truly is an art in and of itself,
Not because it integrates elements from other areas of life that just happen to repeat themselves so often enough it eventually becomes too obvious not to quantify. 

Because I have grown weary of being hindered by science and the structures of data.

Yes, it is proven to exist, but it cannot explain the leaps I feel when I am called and pulled in all directions.
Except when it chooses to.
I am not sick of science.
I am sick of those who chose to impose their science upon me.
False science. Too small science. Doesn’t fit the right model science.

And here I am staring the fact in the face, it isn’t coding or science or anything else. 
It was the promise I almost broke to younger self that no matter how hard life tried to pry wry fingers in between the plans I had made for myself that I would not give in
The death of an artist starts not with the choice to speak in a language does not build for their tongue but with the refusal to make it their own.
Get creative.
It’s all you have left.
`},
    {
        title: "Seven",
        content: `Goodbye is kinder. It’s a see you later, a talk soon, a temporary disappearance. Fairwell is different. It’s thank you for the memories, I hope everything goes your way, especially because I won’t be around to make sure it happens. I’ve always said closure doesn’t truly exist, but in the juxtaposition between the two words I refute myself. After all, there is a simple peace in finality.
`},
    {
        title: "Eight",
        content: `Clear the house,
Clear the door,
I don’t belong here anymore.


It was nice,
You were kind,
In a trivial space of mind.

It’s all good,
But I left, 
And when I look back there’s no regrets.

Time to go, 
On my own, 
I learned to not fear being alone.

Thank you for the gifts you gave,
They weren’t worth all the pain.
Grateful none the less
To be known is to be blessed.
`},
    {
        title: "Nine",
        content: `I loved you but not in that way 
Every one could see it 
It was useless when they tried to comfort me 
All I could say was so be it 

I dont want to make assumptions 
I don’t want to be a man 
But in a another life 
It would’ve changed your plan 

I was the one who called it off 
Spotting all the Catholic guilt 
Still when it’s all said and done
These words only allude to a fraction of what we built

I don’t want to lose another moment 
I got your voicemail while I stare at the ceiling 
It’s a different kind of love 
The kind that five years later still sends me reeling 

Caught between some anger and my fair share of the pain,
Avoiding all the Nissan’s, Columbia rain and girls that do ballet
Forever didn’t mean years
Turns out i was a holder for some days

I’ll keep your memories safe
I won’t spill the secrets you shared
When anyone asks me if I’m over it 
I’d be lying if I said I didn’t care 

I can spend a thousand nights trapped in a broken clock
Stuck in the 2010s that end with nine
Laughing in the nameless bars
Back when you were still almost mine

I’m tripped up babe, time did nothing to stop the feelings,
I can still taste your lips from the cigarette
And when I wish you the best I still mean it,
if only you were one of those people I could forget,
Then I wouldn't be caught between it.

`}

];

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

export function PoemViewBuilder() {
    return observer(({ viewModel }: { viewModel: PoemViewModel }) => {
        return (
            <div
                style={{
                    color: "white",
                    width: "70%",
                    display: "grid",
                    gridTemplateColumns: "1r 1r 1r"
                }}
            >
                <p>{viewModel.poemPreview}</p>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                }}>
                    {viewModel.poems.map((poem, index) => (
                        <div
                            key={index}
                            style={{
                                alignItems: "center",
                                width: "22.5VW",
                                height: "400px", // Increased height
                                border: '1px solid white',
                                overflow: 'auto', // Enable scrolling

                            }}
                        >
                            <h3>{poem.title}</h3>
                            <p style={{ whiteSpace: 'pre-wrap' }}>{poem.content}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    });
}

export const PoemView = PoemViewBuilder();

