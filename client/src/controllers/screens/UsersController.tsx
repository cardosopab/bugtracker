import { useSelector } from "react-redux";
import UsersView from "../../views/screens/users/UsersView";
import { RootState } from "../../models/redux/store";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUserActions } from "../../models/database/hooks/useUserActions";
import User from "../../models/User";

const UsersController = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const users = useSelector((state: RootState) => state.users.value);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const createUser = useUserActions().createUser;
  const [searchValue, setSearchValue] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values: any) => {
    createUser(values.name, values.email, values.password, isAdmin);
    reset();
    setIsAdmin(false);
  };

  const handleIsAdminDropdown = (event: any) => {
    const eventValue = event.target.value as string;
    const eventIsAdmin = eventValue === "YES";
    setIsAdmin(eventIsAdmin);
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
      selectedIsAdmin={isAdmin ? "YES" : "NO"}
      handleIsAdminDropdown={handleIsAdminDropdown}
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
