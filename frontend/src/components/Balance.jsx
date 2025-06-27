import axios from "axios";
import { useEffect, useState } from "react";

const Balance = () => {
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("api/v1/account/balance", { 
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
