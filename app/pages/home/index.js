import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class HomePage extends Component<void> {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
    return (
      <View>
        <Text> HomePage work whith redux! </Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
