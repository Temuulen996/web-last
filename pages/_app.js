import "../styles/globals.css";

import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import("flowbite/dist/flowbite")).default;
      (await import("tw-elements")).default;
    };
    use();
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
