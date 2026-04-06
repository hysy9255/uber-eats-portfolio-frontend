import type { CreateDriverDocumentsDTO } from "./CreateDriverDocuments.dto";
import type { CreateUserDTO } from "./CreateUser.dto";
import type { CreateVehicleInfoDTO } from "./CreateVehicleInfo.dto";

export type RegisterDriverDTO = {
  user: CreateUserDTO;
  vehicleInfo: CreateVehicleInfoDTO;
  documents: CreateDriverDocumentsDTO;
};
