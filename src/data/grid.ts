import sassVars from '@/styles/export-vars.module.scss';

export function mobileColumns({ numCols = parseInt(sassVars.gridNumOfColsMobile), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.gridGapMobile) * extraGutters;
  return `${
    (parseFloat(sassVars.gridColumnWidthMobile) * numCols +
      parseFloat(sassVars.gridGapMobile) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function tabletColumns({ numCols = parseInt(sassVars.gridNumOfColsTablet), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.gridGapTablet) * extraGutters;
  return `${
    (parseFloat(sassVars.gridColumnWidthTablet) * numCols +
      parseFloat(sassVars.gridGapTablet) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function desktopColumns({ numCols = parseInt(sassVars.gridNumCols), extraGutters = 0 }) {
  const extraGuttersWidth = parseFloat(sassVars.gridGapDesktop) * extraGutters;
  return `${
    (parseFloat(sassVars.gridColumnWidthDesktop) * numCols +
      parseFloat(sassVars.gridGapDesktop) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

const tabletWidth = sassVars.layoutTablet;
const desktopWidth = sassVars.layoutDesktopSm;

export { desktopWidth, tabletWidth };
