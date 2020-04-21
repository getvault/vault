import React, { useState, useRef, useEffect } from 'react'
import { Button, Input, Form, Typography } from 'antd'
import AnimateHeight from 'react-animate-height'

import PasswordStrengthIndicator from '~components/atoms/PasswordStrengthIndicator'
import { evaluateStrength } from '~utils/password'

import style from './connect.style'

const { Text, Title } = Typography

const IndexPage = () => {
  const [passphrase, setPassphrase] = useState('')
  const [confirmationPassphrase, setConfirmationPassphrase] = useState('')

  const passphraseInput = useRef()
  const confirmationPassphraseInput = useRef()

  const [confirming, startConfirming] = useState(false)
  const [animated, startAnimated] = useState(false)

  useEffect(() => {
    passphraseInput.current.focus()
  }, [])

  const onFinish = () => {
    startConfirming(true)
    setTimeout(() => {
      startAnimated(true)
      confirmationPassphraseInput.current.focus()
    }, 100)
  }

  const strength = evaluateStrength(passphrase)

  return (
    <div className={style.Connect}>
      <div className={style.box}>
        <Title className={style.title}>Create passphrase</Title>
        <div className={style.description}>
          <Text>Protect your data with a passphrase only you know.</Text>
        </div>
        <Form initialValues={{ remember: true }} onFinish={onFinish}>
          <Form.Item
            rules={[
              { required: true, message: 'Please input your passphrase' },
            ]}
            hasFeedback
          >
            <Input.Password
              name="passphrase"
              required
              ref={passphraseInput}
              size="large"
              placeholder="Passphrase"
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
            />
            <PasswordStrengthIndicator strength={strength} />
          </Form.Item>
          {confirming ? (
            <AnimateHeight duration={200} height={animated ? 'auto' : 0}>
              <Form.Item
                rules={[
                  ({ getFieldValue }) => ({
                    validator: (rule, value) => {
                      if (!value || getFieldValue('passphrase') === value) {
                        return Promise.resolve()
                      }
                      /* eslint-disable prefer-promise-reject-errors */

                      return Promise.reject(
                        'The two passphrases that you entered do not match!'
                      )
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  ref={confirmationPassphraseInput}
                  size="large"
                  placeholder="Confirm passphrase"
                  value={confirmationPassphrase}
                  onChange={e => setConfirmationPassphrase(e.target.value)}
                />
              </Form.Item>
            </AnimateHeight>
          ) : null}
          <Form.Item>
            <Button
              type="primary"
              size="large"
              block
              htmlType="submit"
              disabled={
                strength < 4 ||
                (confirming && passphrase !== confirmationPassphrase)
              }
            >
              {confirming ? 'Confirm' : 'Save'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default IndexPage
