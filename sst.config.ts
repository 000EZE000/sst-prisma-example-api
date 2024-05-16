import { SSTConfig } from "sst";
import { ApiStack } from "./src/common/config_api";

export default {
  config(_input) {
    return {
      name: "sst-prisma",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(ApiStack);
    app.setDefaultRemovalPolicy("destroy");
  },
} satisfies SSTConfig;
