import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Empty, BackTop } from 'antd'

import Panel from '~components/molecules/Panel'
import Header from '~components/molecules/Header'

import { getSecrets, addSecret } from '~state/secrets'

import style from './vault.style'

export default () => {
  const [query, setQuery] = useState('')
  const [openFirst, setOpenFirst] = useState(false)
  const secrets = useSelector(getSecrets)
  const ref = useRef()

  const dispatch = useDispatch()

  const onAdd = () => {
    dispatch(addSecret())
    setTimeout(() => {
      ref.current.focus()
      ref.current.scrollTo()
    }, 400)
  }

  const onQueryChange = value => {
    setQuery(value)
    setOpenFirst(false)
  }

  const onSubmit = () => {
    setOpenFirst(!openFirst)
  }

  const containsQuery = secret =>
    secret.label.toLowerCase().includes(query.toLowerCase()) ||
    secret.value.toLowerCase().includes(query.toLowerCase())

  const filtered = secrets.filter(containsQuery)

  return (
    <>
      <BackTop />
      <Header onAdd={onAdd} onQueryChange={onQueryChange} onSubmit={onSubmit} />
      <div className={style.main}>
        {filtered.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>No {query ? 'corresponding ' : ''}passwords</span>
            }
          />
        ) : (
          filtered.map((secret, index) => (
            <Panel
              className={style.panel}
              key={secret.id}
              secret={secret}
              open={openFirst && index === 0}
              onLastAdded={r => {
                ref.current = r.current
              }}
            />
          ))
        )}
      </div>
    </>
  )
}
