import { Api, Stack } from "sst/constructs";
export function RouterTask(api: Api, stack: Stack) {
  api.addRoutes(stack, {
    "POST /task/create": "src/Tasks/handler/http/create.handler",
    "PUT /task/update": "src/Tasks/handler/http/update.handler",
    "DELETE /task/delete/{id}": "src/Tasks/handler/http/delete.handler",
    "GET /task/getAll": "src/Tasks/handler/http/getAll.handler",
  });
}
