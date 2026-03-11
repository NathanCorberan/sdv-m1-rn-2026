import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";

const user = {
    firstname: "Nathan",
    lastname: "Martin",
    email: "nathan.martin@example.com",
    role: "Etudiant React Native",
    joinedAt: "Mars 2026",
};

const settings = [
    { id: 1, label: "Notifications", value: true },
    { id: 2, label: "Mode hors ligne", value: false },
    { id: 3, label: "Synchronisation auto", value: true },
];

const preferences = [
    { id: 1, icon: "person-outline", label: "Modifier le profil" },
    { id: 2, icon: "lock-outline", label: "Securite du compte" },
    { id: 3, icon: "palette", label: "Apparence" },
    { id: 4, icon: "help-outline", label: "Aide et support" },
];

export default function ProfileScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.heroCard}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                        {user.firstname.charAt(0)}
                        {user.lastname.charAt(0)}
                    </Text>
                </View>
                <Text style={styles.name}>
                    {user.firstname} {user.lastname}
                </Text>
                <Text style={styles.role}>{user.role}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Compte</Text>
                <View style={styles.infoCard}>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{user.email}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Role</Text>
                        <Text style={styles.infoValue}>{user.role}</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Inscrit depuis</Text>
                        <Text style={styles.infoValue}>{user.joinedAt}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Parametres</Text>
                <View style={styles.infoCard}>
                    {settings.map((setting, index) => (
                        <View key={setting.id}>
                            <View style={styles.settingRow}>
                                <Text style={styles.settingLabel}>{setting.label}</Text>
                                <Switch value={setting.value} />
                            </View>
                            {index < settings.length - 1 ? <View style={styles.separator} /> : null}
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Preferences</Text>
                <View style={styles.infoCard}>
                    {preferences.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.preferenceRow}>
                                <View style={styles.preferenceLeft}>
                                    <MaterialIcons name={item.icon as never} size={20} color="#2563EB" />
                                    <Text style={styles.preferenceLabel}>{item.label}</Text>
                                </View>
                                <MaterialIcons name="chevron-right" size={22} color="#9CA3AF" />
                            </View>
                            {index < preferences.length - 1 ? <View style={styles.separator} /> : null}
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingTop: 40,
        paddingBottom: 32,
        backgroundColor: "#F3F4F6",
    },
    heroCard: {
        backgroundColor: "#111827",
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
    },
    avatar: {
        width: 76,
        height: 76,
        borderRadius: 38,
        backgroundColor: "#2563EB",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 16,
    },
    avatarText: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },
    name: {
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
    },
    role: {
        color: "#BFDBFE",
        fontSize: 15,
        marginTop: 6,
    },
    email: {
        color: "#D1D5DB",
        fontSize: 14,
        marginTop: 6,
    },
    section: {
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111827",
        marginBottom: 12,
    },
    infoCard: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },
    infoRow: {
        paddingVertical: 16,
    },
    infoLabel: {
        fontSize: 13,
        color: "#6B7280",
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "600",
    },
    settingRow: {
        paddingVertical: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    settingLabel: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
    preferenceRow: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    preferenceLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    preferenceLabel: {
        fontSize: 16,
        color: "#111827",
        fontWeight: "500",
    },
    separator: {
        height: 1,
        backgroundColor: "#E5E7EB",
    },
});
