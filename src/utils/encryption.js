import aesjs from 'aes-js'
import sjcl from 'sjcl'

const { aes: AES } = sjcl.cipher.aes

export const encrypt = (text, key) =>
  new Promise((resolve, reject) => {
    // const keyBytes = aesjs.utils.hex.toBytes(key)

    try {
      // const text = JSON.stringify(json)
      var text = 'TextMustBe16Byte'

      const textBytes = aesjs.utils.utf8.toBytes(text)

      /* eslint-disable-next-line new-cap */
      const aesCbc = new aesjs.ModeOfOperation.cbc(
        keyBytes,
        initializationVector
      )
      const encryptedBytes = aesCbc.encrypt(textBytes)
      const encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes)

      resolve(encryptedHex)
    } catch (error) {
      reject(error)
    }
  })

export const decrypt = (encryptedHex, key) =>
  new Promise((resolve, reject) => {
    // const keyBytes = aesjs.utils.hex.toBytes(key)

    const encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex)

    /* eslint-disable-next-line new-cap */
    const aesCbc = new aesjs.ModeOfOperation.cbc(keyBytes, initializationVector)
    const decryptedBytes = aesCbc.decrypt(encryptedBytes)

    // Convert our bytes back into text
    const decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes)

    try {
      // const json = JSON.parse(decryptedText)
      resolve(decryptedText)
    } catch (error) {
      reject(error)
    }
  })
