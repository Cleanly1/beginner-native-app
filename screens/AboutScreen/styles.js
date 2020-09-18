import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#fff",
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
		width: 400,
		margin: 10,
		textAlign: "center",
	},

	image: {
		width: 200,
		height: 200,
		resizeMode: "contain",
	},
});

export default styles;
