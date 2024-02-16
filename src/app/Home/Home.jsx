import { Loader2 } from "lucide-react";
import GlobalLayout from "../../Layout/GlobalLayout";
import { useProductList } from "../../api/requestProcessor";
import DashboardProducts from "../Product/DashboardProducts";

export default function Home({ loginDetail }) {
  const { data, isPending } = useProductList();

  return (
    <>
      <GlobalLayout>
        <div className="container my-8">
          <div className="grid grid-cols-4 gap-4">
            {data?.data.data.map((data) => {
              const product = data;
              return (
                <>
                  {!isPending ? (
                    <>
                      {" "}
                      <DashboardProducts
                        product={product}
                        loginDetail={loginDetail}
                      />
                    </>
                  ) : (
                    <>
                      <Loader2 className=" h-4 animate-spin" />
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
      </GlobalLayout>
    </>
  );
}
