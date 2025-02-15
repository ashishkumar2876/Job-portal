import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortlistingStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  
  const { application } = useSelector(
    (store: RootState) => store.applicationSlice
  );
  
  const statusHandler=async (status: any,id: any)=>{
    try {
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{
        withCredentials: true
      })
      if(res.data.success){
        toast.success(res.data.message);
      }
     
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {application &&
            application?.length > 0 &&
            application?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.applicant?.fullname}</TableCell>
                <TableCell>{item?.applicant?.email}</TableCell>
                <TableCell>{item?.applicant?.phoneNumber}</TableCell>
                <TableCell>
                  {
                    item?.applicant?.profile?.resume?<a className="text-blue-500"  href={item?.applicant?.profile?.resume?.toString()}>{item?.applicant?.profile?.resumeOriginalName}</a>:
                    <span>No resume</span>
                  }
                </TableCell>
                <TableCell>{item?.createdAt?.toString().split('T')[0]}</TableCell>
                <TableCell className="float-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortlistingStatus.map((status, index) => {
                        return (
                          <div
                            onClick={()=>statusHandler(status,item._id)}
                            key={index}
                            className="cursor-pointer flex w-fit items-center mb-1"
                          >
                            <span>{status}</span>
                          </div>
                        );
                      })}
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

export default ApplicantsTable;
