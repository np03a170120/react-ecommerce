import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  CheckCircle,
  CodesandboxLogo,
  MagnifyingGlass,
  WarningCircle,
} from "@phosphor-icons/react";
import { CreditCard, LogOut, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchSearchProduct } from "../api/requestProcessor";
import AddProduct from "../app/Product/AddProduct";
import Cart from "../app/user/Cart";
import logo from "../assets/image/logo.png";
import { twMerge } from "tailwind-merge";

const Navbar = ({ loginDetail }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const productSearchName = searchParams.get("productName");

  const profileImage = loginDetail?.image;

  const { data, refetch, isRefetching, isError } = fetchSearchProduct({
    searchValue,
    enabled: true,
  });

  function debounce(func, delay) {
    let timeoutId;
    return function () {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, arguments);
      }, delay);
    };
  }

  useEffect(() => {
    const debouncedRefetch = debounce(refetch, 200);
    debouncedRefetch();
  }, [searchValue]);

  useEffect(() => {
    setSearchResult(data?.data.data);
  }, [data, isRefetching]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchParams({ productName: searchValue });
    navigate(`/products?productName=${encodeURIComponent(searchValue)}`);
  };

  const [focused, setFocused] = useState(false);

  const handleKeyDown = (e) => {
    const key = e.key;
    if (key === "Enter") {
      handleSearchSubmit();
    }
  };

  useEffect(() => {
    setFocused(false);
  }, [productSearchName]);

  const handleLogout = () => {
    localStorage.clear("loginDetail");
    localStorage.clear("cartItems");
    navigate("/");
    navigate(0);
  };

  return (
    <>
      <div className="border-b shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] mb-6 py-3 sticky top-0 z-50 bg-white">
        <div className="container flex items-center justify-between ">
          <img
            className="h-[40px] cursor-pointer"
            onClick={() => navigate("/")}
            src={logo}
            alt=""
          />
          <div
            onClick={() => setFocused(true)}
            className="flex relative w-full  items-center space-x-2 max-w-[40rem]"
          >
            <Input
              onFocus={() => setFocused(true)}
              key={productSearchName}
              onKeyDown={handleKeyDown}
              defaultValue={productSearchName}
              onChange={(e) => handleSearch(e)}
              type="text"
              placeholder="Search..."
            />
            <Button variant="secondary" onClick={handleSearchSubmit}>
              <MagnifyingGlass size={18} />
            </Button>

            <div
              onMouseLeave={() => setFocused(false)}
              className={twMerge(
                "absolute  rounded-sm top-12  p-2 left-[-0.5rem] w-[36rem]  bg-white shadow-xl ",
                focused ? "opacity-100 block" : "opacity-0 hidden"
              )}
            >
              <div className=" h-[12rem] overflow-y-scroll">
                <ul>
                  {searchResult?.map((item) => (
                    <>
                      <h6
                        onClick={() => {
                          navigate(`/products?productName=${item.name}`),
                            setFocused(true);
                        }}
                        className={`text-sm mb-2 cursor-pointer hover:text-gray-500 `}
                      >
                        {item.name}
                      </h6>
                    </>
                  ))}
                  {searchResult?.length == 0 && <h6>No Result found</h6>}
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-8 items-center">
            {loginDetail && <AddProduct loginDetail={loginDetail} />}
            {!loginDetail ? (
              <Button variant="link">
                <>
                  <Link className="font-medium" to="/login">
                    Login
                  </Link>
                </>
              </Button>
            ) : null}
            <Cart loginDetail={loginDetail?.access_token} />
            {!loginDetail ? (
              <>
                <Button>
                  <Link to="/signup"> Sign Up</Link>
                </Button>
              </>
            ) : (
              <>
                <div className="relative">
                  <div className="absolute right-0 bottom-0 z-10">
                    {loginDetail.isVerified ? (
                      <CheckCircle
                        weight="fill"
                        className="text-green-600"
                        size={18}
                      />
                    ) : (
                      <WarningCircle
                        weight="fill"
                        className="text-yellow-500"
                        size={18}
                      />
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar
                        className={
                          "cursor-pointer hover:shadow-lg border-4 hover:border-4 transition ease-in-out "
                        }
                      >
                        <AvatarImage src={profileImage} />
                        <AvatarFallback>Season</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ">
                      <DropdownMenuLabel>My Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <Link to={"/user/profile/add-product"}>
                          <DropdownMenuItem>
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          onClick={() => navigate("/user/profile/my-products")}
                        >
                          <CodesandboxLogo className="mr-2 h-4 w-4" />
                          <span>Products</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => navigate("/product/checkout")}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
