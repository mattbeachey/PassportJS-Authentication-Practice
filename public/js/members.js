let identifier

$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    identifier = data.email;
  });
});

const modifyInputEl = document.getElementById("modify-input")
const modifyBtnEl = document.getElementById("modify-button")

const handleFormModify = function(event) {
  console.log(identifier)
  event.preventDefault();
  const userInput = {
    email: identifier,
    newValue: modifyInputEl.value.trim()
  };
  console.log(userInput)
  axios.put(`/api/examples/${userInput.email}`, userInput)
  .then(function (response) {
    console.log(response);
    refreshExamples();
})
.catch(function (error) {
    console.log(error);
});

}

modifyBtnEl.addEventListener("click", handleFormModify)