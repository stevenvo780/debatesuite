import {
  GiBearHead,
  GiCrystalBall,
  GiDeerHead,
  GiDragonHead,
  GiEagleEmblem,
  GiElephantHead,
  GiFoxHead,
  GiLynxHead,
  GiOctopus,
  GiOwl,
  GiParrotHead,
  GiRabbitHead,
  GiRaccoonHead,
  GiRaven,
  GiSamuraiHelmet,
  GiSpartanHelmet,
  GiStagHead,
  GiTigerHead,
  GiTriceratopsHead,
  GiWolfHead,
} from "react-icons/gi"

const PARTICIPANT_VISUALS = [
  {
    Icon: GiFoxHead,
    background: "linear-gradient(135deg, #7a3a14 0%, #cd853f 100%)",
    color: "#fff2df",
    border: "rgba(255, 215, 174, 0.35)",
  },
  {
    Icon: GiOwl,
    background: "linear-gradient(135deg, #3b3448 0%, #8c6ad5 100%)",
    color: "#f7f3ff",
    border: "rgba(214, 202, 255, 0.35)",
  },
  {
    Icon: GiRaven,
    background: "linear-gradient(135deg, #1b2735 0%, #415a77 100%)",
    color: "#ecf5ff",
    border: "rgba(188, 213, 237, 0.35)",
  },
  {
    Icon: GiTigerHead,
    background: "linear-gradient(135deg, #7f2704 0%, #ff8c42 100%)",
    color: "#fff4e6",
    border: "rgba(255, 214, 176, 0.35)",
  },
  {
    Icon: GiWolfHead,
    background: "linear-gradient(135deg, #243b53 0%, #486581 100%)",
    color: "#f1f7fb",
    border: "rgba(199, 220, 236, 0.35)",
  },
  {
    Icon: GiOctopus,
    background: "linear-gradient(135deg, #5c2b5f 0%, #b15cff 100%)",
    color: "#fff0ff",
    border: "rgba(242, 201, 255, 0.35)",
  },
  {
    Icon: GiSpartanHelmet,
    background: "linear-gradient(135deg, #5b3a29 0%, #c08b5c 100%)",
    color: "#fff5ea",
    border: "rgba(255, 221, 186, 0.35)",
  },
  {
    Icon: GiCrystalBall,
    background: "linear-gradient(135deg, #244c4c 0%, #39b8b8 100%)",
    color: "#efffff",
    border: "rgba(192, 255, 250, 0.35)",
  },
  {
    Icon: GiEagleEmblem,
    background: "linear-gradient(135deg, #47311c 0%, #d4a15a 100%)",
    color: "#fff7e8",
    border: "rgba(255, 230, 192, 0.35)",
  },
  {
    Icon: GiElephantHead,
    background: "linear-gradient(135deg, #335c67 0%, #72a4b0 100%)",
    color: "#f1fbff",
    border: "rgba(205, 237, 245, 0.35)",
  },
  {
    Icon: GiBearHead,
    background: "linear-gradient(135deg, #4b3527 0%, #9f6f4f 100%)",
    color: "#fff3ea",
    border: "rgba(246, 214, 191, 0.35)",
  },
  {
    Icon: GiDeerHead,
    background: "linear-gradient(135deg, #405d27 0%, #7db14a 100%)",
    color: "#f7ffef",
    border: "rgba(223, 247, 198, 0.35)",
  },
  {
    Icon: GiRabbitHead,
    background: "linear-gradient(135deg, #8a4f7d 0%, #ef8dd2 100%)",
    color: "#fff5fc",
    border: "rgba(255, 214, 240, 0.35)",
  },
  {
    Icon: GiRaccoonHead,
    background: "linear-gradient(135deg, #38424f 0%, #7e8da1 100%)",
    color: "#f4f8ff",
    border: "rgba(216, 225, 239, 0.35)",
  },
  {
    Icon: GiParrotHead,
    background: "linear-gradient(135deg, #8b1e3f 0%, #f05d5e 100%)",
    color: "#fff6f4",
    border: "rgba(255, 213, 208, 0.35)",
  },
  {
    Icon: GiLynxHead,
    background: "linear-gradient(135deg, #4c3c23 0%, #c59d48 100%)",
    color: "#fff8e7",
    border: "rgba(252, 230, 182, 0.35)",
  },
  {
    Icon: GiStagHead,
    background: "linear-gradient(135deg, #234653 0%, #4cb3b5 100%)",
    color: "#edfeff",
    border: "rgba(197, 249, 245, 0.35)",
  },
  {
    Icon: GiDragonHead,
    background: "linear-gradient(135deg, #55286f 0%, #bb4cff 100%)",
    color: "#faf0ff",
    border: "rgba(236, 205, 255, 0.35)",
  },
  {
    Icon: GiTriceratopsHead,
    background: "linear-gradient(135deg, #31572c 0%, #90a955 100%)",
    color: "#fbffec",
    border: "rgba(231, 241, 190, 0.35)",
  },
  {
    Icon: GiSamuraiHelmet,
    background: "linear-gradient(135deg, #40213b 0%, #b24c95 100%)",
    color: "#fff3fc",
    border: "rgba(248, 210, 237, 0.35)",
  },
]

