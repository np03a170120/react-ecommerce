import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Badge } from "@/components/ui/badge";

import { MagnifyingGlass } from "@phosphor-icons/react";
import { CreditCard, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import avatar from "../../assets/image/avatar.jpeg";

export default function Home({ loginDetail }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear("access_token");
    navigate(0);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full rounded-lg border"
    >
      <ResizablePanel defaultSize={10}>
        <div className="flex h-[100vh] items-center justify-center p-6">
          <span className="font-semibold">list of the categories</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={8}>
            <div className="flex h-full items-center justify-between p-6">
              <span className="font-semibold">x_Naive_x</span>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Search..." />
                <Button variant="secondary">
                  <MagnifyingGlass size={18} />
                </Button>
              </div>
              <div className="flex gap-3">
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
                      <HoverCard>
                        <HoverCardTrigger
                          align="start"
                          className="cursor-pointer hover:underline text-md"
                        >
                          <div>
                            <Badge variant="default" className={"text-xs"}>
                              {loginDetail.isVerified ? "verified" : "pending"}
                            </Badge>
                          </div>
                          {loginDetail.fullName}
                        </HoverCardTrigger>
                        <HoverCardContent align="start">
                          <ul className="text-justify text-sm">
                            <li>{loginDetail.mobileNum}</li>
                            <li> {loginDetail.email}</li>
                          </ul>
                        </HoverCardContent>
                      </HoverCard>
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
                    </div>
                  </>
                )}
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={100}>
            <div className="flex h-full w-full items-center justify-center p-6">
              <span className="font-semibold">Products here</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
