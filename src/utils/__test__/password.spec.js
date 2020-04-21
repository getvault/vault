import { evaluateStrength, generatePassword } from '../password'

describe('evaluateStrength', () => {
  it('should return 0 when empty string', () => {
    expect(evaluateStrength('')).toEqual(0)
  })

  it('should return 0', () => {
    expect(evaluateStrength('asd')).toEqual(1)
  })

  it('should return 1', () => {
    expect(evaluateStrength('qwerty')).toEqual(2)
  })

  it('should return 2', () => {
    expect(evaluateStrength('qwertyqwerty')).toEqual(4)
  })

  it('should return 5', () => {
    expect(evaluateStrength('qwertyqwertyqwertyqwertyqwertyqwerty')).toEqual(5)
  })
})

describe('generatePassword', () => {
  it('should return random string', () => {
    expect(typeof generatePassword()).toEqual('string')
  })
})
