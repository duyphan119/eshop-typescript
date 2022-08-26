import { apiCallerFormData } from "api";
import { AxiosResponse } from "axios";
import { DeleteManyFile } from "interfaces/upload";

export const uploadSingle = async (
  formData: FormData
): Promise<AxiosResponse> => apiCallerFormData.post("api/upload", formData);

export const deleteMany = async (
  data: DeleteManyFile[]
): Promise<AxiosResponse> => apiCallerFormData.post("api/upload", data);

export const uploadMany = async (formData: FormData): Promise<AxiosResponse> =>
  apiCallerFormData.post("api/upload/many", formData);
