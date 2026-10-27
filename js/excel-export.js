/**
 * excel-export.js - Generering av et helhetlig, stilrent og profesjonelt Excel-ark (.xlsx)
 * med FLERE ARK (worksheets):
 * 1. "Hovedoversikt": Offisiell poengtavle og resultatliste med alle lag, runder og sammenlagtsum.
 * 2. "Runde for runde": Alle lags fulle poengsum for hver enkelt runde, sortert per runde (hvem var best i runden).
 * 3. "Akkumulert stilling": Sammenlagt poengsum for alle lag etter hver enkelt runde (runde for runde progresjon).
 * 4. "Rundestatistikk": Oversikt over hvem som vant flest runder, snitt og nøkkeltall.
 * 
 * Bruker lokalt pakket ExcelJS (vendor/exceljs.min.js) for 100 % offline drift.
 * For Quiz Kraft (ranheimkraft.no)
 */

async function exportQuizToExcel(state) {
  if (typeof ExcelJS === 'undefined') {
    alert('Feil: ExcelJS-biblioteket (vendor/exceljs.min.js) ble ikke funnet.');
    return;
  }

  if (!state || !Array.isArray(state.teams) || state.teams.length === 0) {
    alert('Ingen quiz-data å eksportere.');
    return;
  }

  const roundCount = state.roundCount || 5;
  const roundNames = state.roundNames || [];
  const allTeams = state.teams || [];
  const activeTeams = allTeams.filter(t => t.active !== false);
  const inactiveTeams = allTeams.filter(t => t.active === false);
  const title = state.title || 'Ranheim Quiz';
  const dateStr = state.date || new Date().toISOString().split('T')[0];

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'Quiz Kraft (ranheimkraft.no)';
  workbook.created = new Date();

  const thinBorder = {
    top: { style: 'thin', color: { argb: 'FF000000' } },
    left: { style: 'thin', color: { argb: 'FF000000' } },
    bottom: { style: 'thin', color: { argb: 'FF000000' } },
    right: { style: 'thin', color: { argb: 'FF000000' } }
  };

  // Beregn rundevinnere for aktive lag
  const roundMaxScores = [];
  for (let r = 0; r < roundCount; r++) {
    let max = -Infinity;
    activeTeams.forEach(t => {
      const val = window.QuizScoring ? window.QuizScoring.parseScore(t.scores ? t.scores[r] : null) : null;
      if (val !== null && val > max) max = val;
    });
    roundMaxScores.push(max > 0 ? max : null);
  }

  const roundWinners = window.QuizRoundAnalysis 
    ? window.QuizRoundAnalysis.getRoundWinners(activeTeams, roundCount, roundNames) 
    : [];

  // =========================================================================
  // ARK 1: HOVEDOVERSIKT (OFFISIELL RESULTATLISTE)
  // =========================================================================
  const sheet1 = workbook.addWorksheet('Hovedoversikt', {
    views: [{ showGridLines: true }]
  });

  const totalCols1 = Math.max(6, 2 + roundCount + 2);

  // Tittelrad
  sheet1.mergeCells(1, 1, 1, totalCols1);
  const t1Cell = sheet1.getCell(1, 1);
  t1Cell.value = `🏆 ${title.toUpperCase()} – OFFISIELL RESULTATLISTE`;
  t1Cell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  t1Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  t1Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet1.getRow(1).height = 34;

  // Metadata
  sheet1.mergeCells(2, 1, 2, totalCols1);
  const m1Cell = sheet1.getCell(2, 1);
  m1Cell.value = `Dato: ${dateStr}  |  ranheimkraft.no  |  ${activeTeams.length} deltakende lag  |  ${roundCount} runder`;
  m1Cell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FFE2E8F0' } };
  m1Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
  m1Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet1.getRow(2).height = 18;

  sheet1.getRow(3).height = 8;

  // Headers
  const h1 = ['Plassering', 'Lagnavn'];
  for (let r = 0; r < roundCount; r++) {
    h1.push(roundNames[r] || `Runde ${r + 1}`);
  }
  h1.push('SAMMENLAGT', 'Merknad / Tie-breaker');

  const h1Row = sheet1.getRow(4);
  h1Row.height = 25;
  h1.forEach((h, colIdx) => {
    const cell = h1Row.getCell(colIdx + 1);
    cell.value = h;
    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF334155' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = thinBorder;
  });

  let rowIdx1 = 5;
  activeTeams.forEach((team, tIdx) => {
    const row = sheet1.getRow(rowIdx1);
    row.height = 22;
    const rank = team.rank || (tIdx + 1);

    let rankText = `${rank}. plass`;
    if (rank === 1) rankText = `🥇 1. plass`;
    else if (rank === 2) rankText = `🥈 2. plass`;
    else if (rank === 3) rankText = `🥉 3. plass`;

    const cellRank = row.getCell(1);
    cellRank.value = rankText;
    cellRank.font = { name: 'Arial', size: 10, bold: rank <= 3 };
    cellRank.alignment = { horizontal: 'center', vertical: 'middle' };
    cellRank.border = thinBorder;

    const cellName = row.getCell(2);
    cellName.value = team.name || `Lag ${tIdx + 1}`;
    cellName.font = { name: 'Arial', size: 10, bold: rank <= 3 };
    cellName.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellName.border = thinBorder;

    for (let r = 0; r < roundCount; r++) {
      const cellScore = row.getCell(3 + r);
      const parsed = window.QuizScoring ? window.QuizScoring.parseScore(team.scores ? team.scores[r] : null) : null;
      const isWinner = roundMaxScores[r] !== null && parsed !== null && parsed === roundMaxScores[r];

      if (parsed !== null) {
        cellScore.value = parsed;
        cellScore.numFmt = '#,##0.0';
      } else {
        cellScore.value = '';
      }

      cellScore.font = { name: 'Arial', size: 10, bold: isWinner, color: isWinner ? { argb: 'FF15803D' } : undefined };
      cellScore.alignment = { horizontal: 'center', vertical: 'middle' };
      cellScore.border = thinBorder;

      if (isWinner) {
        cellScore.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
      }
    }

    const totalColIdx = 3 + roundCount;
    const cellTotal = row.getCell(totalColIdx);
    const total = window.QuizScoring ? window.QuizScoring.calculateTeamTotal(team, roundCount) : 0;
    cellTotal.value = total;
    cellTotal.numFmt = '#,##0.0';
    cellTotal.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF000000' } };
    cellTotal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF08A' } };
    cellTotal.alignment = { horizontal: 'center', vertical: 'middle' };
    cellTotal.border = thinBorder;

    const cellNote = row.getCell(totalColIdx + 1);
    cellNote.value = team.tieBreakerNote || '';
    cellNote.font = { name: 'Arial', size: 9, italic: true };
    cellNote.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellNote.border = thinBorder;

    if (rank === 1) applyPallFill(row, 'FFFEF9C3', roundCount, roundMaxScores, team);
    else if (rank === 2) applyPallFill(row, 'FFF1F5F9', roundCount, roundMaxScores, team);
    else if (rank === 3) applyPallFill(row, 'FFFFEDD5', roundCount, roundMaxScores, team);

    rowIdx1++;
  });

  function applyPallFill(row, colorHex, rCount, maxScores, team) {
    row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHex } };
    row.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHex } };
    for (let r = 0; r < rCount; r++) {
      const parsed = window.QuizScoring ? window.QuizScoring.parseScore(team.scores ? team.scores[r] : null) : null;
      const isWinner = maxScores[r] !== null && parsed !== null && parsed === maxScores[r];
      if (!isWinner) {
        row.getCell(3 + r).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHex } };
      }
    }
    row.getCell(3 + rCount + 1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorHex } };
  }

  // Inaktive lag
  if (inactiveTeams.length > 0) {
    inactiveTeams.forEach((team) => {
      const row = sheet1.getRow(rowIdx1);
      row.height = 20;

      const cellRank = row.getCell(1);
      cellRank.value = '-';
      cellRank.font = { name: 'Arial', size: 9, color: { argb: 'FF94A3B8' } };
      cellRank.alignment = { horizontal: 'center', vertical: 'middle' };
      cellRank.border = thinBorder;

      const cellName = row.getCell(2);
      cellName.value = `${team.name || 'Lag'} (Deltok ikke)`;
      cellName.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF94A3B8' } };
      cellName.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
      cellName.border = thinBorder;

      for (let r = 0; r < roundCount; r++) {
        const cell = row.getCell(3 + r);
        cell.value = '';
        cell.border = thinBorder;
      }

      const cellTotal = row.getCell(3 + roundCount);
      cellTotal.value = '-';
      cellTotal.alignment = { horizontal: 'center', vertical: 'middle' };
      cellTotal.border = thinBorder;

      const cellNote = row.getCell(3 + roundCount + 1);
      cellNote.value = 'Ikke til stede';
      cellNote.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FF94A3B8' } };
      cellNote.border = thinBorder;

      rowIdx1++;
    });
  }

  // Oppsummering under tabell 1
  const winnerRow1 = sheet1.getRow(rowIdx1);
  winnerRow1.height = 22;
  winnerRow1.getCell(1).value = '🏆 Vinner(e)';
  winnerRow1.getCell(1).font = { name: 'Arial', size: 10, bold: true };
  winnerRow1.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
  winnerRow1.getCell(1).border = thinBorder;
  winnerRow1.getCell(2).value = 'Beste lag i runden:';
  winnerRow1.getCell(2).font = { name: 'Arial', size: 9, bold: true };
  winnerRow1.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
  winnerRow1.getCell(2).border = thinBorder;

  for (let r = 0; r < roundCount; r++) {
    const rw = roundWinners[r];
    const cell = winnerRow1.getCell(3 + r);
    cell.value = rw && rw.hasScores ? rw.winners.map(w => w.name).join(', ') : '-';
    cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FF0369A1' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE0F2FE' } };
    cell.border = thinBorder;
  }
  winnerRow1.getCell(3 + roundCount).border = thinBorder;
  winnerRow1.getCell(3 + roundCount + 1).border = thinBorder;
  rowIdx1++;

  const bestRow1 = sheet1.getRow(rowIdx1);
  bestRow1.height = 20;
  bestRow1.getCell(1).value = 'Beste score';
  bestRow1.getCell(1).font = { name: 'Arial', size: 9, bold: true };
  bestRow1.getCell(1).border = thinBorder;
  bestRow1.getCell(2).value = 'Høyeste poengsum:';
  bestRow1.getCell(2).font = { name: 'Arial', size: 9 };
  bestRow1.getCell(2).border = thinBorder;

  for (let r = 0; r < roundCount; r++) {
    const rw = roundWinners[r];
    const cell = bestRow1.getCell(3 + r);
    cell.value = rw && rw.hasScores ? rw.maxScore : '-';
    cell.font = { name: 'Arial', size: 9, bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = thinBorder;
  }
  bestRow1.getCell(3 + roundCount).border = thinBorder;
  bestRow1.getCell(3 + roundCount + 1).border = thinBorder;
  rowIdx1++;

  const avgRow1 = sheet1.getRow(rowIdx1);
  avgRow1.height = 20;
  avgRow1.getCell(1).value = 'Snitt';
  avgRow1.getCell(1).font = { name: 'Arial', size: 9, bold: true };
  avgRow1.getCell(1).border = thinBorder;
  avgRow1.getCell(2).value = 'Gjennomsnitt for runden:';
  avgRow1.getCell(2).font = { name: 'Arial', size: 9 };
  avgRow1.getCell(2).border = thinBorder;

  for (let r = 0; r < roundCount; r++) {
    const rw = roundWinners[r];
    const cell = avgRow1.getCell(3 + r);
    cell.value = rw && rw.hasScores ? rw.avgScore : '-';
    cell.font = { name: 'Arial', size: 9, italic: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = thinBorder;
  }
  avgRow1.getCell(3 + roundCount).border = thinBorder;
  avgRow1.getCell(3 + roundCount + 1).border = thinBorder;

  sheet1.getColumn(1).width = 14;
  sheet1.getColumn(2).width = 28;
  for (let r = 0; r < roundCount; r++) {
    sheet1.getColumn(3 + r).width = 14;
  }
  sheet1.getColumn(3 + roundCount).width = 16;
  sheet1.getColumn(3 + roundCount + 1).width = 26;

  // =========================================================================
  // ARK 2: RUNDE FOR RUNDE (ALLE LAGS FULLE POENGSUM I HVER RUNDE)
  // "alle lags poengsum pr runde, altså hver runde sin fulle poengsum"
  // =========================================================================
  const sheet2 = workbook.addWorksheet('Runde for runde', {
    views: [{ showGridLines: true }]
  });

  // Tittel
  sheet2.mergeCells(1, 1, 1, 5);
  const t2Cell = sheet2.getCell(1, 1);
  t2Cell.value = '🎯 POENGSUM RUNDE FOR RUNDE – ALLE LAG';
  t2Cell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  t2Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF065F46' } }; // Mørk smaragdgrønn
  t2Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet2.getRow(1).height = 32;

  sheet2.mergeCells(2, 1, 2, 5);
  const m2Cell = sheet2.getCell(2, 1);
  m2Cell.value = `Viser den fulle poengsummen til alle lag i hver enkelt runde, sortert fra best til dårligst for runden.`;
  m2Cell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FFE2E8F0' } };
  m2Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF065F46' } };
  m2Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet2.getRow(2).height = 18;

  let rowIdx2 = 4;

  for (let r = 0; r < roundCount; r++) {
    const roundTitle = roundNames[r] || `Runde ${r + 1}`;
    const maxScoreInR = roundMaxScores[r];

    // Sorter aktive lag etter poengsum i akkurat denne runden
    const roundTeams = activeTeams.map(t => {
      const parsed = window.QuizScoring ? window.QuizScoring.parseScore(t.scores ? t.scores[r] : null) : null;
      return {
        name: t.name || 'Lag',
        score: parsed,
        raw: t.scores ? t.scores[r] : ''
      };
    }).sort((a, b) => {
      const valA = a.score !== null ? a.score : -1;
      const valB = b.score !== null ? b.score : -1;
      return valB - valA;
    });

    // Runde-seksjonstittel
    sheet2.mergeCells(rowIdx2, 1, rowIdx2, 5);
    const roundHeaderCell = sheet2.getCell(rowIdx2, 1);
    roundHeaderCell.value = `🎯 ${roundTitle.toUpperCase()}`;
    roundHeaderCell.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' } };
    roundHeaderCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF047857' } };
    roundHeaderCell.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    sheet2.getRow(rowIdx2).height = 24;
    rowIdx2++;

    // Tabelloverskrifter for denne runden
    const roundSubHeaders = ['Plass i runden', 'Lagnavn', `Poengsum i ${roundTitle}`, 'Differanse fra beste', 'Status'];
    const subHRow = sheet2.getRow(rowIdx2);
    subHRow.height = 22;
    roundSubHeaders.forEach((sh, colIdx) => {
      const cell = subHRow.getCell(colIdx + 1);
      cell.value = sh;
      cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F2937' } };
      cell.alignment = { horizontal: colIdx === 1 ? 'left' : 'center', vertical: 'middle' };
      cell.border = thinBorder;
    });
    rowIdx2++;

    // Datarader for denne runden
    roundTeams.forEach((tData, pos) => {
      const row = sheet2.getRow(rowIdx2);
      row.height = 20;

      const isWinner = maxScoreInR !== null && tData.score !== null && tData.score === maxScoreInR;

      const cellPos = row.getCell(1);
      cellPos.value = isWinner ? `🏆 1.` : `${pos + 1}.`;
      cellPos.font = { name: 'Arial', size: 9, bold: isWinner };
      cellPos.alignment = { horizontal: 'center', vertical: 'middle' };
      cellPos.border = thinBorder;

      const cellName = row.getCell(2);
      cellName.value = tData.name;
      cellName.font = { name: 'Arial', size: 9, bold: isWinner };
      cellName.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
      cellName.border = thinBorder;

      const cellScore = row.getCell(3);
      if (tData.score !== null) {
        cellScore.value = tData.score;
        cellScore.numFmt = '#,##0.0';
      } else {
        cellScore.value = '-';
      }
      cellScore.font = { name: 'Arial', size: 10, bold: isWinner, color: isWinner ? { argb: 'FF15803D' } : undefined };
      cellScore.alignment = { horizontal: 'center', vertical: 'middle' };
      cellScore.border = thinBorder;

      const cellDiff = row.getCell(4);
      if (maxScoreInR !== null && tData.score !== null) {
        const diff = tData.score - maxScoreInR;
        cellDiff.value = diff === 0 ? 'Beste score' : `${diff.toFixed(1).replace('.', ',')} p`;
      } else {
        cellDiff.value = '-';
      }
      cellDiff.font = { name: 'Arial', size: 9, italic: true };
      cellDiff.alignment = { horizontal: 'center', vertical: 'middle' };
      cellDiff.border = thinBorder;

      const cellStatus = row.getCell(5);
      cellStatus.value = isWinner ? '🏆 Rundevinner' : '';
      cellStatus.font = { name: 'Arial', size: 9, bold: isWinner, color: { argb: 'FF15803D' } };
      cellStatus.alignment = { horizontal: 'center', vertical: 'middle' };
      cellStatus.border = thinBorder;

      if (isWinner) {
        row.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        row.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        row.getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        row.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
        row.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDCFCE7' } };
      }

      rowIdx2++;
    });

    // Oppsummering for runden
    const rw = roundWinners[r];
    const statRow = sheet2.getRow(rowIdx2);
    statRow.height = 20;
    statRow.getCell(1).value = 'Statistikk:';
    statRow.getCell(1).font = { name: 'Arial', size: 9, bold: true };
    statRow.getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
    statRow.getCell(1).border = thinBorder;

    statRow.getCell(2).value = rw && rw.hasScores ? `Beste: ${rw.maxScore} p (${rw.winners.map(w => w.name).join(', ')})` : 'Ikke spilt';
    statRow.getCell(2).font = { name: 'Arial', size: 9, bold: true };
    statRow.getCell(2).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
    statRow.getCell(2).border = thinBorder;

    statRow.getCell(3).value = rw && rw.hasScores ? `Snitt: ${rw.avgScore} p` : '-';
    statRow.getCell(3).font = { name: 'Arial', size: 9, italic: true };
    statRow.getCell(3).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
    statRow.getCell(3).alignment = { horizontal: 'center', vertical: 'middle' };
    statRow.getCell(3).border = thinBorder;

    statRow.getCell(4).value = rw && rw.hasScores ? `Bunn: ${rw.minScore} p` : '-';
    statRow.getCell(4).font = { name: 'Arial', size: 9, italic: true };
    statRow.getCell(4).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
    statRow.getCell(4).alignment = { horizontal: 'center', vertical: 'middle' };
    statRow.getCell(4).border = thinBorder;

    statRow.getCell(5).value = '';
    statRow.getCell(5).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE5E7EB' } };
    statRow.getCell(5).border = thinBorder;

    rowIdx2 += 2; // 2 linjer opphold før neste runde
  }

  sheet2.getColumn(1).width = 16;
  sheet2.getColumn(2).width = 28;
  sheet2.getColumn(3).width = 20;
  sheet2.getColumn(4).width = 22;
  sheet2.getColumn(5).width = 20;

  // =========================================================================
  // ARK 3: AKKUMULERT STILLING (STILLING ETTER HVER RUNDE)
  // "ikke akkumelert men vi kan ha med det også"
  // =========================================================================
  const sheet3 = workbook.addWorksheet('Akkumulert stilling', {
    views: [{ showGridLines: true }]
  });

  const totalCols3 = 2 + roundCount + 2;

  sheet3.mergeCells(1, 1, 1, totalCols3);
  const t3Cell = sheet3.getCell(1, 1);
  t3Cell.value = '📈 STILLING & SAMMENLAGT POENGSUM ETTER HVER RUNDE';
  t3Cell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  t3Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F766E' } };
  t3Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet3.getRow(1).height = 32;

  sheet3.mergeCells(2, 1, 2, totalCols3);
  const m3Cell = sheet3.getCell(2, 1);
  m3Cell.value = `Viser den akkumulerte poengsummen til hvert lag sammenlagt etter runde 1, runde 2, runde 3 osv.`;
  m3Cell.font = { name: 'Arial', size: 9, italic: true, color: { argb: 'FFE2E8F0' } };
  m3Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F766E' } };
  m3Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet3.getRow(2).height = 18;

  // Headers for ark 3
  const h3 = ['Plassering', 'Lagnavn'];
  for (let r = 0; r < roundCount; r++) {
    h3.push(`Etter ${roundNames[r] || 'Runde ' + (r + 1)}`);
  }
  h3.push('SLUTTSUM', 'Status');

  const h3Row = sheet3.getRow(4);
  h3Row.height = 24;
  h3.forEach((h, colIdx) => {
    const cell = h3Row.getCell(colIdx + 1);
    cell.value = h;
    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF134E4A' } };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = thinBorder;
  });

  // Finn leder etter hver runde
  const roundLeaders = [];
  for (let r = 0; r < roundCount; r++) {
    let maxCum = -Infinity;
    activeTeams.forEach(t => {
      let cum = 0;
      let hasAny = false;
      for (let i = 0; i <= r; i++) {
        const val = window.QuizScoring ? window.QuizScoring.parseScore(t.scores ? t.scores[i] : null) : null;
        if (val !== null) { cum += val; hasAny = true; }
      }
      if (hasAny && cum > maxCum) maxCum = cum;
    });
    roundLeaders.push(maxCum > 0 ? maxCum : null);
  }

  let rowIdx3 = 5;
  activeTeams.forEach((team, tIdx) => {
    const row = sheet3.getRow(rowIdx3);
    row.height = 21;
    const rank = team.rank || (tIdx + 1);

    const cellRank = row.getCell(1);
    cellRank.value = `${rank}.`;
    cellRank.font = { name: 'Arial', size: 10, bold: rank <= 3 };
    cellRank.alignment = { horizontal: 'center', vertical: 'middle' };
    cellRank.border = thinBorder;

    const cellName = row.getCell(2);
    cellName.value = team.name || `Lag ${tIdx + 1}`;
    cellName.font = { name: 'Arial', size: 10, bold: rank <= 3 };
    cellName.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellName.border = thinBorder;

    let runningSum = 0;
    let hasAnyScore = false;

    for (let r = 0; r < roundCount; r++) {
      const cell = row.getCell(3 + r);
      const val = window.QuizScoring ? window.QuizScoring.parseScore(team.scores ? team.scores[r] : null) : null;
      if (val !== null) {
        runningSum += val;
        hasAnyScore = true;
      }

      if (hasAnyScore) {
        cell.value = runningSum;
        cell.numFmt = '#,##0.0';
      } else {
        cell.value = '-';
      }

      const isLeader = hasAnyScore && roundLeaders[r] !== null && runningSum === roundLeaders[r];
      cell.font = { name: 'Arial', size: 10, bold: isLeader };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = thinBorder;

      if (isLeader) {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFCCFBF1' } };
      }
    }

    const finalTotal = window.QuizScoring ? window.QuizScoring.calculateTeamTotal(team, roundCount) : 0;
    const cellTotal = row.getCell(3 + roundCount);
    cellTotal.value = finalTotal;
    cellTotal.numFmt = '#,##0.0';
    cellTotal.font = { name: 'Arial', size: 10, bold: true };
    cellTotal.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF08A' } };
    cellTotal.alignment = { horizontal: 'center', vertical: 'middle' };
    cellTotal.border = thinBorder;

    const cellStatus = row.getCell(3 + roundCount + 1);
    cellStatus.value = rank === 1 ? '🏆 Vinner' : (rank <= 3 ? 'På pallen' : '');
    cellStatus.font = { name: 'Arial', size: 9, italic: true };
    cellStatus.alignment = { horizontal: 'center', vertical: 'middle' };
    cellStatus.border = thinBorder;

    rowIdx3++;
  });

  sheet3.getColumn(1).width = 14;
  sheet3.getColumn(2).width = 28;
  for (let r = 0; r < roundCount; r++) {
    sheet3.getColumn(3 + r).width = 16;
  }
  sheet3.getColumn(3 + roundCount).width = 16;
  sheet3.getColumn(3 + roundCount + 1).width = 20;

  // =========================================================================
  // ARK 4: RUNDESTATISTIKK & MESTVINNENDE LAG
  // =========================================================================
  const sheet4 = workbook.addWorksheet('Rundestatistikk', {
    views: [{ showGridLines: true }]
  });

  sheet4.mergeCells(1, 1, 1, 5);
  const t4Cell = sheet4.getCell(1, 1);
  t4Cell.value = '🥇 RUNDESTATISTIKK & MESTVINNENDE LAG';
  t4Cell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
  t4Cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF78350F' } }; // Varm rav/bronse
  t4Cell.alignment = { horizontal: 'center', vertical: 'middle' };
  sheet4.getRow(1).height = 32;

  // Tabell 1: Mestvinnende lag
  const tally = window.QuizRoundAnalysis 
    ? window.QuizRoundAnalysis.getTeamWinsTally(activeTeams, roundWinners) 
    : [];

  sheet4.mergeCells(3, 1, 3, 5);
  const secTallyTitle = sheet4.getCell(3, 1);
  secTallyTitle.value = '🥇 Lagene med flest rundeseiere:';
  secTallyTitle.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF78350F' } };
  sheet4.getRow(3).height = 20;

  const hTally = ['Rangering', 'Lagnavn', 'Antall rundeseiere', 'Beste rundescore', 'Status'];
  const hTallyRow = sheet4.getRow(4);
  hTallyRow.height = 22;
  hTally.forEach((th, cIdx) => {
    const cell = hTallyRow.getCell(cIdx + 1);
    cell.value = th;
    cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF92400E' } };
    cell.alignment = { horizontal: cIdx === 1 ? 'left' : 'center', vertical: 'middle' };
    cell.border = thinBorder;
  });

  let rowIdx4 = 5;
  tally.forEach((t, idx) => {
    const row = sheet4.getRow(rowIdx4);
    row.height = 20;

    const cellRank = row.getCell(1);
    cellRank.value = idx === 0 && t.wins > 0 ? '🏆 1.' : `${idx + 1}.`;
    cellRank.font = { name: 'Arial', size: 9, bold: idx === 0 };
    cellRank.alignment = { horizontal: 'center', vertical: 'middle' };
    cellRank.border = thinBorder;

    const cellName = row.getCell(2);
    cellName.value = t.name;
    cellName.font = { name: 'Arial', size: 9, bold: idx === 0 };
    cellName.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellName.border = thinBorder;

    const cellWins = row.getCell(3);
    cellWins.value = `${t.wins} seier${t.wins === 1 ? '' : 'e'}`;
    cellWins.font = { name: 'Arial', size: 9, bold: t.wins > 0 };
    cellWins.alignment = { horizontal: 'center', vertical: 'middle' };
    cellWins.border = thinBorder;

    const cellBest = row.getCell(4);
    cellBest.value = t.bestScore > 0 ? t.bestScore : '-';
    cellBest.font = { name: 'Arial', size: 9 };
    cellBest.alignment = { horizontal: 'center', vertical: 'middle' };
    cellBest.border = thinBorder;

    const cellNote = row.getCell(5);
    cellNote.value = idx === 0 && t.wins > 0 ? 'Flest seiere' : '';
    cellNote.font = { name: 'Arial', size: 9, italic: true };
    cellNote.alignment = { horizontal: 'center', vertical: 'middle' };
    cellNote.border = thinBorder;

    rowIdx4++;
  });

  // Tabell 2: Nøkkeltall per runde
  rowIdx4 += 2;
  sheet4.mergeCells(rowIdx4, 1, rowIdx4, 5);
  const secRoundKeyTitle = sheet4.getCell(rowIdx4, 1);
  secRoundKeyTitle.value = '📊 Nøkkeltall per runde:';
  secRoundKeyTitle.font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF1E3A8A' } };
  sheet4.getRow(rowIdx4).height = 20;
  rowIdx4++;

  const hKey = ['Runde', 'Vinnerlag', 'Høyeste poengsum', 'Gjennomsnittsscore', 'Laveste poengsum'];
  const hKeyRow = sheet4.getRow(rowIdx4);
  hKeyRow.height = 22;
  hKey.forEach((kh, cIdx) => {
    const cell = hKeyRow.getCell(cIdx + 1);
    cell.value = kh;
    cell.font = { name: 'Arial', size: 9, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } };
    cell.alignment = { horizontal: cIdx <= 1 ? 'left' : 'center', vertical: 'middle' };
    cell.border = thinBorder;
  });
  rowIdx4++;

  roundWinners.forEach(rw => {
    const row = sheet4.getRow(rowIdx4);
    row.height = 20;

    const cellR = row.getCell(1);
    cellR.value = rw.roundTitle;
    cellR.font = { name: 'Arial', size: 9, bold: true };
    cellR.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellR.border = thinBorder;

    const cellW = row.getCell(2);
    cellW.value = rw.hasScores ? rw.winners.map(w => w.name).join(', ') : 'Ikke spilt';
    cellW.font = { name: 'Arial', size: 9, bold: rw.hasScores };
    cellW.alignment = { horizontal: 'left', vertical: 'middle', indent: 1 };
    cellW.border = thinBorder;

    const cellMax = row.getCell(3);
    cellMax.value = rw.hasScores ? rw.maxScore : '-';
    cellMax.font = { name: 'Arial', size: 9, bold: true };
    cellMax.alignment = { horizontal: 'center', vertical: 'middle' };
    cellMax.border = thinBorder;

    const cellAvg = row.getCell(4);
    cellAvg.value = rw.hasScores ? rw.avgScore : '-';
    cellAvg.font = { name: 'Arial', size: 9, italic: true };
    cellAvg.alignment = { horizontal: 'center', vertical: 'middle' };
    cellAvg.border = thinBorder;

    const cellMin = row.getCell(5);
    cellMin.value = rw.hasScores ? rw.minScore : '-';
    cellMin.font = { name: 'Arial', size: 9, italic: true };
    cellMin.alignment = { horizontal: 'center', vertical: 'middle' };
    cellMin.border = thinBorder;

    rowIdx4++;
  });

  sheet4.getColumn(1).width = 16;
  sheet4.getColumn(2).width = 30;
  sheet4.getColumn(3).width = 20;
  sheet4.getColumn(4).width = 20;
  sheet4.getColumn(5).width = 20;

  // =========================================================================
  // GENERER OG LAST NED
  // =========================================================================
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);

  const safeTitle = (title || 'Quiz').replace(/[^a-zA-Z0-9æøåÆØÅ_-]/g, '_');
  const filename = `${safeTitle}_${dateStr}_komplett.xlsx`;

  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

window.QuizExcelExport = {
  exportQuizToExcel,
  exportToExcel: exportQuizToExcel
};
