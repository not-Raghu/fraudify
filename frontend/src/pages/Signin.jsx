import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE;

  async function handleSubmit(e) {
    //also add a useEffect to grab token and and make a backendcall for direct login
    console.log(API_BASE)
    e.preventDefault();
    try {
      const signupResponse = await axios.post(
        API_BASE + "/api/v1/user/signin",
        {
          email: email,
          password,
        }
      );

      toast.success(signupResponse.data.message);
      localStorage.setItem("token", signupResponse.data.token);
      history("/dashboard");
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg);
    }
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>Enter your details to Sign in</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={email}
                  placeholder="example@gmail.com"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input
                  type="text"
                  value={password}
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full">
            Sign in
          </Button>
          <Label>Don't have an account?</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/signup">
                <Button variant="link" asChild>
                  <span>sign up</span>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              If you don't have an account, please sign up :D
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </div>
  );
}
