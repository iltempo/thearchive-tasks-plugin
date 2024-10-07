const ownFilename = output.changeFile.filename;
const tasksRegex = /\[\s\].*/g;
let body = "Tasks:\n";

for (let note of input.notes.all) {
  // Skip the tasks file itself so that it does not collect it's tasks again.
  if (note.filename === ownFilename) { continue; }

  // Find notes that contain tasks
  if (note.content.match(tasksRegex) !== null) {
    // Write note links
    body += "\n[[" + note.filename + "]]\n";

    for (taskMatch of note.content.matchAll(tasksRegex)) {
      // Write tasks found as a Markdown list
      body += "- " + taskMatch + "\n";
    }
  }
}

output.changeFile.content = body;