import { useEffect } from "react";
import { JOB_API_END_POINT } from "../utils/constant.ts";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllJobs } from "@/redux/jobSlice.ts";
import { RootState } from "@/redux/store.ts";
const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store: RootState) => store.jobSlice);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.jobs);
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllJobs();
  }, []);
};

export default useGetAllJobs;
