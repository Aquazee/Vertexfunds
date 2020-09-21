import React from 'react';
import { AppRegistry, StyleSheet, View } from 'react-native';
import { PieChart } from "react-native-chart-kit";

class PieChartScreen extends React.Component {

    constructor() {
        super();

        this.state = {
            legend: {
                enabled: true,
                textSize: 14,
                form: 'CIRCLE',
                position: 'RIGHT_OF_CHART',
                fontFamily: 'monospace',
                wordWrapEnabled: true
            },
            data: [{
                name: "Axis",
                population: 2150,
                color: "rgba(131, 167, 234, 1)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "BOB",
                population: 2800,
                color: "#F00",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "HDFC",
                population: 5276,
                color: "red",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "CANARA",
                population: 1000,
                color: "#ffffff",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            },
            {
                name: "CITI",
                population: 1192,
                color: "rgb(0, 0, 255)",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15
            }],
            description: {
                text: 'This is Pie chart description',
                textSize: 15,
                textColor: 'darkgray',
                fontFamily: 'monospace',
                fontStyle: 2
            }
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <PieChart
                    data={this.state.data}
                    width={350}
                    height={220}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    chart: {
        flex: 1
    }
});
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};
AppRegistry.registerComponent('PieChartScreen', () => PieChartScreen);

export default PieChartScreen;