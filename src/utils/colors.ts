export enum Color {
  RED = 'red',
  BLACK = 'black',
  DARK_GREY = 'darkGrey',
  MID_GREY = 'midGrey',
  GREY = 'grey',
  LIGHT_GREY = 'lightGrey',
  WHITE = 'white',
  LINEAR = 'linear'
}

export function getColorClass(color: Color) {
  switch (color) {
    case 'red':
      return 'redColorClass';
    case 'black':
      return 'blackColorClass';
    case 'darkGrey':
      return 'darkGreyColorClass';
    case 'midGrey':
      return 'midGreyColorClass';
    case 'grey':
      return 'greyColorClass';
    case 'lightGrey':
      return 'lightGreyColorClass';
    case 'white':
      return 'whiteColorClass';
    case 'linear':
      return 'linearColorClass';
  }
}

export function getBackgroundColorClass(color: Color) {
  switch (color) {
    case 'red':
      return 'redBackgroundColorClass';
    case 'black':
      return 'blackBackgroundColorClass';
    case 'darkGrey':
      return 'darkGreyBackgroundColorClass';
    case 'midGrey':
      return 'midGreyBackgroundColorClass';
    case 'grey':
      return 'greyBackgroundColorClass';
    case 'lightGrey':
      return 'lightGreyBackgroundColorClass';
    case 'white':
      return 'whiteBackgroundColorClass';
    case 'linear':
      return 'linearBackgroundColorClass';
  }
}
