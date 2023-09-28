import React from "react";
import ResultsItem from "./ResultsItem";

const searchResults = [
  {
    id: 1,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Denny Zhou"],
    arxiv: "https://arxiv.org/pdf/2201.11903.pdf",
    conference: "nips",
    year: 2022,
    domain: "LLM", // this needs to be unique category. we will do some clusterisation and ask chatgpt to create those cateogories
    keywords: ["LLM", "Chain-of-thought", "NLP"],
    abstract:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 2,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Denny Zhou"],
    arxiv: "https://arxiv.org/pdf/2201.11903.pdf",
    conference: "nips",
    year: 2022,
    domain: "LLM", // this needs to be unique category. we will do some clusterisation and ask chatgpt to create those cateogories
    keywords: ["LLM", "Chain-of-thought", "NLP"],
    abstract:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 3,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Denny Zhou"],
    arxiv: "https://arxiv.org/pdf/2201.11903.pdf",
    conference: "nips",
    year: 2022,
    domain: "LLM", // this needs to be unique category. we will do some clusterisation and ask chatgpt to create those cateogories
    keywords: ["LLM", "Chain-of-thought", "NLP"],
    abstract:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    id: 4,
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: ["Jason Wei", "Denny Zhou"],
    arxiv: "https://arxiv.org/pdf/2201.11903.pdf",
    conference: "nips",
    year: 2022,
    domain: "LLM", // this needs to be unique category. we will do some clusterisation and ask chatgpt to create those cateogories
    keywords: ["LLM", "Chain-of-thought", "NLP"],
    abstract:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

searchResults.map((item) => console.log(item));

export default function ResultsSection() {
  return (
    <div className="p-2">
      <div className="relative drop-shadow-md flex grow h-full">
        <div className="absolute text-gray-400 text-xl top-0 -translate-y-1/2 left-14 bg-transparent p-1 font-ligh z-30">
          Results
        </div>
        <div className="absolute h-[6px] bg-white top-0 -translate-y-1/2 left-12 w-[90px] z-20"></div>

        <div className="bg-prm-white w-full min-h-[500px] p-6 rounded-[20px] border-[2px] overflow-hidden border-prm-green z-10">
          {searchResults.map((item, i) => (
            <ResultsItem key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
