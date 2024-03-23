import React, { useEffect } from "react";

import { useLocation, useSearchParams } from "react-router-dom";
import GlobalLayout from "../../Layout/GlobalLayout";
import { featchSearchProductViaUrl } from "../../api/requestProcessor";
import DashboardProducts from "../../app/Product/DashboardProducts";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

const SearchProduct = ({ loginDetail }) => {
  let productUrl = useLocation();

  const { data, isPending, isError, isFetchedAfterMount, refetch, isFetching } =
    featchSearchProductViaUrl(productUrl.search);

  const productList = data?.data.data.filter(
    (item) => item.userId !== loginDetail?._id
  );

  useEffect(() => {
    refetch();
  }, [productUrl.search]);

  return (
    <GlobalLayout>
      <>
        <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
          {productList?.map((item, index) => {
            const product = item;
            return (
              <div key={index}>
                {isFetching ? (
                  <DashboardProductsFallbackLoader />
                ) : (
                  <DashboardProducts
                    product={product}
                    loginDetail={loginDetail}
                  />
                )}
              </div>
            );
          })}
        </div>
      </>
      {productList?.length == 0 && (
        <>
          {" "}
          <h6> No product found</h6>
        </>
      )}

      {isError && (
        <>
          <h1>Error</h1>
        </>
      )}
    </GlobalLayout>
  );
};

export default SearchProduct;
