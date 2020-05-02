import { useEffect } from 'react'
import Mousetrap from 'mousetrap'

Mousetrap.stopCallback = () => false

export default (key, callback) =>
  useEffect(() => {
    Mousetrap.bind(key, callback)

    return () => Mousetrap.unbind(key)
  }, [])
