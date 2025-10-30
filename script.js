const addCourseBtn = document.getElementById("addCourse");
const courseContainer = document.getElementById("courseContainer");
const form = document.getElementById("cgpaForm");
const cgpaValue = document.getElementById("cgpaValue");
const feedbackMessage = document.getElementById("feedbackMessage");

// Add new course row
addCourseBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.classList.add("course");
  div.innerHTML = `
    <input type="text" placeholder="Course Name" class="course-name" required>
    <input type="number" placeholder="Credits" class="course-credit" min="1" required>
    <input type="number" placeholder="Grade (0–10)" class="course-grade" min="0" max="10" step="0.01" required>
  `;
  courseContainer.appendChild(div);
});

// Calculate CGPA on submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const creditInputs = document.querySelectorAll(".course-credit");
  const gradeInputs = document.querySelectorAll(".course-grade");

  let totalCredits = 0;
  let totalPoints = 0;

  for (let i = 0; i < creditInputs.length; i++) {
    const credit = parseFloat(creditInputs[i].value);
    const grade = parseFloat(gradeInputs[i].value);

    // Validate inputs
    if (isNaN(credit) || isNaN(grade) || credit <= 0 || grade < 0 || grade > 10) {
      feedbackMessage.textContent = "Please enter valid credits and grades (0–10).";
      feedbackMessage.style.color = "#ff4b5c";
      return;
    }

    totalCredits += credit;
    totalPoints += credit * grade;
  }

  const cgpa = totalPoints / totalCredits;
  cgpaValue.textContent = cgpa.toFixed(2);

  // Feedback method
  const feedback = getFeedback(cgpa);
  feedbackMessage.textContent = feedback.message;
  feedbackMessage.style.color = feedback.color;
});

// Feedback method (based on CGPA)
function getFeedback(cgpa) {
  if (cgpa >= 9) {
    return { message: "Excellent 🌟 Keep it up!", color: "#0b8457" };
  } else if (cgpa >= 8) {
    return { message: "Very Good 👍 You're doing great!", color: "#1f8ef1" };
  } else if (cgpa >= 7) {
    return { message: "Good 😊 You can aim higher!", color: "#f6a609" };
  } else if (cgpa >= 6) {
    return { message: "Average ⚖️ Focus on improvement.", color: "#f39c12" };
  } else {
    return { message: "Needs Improvement 📘 Keep working hard!", color: "#ff4b5c" };
  }
}


 
       

       