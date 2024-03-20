import React, { useEffect } from "react";

import { Suspense, lazy } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import GlobalLayout from "../../Layout/GlobalLayout";
import { featchSearchProductViaUrl } from "../../api/requestProcessor";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

const SearchProduct = ({ loginDetail }) => {
  let productUrl = useLocation();
  const navigate = useNavigate();
  const { data, isPending, isError, isFetchedAfterMount, refetch } =
    featchSearchProductViaUrl(productUrl.search);

  const [searchParams, setSearchParams] = useSearchParams();
  const productSearchName = searchParams.get("productName");

  const DashboardProduct = lazy(() =>
    import("../../app/Product/DashboardProducts")
  );

  const productList = data?.data.data.filter(
    (item) => item.userId !== loginDetail?._id
  );

  useEffect(() => {
    localStorage.setItem("search", productSearchName);
    refetch();
  }, [productUrl.search]);

  return (
    <GlobalLayout>
      {isFetchedAfterMount ? (
        <>
          <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
            {productList?.map((item, index) => {
              const product = item;
              return (
                <div key={index}>
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
        </>
      ) : null}
      {isError && (
        <>
          <h1>Error</h1>
        </>
      )}
    </GlobalLayout>
  );
};

export default SearchProduct;
