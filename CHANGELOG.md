# Endringslogg (Changelog)

Alle vesentlige endringer i Quiz Kraft dokumenteres i denne filen.
Formatet er basert på [Keep a Changelog](https://keepachangelog.com/no/1.0.0/).

## [1.2.0] - 2026-10-27

### Lagt til (feat)
- **Runde-analyse og "Best i hver runde" (Rundevinnere):**
  - Dedikert knapp *"📈 Rundeanalyse & Grafer"* både i verktøylinje og projektormeny.
  - Kortvisning for hver enkelt runde som viser rundens vinner(e), beste score, snitt og laveste score.
  - Egen ledertavle for lagene med flest rundeseiere ("Mestvinnende lag").
- **Interaktive grafer (HTML5 Canvas):**
  - Innebygd linjediagram over poengutviklingen for alle lag runde for runde.
  - Mulighet til å veksle mellom akkumulert sammenlagtutvikling og poeng per runde.
  - 100 % frakoblet (offline) uten eksterne diagrambiblioteker.
- **Utvidet Excel-eksport med flere ark (.xlsx):**
  - **Ark 1 (Sammenlagt):** Komplett resultatliste med plassering, poeng og merknader.
  - **Ark 2 (Rundevinnere):** Tabell over hvem som vant hver runde, snittscore, og oversikt over flest rundeseiere.
  - **Ark 3 (Rundeutvikling & Grafdata):** Ferdig formatert datamatrise klargjort for Excels innebygde linjediagrammer ("Sett inn linjediagram").

---

## [1.1.0] - 2026-10-27

### Lagt til (feat)
- **Oppgradert Presentasjonsmodus for Projektor:**
  - Skjuler alle knapper og menyer automatisk ved fullskjerm.
  - Stadion-typografi uten formrammer.
  - Diskret svevende kontroll-linje med autofade.
- **Optimalisert for 15–30+ lag:**
  - 2-kolonner side-om-side layout for 16:9 widescreen.
  - Topp 5, Topp 10, Topp 15 visningsfiltre.
  - Automatisk rullerende karusell.
- **Ekstra arrangementsverktøy:**
  - Quiz-Timer med digital nedtelling og Web Audio API-chime.
  - Hemmelig finale (Cliffhanger-modus som skjuler siste runde med `❓`).
  - Konfetti-animasjon når vinner kåres.

---

## [1.0.0] - 2026-10-27

### Lagt til (feat)
- Universelt regneark med lys modus standard og mørk modus toggle.
- Enter / Pil Ned-navigasjon rett nedover for lynrask føring.
- Halvpoeng-støtte (`8,5` og `8.5`).
- Flertrinns tie-breaker sortering.
- Automatisk lagring i `localStorage` og JSON import/eksport.
- 100 % frakoblet SheetJS Excel-eksport og utskriftsstil (A4).
