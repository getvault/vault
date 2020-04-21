import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import style from './PasswordStrengthIndicator.style'

const cx = classNames.bind(style)

const StrengthLevel = ({ active }) => (
  <div className={cx('level', { active })} />
)

StrengthLevel.defaultProps = {
  active: false,
}

StrengthLevel.propTypes = {
  active: PropTypes.bool,
}

const levels = new Array(5).fill(null).map(() => Math.random())

const Indicator = ({ strength }) => {
  return (
    <div className={cx('indicator')}>
      {levels.map((l, index) => (
        <StrengthLevel key={l} active={strength > index} />
      ))}
    </div>
  )
}

Indicator.defaultProps = {
  strength: 0,
}

Indicator.propTypes = {
  strength: PropTypes.number,
}

export default Indicator
