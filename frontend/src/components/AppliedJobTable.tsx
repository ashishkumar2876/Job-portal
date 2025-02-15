import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { spawn } from 'child_process';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector((store: RootState) => store.jobSlice);
  return (
    <div>
        <Table>
            <TableCaption>A list of your applied jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job Role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    allAppliedJobs && allAppliedJobs.length>=0 && allAppliedJobs.map((item,index)=>(
                        <TableRow key={item._id}>
                            <TableCell>{item?.createdAt.toString().split('T')[0]}</TableCell>
                            <TableCell>{item.job.title}</TableCell>
                            <TableCell>{item?.job?.company.name}</TableCell>
                            <TableCell className='text-right'><Badge>{item.status}</Badge></TableCell>
                        </TableRow>
                    ))
                } 
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable