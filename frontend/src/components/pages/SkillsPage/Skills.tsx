import { EntitiesPage } from '../../common';

export const Skills = () => {
  return (
    <EntitiesPage
      entityType='skill'
      redirectPath='/skills'
      entityHeatmapColor='var(--color-rgb-skills)'
    />
  );
};
