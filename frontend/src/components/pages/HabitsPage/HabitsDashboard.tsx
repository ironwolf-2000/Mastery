import { Dashboard } from '../../common';

export const HabitsDashboard = () => {
  return (
    <Dashboard
      entityType='habit'
      redirectPath='/habits'
      entityHeatmapColor='var(--color-rgb-habits)'
    />
  );
};
