import AuthNavigation from './src/navigations/AuthNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from './src/config/firebaseConfig';
import { useEffect, useState } from 'react';
import HomeScreen from './src/screen/HomeScreen';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { colors } from './src/styles/colors';

const auth = getAuth(app);

export default function App() {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			setIsLoading(false);
		});
	}, []);

	if (isLoading) {
		return <View style={styles.container}>
			<ActivityIndicator color={colors.primary} />
		</View>;
	}

	return (
		<NavigationContainer>
			{
				user ? <HomeScreen /> : <AuthNavigation />
			}
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});