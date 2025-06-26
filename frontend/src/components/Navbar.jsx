import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-label";
const Navbar = () => {
  return (
    <div>
      <div className="border border-amber-500 rounded p-11 flex justify-between">
        <div className="font-bold text-5xl font-sans">
          <div>PayTM </div>
          <div className="font-light text-xl font-sans">
            Your scamming payment app :D
          </div>
        </div>

        <div className="flex justify-around text-2xl">
          <div>
            <Sheet>
              <SheetTrigger>
                <Button
                  variant="primary"
                  className="text-white hover:cursor-pointer text-xl pb-3"
                  asChild
                >
                  <span>Change password</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black text-white ">
                <SheetHeader>
                  <SheetTitle className="text-white">
                    Password change
                  </SheetTitle>
                  <SheetDescription>
                    Want to change password? Enter details below
                  </SheetDescription>
                </SheetHeader>

                <div className="w-78   mx-3 ">
                  <Label>First Name</Label>
                  <Input placeholder="john" />
                  <Label>Last Name</Label>
                  <Input placeholder="doe" />
                  <Label>Password</Label>
                  <Input placeholder="password" />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div>Username</div>
        </div>
      </div>
      <div>
        <hr className="w-screen h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </div>
  );
};

export default Navbar;
