import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth, signOut } from 'firebase/auth';
import app from "../config/firebaseConfig";
import { colors } from "../styles/colors";

const auth = getAuth(app);

const HomeScreen = () => {

    const handleSignOut = () => {
        signOut(auth);
    }

    const user = auth.currentUser;

    console.log(user);


    return (
        <View style={styles.container}>
            <Text>Home Screen</Text>

            <Text>User email : {user.email}</Text>
            <Text>User email : {user.displayName}</Text>

            <TouchableOpacity style={styles.logoutBtn} onPress={handleSignOut}>
                <Text style={styles.logoutBtnText}>Se déconnecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutBtn: {
        marginTop: 30,
    },
    logoutBtnText: {
        color: colors.primary,
    }
});

export default HomeScreen;