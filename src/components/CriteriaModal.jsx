import React, { useState } from "react"
import { Modal, Button, Form, InputGroup, ListGroup } from "react-bootstrap"
import { BsFillTrashFill, BsPlusCircleFill } from "react-icons/bs"

export default function CriteriaModal({
  t,
  show,
  onHide,
  criteria,
  onAddCriterion,
  onUpdateCriterion,
  onRemoveCriterion
}) {
  const [newName, setNewName] = useState("")
  const [newPoints, setNewPoints] = useState(1)

  const handleAdd = () => {
    if (!newName.trim() || newPoints < 1) return
    onAddCriterion({ name: newName.trim(), points: parseInt(newPoints) })
    setNewName("")
    setNewPoints(1)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAdd()
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t("manageCriteria")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>{t("addNewCriterion")}</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder={t("criterionName")}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Form.Control
            type="number"
            min="1"
            style={{ maxWidth: "80px" }}
            value={newPoints}
            onChange={(e) => setNewPoints(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Button variant="success" onClick={handleAdd}>
            <BsPlusCircleFill />
          </Button>
        </InputGroup>

        <Form.Label>{t("existingCriteria")}</Form.Label>
        <ListGroup>
          {criteria && criteria.map(criterion => (
            <ListGroup.Item
              key={criterion.id}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="d-flex align-items-center gap-2 flex-grow-1">
                <Form.Control
                  type="text"
                  size="sm"
                  value={criterion.name}
                  onChange={(e) => onUpdateCriterion({
                    ...criterion,
                    name: e.target.value
                  })}
                  style={{ maxWidth: "150px" }}
                />
                <Form.Control
                  type="number"
                  size="sm"
                  min="1"
                  value={criterion.points}
                  onChange={(e) => onUpdateCriterion({
                    ...criterion,
                    points: parseInt(e.target.value) || 1
                  })}
                  style={{ maxWidth: "70px" }}
                />
                <span className="text-muted small">{t("points")}</span>
              </div>
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={() => onRemoveCriterion(criterion.id)}
              >
                <BsFillTrashFill />
              </Button>
            </ListGroup.Item>
          ))}
          {(!criteria || criteria.length === 0) && (
            <ListGroup.Item className="text-muted text-center">
              {t("noCriteria")}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
