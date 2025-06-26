import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance,setBalance] = useState(0);
  useEffect(()=>{
    const token = localStorage.getItem("token");
    axios.get("http://localhost:3000/api/v1/account/balance",{headers:{
      Authorization: `Bearer ${token}`
    }}).then(res => {setBalance(res.data.balance)})
  })

  return (
    <div>
      <div className="border border-amber-500 p-5 text-xl mt-2 rounded font-sans">{balance && <p>Your current balance ${balance}</p>}</div>
    </div>
  );
};

export default Balance;
