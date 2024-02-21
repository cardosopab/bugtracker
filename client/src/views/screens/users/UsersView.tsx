import {
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Paper,
  Divider,
  Input,
  Button,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  InputLabel,
  FormControl,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";
import { Clear, Visibility, VisibilityOff } from "@mui/icons-material";
import User from "../../../models/User";
import UserEditModalController from "../../../controllers/components/UserEditModalController";

interface UsersViewProps {
  users: User[];
  register: (name: string, options?: RegisterOptions) => any;
  onSubmit: (values: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: any;
  selectedIsAdmin: string;
  handleIsAdminDropdown: (event: any) => void;

  showPassword: boolean;
  handleClickShowPassword: () => void;
  handleMouseDownPassword: (event: React.MouseEvent<HTMLButtonElement>) => void;
  searchValue: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchClear: () => void;
  filteredUsers: User[] | undefined;
}

const UsersView = ({
  users,
  register,
  onSubmit,
  handleSubmit,
  errors,
  selectedIsAdmin,
  handleIsAdminDropdown,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  searchValue,
  handleSearch,
  handleSearchClear,
  filteredUsers,
}: UsersViewProps) => {
  const theme = useTheme();
  const isLargeView = useMediaQuery(theme.breakpoints.up("lg")); // Check for lg screen
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        {users.length > 0 ? (
          <Grid container spacing={2} padding={2}>
            {/* Title/Header */}
            <Grid item xs={12}>
              <h1>User Assignment</h1>
            </Grid>

            {/* First Column */}
            <Grid item xs={12} sm={4}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Input
                  id="name-input"
                  name="name-input"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Name"
                  type="text"
                  {...register("name", { required: "Required" })}
                />
                {errors.name && <p>{errors.name.message}</p>}
                <Input
                  id="email-input"
                  name="email-input"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Email"
                  type="text"
                  {...register("email", { required: "Required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
                <Input
                  id="password-input"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  {...register("password", { required: "Required" })}
                />
                {errors.password && <p>{errors.password.message}</p>}
                <FormControl margin="normal" fullWidth>
                  <InputLabel
                    // id="is_admin-dropdown-label"
                    htmlFor="is_admin-dropdown"
                  >
                    Is User Admin
                  </InputLabel>
                  <Select
                    id="is_admin-dropdown"
                    // labelId="is_admin-dropdown-label"
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
                <Button
                  variant={"contained"}
                  type="submit"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Create User
                </Button>
              </form>
              <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
            </Grid>

            {/* Second Column */}
            <Grid item xs={12} sm={8}>
              <Card>
                <CardHeader title="Available Users" subheader="" />
                <Input
                  // fullWidth
                  id="user-filter"
                  sx={{ margin: 2, marginRight: 2 }}
                  placeholder="Search by User Name"
                  type="text"
                  value={searchValue}
                  onChange={handleSearch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={handleSearchClear}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {searchValue.length > 0 && <Clear />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <TableContainer component={Paper}>
                  <Table style={{ tableLayout: "fixed" }}>
                    <TableHead>
                      <TableRow>
                        <TableCell>User Name</TableCell>
                        <TableCell>Admin Status</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(filteredUsers?.length ? filteredUsers : users).map(
                        (user) => {
                          const { _id, name, email, role } = user;
                          const isAdmin = role === "Admin";
                          return (
                            <TableRow key={_id}>
                              <TableCell>{name}</TableCell>
                              <TableCell>
                                {isAdmin ? "True" : "False"}
                              </TableCell>
                              <TableCell
                                style={
                                  isLargeView
                                    ? {}
                                    : {
                                        whiteSpace: "normal",
                                        wordWrap: "break-word",
                                      }
                                }
                              >
                                {email}
                              </TableCell>
                              <TableCell>
                                <UserEditModalController user={user} />
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
          >
            <Grid item xs={3}>
              <Card>
                <CardHeader title="No users have been created yet." />
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
};

export default UsersView;
