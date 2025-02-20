import { Document } from "mongoose"


export interface ITodoPayload {
    name: string
    status: boolean
}

export interface ITodo extends ITodoPayload,Document {
    createdAt?: Date
    updatedAt?: Date
}