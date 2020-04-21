import React from 'react'
import { navigate } from 'gatsby'

import { Button, Typography } from 'antd'

import style from './connect.style'

const { Text, Title } = Typography

const IndexPage = () => {
  const onClick = () => {
    navigate('/create-passphrase')
  }

  return (
    <div className={style.Connect}>
      <div className={style.box}>
        <Title className={style.title}>Connect 1</Title>
        <div className={style.description}>
          <p>
            <Text>
              Vault uses Google Drive storage to offer you a free big amout of
              storage.
            </Text>
          </p>
          <p>
            <Text>
              Don&apos;t worry, Vault adds a second level of encryption so that
              even Google cannot look into your data.
            </Text>
          </p>
        </div>
        <Button type="primary" size="large" block onClick={onClick}>
          Connect with Google
        </Button>
      </div>
    </div>
  )
}

export default IndexPage
