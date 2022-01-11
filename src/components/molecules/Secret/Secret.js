import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AnimateHeight from 'react-animate-height'
import TextareaAutosize from 'react-textarea-autosize'
import ContentEditable from 'react-contenteditable'
import { Tooltip, Button, DatePicker, notification } from 'antd'
import {
  RightOutlined,
  DeleteOutlined,
  WarningFilled,
  MoreOutlined,
} from '@ant-design/icons'
import classNames from 'classnames/bind'
import moment from 'moment'

import BasicButton from '~components/atoms/BasicButton'
import { generatePassword } from '~utils/password'
import {
  updateSecret,
  deleteSecret,
  cancelDeleteSecret,
  DELETE_TIMEOUT,
} from '~state/secrets'

import style from './Secret.style'

const cx = classNames.bind(style)

const Secret = ({ className, secret, onLastAdded, open }) => {
  const { id } = secret

  const [label, setLabel] = useState(secret.label)
  const [value, setValue] = useState(secret.value)
  const [expanded, expand] = useState(false)
  const [hover, setHover] = useState(false)

  const dispatch = useDispatch()

  const labelRef = useRef()
  const valueRef = useRef()

  useEffect(() => {
    // if (label === '' && value === '') {
    //   setTimeout(() => expand(true), 10)
    //   onLastAdded(labelRef)
    // }
  }, [])

  useEffect(() => {
    if (open) {
      expand(true)
    } else {
      expand(false)
    }
  }, [open])

  const onLabelChange = event => {
    const newLabel = event.target.value
    setLabel(newLabel)
    dispatch(updateSecret({ id, label: newLabel }))
  }

  const onTab = event => {
    if (event.key === 'Enter' || event.key === 'Tab') {
      if (!expanded) {
        expand(true)
      }
      setTimeout(() => {
        valueRef.current.focus()
      }, 200)
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const onValueChange = event => {
    const newValue = event.target.value
    setValue(newValue)
    dispatch(updateSecret({ id, value: newValue }))
  }

  const onGeneratePassword = () => {
    const newValue = `${value}${generatePassword()}`
    setValue(newValue)

    dispatch(updateSecret({ id, value: newValue }))
  }

  const onDelete = () => {
    expand(false)
    setTimeout(() => {
      dispatch(deleteSecret(id))
      notification.warning({
        className: style.notification,
        key: id,
        message: 'Deleting secret...',
        description: (
          <button
            type="button"
            className={style.notificationButton}
            onClick={() => dispatch(cancelDeleteSecret(id))}
          >
            Undo
          </button>
        ),
        onClose: () => {},
        closeIcon: <></>,
        onClick: () => notification.close(id),
        duration: DELETE_TIMEOUT / 1000,
        placement: 'topLeft',
      })
    }, 200)
  }

  const onExpirationDateChange = (date, dateString) =>
    dispatch(updateSecret({ id, expirationDate: dateString }))

  /* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions  */
  return (
    <div
      className={`${style.Panel} ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={style.header}>
        <div className={cx('draggable', { hover })}>
          <MoreOutlined className={style.dragIcon} />
          <MoreOutlined className={style.dragIcon} />
        </div>
        <div
          className={style.notDraggable}
          onMouseDown={event => event.stopPropagation()}
          onClick={() => {
            console.log('toggle')
            expand(!expanded)
          }}
        >
          <ContentEditable
            html={label}
            onKeyDown={onTab}
            onChange={onLabelChange}
            onClick={e => e.stopPropagation()}
            className={style.label}
            innerRef={labelRef}
          />
          <div className={style.actions}>
            {secret.expirationDate !== '' &&
            moment().isAfter(secret.expirationDate) ? (
              <div className={style.expired}>
                <Tooltip title="Password expired" placement="bottom">
                  <WarningFilled />
                </Tooltip>
              </div>
            ) : null}

            <BasicButton
              onClick={onDelete}
              className={cx('delete', { expanded })}
              aria-label="Delete secret"
            >
              <Tooltip title="Delete" placement="bottom">
                <DeleteOutlined />
              </Tooltip>
            </BasicButton>

            <Tooltip title={expanded ? 'Reduce' : 'Expand'} placement="bottom">
              <RightOutlined
                size="small"
                className={cx('expand', { expanded })}
              />
            </Tooltip>
          </div>
        </div>
      </div>
      <AnimateHeight duration={200} height={expanded ? 'auto' : 0}>
        <div
          className={style.content}
          onMouseDown={event => event.stopPropagation()}
        >
          <TextareaAutosize
            className={style.textarea}
            placeholder="Secret"
            onChange={onValueChange}
            value={value}
            inputRef={valueRef}
          />
          <div className={style.actions}>
            <Button
              size="small"
              type="primary"
              className={style.button}
              onClick={onGeneratePassword}
            >
              Generate password
            </Button>
            <DatePicker
              onChange={onExpirationDateChange}
              className={style.expirationDate}
              size="small"
              type="primary"
              placeholder="Add expiration date"
            />
          </div>
        </div>
      </AnimateHeight>
    </div>
  )
}

Secret.defaultProps = {
  secret: { id: '', value: '', label: '', expirationDate: '' },
  className: '',
  onLastAdded: () => {},
  open: false,
}

Secret.propTypes = {
  secret: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    expirationDate: PropTypes.string,
  }),
  className: PropTypes.string,
  onLastAdded: PropTypes.func,
  open: PropTypes.bool,
}

export default Secret
