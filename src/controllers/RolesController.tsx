import { SetStateAction, useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { batch, useDispatch, useSelector } from "react-redux";
import { RootState } from "../models/redux/store";
import { updateUserRole } from "../models/database/database";
import { database } from "../models/database/firebase-config";
import { USERS } from "../models/database/databaseEndpoints";
import User from "../models/User";
import { setUsers } from "../models/redux/usersSlice";
import RolesView from "../views/roles/RolesView";

function RolesController() {
    // const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.value);
    const roles = ['Admin', 'Manager', 'Developer', 'Submitter',];
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
    // useEffect(() => {
        // const unsubscribe =
        //     onSnapshot(
        //         query(collection(database, USERS), orderBy("createdAt", "desc")),
        //         (querySnapshot) => {
        //             const arr: User[] = [];
        //             querySnapshot.forEach((doc) => {
        //                 const data = doc.data();
        //                 console.log('data', data)
        //                 const user: User = {
        //                     id: data.id,
        //                     name: data.name,
        //                     createdAt: data.createdAt,
        //                     email: data.email,
        //                     role: data.role,
        //                 };
        //                 arr.push(user)
        //             });
        //             batch(() => {
        //                 dispatch(setUsers(arr));
        //             });
        //             setSelectedUserName(arr[0].name)
        //             setSelectedRole(arr[0].role)
        //         });
        // return () => unsubscribe();
    // }, [])
    return (
        <RolesView users={users} selectedUserName={selectedUserName} handleUserDropdown={handleUserDropdown} roles={roles} handleRoleDropdown={handleRoleDropdown} handleRoleSubmit={handleRoleSubmit} selectedRole={selectedRole} />
    )

}
export default RolesController