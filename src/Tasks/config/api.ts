import { Api, Stack } from "sst/constructs";
export function RouterTask(api: Api, stack: Stack) {
  api.addRoutes(stack, {
    "POST /task/create": "src/Tasks/handler/http/create.handler",
    "PUT /task/update": "src/Tasks/handler/http/put.task.update.handler",
    "DELETE /task/delete/{id}": "src/Tasks/handler/http/delete.task.handler",
    "GET /task/getAll": "src/Tasks/handler/http/getAll.handler",
  });
}
