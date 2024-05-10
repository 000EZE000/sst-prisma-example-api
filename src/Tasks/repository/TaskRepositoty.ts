import { Task } from "../domain/Task";
import { ITaskUseCase } from "../useCase/useCaseTask";
import { PrismaClient } from "@prisma/client";

export default class TaskRepository implements ITaskUseCase {
  constructor(private readonly db: PrismaClient) { }

  async create(task: Task) {
    try {
      await this.db.task.create({ data: task });
      await this.db.$disconnect();
      return { content: true };
    } catch (error) {
      return { content: null };
    }
  }

  async getAll() {
    try {
      const response = await this.db.task.findMany();
      await this.db.$disconnect();
      return { content: response };
    } catch (error) {
      return { content: [] };
    }
  }

  async getById(id: Task["id"]) {
    try {
      const response = await this.db.task.findFirst({ where: { id } });
      await this.db.$disconnect();
      return { content: response };
    } catch (error) {
      return { content: null };
    }
  }

  async update({ id, title, description }: Task) {
    try {
      await this.db.task.update({
        where: { id },
        data: { title, description },
      });
      await this.db.$disconnect();
      return { content: true };
    } catch (error) {
      return { content: null };
    }
  }

  async delete(id: string) {
    try {
      await this.db.task.delete({ where: { id } });
      await this.db.$disconnect();
      return { content: true };
    } catch (error) {
      return { content: null };
    }
  }
}
