import { useState, useEffect } from 'react'

export function useTimerLogic(data) {
  const [timers, setTimers] = useState({
    activeTimeLeft: "00:00",
    activeTimer: "00:00"
  })

  useEffect(() => {
    const requestId = requestAnimationFrame(updateTimers)
    
    function updateTimers() {
      const activeParticipant = data.participants.find(
        (p) => p.id === data.activeParticipantId
      )
      
      const newActiveTimeLeft = activeParticipant 
        ? formatTime(activeParticipant.timeLeft) 
        : "00:00"
        
      const newActiveTimer = data.activeParticipantId && data.sessionStart
        ? formatTime(Math.floor((Date.now() - data.sessionStart) / 1000))
        : "00:00"

      setTimers({
        activeTimeLeft: newActiveTimeLeft,
        activeTimer: newActiveTimer
      })
      
      requestAnimationFrame(updateTimers)
    }

    return () => cancelAnimationFrame(requestId)
  }, [data])

  return timers
}

function formatTime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return m + ":" + (s < 10 ? "0" + s : s)
}