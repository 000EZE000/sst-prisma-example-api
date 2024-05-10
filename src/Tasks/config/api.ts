import { Api, Stack } from "sst/constructs";
export function RouterTask(api: Api, stack: Stack) {
  api.addRoutes(stack, {
    "POST /task/create": "src/Tasks/handler/http/post.task.create.handler",
    "GET /task/getAll": "src/Tasks/handler/http/get.task.all.handler",
    "GET /task/getById/{id}": "src/Tasks/handler/http/get.task.byId.handler",
    "PUT /task/update": "src/Tasks/handler/http/put.task.update.handler",
    "DELETE /task/delete/{id}": "src/Tasks/handler/http/delete.task.handler",
  });
}
