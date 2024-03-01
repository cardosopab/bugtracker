import {
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Input,
  Modal,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import User from "../../../models/User";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";
import { roles } from "../../../constants/userConstants";

interface UserEditModalViewProps {
  buttonLabel?: string;
  user: User;
  register: (name: string, options?: RegisterOptions) => any;
  onSubmit: (values: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: any;
  selectedRole: string;
  isModalOpen: boolean;
  handleRoleDropdown: (event: any) => void;
  handleModalToggle: () => void;
  handleUserRemoval: (userId: string) => void;
}

const UserEditModalView = ({
  buttonLabel,
  user,
  register,
  onSubmit,
  handleSubmit,
  errors,
  selectedRole,
  isModalOpen,
  handleRoleDropdown,
  handleModalToggle,
  handleUserRemoval,
}: UserEditModalViewProps) => {
  return (
    <>
      <Button
        fullWidth
        style={
          buttonLabel
            ? { justifyContent: "flex-start" }
            : { justifyContent: "center" }
        }
        onClick={() => handleModalToggle()}
      >
        {buttonLabel ? buttonLabel : "Edit"}
      </Button>
      <Modal open={isModalOpen} onClose={() => handleModalToggle()}>
        <Card
          className="center"
          sx={{
            minWidth: "90%",
            maxWidth: "400px",
            width: "auto",
            margin: "0 auto",
            "@media (min-width: 600px)": {
              minWidth: "unset", // Remove the minWidth on larger screens
            },
          }}
        >
          <CardHeader title={`Edit User: ${user.name}`} />
          <Grid container padding={2}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Grid item xs={12}>
                <Input
                  id="name-input"
                  name="name-input"
                  defaultValue={user.name}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Name"
                  type="text"
                  {...register("name", { required: "Required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <Input
                  id="email-input"
                  name="email-input"
                  defaultValue={user.email}
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Email"
                  type="text"
                  {...register("email", { required: "Required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <FormControl margin="normal" fullWidth>
                  <InputLabel id="admin-dropdown-label">
                    Is User Admin
                  </InputLabel>
                  <Select
                    labelId="admin-dropdown-label"
                    id="admin-dropdown"
                    name="admin-dropdown"
                    value={selectedRole}
                    label="Is User Admin"
                    onChange={handleRoleDropdown}
                  >
                    {roles.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  marginTop: 3,
                  marginBottom: 2,
                }}
              >
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleUserRemoval(user._id)}
                >
                  Delete User
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Update User
                </Button>
              </Grid>
            </form>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};
export default UserEditModalView;
