import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFonts, Peralta_400Regular  } from '@expo-google-fonts/peralta'

const Logo = () => {
  let [fontsLoaded] = useFonts({
    Peralta_400Regular
  });

  if (fontsLoaded) {
  return (
    <View>
      <Text style={styles.logo}>
        HookPups
      </Text>
    </View>
  )
}
}
// } else {
//   return (
//     <View>
//       <Text style={styles.logo}>
//         HookPups
//       </Text>
//     </View>
//   )

export default Logo;

const styles = StyleSheet.create({
  logo: {
    fontWeight: 'bold',
    fontSize: 40,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    fontFamily: "Peralta_400Regular",
    color: '#937DC2'
  }
})