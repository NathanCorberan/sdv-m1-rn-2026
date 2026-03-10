import { View, StyleSheet } from "react-native";
import TodoCard, { TodoStatus } from "../../components/todoCard/TodoCard";

export default function Index() {
    return (
        <View
            style={styles.container}
        >
            <TodoCard title="Acheter du pain" status={TodoStatus.TODO} />
            <TodoCard title="Faire les courses" status={TodoStatus.IN_PROGRESS} />
            <TodoCard title="Appeler le medecin" status={TodoStatus.DONE} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
