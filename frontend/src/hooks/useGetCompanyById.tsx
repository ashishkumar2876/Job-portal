import { useEffect } from "react";
import { COMPANY_API_END_POINT} from "../utils/constant.ts";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice.ts";
const useGetCompanyById = (companyId:any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          console.log(res.data.jobs);
          dispatch(setSingleCompany(res.data.company));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleCompany();
  }, [companyId,dispatch]);
};

export default useGetCompanyById;
