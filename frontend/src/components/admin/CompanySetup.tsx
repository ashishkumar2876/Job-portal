import { useState, useEffect } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import useGetCompanyById from "@/hooks/useGetCompanyById";

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    logo: "", // File input should be of type File | null
  });
  const { singleCompany } = useSelector((store: RootState) => store.companySlice);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Handle text input changes
  const changeEventHandler = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle file input changes
  const changeFileHandler = (e: any) => {
    const logo = e.target.files?.[0]; // Get the first file
    setInput({ ...input, logo });
  };

  // Handle form submission
  const submitHandler = async (e: any) => {
    e.preventDefault();

    // Create a new FormData object to submit the data including the file
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);

    // If a file is selected, append it to the FormData object
    if (input.logo) {
      formData.append("resume", input.logo); // "file" is the field name expected by your backend
    }

    try {
      setLoading(true);

      // Make the PUT request to the API to update the company
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // If the request was successful, display success toast and navigate to the companies list
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Load company data when component mounts or singleCompany changes
  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name ?? "",
        description: singleCompany.description ?? "",
        website: singleCompany.website ?? "",
        location: singleCompany.location ?? "",
        logo: singleCompany.logo ?? "", // Reset file input if needed
      });
    }
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <div className="flex items-center gap-5 p-8">
          <Button
            onClick={() => navigate("/admin/companies")}
            variant="outline"
            className="flex items-center gap-2 text-gray-500 font-semibold"
          >
            <ArrowLeft />
            <span>Back</span>
          </Button>
          <h1 className="font-bold text-xl ">Company Setup</h1>
        </div>
        <form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full mb-3">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full mb-3">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetup;
