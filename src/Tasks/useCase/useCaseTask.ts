import { Task } from "../domain/Task";

type Result<I, T> = Promise<{ content: I | T }>;

export interface ITaskUseCase {
  create(task: Task): Result<boolean, null>;
  getAll(): Result<Task[], []>;
  getById(id: Task["id"]): Result<Task, null>;
  update(task: Task): Result<boolean, null>;
  delete(id: Task["id"]): Result<boolean, null>;
}
