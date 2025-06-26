import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';


export default function Signup() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate()  

  async function handleSubmit() {
    //also add a useEffect to grab token and and make a backendcall for direct login     
    try {
      const signupResponse = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        {
          username: email,
          firstName,
          lastName,
          password,
        }
      );

      toast.success(signupResponse.data.message);
      localStorage.setItem("token" , signupResponse.data.token);
    } catch (error) {
      const errorMsg = error?.response?.data?.message;
      toast.error(errorMsg);
    }
    history('/dashboard');
  }

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>Enter your details to Sign up</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
                <Label>First Name</Label>
                <Input
                  type="text"
                  placeholder="john"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  required
                />
                <Label>Last Name</Label>
                <Input
                  type="text"
                  placeholder="doe"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required
                />
                <Label>Password</Label>
                <Input
                  type="text"
                  placeholder="password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleSubmit} className="w-full">
            Sign up
          </Button>
          <Label>already have an account?</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/signin">
                <Button variant="link" asChild>
                  <span>sign in</span>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>
              Already have an account? sign up :D
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </div>
  );
}
