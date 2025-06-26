import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Users = () => {
  return (
    <div className="py-5 px-3">
      <div className="font-sans mb-1">Type User you want to send to</div>
      <Input className="w-xl mb-5" />

      {/* input where user types and the filter on filter is applied */}
      <User />
    </div>
  );
};

export default Users;

const User = () => {
  const users = [
    {
      username: "adlsf@gmail.com",
      firstName: "sdfjas",
      lastName: "adlfj",
    },
    {
      username: "adlsf@gmail.com",
      firstName: "sdfjas",
      lastName: "adlfj",
    },
    {
      username: "adlsf@gmail.com",
      firstName: "sdfjas",
      lastName: "adlfj",
    },
    {
      username: "adlsf@gmail.com",
      firstName: "sdfjas",
      lastName: "adlfj",
    },
  ];
  return (
    <div>
      <ul>
        {users.map((u, index) => (
          <li
            key={index}
            className="p-4 border border-amber-300 mb-2 rounded-2xl"
          >
            <div className="flex items-center justify-between">
              <div className="grid grid-cols-4">
                <span>
                  {u.firstName} {u.lastName}
                </span>
              </div>
              <Button variant="secondary">send money</Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
