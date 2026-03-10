import { useRouter } from "expo-router";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TodoCard, { TodoStatus } from "../../components/todoCard/TodoCard";
import { TodoApiStatus } from "../../api/todo";
import { useTodos } from "../../hooks/todo/useTodos";

const statusMap: Record<TodoApiStatus, TodoStatus> = {
    TODO: TodoStatus.TODO,
    IN_PROGRESS: TodoStatus.IN_PROGRESS,
    DONE: TodoStatus.DONE,
};

export default function Index() {
    const router = useRouter();
    const { todos, isLoading, error } = useTodos();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.editButton} onPress={() => router.push("/create-task")}>
                    <Text style={styles.editButtonText}>Editer</Text>
                </Pressable>
            </View>

            {isLoading ? (
                <View style={styles.feedback}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.feedbackText}>Chargement des taches...</Text>
                </View>
            ) : null}

            {error ? (
                <View style={styles.feedback}>
                    <Text style={styles.errorText}>{error}</Text>
                    <Text style={styles.helperText}>Verifie que `json-server` tourne bien sur le port 3000.</Text>
                </View>
            ) : null}

            {!isLoading && !error
                ? todos.map((todo) => (
                    <TodoCard key={todo.id} title={todo.title} status={statusMap[todo.status]} />
                ))
                : null}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        marginTop: 32,
        paddingBottom: 32,
    },
    header: {
        alignItems: "flex-end",
        marginBottom: 8,
    },
    editButton: {
        backgroundColor: "#111827",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    editButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
    feedback: {
        alignItems: "center",
        paddingVertical: 32,
        gap: 10,
    },
    feedbackText: {
        fontSize: 15,
        color: "#374151",
    },
    errorText: {
        fontSize: 15,
        color: "#B91C1C",
        textAlign: "center",
    },
    helperText: {
        fontSize: 13,
        color: "#6B7280",
        textAlign: "center",
    },
});
