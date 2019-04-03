import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

class SearchBox extends React.Component {
  state = {
    text: "Hi There"
  };

  handleChangeText = text => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;
    if (!text) return;

    onSubmit(text);
    this.setState({ text: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          value={text}
          autoCorrect={false}
          clearButtonMode="always"
          placeholder={this.props.placeholder}
          underlineColorAndroid="transparent"
          style={styles.textInput}
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: 300,
    marginTop: 20,
    backgroundColor: "#666",
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 15
  },
  textInput: {
    flex: 1,
    color: "white"
  }
});

export default SearchBox;
