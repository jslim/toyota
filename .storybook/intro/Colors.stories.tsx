import React, { FC } from 'react';
import { Story } from '@storybook/react';

import css from './Colors.module.scss';

import { Color, getColorClass, getBackgroundColorClass } from '@/utils/colors.ts';

import sass from '../../src/utils/sass';

export default {
  title: 'intro/Colors'
};

interface colorsEnumProps {
  backgroundColor: Color;
  textColor: Color;
}

const Typographies: FC<{}> = () => {
  console.log(sass.color);

  return (
    <div className={css.root} style={{ width: '90%', padding: '30px' }}>
      {Object.keys(sass.color).map((key) => (
        <div key={key} className={css.item}>
          <div className={css.color} style={{ background: sass.color[key] }} />
          <div className={css.label}>
            ${key} ({sass.color[key]})
          </div>
        </div>
      ))}
    </div>
  );
};

const Colors: FC<colorsEnumProps> = ({ backgroundColor, textColor }) => {
  return (
    <div
      className={getBackgroundColorClass(backgroundColor)}
      style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <p className={getColorClass(textColor)}>
        Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id ligula porta felis euismod
        semper.
      </p>
    </div>
  );
};

export const Default: Story<{}> = (args) => <Typographies {...args} />;

export const ColorsEnum = (args: colorsEnumProps) => <Colors {...args} />;

ColorsEnum.args = {
  backgroundColor: Color.DARK_GREY,
  textColor: Color.WHITE
};

ColorsEnum.argTypes = {
  backgroundColor: {
    control: {
      type: 'select',
      options: Object.values(Color)
    }
  },
  textColor: {
    control: {
      type: 'select',
      options: Object.values(Color)
    }
  }
};
