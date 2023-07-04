import axios from "axios";
import { ServiceCall } from "../../Services/ServiceMethod";
import { DriverApiConstant } from "../../Constants/ApiConstant";

handleDelete = (id) => {
  
    ServiceCall.deleteApi(DriverApiConstant.deleteDriver(memId))
      .then((res) => {
        console.log(res);
       
        const mems = this.state.drivers.filter((mem) => mem.id !== id);

        this.setState({ drivers: mems });
        alert("Driver with Id " + id + " deleted successfully!");
      })
      .catch((err) => console.log(err));
  };