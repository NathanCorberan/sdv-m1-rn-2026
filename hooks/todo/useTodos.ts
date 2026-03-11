import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { createTodo, fetchTodos } from "../../api/todo";
import type { Todo, TodoApiStatus } from "../../model/todo/types";

export function useTodos() {
    const isFocused = useIsFocused();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await fetchTodos();
            setTodos(data);
        } catch (loadError) {
            setError(loadError instanceof Error ? loadError.message : "Une erreur est survenue.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        void refetch();
    }, [refetch, isFocused]);

    return {
        todos,
        isLoading,
        error,
        refetch,
    };
}

export function useCreateTodo() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async (title: string, status: TodoApiStatus) => {
        try {
            setIsSubmitting(true);
            setError(null);
            return await createTodo({ title, status });
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Une erreur est survenue.";
            setError(message);
            throw new Error(message);
        } finally {
            setIsSubmitting(false);
        }
    }, []);

    return {
        submit,
        isSubmitting,
        error,
    };
}
