import { encrypt, decrypt } from '../encryption'

describe('AES Encryption', () => {
  it('should be able to decrypt an encrypted json', async () => {
    const json = 'data' // { data: 'data' }
    const key = 'TextMustBe16Byte'
    const encrypted = await encrypt(json, key)

    expect(await decrypt(encrypted, key)).toEqual(json)
  })
})
