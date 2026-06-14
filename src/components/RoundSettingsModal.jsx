import React from "react"
import { Button, Form, InputGroup, Modal } from "react-bootstrap"
import { BsArrowRepeat, BsClockHistory } from "react-icons/bs"

export default function RoundSettingsModal({
  show,
  onHide,
  t,
  round,
  updateRoundValue,
  globalTimeInput,
  setGlobalTimeInput,
  applyRoundTime,
  createNewRound,
}) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('roundSettings')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('roundSettingsHelp')}</p>

        <div className="round-settings-grid">
          <div>
            <Form.Label>{t('round')}</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsArrowRepeat /></InputGroup.Text>
              <Form.Control
                type="number"
                min="1"
                value={round}
                onChange={(e) => updateRoundValue(e.target.value)}
              />
            </InputGroup>
          </div>

          <div>
            <Form.Label>{t('configuredTime')}</Form.Label>
            <InputGroup>
              <InputGroup.Text><BsClockHistory /></InputGroup.Text>
              <Form.Control
                type="number"
                min="0"
                placeholder={t('minutes')}
                value={Math.floor(globalTimeInput)}
                onChange={(e) => setGlobalTimeInput(Number(e.target.value) + (globalTimeInput % 1))}
              />
              <InputGroup.Text>:</InputGroup.Text>
              <Form.Control
                type="number"
                min="0"
                max="59"
                placeholder={t('seconds')}
                value={Math.round((globalTimeInput % 1) * 60)}
                onChange={(e) => {
                  const secs = Number(e.target.value)
                  if (secs >= 0 && secs <= 59) {
                    setGlobalTimeInput(Math.floor(globalTimeInput) + (secs / 60))
                  }
                }}
              />
            </InputGroup>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('close')}
        </Button>
        <Button variant="warning" onClick={applyRoundTime}>
          {t('changeTime')}
        </Button>
        <Button variant="primary" onClick={createNewRound}>
          {t('newRound')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}