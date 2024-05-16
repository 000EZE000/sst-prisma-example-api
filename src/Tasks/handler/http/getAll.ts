import { service } from "../../config/inversify.config";
import { convertResponseHandlerToJson } from "../../helpers/convertToJson";
import { ApiHandler } from "sst/node/api";
import { Handler } from "./type";

export const handler: Handler = async (_event) => {
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
};
