import GlobalLayout from "../../Layout/GlobalLayout";
import { useProductList } from "../../api/requestProcessor";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

import { Suspense, lazy } from "react";
import Banner from "./Banner";

export default function Home({ loginDetail }) {
  const { data, isError, isPending } = useProductList();
  const DashboardProduct = lazy(() =>
    import("../../app/Product/DashboardProducts")
  );

  return (
    <>
      <GlobalLayout>
        <Banner />
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
          {data?.data.data.map((data, index) => {
            const product = data;
            return (
              <div key={index}>
                {isPending && <DashboardProductsFallbackLoader />}
                <Suspense fallback={<DashboardProductsFallbackLoader />}>
                  <DashboardProduct
                    product={product}
                    loginDetail={loginDetail}
                  />
                </Suspense>
              </div>
            );
          })}
        </div>
        {isError && (
          <>
            <h1>Error</h1>
          </>
        )}
      </GlobalLayout>
    </>
  );
}
