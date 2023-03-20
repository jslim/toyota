import sassVars from '@/utils/sass';

export function mobileColumns({ numCols = parseInt(sassVars.grid.numOfColsMobile), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.grid.gapMobile) * extraGutters;
  return `${
    (parseFloat(sassVars.grid.columnWidthMobile) * numCols +
      parseFloat(sassVars.grid.gapMobile) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function tabletColumns({ numCols = parseInt(sassVars.grid.numOfColsTablet), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.grid.gapTablet) * extraGutters;
  return `${
    (parseFloat(sassVars.grid.columnWidthTablet) * numCols +
      parseFloat(sassVars.grid.gapTablet) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function desktopColumns({ numCols = parseInt(sassVars.grid.numCols), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.grid.gapDesktop) * extraGutters;
  return `${
    (parseFloat(sassVars.grid.columnWidthDesktop) * numCols +
      parseFloat(sassVars.grid.gapDesktop) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

const tabletWidth = sassVars.layout.tablet;
const desktopWidth = sassVars.layout.desktopSm;

export { desktopWidth, tabletWidth };
