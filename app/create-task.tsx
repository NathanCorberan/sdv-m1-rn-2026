import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useCreateTodo } from "../hooks/todo/useTodos";
import { TodoStatus } from "../components/todoCard/TodoCard";
import type { TodoApiStatus } from "../model/todo/types";

const statusOptions = [TodoStatus.TODO, TodoStatus.IN_PROGRESS, TodoStatus.DONE];
const statusToApiValue: Record<TodoStatus, TodoApiStatus> = {
    [TodoStatus.TODO]: "TODO",
    [TodoStatus.IN_PROGRESS]: "IN_PROGRESS",
    [TodoStatus.DONE]: "DONE",
};

export default function CreateTaskScreen() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState<TodoStatus>(TodoStatus.TODO);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { submit, isSubmitting } = useCreateTodo();

    async function handleCreateTask() {
        if (!title.trim()) {
            Alert.alert("Titre requis", "Merci de renseigner un titre pour la tache.");
            return;
        }

        try {
            await submit(title.trim(), statusToApiValue[status]);
            router.back();
        } catch {
            Alert.alert(
                "Erreur",
                "La tache n'a pas pu etre creee. Verifie `EXPO_PUBLIC_API_BASE_URL` et le serveur json-server.",
            );
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Creer une tache" }} />

            <Text style={styles.title}>Nouvelle tache</Text>
            <Text style={styles.subtitle}>Renseigne le titre et le statut de la tache.</Text>

            <View style={styles.form}>
                <View style={styles.field}>
                    <Text style={styles.label}>Titre</Text>
                    <TextInput
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Ex: Acheter du lait"
                        style={styles.input}
                    />
                </View>

                <View style={styles.field}>
                    <Text style={styles.label}>Statut</Text>
                    <View>
                        <Pressable
                            style={styles.dropdownTrigger}
                            onPress={() => setIsDropdownOpen((current) => !current)}
                        >
                            <Text style={styles.dropdownTriggerText}>{status}</Text>
                            <Text style={styles.dropdownArrow}>{isDropdownOpen ? "▲" : "▼"}</Text>
                        </Pressable>

                        {isDropdownOpen ? (
                            <View style={styles.dropdownMenu}>
                                {statusOptions.map((option) => (
                                    <Pressable
                                        key={option}
                                        style={styles.dropdownItem}
                                        onPress={() => {
                                            setStatus(option);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.dropdownItemText,
                                                option === status && styles.dropdownItemTextActive,
                                            ]}
                                        >
                                            {option}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        ) : null}
                    </View>
                </View>
            </View>

            <Pressable style={styles.submitButton} onPress={handleCreateTask} disabled={isSubmitting}>
                {isSubmitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={styles.submitButtonText}>Creer la tache</Text>
                )}
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: "#111827",
        marginTop: 12,
    },
    subtitle: {
        fontSize: 15,
        color: "#6B7280",
        marginTop: 8,
        lineHeight: 22,
    },
    form: {
        marginTop: 24,
        gap: 20,
    },
    field: {
        gap: 10,
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#1F2937",
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: 12,
        fontSize: 16,
        color: "#111827",
    },
    dropdownTrigger: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 14,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownTriggerText: {
        color: "#1F2937",
        fontSize: 16,
        fontWeight: "600",
    },
    dropdownArrow: {
        color: "#6B7280",
        fontSize: 12,
    },
    dropdownMenu: {
        marginTop: 8,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
    },
    dropdownItem: {
        paddingHorizontal: 14,
        paddingVertical: 12,
    },
    dropdownItemText: {
        color: "#1F2937",
        fontSize: 15,
    },
    dropdownItemTextActive: {
        fontWeight: "700",
        color: "#2563EB",
    },
    submitButton: {
        marginTop: "auto",
        backgroundColor: "#2563EB",
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: "center",
    },
    submitButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
});
