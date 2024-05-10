import { HTTP_STATUS } from "@/common/http_response";
import { ResponseHandler } from "../port/ITaskService";

export const convertResponseHandlerToJson = (
  response: ResponseHandler
) => {
  try {
    const { body } = response;
    const convert = { ...response, body: JSON.stringify(body) }
    return convert;
  } catch (error) {
    return { statusCode: HTTP_STATUS.ERROR_SERVER, body: JSON.stringify({ content: "error Server" }) }
  }
};
