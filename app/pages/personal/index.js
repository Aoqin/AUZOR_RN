import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class PersonalPage extends Component<void> {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text> Personal Page work whith redux! </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalPage)
