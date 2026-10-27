# Quiz Kraft – Interaktiv Poengtavle og Regneark

En lynrask, universell og tilgjengelig webapplikasjon for poengføring på quizkvelder for **ranheimkraft.no**. Utviklet for å være **ekstremt enkel å bruke for alle**, enten den kjøres på storskjerm/projektor i arrangementslokalet eller på en bærbar datamaskin hjemme i stua.

Applikasjonen kjører 100 % lokalt i nettleseren uten behov for database, server eller internettilkobling.

---

## ✨ Hovedfunksjoner

### 1. Universelt & Seniorvennlig Grensesnitt
- **Lys modus som standard:** Hvit bakgrunn (`#ffffff`), dype sorte skillelinjer mellom alle ruter (som et velkjent papirark/regneark) og kullsvarte tall for maksimal lesbarhet på projektor.
- **Mørk modus:** Enkel knapp for å bytte til mørk skjerm ved dempet belysning i lokalet.
- **Forstørr tekst (A+ / A-):** To store knapper øverst for å forstørre eller forminske all tekst i hele tabellen.
- **Store knapper med ren norsk tekst:** Ingen kryptiske ikoner alene. Hver handling er tydelig merket (f.eks. *"Legg til nytt lag"*, *"Sorter etter poeng (Finn vinner)"*).
- **Fullskjermsvisning:** Gjør at quizen fyller hele lerretet eller TV-skjermen med ett klikk.

### 2. Lynrask Poengføring
- **Smart tastaturnavigasjon:** Når du skriver inn poeng og trykker `Enter` eller `Pil Ned`, hopper markøren automatisk rett ned til neste lag i samme runde. Dette gjør inntasting av runderesultater lekende lett.
- **Støtte for halvpoeng:** Du kan skrive både `8,5` og `8.5`. Begge tolkes riktig og formateres pent med norsk komma.
- **Sanntidssummering:** Sammenlagt-kolonnen helt til høyre regnes ut umiddelbart ved hvert tastetrykk.
- **Angre-knapp (Undo):** Trykket du feil eller kom borti en knapp? Trykk *"Angre siste endring"* for å gå tilbake.

### 3. Sortering med Tie-Breaker
Når du trykker på **"Sorter etter poeng (Finn vinner)"**:
1. Lagene sorteres etter høyeste totalpoengsum (1. plass, 2. plass, 3. plass).
2. **Tie-breaker ved lik poengsum:** Laget med flest poeng i den siste spilte runden kommer foran.
3. **Sekundær tie-breaker:** Hvis de også har likt i siste runde, sjekkes runden foran der igjen (bakover runde for runde).
4. **Tydelig forklaring:** Ved poenglikhet vises en forklarende tekst på raden (f.eks. *"Foran på runde 4 (8,5 mot 7,0)"* eller *"Delt 1. plass"*).

### 4. Lagring og Flytting mellom PC-er
- **Automatisk lagring:** Hvert eneste tastetrykk lagres automatisk på datamaskinen (`localStorage`). En grønn statuslinje bekrefter at alt er trygt lagret.
- **Jobbe videre hjemme:**
  - Trykk **"Lagre quizen på PC-en"** for å laste ned en fil (`Quiz_Ranheim_DATO.json`).
  - Send filen til deg selv på e-post eller ta den med på en minnepenn.
  - Åpne siden på din egen PC hjemme og trykk **"Åpne lagret quiz"** – hele tabellen fylles ut akkurat slik du forlot den.
- **Ekte Excel (.xlsx):** Laster ned et fullverdig regneark med alle lag, runder, formatering og summer. Fungerer 100 % offline takket være lokalt pakket SheetJS.
- **Utskrift på papir / PDF:** Skriver ut en ren og pen A4-poengtavle uten knapper og menyer.

---

## 🚀 Hvordan bruke applikasjonen

### Kjøre lokalt på PC (uten internett)
1. Last ned prosjektmappen til PC-en.
2. Dobbeltklikk på filen `index.html`.
3. Siden åpner seg umiddelbart i standard nettleser (Chrome, Edge, Firefox, Safari) og fungerer helt uten internettforbindelse.

### Bruke på nettsiden ranheimkraft.no
Siden er publisert på GitHub Pages og kan enten integreres direkte, eller lastes opp på egen webserver:

1. **Direkte via iframe (anbefalt og enklest):**
   ```html
   <iframe src="https://ranheimgeriljatv.github.io/Quiz-Kraft/" width="100%" height="900" style="border:none;"></iframe>
   ```
2. **Eller last opp filene på egen server:**
   Last opp filene (`index.html`, `css/`, `js/`, `vendor/`) til ønsket mappe på `ranheimkraft.no` (f.eks. `/quiz/`).

---

## ⌨️ Hurtigtaster
- `Enter` eller `Pil Ned`: Hopper til neste lag nedover i samme runde.
- `Pil Opp`: Hopper til forrige lag i samme runde.
- `Pil Høyre` / `Tab`: Hopper til neste runde.
- `Pil Venstre` / `Shift+Tab`: Hopper til forrige runde eller lagnavn.

---

## 📁 Prosjektstruktur

```
Quiz Kraft/
├── index.html              # Hovedside og semantisk struktur
├── css/
│   ├── style.css           # Styling, lys/mørk modus, farger og A+/A- skalering
│   └── print.css           # Utskriftstilpasset styling for A4-ark
├── js/
│   ├── app.js              # Initialisering, hendelseshåndtering og modus
│   ├── spreadsheet.js      # Tabellrender og tastaturnavigasjon
│   ├── scoring.js          # Desimaltolking, sanntidssummer og tie-breaker
│   ├── storage.js          # localStorage, fil-import/eksport og angrefunksjon
│   └── excel-export.js     # Generering av .xlsx-filer via SheetJS
├── vendor/
│   └── xlsx.full.min.js    # SheetJS for 100 % offline Excel-eksport
├── .gitignore              # Git ignore-regler
├── CHANGELOG.md            # Versjonslogg
└── README.md               # Denne dokumentasjonen
```

---

## 📄 Lisens
Utviklet for **Ranheim Kraft**.
