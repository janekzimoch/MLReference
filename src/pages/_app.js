import "@/styles/globals.css";
import { Outfit } from "next/font/google";
import NavBar from "../components/NavBar_Components/NavBar";
import Background from "../components/Background";

const outfit = Outfit({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <div className={outfit.className}>
      <Background>
        <NavBar>
          <Component {...pageProps} />
        </NavBar>
      </Background>
    </div>
  );
}
