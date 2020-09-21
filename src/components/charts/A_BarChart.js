import React from 'react';
import { AppRegistry, StyleSheet, View, Dimensions } from 'react-native';
import { BarChart } from "react-native-chart-kit";

class BarChartScreen extends React.Component {
    render() {
        let { data } = this.props;
        return (
            <View style={styles.container}>
                <BarChart
                    style={{backgroundColor:"#fff"}}
                    data={data}
                    width={Dimensions.get("window").width - 20}
                    height={220}
                    yAxisLabel="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
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
AppRegistry.registerComponent('BarChartScreen', () => BarChartScreen);

export default BarChartScreen;