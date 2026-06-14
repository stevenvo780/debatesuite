
import React from 'react'
import { Modal, Button } from 'react-bootstrap'

export default function ConfirmationModals({
  t,
  showDeleteModal,
  showResetTimeModal,
  showResetModal,
  onCloseDelete,
  onCloseResetTime,
  onCloseReset,
  onConfirmDelete,
  onConfirmResetTime,
  onResetGame,
  onResetAll
}) {
  return (
    <>
      <Modal show={showDeleteModal} onHide={onCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('deleteConfirmTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('deleteConfirmMessage')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseDelete}>
            {t('cancel')}
          </Button>
          <Button variant="danger" onClick={onConfirmDelete}>
            {t('confirm')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResetTimeModal} onHide={onCloseResetTime} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('resetTimeConfirmTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('resetTimeConfirmMessage')}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseResetTime}>
            {t('cancel')}
          </Button>
          <Button variant="warning" onClick={onConfirmResetTime}>
            {t('confirm')}
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showResetModal} onHide={onCloseReset} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('resetConfirmTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t('resetConfirmMessage')}</p>
          <div className="d-grid gap-2">
            <Button variant="warning" onClick={onResetGame}>
              {t('resetGame')}
              <small className="d-block">{t('resetGameDescription')}</small>
            </Button>
            <Button variant="danger" onClick={onResetAll}>
              {t('resetAll')}
              <small className="d-block">{t('resetAllDescription')}</small>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}