import sassVars from '@/styles/export-vars.module.scss';

export function mobileColumns({ numCols = parseInt(sassVars.gridNumOfColsMobile), extraGutters = 0 }) {
  const extraGuttersWidth = parseInt(sassVars.gridGapMobile) * extraGutters;
  return `${
    (parseInt(sassVars.gridColumnWidthMobile) * numCols +
      parseInt(sassVars.gridGapMobile) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function tabletColumns({ numCols = parseInt(sassVars.gridNumOfColsTablet), extraGutters = 0 }) {
  const extraGuttersWidth = parseInt(sassVars.gridGapTablet) * extraGutters;
  return `${
    (parseInt(sassVars.gridColumnWidthTablet) * numCols +
      parseInt(sassVars.gridGapTablet) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

export function desktopColumns({ numCols = parseInt(sassVars.gridNumCols), extraGutters = 0 }) {
  const extraGuttersWidth = parseInt(sassVars.gridGapDesktop) * extraGutters;
  return `${
    (parseInt(sassVars.gridColumnWidthDesktop) * numCols +
      parseInt(sassVars.gridGapDesktop) * Math.max(numCols - 1, 0) +
      extraGuttersWidth) *
    100
  }vw`;
}

const tabletWidth = sassVars.layoutTablet;
const desktopWidth = sassVars.layoutDesktopSm;

export { desktopWidth, tabletWidth };
