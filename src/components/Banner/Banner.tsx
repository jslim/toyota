import { FC, memo, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import css from './Banner.module.scss';

import { Lang } from '@/data/types';

import resize from '@/services/resize';
import { Color, getBackgroundColorClass, getColorClass } from '@/utils/colors';
import { parseContentfulRichText } from '@/utils/parsers/rich-text-parser';

import { setHomepageBannerHeight, setHomepageBannerVisibility, useAppDispatch, useAppSelector } from '@/redux';

import CloseSvg from '@/components/svgs/close.svg';

import BaseButton from '../BaseButton/BaseButton';

export type BannerProps = {};

const Banner: FC<BannerProps> = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showHomepageBanner, homepageBannerText, homepageBannerClose } = useAppSelector(
    (state) => state.activeGlobalData
  );

  const isHomepage = useMemo(() => {
    const strippedPath = router.asPath.replaceAll('/', '');
    return strippedPath === Lang.EN || strippedPath === Lang.JP;
  }, [router]);

  useEffect(() => {
    if (!isHomepage) dispatch(setHomepageBannerVisibility(false));
  }, [dispatch, isHomepage]);

  // Using ref callback so we can be certain banner in DOM before applying margin
  const bannerRef = useCallback(
    (node: HTMLDivElement | null) => {
      const updatePadding = () => {
        const { height } = node!.getBoundingClientRect();
        dispatch(setHomepageBannerHeight(height));
      };

      if (node !== null) {
        updatePadding();
        resize.listen(updatePadding);
      } else {
        resize.dismiss(updatePadding);
      }
    },
    [dispatch]
  );

  // Router query slug includes both search params AND slug in dynamic path. This should only match /en/ and /jp/
  if (!showHomepageBanner || !isHomepage) return null;
  return (
    <div ref={bannerRef} className={classnames(css.root, getBackgroundColorClass(Color.DARK_GREY))}>
      <div className={classnames(css.bannerText, getColorClass(Color.WHITE))}>
        {typeof homepageBannerText === 'string' ? homepageBannerText : parseContentfulRichText(homepageBannerText)}
      </div>
      <BaseButton
        className={css.close}
        onClick={() => dispatch(setHomepageBannerVisibility(false))}
        aria-label={homepageBannerClose}
      >
        <CloseSvg className={css.closeIcon} />
      </BaseButton>
    </div>
  );
};

export default memo(Banner);
