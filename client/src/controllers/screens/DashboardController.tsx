import { useSelector } from "react-redux";
import { RootState } from "../../models/redux/store";
import {
  priorityOptions,
  statusOptions,
  typeOptions,
} from "../../constants/ticketConstants";
import { useEffect, useState } from "react";
import Ticket from "../../models/Ticket";
import DashboardView from "../../views/screens/dashboard/DashboardView";
import { useMediaQuery, useTheme } from "@mui/material";

const DashboardController = () => {
  const tickets = useSelector((state: RootState) => state.tickets.value);
  const projects = useSelector((state: RootState) => state.projects.value);
  const users = useSelector((state: RootState) => state.users.value);
  const [priorityCount, setPriorityCount] = useState<number[]>(
    new Array(priorityOptions.length).fill(0)
  );
  const [statusCount, setStatusCount] = useState<number[]>(
    new Array(statusOptions.length).fill(0)
  );
  const [typeCount, setTypeCount] = useState<
    { id: number; value: number; label: string }[]
  >([]);
  const [personnelCount, setPersonnelCount] = useState<
    { id: number; value: number; label: string }[]
  >([]);
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.down("lg")); // Check for lg screen

  useEffect(() => {
    const updatedPriorityCount = new Array(priorityOptions.length).fill(0);
    const updatedStatusCount = new Array(statusOptions.length).fill(0);
    const updatedTypeCount: {
      id: number;
      value: number;
      label: string;
    }[] = [];
    const updatedPersonnelCount: {
      id: number;
      value: number;
      label: string;
    }[] = [];

    tickets.forEach((ticket: Ticket) => {
      const priorityIdx = priorityOptions.indexOf(ticket.priority);
      if (priorityIdx !== -1) {
        updatedPriorityCount[priorityIdx] += 1;
      }

      const statusIdx = statusOptions.indexOf(ticket.status);
      if (statusIdx !== -1) {
        updatedStatusCount[statusIdx] += 1;
      }

      const typeIdx = typeOptions.indexOf(ticket.type);
      if (typeIdx !== -1) {
        if (!updatedTypeCount[typeIdx]) {
          updatedTypeCount[typeIdx] = {
            id: typeIdx,
            value: 0,
            label: typeOptions[typeIdx],
          };
        }
        updatedTypeCount[typeIdx].value += 1;
      }

      const personnel = users.find((user) => user._id === ticket.personnelId);
      if (
        personnel &&
        (ticket.status === statusOptions[1] ||
          ticket.status === statusOptions[2])
      ) {
        const personnelIdx = users.indexOf(personnel);
        if (personnelIdx !== -1) {
          if (!updatedPersonnelCount[personnelIdx]) {
            updatedPersonnelCount[personnelIdx] = {
              id: personnelIdx,
              value: 0,
              label: personnel.name,
            };
          }
          updatedPersonnelCount[personnelIdx].value += 1;
        }
      }
    });

    let updatedTopTypeCount = [...updatedTypeCount];
    let updatedTopPersonnelCount = [...updatedPersonnelCount];

    // Sort the arrays to keep only the top 4 objects
    updatedTopTypeCount = updatedTopTypeCount
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);
    updatedTopPersonnelCount = updatedTopPersonnelCount
      .sort((a, b) => b.value - a.value)
      .slice(0, 4);

    // Update the state variables
    setPriorityCount(updatedPriorityCount);
    setStatusCount(updatedStatusCount);
    setTypeCount(updatedTopTypeCount);
    setPersonnelCount(updatedTopPersonnelCount);
  }, [tickets, users]);

  return (
    <DashboardView
      projects={projects}
      priorityCount={priorityCount}
      statusCount={statusCount}
      typeCount={typeCount}
      personnelCount={personnelCount}
      isLarge={isLarge}
    />
  );
};
export default DashboardController;
