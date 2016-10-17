'use strict';

console.clear();

(function () {

  /* ======== Model ======== */
  var model = {
    init: function init() {
      if (!localStorage.students) {
        this.students = [{ name: 'Lilly the Lizard',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Bugs Bunny',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Slappy the Frog',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Bart Simpson',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Charlie Brown',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Popeye',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Eric Cartman',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Daffy Duck',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Scooby-Doo',
          hasAttendedList: [false, false, false, false, false]
        }, { name: 'Mickey Mouse',
          hasAttendedList: [false, false, false, false, false]
        }];
      } else {
        this.students = JSON.parse(localStorage.students);
      }
    }
  };

  /* ======== Controller ======== */
  var controller = {
    init: function init() {
      model.init();
      view.init();
    },

    calculateDaysMissed: function calculateDaysMissed(studentIndex) {
      return model.students[studentIndex].hasAttendedList.reduce(function (total, hasAttended) {
        if (!hasAttended) {
          return ++total;
        } else {
          return total;
        }
      }, 0);
    },

    flipOneDayAttendance: function flipOneDayAttendance(studentIndex, attendanceIndex) {
      model.students[studentIndex].hasAttendedList = [].concat(model.students[studentIndex].hasAttendedList.slice(0, attendanceIndex), [!model.students[studentIndex].hasAttendedList[attendanceIndex]], model.students[studentIndex].hasAttendedList.slice(attendanceIndex + 1));

      // Save attendance record to local storage when checkbox is clicked
      localStorage.students = JSON.stringify(model.students);
    }
  };

  /* ======== View ======== */
  var view = {
    init: function init() {

      // Select DOM element where the list of students will be mounted
      var tableBodyElement = document.getElementsByTagName('tbody')[0];

      // Show students data by looping through their records
      model.students.forEach(function (student, studentIndex) {
        var rowElement = document.createElement('tr');
        rowElement.className = 'student';
        tableBodyElement.appendChild(rowElement);

        var nameElement = document.createElement('td');
        nameElement.className = 'name-col';
        nameElement.textContent = student.name;
        rowElement.appendChild(nameElement);

        student.hasAttendedList.forEach(function (hasAttended, attendanceIndex) {
          var oneDayDataElement = document.createElement('td');
          oneDayDataElement.className = 'attend-col';
          rowElement.appendChild(oneDayDataElement);

          var oneDayInputElement = document.createElement('input');
          oneDayInputElement.type = 'checkbox';
          oneDayInputElement.checked = hasAttended;
          oneDayInputElement.addEventListener('click', function () {
            controller.flipOneDayAttendance(studentIndex, attendanceIndex);
            view.updateDaysMissedDisplay(studentIndex);
          });
          oneDayDataElement.appendChild(oneDayInputElement);
        });

        // Display the number of missed days
        var daysMissedElement = document.createElement('td');
        daysMissedElement.className = 'missed-col days';
        daysMissedElement.textContent = controller.calculateDaysMissed(studentIndex);
        rowElement.appendChild(daysMissedElement);
      });
    },

    // Update the number of missed days being displayed
    updateDaysMissedDisplay: function updateDaysMissedDisplay(studentIndex) {
      var daysMissedElement = document.getElementsByClassName('days')[studentIndex];
      daysMissedElement.textContent = controller.calculateDaysMissed(studentIndex);
    }
  };

  controller.init();
})();