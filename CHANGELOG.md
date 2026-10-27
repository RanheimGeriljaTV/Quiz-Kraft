# Endringslogg (Changelog)

Alle vesentlige endringer i Quiz Kraft dokumenteres i denne filen.
Formatet er basert på [Keep a Changelog](https://keepachangelog.com/no/1.0.0/).

## [1.1.0] - 2026-10-27

### Lagt til (feat)
- **Oppgradert Presentasjonsmodus for Projektor / Storskjerm:**
  - Automatisk fjerning av alle administrative knapper, verktøylinjer og menyer i fullskjerm.
  - Formfelter gjøres om til krystallklar, ren tekst uten input-rammer (stadion-poengtavle).
  - Elegant overskriftsbanner med pokal-animasjon, quiz-tittel og arrangementsdato.
  - Diskret svevende kontroll-linje (`#presentation-floating-bar`) med glassmorphism som fader ut automatisk etter 3,5 sekunders inaktivitet.
- **Optimalisert for store quizzer (opptil 25–30+ lag):**
  - **2-Kolonner Side-om-Side:** Deler tabellen i to parallelle kolonner for å utnytte 16:9 lerret/widescreen uten behov for vertikal rulling.
  - **Toppliste-filtre:** Ett-klikks valg for *"Topp 5"*, *"Topp 10"*, *"Topp 15"* eller *"Alle lag"*.
  - **Rullerende Karusell:** Veksler automatisk mellom sider (f.eks. Lag 1–12, deretter Lag 13–25) hvert 8. sekund slik at alle deltakere i salen ser sitt lag.
- **Ekstra arrangementsfunksjoner:**
  - **⏱️ Quiz-Timer:** Innebygd stor digital nedtellingstimer med forhåndsinnstillinger (1 min, 3 min, 5 min, 10 min) og behagelig digitalt lydsignal via Web Audio API.
  - **🤫 Hemmelig finale (Cliffhanger):** Mulighet til å skjule poengene i siste runde på storskjerm (`❓`) for å bygge opp spenningen før quizmaster utroper vinneren.
  - **🎉 Konfetti-animasjon:** Lettvekts konfetti-dryss feirer vinnerlaget når knappen *"Sorter etter poeng"* trykkes.

---

## [1.0.0] - 2026-10-27

### Lagt til (feat)
- **Universelt grensesnitt og regneark:**
  - Lys modus som standard (`#ffffff` med dype sorte skillelinjer for projektor).
  - Ett-klikks bryter til Mørk modus og A+/A- skriftstørrelseskalering.
  - `Enter` og `Pil Ned` flytter fokus automatisk rett ned til neste lag i samme runde.
  - Halvpoeng-støtte med automatisk kommaformat (`8,5`).
  - Flertrinns tie-breaker sortering med begrunnelse på raden.
  - Kontinuerlig auto-lagring i `localStorage` med statusindikator.
  - JSON lagring og innlasting for å jobbe videre hjemme.
  - 100 % frakoblet Excel (.xlsx)-nedlasting via SheetJS og A4-utskriftsstil.
