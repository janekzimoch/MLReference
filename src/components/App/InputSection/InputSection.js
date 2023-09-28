import React from "react";
import Prompt from "./Prompt";
import Select from "./Select";

import { useState } from "react";

const optionsYear = [
  { label: "2015", value: 1 },
  { label: "2016", value: 2 },
  { label: "2017", value: 3 },
  { label: "2018", value: 4 },
  { label: "2019", value: 5 },
  { label: "2020", value: 6 },
  { label: "2021", value: 7 },
  { label: "2022", value: 8 },
  { label: "2023", value: 9 },
];

const optionsConf = [
  { label: "nips", value: 1 },
  { label: "iclr", value: 2 },
  { label: "icml", value: 3 },
  { label: "cvpr", value: 4 },
  { label: "eecv", value: 5 },
  { label: "iccv", value: 6 },
  { label: "acl", value: 7 },
  { label: "amacl", value: 8 },
  { label: "emnlp", value: 9 },
];

export default function InputSection() {
  const [year, setYear] = useState([]);
  const [conf, setConf] = useState([]);
  const [prompt, setPrompt] = useState("");

  function handleInputChange(e) {
    setPrompt(e.target.value);
  }

  function handlePromptSend(e) {
    return;
  }

  return (
    <div className="mx-auto my-10 flex flex-col">
      <div className="relative grid grid-cols-8">
        <div className="col-span-5 w-full h-full p-2">
          <Prompt
            prompt={prompt}
            handleInputChange={handleInputChange}
            handlePromptSend={handlePromptSend}
          />
        </div>
        <div className="relative h-full col-span-3 flex flex-col">
          <div className="h-full w-full p-2 z-20">
            <Select
              multiple
              options={optionsYear}
              value={year}
              onChange={(o) => setYear(o)}
              label="Year"
              label_width="60px"
            />
          </div>
          <div className="h-full w-full p-2 z-10">
            <Select
              multiple
              options={optionsConf}
              value={conf}
              onChange={(o) => setConf(o)}
              label="Conference"
              label_width="140px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
