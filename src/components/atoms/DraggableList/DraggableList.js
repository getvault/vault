// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
// https://codesandbox.io/embed/r5qmj8m6lq
// https://codesandbox.io/s/fh8r8
import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import clamp from 'lodash/clamp'
import swap from 'lodash-move'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated, interpolate } from 'react-spring'

import style from './DraggableList.style'

const height = 100

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
        y: curIndex * height + y,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: n => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * height,
        scale: 1,
        zIndex: '0',
        shadow: 1,
        immediate: false,
      }

const DraggableList = ({ items }) => {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(
      Math.round((curIndex * height + y) / height),
      0,
      items.length - 1
    )
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })
  return (
    <div className={style.list} style={{ height: height * items.length }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => {
        return (
          <animated.div
            {...bind(i)}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={style.item}
            style={{
              height: `${height}px`,
              zIndex,
              boxShadow: shadow.interpolate(
                s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
              ),
              transform: interpolate(
                [y, scale],
                (y1, s) => `translate3d(0,${y1}px,0) scale(${s})`
              ),
            }}
          >
            {items[i]}
          </animated.div>
        )
      })}
    </div>
  )
}

DraggableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
}

DraggableList.defaultProps = {
  items: [],
}

export default DraggableList
