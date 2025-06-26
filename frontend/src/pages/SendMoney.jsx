import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Label } from "@radix-ui/react-label";
import { Link } from "react-router-dom";

const SendMoney = () => {
  return (
    <div className="text-white flex justify-center items-center w-full h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Send money</CardTitle>
          <CardDescription>
            Enter Amount(rs) to send to (friends name)
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Label>Sending to (friends name) </Label>
          <Input placeholder="Enter amount" />
          <Button>Send Money</Button>
          <Label>want to cancel the payment?</Label>
          <HoverCard>
            <HoverCardTrigger asChild>
              <Link to="/dashboard">
                <Button variant="link" asChild>
                  <span>Cancel</span>
                </Button>
              </Link>
            </HoverCardTrigger>
            <HoverCardContent>click link to go to dashboard</HoverCardContent>
          </HoverCard>
        </CardFooter>{" "}
      </Card>
    </div>
  );
};

export default SendMoney;
