import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from '../config/firebaseConfig';

const auth = getAuth(app);

const SigninScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignin = () => {
        if (email === '' || password === '') {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);

        // ensure verification done
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user);

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode === 'auth/invalid-credential') {
                    Alert.alert('Erreur', 'Email ou mot de passe invalide');
                }
                else {
                    Alert.alert('Erreur', errorMessage);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const handleSignup = () => {
        return navigation.navigate("SignupScreen");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenue a nouveau</Text>
                <Text style={styles.subtitle}>
                    Connectez-vous pour continuer
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Adresse email</Text>
                    <TextInput
                        placeholder='Entrer votre adresse email'
                        style={styles.input}
                        keyboardType='email-address'
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mot de passe</Text>
                    <TextInput
                        placeholder='Entrer votre mot de passe'
                        style={styles.input}
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignin}
                >
                    {
                        isLoading ? <ActivityIndicator color={colors.background} /> :
                            <Text style={styles.buttonText}>Se connecter</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.signupSection}>
                <Text style={styles.signupText}>Vous n'avez pas encore de compte ?</Text>
                <TouchableOpacity onPress={handleSignup}>
                    <Text style={styles.signupLinkText}>Inscrivez-vous ici</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
        backgroundColor: colors.background,
    },
    header: {
        marginVertical: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 5,
        color: colors.primary,
    },
    subtitle: {
        fontWeight: '400',
        fontSize: 15,
    },
    form: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        color: colors.dark,
        fontWeight: '500',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: colors.primary,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontWeight: '600',
        color: colors.background,
        fontSize: 14
    },
    signupSection: {
        position: 'absolute',
        bottom: 40,
        left: 20,
        right: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        marginBottom: 5,
    },
    signupLinkText: {
        color: colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
    },

});

export default SigninScreen;