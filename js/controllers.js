angular.module('pos.controllers', [])

    .controller('OrdersCtrl', ['$scope', '$state', 'POSService', function($scope, $state, POSService) {
        $scope.orders = [];
        POSService.orders(false, function(data) {
            if (null != data) {
                $scope.orders = data;
            }
        });
        $scope.newOrder = function() {
            $state.go('tabs.new-order');
        };
    }])

    .controller('OrderMenuCtrl', ['$scope', 'POSService', function($scope, POSService) {
        $scope.menu = [];
        $scope.grouped = [];
        POSService.menu(false, function(data) {
            if (null != data) {
                $scope.menu = data;
                $scope.grouped = POSService.group(data, POSService.groupSize());
            }
        });
    }])

    .controller('NewOrderCtrl', ['$scope', '$state', 'POSService', 'orderCart', 'dongleSwipe', function($scope, $state, POSService, orderCart, dongleSwipe) {
        $scope.orderCart = orderCart;
        dongleSwipe.init();
        orderCart.init();

        $scope.doPayment = function() {
            $state.go('tabs.checkout', {}, { reload: true });
        };

        $scope.clearCart = function() {
            $scope.orderCart.clear();
        };

    }])

    .controller('SelectMenuItemCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'POSService', 'orderCart', function($scope, $state, $ionicHistory, $ionicLoading, POSService, orderCart) {
        $scope.menu = [];
        $scope.grouped = [];
        $scope.orderCart = orderCart;
        POSService.menu(false, function(data) {
            if (null != data) {
                $scope.menu = data;
                $scope.grouped = POSService.group(data, POSService.groupSize());
            }
        });

        $scope.addToCart = function(menu) {
            $ionicLoading.show({
                template: 'Adding...',
                duration: 500
            }).then(function() {
                orderCart.add(menu);
            });
        };
    }])

    .controller('CardDetailsCtrl', ['$scope', '$state', 'POSService', 'orderCart', 'dongleSwipe', function($scope, $state, POSService, orderCart, dongleSwipe) {
        $scope.orderCart = orderCart;
        $scope.dongleSwipe = dongleSwipe;
        var dte = new Date();
        dte.setFullYear(dte.getFullYear() + 1);

        $scope.$on('$ionicView.beforeEnter', function() {
            if (dongleSwipe.connected) {
                $scope.payment = {
                    name: null,
                    card: null,
                    expiry: dte,
                    cvc: null
                };
                dongleSwipe.startSwipe(function(data) {
                    if (data.status) {
                        $scope.payment.name = data.first_name + ' ' + data.last_name;
                        $scope.payment.card = data.card_number;
                        dte.setFullYear(parseInt(data.expiry_year));
                        dte.setMonth(parseInt(data.expiry_month));
                        $scope.payment.cvc = data.cvc;
                        $scope.payment.expiry = dte;
                    }
                });
            } else {
                $scope.payment = {
                    name: "Saravana Shanmugam",
                    card: "5555555555554444",
                    expiry: dte,
                    cvc: "123"
                };

            }
        });

        $scope.loadPayment = function(payment) {
            var month = new String(payment.expiry.getMonth() + 1);
            var year = new String(payment.expiry.getYear());
            if (2 < year.length) {
                year = year.substr(year.length - 2, 2);
            }
            orderCart.payment = {
                card: payment.card,
                expMonth: month,
                expYear: year,
                cvc: payment.cvc,
                verifyToken: new Date().toUTCString()
            };
            $scope.payment = {
                name: null,
                card: null,
                expiry: dte,
                cvc: null
            };
            $state.go('tabs.confirm');
        };
    }])

    .controller('ConfirmCtrl', ['$scope', '$state', '$ionicLoading', 'orderCart', 'POSService', function($scope, $state, $ionicLoading, orderCart, POSService) {
        $scope.orderCart = orderCart;
        POSService.tax(orderCart, function(data) {
            orderCart.order = data;
        });

        $scope.doConfirm = function() {
            $ionicLoading.show({
                template: 'Processing, Please wait...'
            }).then(function() {
                POSService.payment(orderCart, function(response) {
                    orderCart.response = response;
                    if (response.status) {
                        POSService.confirm(orderCart, function(data) {
                            $ionicLoading.hide().then(function() {
                                $state.go('tabs.payment-done');
                            });
                        });
                    }
                });
            });
        };

    }])

    .controller('PaymentDoneCtrl', ['$scope', '$state', '$ionicHistory', '$ionicLoading', 'orderCart', function($scope, $state, $ionicHistory, $ionicLoading, orderCart) {
        $scope.confirmation = orderCart.response;

        $scope.$on('$ionicView.beforeEnter', function() {
            orderCart.clear();

            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        });


        $scope.clearCart = function() {
            $state.go('tabs.orders');
        };

        $scope.emailClearCart = function() {
            $ionicLoading.show({
                template: 'Emailing receipt, Please wait...',
                duration: 1000
            }).then(function() {
                setTimeout(function() {
                    $state.go('tabs.orders');
                }, 1000);
            });
        };
    }])

    .controller('SalesCtrl', ['$scope', '$state', '$window', 'POSService', function($scope, $state, $window, POSService) {
        $scope.orders = [];
        $scope.chartData = [];
        $scope.groupedKeys = [];
        $scope.grouped = [];
        $scope.chart = {
            height: $window.innerHeight - 100,
            period: "Today",
            done: [],
            prog: [],
            canc: []
        };
        $scope.xAxisTickFormat = function() {
            return function(value) {
                return moment(value).format("D MMM");
            };
        }
        $scope.reload = function(callback) {
            POSService.orders(false, function(data) {
                if (null != data) {
                    $scope.orders = data;
                    $scope.groupedKeys = [];
                    $scope.grouped = [];
                    var val = data.reduce(function(total, dtl) {
                        var key = dtl.date;
                        if (-1 == $scope.groupedKeys.indexOf(key)) {
                            $scope.groupedKeys.push(key);
                            $scope.grouped.push({
                                date: dtl.date,
                                done: {
                                    count: 0
                                },
                                prog: {
                                    count: 0
                                },
                                canc: {
                                    count: 0
                                }
                            });
                        }
                        if (dtl.status == "Fulfilled") {
                            $scope.grouped[$scope.groupedKeys.indexOf(key)].done.count++;
                        } else if (dtl.status == "Cancelled") {
                            $scope.grouped[$scope.groupedKeys.indexOf(key)].canc.count++;
                        } else if (dtl.status == "In Progress") {
                            $scope.grouped[$scope.groupedKeys.indexOf(key)].prog.count++;
                        }

                        return total + 1;
                    }, 0);
                    callback();
                }
            });
        }
        $scope.todays = function() {
            $scope.chart.done = [];
            $scope.chart.prog = [];
            $scope.chart.canc = [];
            $scope.chart.period = "Today's";
            $scope.reload(function() {
                var dtl = $scope.grouped[$scope.groupedKeys.indexOf(moment().format('MM/DD/YYYY'))];
                if (null != dtl) {
                    $scope.chart.done.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.done.count]);
                    $scope.chart.prog.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.prog.count]);
                    $scope.chart.canc.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.canc.count]);
                    $scope.chartData = [
                        {
                            "key": "Fulfilled",
                            "values": $scope.chart.done
                        },
                        {
                            "key": "Cancelled",
                            "values": $scope.chart.canc
                        },
                        {
                            "key": "In Progress",
                            "values": $scope.chart.prog
                        }
                    ];
                }
                console.log($scope.chartData);
            });
        };
        $scope.all = function() {
            $scope.chart.done = [];
            $scope.chart.prog = [];
            $scope.chart.canc = [];
            $scope.chart.period = "All";
            $scope.reload(function() {
                $scope.grouped.forEach(function(dtl) {
                    $scope.chart.done.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.done.count]);
                    $scope.chart.prog.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.prog.count]);
                    $scope.chart.canc.push([moment(dtl.date, 'MM/DD/YYYY').valueOf(), dtl.canc.count]);
                });
                $scope.chartData = [
                    {
                        "key": "Fulfilled",
                        "values": $scope.chart.done
                    },
                    {
                        "key": "Cancelled",
                        "values": $scope.chart.canc
                    },
                    {
                        "key": "In Progress",
                        "values": $scope.chart.prog
                    }
                ];
                console.log($scope.chartData);
            });
        };
        $scope.todays();
    }])
    ;