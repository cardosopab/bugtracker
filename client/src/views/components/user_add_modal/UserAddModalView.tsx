import { Button, Card, CardHeader, Input, Modal, Grid } from "@mui/material";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";

interface UserEditModalViewProps {
  buttonLabel?: string;
  register: (name: string, options?: RegisterOptions) => any;
  onSubmit: (values: any) => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  errors: any;
  isModalOpen: boolean;
  handleModalToggle: () => void;
}

const UserEditModalView = ({
  buttonLabel,
  register,
  onSubmit,
  handleSubmit,
  errors,
  isModalOpen,
  handleModalToggle,
}: UserEditModalViewProps) => {
  return (
    <>
      <Button
        // fullWidth
        // style={
        //   buttonLabel
        //     ? { justifyContent: "flex-start" }
        //     : { justifyContent: "center" }
        // }
        sx={{ color: "white" }}
        onClick={() => handleModalToggle()}
      >
        {buttonLabel ? buttonLabel : "Add Person"}
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
          <CardHeader title={"Find person by email"} />
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
                  id="email-input"
                  name="email-input"
                  sx={{ marginTop: 2, marginBottom: 2 }}
                  placeholder="Email"
                  type="text"
                  {...register("email", { required: "Required" })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </Grid>
              <Grid
                container
                sx={{
                  justifyContent: "space-between",
                  marginTop: 3,
                  marginBottom: 2,
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Search
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
