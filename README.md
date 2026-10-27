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

### 1. ⚡ Lynraskt Oppsett & Poengføring
- **Direkte valg av antall lag og runder:** Skriv inn ønsket antall (f.eks. `25` lag og `8` runder) direkte i tallfeltene øverst – tabellen tilpasser seg umiddelbart på ett sekund.
- **Lagbank & Frammøte:** Har dere 21 lag den ene gangen og 18 neste gang? Hvert lag har en egen avkrysningsboks for oppmøte. Uaktive lag bevares trygt i banken, dimmes ned og **skjules automatisk fra storskjermen på projektor**.
- **Valgfri fargeutheving (🎨 Utheving):** Egen knapp for å slå av eller på fargekoding av rundevinnere og manglende poeng.
- **Alfabetisk sortering (A–Å):** Trykk *"🔤 Sorter etter navn (A-Å)"* for å sortere aktive lag alfabetisk ved oppsett eller oppmøte.
- **Tøm poeng (🧹):** Nullstill alle poeng raskt og trygt for neste runde eller ny omgang – lagnavn og oppmøte bevares.
- **Smart tastaturnavigasjon:** Trykk `Enter` eller `Pil Ned` i en poengrute for å hoppe rett ned til neste lag i samme runde.
- **Støtte for halvpoeng:** Både `8,5` og `8.5` aksepteres og formateres automatisk med norsk komma.
- **Graderte farger på sammenlagtsum:** Varm og behagelig champagnegull-gradient nedover SUM-kolonnen som gir umiddelbar oversikt uten å gå på bekostning av lesbarhet.
- **Angre-knapp (Undo):** Trykket du feil eller slettet et lag? Trykk *"Angre"* for å gå trygt tilbake.

### 2. 🖥️ Ren og Maksimert Fullskjerm (Projektor / Storskjerm)
- **Regnearket maksimeres til 100 %:** I fullskjermvisning fjernes alle bunnlinjer, svevemenyer og fotnoter. Tabellen utnytter hele skjermhøyden og bredden på lerretet.
- **Balansert tabelloppsett:** Ryddig og velproporsjonert visning der alle lag og runder vises stabilt på lerretet uten forskyvninger.
- **🏆 Finn vinner i fullskjerm:** Avslører siste runde automatisk dersom hemmelig finale (cliffhanger) var aktivert, sorterer poengene med tie-breaker og kårer vinneren direkte på storskjermen.
- **Tekststørrelse på storskjerm:** Egne `A+` og `A-`-knapper i toppen av fullskjermen gjør det lett å tilpasse skriften til lerretet i lokalet.
- **Minimalistisk styring:** Topplinjen har enkle snarveier for 2 kolonner (manuell styring), Topp 10, hemmelig finale og lukkeknapp (`✕ Lukk (Esc)`). Inaktive lag skjules helt.

### 3. 👥 Perfekt Visning for Mange Lag (15–30+ lag)
- **🔲 2-Kolonner Side-om-Side:** Deler tabellen i to parallelle lister med et enkelt klikk slik at opptil 25–30 lag får plass på et standard 16:9-lerret uten behov for rulling.
- **🏆 Toppliste-filtre:** Velg enkelt mellom *"Alle lag"*, *"Topp 10"* eller *"Topp 5"* for spennende avslutninger.
- **▶️ Rullerende Karusell:** Veksler automatisk mellom sider (f.eks. Side 1: Lag 1–12, Side 2: Lag 13–25) hvert 8. sekund, slik at alle bordene i salen får se plasseringen sin.

### 4. 📊 Komplett Excel-arbeidsbok (.xlsx) med egne ark per runde
- **Ark "Sammenlagt":** Fullstendig poengtavle med alle runder, sammenlagtsummer, pallfarger og rundevinnere.
- **Egne ark for hver runde ("Runde 1", "Runde 2", osv.):** Samtlige deltakende lag listes sortert fra høyeste til laveste poengsum for akkurat den runden, med differanse til vinneren og egen statistikkboks (høyeste score, snitt, laveste, antall lag).
- **Ark "Akkumulert stilling":** Løpende sammenlagt poengsum etter hver runde (etter R1, R2, R3 osv.).
- **Ark "Mestvinnende":** Ledertavle over flest rundeseiere og nøkkeltall per runde.
- **Synlige arkfaner i Excel:** Sikret med eksplisitt fanelinje-visning slik at alle arkene er umiddelbart tilgjengelige i Microsoft Excel.
- **100 % Frakoblet via ExcelJS:** Faste kantlinjer, fet skrift og profesjonell formatering uten behov for internett.

### 5. ⏱️ Ekstra Verktøy for Quizmaster
- **🤫 Hemmelig finale (Cliffhanger-modus):** Slå på *"Skjul siste runde"* for å maskere poengene i finalerunden med `❓` på storskjermen – slik at spenningen holdes helt til slutten.
- **⏱️ Quiz-Timer:** Digital stoppeklokke for nedtelling (1 min, 3 min, 5 min, 10 min) med et behagelig digitalt lydsignal når tiden er ute.

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
- **100 % Frakoblet Excel (.xlsx):** Genererer arbeidsbøker helt uten internettforbindelse via SheetJS.
- **Utskrift på papir / PDF:** Skriver ut en ren og pen A4-poengtavle uten knapper.

---

## 🚀 Hvordan bruke applikasjonen

### Kjøre lokalt på PC (uten internett)
1. Last ned prosjektmappen til PC-en.
2. Dobbeltklikk på filen `index.html`.
3. Siden åpner seg umiddelbart i nettleseren og fungerer helt uten internettforbindelse.

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
│   └── excel-export.js     # Generering av formatert .xlsx med kantlinjer og farger
├── vendor/
│   └── exceljs.min.js      # ExcelJS for 100 % offline formatert Excel-eksport
├── .gitignore              # Git ignore-regler
├── CHANGELOG.md            # Versjonslogg
└── README.md               # Denne dokumentasjonen
```

---

## 📄 Lisens
Utviklet for **Ranheim Kraft**.
