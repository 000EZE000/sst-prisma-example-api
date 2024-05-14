import { SSTConfig } from "sst";
import { ApiStack } from "./src/common/config_api";
export default {
  config(input) {
    return {
      name: "tasks-api-prisma",
      region: "us-east-1",
      stage: input?.stage === "prod" ? "prod" : "dev",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  },
} satisfies SSTConfig;
