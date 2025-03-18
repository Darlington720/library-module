import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Dashboard } from "@/components/dashboard";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_PROFILE } from "./gql/queries";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./auth/AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadMyProfile, { error }] = useLazyQuery(GET_MY_PROFILE, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (error) {
      // authContext?.setToken(null);
      console.log("error", error);
    }
  }, [error]);

  const login = async () => {
    try {
      const res2 = await loadMyProfile();

      console.log("res2", res2.data);

      if (res2.data) {
        authContext?.setUser(res2.data.my_profile);

        setIsLoading(false); // Mark authentication as complete
      } else {
        authContext?.setToken(null);
        // navigate("/login"); // Redirect if authentication fails
      }
    } catch (error) {
      console.log("eroorrrrrr", error);
      authContext?.setToken(null);
      // navigate("/login");
    }
  };

  useEffect(() => {
    login();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="nkumba-theme">
        <Dashboard />
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
