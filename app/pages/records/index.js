import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class RecordsPage extends Component<void> {
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor(props) {
    super(props);
    console.log('board');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text> RecordsPage work whith redux! </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  }
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(RecordsPage)
