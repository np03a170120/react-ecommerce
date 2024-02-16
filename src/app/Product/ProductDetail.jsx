import React from "react";
import { useParams } from "react-router-dom";
import { fetchProductDetail } from "../../api/requestProcessor";

import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ProductDetail = () => {
  let { userId, productId } = useParams();
  const { data, isPending } = fetchProductDetail({ userId, productId });
  const productDetail = data?.data.data;
  return (
    <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
      <div className="grid gap-4 md:gap-10 items-start">
        <div className="hidden md:flex items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">
              {productDetail?.name}
            </h1>
            <div className="flex items-center gap-4">
              {/* <div className="flex items-center gap-0.5">
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-primary" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              </div> */}
            </div>
            <div>
              <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
            </div>
          </div>
          <div className="text-4xl font-bold ml-auto">$99</div>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="color">
              Color
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="black"
              id="color"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-black"
              >
                <RadioGroupItem id="color-black" value="black" />
                Black
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-white"
              >
                <RadioGroupItem id="color-white" value="white" />
                White
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="color-blue"
              >
                <RadioGroupItem id="color-blue" value="blue" />
                Blue
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
              Size
            </Label>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue="m"
              id="size"
            >
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xs"
              >
                <RadioGroupItem id="size-xs" value="xs" />
                XS
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-s"
              >
                <RadioGroupItem id="size-s" value="s" />S
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-m"
              >
                <RadioGroupItem id="size-m" value="m" />M
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-l"
              >
                <RadioGroupItem id="size-l" value="l" />L
                {"\n                          "}
              </Label>
              <Label
                className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                htmlFor="size-xl"
              >
                <RadioGroupItem id="size-xl" value="xl" />
                XL
              </Label>
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">Add to cart</Button>
        </form>
        <Separator />
        <div className="grid gap-4 text-sm leading-loose">
          <p>
            Introducing the Acme Prism T-Shirt, a perfect blend of style and
            comfort for the modern individual. This tee is crafted with a
            meticulous composition of 60% combed ringspun cotton and 40%
            polyester jersey, ensuring a soft and breathable fabric that feels
            gentle against the skin.
          </p>
          <p>
            The design of the Acme Prism T-Shirt is as striking as it is
            comfortable. The shirt features a unique prism-inspired pattern that
            adds a modern and eye-catching touch to your ensemble.
          </p>
        </div>
      </div>
      <div className="flex md:hidden items-start">
        <div className="grid gap-4">
          <h1 className="font-bold text-2xl sm:text-3xl">
            Acme Circles T-Shirt
          </h1>
          <div>
            <p>60% combed ringspun cotton/40% polyester jersey tee.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div> */}
          </div>
        </div>
        <div className="text-4xl font-bold ml-auto">$99</div>
      </div>
      <div className="grid gap-4">
        <img
          alt="Product Image"
          className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
          height={600}
          src="/placeholder.svg"
          width={600}
        />
        <div className="hidden md:flex gap-4 items-start">
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-square object-cover"
              height={100}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 1</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-square object-cover"
              height={100}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 2</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-square object-cover"
              height={100}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 3</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-square object-cover"
              height={100}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 4</span>
          </button>
          <button className="border hover:border-gray-900 rounded-lg overflow-hidden transition-colors dark:hover:border-gray-50">
            <img
              alt="Preview thumbnail"
              className="aspect-square object-cover"
              height={100}
              src="/placeholder.svg"
              width={100}
            />
            <span className="sr-only">View Image 4</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
