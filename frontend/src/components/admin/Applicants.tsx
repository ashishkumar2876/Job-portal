import { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { setApplication } from '@/redux/applicationSlice'
import { RootState } from '@/redux/store'

const Applicants = () => {
  const params=useParams();
  const dispatch=useDispatch();
  const { application } = useSelector(
    (store: RootState) => store.applicationSlice
  );
  
  useEffect(()=>{
    const fetchAllApplicants= async ()=>{
      try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{
          withCredentials: true
        });
        console.log(res.data.job.applications)
        if(res.data.success){
          dispatch(setApplication(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>{application.length}</h1>
            <ApplicantsTable/>
        </div>
    </div>
  )
}

export default Applicants