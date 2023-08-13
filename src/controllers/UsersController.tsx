import { useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import User from "../models/User";
import { database } from "../models/database/firebase-config";
import { USERS } from "../models/database/databaseEndpoints";
import { batch, useDispatch, useSelector } from "react-redux";
import { setUsers } from "../models/redux/usersSlice";
import UsersView from "../views/users/UsersView";
import { RootState } from "../models/redux/store";
import { useForm } from "react-hook-form";
import { createUser } from "../models/database/database";

function UsersController() {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.value)

    const onSubmit = (values: any) => {
        console.log(values.name, values.email);
        createUser(values.name, values.email);
        // values.name = '';
        // values.email = '';
    };
    useEffect(() => {
        const unsubscribe =
            onSnapshot(
                query(collection(database, USERS), orderBy("createdAt", "desc")),
                (querySnapshot) => {
                    const arr: User[] = [];
                    querySnapshot.forEach((doc) => {
                        const data = doc.data();
                        const user: User = {
                            id: data.id,
                            createdAt: data.createdAt,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                        };
                        arr.push(user)
                        console.log(user)
                    });
                    batch(() => {
                        dispatch(setUsers(arr));
                    });
                });
        return () => unsubscribe();
    }, [])
    return (
        <>
            <UsersView users={users} handleSubmit={handleSubmit} onSubmit={onSubmit} register={register} errors={errors} />
        </>
    )
}
export default UsersController