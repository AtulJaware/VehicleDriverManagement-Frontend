import NotFound from "../components/notfound";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "../Screens/Auth/login";
import Register from "../Screens/Auth/register";
import Drivers from "../Screens/Dashboard/drivers";
import AddDriver from "../Screens/Dashboard/addDriver";
import AddVehicle from "../Screens/Dashboard/addVehicle";
import UpdateVehicle from "../Screens/Dashboard/updateVehicle";
import Vehicles from "../Screens/Dashboard/vehicles";
import Logout from "../components/logout";
import UpdateDriver from "../Screens/Dashboard/updateDriver";
import Home from "../Screens/Dashboard/home";
import UserHome from "../Screens/Dashboard/userHome";

export const Nav = () => (
    <div >
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to="/" replace />} />
      <Route path="/user/home" element={<UserHome/>} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/drivers/add" element={<AddDriver />} />
      <Route path="/drivers/update/:id" element={<UpdateDriver />} />
      <Route path="/vehicles/add" element={<AddVehicle />} />
      <Route path="/vehicles/update/:id" element={<UpdateVehicle />} />
      <Route path="/vehicles" element={<Vehicles />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </div>
);

export const navigate=(screenname,params)=>{
    this.props.navigate(screenname, params);
};