import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods } from '@ngrx/signals';
import { addEntity, removeEntity, updateEntity, withEntities } from '@ngrx/signals/entities';
import { Task } from '../widgets/clock';

// What am I going to want to "store" in this signal store?
// withState - this is "read only" signals for the code that injects this.
// what methods is this going to need
// a way to add a task?
// Any computed stuff?

type TaskEntity = Task & { minutes: number; id: string; description: string };

export const tasksStore = signalStore(
  // state is like "initialState" in redux. What's there?
  // these are all "read only" signals, automatically created for you.
  // withState<TasksState>({
  //   tasks: [],
  // }),
  withEntities<TaskEntity>(),
  // instead of having a reducer that takes actions and switches on them, just create methods.
  withMethods((store) => {
    return {
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
      addTask: (task: Task) => {
        const minutes = Math.round((task.endTime.getTime() - task.startTime.getTime()) / 1000 / 60);
        const taskEntity: TaskEntity = {
          ...task,
          id: crypto.randomUUID(),
          description: 'None',
          minutes,
        };
        patchState(store, addEntity(taskEntity));
      },
    };
  }),
  withComputed((store) => {
    // const reduxStore = inject(Store)
    return {
      stats: computed(() => {
        //         const totalMinutes = store.tasks().reduce((acc, task) => acc +  0);
        // const totalTasks = this.taskList().length;
        // const averageMinutes = totalTasks === 0 ? 0 : totalMinutes / totalTasks;
        // const longestTask = this.taskList().reduce(
        //   (max, task) => (task.minutes > max ? task.minutes : max),
        //   0,
        // );
        return {
          totalMinutes: 0,
          totalTasks: 0,
          averageMinutes: 0,
          longestTask: 0,
        };
      }),
      taskList: computed(() => {
        return store.entities();
      }),
    };
  }),
  withHooks({
    onInit() {
      console.log('tasksStore initialized');
    },
    onDestroy() {
      console.log('tasksStore destroyed');
    },
  }),
);
