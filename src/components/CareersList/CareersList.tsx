import { FC, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import classNames from 'classnames';

import css from './CareersList.module.scss';

import { Job } from '@/data/types';
import { variants } from '@/data/variants';

import { Accordion, AccordionItem } from '@/components/Accordion/Accordion';
import AccordionContentCard from '@/components/AccordionContent/AccordionContentCard';
import FilterDropdownModalOptions from '@/components/FilterDropdownModalOptions/FilterDropdownModalOptions';
import FilterList from '@/components/FilterList/FilterList';
import Filters from '@/components/Filters/Filters';
import IconCircle from '@/components/IconCircle/IconCircle';

import { useLayout } from '@/hooks';
import { Color } from '@/utils/colors';

import { useAppSelector } from '@/redux';

import SectionWrapper from '../SectionWrapper/SectionWrapper';

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

interface Categories {
  types: {
    header: string;
    content: {
      options: {
        label: string;
      }[];
    }[];
  };
  location: {
    header: string;
    content: {
      options: {
        label: string;
      }[];
    }[];
  };
  work: {
    header: string;
    content: {
      options: {
        label: string;
      }[];
    }[];
  };
  teams: {
    header: string;
    content: {
      options?: {
        label: string;
      }[];
      title?: string;
    }[];
  };
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
  const activeLang = useAppSelector((state) => state.activeLang);
  const { learnMore } = useAppSelector((state) => state.activeGlobalStrings);
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
      .filter(([key]) => key === 'Type' || key === 'Work' || key === 'Team' || key === 'Location')
      .map(([category, value]) => ({ category, value: value }));
  }, [router.query]);

  const locations = useRef<string[]>([]);
  const workplaceTypes = useRef<string[]>([]);
  const teams = useRef<{ title: string; options: string[] }[]>([]);
  const works = useRef<string[]>([]);

  const getCategoriesArray = useCallback(() => {
    // Modify types, location, and work properties
    const modifiedTypes = {
      header: 'Type',
      content: [
        {
          options: [
            {
              label: 'All',
              clearsCategory: true
            }
          ]
        },
        {
          options: workplaceTypes.current.map((type) => ({ label: type }))
        }
      ]
    };
    const modifiedLocation = {
      header: 'Location',
      content: [
        {
          options: [
            {
              label: 'All',
              clearsCategory: true
            }
          ]
        },
        {
          options: locations.current.map((location) => ({ label: location }))
        }
      ]
    };
    const modifiedWork = {
      header: 'Work',
      content: [
        {
          options: [
            {
              label: 'All',
              clearsCategory: true
            }
          ]
        },
        {
          options: works.current.map((work) => ({ label: work }))
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
              label: 'All',
              clearsCategory: true
            }
          ]
        },
        ...teams.current.map((team) => ({
          title: team.title,
          options: team.options.map((work) => ({ label: work }))
        }))
      ]
    };

    // Create a new object with modified properties
    return {
      types: modifiedTypes,
      location: modifiedLocation,
      work: modifiedWork,
      teams: modifiedTeams
    };
  }, []);

  const categories = getCategoriesArray();

  const getLocations = useCallback((job: Job) => {
    const location = job.categories.location ?? '';
    if (!locations.current.includes(location)) {
      locations.current.push(location);
    }
  }, []);

  const getWorkplaceType = useCallback((job: Job) => {
    const workplaceType = job.workplaceType ?? '';
    if (!workplaceTypes.current.includes(workplaceType)) {
      workplaceTypes.current.push(workplaceType);
    }
  }, []);

  const getCommitment = useCallback((job: Job) => {
    const work = job.categories.commitment ?? '';
    if (!works.current.includes(work)) {
      works.current.push(work);
    }
  }, []);

  const getTeams = useCallback((job: Job) => {
    const department = job.categories.department ?? '';
    const team = job.categories.team ?? '';
    const updatedTeams = [...teams.current];

    const existingItem = updatedTeams.find((item) => item.title === department && item.options.includes(team));
    if (existingItem) {
      return;
    }

    const foundDepartment = updatedTeams.find((item) => item.title === department);
    if (foundDepartment) {
      if (!foundDepartment.options.includes(team)) {
        foundDepartment.options.push(team);
      }
    } else {
      updatedTeams.push({ title: department, options: [team] });
    }

    teams.current = updatedTeams;
  }, []);

  const sortJobDepartments = useCallback(
    (data: Job[]) => {
      const jobDepartmentMap: JobsListByDepartment = {};

      data.forEach((job: Job) => {
        if (jobDepartmentMap[job.categories.department]) {
          // If department already exists, add to end of department array
          jobDepartmentMap[job.categories.department].push(job);
        } else {
          // Otherwise create array with the job in the department
          jobDepartmentMap[job.categories.department] = [job];
        }

        // Pull out categories
        getLocations(job);
        getWorkplaceType(job);
        getCommitment(job);
        getTeams(job);
      });

      return jobDepartmentMap;
    },
    [getCommitment, getLocations, getTeams, getWorkplaceType]
  );

  useEffect(() => {
    try {
      fetch('https://api.lever.co/v0/postings/woven-by-toyota?mode=json')
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

  const modifiedAccordionItem = (item: {
    id: string;
    text: string;
    categories: {
      location: string;
      department: string;
      team: string;
    };
    applyUrl: string;
  }) => {
    const jobUrl = '/' + activeLang + '/careers/detail/?jobID=' + item.id;
    return (
      <AccordionContentCard
        key={item.id}
        title={item.text}
        text={`${item.categories.location} ${item.categories.department} - ${item.categories.team}`}
        cta={{ title: learnMore, href: jobUrl }}
      />
    );
  };

  return (
    <div className={classNames('CareersList', css.root, className, { [css.modalOpen]: modalOpen })}>
      <SectionWrapper backgroundColor={Color.DARK_GREY} eyebrow={eyebrow} className={css.sectionWrapper}>
        <div className={css.wrapper}>
          {!isDesktop && (
            <FilterList
              className={css.filtersModal}
              header={filtersLabel}
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            >
              {Object.keys(categories).map((category, index) => {
                return (
                  <FilterDropdownModalOptions
                    key={index}
                    {...categories[category as keyof Categories]}
                    category={categories[category as keyof Categories].header}
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
              <AccordionItem
                key={key}
                title={department}
                secondaryText={`${filteredJobs[department]?.length} openings`}
                variant={variants.DARK}
              >
                {Object.values(filteredJobs)[key].map((item) => {
                  return modifiedAccordionItem(item);
                })}
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className={css.notFound}>
            <IconCircle className={css.circle}>
              <span className={css.dot}></span>
              <span className={css.dot}></span>
              <span className={css.dot}></span>
            </IconCircle>
            <div className={css.label}>{noResultsLabel}</div>
            <div className={css.description}> {noResultsDescription}</div>
          </div>
        )}
      </SectionWrapper>
    </div>
  );
};

export default memo(CareersList);
