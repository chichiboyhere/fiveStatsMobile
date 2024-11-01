import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MeasuresOfCentralTendencyGrouped from './screens/MeasuresOfCentralTendencyGrouped';
import MeasuresOfCentralTendencyUngroupedRaw from './screens/MeasuresOfCentralTendencyUnGroupedRaw';
import MeasuresOfCentralTendencyUngroupedTabulated from './screens/MeasuresOfCentralTendencyUngroupedTabulated';
import MeasuresOfDispersionGrouped from './screens/MeasuresOfDispersionGrouped';
import MeasuresOfDispersionUngrouped from './screens/MeasuresOfDispersionUngrouped';
import Topics from './screens/Topics'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <> 
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#28231D' },
            headerTintColor: 'white',
            contentStyle: { backgroundColor: 'black' },
          }}
        >
         <Stack.Screen
          name="Topics"
          component={Topics}
          options={{title: 'Statistics Calculators'}}
        />
        

        <Stack.Screen
            name="MeasuresOfCentralTendencyUngroupedRaw"
            component={MeasuresOfCentralTendencyUngroupedRaw}
            options={{
              title: 'Measures Of Central Tendency Ungrouped (Raw Data)',
            }}
          />

        <Stack.Screen
            name="MeasuresOfCentralTendencyUngroupedTabulated"
            component={MeasuresOfCentralTendencyUngroupedTabulated}
            options={{
              title: 'Measures Of Central Tendency Ungrouped (Tabulated)',
            }}
          />

        <Stack.Screen
            name="MeasuresOfCentralTendencyGrouped"
            component={MeasuresOfCentralTendencyGrouped}
            options={{
              title: 'Measures Of Central Tendency Grouped',
            }}
          />
        <Stack.Screen
            name="MeasuresOfDispersionUngrouped"
            component={MeasuresOfDispersionUngrouped}
            options={{
              title: 'Measures Of Dispersion Ungrouped',
            }}
          />
        <Stack.Screen
            name="MeasuresOfDispersionGrouped"
            component={MeasuresOfDispersionGrouped}
            options={{
              title: 'Measures Of Dispersion Grouped',
            }}
          />

        
        </Stack.Navigator>
        
        </NavigationContainer>
       
        {/* <Footer /> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  
});
