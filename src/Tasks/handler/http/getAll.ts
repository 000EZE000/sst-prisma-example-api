import { service } from "../../config/inversify.config";
import { convertResponseHandlerToJson } from "../../helpers/convertToJson";
// import { HTTP_STATUS } from "@/common/http_response";
import { Handler } from "./type";
import { ApiHandler } from "sst/node/api";
// import { Config } from "sst/node/config";
// import { getEnvToSST_2 } from "@/Tasks/config/config.env";

export const handler = ApiHandler(async (_event) => {
  try {
    const responseService = await service.getAll();
    const convert = convertResponseHandlerToJson(responseService);
    return convert;
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ content: "error server" }),
    };
  }
});
