import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import TodoCard, { TodoStatus } from "../../components/todoCard/TodoCard";
import { useTodos } from "../../hooks/todo/useTodos";
import type { Todo, TodoApiStatus } from "../../model/todo/types";

const statusMap: Record<TodoApiStatus, TodoStatus> = {
    TODO: TodoStatus.TODO,
    IN_PROGRESS: TodoStatus.IN_PROGRESS,
    DONE: TodoStatus.DONE,
};

export default function Index() {
    const router = useRouter();
    const { todos, isLoading, error } = useTodos();
    const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

    return (
        <>
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
                        <Text style={styles.helperText}>
                            Verifie que `EXPO_PUBLIC_API_BASE_URL` est correcte et que `json-server` tourne.
                        </Text>
                    </View>
                ) : null}

                {!isLoading && !error
                    ? todos.map((todo) => (
                        <TodoCard
                            key={todo.id}
                            title={todo.title}
                            status={statusMap[todo.status]}
                            onPress={() => setSelectedTodo(todo)}
                        />
                    ))
                    : null}
            </ScrollView>

            <Modal
                animationType="slide"
                transparent
                visible={selectedTodo !== null}
                onRequestClose={() => setSelectedTodo(null)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setSelectedTodo(null)}>
                    <Pressable style={styles.modalCard} onPress={() => undefined}>
                        <Text style={styles.modalTitle}>Detail de la tache</Text>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalLabel}>Titre</Text>
                            <Text style={styles.modalValue}>{selectedTodo?.title}</Text>
                        </View>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalLabel}>Statut</Text>
                            <View style={styles.modalBadge}>
                                <Text style={styles.modalBadgeText}>
                                    {selectedTodo ? statusMap[selectedTodo.status] : ""}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.modalSection}>
                            <Text style={styles.modalLabel}>Identifiant</Text>
                            <Text style={styles.modalValue}>{selectedTodo?.id}</Text>
                        </View>
                        <Pressable style={styles.closeButton} onPress={() => setSelectedTodo(null)}>
                            <Text style={styles.closeButtonText}>Fermer</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
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
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(17, 24, 39, 0.45)",
        justifyContent: "center",
        padding: 24,
    },
    modalCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        padding: 24,
        gap: 18,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    modalSection: {
        gap: 8,
    },
    modalLabel: {
        fontSize: 13,
        fontWeight: "700",
        color: "#6B7280",
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    modalValue: {
        fontSize: 18,
        color: "#1F2937",
        fontWeight: "600",
    },
    modalBadge: {
        alignSelf: "flex-start",
        backgroundColor: "#DBEAFE",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    modalBadgeText: {
        color: "#1D4ED8",
        fontSize: 14,
        fontWeight: "700",
    },
    closeButton: {
        marginTop: 8,
        alignSelf: "flex-end",
        backgroundColor: "#111827",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 12,
    },
    closeButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});
