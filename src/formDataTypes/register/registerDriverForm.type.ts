import type { CreateDriverDocumentsDTO } from "../../dto/CreateDriverDocuments.dto";
import type { CreateUserDTO } from "../../dto/CreateUser.dto";
import type { CreateVehicleInfoDTO } from "../../dto/CreateVehicleInfo.dto";

export type RegisterDriverForm = {
  user: CreateUserDTO;
  vehicleInfo: CreateVehicleInfoDTO;
  documents: CreateDriverDocumentsDTO;
};
