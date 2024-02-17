import Company from "./../../Company";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import axios from "axios";
import { CompaniesEndpoints } from "../../../constants/endpoints";
import { setCompanies } from "../../redux/companiesSlice";

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
    }
  };

  const readCompanies = async () => {
    try {
      const res = await axios.get(CompaniesEndpoints.COMPANIES);
      dispatch(setCompanies(res.data));
    } catch (error: any) {
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
    }
  };

  const updateCompany = async (companyId: string, company: Company) => {
    if (currentUser?.role === "Demo") {
      return;
    }

    console.log(companyId, company);
    // try {
    //   const docRef = doc(database, COMPANIES_COLLECTION, companyId);
    //   await setDoc(docRef, company);
    // } catch (e) {
    //   console.error("Error adding document: ", e);
    //   return null;
    // }
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
    }
  };

  return { createCompany, readCompanies, updateCompany, deleteCompany };
};
