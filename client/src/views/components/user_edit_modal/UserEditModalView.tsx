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

interface UserEditModalViewProps {
  buttonLabel?: string;
  user: User;
  nameInput: string;
  selectedIsAdmin: string;
  isModalOpen: boolean;
  handleNameInputChange: (event: any) => void;
  handleIsAdminDropdown: (event: any) => void;
  handleModalToggle: () => void;
  handleUserUpdate: () => void;
  handleUserRemoval: (userId: string) => void;
}

const UserEditModalView = ({
  buttonLabel,
  user,
  nameInput,
  selectedIsAdmin,
  isModalOpen,
  handleNameInputChange,
  handleIsAdminDropdown,
  handleModalToggle,
  handleUserUpdate,
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
            <Grid item xs={12}>
              <FormControl fullWidth margin={"normal"}>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input
                  required
                  id="name-input"
                  value={nameInput}
                  onChange={handleNameInputChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth margin={"normal"}>
                <InputLabel id="is_admin-dropdown-label">
                  Is User Admin
                </InputLabel>
                <Select
                  id="admin-select"
                  labelId="is_admin-dropdown-label"
                  value={selectedIsAdmin}
                  name={selectedIsAdmin}
                  label="Is User Admin"
                  onChange={handleIsAdminDropdown}
                >
                  {["NO", "YES"].map((option) => (
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
              <Button
                variant="contained"
                color="primary"
                onClick={handleUserUpdate}
              >
                Update User
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Modal>
    </>
  );
};
export default UserEditModalView;
