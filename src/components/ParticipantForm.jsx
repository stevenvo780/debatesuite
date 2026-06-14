import React, { useState } from "react"
import { Button, Form, InputGroup, Modal } from "react-bootstrap"
import { BsPersonPlusFill, BsClockFill, BsPlusLg } from "react-icons/bs"

export const generateShortId = () => {
  return Math.random().toString(36).substring(2, 6).toUpperCase();
}

export default function ParticipantForm({
  t,
  participantName,
  setParticipantName,
  initialTime,
  setInitialTime,
  addParticipant
}) {
  const [showModal, setShowModal] = useState(false)

  function handleSubmit() {
    if (!participantName.trim() || Number(initialTime) < 1) return
    addParticipant()
    setShowModal(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <Button
        variant="primary"
        className="participant-fab"
        onClick={() => setShowModal(true)}
        title={t('addParticipant')}
        aria-label={t('addParticipant')}
      >
        <BsPlusLg />
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('addParticipant')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="add-participant-modal-grid">
            <InputGroup>
              <InputGroup.Text><BsPersonPlusFill style={{ opacity: 0.7 }} /></InputGroup.Text>
              <Form.Control
                type="text"
                placeholder={t('participantName')}
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                onKeyDown={handleKey}
                autoFocus
              />
            </InputGroup>
            <InputGroup>
              <InputGroup.Text><BsClockFill style={{ opacity: 0.7 }} /></InputGroup.Text>
              <Form.Control
                type="number"
                min="1"
                value={initialTime}
                onChange={(e) => setInitialTime(e.target.value)}
                onKeyDown={handleKey}
              />
            </InputGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t('close')}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            <BsPersonPlusFill style={{ marginRight: "0.4rem" }} />
            {t('addParticipant')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
