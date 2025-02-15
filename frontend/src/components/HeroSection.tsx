import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchJobHandler=()=>{
    dispatch(setSearchQuery(query));
    navigate('/browse')
  }
  return (
    <div className="text-center">
      <div className="flex flex-col gap-7 my-8">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet fugiat consequatur quos officia unde.</p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-4 rounded-full items-center mx-auto">
            <input type="text" 
            placeholder="Find your dream jobs"
            className="outline-none border-none w-full"
            onChange={(e: any)=>setQuery(e.target.value)}
            value={query}
            />
            <Button onClick={searchJobHandler} className="rounded-r-full">
                <Search className='h-12 w-5'></Search>
            </Button>
        </div>
      </div>
    </div>
  );
};
