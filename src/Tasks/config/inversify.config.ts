import "reflect-metadata";
import { Container } from "inversify";
import { TYPE_TASK } from "./type";
import { ITaskService } from "../port/ITaskService";
import TaskService from "../adapter/TaskService";

export const container = new Container();
container.bind<ITaskService>(TYPE_TASK.TaskService).to(TaskService);
export const service = container.get<ITaskService>(TYPE_TASK.TaskService);
