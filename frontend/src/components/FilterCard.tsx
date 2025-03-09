import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi", "Bangalore", "Hyderabad", "Pune", "Mumbai","Noida","Gurugram"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Designer",
      "SDE",
      "SDET",
      "Devops Engineer"
    ],
  },
  {
    filterType: "Salary(LPA)(above)",
    array: ["5", "10", "20","30","40","50","60"],
  },
];
const FilterCard = () => {
  const [selectedValue,setSelectedValue]=useState('');
  const dispatch=useDispatch();

  const changeHandler=(value: any)=>{
    setSelectedValue(value);
  }
  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue));
  },[selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md ">
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId=`id${index}-${idx}`
              return <div className="flex items-center space-x-2">
                <RadioGroupItem value={item} id={itemId} />
                <Label htmlFor={itemId}>{item}</Label>
              </div>;
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
