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
import { Link, useNavigate } from "react-router-dom";

import AddProduct from "../app/Product/AddProduct";
import Cart from "../app/user/Cart";
import logo from "../assets/image/logo.png";

const Navbar = ({ loginDetail }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("loginDetail");
    localStorage.clear("cartItems");
    navigate("/");
    navigate(0);
  };
  const profileImage = loginDetail?.image;

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
          <div className="flex w-full  items-center space-x-2 max-w-[40rem]">
            <Input type="text" placeholder="Search..." />
            <Button variant="secondary">
              <MagnifyingGlass size={18} />
            </Button>
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
                        <DropdownMenuItem>
                          <CodesandboxLogo className="mr-2 h-4 w-4" />
                          <span>Products</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
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
