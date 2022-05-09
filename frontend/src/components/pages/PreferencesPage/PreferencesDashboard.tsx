import { Dashboard } from '../../common';

export const PreferencesDashboard = () => {
  return (
    <Dashboard
      entityType='preference'
      redirectPath='/preferences'
      entityHeatmapColor='var(--color-rgb-preferences)'
    />
  );
};
