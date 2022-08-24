// A mock function to mimic making an async request for data
import axios from "axios";
 
export const getCust = () => {
    // console.log();
    return new Promise((resolve) =>
      axios.get("http://127.0.0.1:8000/getuserinfo",
      {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("access")}`
        },
    }).
    then((res) => resolve({ data: res.data }))
      .catch(function (error) {
        console.log(error);
    }),
     

    );
  };