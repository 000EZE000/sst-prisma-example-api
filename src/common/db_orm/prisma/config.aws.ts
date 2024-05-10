import fs from "fs-extra";
import path from "node:path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Stack } from "sst/constructs";

export const preparePrismaLayerFiles = () => {
  const layerPath = "./layers/prisma";
  fs.rmSync(layerPath, { force: true, recursive: true });
  fs.mkdirSync(layerPath, { recursive: true });
  const files = [
    "node_modules/.prisma",
    "node_modules/@prisma/client",
    "node_modules/prisma/build",
  ];
  for (const file of files) {
    fs.copySync(file, path.join(layerPath, "nodejs", file), {
      filter: (src) => !src.endsWith("so.node") || src.includes("rhel"),
    });
  }
};

export const getPrismaLayer = (stack: Stack) => {
  return new lambda.LayerVersion(stack, "PrismaLayer", {
    description: "Prisma layer",
    code: lambda.Code.fromAsset("./layers/prisma"),
  });
};

export const initConfigAWSToPrisma = (stack: Stack) => {
  preparePrismaLayerFiles();
  const PrismaLayer = new lambda.LayerVersion(stack, "PrismaLayer", {
    description: "Prisma layer",
    code: lambda.Code.fromAsset("./layers/prisma"),
  });
  return { PrismaLayer };
};
