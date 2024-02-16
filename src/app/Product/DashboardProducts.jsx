import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function DashboardProducts(product) {
  const productDetail = product.product;
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);
  return (
    <>
      {loginDetail?._id == productDetail?.userId && (
        <Card className="w-full cursor-pointer">
          <div className=" gap-3 h-full">
            <img
              alt="Thumbnail"
              className="aspect-video overflow-hidden  object-cover"
              src={productDetail?.productImages[0].url}
            />
            <div className="text-left flex flex-col gap-1 leading-none px-4 py-6">
              <h3 className="text-sm font-semibold leading-none">
                {productDetail?.name}
              </h3>
              <p className="text-xs text-muted-foreground dark:text-muted-background">
                Available Quantity: {productDetail?.quantity}
              </p>
              <p className="text-sm font-semibold">Rs.{productDetail?.price}</p>
              {/* <div className=" text-sm">
                <Button size="sm">View</Button>
              </div> */}
            </div>
          </div>
        </Card>
      )}
    </>
  );
}
