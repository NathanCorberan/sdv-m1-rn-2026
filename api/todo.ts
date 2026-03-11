import type { Todo, TodoApiStatus } from "../model/todo/types";

function getBaseUrl() {
    const apiBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

    if (!apiBaseUrl) {
        throw new Error("La variable EXPO_PUBLIC_API_BASE_URL est manquante dans le fichier .env.");
    }

    return apiBaseUrl.replace(/\/+$/, "");
}

async function fetchWithTimeout(input: string, init?: RequestInit) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
        return await fetch(input, {
            ...init,
            signal: controller.signal,
        });
    } finally {
        clearTimeout(timeoutId);
    }
}

export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetchWithTimeout(`${getBaseUrl()}/todoList`);

    if (!response.ok) {
        throw new Error("Impossible de recuperer les taches.");
    }

    return response.json();
}

export async function createTodo(payload: Omit<Todo, "id">): Promise<Todo> {
    const response = await fetchWithTimeout(`${getBaseUrl()}/todoList`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error("Impossible de creer la tache.");
    }

    return response.json();
}

export type { Todo, TodoApiStatus };
