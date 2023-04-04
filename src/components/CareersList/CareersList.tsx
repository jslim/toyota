import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import css from './CareersList.module.scss';

import { variants } from '@/data/variants';

import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';

import { Accordion, AccordionItem } from '../Accordion/Accordion';
import Eyebrow from '../Eyebrow/Eyebrow';

export type CareersListProps = {
  className?: string;
  title: string;
  eyebrow: string;
};

interface Job {
  categories: {
    department: string;
    location: string;
    team: string;
  };
  text: string;
  applyUrl: string;
}

interface JobsListByDepartment {
  [department: string]: Job[];
}

const CareersList: FC<CareersListProps> = ({ className, title, eyebrow }) => {
  const [jobMap, setJobMap] = useState<JobsListByDepartment>({});
  const jobDepartmentMap: JobsListByDepartment = useMemo(() => ({}), []);

  const sortJobDepartments = useCallback(
    (data: Job[]) => {
      data.forEach((job: Job) => {
        if (jobDepartmentMap[job.categories.department]) {
          // If department already exists, add to end of department array
          jobDepartmentMap[job.categories.department] = [...jobDepartmentMap[job.categories.department], job];
        } else {
          // Otherwise create array with the job in the department
          jobDepartmentMap[job.categories.department] = [job];
        }
      });
    },
    [jobDepartmentMap]
  );

  useEffect(() => {
    try {
      fetch('https://api.lever.co/v0/postings/woven-planet-2?mode=json')
        .then((res) => res.json())
        .then((data) => {
          sortJobDepartments(data);
          setJobMap(jobDepartmentMap);
        });
    } catch (e) {
      console.error('Unable to fetch Job postings: ', e);
    }
  }, [sortJobDepartments, jobDepartmentMap]);

  return (
    <div className={classNames('CareersList', css.root, css.darkMode, className)}>
      <Eyebrow text={eyebrow} variant={variants.DARK} className={css.eyebrow} />
      <div>
        <h2 className={css.title}>{title}</h2>
        {/* Search Filter component goes here */}
      </div>
      <Accordion variant={variants.DARK}>
        {Object.keys(jobMap).length > 0 &&
          Object.keys(jobMap).map((department, key) => (
            <AccordionItem key={key} title={department} secondaryText={`${jobMap[department]?.length} openings`}>
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
