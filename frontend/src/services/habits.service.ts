import { IHabitParams } from '../components/pages/HabitsPage/Habits.types';

export function getAllHabits(): IHabitParams[] {
  return JSON.parse(localStorage.getItem('habits') ?? '[]');
}

export function addHabit(habit: IHabitParams): ICreateResponse {
  const habits = getAllHabits();
  if (habits.some(u => u.name === habit.name)) {
    return { success: false, message: 'A habit with this name already exists.' };
  }

  localStorage.setItem('habits', JSON.stringify([...habits, habit]));
  return { success: true, message: 'The habit has been successfully created.' };
}

interface ICreateResponse {
  success: boolean;
  message: string;
}
