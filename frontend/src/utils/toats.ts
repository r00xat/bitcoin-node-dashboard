import { AxiosError } from "axios";
import { toast } from 'react-toastify';

export function toastError(error: AxiosError){
   const errorMessage = (error.response?.data as { error: string }).error;
   toast.error('Error ' + error.response?.status + ': ' + errorMessage);
}