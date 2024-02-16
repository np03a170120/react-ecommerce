import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { EnvelopeSimple, MagnifyingGlass } from "@phosphor-icons/react";
import { CreditCard, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../../assets/image/avatar.jpeg";
import logo from "../../assets/image/logo.png";
import AddProduct from "../Product/AddProduct";
import DashboardProducts from "../Product/DashboardProducts";
import { useProductList } from "../../api/requestProcessor";

export default function Home({ loginDetail }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("loginDetail");
    navigate(0);
  };

  const { data } = useProductList();

  return (
    <div className="container bg-white drop-shadow-md rounded-lg ">
      <ResizablePanelGroup direction="horizontal" className="w-full ">
        <ResizablePanel defaultSize={8}>
          <div className="flex h-[100vh] items-center justify-center p-6">
            <span className="font-semibold">list of the categories</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={8}>
              <div className="flex h-full items-center justify-between ">
                <img className="h-[90px]" src={logo} alt="" />
                <div className="flex w-full max-w-[40rem] items-center space-x-2">
                  <Input type="email" placeholder="Search..." />
                  <Button variant="secondary">
                    <MagnifyingGlass size={18} />
                  </Button>
                </div>

                <div className="flex gap-3 items-center">
                  {loginDetail && <AddProduct loginDetail={loginDetail} />}
                  <Button variant="plain">
                    {!loginDetail ? (
                      <>
                        <Link to="/login">Login</Link>
                      </>
                    ) : null}
                  </Button>
                  {!loginDetail ? (
                    <>
                      <Button>
                        <Link to="/signup"> Sign Up</Link>
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2 items-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Avatar className={"cursor-pointer"}>
                              <AvatarImage src={avatar} />
                              <AvatarFallback>Season</AvatarFallback>
                            </Avatar>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 ">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                              <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <LogOut className="mr-2 h-4 w-4" />
                              <span onClick={handleLogout}>Log out</span>
                              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <HoverCard>
                          <HoverCardTrigger
                            align="start"
                            className="cursor-pointer hover:underline text-sm font-semibold		"
                          >
                            <div>
                              <Badge variant="success">
                                {loginDetail.isVerified
                                  ? "Verified"
                                  : "pending"}
                              </Badge>
                            </div>
                            {loginDetail.fullName}
                          </HoverCardTrigger>
                          <HoverCardContent align="start">
                            <ul className="text-justify text-sm">
                              <li>{loginDetail.mobileNum}</li>
                              <li>
                                <EnvelopeSimple size={16} />

                                {loginDetail.email}
                              </li>
                            </ul>
                          </HoverCardContent>
                        </HoverCard>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={100}>
              <div className="container my-8">
                <div class="grid grid-cols-4 gap-4">
                  {data?.data.data.map((data) => {
                    const product = data;
                    // console.log(loginDetail, "login details");
                    return (
                      <>
                        <DashboardProducts
                          product={product}
                          loginDetail={loginDetail}
                        />
                      </>
                    );
                  })}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
