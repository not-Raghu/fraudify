import Navbar from "@/components/Navbar";
import Balance from "@/components/Balance";
import Users from "@/components/Users";
import { useEffect, useState } from "react";
import axios from "axios";


const Dashboard = () => {
  const [userData,setUserData] = useState({})
  useEffect(()=>{
    const token = localStorage.getItem("token")
    axios.get("http://localhost:3000/api/v1/user/me" , {
      headers: {
        Authorization:  `Bearer ${token}`
      }
    }).then(res => {
      console.log(res)
      setUserData(res)});

  },[])

  return ( 
    <div className="w-screen h-screen text-white">
      <div>
        <Navbar user={userData.data?.user} />
      </div>
      <div>
       <Balance /> 
      </div>
      <div>
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
