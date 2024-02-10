import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "@phosphor-icons/react";
import React from "react";

const AddProduct = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle size={18} className="mr-1" /> Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[620px]">
          <DialogHeader>
            <DialogTitle>Post Product</DialogTitle>
            <DialogDescription>
              Fill out all required details when posting a product and adhere to
              platform restrictions to avoid warnings.
            </DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Quantity</Label>
                <Input id="name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Category</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Price</Label>
                <Input id="name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Description</Label>
                <Textarea />
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProduct;
