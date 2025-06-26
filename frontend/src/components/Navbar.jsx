import UserProfile from "./subcomponents/UserProfile";
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
    <div className="border border-amber-300 p-11 flex justify-between">
      <div className="font-bold text-5xl font-sans">PayTM</div>

      <div className="flex justify-around ">
        <div className="">
          <Sheet>
            <SheetTrigger >
              <Button variant="link" className="text-white" asChild>
                <span className="font-sans font-normal">Change password</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black text-white ">
              <SheetHeader>
                <SheetTitle className="text-white">Password change</SheetTitle>
                <SheetDescription>
                  Want to change password? Enter details below
                </SheetDescription>
              </SheetHeader>

            <div className="w-78   mx-3 ">
               <Label>First Name</Label> 
              <Input placeholder="john"/>
              <Label>Last Name</Label>
              <Input placeholder="doe" />
              <Label>Password</Label>
              <Input placeholder="password" />

            </div>

            </SheetContent>
          </Sheet>
        </div>
        <UserProfile />
      </div>
    </div>
  );
};

export default Navbar;
