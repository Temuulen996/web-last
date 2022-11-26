import "../styles/globals.css";
import { UserStore } from "../context/user-context";
import { useEffect } from "react";
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import("flowbite/dist/flowbite")).default;
      (await import("tw-elements")).default;
    };
    use();
  }, []);
  return (
    <UserStore>
      <Component {...pageProps} />
    </UserStore>
  );
}

export default MyApp;
