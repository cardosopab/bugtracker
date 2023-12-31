import { Button, Card, Input, Typography } from "@mui/material";
import {
  FieldValues,
  RegisterOptions,
  UseFormHandleSubmit,
} from "react-hook-form";

interface AuthViewProps {
  register: (name: string, options?: RegisterOptions) => any;
  handleButtonToggle: () => void;
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  handleDemoLogin: () => void;
  onSubmit: (values: any) => void;
  isSignIn: boolean;
  errors: any;
}

const AuthView = ({
  isSignIn,
  register,
  handleButtonToggle,
  handleSubmit,
  handleDemoLogin,
  onSubmit,
  errors,
}: AuthViewProps) => {
  return (
    <div className="center">
      <Card style={{ padding: "2em" }}>
        <div className="column">
          <Typography variant="h4" align="center" margin="0 0 .5em">
            {isSignIn ? "Sign In" : "Sign Up"}
          </Typography>
          <div className="row">
            <Button
              variant="outlined"
              onClick={() => handleButtonToggle()}
              disabled={isSignIn}
            >
              Sign In
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleButtonToggle()}
              disabled={!isSignIn}
            >
              Sign Up
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {!isSignIn ? (
              <Input
                type="name"
                style={{ display: "block", margin: "1em 0" }}
                {...register("name", {
                  required: "Required",
                })}
                placeholder="Full Name"
              />
            ) : null}

            <Input
              type="email"
              style={{ display: "block", margin: "1em 0" }}
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              placeholder="Email"
            />
            {errors.email && <p>{errors.email.message?.toString()}</p>}
            <Input
              type="password"
              style={{ display: "block", margin: "1em 0" }}
              {...register("password", {
                required: "Required",
              })}
              placeholder="Password"
            />
            {errors.password && <p>{errors.password.message?.toString()}</p>}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <Button
              onClick={() => handleDemoLogin()}
              variant="contained"
              color="success"
              fullWidth
            >
              Demo
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AuthView;
