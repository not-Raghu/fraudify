import Navbar from "@/components/Navbar";
import Balance from "@/components/Balance";
import Users from "@/components/Users";


const Dashboard = () => {
  return ( 
    <div className="w-screen h-screen text-white">
      <div>
        <Navbar />
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
