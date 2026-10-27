# Endringslogg (Changelog)

Alle vesentlige endringer i Quiz Kraft dokumenteres i denne filen.
Formatet er basert på [Keep a Changelog](https://keepachangelog.com/no/1.0.0/).

## [1.0.0] - 2026-10-27

### Lagt til (feat)
- **Senior- og universelt vennlig grensesnitt:**
  - Lys modus som standard (`#ffffff` med dype sorte skillelinjer og kullsort tekst for maksimal kontrast).
  - Ett-klikks bryter til Mørk modus.
  - Dynamisk skriftstørrelsejustering med `A+` og `A-`-knapper.
  - Fullskjermsvisning tilpasset projektor og storskjermer i arrangementslokaler.
- **Lynrask inntasting og tastaturnavigasjon:**
  - `Enter` og `Pil Ned` flytter fokus automatisk nedover til neste lag i samme runde.
  - Full 2D-piltastnavigasjon mellom runder og lag.
  - Sømløs desimalhåndtering (godtar både komma `8,5` og punktum `8.5`).
  - Sanntidsoppdatering av sammenlagt totalpoengsum for hvert lag.
- **Tie-Breaker sortering:**
  - Automatisk sortering etter høyeste poengsum.
  - Flertrinns tie-breaker: Sammenligner siste spilte runde, deretter forrige runde bakover ved poenglikhet.
  - Visuell merknad på raden med begrunnelse (f.eks. *"Foran på runde 4 (8,5 mot 7,0)"* eller *"Delt 1. plass"*).
  - Pallemarkering (🥇 gull, 🥈 sølv, 🥉 bronse) for topp 3.
- **Lagring og flytting mellom enheter:**
  - Kontinuerlig automatisk lagring i `localStorage` med synlig grønn statusindikator.
  - *"Lagre quizen på PC-en"* med eksport til formatert `.json`-fil for å jobbe videre hjemme.
  - *"Åpne lagret quiz"* med trygg gjenoppretting fra `.json`-fil.
  - Flertrinns Angre-knapp (Undo) for å angre uheldige slettinger eller endringer.
- **Offline Excel- og PDF-eksport:**
  - Ekte `.xlsx`-eksport via lokalt pakket SheetJS (`vendor/xlsx.full.min.js`), 100 % frakoblet uten internett.
  - Spesialtilpasset A4-utskrift og PDF-generering (`css/print.css`) som fjerner knapper og lager en ren tabell.
- **Dokumentasjon og GitHub-klargjøring:**
  - Komplett `README.md` med norsk veiledning og hurtigtaster.
  - Standard `.gitignore`.
