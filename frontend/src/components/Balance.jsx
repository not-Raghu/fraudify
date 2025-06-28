import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const API_BASE = import.meta.env.VITE_API_BASE;
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token){
      return;
    }
    axios
      .get(API_BASE + "/api/v1/account/balance", { 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      });
  }, []);

  return (
    <div>
      <div className="p-5 text-xl mt-2 rounded font-sans">
        {<p>Your current balance ${balance}</p>}
      </div>
    </div>
  );
};

export default Balance;
