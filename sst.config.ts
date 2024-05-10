import { SSTConfig } from "sst";
import { ApiStack } from "./src/common/config_api";
export default {
  config(_input) {
    return {
      name: "tasks-api-prisma",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
  },
} satisfies SSTConfig;
