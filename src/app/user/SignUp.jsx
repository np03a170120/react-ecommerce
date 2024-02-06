import * as React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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
import { SchemaSignUp } from "./user.schema";

function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SchemaSignUp),
  });
  const onSubmit = (data) => console.log(data);
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
                <p className="text-red-600">{errors.name?.message}</p>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input {...register("email")} id="email" />
                  <p className="text-red-600">{errors.email?.message}</p>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Password</Label>
                  <Input
                    name="password"
                    {...register("password")}
                    type="password"
                    id="password"
                  />
                  <p className="text-red-600">{errors.password?.message}</p>
                </div>
              </div>
              <CardFooter className="mt-4 justify-center">
                <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default SignUp;
