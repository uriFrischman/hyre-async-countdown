/**
 * Created by Uri on 2018-03-12.
 */
var app = angular.module('hyreTimerApp', []);

app.controller('timerCtrl', function ($scope, $timeout, $q) {

    // Function that is being called on 'submit'
    $scope.beginCountdown = function (amountOfSeconds) {

        // If the seconds input is null (empty) set the appropriate text fields. If not, proceed with calling async
        // timer function...
        if (amountOfSeconds == null) {
            writeToTargetDivText("");
            writeToErrorDivText("The number is blank. Please input a valid number");

        } else {

            // Construct target-div text based on inputted time:
            var targetDivText = "Please wait " + amountOfSeconds + " second" + (amountOfSeconds == 1 ? "." : "s.");

            // Write the targetDivText to the target-div immediately:
            writeToTargetDivText(targetDivText);
            writeToErrorDivText("");

            // Construct a promise:
            var promise = asyncTimer(amountOfSeconds);

            // Resolve the promise when the response arrives and show the appropriate text based on the state of the
            // response:
            promise.then(function (response) {
                if (response) {
                    writeToTargetDivText("Finished processing.");
                    $scope.timeInput = null;
                } else {
                    // There was a problem with the async function...
                }
            })
        }
    };

    // Async function that waits {amountOfSeconds} seconds
    function asyncTimer(amountOfSeconds) {

        // Return an Angular promise that is either resolved or rejected:
        return $q(function (success, error) {

            // Wait for time(seconds) * 1000 and then resolve function by returning true to the promise's success
            // function:
            $timeout(function () {
                success(true);
            }, amountOfSeconds * 1000)
        })
    }

    // Helper function to write text to the target div
    function writeToTargetDivText(text) {
        $scope.targetDivText = text;
    }

    // Helper function to write text to the error div
    function writeToErrorDivText(text) {
        $scope.errorDivText = text;
    }

});