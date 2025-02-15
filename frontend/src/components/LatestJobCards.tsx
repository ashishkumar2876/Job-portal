import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";
import React from "react";

// Define the type for job
interface Company {
  name: string;
  location: string;
}
interface Job {
  _id: string;
  title: string;
  description:string;
  company: Company;
  location: string;
  position: number;
  jobType: string;
  salary: string;
}

interface JobCardProps {
  job: Job; // Explicitly define the expected prop
}

const LatestJobCards: React.FC<JobCardProps> = ({ job }) => {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1> {/* Display company */}
        <p className="text-sm text-gray-500">{job?.company?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}({job.location})</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.position} Position
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;

