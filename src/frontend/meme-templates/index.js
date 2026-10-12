import Saturated from "./Saturated.jsx";
import FakeQuote from "./FakeQuote.jsx";

export const memeTemplates = [
    {
        id: "saturated",
        label: "Saturated",
        width: 600,
        height: 500,
        Component: Saturated,
        fields: [
            { name: "text", label: "Meme text", placeholder: "Type the text here" },
        ],
    },
    {
        id: "fake-quote",
        label: "Fake quote",
        width: 800,
        height: 400,
        Component: FakeQuote,
        fields: [
            { name: "text", label: "Quote", placeholder: "Type the fake quote here" },
            { name: "author", label: "Author", placeholder: "Type the author here" },
        ],
    },
];
