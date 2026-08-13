// =============================================================================

const readlineSync = require("readline-sync");

const students = [];

function showMenu() {
  console.log("\n================================");
  console.log("   STUDENT RECORD SYSTEM MENU");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

function calculateAverage(scores) {
  const total = scores.reduce((sum, score) => sum + score, 0);
  return total / scores.length;
}

function readNumber(prompt) {
  const value = Number(readlineSync.question(prompt).trim());
  return Number.isFinite(value) ? value : null;
}

function addStudent() {
  const name = readlineSync.question("Student name: ").trim();
  if (name === "") {
    console.log("Student name cannot be empty.");
    return;
  }

  const id = readNumber("Student ID: ");
  if (!Number.isInteger(id) || id < 0) {
    console.log("Invalid student ID. Please enter a whole number.");
    return;
  }

  if (students.some((student) => student.id === id)) {
    console.log("A student with that ID already exists.");
    return;
  }

  const scoreCount = readNumber("How many scores? ");
  if (!Number.isInteger(scoreCount) || scoreCount < 1) {
    console.log("Please enter a whole number greater than zero.");
    return;
  }

  const scores = [];
  for (let index = 1; index <= scoreCount; index += 1) {
    const score = readNumber(`Enter score ${index}: `);
    if (score === null) {
      console.log("Invalid score. Student was not added.");
      return;
    }
    scores.push(score);
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.`);
}

function displayAllStudents() {
  if (students.length === 0) {
    console.log("No student records have been added yet.");
    return;
  }

  console.log("\nName                 ID          Scores               Average");
  console.log("----------------------------------------------------------------");
  students.forEach((student) => {
    console.log(
      `${student.name.padEnd(21)} ${String(student.id).padEnd(11)} ${student.scores.join(", ").padEnd(20)} ${calculateAverage(student.scores).toFixed(2)}`
    );
  });
}

function displayStudentAverage() {
  const id = readNumber("Enter student ID: ");
  if (!Number.isInteger(id)) {
    console.log("Invalid student ID.");
    return;
  }

  const student = students.find((record) => record.id === id);
  if (!student) {
    console.log("Error: Student ID not found.");
    return;
  }

  console.log(`${student.name}'s average score: ${calculateAverage(student.scores).toFixed(2)}`);
}

function runStudentRecordSystem() {
  let isRunning = true;

  while (isRunning) {
    showMenu();
    const choice = readlineSync.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case "1":
        addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        displayStudentAverage();
        break;
      case "4":
        console.log("Goodbye!");
        isRunning = false;
        break;
      default:
        console.log("Invalid choice. Please enter a number from 1 to 4.");
    }
  }
}

runStudentRecordSystem();
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================


