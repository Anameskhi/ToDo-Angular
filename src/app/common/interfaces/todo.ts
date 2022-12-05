import { TodoStatus } from "../types/todo-status"
import { IPerson } from "./person"

export interface ITodo {
  id: number
  title: string
  description: string
  status: TodoStatus
  dueDate: Date
  createdAt: Date
  updatedAt?: Date
  removedAt?: Date
  responsiblePerson: IPerson

}
