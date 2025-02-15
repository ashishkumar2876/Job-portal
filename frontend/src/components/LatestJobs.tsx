
import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { RootState } from "@/redux/store";
import { spawn } from "child_process";
import { useNavigate } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((store: RootState) => store.jobSlice);
  
  return (
    <div className="max-w-6xl mx-auto m-20">
      <h1 className="text-4xl font-bold mx-auto mb-5">
        <span className="text-[#6A38C2]">Latest & Top </span>Job Openings
      </h1>
      <div className="grid grid-cols-3 gap-4">
      {allJobs ? (
          allJobs.slice(0, 6).map((job, index) =>
            job?._id ? (
              <LatestJobCards  key={job._id} job={job} />
            ) : (
              <LatestJobCards key={index} job={job} /> // Fallback key
            )
          )
        ) : (
          <p>No jobs available</p> // Show message instead of empty UI
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
