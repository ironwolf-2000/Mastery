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

export function deleteHabit(name: string) {
  const newHabits = getAllHabits().filter(habit => habit.name !== name);
  localStorage.setItem('habits', JSON.stringify(newHabits));
}

export function resetHabit(name: string) {
  const allHabits = getAllHabits();
  let reset = false;

  for (let i = 0; i < allHabits.length && !reset; i++) {
    if (allHabits[i].name === name) {
      for (let x = 0; x < allHabits[i].heatmap.length; x++) {
        for (let y = 0; y < allHabits[i].heatmap.length; y++) {
          allHabits[i].heatmap[x][y] = -1;
        }
      }
      reset = true;
    }
  }

  if (!reset) {
    return { success: false, message: `Couldn't find the habit by its name "${name}".` };
  }

  localStorage.setItem('habits', JSON.stringify(allHabits));
  return { success: true, message: `Successully reset the habit progress.` };
}

export function getCurrentHabitSuccessRate(habit: IHabitParams | null): number {
  if (habit === null) return DEFAULT_HABIT_SUCCESS_RATE;

  let completed = 0;
  let failed = 0;

  for (const row of habit.heatmap) {
    for (const cellVal of row) {
      if (cellVal === 2) {
        completed++;
      } else if (cellVal === 0) {
        failed++;
      }
    }
  }

  return completed && Number((completed / (completed + failed)).toFixed(2)) * 100;
}
