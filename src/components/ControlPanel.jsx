import React from "react"
import { Button } from "react-bootstrap"
import { BsArrowRepeat, BsClockHistory, BsSkipForwardFill, BsSliders } from "react-icons/bs"

function formatConfiguredTime(globalTimeInput) {
  const minutes = Math.floor(globalTimeInput)
  const seconds = Math.round((globalTimeInput % 1) * 60)
  return `${minutes}:${String(seconds).padStart(2, "0")}`
}

export default function ControlPanel({
  t,
  round,
  newRound,
  openRoundSettings,
  globalTimeInput,
}) {
  return (
    <div className="section-box control-panel">
      <div className="control-row control-row-compact">
        <div className="control-summary-pill">
          <BsArrowRepeat className="ctrl-icon" />
          <span className="control-summary-label">{t('round')}</span>
          <strong className="control-summary-value">{round}</strong>
        </div>

        <div className="control-summary-pill control-summary-pill-wide">
          <BsClockHistory className="ctrl-icon" />
          <span className="control-summary-label">{t('configuredTime')}</span>
          <strong className="control-summary-value">{formatConfiguredTime(globalTimeInput)}</strong>
        </div>

        <div className="control-actions compact-actions">
          <Button variant="secondary" className="ctrl-action-btn" onClick={openRoundSettings} title={t('roundSettings')}>
            <BsSliders style={{ width: "1rem", height: "1rem" }} />
            <span>{t('roundSettings')}</span>
          </Button>
          <Button variant="primary" className="ctrl-action-btn" onClick={newRound} title={t('newRound')}>
            <BsSkipForwardFill style={{ width: "1rem", height: "1rem" }} />
            <span>{t('newRound')}</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
