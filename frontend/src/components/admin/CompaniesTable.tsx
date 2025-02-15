import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
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
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CompaniesTable = () => {
  const { companies,searchCompanyByText } = useSelector((store: RootState) => store.companySlice);
  const [filterCompany,setFilterCompany]=useState(companies);
  const navigate=useNavigate();
  useEffect(()=>{
    const filteredCompany=companies.filter((company)=>{
      if(!searchCompanyByText){
        return true;
      };
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  },[searchCompanyByText,companies])
  return (
    <div>
      <Table>
        <TableCaption>A list of your recent regestired companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany?.map((company) => (
            <tr key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="w-12 h-12 rounded-full"
                    src={company.logo}
                    alt="@shadcn"
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{company?.name}</TableCell>
              <TableCell>
                {company?.createdAt?.toString().split("T")[0]}
              </TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="shadow-md w-[150px] p-2 mx-5 my-2">
                    <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex gap-2 items-center p-1">
                      <Edit2 />
                      <span>Edit</span>
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

export default CompaniesTable;
