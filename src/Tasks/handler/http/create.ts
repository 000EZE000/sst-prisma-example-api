import { service } from "@tasks/config/inversify.config";
import { convertResponseHandlerToJson } from "@tasks/helpers/convertToJson";
import { HTTP_STATUS } from "@common/http_response";
import { Handler } from "./type";

export const handler: Handler = async (event) => {
  try {
    const responseService = await service.create(event.body);
    const convert = convertResponseHandlerToJson(responseService);
    return convert;
  } catch (error) {
    return {
      statusCode: HTTP_STATUS.ERROR_SERVER,
      body: JSON.stringify({ content: "error server" }),
    };
  }
};
