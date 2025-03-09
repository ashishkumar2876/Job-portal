
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover } from "../ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminJobsTable = () => {
  
  const {allAdminJobs,searchJobByText}=useSelector((store:RootState)=>store.jobSlice);
  const [filterJobs,setFilterJobs]=useState(allAdminJobs);
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredJobs=allAdminJobs && allAdminJobs.filter((job)=>{
      if(!searchJobByText){
        return true;
      };
      return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job.company.name.toLowerCase().includes(searchJobByText.toLowerCase());
    });
    setFilterJobs(filteredJobs);
  },[searchJobByText,allAdminJobs])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterJobs?.map((job) => (
            <tr key={job._id}>
              <TableCell>{job?.company.name}</TableCell>
              <TableCell>
                {job.title}
              </TableCell>
              <TableCell>
                {job.createdAt.toString().split('T')[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="bg-slate-100 shadow-md w-[150px] p-2 mx-5 my-2">
                    
                    <div onClick={()=>navigate(`/admin/jobs/${job._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                      <Eye/>
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
