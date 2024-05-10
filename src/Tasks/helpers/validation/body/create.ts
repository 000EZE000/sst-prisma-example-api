import { ITaskCreate } from "@/Tasks/domain/Task"


type ResponseValidation = ITaskCreate | null

export const validationBodyCreateTask = (body: string | undefined): ResponseValidation => {
  try {
    if (typeof body !== "string") return null
    const object = JSON.parse(body)
    const { title, description } = object
    if (typeof title === "string" && typeof description === "string") {
      return { title, description }
    }
    return null
  } catch (error) {
    return null
  }
}
