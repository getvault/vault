import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Avatar, Menu, Dropdown, Input, Modal } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import BasicButton from '~components/atoms/BasicButton'
import useMousetrap from '~behaviors/useMousetrap'

import style from './Header.style'

const Header = ({ onQueryChange, onAdd, onSubmit }) => {
  const [query, setQuery] = useState('')
  const [isChangeLogVisible, setChangeLogVisibility] = useState(false)

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
      <Menu.Item onClick={setChangeLogVisibility}>
        <Link className={style.link} to="/whatsnew">
          What&apos;s new?
        </Link>
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

  const AMenu = () => (
    <Dropdown trigger="click" overlay={menu}>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    </Dropdown>
  )

  return (
    <header className={style.Header}>
      <Modal isVisible={isChangeLogVisible}>Coucou</Modal>

      <div className={style.headerLeft} />
      <div className={style.headerCenter}>
        <Input
          size="large"
          placeholder="Search"
          prefix={<SearchOutlined />}
          className={style.search}
          value={query}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={input}
        />
      </div>
      <div className={style.headerRight}>
        <BasicButton onClick={onAdd} className={style.button}>
          <PlusOutlined />
        </BasicButton>
        <AMenu />
      </div>
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
