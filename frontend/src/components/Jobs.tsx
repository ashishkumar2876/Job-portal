
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion';


const Jobs = () => {
  
  const { allJobs,searchQuery } = useSelector((store: RootState) => store.jobSlice);
  const [filterJobs,setFilterJobs]=useState(allJobs);

  useEffect(()=>{
    function isInteger(str : any) {
      return Number.isInteger(Number(str));
    }
    if(searchQuery){
      const filteredJobs=allJobs.filter((job)=>{
        if(isInteger(searchQuery)){
          return Number(job.salary)>=Number(searchQuery);
        }
        return job.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
        
      })
      setFilterJobs(filteredJobs);
    }else{
      setFilterJobs(allJobs);
    }
  },[allJobs,searchQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {!filterJobs ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {
                  filterJobs.map((job)=>(
                    <motion.div
                    initial={{opacity: 0,x: 100}}
                    animate={{opacity: 1,x:0}}
                    exit={{opacity: 0,x: -100}}
                    transition={{duration: 0.3}}
                    key={job._id}>
                      <Job job={job}/>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
