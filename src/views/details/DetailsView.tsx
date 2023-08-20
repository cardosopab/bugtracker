import { Card, CardHeader, FormControl, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Project from "../../models/Project"

interface DetailsProps {
    details: Project
}
const DetailsView = (props: DetailsProps) => {
    // const { selectedValue, onChange, options } = props;
    const { details } = props;
    const name = details.name;
    const id = details.id;
    const description = details.description;
    const createdAt = details.createdAt;
    const personnel = details.personnel;
    return (
        <>
            <div className="row">
                <div className="column">
                    <Card>
                        <CardHeader title={`Details for ${name}`} />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {personnel.map(({ id, name, email, role }) => (
                                        <TableRow key={id}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>{role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>
                <div className="column">
                    <Card>
                        <CardHeader title={`Tickets for ${name}`} />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Submitter</TableCell>
                                        <TableCell>Developer</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Created</TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {personnel.map(({ id, name, email, role }) => (
                                        <TableRow key={id}>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>{role}</TableCell>
                                            <TableCell>{name}</TableCell>
                                            <TableCell>{email}</TableCell>
                                            <TableCell>{role}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                </div>
            </div>
            {/* <FormControl>
                <InputLabel id="dropdown-label">Select an option</InputLabel>
                <Select
                    labelId="dropdown-label"
                    value={selectedValue}
                    name={selectedValue}
                    label="Select an option"
                    onChange={onChange}
                >
                    {options.map(option => (
                        <MenuItem key={option.id} value={option.name} >
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl> */}
        </>
    )
}
export default DetailsView