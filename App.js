import { StyleSheet, View, FlatList, Button, Alert } from "react-native";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [listGoal, SetListGoal] = useState([]);
  const [modeIsVisible, SetModeIsVisible] = useState(false);

  function isVisible() {
    SetModeIsVisible(true);
  }

  function isNotVisible() {
    SetModeIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    SetListGoal((prevGoal) => [
      ...prevGoal,
      {
        text: enteredGoalText,
        key: Math.random(),
      },
    ]);
    isNotVisible();
  }

  function removeListItem(id) {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "OK",
        onPress: () => {
          SetListGoal((prevGoal) => {
            return prevGoal.filter((goal) => goal.key !== id);
          });
        },
      },
    ]);
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <View style={styles.firstButton}>
          <Button title="Add New Goal" onPress={isVisible} color="#0030ee" />
        </View>
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={modeIsVisible}
          isNotVisible={isNotVisible}
        />

        <View style={styles.goalContainer}>
          <FlatList
            data={listGoal}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  item={itemData.item.text}
                  id={itemData.item.key}
                  removeListItem={removeListItem}
                />
              );
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  firstButton: {
    paddingBottom: 20,
    paddingTop: 10,
  },

  goalContainer: {
    flex: 5,
  },
});
