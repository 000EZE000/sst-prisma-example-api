import { service } from "@/Tasks/config/inversify.config";
import { convertResponseHandlerToJson } from "@/Tasks/helpers/convertToJson";
import { HTTP_STATUS } from "@/common/http_response";
import { Handler } from "./type";
import { Config } from "sst/node/config";
import { getEnvToSST_2 } from "@/Tasks/config/config.env";
export const handler: Handler = async (_event) => {
  try {
    const data = Config;
    console.log({ data });
    const { TEST_TEST } = getEnvToSST_2("TEST_TEST", { ...Config });
    console.log({ TEST_TEST });
    const responseService = await service.getAll();
    const convert = convertResponseHandlerToJson(responseService);
    return convert;
  } catch (error) {
    console.log({ error });
    return {
      statusCode: HTTP_STATUS.ERROR_SERVER,
      body: JSON.stringify({ content: "error server" }),
    };
  }
};
