import { DateTime } from "luxon";

class RecTask {
  desc: String;
  countRequired: number;
  daysToComplete: number;
  frequencyInDays: number;
  priority: number;
  count: number;
  lastResetDate: DateTime;
  lastProgressDate: DateTime;

  constructor(desc: String, countRequired: number, daysToComplete: number, frequencyInDays: number, priority: number=0) {
    this.desc = desc;
    this.countRequired = countRequired;
    this.daysToComplete = daysToComplete;
    this.frequencyInDays = frequencyInDays;
    this.priority = priority;

    this.count = 0;
    this.lastResetDate = DateTime.now();
    this.lastProgressDate = DateTime.now();
  }

  dueDate(): DateTime {
    return this.lastResetDate.plus({days: this.daysToComplete});
  }

  reset() {
    this.lastResetDate = DateTime.now();
  }

  finishedCount() {
    if (this.count < this.countRequired) {
      ++this.count;
      this.lastProgressDate = DateTime.now();
      if (this.isCompleted()) {
        this.reset();
      }
    }
  }

  isCompleted() {
    return this.count === this.countRequired;
  }

  countStillRequired(): number {
    return this.countRequired - this.count;
  }

  sortKey(): Array<number> {
    return [this.dueDate().toMillis(), this.priority, this.countStillRequired()];
  }
};

function compareRecTasks(a: RecTask, b: RecTask): number {
  let aKey = a.sortKey();
  let bKey = b.sortKey();
  for (let i = 0; i < aKey.length; ++i) {
    if (aKey[i] < bKey[i]) {
      return 1;
    } else if (aKey[i] > bKey[i]) {
      return -1;
    }
  }
  return 0;
}