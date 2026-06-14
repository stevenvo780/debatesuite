import React, { useEffect, useState, lazy, Suspense } from "react"
import { useDispatch, useSelector } from "react-redux"
import "bootstrap/dist/css/bootstrap.min.css"
import GlobalSessionCard from "./components/GlobalSessionCard"
import ParticipantsSection from "./components/ParticipantsSection"
import ParticipantForm, { generateShortId } from "./components/ParticipantForm"
import StatsModal from "./components/StatsModal"
import EditModal from "./components/EditModal"
import RulesModal from "./components/RulesModal"
import RoundSettingsModal from "./components/RoundSettingsModal"
import CriteriaSidebar from "./components/CriteriaSidebar"
import { translations } from './translations'
import {
  addParticipant,
  removeParticipant,
  updateRound,
  setGlobalTimeInput,
  setInitialTime,
  toggleTimer,
  updateParticipant,
  setGlobalSession,
  setGlobalTitle,
  resetStore,
  resetGame,
  setLanguage,
  updateParticipantsOrder,
  addCriterion,
  updateCriterion,
  removeCriterion,
  addFallacy,
  updateFallacy,
  removeFallacy,
} from "./store/debateSlice"
import "./App.css"
import { useTimerLogic } from './hooks/useTimerLogic'
import ConfirmationModals from './components/ConfirmationModals'
import { assignParticipantVisualSlots, getNextParticipantVisualSlot } from "./participantVisuals"
import { BsCpuFill, BsPeopleFill } from "react-icons/bs"

// Lazy-load the simulator so it doesn't increase initial bundle for users who don't use it
const SimuladorDinamicas = lazy(() => import('./simulator/SimuladorDinamicas'))

