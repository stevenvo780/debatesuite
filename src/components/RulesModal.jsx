import React, { useEffect, useRef } from "react"
import {
  BsBook, BsTrophy, BsShield, BsPeople, BsEye, BsCpu,
  BsClockHistory, BsQuestionCircle, BsArrowRepeat, BsChatQuote,
  BsExclamationTriangle, BsMegaphone, BsLightning, BsStar,
  BsHandThumbsUp, BsHandThumbsDown, BsXOctagon,
  BsPersonX, BsVolumeUp, BsBarChart, BsCalculator, BsAward,
  BsPeopleFill, BsGraphUp, BsBan, BsSliders, BsGear,
  BsFire, BsXLg
} from "react-icons/bs"
import "../styles/RulesModal.css"

function PointBadge({ value, label }) {
  const isPositive = value > 0
  return (
    <div className={`rl-point-badge ${isPositive ? "positive" : "negative"}`}>
      <span className="rl-point-value">{isPositive ? "+" : ""}{value}</span>
      <span className="rl-point-label">{label}</span>
    </div>
  )
}

function RoleCard({ icon: Icon, title, description, items, es }) {
  return (
    <div className="rl-role-card">
      <div className="rl-role-icon-wrap"><Icon /></div>
      <h4>{title}</h4>
      {description && <p>{description}</p>}
      {items && (
        <ul>{items.map((item, i) => <li key={i}>{item}</li>)}</ul>
      )}
    </div>
  )
}

