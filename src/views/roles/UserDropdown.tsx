import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import User from '../../models/User';

interface DrowDownProps {
    users: User[];
    selectedValue: string;
    onChange: any;
}

const UserDropdown = (props: DrowDownProps) => {
    const { users, selectedValue, onChange } = props
    return (
        <FormControl>
            <InputLabel id="dropdown-label">Select an option</InputLabel>
            <Select
                labelId="dropdown-label"
                value={selectedValue}
                name={selectedValue}
                label="Select an option"
                onChange={onChange}
            >
                {users.map(option => (
                    <MenuItem key={option.id} value={option.name} >
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default UserDropdown;