export default function App() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state)
  const [showStatsModal, setShowStatsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [participantName, setParticipantName] = useState("")
  const [editParticipantId, setEditParticipantId] = useState(null)
  const [editParticipantName, setEditParticipantName] = useState("")
  const [editParticipantTime, setEditParticipantTime] = useState(1)
  const [statsContent, setStatsContent] = useState("")
  const [showResetModal, setShowResetModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showResetTimeModal, setShowResetTimeModal] = useState(false)
  const [selectedParticipantId, setSelectedParticipantId] = useState(null)
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [showRoundSettingsModal, setShowRoundSettingsModal] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(() => Boolean(document.fullscreenElement))
  const [recentFallacyActions, setRecentFallacyActions] = useState([])
  // Tab navigation: 'moderador' | 'simulador'
  const [activeTab, setActiveTab] = useState('moderador')

  const t = (key) => translations[data.language][key]

  const toggleLanguage = () => {
    dispatch(setLanguage(data.language === 'es' ? 'en' : 'es'))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!data.globalSessionPaused) {
        const now = Date.now()
        if (now !== data.globalSessionStart) {
          dispatch(setGlobalSession({
            paused: false,
            pausedAt: null,
            start: data.globalSessionStart
          }))
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [data.globalSessionPaused, data.globalSessionStart, dispatch])

  useEffect(() => {
    const interval = setInterval(() => {
      const active = data.participants.find(p => p.id === data.activeParticipantId)
      if (active) {
        if (active.timeLeft > 0) {
          dispatch(updateParticipant({
            ...active,
            timeLeft: active.timeLeft - 1,
            totalUsed: active.totalUsed + 1,
            roundTimes: {
              ...active.roundTimes,
              [data.round]: (active.roundTimes[data.round] || 0) + 1
            }
          }))
        } else {
          dispatch(toggleTimer(active.id))
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [data.activeParticipantId, data.participants, data.round, dispatch])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (!data.participants.length) return
    const normalizedParticipants = assignParticipantVisualSlots(data.participants)
    if (normalizedParticipants.hasChanges) {
      dispatch(updateParticipantsOrder(normalizedParticipants.participants))
    }
  }, [data.participants, dispatch])

  function handleAddParticipant() {
    if (!participantName.trim() || data.initialTime < 1) return
    const shortId = generateShortId()
    const visualSlot = getNextParticipantVisualSlot(data.participants)
    dispatch(addParticipant({
      id: Date.now(),
      shortId: shortId,
      visualSlot,
      name: participantName.trim(),
      initialTime: parseFloat(data.initialTime),
      totalUsed: 0,
      roundTimes: {},
      timeLeft: parseFloat(data.initialTime) * 60,
      penalties: 0
    }))
    setParticipantName("")
  }

  function handleUpdateRound(value) {
    const parsedValue = parseInt(value, 10)
    if (Number.isNaN(parsedValue) || parsedValue < 1) return
    dispatch(updateRound(parsedValue))
  }

  function handleNewRound() {
    const timeInSeconds = Math.floor(data.globalTimeInput * 60)
    dispatch(updateRound(data.round + 1))
    data.participants.forEach(p => {
      dispatch(updateParticipant({
        ...p,
        initialTime: data.globalTimeInput,
        timeLeft: timeInSeconds
      }))
    })
  }

  function handleToggleTimer(id) {
    dispatch(toggleTimer(id))
  }

  function handleAdjustScore(participantId, delta) {
    const participant = data.participants.find((item) => item.id === participantId)
    if (!participant) return
    dispatch(updateParticipant({
      ...participant,
      penalties: participant.penalties + delta,
    }))
  }

  function handleSaveParticipantChanges() {
    const p = data.participants.find(x => x.id === editParticipantId)
    if (!p || !editParticipantName.trim() || editParticipantTime < 1) return
    dispatch(updateParticipant({
      ...p,
      name: editParticipantName.trim(),
      initialTime: parseFloat(editParticipantTime),
      timeLeft: parseFloat(editParticipantTime) * 60
    }))
    setShowEditModal(false)
  }

  function handleToggleGlobalSession() {
    if (!data.globalSessionPaused) {
      dispatch(setGlobalSession({
        paused: true,
        pausedAt: Date.now(),
        start: data.globalSessionStart
      }))
    } else {
      const pausedDuration = Date.now() - data.globalSessionPausedAt
      dispatch(setGlobalSession({
        paused: false,
        pausedAt: null,
        start: data.globalSessionStart + pausedDuration
      }))
    }
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return m + ":" + (s < 10 ? "0" + s : s)
  }

  function getGlobalSessionClock() {
    if (data.globalSessionPaused) {
      const elapsed = Math.floor((data.globalSessionPausedAt - data.globalSessionStart) / 1000)
      return formatTime(elapsed < 0 ? 0 : elapsed)
    } else {
      const elapsed = Math.floor((Date.now() - data.globalSessionStart) / 1000)
      return formatTime(elapsed < 0 ? 0 : elapsed)
    }
  }

  function handleEditParticipant(id, e) {
    e.stopPropagation()
    const p = data.participants.find(x => x.id === id)
    if (!p) return
    setEditParticipantId(p.id)
    setEditParticipantName(p.name)
    setEditParticipantTime(p.initialTime)
    setShowEditModal(true)
  }

  function handleChangeAllTime() {
    if (data.globalTimeInput < 0) return
    const timeInSeconds = Math.floor(data.globalTimeInput * 60)
    data.participants.forEach(p => {
      dispatch(updateParticipant({
        ...p,
        initialTime: data.globalTimeInput,
        timeLeft: timeInSeconds
      }))
    })
  }

  function handleApplyRoundSettings() {
    handleChangeAllTime()
    setShowRoundSettingsModal(false)
  }

  function handleCreateNewRoundFromSettings() {
    handleNewRound()
    setShowRoundSettingsModal(false)
  }

  async function handleToggleFullscreen() {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
        return
      }
      await document.documentElement.requestFullscreen()
    } catch (error) {
      console.error('No se pudo cambiar el modo de pantalla completa:', error)
    }
  }

  function showStats() {
    let content = ""
    data.participants.forEach((p) => {
      const participantInterventions = data.speakOrder.filter(s => s.participantId === p.id)
      content +=
        `<p><strong>${p.name}</strong><br/>` +
        `${t('totalUsed')}: ${formatTime(p.totalUsed)}<br/>` +
        `${t('participant')}: ${participantInterventions.length}<br/>` +
        `${t('score')}: ${p.penalties}</p>`
    })
    setStatsContent(content)
    setShowStatsModal(true)
  }

  function handleResetConfirmation() {
    setShowResetModal(true)
  }

  function handleResetGame() {
    dispatch(resetGame())
    setShowResetModal(false)
  }

  function handleResetAll() {
    dispatch(resetStore())
    setShowResetModal(false)
  }

  function handleDeleteConfirmation(id, e) {
    e.stopPropagation()
    setSelectedParticipantId(id)
    setShowDeleteModal(true)
  }

  function handleResetTimeConfirmation(id, e) {
    e.stopPropagation()
    setSelectedParticipantId(id)
    setShowResetTimeModal(true)
  }

  function confirmDelete() {
    dispatch(removeParticipant(selectedParticipantId))
    setShowDeleteModal(false)
    setSelectedParticipantId(null)
  }

  function confirmResetTime() {
    const p = data.participants.find(x => x.id === selectedParticipantId)
    if (!p) return
    dispatch(updateParticipant({
      ...p,
      timeLeft: p.initialTime * 60
    }))
    setShowResetTimeModal(false)
    setSelectedParticipantId(null)
  }

  function handleApplyCriterion(criterion) {
    const activeP = data.participants.find(p => p.id === data.activeParticipantId)
    if (!activeP) return
    dispatch(updateParticipant({
      ...activeP,
      penalties: activeP.penalties + criterion.points
    }))
  }

  function handleApplyFallacyAction({ type, fallacyName, detectorId, detectorName }) {
    const activeP = data.participants.find(p => p.id === data.activeParticipantId)
    if (!activeP) return

    const actionId = Date.now()
    const action = { id: actionId, type, fallacyName, speakerName: activeP.name, detectorId, detectorName }

    if (type === 'landed') {
      dispatch(updateParticipant({ ...activeP, penalties: activeP.penalties + 2 }))
    } else if (type === 'detected') {
      dispatch(updateParticipant({ ...activeP, penalties: activeP.penalties - 2 }))
      if (detectorId) {
        const detector = data.participants.find(p => p.id === detectorId)
        if (detector) {
          dispatch(updateParticipant({ ...detector, penalties: detector.penalties + 1 }))
        }
      }
    }

    setRecentFallacyActions(prev => [action, ...prev].slice(0, 5))
  }

  function handleUndoFallacyAction(actionId) {
    const action = recentFallacyActions.find(a => a.id === actionId)
    if (!action) return

    const speaker = data.participants.find(p => p.name === action.speakerName)
    if (speaker) {
      if (action.type === 'landed') {
        dispatch(updateParticipant({ ...speaker, penalties: speaker.penalties - 2 }))
      } else if (action.type === 'detected') {
        dispatch(updateParticipant({ ...speaker, penalties: speaker.penalties + 2 }))
        if (action.detectorId) {
          const detector = data.participants.find(p => p.id === action.detectorId)
          if (detector) {
            dispatch(updateParticipant({ ...detector, penalties: detector.penalties - 1 }))
          }
        }
      }
    }

    setRecentFallacyActions(prev => prev.filter(a => a.id !== actionId))
  }

  const { activeTimeLeft } = useTimerLogic(data)
  const activeParticipant = data.participants.find(p => p.id === data.activeParticipantId) || null

  const tabLabel = {
    moderador: data.language === 'es' ? 'Moderador' : 'Moderator',
    simulador: data.language === 'es' ? 'Simulador de Dinamicas' : 'Dynamics Simulator',
  }

  return (
    <>
      {/* Top navbar — always visible */}
      <GlobalSessionCard
        t={t}
        language={data.language}
        round={data.round}
        globalSessionTitle={data.globalSessionTitle}
        getGlobalSessionClock={getGlobalSessionClock}
        toggleGlobalSession={handleToggleGlobalSession}
        onTitleChange={(val) => dispatch(setGlobalTitle(val))}
        activeTimeLeft={activeTimeLeft}
        onNewRound={handleNewRound}
        onOpenRoundSettings={() => setShowRoundSettingsModal(true)}
        toggleLanguage={toggleLanguage}
        onShowRules={() => setShowRulesModal(true)}
        onShowStats={showStats}
        onReset={handleResetConfirmation}
        isFullscreen={isFullscreen}
        toggleFullscreen={handleToggleFullscreen}
      />

      {/* Tab switcher */}
      <div className="app-tab-switcher">
        <button
          className={`app-tab-btn${activeTab === 'moderador' ? ' active' : ''}`}
          onClick={() => setActiveTab('moderador')}
          role="tab"
          aria-selected={activeTab === 'moderador'}
        >
          <BsPeopleFill />
          <span>{tabLabel.moderador}</span>
        </button>
        <button
          className={`app-tab-btn${activeTab === 'simulador' ? ' active' : ''}`}
          onClick={() => setActiveTab('simulador')}
          role="tab"
          aria-selected={activeTab === 'simulador'}
        >
          <BsCpuFill />
          <span>{tabLabel.simulador}</span>
        </button>
      </div>

      {/* TAB: MODERADOR */}
      {activeTab === 'moderador' && (
        <div className="app-layout">
          <div className="app-main">
            <ParticipantsSection
              t={t}
              participants={data.participants}
              round={data.round}
              activeParticipantId={data.activeParticipantId}
              toggleTimer={handleToggleTimer}
              adjustScore={handleAdjustScore}
              editParticipant={handleEditParticipant}
              resetTime={handleResetTimeConfirmation}
              removeParticipant={handleDeleteConfirmation}
              formatTime={formatTime}
              onReorder={(newOrder) => dispatch(updateParticipantsOrder(newOrder))}
            />
            <ParticipantForm
              t={t}
              participantName={participantName}
              setParticipantName={setParticipantName}
              initialTime={data.initialTime}
              setInitialTime={(val) => dispatch(setInitialTime(val))}
              addParticipant={handleAddParticipant}
            />
          </div>

          <aside className="app-sidebar">
            <CriteriaSidebar
              t={t}
              criteria={data.scoringCriteria}
              fallacies={data.fallacies}
              participants={data.participants}
              onAddCriterion={(c) => dispatch(addCriterion(c))}
              onUpdateCriterion={(c) => dispatch(updateCriterion(c))}
              onRemoveCriterion={(id) => dispatch(removeCriterion(id))}
              onApplyCriterion={handleApplyCriterion}
              onApplyFallacyAction={handleApplyFallacyAction}
              onAddFallacy={(f) => dispatch(addFallacy(f))}
              onUpdateFallacy={(f) => dispatch(updateFallacy(f))}
              onRemoveFallacy={(id) => dispatch(removeFallacy(id))}
              activeParticipant={activeParticipant}
              recentFallacyActions={recentFallacyActions}
              onUndoFallacyAction={handleUndoFallacyAction}
            />
          </aside>
        </div>
      )}

      {/* TAB: SIMULADOR (lazy) */}
      {activeTab === 'simulador' && (
        <Suspense fallback={<div className="sim-loading">Cargando simulador...</div>}>
          <SimuladorDinamicas language={data.language} />
        </Suspense>
      )}

      {/* Modals */}
      <StatsModal
        t={t}
        show={showStatsModal}
        onHide={() => setShowStatsModal(false)}
        statsContent={statsContent}
      />
      <RoundSettingsModal
        show={showRoundSettingsModal}
        onHide={() => setShowRoundSettingsModal(false)}
        t={t}
        round={data.round}
        updateRoundValue={handleUpdateRound}
        globalTimeInput={data.globalTimeInput}
        setGlobalTimeInput={(val) => dispatch(setGlobalTimeInput(val))}
        applyRoundTime={handleApplyRoundSettings}
        createNewRound={handleCreateNewRoundFromSettings}
      />
      <EditModal
        t={t}
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        editParticipantId={editParticipantId}
        editParticipantName={editParticipantName}
        editParticipantTime={editParticipantTime}
        setEditParticipantName={setEditParticipantName}
        setEditParticipantTime={setEditParticipantTime}
        saveParticipantChanges={handleSaveParticipantChanges}
      />
      <ConfirmationModals
        t={t}
        showDeleteModal={showDeleteModal}
        showResetTimeModal={showResetTimeModal}
        showResetModal={showResetModal}
        onCloseDelete={() => setShowDeleteModal(false)}
        onCloseResetTime={() => setShowResetTimeModal(false)}
        onCloseReset={() => setShowResetModal(false)}
        onConfirmDelete={confirmDelete}
        onConfirmResetTime={confirmResetTime}
        onResetGame={handleResetGame}
        onResetAll={handleResetAll}
      />
      <RulesModal
        show={showRulesModal}
        onHide={() => setShowRulesModal(false)}
        language={data.language}
      />
    </>
  )
}
