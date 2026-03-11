export type TodoApiStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface Todo {
    id: string;
    title: string;
    status: TodoApiStatus;
}

export interface TodoListResponse {
    todoList: Todo[];
    $schema: string;
}
