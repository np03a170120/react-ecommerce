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
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useSignUpLogin } from "../../api/requestProcessor";
import { SchemaLogin } from "./user.schema";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  const { mutate: loginUserMutation, isLoading: loading } = useSignUpLogin();

  const onSubmit = (formData) => {
    const userData = {
      email: formData.email,
      password: formData.password,
    };
    loginUserMutation(userData);
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
    </>
  );
}

export default Login;
