import React from "react"
import { Modal, Button, Form } from "react-bootstrap"

export default function EditModal({
  t,
  show,
  onHide,
  editParticipantId,
  editParticipantName,
  editParticipantTime,
  setEditParticipantName,
  setEditParticipantTime,
  saveParticipantChanges
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('editParticipant')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control type="hidden" value={editParticipantId || ""} readOnly />
        <div className="mb-3">
          <Form.Label>{t('name')}</Form.Label>
          <Form.Control
            type="text"
            value={editParticipantName}
            onChange={(e) => setEditParticipantName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <Form.Label>{t('time')}</Form.Label>
          <Form.Control
            type="number"
            min="1"
            value={editParticipantTime}
            onChange={(e) => setEditParticipantTime(e.target.value)}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={saveParticipantChanges}>
          {t('save')}
        </Button>
        <Button variant="secondary" onClick={onHide}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
