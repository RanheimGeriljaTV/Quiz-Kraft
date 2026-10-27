# Quiz Kraft – Interaktiv Poengtavle og Regneark

En lynrask, universell og tilgjengelig webapplikasjon for poengføring på quizkvelder for **ranheimkraft.no**. Utviklet for å være **ekstremt enkel å bruke for alle**, enten den kjøres på storskjerm/projektor i arrangementslokalet eller på en bærbar datamaskin hjemme i stua.

Applikasjonen kjører 100 % lokalt i nettleseren uten behov for database, server eller internettilkobling.

---

## 🌐 Live Demonstrasjon & Integrasjon
* **Offisiell Live Web-app:** [https://ranheimgeriljatv.github.io/Quiz-Kraft/](https://ranheimgeriljatv.github.io/Quiz-Kraft/)
* **Integrasjon på nettsiden ranheimkraft.no:**
  ```html
  <iframe src="https://ranheimgeriljatv.github.io/Quiz-Kraft/" width="100%" height="900" style="border:none;"></iframe>
  ```

---

## ✨ Hovedfunksjoner

### 1. 🎖️ Runde for Runde: Hvem var best i hver runde?
- **Rundevinnere:** Egen visning som kårer vinneren av hver enkelt runde med pokal, vinnende poengsum og rundesnitt!
- **Flest rundeseiere:** Sammenlagtoversikt over hvilke lag som har stukket av med flest rundeseire.
- **Interaktiv Graf i nettleseren:** Innebygd linjediagram som viser lagenes poengutvikling runde for runde.
- **Ekte Excel (.xlsx) med 3 ark:**
  1. *Sammenlagt:* Hele tabellen med plassering, poeng og merknader.
  2. *Rundevinnere:* Tabell over hvem som vant hver runde, snitt og flest seiere.
  3. *Rundeutvikling (Grafdata):* Ferdig oppsatt datatabell klargjort for Excels innebygde linjediagrammer ("Sett inn linjediagram").

### 2. 🖥️ Oppgradert Presentasjonsmodus for Projektor / Storskjerm
- **Rent for publikum:** Når du trykker **"Vis på fullskjerm (Projektor)"**, forsvinner alle knapper, menyer og administrasjonsverktøy. Salen ser kun den lekre, ryddige poengtavlen!
- **Stadion-typografi:** Inndatafeltene gjøres om til ren, skarp tekst uten forstyrrende rammer eller markører.
- **Svevende kontroll-linje:** Quizmaster har en diskret meny i bunnen for raske justeringer som toner bort automatisk når musen står i ro.
- **🎉 Vinner-feiring:** Trykk på *"Sorter etter poeng"* for å kåre vinneren med en herlig konfetti-animasjon!

### 3. 👥 Perfekt Visning for Mange Lag (15–30+ lag)
- **🔲 2-Kolonner Side-om-Side:** Deler tabellen i to parallelle kolonner slik at opptil 25–30 lag får plass på et standard 16:9 widescreen-lerret uten behov for rulling.
- **🏆 Toppliste-filtre:** Velg enkelt mellom *"Alle lag"*, *"Topp 10"* eller *"Topp 5"* for spennende avslutninger.
- **▶️ Rullerende Karusell:** Veksler automatisk mellom sider (f.eks. Side 1: Lag 1–12, Side 2: Lag 13–25) hvert 8. sekund, slik at alle lagene i salen får se plasseringen sin.

### 4. ⏱️ Spenning og Verktøy for Quizmaster
- **🤫 Hemmelig finale (Cliffhanger-modus):** Slå på *"Skjul siste runde"* for å maskere poengene i finalerunden med `❓` på storskjermen – slik at ingen vet hvem som vant før quizmaster utroper det!
- **⏱️ Quiz-Timer:** Stor digital stoppeklokke for nedtelling (1 min, 3 min, 5 min, 10 min) med et behagelig digitalt lydsignal når tiden er ute.

### 5. ⚡ Lynrask Poengføring
- **Smart tastaturnavigasjon:** Trykk `Enter` eller `Pil Ned` i en poengrute for å hoppe rett ned til neste lag i samme runde.
- **Støtte for halvpoeng:** Både `8,5` og `8.5` aksepteres og formateres automatisk med norsk komma.
- **Sanntidssummering:** Sammenlagt-kolonnen helt til høyre regnes ut umiddelbart ved hvert tastetrykk.
- **Angre-knapp (Undo):** Trykket du feil? Trykk *"Angre siste endring"* for å gå tilbake.

### 6. 🏆 Sortering med Tie-Breaker
Når du trykker på **"Sorter etter poeng (Finn vinner)"**:
1. Lagene sorteres etter høyeste sammenlagtsum.
2. **Tie-breaker ved lik poengsum:** Laget med flest poeng i den siste spilte runden kommer foran.
3. **Sekundær tie-breaker:** Hvis de også har likt i siste runde, sjekkes runden foran der igjen bakover.
4. **Tydelig forklaring:** Ved poenglikhet vises en forklarende tekst på raden (f.eks. *"Foran på runde 4 (8,5 mot 7,0)"* eller *"Delt 1. plass"*).

### 7. 💾 Lagring og Flytting mellom PC-er
- **Automatisk lagring:** Alt lagres i nettleserens minne (`localStorage`) ved hvert tastetrykk.
- **Jobbe videre hjemme:**
  - Trykk **"Lagre quizen på PC-en"** for å laste ned en fil (`Quiz_Ranheim_DATO.json`).
  - Ta med filen på minnepenn eller e-post, åpne siden hjemme og trykk **"Åpne lagret quiz"**.
- **100 % Frakoblet Excel (.xlsx):** Genererer arbeidsbøker helt uten internettforbindelse.
- **Utskrift på papir / PDF:** Skriver ut en ren og pen A4-poengtavle uten knapper.

---

## ⌨️ Hurtigtaster
- `Enter` eller `Pil Ned`: Hopper til neste lag nedover i samme runde.
- `Pil Opp`: Hopper til forrige lag i samme runde.
- `Pil Høyre` / `Tab`: Hopper til neste runde.
- `Pil Venstre` / `Shift+Tab`: Hopper til forrige runde eller lagnavn.
- `Esc`: Avslutter fullskjermvisning.

---

## 📁 Prosjektstruktur

```
Quiz Kraft/
├── index.html              # Hovedside og semantisk struktur
├── css/
│   ├── style.css           # Styling, presentasjonsmodus, grafer, lys/mørk modus og A+/A-
│   └── print.css           # Utskriftstilpasset styling for A4-ark
├── js/
│   ├── app.js              # Initialisering, hendelseshåndtering og timer
│   ├── spreadsheet.js      # Tabellrender, 2-kolonner, filtre og karusell
│   ├── scoring.js          # Desimaltolking, sanntidssummer og tie-breaker
│   ├── round-analysis.js   # Analyse av rundevinnere og interaktiv graf (Canvas)
│   ├── storage.js          # localStorage, fil-import/eksport og angrefunksjon
│   ├── excel-export.js     # Generering av .xlsx-arbeidsbok med 3 ark
│   └── confetti.js         # Lettvekts vinnerkonfetti-animasjon
├── vendor/
│   └── xlsx.full.min.js    # SheetJS for 100 % offline Excel-eksport
├── .gitignore              # Git ignore-regler
├── CHANGELOG.md            # Versjonslogg
└── README.md               # Denne dokumentasjonen
```

---

## 📄 Lisens
Utviklet for **Ranheim Kraft**.
