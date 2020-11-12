import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		width: deviceWidth,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f2f2f2",
		overflow: "scroll",
	},

	textWrapper: {
		justifyContent: "center",
		alignItems: "center",
	},

	text: {
		fontSize: 24,
		padding: 5,
	},

	quoteText: {
		flex: 0.7,
		margin: 10,
		textAlign: "center",
	},

	navButton: {
		margin: 10,
	},
	image: {
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
});

export default styles;
