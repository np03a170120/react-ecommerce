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
import { useSignUpUser } from "../../api/requestProcessor";
import { SchemaSignUp } from "./user.schema";
import { Eye, EyeSlash } from "@phosphor-icons/react";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaSignUp),
  });

  const { mutate: signUpUserMutation, isPending } = useSignUpUser();

  const onSubmit = (formData) => {
    const userData = {
      fullName: formData.name,
      mobileNum: formData.phone,
      email: formData.email,
      password: formData.password,
    };
    signUpUserMutation(userData);
  };

  const [inputType, setInputType] = React.useState("password");

  const handlePasswordToggle = () => {
    if (inputType == "text") {
      setInputType("password");
    } else if (inputType == "password") {
      setInputType("text");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-[100vh]">
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
                <Button type="submit">
                  {isPending === true ? (
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
    </>
  );
}

export default SignUp;
