module.exports = (app) => {
    'use strict';

    app.directive('rainBills', RainBillsDirective);

    function RainBillsDirective() {
        return {
            restrict: 'A',
            scope: {
                rainBills: '<'
            },
            link: link
        };

        function link(scope, element) {

            if (scope.rainBills) {
                throwBills();
                setInterval(throwBills, 23000);
            }

            function throwBills() {
                const maxBills = 15;

                for (let i = 0; i < maxBills; i++) {
                    const random = 330;
                    const randomPosition = Math.floor(random * Math.random());
                    const randomTime = Math.random() * 20;
                    const randomSpeed = (Math.random() * 20) + 10;

                    const bills = $("<span class='billsBillsBills'>")
                        .css({
                            left: randomPosition,
                            top: '-50px',
                            "-webkit-animation-delay": randomTime + "s",
                            "-webkit-animation-duration": randomSpeed + "s"
                        });

                    $(bills).prepend('<img src="images/bill.png"  width="40px" alt="a dollar bill">');

                    element.append(bills);
                }
            }
        }
    }
};