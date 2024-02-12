import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "./axios";

const userURLs = {
  signupUser: {
    url: "auth/signup-user",
    key: "SIGNUP_KEY",
  },
  loginUser: {
    url: "auth/login",
    key: "LOGIN_KEY",
  },
  postProduct: {
    url: "add-product",
    key: "POST_PRODUCT_KEY",
  },
};

export const useSignUpUser = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  return useMutation({
    mutationKey: userURLs.signupUser.key,
    mutationFn(userData) {
      return axiosClient.post(userURLs.signupUser.url, userData);
    },
    onSuccess: (data) => {
      navigate("/login");
      toast({
        title: "Success",
        description: data.data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
};

export const useSignUpLogin = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: userURLs.loginUser.key,
    mutationFn(userData) {
      return axiosClient.post(userURLs.loginUser.url, userData);
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message,
        variant: "success",
      });
      const loginDetailRaw = {
        fullName: data.data?.data.data.fullName,
        email: data.data?.data.data.email,
        access_token: data.data?.data.data.access_token,
        isVerified: data.data?.data.data.isVerified,
      };
      console.log(data);
      const loginDetail = JSON.stringify(loginDetailRaw);
      localStorage.setItem("loginDetail", loginDetail);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
};

export const usePostProduct = () => {
  return useMutation({
    mutationKey: userURLs.postProduct.key,
    mutationFn({ productData, loginDetail }) {
      return axiosClient.post(userURLs.postProduct.url, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${loginDetail.access_token}`,
        },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: data.data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
};
