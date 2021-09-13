import React from 'react'
import PropTypes from 'prop-types'

export default class Check extends React.Component {
    static propTypes = {
        resource: PropTypes.string.isRequired,
        permission: PropTypes.oneOf(['view', 'add', 'edit', 'delete', 'approve', 'reject']),
        userPermissions: PropTypes.object,
    }

    allowed = () => {
        const { permission, resource, userPermissions, children } = this.props

        let checked = []
        userPermissions.forEach((result, index) => {
            if(result.function_name == permission && result.target == resource){
                checked.push(result)
            }
        })

        return checked.length > 0 ? true : false
    }

    render(){
        if(this.allowed()) return { children }
    }
}