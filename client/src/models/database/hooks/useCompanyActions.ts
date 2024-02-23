import Company from "./../../Company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { CompaniesEndpoints } from "../../../constants/endpoints";
import { setCompanies } from "../../redux/companiesSlice";
import { handleAxiosError } from "../../../utils/axiosErrorHandler";

export const useCompanyActions = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  const createCompany = async (company: Company) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.post(CompaniesEndpoints.COMPANIES, company);
      dispatch(setCompanies(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const readCompanies = async () => {
    try {
      const res = await axios.get(CompaniesEndpoints.COMPANIES);
      dispatch(setCompanies(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const updateCompany = async (company: Company) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    const companyWithCompanyId = { ...company, companyId: company._id };

    try {
      const res = await axios.patch(
        CompaniesEndpoints.COMPANY_BY_ID,
        companyWithCompanyId,
        {
          withCredentials: true,
        }
      );
      dispatch(setCompanies(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  const deleteCompany = async (companyId: string) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    try {
      const res = await axios.delete(CompaniesEndpoints.COMPANY_BY_ID, {
        data: { companyId: companyId },
      });
      dispatch(setCompanies(res.data));
    } catch (error: any) {
      handleAxiosError(error);
    }
  };

  return { createCompany, readCompanies, updateCompany, deleteCompany };
};
