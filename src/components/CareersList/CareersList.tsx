// @ts-nocheck
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import css from './CareersList.module.scss';

import { Job } from '@/data/types';
import { variants } from '@/data/variants';

import { Accordion, AccordionItem } from '@/components/Accordion/Accordion';
import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';
import Eyebrow from '@/components/Eyebrow/Eyebrow';
import FilterDropdownModalOptions from '@/components/FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterList from '@/components/FilterList/FilterList';
import Filters from '@/components/Filters/Filters';
import IconCircle from '@/components/IconCircle/IconCircle';

import { useLayout } from '@/hooks';

export type CareersListProps = {
  className?: string;
  title: string;
  eyebrow: string;
  filtersLabel: string;
  searchLabel: string;
  cleanLabel: string;
  noResultsLabel: string;
  noResultsDescription: string;
};

interface JobsListByDepartment {
  [department: string]: Job[];
}

const CareersList: FC<CareersListProps> = ({
  className,
  title,
  eyebrow,
  filtersLabel,
  searchLabel,
  cleanLabel,
  noResultsLabel,
  noResultsDescription
}) => {
  const [jobMap, setJobMap] = useState<JobsListByDepartment>({});
  const [filteredJobs, setFilteredJobs] = useState<JobsListByDepartment>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const router = useRouter();
  const { layout } = useLayout();
  const isDesktop = useMemo(() => {
    return typeof window !== 'undefined' && !layout.tablet && !layout.mobile;
  }, [layout.mobile, layout.tablet]);

  const filterParams = useMemo(() => {
    return Object.entries(router.query)
      .filter(([key]) => key !== 'lang') // filter out the 'lang' property
      .map(([category, value]) => ({ category, value: value }));
  }, [router.query]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const getCategoriesArray = useCallback(() => {
    const categories = Object.values(jobMap) // Get all the arrays
      .map((array) => {
        const types = array
          .flatMap((subArray) => subArray?.workplaceType)
          .filter((value, index, self) => self.indexOf(value) === index);
        const location = array
          .flatMap((subArray) => subArray.categories.location)
          .filter((value, index, self) => self.indexOf(value) === index);
        const work = array
          .flatMap((subArray) => subArray.categories?.commitment)
          .filter((value, index, self) => self.indexOf(value) === index);

        const departments = array
          .flatMap((subArray) => {
            return { department: subArray.categories.department, team: subArray.categories.team };
          })
          .filter(
            (current, index, self) =>
              index === self.findIndex((item) => item.department === current.department && item.team === current.team)
          );

        const teams = departments.reduce(
          (accumulator: { [department: string]: string[] }, current: { department: string; team: string }) => {
            const { department, team } = current;
            if (!accumulator[department]) {
              accumulator[department] = [];
            }
            accumulator[department].push(team);
            return accumulator;
          },
          {}
        );

        return { types, location, work, teams };
      });

    const result = categories.reduce(
      (acc, curr) => {
        for (const key in curr) {
          if (curr.hasOwnProperty(key) && !acc.hasOwnProperty(key)) {
            acc[key] = curr[key];
          } else if (curr.hasOwnProperty(key) && key === 'teams') {
            for (const teamKey in curr[key]) {
              if (curr[key].hasOwnProperty(teamKey) && !acc[key].hasOwnProperty(teamKey)) {
                acc[key][teamKey] = curr[key][teamKey];
              } else if (curr[key].hasOwnProperty(teamKey)) {
                acc[key][teamKey] = [...acc[key][teamKey], ...curr[key][teamKey]];
              }
            }
          } else if (curr.hasOwnProperty(key)) {
            acc[key] = [...new Set([...acc[key], ...curr[key]])];
          }
        }
        return acc;
      },
      {
        types: [],
        location: [],
        work: [],
        teams: {}
      }
    );

    // getting data ready to pass to other components:
    // Modify types, location, and work properties
    const modifiedTypes = {
      header: 'Type',
      content: [
        {
          options: [
            {
              label: 'All'
            }
          ]
        },
        {
          options: result.types.map((type) => ({ label: type }))
        }
      ]
    };
    const modifiedLocation = {
      header: 'Location',
      content: [
        {
          options: [
            {
              label: 'All'
            }
          ]
        },
        {
          options: result.location.map((location) => ({ label: location }))
        }
      ]
    };
    const modifiedWork = {
      header: 'Work',
      content: [
        {
          options: [
            {
              label: 'All'
            }
          ]
        },
        {
          options: result.work.map((work) => ({ label: work }))
        }
      ]
    };
    // Modify teams property
    const modifiedTeams = {
      header: 'Team',
      content: [
        {
          options: [
            {
              label: 'All'
            }
          ]
        }
      ].concat(
        Object.entries(result.teams).map(([teamName, team]) => ({
          title: teamName,
          options: team.map((subcat) => ({ label: subcat }))
        }))
      )
    };
    // Create a new object with modified properties
    return {
      types: modifiedTypes,
      location: modifiedLocation,
      work: modifiedWork,
      teams: modifiedTeams
    };
  }, [jobMap]);

  const categories = getCategoriesArray();

  const sortJobDepartments = useCallback((data: Job[]) => {
    const jobDepartmentMap: JobsListByDepartment = {};

    data.forEach((job: Job) => {
      if (jobDepartmentMap[job.categories.department]) {
        // If department already exists, add to end of department array
        jobDepartmentMap[job.categories.department].push(job);
      } else {
        // Otherwise create array with the job in the department
        jobDepartmentMap[job.categories.department] = [job];
      }
    });

    return jobDepartmentMap;
  }, []);

  useEffect(() => {
    try {
      fetch('https://api.lever.co/v0/postings/woven-planet-2?mode=json')
        .then((res) => res.json())
        .then((data) => {
          const sortedData: JobsListByDepartment = sortJobDepartments(data);
          setJobMap(sortedData);
        });
    } catch (e) {
      console.error('Unable to fetch Job postings: ', e);
    }
  }, [sortJobDepartments]);

  const onSearch = useCallback((value: string) => {
    setSearchText(value);
  }, []);

  useEffect(() => {
    const subgroups = Object.values(jobMap).flat();
    const filteredSubgroups = subgroups
      .filter((subgroup) =>
        filterParams.every(({ category, value }) => {
          if (category === 'Type') {
            return subgroup.workplaceType === value;
          } else if (category === 'Location') {
            return subgroup.categories.location === value;
          } else if (category === 'Work') {
            return subgroup.categories.commitment === value;
          } else if (category === 'Team') {
            return subgroup.categories.team === value;
          } else {
            return true;
          }
        })
      )
      .filter((subgroup) => {
        return subgroup.text.toLowerCase().includes(searchText.toLowerCase());
      });

    setFilteredJobs(sortJobDepartments(filteredSubgroups));
  }, [filterParams, jobMap, searchText, sortJobDepartments]);

  return (
    <div className={classNames('CareersList', css.root, css.darkMode, className, { [css.modalOpen]: modalOpen })}>
      <Eyebrow text={eyebrow} variant={variants.DARK} className={css.eyebrow} />
      <div className={css.wrapper}>
        {!isDesktop && (
          <FilterList className={css.filtersModal} header={filtersLabel} onClose={() => setModalOpen(false)}>
            {Object.keys(categories).map((category, index) => {
              return (
                <FilterDropdownModalOptions
                  key={index}
                  {...categories[category]}
                  category={categories[category].header}
                />
              );
            })}
          </FilterList>
        )}

        <h2 className={css.title}>{title}</h2>
        <Filters
          className={css.filtersContainer}
          filtersLabel={filtersLabel}
          searchLabel={searchLabel}
          cleanLabel={cleanLabel}
          onFilterModalClick={() => setModalOpen(!modalOpen)}
          onSearch={onSearch}
          dropdowns={categories}
          filtersAmount={filterParams.length}
        />
      </div>
      {Object.keys(filteredJobs).length > 0 ? (
        <Accordion className={css.accordion} variant={variants.DARK}>
          {Object.keys(filteredJobs).map((department, key) => (
            <AccordionItem key={key} title={department} secondaryText={`${filteredJobs[department]?.length} openings`}>
              {Object.values(filteredJobs)[key].map((item, index) => (
                <AccordionContentCard
                  key={index}
                  title={item.text}
                  text={`${item.categories.location} ${item.categories.department} - ${item.categories.team}`}
                  cta={{ title: 'apply', href: item.applyUrl }}
                />
              ))}
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className={css.notFound}>
          <IconCircle className={css.circle}>
            <span></span>
            <span></span>
            <span></span>
          </IconCircle>
          <div className={css.label}>{noResultsLabel}</div>
          <div className={css.description}> {noResultsDescription}</div>
        </div>
      )}
    </div>
  );
};

export default memo(CareersList);
