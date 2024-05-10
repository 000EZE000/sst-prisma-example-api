import { randomUUID } from "crypto";

export interface ITask {
  id: string;
  title: string;
  description: string;
}

export type ITaskCreate = Pick<ITask, "description" | "title">;

export class Task implements ITask {
  public readonly id: string;
  public title: string;
  public description: string;
  constructor({ title, description }: ITaskCreate) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
  }
}
