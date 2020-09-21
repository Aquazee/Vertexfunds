import React, { Component } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import notificationData from './notificationData';
import { connect } from 'react-redux';
import suggestedData from './suggestedData';
import SuggestedViewItem from '../../../components/general/SuggestedViewItem';
import NotificationGeneralItem from '../../../components/notification/NotificationGeneralItem';
import FollowAndFollowingItem from '../../../components/general/FollowAndFollowingItem';
import { getActivity, loadMoreActivity } from '../../../actions/activityAction';


class notificationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Activity',
            totalPages: 0,
            pages: 0,
            pageSize: 0,
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: notificationData,
            suggestData: suggestedData
        }
    }

    componentDidMount() {
        this._unsubscribe = this.props.navigation.addListener('focus', () => {
            this.loadData();
        });
    }

    loadData() {
        const self = this;
        this.props.getActivity(this.props.userId, this.props.page, this.props.pageSize).then(({ payload, error }) => {
            //console.log(payload);
            if (error) {
                console.log(error)
            } else if (payload && payload.status == 200 && payload.data == "") {
                self.props.Logout()
            } else if (payload.data.code == 2000) {
                this.setState({
                    totalPages: payload.data.data.totalPages,
                    pageSize: payload.data.data.size,
                    page: payload.data.data.number,
                })
            } else {
                console.log("Some error occurred")
            }
        });
    }


    loadMoreData() {
        if (this.state.page <= this.state.totalPages - 1) {
            let pageNumber = this.state.page + 1;
            this.setState({ page: pageNumber }, () => this.props.loadMoreActivity(this.props.userId, pageNumber, this.props.pageSize).then(({ payload }) => {

            }));
        }
    }

    renderFooter = () => {
        const { loading, suggestData } = this.state;

        if (suggestData.length === 0)
            return (<View />);

        const { theme, navigation, activity } = this.props;

        return (<View>
            <FlatList
                data={suggestData}
                ListHeaderComponent={() => {
                    return (
                        <View style={{ padding: 15, paddingLeft: 15 }}>
                            <Text style={{ fontSize: 15, fontWeight: '600', color: theme.primaryColor }}>Suggestion for you</Text>
                        </View>
                    )
                }}
                renderItem={({ item }) => <FollowAndFollowingItem type={'suggest'} theme={theme} item={item} navigation={navigation} />}
                keyExtractor={item => item.userId.toString()}
                extraData={suggestData}
            />
        </View>)
    };

    render() {
        const { theme, navigation, loading, activity } = this.props;
        if (loading) {
            return (
                <View style={{ flex: 1, alignItems: 'center', paddingTop: 100, backgroundColor: theme.container.backgroundColor }}>
                    <ActivityIndicator size="small" color={theme.secondaryColor} />
                </View>
            )
        }
        
        return (
            <View style={[ styles.container, { backgroundColor: theme.container.backgroundColor }]}>
                <FlatList
                    data={activity}
                    showsVerticalScrollIndicator={false}
                    //ListFooterComponent={this.renderFooter}
                    renderItem={({ item, index }) => <NotificationGeneralItem theme={theme} item={item} index={index} navigation={navigation} userid={this.props.userId}/>}
                    keyExtractor={item => item.id.toString()}
                    extraData={activity}
                    onEndReachedThreshold={0.1}
                    onEndReached={() => this.loadMoreData()}
                />
            </View>
        );
    }
}

const mapStateToProps = state => ({
    theme: state.auth.theme,
    userId: state.auth.userId,
    token: state.auth.userToken,
    feeds: state.activity.feeds,
    page: state.activity.page,
    pageSize: state.activity.pageSize,
    totalPages: state.activity.totalPages,
    loading: state.activity.loading,
    activity: state.activity.data,
});

const mapDispatchToProps = dispatch => ({
    getActivity: (id, page, pageSize) => dispatch(getActivity(id, page, pageSize)),
    loadMoreActivity: (userid, page, size ) => dispatch(loadMoreActivity(userid, page, size))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(notificationScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
