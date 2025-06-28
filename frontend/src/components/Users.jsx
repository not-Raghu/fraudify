import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Users = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="py-5 px-3">
      <div className="font-sans mb-1">Type email you want to send to</div>
      <Input
        className="w-xl mb-5"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <User search={search} />
    </div>
  );
};

export default Users;

const User = ({ search }) => {
  const [users, setUsers] = useState([]);
  const history = useNavigate();

  const API_BASE = import.meta.env.VITE_API_BASE;


  useEffect(() => {
    // console.log(users);
    const token = localStorage.getItem("token");
    if (!token) return;
    const timer = setTimeout(() => {
      axios
        .get(API_BASE + "/api/v1/user/bulk?filter=" + search, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setUsers(res.data.user))
        .catch((e) => toast(e));
    }, 100);

    return () => clearTimeout(timer);
  }, [search]);

  function handleOnclick(u) {
    history("/send", { state: { user: u } });
  }

  return (
    <div>
      <ul>
        {users?.map((u, index) => (
          <li
            key={index}
            className="p-4 border border-gray-500 mb-2 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <div>
                  {u.firstName} {u.lastName}
                </div>
                <div className="text-gray-500">{u.email}</div>
              </div>
              <Button variant="secondary" onClick={() => handleOnclick(u)}>
                send money
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
