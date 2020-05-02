import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Empty, BackTop } from 'antd'

import Secret from '~components/molecules/Secret'
import Header from '~components/molecules/Header'

import { getSecrets, addSecret } from '~state/secrets'

import style from './Vault.style'

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

  const onSubmit = () => setOpenFirst(!openFirst)

  const containsQuery = secret =>
    secret.label.toLowerCase().includes(query.toLowerCase()) ||
    secret.value.toLowerCase().includes(query.toLowerCase())

  const searchedSecrets = secrets.filter(containsQuery)

  return (
    <>
      <BackTop />
      <div className={style.main}>
        <Header
          onAdd={onAdd}
          onQueryChange={onQueryChange}
          onSubmit={onSubmit}
        />
        {searchedSecrets.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>No {query ? 'corresponding ' : ''}secrets</span>}
          />
        ) : (
          searchedSecrets.map((secret, index) => (
            <Secret
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
