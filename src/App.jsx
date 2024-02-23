import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import "./App.css";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./providers/useCartContext";
import { GoogleLogin } from "@react-oauth/google";
import { useToast } from "@/components/ui/use-toast";
import { jwtDecode } from "jwt-decode";

function App() {
  const queryClient = new QueryClient();
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  const { toast } = useToast();

  const router = createBrowserRouter([
    loginDetail ? PrivateRoutes({ loginDetail }) : {},
    ...PublicRoutes({ loginDetail }),
  ]);

  useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      const credentialResponseDecode = jwtDecode(credentialResponse.credential);
      const loginDetailRaw = {
        fullName: credentialResponseDecode?.name,
        email: credentialResponseDecode?.email,
        access_token: credentialResponseDecode?.jti,
        isVerified: credentialResponseDecode?.email_verified,
        image: credentialResponseDecode?.picture,
        _id: credentialResponseDecode?.jti,
      };

      const loginDetail = JSON.stringify(loginDetailRaw);
      localStorage.setItem("loginDetail", loginDetail);

      toast({
        title: "Success",
        description: "Logged in via google account",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Login failed",
        variant: "destructive",
      });
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <RouterProvider router={router} />
          <Toaster />
        </CartProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
