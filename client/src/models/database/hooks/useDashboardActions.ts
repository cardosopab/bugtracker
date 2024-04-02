import { DashboardEndpoints } from "../../../constants/apiEndpoints";
import axios from "axios";
import { handleAxiosError } from "../../../utils/axiosErrorHandler";

export const useDashboardActions = () => {
  const readProjectData = async (projectId: string) => {
    try {
      const res = await axios.post(DashboardEndpoints.DATA, {
        projectId: projectId,
      });
      //   dispatch();
      return res.data;
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return {
    readProjectData,
  };
};
