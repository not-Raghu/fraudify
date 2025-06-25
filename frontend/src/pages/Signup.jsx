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

export default function Signup() {
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
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="example@gmail.com" required />
                <Label>First Name</Label>
                <Input type="text" placeholder="john" required />
                <Label>Last Name</Label>
                <Input type="text" placeholder="doe" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input type="text" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
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
