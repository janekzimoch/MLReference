import React from "react";
import QASection from "@/components/App/QASection/QASection";
import BackButton from "@/components/App/BackButton";

function QA() {
  return (
    <div className="realative container mx-auto ">
      <BackButton href="/app" />
      <div className="pt-20 mx-auto h-screen max-w-[1000px]">
        <QASection />
      </div>
    </div>
  );
}

QA.excludeLayout = true;
export default QA;
