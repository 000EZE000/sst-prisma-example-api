import { HTTP_STATUS } from "@/common/http_response";
import { Task } from "../domain/Task";

export type ResponseHandler = {
  statusCode: HTTP_STATUS;
  body: { content: string | Task[] | Task | null };
};

type ResponseHandlerPromise = Promise<ResponseHandler>;

export interface ITaskService {
  create(task: string | undefined): ResponseHandlerPromise;
  getAll(): ResponseHandlerPromise;
  getById(id: string | undefined): ResponseHandlerPromise;
  update(stack: string | undefined): ResponseHandlerPromise;
  delete(id: string | undefined): ResponseHandlerPromise;
}
