import app from "./app";
import connectDatabase from "./connectDatabase";

const port = process.env.PORT || 5000;
app.listen(port, () => {
  connectDatabase();
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
