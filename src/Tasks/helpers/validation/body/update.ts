import { ITask } from "@/Tasks/domain/Task";

type ResponseValidation = ITask | null;

export const validationBodyUpdateTask = (
  body: string | undefined
): ResponseValidation => {
  try {
    if (typeof body !== "string") return null;
    const object = JSON.parse(body);
    const { id, title, description } = object;
    if (
      typeof title === "string" &&
      typeof description === "string" &&
      typeof id === "string"
    ) {
      return { title, description, id };
    }
    return null;
  } catch (error) {
    return null;
  }
};
