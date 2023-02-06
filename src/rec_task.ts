  // TODO: how do I get today's date?

class RecTask {
  desc: String;
  countRequired: number;
  daysToComplete: number;
  frequencyInDays: number;
  priority: number;
  count: number;
  lastResetDate: Date;
  lastProgressDate: Date;

  constructor(desc: String, countRequired: number, daysToComplete: number, frequencyInDays: number, priority: number=0) {
    this.desc = desc;
    this.countRequired = countRequired;
    this.daysToComplete = daysToComplete;
    this.frequencyInDays = frequencyInDays;
    this.priority = priority;

    this.count = 0;
    this.lastResetDate = today();
    this.lastProgressDate = today();
  }

  dueDate(): Date {
    // TODO: How do I get the date this.daysToComplete days later than this.lastResetDate?
    return this.lastResetDate + this.daysToComplete;
  }

  reset() {
    this.lastResetDate = today();
  }

  finishedCount() {
    if (this.count < this.countRequired) {
      ++this.count;
      this.lastProgressDate = today();
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

  // TODO: what datastructure can be used as a sort key in TS?
  sortKey(): Array<number> {
    return [this.dueDate().getTime(), this.priority, this.countStillRequired()];
  }
};
