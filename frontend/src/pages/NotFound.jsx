import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";


export default function NotFound() {
  const history = useNavigate();
  return (
    <div className="text-white">
      <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full space-y-6 text-center">
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl transition-transform hover:scale-110">
              404
            </h1>
            <p className="text-gray-500">route doesn't exit go back :[</p>
          </div>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={() => {
              history("/dashboard");
            }}
          >
            Return
          </Button>
        </div>
      </div>
    </div>
  );
}
