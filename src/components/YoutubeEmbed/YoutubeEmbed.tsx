import { FC, memo } from 'react';
import classNames from 'classnames';

import css from './YoutubeEmbed.module.scss';

export type YoutubeEmbedProps = {
  className?: string;
  embedId: string;
};

const YoutubeEmbed: FC<YoutubeEmbedProps> = ({ className, embedId }) => {
  return (
    <div className={classNames('YoutubeEmbed', css.root, className)}>
      <iframe title="Youtube" src={`https://www.youtube.com/embed/${embedId}`} allowFullScreen />
    </div>
  );
};

export default memo(YoutubeEmbed);
