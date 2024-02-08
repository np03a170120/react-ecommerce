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
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { SchemaLogin } from "./user.schema";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });
  const [loading, setLoading] = React.useState(false);
  const BASE_URL = "https://ecommerce-backend-gr3e.onrender.com/api/";

  const [status, setStatus] = React.useState("");
  const { toast } = useToast();

  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    try {
      setLoading(true);
      const response = axios
        .post(`${BASE_URL}auth/login`, userData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem(
              "access_token",
              response.data?.data.data.access_token
            );
            toast({
              title: "Success",
              description: response.data?.message,
              variant: "success",
            }),
              navigate("/dashboard");
          }
        })
        .catch((error) =>
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
          })
        )
        .finally(() => setLoading(false));
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>E-commerce React</CardDescription>
          </CardHeader>
          <CardContent>
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
                  <Input
                    name="password"
                    {...register("password")}
                    type="password"
                    id="password"
                  />
                  <p className="text-red-600 text-xs">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <CardFooter className="mt-4 justify-center flex-col gap-2">
                <Button type="submit" className="text-center">
                  {loading === true ? (
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

      {status ? <h1>{status}</h1> : null}
    </>
  );
}

export default Login;
