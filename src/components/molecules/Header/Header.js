import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Avatar, Menu, Dropdown, Button, Input, Modal } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import useMousetrap from '~behaviors/useMousetrap'

import style from './Header.style'

const Header = ({ onQueryChange, onAdd, onSubmit }) => {
  const [query, setQuery] = useState('')
  const [isChangeLogVisible, setChangeLogVisibility] = useState(false)
  const [isFocus, setFocus] = useState(false)

  const input = useRef()

  useMousetrap('mod+f', event => {
    input.current.focus()
    event.stopPropagation()
    event.preventDefault()
  })

  const onChange = event => {
    const { value } = event.target
    setQuery(value)
    onQueryChange(value)
  }

  const onKeyDown = event => {
    if (event.key === 'Enter') {
      onSubmit()
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Link className={style.link} to="/settings">
          Settings
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link className={style.link} to="/help">
          Help
        </Link>
      </Menu.Item>
      <Menu.Item onClick={() => setChangeLogVisibility(true)}>
        What&apos;s new?
      </Menu.Item>
      <Menu.Item>
        <Link className={style.link} to="/about">
          About
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link className={style.link} to="/disconnect">
          Disconnect
        </Link>
      </Menu.Item>
    </Menu>
  )

  return (
    <header className={style.Header}>
      <Modal isVisible={isChangeLogVisible}>Coucou</Modal>

      <Button size="small" type="primary" onClick={onAdd}>
        New secret
      </Button>
      <div className={style.spacer} />
      <Input
        size="large"
        placeholder="Search"
        prefix={<SearchOutlined />}
        className={`${style.search} ${isFocus || query ? style.expanded : ''}`}
        value={query}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        ref={input}
        allowClear
      />
      <Dropdown trigger="click" overlay={menu}>
        <Avatar
          className={style.avatar}
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </Dropdown>
    </header>
  )
}

Header.defaultProps = {
  onAdd: () => {},
  onQueryChange: () => {},
  onSubmit: () => {},
}

Header.propTypes = {
  onAdd: PropTypes.func,
  onQueryChange: PropTypes.func,
  onSubmit: PropTypes.func,
}

export default Header