export default function RulesModal({ show, onHide, language }) {
  const es = language === "es"
  const overlayRef = useRef(null)

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [show])

  useEffect(() => {
    if (!show) return
    const handleKey = (e) => { if (e.key === "Escape") onHide() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [show, onHide])

  if (!show) return null

  return (
    <div className="rl-overlay" ref={overlayRef}>
      <button className="rl-close" onClick={onHide} aria-label="Close"><BsXLg /></button>

      {/* ─── HERO ─── */}
      <section className="rl-hero">
        <div className="rl-hero-bg" />
        <div className="rl-hero-content">
          <BsFire className="rl-hero-icon" />
          <h1>Cafetería del Caos</h1>
          <p className="rl-hero-sub">
            {es ? "Reglamento oficial de debates retóricos" : "Official rhetorical debate rules"}
          </p>
          <div className="rl-hero-divider" />
          <p className="rl-hero-tagline">
            {es
              ? "Aquí la retórica no adorna el debate: lo decide."
              : "Here, rhetoric doesn't adorn the debate: it decides it."}
          </p>
        </div>
      </section>

      {/* ─── 1. NATURALEZA ─── */}
      <section className="rl-section">
        <div className="rl-section-inner">
          <div className="rl-section-number">01</div>
          <div className="rl-section-icon"><BsBook /></div>
          <h2>{es ? "Naturaleza del formato" : "Format Nature"}</h2>
          <p className="rl-lead">
            {es
              ? "Los debates retóricos de Cafetería del Caos no buscan premiar la verdad objetiva, sino la capacidad de convencer, resistir presión, sostener una postura, responder con rapidez, explotar debilidades del rival y dominar la escena."
              : "Cafetería del Caos debates don't primarily reward objective truth, but the ability to convince, resist pressure, sustain a stance, respond quickly, exploit opponent's weaknesses and dominate the scene."}
          </p>
          <blockquote className="rl-quote">
            {es
              ? "La razón importa, pero no como criterio absoluto de victoria. Aquí gana quien mejor se impone retóricamente."
              : "Reason matters, but not as the absolute criterion of victory. Here, whoever imposes themselves rhetorically best wins."}
          </blockquote>
        </div>
      </section>

      {/* ─── 2. PRINCIPIO RECTOR ─── */}
      <section className="rl-section rl-section-alt">
        <div className="rl-section-inner">
          <div className="rl-section-number">02</div>
          <div className="rl-section-icon"><BsTrophy /></div>
          <h2>{es ? "Principio rector" : "Guiding Principle"}</h2>
          <div className="rl-featured-box">
            <BsTrophy className="rl-featured-icon" />
            <p>
              {es
                ? "En este formato se premia el convencimiento por encima de la verdad."
                : "In this format, persuasion is rewarded above truth."}
            </p>
          </div>
          <p>
            {es
              ? "La apelación emocional, la presión discursiva, la actuación convincente y la capacidad de cierre hacen parte legítima del juego. La meta no es «tener razón», sino imponerse en el combate argumentativo."
              : "Emotional appeal, discursive pressure, convincing acting and closing ability are legitimate parts of the game. The goal is not to 'be right', but to dominate the argumentative combat."}
          </p>
        </div>
      </section>

      {/* ─── 3. ROLES ─── */}
      <section className="rl-section">
        <div className="rl-section-inner">
          <div className="rl-section-number">03</div>
          <div className="rl-section-icon"><BsPeople /></div>
          <h2>{es ? "Roles del debate" : "Debate Roles"}</h2>
          <div className="rl-roles-grid">
            <RoleCard
              icon={BsShield}
              title={es ? "Moderadores" : "Moderators"}
              description={es ? "Autoridad práctica del debate." : "Practical debate authority."}
              items={es
                ? ["Abrir y cerrar rondas", "Administrar el tiempo", "Exigir preguntas cerradas", "Registrar puntos", "Decidir evasiones", "Declarar ganadores"]
                : ["Open and close rounds", "Manage time", "Demand closed questions", "Record points", "Decide evasions", "Declare winners"]
              }
            />
            <RoleCard
              icon={BsMegaphone}
              title={es ? "Participantes" : "Participants"}
              description={es ? "Debatientes activos." : "Active debaters."}
              items={es
                ? ["Mantener su postura", "Responder la cuestión", "Respetar el tiempo", "Aceptar moderación", "Evitar evasiones"]
                : ["Maintain stance", "Answer the question", "Respect time", "Accept moderation", "Avoid evasions"]
              }
            />
            <RoleCard
              icon={BsEye}
              title={es ? "Espectadores" : "Spectators"}
              description={es
                ? "Observan, evalúan, califican performance. No intervienen sin autorización."
                : "Observe, evaluate, rate performance. Cannot intervene without authorization."}
            />
            <RoleCard
              icon={BsCpu}
              title="Daemon"
              description={es
                ? "Voz del sabio. Resuelve dudas sobre falacias y estructura. No toma partido."
                : "The wise voice. Resolves doubts about fallacies and structure. Doesn't take sides."}
            />
          </div>
        </div>
      </section>

      {/* ─── 4. ESTRUCTURA ─── */}
      <section className="rl-section rl-section-alt">
        <div className="rl-section-inner">
          <div className="rl-section-number">04</div>
          <div className="rl-section-icon"><BsClockHistory /></div>
          <h2>{es ? "Estructura del debate" : "Debate Structure"}</h2>
          <div className="rl-timeline">
            <div className="rl-timeline-item">
              <div className="rl-timeline-dot"><BsArrowRepeat /></div>
              <div className="rl-timeline-content">
                <h4>{es ? "Rondas" : "Rounds"}</h4>
                <div className="rl-formula">
                  <strong>5 min</strong> {es ? "si" : "if"} n ≤ 6 &nbsp;|&nbsp; <strong>2.5 min</strong> {es ? "si" : "if"} n &gt; 6
                </div>
                <span className="rl-formula-note">T<sub>r</sub> = n · t</span>
              </div>
            </div>
            <div className="rl-timeline-item">
              <div className="rl-timeline-dot"><BsQuestionCircle /></div>
              <div className="rl-timeline-content">
                <h4>{es ? "Preguntas clave" : "Key Questions"}</h4>
                <p>{es ? "Cerradas: obligan a definición concreta. Detectan evasión y facilitan puntuación." : "Closed: force concrete definition. Detect evasion and facilitate scoring."}</p>
              </div>
            </div>
            <div className="rl-timeline-item">
              <div className="rl-timeline-dot"><BsChatQuote /></div>
              <div className="rl-timeline-content">
                <h4>{es ? "Gabela de cierre" : "Closing Extension"}</h4>
                <p>{es ? "Ronda extra para cerrar puntos abiertos. No para temas nuevos." : "Extra round to close open points. Not for new topics."}</p>
              </div>
            </div>
            <div className="rl-timeline-item">
              <div className="rl-timeline-dot"><BsExclamationTriangle /></div>
              <div className="rl-timeline-content">
                <h4>{es ? "Preguntas finales" : "Final Questions"}</h4>
                <p>{es ? "Fase abierta de examen administrada por moderadores." : "Open examination phase managed by moderators."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. CONDUCTA ─── */}
      <section className="rl-section">
        <div className="rl-section-inner">
          <div className="rl-section-number">05</div>
          <div className="rl-section-icon"><BsExclamationTriangle /></div>
          <h2>{es ? "Conducta argumentativa" : "Argumentative Conduct"}</h2>
          <div className="rl-conduct-grid">
            <div className="rl-conduct-card rl-conduct-danger">
              <BsXOctagon className="rl-conduct-icon" />
              <h4>{es ? "No saltar de postura" : "No stance switching"}</h4>
              <p>{es ? "Puede matizar o profundizar, pero no abandonar su tesis ni invertirla para escapar." : "Can nuance or deepen, but cannot abandon or reverse thesis to escape."}</p>
            </div>
            <div className="rl-conduct-card rl-conduct-danger">
              <BsHandThumbsDown className="rl-conduct-icon" />
              <h4>{es ? "Quien no responde, pierde" : "Not answering = losing"}</h4>
              <ul>
                <li>{es ? "Evade la pregunta" : "Evades the question"}</li>
                <li>{es ? "Cambia de tema" : "Changes topic"}</li>
                <li>{es ? "Diluye en exposición irrelevante" : "Dilutes into irrelevant exposition"}</li>
                <li>{es ? "Se rehúsa a posicionarse" : "Refuses to take position"}</li>
              </ul>
            </div>
            <div className="rl-conduct-card rl-conduct-warn">
              <BsPeople className="rl-conduct-icon" />
              <h4>{es ? "Público" : "Public"}</h4>
              <p>{es ? "Solo intervienen si el participante permite o los moderadores habilitan. Consumen tiempo." : "Only intervene if participant allows or moderators enable. Consumes time."}</p>
            </div>
            <div className="rl-conduct-card rl-conduct-warn">
              <BsPersonX className="rl-conduct-icon" />
              <h4>{es ? "Aporte externo" : "External input"}</h4>
              <p>{es ? "Toda intervención no solicitada penaliza al equipo que la recibe." : "Any unsolicited intervention penalizes the receiving team."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. ESTILO ─── */}
      <section className="rl-section rl-section-alt">
        <div className="rl-section-inner rl-center">
          <div className="rl-section-number">06</div>
          <div className="rl-section-icon"><BsLightning /></div>
          <h2>{es ? "Estilo admitido" : "Accepted Style"}</h2>
          <div className="rl-style-pills">
            <span className="rl-pill"><BsFire /> {es ? "Cizañosa" : "Provocative"}</span>
            <span className="rl-pill"><BsLightning /> {es ? "Confrontativa" : "Confrontational"}</span>
            <span className="rl-pill"><BsMegaphone /> {es ? "Emocionalmente intensa" : "Emotionally intense"}</span>
            <span className="rl-pill"><BsStar /> {es ? "Escénicamente trabajada" : "Scenically crafted"}</span>
          </div>
          <p className="rl-warning-text">
            {es
              ? "Lo único inadmisible: que esa intensidad destruya el orden del debate."
              : "The only thing not allowed: intensity destroying debate order."}
          </p>
        </div>
      </section>

      {/* ─── 7-9. SISTEMA DE PUNTOS ─── */}
      <section className="rl-section rl-section-points">
        <div className="rl-section-inner">
          <div className="rl-section-number">07</div>
          <div className="rl-section-icon"><BsBarChart /></div>
          <h2>{es ? "Sistema de puntos" : "Point System"}</h2>
          <p className="rl-lead rl-center">
            {es
              ? "Sistema simple de subida y bajada. Cada participante inicia en cero."
              : "Simple increase/decrease system. Each participant starts at zero."}
          </p>
          <div className="rl-formula-hero">
            P<sub>f</sub> = P<sub>g</sub> − P<sub>p</sub>
          </div>

          <div className="rl-points-columns">
            <div className="rl-points-col rl-gains">
              <h3><BsHandThumbsUp /> {es ? "Ganancias" : "Gains"}</h3>
              <div className="rl-points-list">
                <PointBadge value={2} label={es ? "Falacia efectiva" : "Effective fallacy"} />
                <PointBadge value={1} label={es ? "Defensa de falacia" : "Fallacy defense"} />
                <PointBadge value={1} label="Performance" />
                <PointBadge value={1} label={es ? "Convencimiento" : "Persuasion"} />
              </div>
              <div className="rl-points-details">
                <p><strong>+2</strong> {es ? "Falacia introducida efectivamente y reconocida por moderadores." : "Effectively introduced fallacy recognized by moderators."}</p>
                <p><strong>+1</strong> {es ? "Defensa o neutralización satisfactoria de una falacia." : "Satisfactory defense or neutralization of a fallacy."}</p>
                <p><strong>+1</strong> {es ? "Encarnar postura, sostener tensión, dominar tono." : "Embody stance, sustain tension, dominate tone."}</p>
                <p><strong>+1</strong> {es ? "Dominio claro del intercambio, impone marco." : "Clear exchange domination, imposes framework."}</p>
              </div>
            </div>

            <div className="rl-points-divider" />

            <div className="rl-points-col rl-penalties">
              <h3><BsHandThumbsDown /> {es ? "Penalizaciones" : "Penalties"}</h3>
              <div className="rl-points-list">
                <PointBadge value={-3} label={es ? "No responder" : "Not answering"} />
                <PointBadge value={-3} label={es ? "Saltar postura" : "Switch stance"} />
                <PointBadge value={-1} label={es ? "Aporte externo" : "External input"} />
                <PointBadge value={-1} label={es ? "Interrupción" : "Interruption"} />
              </div>
              <div className="rl-points-details">
                <p><strong>−3</strong> {es ? "No responder la cuestión planteada." : "Not answering the posed question."}</p>
                <p><strong>−3</strong> {es ? "Cambiar de postura o abandonar tesis." : "Switching stance or abandoning thesis."}</p>
                <p><strong>−1</strong> {es ? "Intervención externa no solicitada." : "Unsolicited external intervention."}</p>
                <p><strong>−1</strong> {es ? "Interrupción arbitraria o sabotaje." : "Arbitrary interruption or sabotage."}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 10. PERFORMANCE ─── */}
      <section className="rl-section">
        <div className="rl-section-inner rl-center">
          <div className="rl-section-number">10</div>
          <div className="rl-section-icon"><BsStar /></div>
          <h2>{es ? "Performance" : "Performance"}</h2>
          <p className="rl-lead">{es ? "Calificada por moderadores y público" : "Rated by moderators and public"}</p>
          <div className="rl-perf-grid">
            <div className="rl-perf-item"><BsLightning /><span>{es ? "Fuerza escénica" : "Stage force"}</span></div>
            <div className="rl-perf-item"><BsVolumeUp /><span>{es ? "Control del tono" : "Tone control"}</span></div>
            <div className="rl-perf-item"><BsStar /><span>{es ? "Presencia" : "Presence"}</span></div>
            <div className="rl-perf-item"><BsExclamationTriangle /><span>{es ? "Intimidación" : "Intimidation"}</span></div>
            <div className="rl-perf-item"><BsShield /><span>{es ? "Coherencia" : "Coherence"}</span></div>
            <div className="rl-perf-item"><BsMegaphone /><span>{es ? "Puesta en escena" : "Staging"}</span></div>
          </div>
        </div>
      </section>

      {/* ─── 11-15. GANADORES & EXTRAS ─── */}
      <section className="rl-section rl-section-alt">
        <div className="rl-section-inner">
          <div className="rl-section-number">11</div>
          <div className="rl-section-icon"><BsAward /></div>
          <h2>{es ? "Ganadores y reglas especiales" : "Winners & Special Rules"}</h2>

          <div className="rl-winners-grid">
            <div className="rl-winner-card">
              <BsTrophy className="rl-winner-icon" />
              <h4>{es ? "Individual" : "Individual"}</h4>
              <div className="rl-formula">{es ? "Ganador" : "Winner"} = max(P<sub>f</sub>)</div>
              <p>{es ? "Mayor puntaje final gana." : "Highest final score wins."}</p>
            </div>
            <div className="rl-winner-card">
              <BsPeopleFill className="rl-winner-icon" />
              <h4>{es ? "Equipo" : "Team"}</h4>
              <div className="rl-formula">P<sub>e</sub> = ΣP<sub>f</sub> / n</div>
              <p>{es ? "Promedio de puntajes individuales." : "Average of individual scores."}</p>
            </div>
            <div className="rl-winner-card rl-card-warn">
              <BsGraphUp className="rl-winner-icon" />
              <h4>{es ? "Goleada" : "Blowout"}</h4>
              <div className="rl-formula">P<sub>L</sub> ≤ P<sub>W</sub> / 10</div>
              <p>{es ? "Proporción 1:10 entre perdedor y ganador." : "1:10 ratio between loser and winner."}</p>
            </div>
            <div className="rl-winner-card rl-card-danger">
              <BsBan className="rl-winner-icon" />
              <h4>{es ? "Baneo" : "Ban"}</h4>
              <p>{es ? "3+ goleadas = baneado 1 semestre." : "3+ blowouts = banned 1 semester."}</p>
            </div>
            <div className="rl-winner-card">
              <BsSliders className="rl-winner-icon" />
              <h4>{es ? "Balance" : "Balance"}</h4>
              <p>{es ? "La organización ajusta si hay desigualdad extrema." : "Organization adjusts for extreme inequality."}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 16. PLATAFORMA ─── */}
      <section className="rl-section">
        <div className="rl-section-inner rl-center">
          <div className="rl-section-number">16</div>
          <div className="rl-section-icon"><BsGear /></div>
          <h2>{es ? "Función de la plataforma" : "Platform Function"}</h2>
          <div className="rl-checklist">
            <div className="rl-check-item"><BsBarChart /><span>{es ? "Registrar puntajes por participante" : "Record scores per participant"}</span></div>
            <div className="rl-check-item"><BsCalculator /><span>{es ? "Sumar o restar puntos" : "Add or subtract points"}</span></div>
            <div className="rl-check-item"><BsEye /><span>{es ? "Puntaje en tiempo real" : "Real-time score"}</span></div>
            <div className="rl-check-item"><BsPeopleFill /><span>{es ? "Promedio por equipo" : "Team average"}</span></div>
            <div className="rl-check-item"><BsGraphUp /><span>{es ? "Verificar goleada" : "Verify blowout"}</span></div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <section className="rl-section rl-closing">
        <div className="rl-section-inner rl-center">
          <BsFire className="rl-closing-icon" />
          <p className="rl-closing-text">
            {es
              ? "Cafetería del Caos no es un espacio para probar serenamente quién posee la verdad, sino para medir quién domina mejor la escena, sostiene mejor su postura, resiste mejor la presión, golpea mejor con el lenguaje y convence con más fuerza."
              : "Cafetería del Caos is not a space to serenely prove who holds the truth, but to measure who best dominates the scene, sustains their stance, resists pressure, strikes with language and convinces with force."}
          </p>
          <div className="rl-closing-quote">
            {es
              ? "Aquí la retórica no adorna el debate: lo decide."
              : "Here, rhetoric doesn't adorn the debate: it decides it."}
          </div>
        </div>
      </section>
    </div>
  )
}