function hashParticipantKey(value) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

function isValidVisualSlot(value) {
  return Number.isInteger(value) && value >= 0 && value < PARTICIPANT_VISUALS.length
}

function compareParticipants(a, b) {
  const aId = Number(a.id) || 0
  const bId = Number(b.id) || 0

  if (aId !== bId) {
    return aId - bId
  }

  return String(a.shortId || a.name || a.id).localeCompare(String(b.shortId || b.name || b.id))
}

function findFreeVisualSlot(preferredSlot, usedSlots) {
  for (let offset = 0; offset < PARTICIPANT_VISUALS.length; offset += 1) {
    const candidate = (preferredSlot + offset) % PARTICIPANT_VISUALS.length

    if (!usedSlots.has(candidate)) {
      return candidate
    }
  }

  return preferredSlot
}

export function getParticipantVisualMap(participants = []) {
  const participantVisualMap = new Map()
  const usedSlots = new Set()
  const normalizedParticipants = [...participants].sort(compareParticipants)

  normalizedParticipants.forEach((participant) => {
    if (!isValidVisualSlot(participant.visualSlot) || usedSlots.has(participant.visualSlot)) {
      return
    }

    usedSlots.add(participant.visualSlot)
    participantVisualMap.set(participant.id, {
      ...PARTICIPANT_VISUALS[participant.visualSlot],
      slot: participant.visualSlot,
      title: participant.name,
    })
  })

  normalizedParticipants.forEach((participant) => {
    if (participantVisualMap.has(participant.id)) {
      return
    }

    const key = `${participant.id || ""}-${participant.shortId || ""}-${participant.name || ""}`
    const preferredSlot = hashParticipantKey(key) % PARTICIPANT_VISUALS.length
    const slot = findFreeVisualSlot(preferredSlot, usedSlots)

    usedSlots.add(slot)
    participantVisualMap.set(participant.id, {
      ...PARTICIPANT_VISUALS[slot],
      slot,
      title: participant.name,
    })
  })

  return participantVisualMap
}

export function getNextParticipantVisualSlot(participants = []) {
  const usedSlots = new Set(
    Array.from(getParticipantVisualMap(participants).values(), ({ slot }) => slot)
  )

  for (let slot = 0; slot < PARTICIPANT_VISUALS.length; slot += 1) {
    if (!usedSlots.has(slot)) {
      return slot
    }
  }

  return 0
}

export function assignParticipantVisualSlots(participants = []) {
  const participantVisualMap = getParticipantVisualMap(participants)
  let hasChanges = false

  const normalizedParticipants = participants.map((participant) => {
    const visual = participantVisualMap.get(participant.id)

    if (!visual || participant.visualSlot === visual.slot) {
      return participant
    }

    hasChanges = true

    return {
      ...participant,
      visualSlot: visual.slot,
    }
  })

  return {
    participants: normalizedParticipants,
    hasChanges,
  }
}

export function getParticipantVisual(participant, participants = []) {
  const participantVisualMap = getParticipantVisualMap(participants)
  const visual = participantVisualMap.get(participant.id)

  if (visual) {
    return visual
  }

  return {
    ...PARTICIPANT_VISUALS[0],
    slot: 0,
    title: participant.name,
  }
}