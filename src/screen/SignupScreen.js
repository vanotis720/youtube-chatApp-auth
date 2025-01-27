import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import app from '../config/firebaseConfig';

const auth = getAuth(app);

const SignupScreen = ({ navigation }) => {
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = () => {
        if (email === '' || password === '' || surname === '') {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log(user);

                // Update user profile
                updateProfile(user, {
                    displayName: surname,
                }).then(() => {
                    auth.currentUser.reload()
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);

                if (errorCode === 'auth/email-already-in-use') {
                    Alert.alert('erreur', 'Email déjà utilisé');
                }
                else if (errorCode === 'auth/invalid-email') {
                    Alert.alert('erreur', 'Email invalide');
                }
                else {
                    Alert.alert('erreur', errorMessage);
                }

            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const handleSignin = () => {
        return navigation.navigate("SigninScreen");
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Bienvenue sur ChatApp</Text>
                <Text style={styles.subtitle}>
                    Inscrivez-vous pour commencer à chatter avec vos amis
                </Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Prénom</Text>
                    <TextInput
                        placeholder='Entrer votre prénom'
                        style={styles.input}
                        value={surname}
                        onChangeText={setSurname}
                    />
                </View>
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
                    onPress={handleSignup}
                >
                    {
                        isLoading ? <ActivityIndicator color={colors.background} /> :
                            <Text style={styles.buttonText}>S'inscrire</Text>
                    }
                </TouchableOpacity>
            </View>
            <View style={styles.signupSection}>
                <Text style={styles.signupText}>Vous avez déjà un compte ?</Text>
                <TouchableOpacity onPress={handleSignin}>
                    <Text style={styles.signupLinkText}>Connectez-vous ici</Text>
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
        marginHorizontal: 20
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10,
        color: colors.primary,
    },
    subtitle: {
        fontWeight: '400',
        fontSize: 15,
        textAlign: 'center',
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

export default SignupScreen;