import React, { Component } from 'react';
import { View, Dimensions} from 'react-native';
import { LineChart, } from "react-native-chart-kit";

class A_LineChart extends Component {
    render() {
        let { data } = this.props
        return (
            <LineChart
                data={{
                    labels: ["2015", "2016", "2017", "2018", "2019", "2020"],
                    datasets: [
                        {
                            data
                        }
                    ]
                }}
                width={Dimensions.get("window").width -20} // from react-native
                height={220}
                yAxisLabel="$"
                yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                       // borderRadius: 16
                       paddingVertical:10
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                   borderRadius: 5
                }}
            />
        )
    }
}

export default A_LineChart