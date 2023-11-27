//runs after the document loads
$(document).ready(function () {
  //this gets the current day in the format of "Monday, January 1, 2021" and displays it in the header
  let today = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(today);

  //this saves the current hour for time comparison
  let currentHour = dayjs().hour();

  for (let i = 9; i <= 17; i++) {
    // creates the timeBlock div container
    let timeBlock = $("<div class='row time-block'></div>");
    timeBlock.attr("id", "hour-" + i);

    // adds a div to the beginning of the timeBlock to display the formatted hour
    let hourDiv = $("<div class='col-2 col-md-1 hour text-center py-3'></div>").text(formatHour(i));
    timeBlock.prepend(hourDiv);

    //adds a textarea to the end of the timeBlock which allows for user input
    let scheduleTextarea = $("<textarea class='col-8 col-md-10 description' rows='3'></textarea>");
    scheduleTextarea.text(getStorage("hour-" + i));
    timeBlock.append(scheduleTextarea);

    // adds a save button to the end of the timeblock with an icon in the middle
    let saveButton = $("<button class='btn saveBtn col-2 col-md-1' aria-label='save'></button>");
    saveButton.prepend("<i class='fas fa-save' aria-hidden='true'></i>");
    timeBlock.append(saveButton);

    // adds the past, present, and future classes to the timeblocks based on which hour of the day it is
    if(currentHour < i) {
      timeBlock.addClass("future");
    } else if (currentHour > i) {
      timeBlock.addClass("past");
    } else {
      timeBlock.addClass("present");
    }
    
    // adds the timeBlock to the container
    $("main").append(timeBlock);
  }

  // calls a function which handles save button event listeners 
  addEventListners();

  // Example of timeBlock div
  // <div id="hour-9" class="row time-block past">
  //    <div class="col-2 col-md-1 hour text-center py-3">9AM</div>
  //    <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
  //    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
  //      <i class="fas fa-save" aria-hidden="true"></i>
  //    </button>
  // </div>

});

//adds an events listener to all buttons with the class saveBtn
function addEventListners() {
  $(".saveBtn").on("click", function () {
    // traversing the DOM to get the id of the parent div and the value of the textarea
    let hour = this.parentNode.id;
    let text = $(this.parentNode.children[1]).val();
    
    // saves the text inside of the textarea to local storage if it exists
    if (text) {
      localStorage.setItem(hour, text);
    } else {
      return;
    }
  });
}

//uses the passed id parameter to find data in the local storage
//returns the data if found
function getStorage(id) {
  if(localStorage.getItem(id)) {
    return localStorage.getItem(id);
  } else return "";
}

//uses the passed dayjs() hour parameter (1-24)
//returns the hour in 12 hour AM / PM format
function formatHour(hour) {
  if(hour > 12) {
    return (hour - 12) + " PM";
  } else {
    return hour + " AM";
  }
}

