import React from "react";
import { StyleSheet, Text, View, SafeAreaView, SectionList, StatusBar, TouchableOpacity } from "react-native";

// You can import from local files
// import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

// const sizeSelection = ['Tiny', 'Small', 'Medium', 'Large', 'Huge'];

const DATA = [
  {
    title: "Main dishes",
    data: ["Pizza", "Burger", "Risotto"]
  },
  {
    title: "Sides",
    data: ["French Fries", "Onion Rings", "Fried Shrimps"]
  },
  {
    title: "Drinks",
    data: ["Water", "Coke", "Beer"]
  },
  {
    title: "Desserts",
    data: ["Cheese Cake", "Ice Cream"]
  }
];

const BreedList = () => {
  const handleItemPress = (item) => {
    console.log(item);
    alert(`You selected ${item}`);
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=>handleItemPress(title)}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
  <SafeAreaView style={styles.container}>
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <Item title={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
    />
  </SafeAreaView>
  );
}

export default BreedList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 10,
    marginVertical: 0
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});