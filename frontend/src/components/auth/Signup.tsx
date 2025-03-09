import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { RadioGroup} from "@radix-ui/react-radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setLoading } from "@/redux/authSlice";

const Signup = () => {
    type InputState = {
        file: File | null; // or File | undefined
        [key: string]: any; // For other dynamic properties
      };
  const [input, setInput] = useState<InputState>({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: null,
  });
  const dispatch=useDispatch();
  const { loading } = useSelector((store: RootState) => store.authSlice);
  const navigate=useNavigate();
  const { user } = useSelector((store: RootState) => store.authSlice)

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler =(e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setInput({ ...input, file: e.target.files?.[0]});
    }
  };
  const submitHandler=async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("password",input.password);
    formData.append("role",input.role);
    if(input.file){
        formData.append("resume",input.file);
    }
    try {
      dispatch(setLoading(true));
        const res=await axios.post("https://job-portal-xjru.onrender.com/api/v1/user/register",formData,
            {
                headers:{
                    "Content-type": "multipart/form-data"
                },
                withCredentials: true
            }); 
            if(res.data.success){
                navigate("/login")
                toast.success(res.data.message);
            }
    } catch (error) {
        console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  }
  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} action="" className="w-1/2 border border-gray-200 rounded-md p-4">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div>
            <Label className="font-bold">Full Name</Label>
            <Input type="text" placeholder="Ashish" value={input.fullname} name="fullname" onChange={changeEventHandler}/>
          </div>
          <div>
            <Label className="font-bold">Email</Label>
            <Input type="email" placeholder="ashish@gmail.com" value={input.email} name="email" onChange={changeEventHandler} />
          </div>
          <div>
            <Label className="font-bold">Phone Number</Label>
            <Input type="number" placeholder="6398..." value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler}/>
          </div>
          <div>
            <Label className="font-bold">Password</Label>
            <Input type="password" placeholder="*****" value={input.password} name="password" onChange={changeEventHandler}/>
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  id="option-one"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role==='student'}
                  onChange={changeEventHandler}
                  className="w-3.5 cursor-pointer"
                />
                <Label htmlFor="option-one" className="font-semibold">
                  Student
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  id="option-two"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role==='recruiter'}
                  onChange={changeEventHandler}
                  className="w-3.5 cursor-pointer"
                />
                <Label htmlFor="option-two" className="font-semibold">
                  Recruiter
                </Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input type="file" name="resume" className="cursor-pointer" accept="image/*" onChange={changeFileHandler}/>
            </div>
          </div>
          {loading ? (
            <Button className="w-full mb-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mb-3">
              Signup
            </Button>
          )}
          <span className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700">
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
