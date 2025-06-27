import Navbar from "@/components/Navbar";
import Balance from "@/components/Balance";
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userData, setUserData] = useState({});
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      history("/signin");
    }

    axios
      .get("/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setUserData(res);
      })
      .catch(() => {
        history("/signin");
      });
  }, );

  return (
    <div className="w-screen h-screen text-white">
      <div>
        <Navbar user={userData.data?.user} />
      </div>
      <div>
        <Balance user={userData.data?.user} />
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
