import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusCircle } from "@phosphor-icons/react";

import React, { useState } from "react";
import AddProductForm from "./Form/ProductForm";

const AddProduct = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog className="" open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="font-medium">
            <PlusCircle size={18} className="mr-1 " /> Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="test">
          <AddProductForm />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProduct;
