import { Stack } from "aws-cdk-lib/core";
import { Config } from "sst/constructs";

export const createEnvToSST = (stack: Stack) => {
  const nameEnv: string[] = ["DATABASE_URL"];
  return nameEnv.map((value) => new Config.Secret(stack, value));
};

export const getEnvToSST = (nameEnv: string, config: any) => {
  try {
    return {
      [nameEnv]: (config as unknown as Record<string, string>)?.[nameEnv],
    };
  } catch (error) {
    console.log(`--------------------`);
    console.log(`${nameEnv} env is NULL`);
    console.log(`--------------------`);
    return { [nameEnv]: null };
  }
};
