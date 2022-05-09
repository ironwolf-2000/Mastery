import { EntitiesPage } from '../../common';

export const Preferences = () => {
  return (
    <EntitiesPage
      entityType='preference'
      redirectPath='/preferences'
      entityHeatmapColor='var(--color-rgb-preferences)'
    />
  );
};
