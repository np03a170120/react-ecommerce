import GlobalLayout from "../../Layout/GlobalLayout";
import { useProductList } from "../../api/requestProcessor";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

import { Suspense, lazy } from "react";

export default function Home({ loginDetail }) {
  const { data, isError } = useProductList();
  const DashboardProduct = lazy(() =>
    import("../../app/Product/DashboardProducts")
  );

  return (
    <>
      <GlobalLayout>
        <div className="container my-8">
          <div className="grid grid-cols-4 gap-4">
            {data?.data.data.map((data) => {
              const product = data;
              return (
                <>
                  <Suspense fallback={<DashboardProductsFallbackLoader />}>
                    <DashboardProduct
                      product={product}
                      loginDetail={loginDetail}
                    />
                  </Suspense>
                </>
              );
            })}
          </div>
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
