export const evaluateStrength = password =>
  Math.min(Math.floor(password.length / 3), 5)

export const generatePassword = () => 'Foo!2vcvcx'
