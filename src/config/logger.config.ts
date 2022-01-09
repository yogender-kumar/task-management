import { createLogger } from "bunyan";

const logger = createLogger({
  name: "API logs",
});

export default logger;
