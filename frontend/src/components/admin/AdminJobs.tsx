import { useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import Navbar from '../shared/Navbar';
import { setSearchCompanyByText } from '@/redux/companySlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(setSearchJobByText(input));
  },[input])
  return (
    <div>
      <Navbar />
      <div className="max-w-5xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by company name,role"
            onChange={(e: any) => setInput(e.target.value)}
            value={input}
          />
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Jobs
          </Button>
        </div>

        <AdminJobsTable/>
      </div>
    </div>
  );
}

export default AdminJobs