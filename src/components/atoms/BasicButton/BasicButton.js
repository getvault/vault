import React from 'react'
import PropTypes from 'prop-types'

import style from './BasicButton.style'

const BasicButton = ({ className, ...props }) => (
  <button
    type="button"
    className={`${style.BasicButton} ${className}`}
    {...props}
  />
)

BasicButton.defaultProps = {
  className: '',
}

BasicButton.propTypes = {
  className: PropTypes.string,
}

export default BasicButton
