import { useState, useEffect} from "react";

const API = (url) => {
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
  return {data,isLoading,error};
};
export default API;

