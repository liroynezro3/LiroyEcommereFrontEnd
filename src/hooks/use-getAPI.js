import { useState, useEffect} from "react";

const useAPI = (url) => {
  const [data, setData] = useState([]);
  const [isLoading,SetisLoading]=useState(false);
  const [error,SetError]=useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData =async () => {
    SetisLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Something with Fetch not succses");
      }
      const responseData = await response.json();
      setData(() => {
        return (responseData);
      });
      SetisLoading(false)
    } catch (err) {
      SetError(err)
    }
  };
  console.log("the Data of array is: - " ,data)
  return {data,isLoading,error};
};
export default useAPI;
