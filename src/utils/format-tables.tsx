export default function formatTables() {
  const tables = document.querySelectorAll('table');

  tables.forEach((table) => {
    const rows = table.rows;

    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      let previousHeaderWithContent = null;

      for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        const isHeaderCell = cell.tagName.toLowerCase() === 'th';
        const isEmptyCell = cell.textContent?.trim() === '';

        if (isEmptyCell) {
          if (previousHeaderWithContent) {
            const colspan = (previousHeaderWithContent.colSpan || 1) + 1;
            previousHeaderWithContent.colSpan = colspan;
            cell.style.display = 'none';
          }
        } else if (isHeaderCell) {
          previousHeaderWithContent = cell;
        }
      }
    }
  });
}
