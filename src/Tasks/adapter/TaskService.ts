import { prisma } from "../../common/db_orm/prisma/config";
import TaskRepository from "../repository/TaskRepositoty";
import { injectable } from "inversify";
import { HTTP_STATUS } from "../../common/http_response";
import { Task } from "../domain/Task";
import { ITaskService } from "../port/ITaskService";
import { validationBodyCreateTask } from "../helpers/validation/body/create";
import { validationUUID } from "../helpers/validation/path";
import { validationBodyUpdateTask } from "../helpers/validation/body/update";

type parameterCreate = string | undefined;

@injectable()
export default class TaskService implements ITaskService {
  private readonly repository = new TaskRepository(prisma);
  private readonly returnError = {
    statusCode: HTTP_STATUS.ERROR_SERVER,
    body: { content: "error server" },
  };

  async create(body: parameterCreate) {
    try {
      const createTask = validationBodyCreateTask(body);
      if (createTask === null) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          body: { content: "the body is incorrect" },
        };
      }
      const task = new Task(createTask);
      const response = await this.repository.create(task);
      if (response.content === null) {
        throw new Error();
      }
      return {
        statusCode: HTTP_STATUS.CREATE,
        body: { content: "The task was created successfully!" },
      };
    } catch (error) {
      return this.returnError;
    }
  }

  async getAll() {
    try {
      const { content } = await this.repository.getAll();
      return { statusCode: HTTP_STATUS.OK, body: { content } };
    } catch (error) {
      return this.returnError;
    }
  }

  async getById(path: string | undefined) {
    try {
      const id = validationUUID(path);
      if (id === null) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          body: { content: "the id path is empty" },
        };
      }
      const { content } = await this.repository.getById(id);
      if (content === null) {
        return {
          statusCode: HTTP_STATUS.NOT_FOUND,
          body: { content: "task not found" },
        };
      }
      return { statusCode: HTTP_STATUS.OK, body: { content } };
    } catch (error) {
      return this.returnError;
    }
  }

  async update(body: string | undefined) {
    try {
      const updateTask = validationBodyUpdateTask(body);
      if (updateTask === null) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          body: { content: "the body is incorrect" },
        };
      }
      await this.repository.update(updateTask);
      return {
        statusCode: HTTP_STATUS.CREATE,
        body: {
          content: `the task with ${updateTask.id} has been updated successfully`,
        },
      };
    } catch (error) {
      return this.returnError;
    }
  }

  async delete(path: string | undefined) {
    try {
      const id = validationUUID(path);
      if (id === null) {
        return {
          statusCode: HTTP_STATUS.BAD_REQUEST,
          body: { content: "the id path is empty" },
        };
      }
      await this.repository.delete(id);
      return {
        statusCode: HTTP_STATUS.CREATE,
        body: {
          content: `the task with ${id} has been deleted successfully`,
        },
      };
    } catch (error) {
      return this.returnError;
    }
  }
}
