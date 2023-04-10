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
    case Color.RED:
      return 'redColorClass';
    case Color.BLACK:
      return 'blackColorClass';
    case Color.DARK_GREY:
      return 'darkGreyColorClass';
    case Color.MID_GREY:
      return 'midGreyColorClass';
    case Color.GREY:
      return 'greyColorClass';
    case Color.LIGHT_GREY:
      return 'lightGreyColorClass';
    case Color.WHITE:
      return 'whiteColorClass';
  }
}

export function getBackgroundColorClass(color: Color) {
  switch (color) {
    case Color.RED:
      return 'redBackgroundColorClass';
    case Color.BLACK:
      return 'blackBackgroundColorClass';
    case Color.DARK_GREY:
      return 'darkGreyBackgroundColorClass';
    case Color.MID_GREY:
      return 'midGreyBackgroundColorClass';
    case Color.GREY:
      return 'greyBackgroundColorClass';
    case Color.LIGHT_GREY:
      return 'lightGreyBackgroundColorClass';
    case Color.WHITE:
      return 'whiteBackgroundColorClass';
    case Color.LINEAR:
      return 'linearBackgroundColorClass';
  }
}
