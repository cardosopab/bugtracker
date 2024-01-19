import { createApp } from "./createApp";
import connectDatabase from "./connectDatabase";

const app = createApp();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectDatabase();
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
