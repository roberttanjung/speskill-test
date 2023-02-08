import { useState, useEffect } from 'react'
import moment from 'moment/moment'

const Terminal = () => {
  // group: state
  const [time, setTime] = useState('')

  // group: action
  const onTime = () => {
    setInterval(() => {
      setTime(moment(new Date()).format('MMMM Do, YYYY - HH:mm:ss'))
    }, 1000)
  }

  // group: watch
  useEffect(() => {
    setTime(moment(new Date()).format('MMMM Do, YYYY - HH:mm:ss'))
    onTime()

    return () => {
      setTime(moment(new Date()).format('MMMM Do, YYYY - HH:mm:ss'))
    }
  }, [])

  return (
    <section className="terminal-wrap">
      <div className="terminal-box">
        <div>
          <div className="terminal-time xs-hidden">{time}</div>
          <div className="terminal-title xs-hidden">{'<'} SPE / FRONTEND {'>'}</div>
          <div className="terminal-title-2 md-hidden">{'<'} SPE / FRONTEND {'>'}</div>
          <div className="terminal-time-2 md-hidden">{time}</div>
        </div>
      </div>
    </section>
  )
}

export default Terminal
