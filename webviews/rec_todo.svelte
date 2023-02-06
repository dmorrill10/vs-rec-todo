<script lang="ts">
  import { RecTask } from "rec_task";

  let tasks: Array<RecTask> = [];

  let createTask = (desc: String, countRequired: number, daysToComplete: number, frequencyInDays: number, priority: number=0) => {
    tasks = [...tasks, new RecTask(desc, countRequired, daysToComplete, frequencyInDays, priority)];
  };
</script>

<!-- TODO: how do I trigger submit with a button? -->
<!-- TODO: do I pass the form values from the event handler? -->
<form on:submit={createTask}>
  <input, label="desc"><input>
  <input, label="count"><input>
  <input, label="daysToComplete"><input>
  <input, label="frequency"><input>
  <input, label="priority", default=0><input>
  <button on:click={submit()}>Create</button>
</form>

<!-- TODO: sort according to sortKey -->
<!-- TODO: ensure this is updated every time any element is created or updated. -->
{#each sorted(tasks) as task}
   <ul>
    <!-- TODO: show each task -->
    <!-- TODO: color code each task -->
    <!-- TODO: button to edit task -->
   </ul>
{/each}
