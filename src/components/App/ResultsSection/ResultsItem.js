import React from "react";
import { useState, useEffect } from "react";

const delay = 500;

export default function ResultsItem({ item }) {
  const [showAbstract, setShowAbstract] = useState(false);
  const [abstractSimplified, setAbstractSimplified] = useState(false);
  const handleLinkClick = (event) => {
    event.preventDefault();
    // Open the link in a new tab
    window.open(event.target.href, "_blank");
  };

  function simplifyPaperTitle(inputString) {
    const stringWithUnderscores = inputString.replace(/ /g, "_");
    const lowercaseString = stringWithUnderscores.toLowerCase();
    const formattedString = lowercaseString.replace(/[^a-z0-9_]/g, "_");
    return formattedString;
  }

  return (
    <div className={`flex flex-row m-2 w-full mb-10 font-light`}>
      <div className="flex items-center justify-center text-blac m-2 mr-12">
        <p className="py-3 px-4 rounded-full bg-prm-green"> {item.id}</p>
      </div>
      <div
        onMouseEnter={() => setShowAbstract(true)}
        onMouseLeave={() => setShowAbstract(false)}
        className={`bg-prm-white shadow-sm shadow-prm-gray hover:shadow-prm-gray hover:shadow-md border rounded-[40px] w-full p-2 px-4 text-gray-400 ${
          showAbstract === false ? "h-36" : "h-[380px]"
        } overflow-hidden transition-all duration-[${delay}ms] ease-in-out`}
      >
        <div className="bg-gray-100 text-gray-600 drop-shadow-sm rounded-full text-lg flex flex-row m-2 items-center justify-left w-fit py-1 px-14">
          <h1>{item.title}</h1>
        </div>
        <div className="flex flex-row items-center justify-between w-full ">
          <div className="flex flex-row">
            {item.authors.map((author, i) => (
              <div
                key={i}
                className="border text-prm-green border-gray-200 py-0 drop-shadow-sm  rounded-full text-md m-1 px-4"
              >
                {author}
              </div>
            ))}
          </div>
          <div className="flex flex-row">
            <div className="text-prm-blue border border-gray-200 font-normal bg-prm-green/10 p-0 drop-shadow-sm rounded-full text-md m-1 px-4">
              {item.conference.toUpperCase()}
            </div>
            <div className="text-prm-blue border border-gray-200 font-normal bg-prm-green/10 p-0 drop-shadow-sm  rounded-full text-md m-1 px-4">
              {item.year}
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between w-full ">
          <div className="flex flex-row">
            <a
              href={item.arxiv}
              onClick={handleLinkClick}
              className="text-gray-600 border-gray-200 bg-prm-green/10 hover:bg-prm-green/20 border p-0 shadow-prm-green/20 shadow-sm rounded-full text-md m-1 px-4"
            >
              {item.arxiv}
            </a>
          </div>
          <div className="flex flex-row">
            {item.keywords.map((key, i) => (
              <div
                key={i}
                className="border text-prm-blue border-gray-200 p-0 drop-shadow-sm  rounded-full text-md m-1 px-4"
              >
                {key}
              </div>
            ))}
          </div>
        </div>
        <div className="pt-4">
          <div className="flex items-center justify-between">
            <div className="text-prm-green text-lg rounded-full px-2 w-fit">Abstract:</div>
            <button
              onClick={() => setAbstractSimplified(!abstractSimplified)}
              className="text-prm-blue border-gray-200 bg-prm-green/10 hover:bg-prm-green/20 border p-0 rounded-full text-md px-4 cursor-pointer mb-2 shadow-prm-green/20 shadow-sm"
            >
              {abstractSimplified ? "back to original" : "simplify"}
            </button>
          </div>
          <div className="px-2">{item.abstract}</div>
          <div className="flex items-center justify-center">
            <a
              href={`/app/qa/${simplifyPaperTitle(item.title)}`}
              className="text-prm-green block cursor-pointer rounded-full tracking-wider  bg-prm-white border-solid border-[1px] overflow-hidden border-prm-green px-6 py-[6px] drop-shadow-sm  transition-all  hover:bg-prm-green/10 items-center"
            >
              Start Q&A
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
