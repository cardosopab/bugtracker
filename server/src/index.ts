import { createApp } from "./createApp";
import connectDatabase from "./connectDatabase";

const app = createApp();
const port = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.listen(port, () => {
  connectDatabase(MONGO_URI!);
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
