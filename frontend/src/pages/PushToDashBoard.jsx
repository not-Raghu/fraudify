import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

const PushToDashBoard = () => {
    const history = useNavigate();
    useEffect(()=>{
        history('/dashboard')
    });
  return (
    <div>
        Nothing here
    </div>

)
}

export default PushToDashBoard