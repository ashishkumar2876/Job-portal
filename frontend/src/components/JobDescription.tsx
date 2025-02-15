import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import {setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "sonner";

interface UserProfile {
  _id?: string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  profile?: {
    bio?: string;
    skills?: string[];
    resume?: string;
    resumeOriginalName?: String;
    profilePhoto?: string;
  };
}

const JobDescription = () => {
  const { user } = useSelector((store: RootState) => store.authSlice) as {
    user: UserProfile | null;
  };
  const { singleJob } = useSelector((store: RootState) => store.jobSlice);
  
  const isInitiallyApplied =
    (singleJob &&
      singleJob.applications &&
      singleJob.applications.some(
        (application) => application?.applicant === user?._id
      )) ||
    false;
 console.log(isInitiallyApplied);
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${singleJob?._id}`,
        { withCredentials: true }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsApplied(true);
        // Fixing the typo from 'appllicant' to 'applicant'
        const updatedSingleJob = {
          ...singleJob,
          applications: [
            ...(singleJob?.applications || []),
            { applicant: { _id: user?._id } },
          ],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          // Check if user has applied to the job
          setIsApplied(res.data.job.applications.some((app:any) => app?.applicant === user?._id));
          console.log(isApplied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchSingleJob();
  }, [jobId, dispatch, user?._id]); // Dependency on jobId and user

  return (
    <div className="max-w-5xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl ">{singleJob?.company.name}</h1>
          <div className="flex gap-2 items-center mt-4">
            <Badge className="text-blue-700 font-bold" variant="secondary">
              {singleJob?.position}
            </Badge>
            <Badge className="text-blue-700 font-bold" variant="secondary">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-blue-700 font-bold" variant="secondary">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={applyJobHandler}
          disabled={isApplied}
          className={`rounded-lg ${isApplied ? "bg-gray-600 cursor-not-allowed" : "bg-[#7209b7] hover:bg-[#5f32ad]"}`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium py-4">
        {singleJob?.description}
      </h1>
      <div>
        <h1 className="font-bold my-1">
          Role: <span className="pl4 font-medium text-gray-500">{singleJob?.title}</span>
        </h1>
        <h1 className="font-bold my-1">
          Location: <span className="pl4 text-sm text-gray-500">{singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description: <span className="pl4 text-sm text-gray-500">{singleJob?.description}</span>
        </h1>
        <h1 className="font-bold my-1">
          Experience: <span className="pl4 text-sm text-gray-500">{singleJob?.experienceLevel}</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary: <span className="pl4 text-sm text-gray-500">{singleJob?.salary}LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applications: <span className="pl4 text-sm text-gray-500">{singleJob?.applications.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date: <span className="pl4 text-sm text-gray-500">{singleJob?.createdAt.toString().split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
