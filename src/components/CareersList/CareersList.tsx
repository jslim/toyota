import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import css from './CareersList.module.scss';

import { variants } from '@/data/variants';

import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';

import { Accordion, AccordionItem } from '../Accordion/Accordion';
import Eyebrow from '../Eyebrow/Eyebrow';

export type CareersListProps = {
  className?: string;
};

interface job {
  categories: {
    commitment: string;
    department: string;
    location: string;
    team: string;
  };
  createdAt: number;
  text: string;
  workplaceType: string;
  applyUrl: string;
}

interface careersType {
  [department: string]: job[];
}

const CareersList: FC<CareersListProps> = ({ className }) => {
  const [jobMap, setJobMap] = useState<careersType>({});
  const map: careersType = useMemo(() => ({}), []);

  const filterData = useCallback(
    (data: job[]) => {
      data.forEach((job: job) => {
        if (map[job.categories.department]) {
          map[job.categories.department] = [...map[job.categories.department], job];
        } else {
          map[job.categories.department] = [job];
        }
      });
    },
    [map]
  );

  useEffect(() => {
    fetch('https://api.lever.co/v0/postings/woven-planet-2?mode=json')
      .then((res) => res.json())
      .then((data) => {
        filterData(data);
        setJobMap(map);
      });
  }, [filterData, map]);

  return (
    <div className={classNames('CareersList', css.root, css.darkMode, className)}>
      <Eyebrow text="careers" variant={variants.DARK} />
      <div>
        <div className={css.title}>Lorem ipsum dolor sit</div>
        {/* Search Filter component here */}
      </div>
      <Accordion variant={variants.DARK}>
        {Object.keys(jobMap).length > 0 &&
          Object.keys(jobMap).map((department, key) => (
            <AccordionItem key={key} title={department} secondaryText={`${jobMap[department].length} openings`}>
              {Object.values(jobMap)[key].map((item, key) => {
                return (
                  <AccordionContentCard
                    key={key}
                    title={item.text}
                    text={`${item.categories.location} ${item.categories.department} - ${item.categories.team}`}
                    cta={{ title: 'apply', href: item.applyUrl }}
                  />
                );
              })}
            </AccordionItem>
          ))}
      </Accordion>
    </div>
  );
};

export default memo(CareersList);
