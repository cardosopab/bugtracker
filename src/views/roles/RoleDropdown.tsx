import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface DrowDownProps {
    roles: string[];
    selectedValue: string;
    onChange: any;
}

const RoleDropdown = (props: DrowDownProps) => {
    const { roles, selectedValue, onChange } = props
    return (
        <FormControl>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
                labelId="dropdown-label"
                value={selectedValue}
                label="Select an option"
                onChange={onChange}
            >
                {roles.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default RoleDropdown;
