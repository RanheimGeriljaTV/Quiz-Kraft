# Endringslogg (Changelog)

Alle vesentlige endringer i Quiz Kraft dokumenteres i denne filen.
Formatet er basert på [Keep a Changelog](https://keepachangelog.com/no/1.0.0/).

## [1.5.0] - 2026-10-27

### Lagt til (feat)
- **Fargekoding for rundevinnere:**
  - Cellen til laget som oppnår høyest poengsum i hver runde fremheves nå automatisk i behagelig lysegrønt (`#dcfce7`) med mørkegrønn ramme og fet skrift.
  - I fullskjerm/storskjermvisning markeres rundevinnere i tillegg med en staselig krone (`👑`).
- **Fargekoding for manglende poeng i påbegynte runder:**
  - Så snart minst ett lag har fått registrert poeng i en runde, markeres alle lag som ennå mangler poeng i samme runde med myk gul/amber bakgrunn (`#fef3c7`), stiplet ramme og "Mangler"-tekst. Det gjør det superlett for quizmaster å se hvem man venter på.
- **Lagbank & Frammøte-sjekk (Støtte for varierende oppmøte 18–25+ lag):**
  - Hvert lag har nå en egen avkrysningsboks for deltakelse rett foran lagnavnet.
  - Når et lag ikke møter opp, fjerner man bare haken: Laget blir liggende trygt i "lagbanken" uten at navnet slettes, dimmes ned i redigeringsmodus, og **skjules automatisk fra storskjermen på projektor**.
  - Direkte endring i *Antall lag* (f.eks. fra 22 til 18) deaktiverer overskytende lag i stedet for å slette historikken.
- **Tekststørrelse-knapper (A+ / A-) i Fullskjerm/Projektor:**
  - Lagt til egne `A+` og `A-`-knapper i toppen under fullskjermvisning, slik at quizmaster raskt kan finjustere skriftstørrelsen på lerretet uavhengig av avstand og oppløsning.
- **Manuell styring av 2-kolonners visning:**
  - Fjernet automatisk påtvinging av 2 kolonner ved mange lag. Quizmaster velger nå fritt selv når 2 kolonner skal slås på via den tydelige knappen.
- **Komplett formatert Excel-ark med innebygd graf:**
  - Excel-nedlastingen (`.xlsx`) genererer et helhetlig regneark med kantlinjer, marineblå topplinje, grønne rundevinnere, gul sammenlagtsum, rundestatistikk (vinnere, snitt, bunn) og **et innebygd, høyoppløselig linjediagram over poengutviklingen**.

---

## [1.4.0] - 2026-10-27

### Forbedret (enhancement)
- **Stilrent og helhetlig Excel-ark med kantlinjer og fet skrift:**
  - Byttet til ExcelJS for å generere ekte, vakre `.xlsx`-ark med faste kantlinjer, marineblå tittel, uthevede topplag og gul sammenlagt-kolonne.
  - Samlet poeng runde for runde for alle lag og rundestatistikk (vinnere, snitt, bunnscore) i **ett samlet, ryddig ark**.
- **Plassbesparende topplinje:**
  - Fjernet den unødvendige fullbredde-tekstlinjen for automatisk lagring. Lagringsstatusen vises nå som et elegant lite merke (`✅ Lagret`) rett ved datoen i topplinjen.
- **Fjernet konfetti:**
  - Fjernet ressurskrevende konfettianimasjon for lynrask og lettvekts ytelse.
- **Maksimal utnyttelse av fullskjerm:**
  - Fjernet bunnlinjer, svevemenyer og fotnoter i fullskjerm. Tabellen strekkes nå til å fylle 100 % av skjermhøyden på projektor og lerret, med en minimalistisk lukkeknapp (`✕ Lukk`) i toppen.

---

## [1.3.0] - 2026-10-27

### Forbedret (enhancement)
- **Kompakt og balansert design:**
  - Redusert standard skriftstørrelse fra 18px til en behagelig og profesjonell 15px.
  - Skalert ned knapper fra 48px til en moderne, slank 34px høyde med kompakt polstring.
  - Gjort tabellceller, inndatafelt og sammenlagtkolonnen slankere og mer plasseffektive.
- **Direkte inntasting av antall lag og runder:**
  - Lagt til egne tallfelter (`Antall lag: [ 5 ]` og `Antall runder: [ 5 ]`) i verktøylinjen slik at man kan opprette f.eks. 20 lag eller 8 runder på sekunder ved å bare skrive tallet.
- **Slankere kontrollboks i fullskjerm:**
  - Gjort den svevende kontroll-linjen i fullskjerm betydelig mindre, tynnere og mer diskret med kortfattede etiketter.
- **Ren fullskjerm uten forstyrrelser:**
  - Streng fjerning av all bunntekst, eksterne elementer eller Vipps-bokser fra nettsiden når fullskjerm er aktiv.

---

## [1.2.1] - 2026-10-27

### Fikset (fix)
- Rettet en uventet semikolon-syntaksfeil i `spreadsheet.js` og initialiseringsrekkefølge for tekststørrelse-knappene i `app.js` som forhindret tabellen og hendelseslytterne fra å initialiseres i enkelte nettlesere. Tabell og alle knapper laster nå øyeblikkelig og feilfritt.

---

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
