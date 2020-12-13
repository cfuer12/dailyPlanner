//where everything starts to make scheduler
$(document).ready(function () {
    var container = $('.container');
    //added the date today function so user can have a time stamp of the current day
    $('#todays-date').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));

    //using this function, it makes the time appear in correct time format (9am - 5pm)
    function formatTime(i) {
        if (i === 12) {
            return '12PM';
        }

        if (i > 12) {
            return `${i - 12}PM`
        }

        return `${i}AM`
    }
    //for loop is creating the hours on the scheduler
    for (let i = 9; i < 18; i++) {
        console.log(i);
        //create the gray blocks from 9am to 5pm
        const timeBlock = $('<div>')
            .attr('id', `${i}`)
            .addClass('row time-block past');
            

        //create the time to show off the side of the schedule
        timeBlock.append($('<div>').addClass('col-md-1 hour').text(formatTime(i)));
        //make a typable interface inside of the gray box
        timeBlock.append($('<textarea>').addClass('col-md-10 description'));
        //create a save button to save to a local
        timeBlock.append(
            $('<button>')
                .addClass('btn saveBtn col-md-1')
                .append($('<i>').addClass('fas fa-save'))
        );

        //made the time blocks for the app, depicting times from 9am to 5pm
        container.append(timeBlock);
    }
    //making the save button function and work to locastorage
    $('.saveBtn').on("click", function () {
        var time = $(this).parent().attr('id');
        var value = $(this).siblings('.description').val();
        
        //add items to localstorage
        localStorage.setItem(time, value);
    })
    //adding the items to the local storage
    for (let i = 9; i <= 18; i++) {
        $(`#${i}`).children('textarea').val(localStorage.getItem(i));
    }
    //make the schedule color coded based on time: gray is past, green is future, and red is present
    //function checkHour needs a little more work to depict the differet colors
    //was getting help from other clasmates, but no luck
    function checkHour() {
        const currentHour = moment().hours();
        //present hour function
        $("btn").each(function(){
            const elementHour = $(this).parent().attr('id');
            if (currentHour == elementHour) {
                $(this).siblings("textarea").removeClass("past future")
                $(this).siblings("textarea").addClass("present")
                console.log("present");
            }
            //past hour functiion
            else if (currentHour > elementHour) {
                $(this).siblings("textarea").removeClass("present future")
                $(this).siblings("textarea").addClass("past")
                console.log("past");
            }
            //future hour function
            else if (currentHour < elementHour) {
                $(this).siblings("textarea").removeClass("past present")
                $(this).siblings("textarea").addClass("future")
                console.log("future");
            }
        })
        
    }

   
   

})