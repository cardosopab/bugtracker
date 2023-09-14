import { useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import { updateUserRole } from "../models/database/database";
import RolesView from "../views/roles/RolesView";
import { SetStateAction, useState } from "react";
import { roles } from "../constants/userConstants";

function RolesController() {
    // const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.value);
    const [selectedUserName, setSelectedUserName] = useState(users.length > 0 ? users[0].name : '');
    const [selectedUserId, setSelectedUserId] = useState(users.length > 0 ? users[0].id : '');
    const [selectedRole, setSelectedRole] = useState(users.length > 0 ? users[0].role : '');


    const handleUserDropdown = (event: React.ChangeEvent<{ value: unknown }>) => {
        const selectedUserName = event.target.value as string;
        const selectedUserObj = users.find(user => user.name === selectedUserName);

        if (selectedUserObj) {
            setSelectedUserId(selectedUserObj.id);
            setSelectedUserName(selectedUserName);
        }
    };

    const handleRoleDropdown = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedRole(event.target.value);
    }
    const handleRoleSubmit = () => {
        console.log(selectedUserId);
        updateUserRole(selectedUserId, selectedRole);

    }
    return (
        <RolesView users={users} selectedUserName={selectedUserName} handleUserDropdown={handleUserDropdown} roles={roles} handleRoleDropdown={handleRoleDropdown} handleRoleSubmit={handleRoleSubmit} selectedRole={selectedRole} />
    )

}
export default RolesController