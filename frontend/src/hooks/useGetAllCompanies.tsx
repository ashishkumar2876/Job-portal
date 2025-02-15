import { useEffect } from "react";
import { COMPANY_API_END_POINT} from "../utils/constant.ts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCompanies} from "@/redux/companySlice.ts";
const useGetAllCompanies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.jobs);
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchCompanies();
  }, []);
};

export default useGetAllCompanies;
