import React from "react"
import { Button, Dropdown, Form } from "react-bootstrap"
import {
  BsArrowsFullscreen,
  BsArrowCounterclockwise,
  BsArrowRepeat,
  BsBarChartFill,
  BsBook,
  BsFullscreenExit,
  BsGear,
  BsGlobeCentralSouthAsia,
  BsHourglassSplit,
  BsMoonStars,
  BsSkipForwardFill,
  BsSun,
  BsThreeDots,
  BsTranslate,
} from "react-icons/bs"

function TopChip({ icon: Icon, value, accent = false, onClick, title }) {
  const className = `top-stat-chip${accent ? " accent" : ""}`

  const content = (
    <>
      <Icon className="gstat-icon" />
      <span className="top-stat-value">{value}</span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className={`${className} top-stat-button`} onClick={onClick} title={title} aria-label={title}>
        {content}
      </button>
    )
  }

  return <div className={className}>{content}</div>
}

export default function GlobalSessionCard({
  t,
  language,
  round,
  globalSessionTitle,
  getGlobalSessionClock,
  toggleGlobalSession,
  onTitleChange,
  activeTimeLeft,
  onNewRound,
  onOpenRoundSettings,
  toggleLanguage,
  onShowRules,
  onShowStats,
  onReset,
  isFullscreen,
  toggleFullscreen,
  onGoHome,
  theme,
  toggleTheme,
}) {
  return (
    <div className="section-box global-card top-navbar">
      <button
        type="button"
        className="sv-wordmark"
        aria-label={language === 'es' ? 'Volver al inicio de Agón' : 'Back to Agón home'}
        onClick={onGoHome}
      >
        <img src="/favicon.svg" alt="" aria-hidden="true" width="26" height="26" className="sv-wordmark-logo" />
        <span className="sv-wordmark-text">Agón</span>
        <span className="sv-wordmark-ecosystem">Mouseîon</span>
      </button>
      <div className="top-navbar-title-area">
        <Form.Control
          placeholder={t('chatTitle')}
          className="global-title-input"
          value={globalSessionTitle}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </div>

      <div className="top-navbar-status">
        <TopChip
          icon={BsGlobeCentralSouthAsia}
          value={getGlobalSessionClock()}
          title={t('globalTime')}
          onClick={toggleGlobalSession}
        />
        <TopChip
          icon={BsArrowRepeat}
          value={`R${round}`}
          title={t('round')}
        />
        <TopChip
          icon={BsHourglassSplit}
          value={activeTimeLeft}
          accent
          title={t('timeLeft')}
        />
      </div>

      <div className="top-navbar-actions">
        <Button variant="primary" className="top-primary-action" onClick={onNewRound} title={t('newRound')}>
          <BsSkipForwardFill />
          <span>{t('newRoundShort')}</span>
        </Button>

        <Dropdown align="end">
          <Dropdown.Toggle variant="secondary" className="top-menu-toggle" id="top-menu-dropdown" aria-label={t('moreOptions')}>
            <BsThreeDots />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={onOpenRoundSettings}>
              <BsGear />
              <span>{t('roundSettings')}</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={toggleLanguage}>
              <BsTranslate />
              <span>{`${t('toggleLanguage')} · ${language === 'es' ? 'English' : 'Español'}`}</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={toggleTheme}>
              {theme === 'dark' ? <BsSun /> : <BsMoonStars />}
              <span>
                {theme === 'dark'
                  ? (language === 'es' ? 'Modo claro' : 'Light mode')
                  : (language === 'es' ? 'Modo oscuro' : 'Dark mode')}
              </span>
            </Dropdown.Item>
            <Dropdown.Item onClick={onShowRules}>
              <BsBook />
              <span>{t('showRules')}</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={onShowStats}>
              <BsBarChartFill />
              <span>{t('showStats')}</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={toggleFullscreen}>
              {isFullscreen ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
              <span>{isFullscreen ? t('exitFullscreen') : t('enterFullscreen')}</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={onReset} className="top-menu-danger">
              <BsArrowCounterclockwise />
              <span>{t('resetAll')}</span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}
