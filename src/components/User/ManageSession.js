import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text
} from "react-native";
import { Font } from "expo";
import { ListItem, Button, Icon } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import firebase from "firebase";
import { withUser } from "../Auth/Context/withUser";

class ManageSession extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("session");
  }

  startSession() {
    this.ref
      .add({
        user_id: this.props.userContext.user,
        location_id: "w91B6KDWcF04jsybJgAP",
        start: firebase.firestore.FieldValue.serverTimestamp(),
        end: null,
        interval_minutes: null
      })

      .catch(error => {
        console.error("Error adding document: ", error);
      });
  }
  render() {
    console.log(this.props.userContext.user);

    return (
      <ScrollView style={styles.container}>
        <ListItem
          title="Start Session"
          leftIcon={{
            name: "play-circle",
            type: "font-awesome",
            color: "green"
          }}
          onPress={() => this.startSession()}
        />
        <ListItem
          title="End Session"
          leftIcon={{ name: "stop-circle", type: "font-awesome", color: "red" }}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  activity: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default withUser(ManageSession);
