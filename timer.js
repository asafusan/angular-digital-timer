'use strict';

angular.module('directives').directive('timer', [function () {

    var config =  {

        restrict: 'E',
        replace: true,
        templateUrl: 'app/learne/directives/timer/timer.html',
        link:link,
        scope: {
            time: "=",
            callback: "="
        }
    };

    function link(scope, element, attrs) {
        //var time = 60 * 60 * 3;
        var time = scope.time + 0.99,
            h1 = document.getElementById('hours1'),
            h2 = document.getElementById('hours2'),
            m1 = document.getElementById('minutes1'),
            m2 = document.getElementById('minutes2'),
            s1 = document.getElementById('seconds1'),
            s2 = document.getElementById('seconds2'),
            endTime = new Date()/1000 + time,
            interval = 0;


        function updateTime(newTime) {
            var hours1,
                hours2,
                minutes1,
                minutes2,
                seconds1,
                seconds2;
            var hours = Math.floor(newTime / 3600) % 24;
            newTime -= hours * 3600;
            hours2 = hours % 10;
            hours1 = (hours - hours2) / 10;
            var minutes = Math.floor(newTime / 60) % 60;
            newTime -= minutes * 60;
            minutes2 = minutes % 10;
            minutes1 = (minutes - minutes2) / 10;
            var seconds = Math.floor(newTime % 60);
            seconds2 = seconds % 10;
            seconds1 = (seconds - seconds2) / 10;

            updateTimer(hours1, hours2, minutes1, minutes2, seconds1, seconds2);
        }

        // DOM manipulation - chnges classes according to digits to display
        function updateTimer(a, b, c, d, e, f) {
            h1.setAttribute('class', numberToText(a));
            h2.setAttribute('class', numberToText(b));
            m1.setAttribute('class', numberToText(c));
            m2.setAttribute('class', numberToText(d));
            s1.setAttribute('class', numberToText(e));
            s2.setAttribute('class', numberToText(f));
        }

        var numberTextMap = {
            0: 'zero',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
            5: 'five',
            6: 'six',
            7: 'seven',
            8: 'eight',
            9: 'nine'
        };

        function numberToText(num) {
            return numberTextMap[num];
        }

        var runTimer = setInterval( function(interval) {
            interval = 1000;
            var remainingTime = endTime - new Date()/1000;
            updateTime(remainingTime);
            if (remainingTime < 1) {
                clearInterval(runTimer);
                scope.callback();
            }
        }, interval);
    }

    return config;
}]);
