import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import Ticket from "../mongoose/schemas/Ticket";
import User from "../mongoose/schemas/User";
import Project from "../mongoose/schemas/Project";

const statusOptions: string[] = [
  "Backlog",
  "Today",
  "Doing",
  "Blocked",
  "Done",
];

const priorityOptions: string[] = ["Low", "Medium", "High"];

const typeOptions: string[] = [
  "Bug/Errors",
  "Feature",
  "Task",
  "Documentation",
  "Testing/QA",
  "Feedback",
  "Duplicate/Invalid",
];

export const readDashboardData = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).send(result.array());
  }
  const data = matchedData(req);
  try {
    // Fetch tickets and project in parallel
    const [tickets, project] = await Promise.all([
      Ticket.find({ projectId: data.projectId }),
      Project.findById(data.projectId),
    ]);

    if (!project || !tickets)
      return res.status(200).send({
        priorityCount: [],
        statusCount: [],
        typeCount: [],
        topPersonnelCount: [],
      });

    // Fetch users associated with the project
    const users = await User.find({ _id: { $in: project.personnel } }).select(
      "name"
    );

    // Initialize counters
    const priorityCount = new Array(priorityOptions.length).fill(0);
    const statusCount = new Array(statusOptions.length).fill(0);
    let typeCount = new Array(typeOptions.length)
      .fill(0)
      .map((_, id) => ({ id, value: 0, label: typeOptions[id] }));
    const personnelCountMap = new Map();

    // Iterate over tickets to update counters
    tickets.forEach((ticket) => {
      const priorityIdx = priorityOptions.indexOf(ticket.priority);
      if (priorityIdx !== -1) {
        priorityCount[priorityIdx]++;
      }

      const statusIdx = statusOptions.indexOf(ticket.status);
      if (statusIdx !== -1) {
        statusCount[statusIdx]++;
      }

      const typeIdx = typeOptions.indexOf(ticket.type);
      if (typeIdx !== -1) {
        typeCount[typeIdx].value++;
      }

      // Count personnel tickets
      const personnelName = users.find(
        (user) => user._id.toString() === ticket.personnelId.toString()
      )?.name;
      if (personnelName) {
        const firstName = personnelName.split(" ")[0];
        personnelCountMap.set(
          firstName,
          (personnelCountMap.get(firstName) || 0) + 1
        );
      }
    });

    let topPersonnelCount;
    // Sort and slice the personnel count map to keep only the top 4 entries
    if (personnelCountMap.size > 4) {
      topPersonnelCount = Array.from(personnelCountMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([name, value], id) => ({ id, value, label: name }));
    } else {
      topPersonnelCount = Array.from(personnelCountMap.entries()).map(
        ([name, value], id) => ({ id, value, label: name })
      );
    }

    // Remove empty types
    typeCount = typeCount.filter((type) => type.value > 0);

    return res.status(200).send({
      priorityCount,
      statusCount,
      typeCount,
      topPersonnelCount,
    });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
