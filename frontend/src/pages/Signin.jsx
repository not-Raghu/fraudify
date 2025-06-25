import { Link } from "react-router";
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

export default function Signin() {
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
                <Label htmlFor="email">Email</Label>
                <Input type="email" placeholder="example@gmail.com" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label>Password</Label>
                </div>
                <Input type="text" placeholder="password" required />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
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
              If you don't have an account, please sign up 😄
            </HoverCardContent>
          </HoverCard>
        </CardFooter>
      </Card>
    </div>
  );
}
