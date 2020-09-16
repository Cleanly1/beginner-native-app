import React from "react";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import AboutScreen from "./screens/AboutScreen/AboutScreen";
import ModalScreen from "./screens/ModalScreen/ModalScreen";
import { Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	HeaderBackButton,
} from "@react-navigation/stack";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
	return (
		<MainStack.Navigator>
			<MainStack.Screen
				options={{ headerShown: false }}
				name="Home"
				component={HomeScreen}
			/>
			<MainStack.Screen
				name="About"
				component={AboutScreen}
				options={{
					headerTitleAlign: "center",
					headerLeft:
						Platform.OS === "ios"
							? ({ navigation }) => (
									<HeaderBackButton
										onPress={() => {
											navigation.goBack();
										}}
									></HeaderBackButton>
							  )
							: null,
				}}
			/>
		</MainStack.Navigator>
	);
}

export default function App() {
	return (
		<NavigationContainer>
			<RootStack.Navigator>
				<RootStack.Screen
					name="Main"
					component={MainStackScreen}
					options={{ headerShown: false }}
				/>
				<RootStack.Screen
					name="Cat Fact"
					component={ModalScreen}
					options={{
						headerTitleAlign: "center",
					}}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
}
