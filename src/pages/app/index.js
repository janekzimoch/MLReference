import React from "react";
import BackButton from "@/components/App/BackButton";
import InputSection from "@/components/App/InputSection/InputSection";
import ResultsSection from "@/components/App/ResultsSection/ResultsSection";

function App() {
  return (
    <div className="realative container mx-auto ">
      <BackButton />
      <div className="mt-20 mx-auto max-w-[1000px]">
        <InputSection />
        <ResultsSection />
      </div>
    </div>
  );
}

App.excludeLayout = true;
export default App;
