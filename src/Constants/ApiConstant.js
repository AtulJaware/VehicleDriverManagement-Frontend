export const DOMAIN = "http://localhost:9091/";

export const DriverApiConstant = {
  driverApi: DOMAIN + "drivers",
  postDriver: DOMAIN + "drivers/add",
  deleteDriver: (id) => DOMAIN + `drivers/delete/${id}`,
  getDriver: DOMAIN + "drivers",
  getDriver: (id) => DOMAIN + `drivers/view/${id}`,
  putDriver: (id) => DOMAIN + `drivers/update/${id}`,
};
export const VehicleApiConstant = {
  vehicleApi: DOMAIN + "vehicles",
  postVehicle: DOMAIN + "vehicles/add",
  deleteVehicle: (id) => DOMAIN + `vehicles/delete/${id}`,
  getVehicle: (id) => DOMAIN + `vehicles/view/${id}`,
  putVehicle: (id) => DOMAIN + `vehicles/update/${id}`,
};

export const LoginApiConstant = {
   patchLogin: (email) => DOMAIN+ `logout/${email}`,
   postLogin: DOMAIN+ `login`,
   postRegister: DOMAIN+ `register`
};
