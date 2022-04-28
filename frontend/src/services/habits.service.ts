import { IHabitParams } from '../components/pages/HabitsPage/Habits.types';
import { ICRUDResponse } from './services.types';

export const DEFAULT_HABIT_SUCCESS_RATE = 80;

export function getAllHabits(): IHabitParams[] {
  return JSON.parse(localStorage.getItem('habits') ?? '[]');
}

export function addHabit(habit: IHabitParams): ICRUDResponse {
  const habits = getAllHabits();
  if (habits.some(u => u.name === habit.name)) {
    return { success: false, message: 'A habit with this name already exists.' };
  }

  localStorage.setItem('habits', JSON.stringify([...habits, habit]));
  return { success: true, message: 'The habit has been successfully created.' };
}
