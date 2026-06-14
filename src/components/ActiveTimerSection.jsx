import React from "react"
import { Row, Col, InputGroup, Form, Button } from "react-bootstrap"

export default function ActiveTimerSection({
  activeTimer,
  globalTimeInput,
  setGlobalTimeInput,
  changeAllTime,
  getGlobalSessionClock,
  activeParticipant,
  activeTimeLeft
}) {
  return (
    <div className="section-box">
      <Row className="g-3 align-items-center mb-3">
        <Col sm={6} md={4} className="d-flex">
          <h5 className="mb-0 me-2">Active Timer:</h5>
          <div>{activeTimer}</div>
        </Col>
        <Col sm={6} md={4}>
          <InputGroup>
            <Form.Control
              type="number"
              placeholder="Set new time (minutes)"
              min="1"
              value={globalTimeInput}
              onChange={(e) => setGlobalTimeInput(e.target.value)}
            />
            <Button variant="warning" onClick={changeAllTime}>
              Change All
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="g-3 align-items-center mb-3">
        <Col sm={6} md={4} className="d-flex">
          <h5 className="mb-0 me-2">Tiempo General:</h5>
          <div>{getGlobalSessionClock()}</div>
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <div style={{ fontSize: "1.5rem" }}>
          {activeParticipant ? activeParticipant.name : "Pause"}
        </div>
        <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
          {activeTimeLeft}
        </div>
      </div>
    </div>
  )
}
