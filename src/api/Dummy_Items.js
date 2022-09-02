import { useState, useEffect, useContext, useCallback } from "react";
import SearchContext from "../context/SearchContext";
/*const Dummy_Items = [
  {
    id: 100,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 4100,
  },
  {
    id: 101,
    img: "https://d3m9l0v76dty0.cloudfront.net/system/photos/8696783/large/ecf6f634ffc3c28ad7ce318cd8074544.png",
    name: "Galaxy S22",
    description: "The Newest Samsung ",
    price: 4200,
  },
  {
    id: 102,
    img: "https://d3m9l0v76dty0.cloudfront.net/system/photos/8699015/large/4bd51ea43b542de3e94c5405761ff53c.png",
    name: "S22 plus",
    description: "Amazing apple smartphone",
    price: 3200,
  },
  {
    id: 103,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 1000,
  },
  {
    id: 104,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 8000,
  },
  {
    id: 105,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 2000,
  },
  {
    id: 106,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 3000,
  },
  {
    id: 107,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 7000,
  },
  {
    id: 108,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 3000,
  },
  {
    id: 109,
    img: "https://media.istockphoto.com/photos/lonely-woman-sitting-on-a-wooden-jetty-on-a-sunny-autumn-day-picture-id1373146807?s=612x612",
    name: "Iphone 13 pro max",
    description: "Amazing apple smartphone",
    price: 5000,
  },
];*/

const Api = () => {
  const SearchCTX = useContext(SearchContext); //Search Context
  const [ArrayData, setArrayData] = useState([]);
  const [FilterSearchArray, setFilterSearchArray] = useState([]); //MyData
  const Value = SearchCTX.InputValue; //Search

  useEffect(() => {
    fetchProductsData();
  }, []);
  const fetchProductsData = useCallback(async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/products");
      if (!response.ok) {
        throw new Error("Something with Fetch not succses");
      }
      const responseData = await response.json();
      setArrayData(() => {
        return responseData;
      });
      setFilterSearchArray(() => {
        return responseData;
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  const CheackValueFilter = () => {
    if (Value.length > 1) {
      const a = ArrayData.filter((item) =>
        item.name.toLowerCase().includes(Value.toLowerCase())||item.category.toLowerCase().includes(Value.toLowerCase())
      );
      setFilterSearchArray(() => {
        return a;
      });
    } else {
      setFilterSearchArray(() => {
        return [...ArrayData];
      });
    }
  };
  useEffect(() => {
    CheackValueFilter();
  }, [Value]);

  return FilterSearchArray;
};
export default Api;

