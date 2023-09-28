import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import NavBar from "@/components/NavBar_Components/NavBar";
import Background from "@/components/Background";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  function getLayout(page) {
    if (page.type.excludeLayout) {
      return <Background>{page} </Background>;
    }
    return (
      <Background footerImg={true}>
        <NavBar>{page}</NavBar>
      </Background>
    );
  }
  return (
    <div className={`${outfit.className} overflow-x-hidden`}>
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
