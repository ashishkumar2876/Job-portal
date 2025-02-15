import React from "react";
import { Button } from "./ui/button";
import {Bookmark } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {Badge} from './ui/badge'
import { useNavigate } from "react-router-dom";
interface Company {
  name: string;
  location: string;
  logo: string;
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
  createdAt:Date;
}

interface JobCardProps {
  job: Job; // Explicitly define the expected prop
}

const Job: React.FC<JobCardProps> = ({ job }) => {
  const navigate=useNavigate();
  const daysAgoFunction=(mongodbTime: Date)=>{
  const createdAt=new Date(mongodbTime);
  const curr=new Date();
  const timeDiff=curr.getTime()-createdAt.getTime();
  return Math.floor(timeDiff/(1000*24*60*60))
 }

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job.createdAt)} days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job.company.logo}
              alt="@shadcn"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </Button>
        <div>
          <h1 className="font-bold text-lg">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">
          {job?.description}
        </p>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.position} position
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.jobType}
        </Badge>
        <Badge className="text-blue-700 font-bold" variant="secondary">
          {job?.salary}LPA
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button variant='outline' onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button className="bg-[#7209b7] text-white" variant='outline'>Save For Later</Button>
      </div>
    </div>
  );
};

export default Job;
