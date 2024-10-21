import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();

  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if(token === 'EXPIRED'){
      submit(null, { action: "/logut", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    

    // So this timer will expire after 1 hour, So then I will clear the token inside the localStorage.
    setTimeout(() => {
      // Here we can submit the logout form using useSum=bmit() hook. Once the timer expired.

      submit(null, { action: "/logut", method: "post" });   // This logic will alone not work as if the user reloads the page then the token will be resetted.
    }, tokenDuration);
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
