import React from "react";
import ConfLogo from "./ConferenceLogo";
import ConferencLogosStack from "./ConferencLogosStack";
import nips_logo from "../../../public/conference_logos/nips-logo.svg";
import icml_logo from "../../../public/conference_logos/icml-logo.svg";
import iclr_logo from "../../../public/conference_logos/iclr-logo.svg";
import acl_logo from "../../../public/conference_logos/acl-logo.svg";
import amacl_logo from "../../../public/conference_logos/amacl-logo.svg";
import emnlp_logo from "../../../public/conference_logos/emnlp-logo.svg";
import cvpr_logo from "../../../public/conference_logos/cvpr-logo.svg";
import eccv_logo from "../../../public/conference_logos/eccv-logo.svg";
import iccv_logo from "../../../public/conference_logos/iccv-logo.svg";

const conferences = [
  nips_logo,
  icml_logo,
  iclr_logo,
  acl_logo,
  amacl_logo,
  emnlp_logo,
  cvpr_logo,
  eccv_logo,
  iccv_logo,
];
const numLogos = 27;
const randomIndexes = Array.from({ length: numLogos }, () =>
  Math.floor(Math.random() * conferences.length)
);

const randomLogoDelay = Array.from({ length: conferences.length }, () =>
  Math.floor(Math.random() * 20)
);

export default function ConferenceLogoAnimation() {
  return (
    <div className="grid grid-cols-5">
      <div className="grid grid-rows-5">
        <div></div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[0]]}
            logo2={conferences[randomIndexes[1]]}
            logo3={conferences[randomIndexes[2]]}
            delay_max={randomLogoDelay[0]}
          />
        </div>
        <div></div>
        <div></div>
      </div>
      <div className="grid grid-rows-5">
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[3]]}
            logo2={conferences[randomIndexes[4]]}
            logo3={conferences[randomIndexes[5]]}
            delay_max={randomLogoDelay[1]}
          />
        </div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[6]]}
            logo2={conferences[randomIndexes[7]]}
            logo3={conferences[randomIndexes[8]]}
            delay_max={randomLogoDelay[2]}
          />
        </div>
        <div></div>
      </div>
      <div className="grid grid-rows-5">
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[9]]}
            logo2={conferences[randomIndexes[10]]}
            logo3={conferences[randomIndexes[11]]}
            delay_max={randomLogoDelay[3]}
          />
        </div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[12]]}
            logo2={conferences[randomIndexes[13]]}
            logo3={conferences[randomIndexes[14]]}
            delay_max={randomLogoDelay[4]}
          />
        </div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[15]]}
            logo2={conferences[randomIndexes[16]]}
            logo3={conferences[randomIndexes[17]]}
            delay_max={randomLogoDelay[5]}
          />
        </div>
      </div>
      <div className="grid grid-rows-5">
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[18]]}
            logo2={conferences[randomIndexes[19]]}
            logo3={conferences[randomIndexes[20]]}
            delay_max={randomLogoDelay[6]}
          />
        </div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[21]]}
            logo2={conferences[randomIndexes[22]]}
            logo3={conferences[randomIndexes[23]]}
            delay_max={randomLogoDelay[7]}
          />
        </div>
        <div></div>
      </div>
      <div className="grid grid-rows-5">
        <div></div>
        <div></div>
        <div>
          <ConferencLogosStack
            logo1={conferences[randomIndexes[24]]}
            logo2={conferences[randomIndexes[25]]}
            logo3={conferences[randomIndexes[26]]}
            delay_max={randomLogoDelay[8]}
          />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
