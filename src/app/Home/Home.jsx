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
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { CreditCard, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Home({ isAuthenticated }) {
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
                  {!isAuthenticated ? (
                    <>
                      <Link to="/login">Login</Link>
                    </>
                  ) : null}
                </Button>
                {!isAuthenticated ? (
                  <>
                    <Button>
                      <Link to="/signup"> Sign Up</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>Season</AvatarFallback>
                        </Avatar>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56">
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
