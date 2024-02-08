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
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import { SchemaSignUp } from "./user.schema";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaSignUp),
  });

  const BASE_URL = "https://ecommerce-backend-gr3e.onrender.com/api/";

  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const onSubmit = (formData) => {
    const userData = {
      fullName: formData.name,
      mobileNum: formData.phone,
      email: formData.email,
      password: formData.password,
    };
    try {
      setLoading(true);
      const response = axios
        .post(`${BASE_URL}auth/signup-user`, userData)

        .then((response) =>
          toast({
            title: "Success",
            description: response.data?.message,
            variant: "success",
          })
        )
        .then(() => reset())
        .then(() => navigate("/login"))
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
            <CardTitle>Sign Up </CardTitle>
            <CardDescription>E-commerce React</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="userName">Full Name</Label>
                  <Input {...register("name")} id="userName" type="text" />
                </div>
                <p className="text-red-600 text-xs">{errors.name?.message}</p>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register("email")} id="email" />
                  <p className="text-red-600 text-xs">
                    {errors.email?.message}
                  </p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input type="number" {...register("phone")} id="email" />
                  <p className="text-red-600 text-xs">
                    {errors.phone?.message}
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
                <Button type="submit">
                  {loading === true ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </Button>
                <Button variant="link">
                  <Link to="/login">
                    Already have an account? <b>Login</b>{" "}
                  </Link>
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

export default SignUp;
