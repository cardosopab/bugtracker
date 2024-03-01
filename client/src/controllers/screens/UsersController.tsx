import { useSelector } from "react-redux";
import UsersView from "../../views/screens/users/UsersView";
import { RootState } from "../../models/redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import User from "../../models/User";
import { roles } from "../../constants/userConstants";

const UsersController = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const users = useSelector((state: RootState) => state.users.value);
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const createUser = useUserActions().createUser;
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: any) => {
    createUser(values.name, values.email, values.password, selectedRole);
    reset();
    setSelectedRole(roles[0]);
  };

  const handleRoleDropdown = (event: any) => {
    setSelectedRole(event.target.value);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchValue(query);

    if (query) {
      // Filter the users based on the search query.
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      // When the search input is empty, show the full list.
      setFilteredUsers([]);
    }
  };

  const handleSearchClear = () => {
    setSearchValue("");
    setFilteredUsers([]);
  };

  return (
    <UsersView
      users={users}
      register={register}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      errors={errors}
      selectedRole={selectedRole}
      handleRoleDropdown={handleRoleDropdown}
      showPassword={showPassword}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      searchValue={searchValue}
      handleSearch={handleSearch}
      handleSearchClear={handleSearchClear}
      filteredUsers={filteredUsers}
    />
  );
};

export default UsersController;
