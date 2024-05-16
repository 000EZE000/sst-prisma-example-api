import { Api, StackContext } from "sst/constructs";
import {
  initConfigAWSToPrisma,
  preparePrismaLayerFiles,
} from "@common/db_orm/prisma/config.aws";
import { RouterTask } from "@/Tasks/config/api";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { createEnvToSST } from "../enviroment/sst";
import {
  DATABASE_URL,
  DOMAIN,
  SUB_DOMAIN_DEV,
  SUB_DOMAIN_PROD,
} from "../enviroment/system";

export function ApiStack({ stack }: StackContext) {
  preparePrismaLayerFiles();
  const PrismaLayer = new lambda.LayerVersion(stack, "PrismaLayer", {
    description: "Prisma layer",
    code: lambda.Code.fromAsset("./layers/prisma"),
  });
  const enviroments = createEnvToSST(stack);
  // stack.setDefaultFunctionProps({
  //   memorySize: "128 MB",
  //   runtime: "nodejs18.x",
  //   architecture: "arm_64",
  //   logRetention: "one_day",
  // });
  const SUB_DOMAIN = stack.stage === "prod" ? SUB_DOMAIN_PROD : SUB_DOMAIN_DEV;
  const api = new Api(stack, "api", {
    // customDomain: {
    // domainName: `${SUB_DOMAIN}.${DOMAIN}`,
    //   hostedZone: DOMAIN,
    // },
    defaults: {
      function: {
        runtime: "nodejs18.x",
        // bind: enviroments,
        environment: {
          DATABASE_URL: DATABASE_URL,
        },
        nodejs: {
          esbuild: {
            external: ["@prisma/client", ".prisma"],
          },
        },
        layers: [PrismaLayer],
      },
    },
  });
  RouterTask(api, stack);
  stack.addOutputs({
    "API___AWS:": api.url,
    API: `http://${SUB_DOMAIN}.${DOMAIN}`,
  });
  return { api };
}
