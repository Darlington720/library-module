import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ApolloSetup from "./ApolloSetup.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloSetup>
        <App />
      </ApolloSetup>
    </AuthProvider>
  </StrictMode>
);
