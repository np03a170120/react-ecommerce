import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Image from "../../components/custom/Image";

export default function DashboardProducts(product) {
  const productDetail = product.product;
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() =>
          navigate(
            `/product/detail/${productDetail?.userId}/${productDetail?._id}`,
            {
              state: "",
            }
          )
        }
      >
        <Card className="w-full h-full cursor-pointer hover:shadow-lg transition ease-in-out ">
          <div className="gap-3 h-full">
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
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
