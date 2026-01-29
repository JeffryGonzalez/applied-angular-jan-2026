import { computed, effect } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { addEntity, removeEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Task } from './internal/types';

type TaskEntity = Task & { minutes: number; id: string; description: string };

type TasksState = {
  isRecording: boolean;
  currentTime: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  _tick: Date; // in a store, an underscore on a member is private, in a class, use a # or the private keyword.
  startTime: Date | null;
};
export const tasksStore = signalStore(
  // state is like "initialState" in redux. What's there?
  // these are all "read only" signals, automatically created for you.
  withState<TasksState>({
    isRecording: false,
    currentTime: {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    _tick: new Date(),
    startTime: null,
  }),
  withEntities<TaskEntity>(),
  // instead of having a reducer that takes actions and switches on them, just create methods.
  withMethods((store) => {
    return {
      startRecording: () => patchState(store, { isRecording: true, startTime: new Date() }),
      cancelRecording: () => patchState(store, { isRecording: false, startTime: null }),
      finishRecording: () => {
        const task: Task = {
          startTime: store.startTime() || new Date(),
          endTime: store._tick(),
        };
        const minutes = Math.round(
          (store._tick().getTime() - task.startTime.getTime()) / 1000 / 60,
        );
        const taskEntity: TaskEntity = {
          ...task,
          id: crypto.randomUUID(),
          description: 'None',
          minutes,
        };

        patchState(store, { isRecording: false, startTime: null }, addEntity(taskEntity));
      },
      deleteTask: (task: TaskEntity) => patchState(store, removeEntity(task.id)),
      changeDescription: (task: TaskEntity, newDescription: string) => {
        patchState(
          store,
          updateEntity({
            id: task.id,
            changes: {
              description: newDescription,
            },
          }),
        );
      },
    };
  }),
  withComputed((store) => {
    return {
      stats: computed(() => {
        const totalMinutes = store.entities().reduce((sum, task) => sum + task.minutes, 0);
        const totalTasks = store.entities().length;
        const averageMinutes = totalTasks ? Math.round(totalMinutes / totalTasks) : 0;
        const longestTask = store
          .entities()
          .reduce((max, task) => (task.minutes > max ? task.minutes : max), 0);
        return {
          totalMinutes,
          totalTasks,
          averageMinutes,
          longestTask,
        };
      }),
      taskList: computed(() => {
        // Promise you will see why later...
        return store.entities();
      }),
    };
  }),
  withHooks({
    onInit(store) {
      setInterval(() => {
        patchState(store, { _tick: new Date() });
      }, 1000);
      effect(() => {
        const now = store._tick();
        patchState(store, {
          currentTime: {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
          },
        });
      });
    },
    onDestroy() {
      console.log('tasksStore destroyed');
    },
  }),
);
