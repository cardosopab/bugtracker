import { AxiosError } from "axios";

interface CustomError {
  message: string;
}

export const handleAxiosError = (error: AxiosError<CustomError>) => {
  if (error.response) {
    console.error("Server responded with an error:", error.response.status);
    alert(`Error: ${error.response.data.message}`);
  } else if (error.request) {
    console.error("No response received from the server");
    alert("No response received from the server");
  } else {
    console.error("Error setting up the request:", error.message);
    alert(`Error: ${error.message}`);
  }
};
