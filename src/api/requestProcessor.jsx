import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
  categoriesList: {
    url: "categories",
    key: "CATEGORIES_LIST_KEY",
  },
  getProducts: {
    url: "products",
    key: "PRODUCTS_LIST_KEY",
  },
  getProductDetail: {
    url: "product/details/",
    key: "PRODUCT_DETAIL_KEY",
  },
  placeOrder: {
    url: "purchase-products",
    key: "PURCHASE_KEY",
  },
  userProducts: {
    url: "user-products",
    key: "USER_PRODUCT_KEY",
  },
  editUserProduct: {
    url: "user-product",
    key: "EDIT_USER_PRODUCT",
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
        _id: data.data?.data.data._id,
      };
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
  const { toast } = useToast();
  return useMutation({
    mutationKey: userURLs.postProduct.key,
    mutationFn({ productData, loginDetail }) {
      return axiosClient.post(userURLs.postProduct.url, productData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
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

export const usePurchaseProduct = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: userURLs.placeOrder.key,
    mutationFn({ purchaseDetail, loginDetail }) {
      return axiosClient.post(userURLs.placeOrder.url, purchaseDetail, {
        headers: {
          // "Content-Type": "multipart/form-data",
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

export const useCategoryList = () => {
  return useQuery({
    queryFn: async () => await axiosClient.get(userURLs.categoriesList.url),
    queryKey: [userURLs.categoriesList.key],
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 60 * 1000,
  });
};

export const useProductList = () => {
  const { toast } = useToast();
  return useQuery({
    queryFn: async () => await axiosClient.get(userURLs.getProducts.url),
    queryKey: [userURLs.getProducts.key],
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 60 * 1000,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
};

export const fetchProductDetail = ({ userId, productId }) => {
  const { toast } = useToast();
  return useQuery({
    queryFn: async () =>
      await axiosClient.get(
        `${userURLs.getProductDetail.url}${userId}/${productId}`
      ),
    queryKey: [userURLs.getProductDetail.key],
    cacheTime: 0,
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });
};
export const fetchUserProducts = ({ loginDetail }) => {
  const { toast } = useToast();
  return useQuery({
    queryFn: async () =>
      await axiosClient.get(`${userURLs.userProducts.url}/${loginDetail._id}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${loginDetail.access_token}`,
        },
      }),
    queryKey: [userURLs.userProducts.key],
    onError: (error) => {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
      });
    },
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    retry: false,
    staleTime: 60 * 1000,
  });
};

export const usePurchaseEditProduct = () => {
  const { toast } = useToast();
  return useMutation({
    mutationKey: userURLs.editUserProduct.key,
    mutationFn({ productEditedData, loginDetail, userId, productId }) {
      return axiosClient.put(
        `${userURLs.editUserProduct.url}/${userId}/${productId}`,
        productEditedData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${loginDetail.access_token}`,
          },
        }
      );
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
