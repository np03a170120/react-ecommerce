import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye } from "@phosphor-icons/react";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpLogin } from "../../api/requestProcessor";
import gmail from "../../assets/image/gmail_logo.svg";
import { SchemaLogin } from "./user.schema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  const { mutate: loginUserMutation, isPending } = useSignUpLogin();
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    loginUserMutation(userData, {
      onSuccess: () => {
        navigate(-1);
        navigate("/");
      },
    });
  };
  const [inputType, setInputType] = React.useState("password");

  const handlePasswordToggle = () => {
    if (inputType == "text") {
      setInputType("password");
    } else if (inputType == "password") {
      setInputType("text");
    }
  };

  const { toast } = useToast();

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const data = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${response.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        );

        const loginDetailRaw = {
          fullName: data?.data.name,
          email: data?.data.email,
          access_token: response.access_token,
          isVerified: data?.data.email_verified,
          image: data?.data.picture,
          _id: data?.data.jti,
        };
        const loginDetail = JSON.stringify(loginDetailRaw);
        localStorage.setItem("loginDetail", loginDetail);
        toast({
          title: "Success",
          description: "Logged in via google account",
          variant: "success",
        });

        navigate("/");
      } catch (err) {
        console.log(err);
      }
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
      <div className="flex justify-center items-center h-[100vh]">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>E-commerce React</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center mt-4">
              <img
                className="h-6 cursor-pointer  "
                onClick={login}
                src={gmail}
                alt=""
              />
            </div>
            <h6 className="mt-4 mb-8 font-bold">Or</h6>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register("email")} id="email" />
                  <p className="text-red-600 text-xs">
                    {errors.email?.message}
                  </p>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <div className="relative">
                    <Input
                      name="password"
                      {...register("password")}
                      type={inputType}
                      id="password"
                    />

                    <div
                      className="cursor-pointer absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2"
                      onClick={handlePasswordToggle}
                    >
                      {inputType == "password" ? (
                        <Eye size={16} />
                      ) : (
                        <EyeSlash size={16} />
                      )}
                    </div>
                  </div>

                  <p className="text-red-600 text-xs">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <CardFooter className="mt-4 justify-center flex-col gap-2">
                <Button type="submit" className="text-center">
                  {isPending === true ? (
                    <Loader2 className=" h-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
                <Button variant="link">
                  <Link to="/signup">Newbie? Sign Up </Link>
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
      <Toaster />
    </>
  );
}

export default Login;
