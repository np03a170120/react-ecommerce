import React, { useEffect } from "react";

import { useLocation } from "react-router-dom";
import GlobalLayout from "../../Layout/GlobalLayout";
import { featchSearchProductViaUrl } from "../../api/requestProcessor";
import DashboardProducts from "../../app/Product/DashboardProducts";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

const SearchProduct = ({ loginDetail }) => {
  let productUrl = useLocation();
  const { data, isPending, isError, isFetchedAfterMount, refetch } =
    featchSearchProductViaUrl(productUrl.search);

  const productList = data?.data.data.filter(
    (item) => item.userId !== loginDetail?._id
  );

  useEffect(() => {
    refetch();
  }, [productUrl.search]);

  return (
    <GlobalLayout>
      {isFetchedAfterMount || isPending ? (
        <>
          <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-4">
            {productList?.map((item, index) => {
              const product = item;
              return (
                <div key={index}>
                  <DashboardProducts
                    product={product}
                    loginDetail={loginDetail}
                  />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <DashboardProductsFallbackLoader />
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
