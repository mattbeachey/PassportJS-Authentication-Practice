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
  //in this .then, you could send back the meeting ID in the res.JSON and then grab it here to display -
  //-that way there'd be no issue with the data not being ready before the DOM tries to display it
  .then(function (response) {
    console.log(response);
    refreshExamples();
})
.catch(function (error) {
    console.log(error);
});

}

modifyBtnEl.addEventListener("click", handleFormModify)