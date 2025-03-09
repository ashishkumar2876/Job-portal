import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { setAuthUser} from "@/redux/authSlice";
import { toast } from "sonner";

export interface UserProfile {
  _id?:string;
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  profile?: {
    bio?: string;
    skills?: string[];
    resume?: File | null;
    resumeOriginalName?:string;
  };
}
interface UpdateProfileDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void; // Function to update the state
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
  open,
  setOpen,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store: RootState) => store.authSlice);

  const [nuser, _a] = useState<UserProfile | null>(user);
  const [input, setInput] = useState<UserProfile>({
    fullname: "",
    email: "",
    phoneNumber: "",
    profile: { bio: "", skills: [], resume: null,resumeOriginalName:"" },
  });
 
  useEffect(() => {
    if (nuser) {
      setInput({
        fullname: nuser?.fullname ?? "",
        email: nuser?.email ?? "",
        phoneNumber: nuser?.phoneNumber ?? "",
        profile: {
          bio: nuser?.profile?.bio ?? "",
          skills: nuser?.profile?.skills ?? [],
          resume: nuser?.profile?.resume ?? null,
          resumeOriginalName: nuser.profile?.resumeOriginalName??""
        },
      });
    }
  }, [nuser]);

  const dispatch=useDispatch();

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value} = e.target;
  
    setInput((prev) => {
      if (name === "fullname" || name === "email" || name === "phoneNumber") {
        // 🟢 Update simple text fields
        return { ...prev, [name]: value };
      } else if (name === "bio") {
        // 🟢 Update bio inside profile
        return {
          ...prev,
          profile: {
            ...prev.profile,
            bio: value,
          },
        };
      } else if (name === "skills") {
        // 🟢 Convert skills input (comma-separated) into an array
        return {
          ...prev,
          profile: {
            ...prev.profile,
            skills: value.split(",").map((skill) => skill.trim()), // Split and trim
          },
        };
      }
      return prev; // Default return if nothing matches
    });
  };
  
  // 🔵 Separate handler for file input
  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setInput((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          resume: e.target.files?.[0], // Store file
        },
      }));
    }
  };
  const submitHandler=async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const formData = new FormData();
    formData.append("fullname", input.fullname || "");
    formData.append("email", input.email || "");
    formData.append("phoneNumber", input.phoneNumber || "");
    formData.append("bio", input.profile?.bio || "");

    // Append skills as a JSON string (backend should parse it)
    formData.append("skills", JSON.stringify(input.profile?.skills || []));
    if (input.profile?.resume) {
        formData.append("resume", input.profile?.resume);
      }
    try {
        setLoading(true);
        const res=await axios.post("https://job-portal-1-2jdg.onrender.com/api/v1/user/update",formData,{
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            withCredentials:true
        })
        if(res.data.success){
            dispatch(setAuthUser(res.data.user));
            toast.success(res.data.message)
        }
    } catch (error) {
        console.log(error);
    }
    finally{
      setLoading(false);
    }
    setOpen(false);
    console.log(input);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={()=>setOpen(false)}>
        <DialogContent
          className="sm:max-w-[425px]"
          onInteractOutside={() => setOpen(false)}
        >
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="name" className="text-center">
                  Name
                </Label>
                <Input
                  value={input.fullname}
                  type="text"
                  id="name"
                  name="fullname"
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="email" className="text-center">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={input.email}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="number" className="text-center">
                  Number
                </Label>
                <Input
                  type="number"
                  id="number"
                  name="phoneNumber"
                  value={input.phoneNumber}
                  className="col-span-3"
                  onChange={changeEventHandler}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="bio" className="text-center">
                  Bio
                </Label>
                <Input
                  value={input.profile?.bio}
                  onChange={changeEventHandler}
                  id="bio"
                  name="bio"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="skills" className="text-center">
                  Skills
                </Label>
                <Input
                  value={input.profile?.skills}
                  onChange={changeEventHandler}
                  id="skills"
                  name="skills"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2">
                <Label htmlFor="resume" className="text-center">
                  Resume
                </Label>
                <Input
                  accept="application/pdf"
                  type="file"
                  name="resume"
                  //value={input.profile?.resumeOriginalName}
                  onChange={changeFileHandler}
                  className="col-span-3"
                />
              </div>
              {
                nuser?.profile?.resumeOriginalName?<div className="grid grid-cols-4 items-center gap-2">
                <div className="col-span-4">
                  <div className="flex items-center justify-center">
                  {nuser?.profile?.resumeOriginalName}(Already Uploaded)
                  </div>
                </div>
              </div>:null
              }
              
            </div>
            <DialogFooter>
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
