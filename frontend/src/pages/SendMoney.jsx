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
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SendMoney = () => {
  const location = useLocation();
  const user = location.state.user;
  const [money, setMoney] = useState(0);
  const history = useNavigate();
  function handleSubmit() {
    const token = localStorage.getItem("token");
    axios
      .post(
        "/api/v1/account/transfer",
        {
          to: user._id,
          amount: money,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        history('/dashboard')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  }
  return (
    <div className="text-white flex justify-center items-center w-full h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Send money</CardTitle>
          <CardDescription>
            Enter Amount(rs) to send to {user.firstName} {user.lastName}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex-col gap-2">
          <Label>Sending to {user.email}</Label>
          <Input
            placeholder="Enter amount"
            type="number"
            value={money}
            onChange={(e) => {
              setMoney(e.target.value);
            }}
          />
          <Button onClick={handleSubmit}>Send Money</Button>
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
