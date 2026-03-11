import { Pressable, StyleSheet, Text, View } from "react-native";

export enum TodoStatus {
    TODO = "A faire",
    IN_PROGRESS = "En cours",
    DONE = "Fini",
}

interface TodoCardProps {
    title: string;
    status: TodoStatus;
    onPress?: () => void;
}

export default function TodoCard({ title, status, onPress }: TodoCardProps) {
    const currentStatusStyle = statusStyles[status];

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                currentStatusStyle.card,
                pressed ? styles.containerPressed : null,
            ]}
            onPress={onPress}
        >
            <Text style={styles.title}>{title}</Text>
            <View style={[styles.badge, currentStatusStyle.badge]}>
                <Text style={[styles.badgeText, currentStatusStyle.badgeText]}>{status}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        padding: 24,
        borderRadius: 16,
        width: "100%",
        borderWidth: 2,
    },
    containerPressed: {
        opacity: 0.85,
        transform: [{ scale: 0.99 }],
    },
    todoCard: {
        backgroundColor: "#FFF4E5",
        borderColor: "#F59E0B",
    },
    inProgressCard: {
        backgroundColor: "#E0F2FE",
        borderColor: "#0284C7",
    },
    doneCard: {
        backgroundColor: "#E8F5E9",
        borderColor: "#16A34A",
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#1F2937",
    },
    badge: {
        marginTop: 16,
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 999,
    },
    todoBadge: {
        backgroundColor: "#FDE68A",
    },
    inProgressBadge: {
        backgroundColor: "#BAE6FD",
    },
    doneBadge: {
        backgroundColor: "#BBF7D0",
    },
    badgeText: {
        fontSize: 14,
        fontWeight: "bold",
    },
    todoBadgeText: {
        color: "#92400E",
    },
    inProgressBadgeText: {
        color: "#0C4A6E",
    },
    doneBadgeText: {
        color: "#166534",
    },
});

const statusStyles = {
    [TodoStatus.TODO]: {
        card: styles.todoCard,
        badge: styles.todoBadge,
        badgeText: styles.todoBadgeText,
    },
    [TodoStatus.IN_PROGRESS]: {
        card: styles.inProgressCard,
        badge: styles.inProgressBadge,
        badgeText: styles.inProgressBadgeText,
    },
    [TodoStatus.DONE]: {
        card: styles.doneCard,
        badge: styles.doneBadge,
        badgeText: styles.doneBadgeText,
    },
};
