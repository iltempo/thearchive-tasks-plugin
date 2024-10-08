// Supported task formats are:
//
// - [ ] Task
// * [ ] Task
// 99. [ ] Task
//
// Test the regular expression here: https://regex101.com/r/bmfG3m/1 

const ownFilename = output.changeFile.filename;
const tasksRegex = /([-*]|[\d.]*) \[ \].*/g;
let body = "Tasks:\n";

for (let note of input.notes.all) {
  // Skip the tasks file itself so that it does not collect it's tasks again.
  if (note.filename === ownFilename) { continue; }

  // Find notes that contain tasks
  if (note.content.match(tasksRegex) !== null) {
    // Write note links
    body += "\n[[" + note.filename + "]]\n\n";

    for (taskMatch of note.content.matchAll(tasksRegex)) {
      // Write tasks found as a Markdown list
      body += taskMatch[0] + "\n";
    }
  }
}

output.changeFile.content = body;