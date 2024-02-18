import GlobalLayout from "../../Layout/GlobalLayout";
import { useProductList } from "../../api/requestProcessor";
import { DashboardProductsFallbackLoader } from "../../components/FallbackLoader/DashboardProductsFallbackLoader";

import DashboardProducts from "../../app/Product/DashboardProducts";

export default function Home({ loginDetail }) {
  const { data, isError, isFetching, isPending } = useProductList();

  return (
    <>
      <GlobalLayout>
        <div className="container my-8">
          <div className="grid grid-cols-4 gap-4">
            {data?.data.data.map((data) => {
              const product = data;
              return (
                <>
                  {isFetching || isPending ? (
                    <DashboardProductsFallbackLoader />
                  ) : (
                    <DashboardProducts
                      product={product}
                      loginDetail={loginDetail}
                    />
                  )}
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
