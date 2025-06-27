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
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const history = useNavigate();

  const updateProfile = async () => {
    console.log(firstName, lastName, password);
    const token = localStorage.getItem("token"); //send authorization token when a route is protected
    axios
      .put(
        "http://localhost:3000/api/v1/user",
        {
          firstName: firstName,
          lastName: lastName,
          password: password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        toast("udpated successfully , refresh to see the changes");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="rounded p-11 flex justify-between">
        <div className="font-bold text-5xl font-sans">
          <div>Fraudify</div>
          <div className="font-light text-xl font-sans">
            Toally a legit bank, Trust Bro :D
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
                  <span>Update profile</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black text-white ">
                <SheetHeader>
                  <SheetTitle className="text-white">Update details</SheetTitle>
                  <SheetDescription>
                  enter password too again or else it won't work  🔫
                  </SheetDescription>
                </SheetHeader>

                <div className="w-78   mx-3 ">
                  <Label>First Name</Label>
                  <Input
                    placeholder="john"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                  />
                  <Label>Last Name</Label>
                  <Input
                    placeholder="doe"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                  />
                  <Label>Password</Label>
                  <Input
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <Button
                  variant="secondary"
                  className="w-56 mx-14"
                  onClick={updateProfile}
                >
                  change
                </Button>
              </SheetContent>
            </Sheet>
          </div>
          <div>
            {user && (
              <p>
                {user.firstName} {user.lastName}
              </p>
            )}
          </div>
          <div className="my-1.5 mx-3">
            <div className="text-white hover:cursor-pointer">
              <LogOut
                onClick={() => {
                  localStorage.removeItem("token");
                  history("/signin");
                  toast.success("logged out successfully!");
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <hr className="w-screen h-px my-4 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      </div>
    </div>
  );
};

export default Navbar;
