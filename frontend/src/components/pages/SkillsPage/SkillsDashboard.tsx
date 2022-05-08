import { Dashboard } from '../../common';

export const SkillsDashboard = () => {
  return (
    <Dashboard
      entityType='skill'
      redirectPath='/skills'
      entityHeatmapColor='var(--color-rgb-skills)'
    />
  );
};
