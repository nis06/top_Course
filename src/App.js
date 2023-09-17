import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { apiUrl, filterData } from "./data";
import Filter from "./components/Filter";
import Cards from "./components/Cards";
import { toast } from "react-toastify";
import Spinner from "./components/Spinner"

const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading,setLoading] = useState(true);
  const [category,setCategory]=useState(filterData[0].title)
  
    const fetchData = async () => {
      setLoading(true);
      try {
        let res = await fetch(apiUrl);
        let output = await res.json();
        setCourses(output.data);
      } catch (error) {
        toast.error("Something went Wrong");
      }
      setLoading(false);
    }; 
    useEffect(()=>{
      fetchData();
    },[]) 
   

  return ( 
    <div className="flex flex-col bg-bgDark2  min-h-screen">
      <div>
        <Navbar />
      </div>

      <div  >
      <div >
        <Filter filterData={filterData} setCategory={setCategory} category={category}/>
      </div>

      <div 
      className=" w-11/12 max-w-[1200px] mx-auto flex justify-center items-center main-h-[50vh]  flex-wrap"
      >
        {
          loading  ? (<Spinner/>):(<Cards courses={courses} category={category}/>)
        }
      </div>
      </div>

    
    </div>
  );
};

export default App;
