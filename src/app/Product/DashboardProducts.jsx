import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Image from "../../components/custom/Image";

export default function DashboardProducts(product) {
  const productDetail = product.product;
  const loginDetailRaw = localStorage.getItem("loginDetail");
  const loginDetail = JSON.parse(loginDetailRaw);

  return (
    <>
      {loginDetail?._id !== productDetail?.userId && (
        <Link
          to={`/product/detail/${productDetail?.userId}/${productDetail?._id}`}
        >
          <Card className="w-full cursor-pointer hover:shadow-lg transition ease-in-out delay-150">
            <div className=" gap-3 h-full">
              <Image
                className={"aspect-video overflow-hidden  object-cover "}
                alt={productDetail?.name}
                src={productDetail?.productImages[0]?.url}
              />
              <div className="text-left flex flex-col gap-1 leading-none px-4 py-6">
                <h3 className="text-sm font-medium leading-none">
                  {productDetail?.name}
                </h3>
                <p className="text-xs text-muted-foreground dark:text-muted-background">
                  Available Quantity: {productDetail?.quantity}
                </p>
                <p className="text-sm font-medium">Rs.{productDetail?.price}</p>
                {/* <div className=" text-sm">
                <Button size="sm">View</Button>
              </div> */}
              </div>
            </div>
          </Card>
        </Link>
      )}
    </>
  );
}
