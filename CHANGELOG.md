# Endringslogg (Changelog)

Alle vesentlige endringer i Quiz Kraft dokumenteres i denne filen.
Formatet er basert på [Keep a Changelog](https://keepachangelog.com/no/1.0.0/).

## [1.8.0] - 2026-10-27

### Lagt til (feat)
- **Rød markering for dårligste/laveste poengsum per runde:**
  - **I Excel-arket:**
    - På arket **«Sammenlagt»** markeres lagene med rundens laveste poengsum med myk lyserød bakgrunn (`#FEE2E2`) og mørkerød tekst (`#991B1B`), i samspill med den grønne rundevinnerfargen.
    - Egen oppsummeringsrad for *«Laveste score»* er lagt til under snittet på sammenlagtarket.
    - På samtlige dedikerte **rundeark («Runde 1», «Runde 2» osv.)** fremheves laget med laveste poengsum med lyserød bakgrunnsfarge og statusen *«🔻 Laveste score»*, samt rød markering i statistikkboksen.
  - **I web-poengtavlen (både normal og fullskjerm):**
    - Cellen til laget med dårligst/lavest score i runden markeres med behagelig lyserød bakgrunn og mørkerød skrift. Markeringen styres av `🎨 Utheving: PÅ / AV`.

### Forbedret (enhancement)
- **Roligere og mer kompakt skrift i «Runde-analyse & grafer»:**
  - Fontstørrelsen i analysevinduet er redusert til et standard, ryddig nivå (13–14px) og **frikoblet fra storskjermens A+ / A- forstørrelsesknapper**.
  - Selv om skriften forstørres kraftig for publikum på lerretet, forblir analysevinduet, kortene og tabellene i normal, oversiktlig størrelse.
- **Cache-busting v1.8.0:**
  - Oppdatert versjonsstempel `?v=1.8.0` på alle stilark og skript.

---

## [1.7.0] - 2026-10-27

### Lagt til (feat)
- **Dedikerte Excel-ark for hver eneste runde ("Runde 1", "Runde 2", osv.):**
  - Excel-arbeidsboken genererer nå et eget separat fane-ark for samtlige spilte runder (`Runde 1`, `Runde 2`, `Runde 3`, osv.).
  - I hvert runde-ark listes **alle deltakende lag sortert fra høyest til lavest poengsum** for akkurat den runden.
  - Viser lagets rundepoeng, poengdifferanse til rundevinneren og vinnerstatus (🏆 Rundevinner fremhevet i grønt).
  - Inneholder egen statistikkboks nederst per runde med Høyeste poengsum, Gjennomsnittsscore, Laveste poengsum og Antall lag.
  - Sørger for synlige ark-faner i Microsoft Excel via eksplisitt `workbook.views = [{ visibility: 'visible' }]`.
- **Cache-busting v1.7.0:**
  - Lagt til versjonsparameter `?v=1.7.0` på alle CSS- og JavaScript-ressurser i `index.html` for å sikre at nettlesere umiddelbart henter nyeste versjon uten å vise gammel hurtigbuffer.

### Forbedret (enhancement)
- **Mer kompakt tabellhøyde i nettleseren:**
  - Redusert vertikal padding i både redigeringsmodus og fullskjermvisning på lerret/projektor, slik at enda flere lag vises i sin helhet uten unødig rulling, samtidig som teksten forblir tydelig og lettlest for seniorer.

---

## [1.6.0] - 2026-10-27

### Lagt til (feat)
- **Av/på-bryter for sanntidsmarkering:** Ny knapp `🎨 Utheving: PÅ / AV` lar quizmaster fritt velge om fargefremheving av rundevinnere og manglende poeng skal vises eller holdes nøytral.
- **Tøm poeng (Clear scores):** Egen `🧹 Tøm poeng`-knapp som nullstiller alle poengsummer med bekreftelse og full angremulighet (Undo), samtidig som lagnavn, antall runder og oppmøte forblir intakt.
- **Sortering etter lagnavn (A–Å):** Ny knapp `🔤 Sorter etter navn (A-Å)` sorterer aktive lag alfabetisk med norsk bokstavrekkefølge.
- **"Finn vinner"-knapp i Fullskjerm/Projektor:** Egen gullknapp `🏆 Finn vinner` i fullskjerm-topplinjen. Hvis siste runde var skjult i hemmelig finale (cliffhanger), avsløres den umiddelbart, poengene sorteres med tie-breaker og gullvinneren løftes til toppen av storskjermen.
- **Graderte farger på sammenlagtsum:** En diskret og stilren champagne-til-grå varme-gradient på SUM-kolonnen som gjør det lekende lett å se poengnivået nedover listen, med 100 % kullsort tekst og maksimal kontrast (WCAG AAA).
- **Komplett Excel-arbeidsbok (.xlsx) med 4 egne ark (faner):**
  - **Ark 1: "Hovedoversikt"**: Fullstendig resultatliste med alle lag, runder, sammenlagtsum, rundevinnere og snitt.
  - **Ark 2: "Runde for runde"**: Alle lags fulle poengsum for hver enkelt runde, sortert per runde slik at man enkelt ser hvem som var best i runde 1, runde 2 osv., samt differanse til leder.
  - **Ark 3: "Akkumulert stilling"**: Løpende sammenlagt poengsum etter hver runde for alle lag.
  - **Ark 4: "Rundestatistikk"**: Ledertavle over flest rundeseiere og nøkkeltall per runde.

### Forbedret (enhancement)
- **Fjernet kongekronen på rundevinnere:** Fjernet krone-ikonet (`👑`) fra poengrutene slik at poengsummen vises rent og profesjonelt.
- **Balansert justering av Merknad-kolonnen:** Merknad beholdes som en standard kolonne både på fullskjerm og i redigering, med en balansert bredde (140px) som gir god plass til lagnavn og runder uten å forskyve tabellen mot høyre.

---

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
