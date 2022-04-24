import { IHabitParams } from '../components/pages/HabitsPage/Habits.types';
import { ICRUDResponse } from './services.types';

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

export function getHabitByName(name: string): IHabitParams | null {
  const habits = getAllHabits();
  return habits.find(habit => habit.name === name) ?? null;
}

export function updateHabitProgress(
  name: string,
  x: number,
  y: number,
  val: number
): ICRUDResponse {
  const allHabits = getAllHabits();
  let updated = false;

  for (let i = 0; i < allHabits.length && !updated; i++) {
    if (allHabits[i].name === name) {
      allHabits[i].heatmap[x][y] = val;
      updated = true;
    }
  }

  if (!updated) {
    return { success: false, message: `Couldn't find the habit by its name "${name}".` };
  }

  localStorage.setItem('habits', JSON.stringify(allHabits));
  return { success: true, message: `Successully updated the habit progress.` };
}
