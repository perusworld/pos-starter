angular.module('pos.api', [])

    .service('RandomOrdersApi', ['moment', 'orderCart', function (moment, orderCart) {
        var ret = {
            prefix: 100,
            dummyData: {
                orders: []
            },
            status: function (arr) {
                return arr[Math.floor((Math.random() * arr.length) + 1) - 1];
            },
            genPastOrder: function (idx) {
                return {
                    status: ret.status(["Fulfilled", "Fulfilled", "Cancelled", "Fulfilled", "Fulfilled"]),
                    date: moment().subtract(Math.floor((Math.random() * 30) + 1), 'days').format('MM/DD/YYYY')
                }
            },
            genCurrentOrder: function (idx) {
                return {
                    status: ret.status(["Fulfilled", "In Progress", "Cancelled", "Fulfilled", "Fulfilled"]),
                    date: moment().format('MM/DD/YYYY')
                }
            },
            genOrders: function (past, today, callback) {
                if (0 == ret.dummyData.orders.length) {
                    for (var idx = 0; idx < past; idx++) {
                        ret.dummyData.orders.push(ret.genPastOrder(idx));
                    }
                    for (var idx = 0; idx < today; idx++) {
                        ret.dummyData.orders.push(ret.genCurrentOrder(idx));
                    }
                }
                ret.dummyData.orders.sort(function (a, b) {
                    return (moment(a.date, "MM/DD/YYYY").valueOf() - moment(b.date, "MM/DD/YYYY").valueOf());
                });
                ret.dummyData.orders.forEach(function (entry, idx) {
                    entry.id = ret.prefix + idx;
                    entry.name = "Order " + (ret.prefix + idx);
                });
                ret.dummyData.orders.sort(function (a, b) {
                    return -1 * (moment(a.date, "MM/DD/YYYY").valueOf() - moment(b.date, "MM/DD/YYYY").valueOf());
                });
                orderCart.counter = ret.prefix + past + today - 1;
                orderCart.clear();
                callback(ret.dummyData);
            },
            confirmOrder: function (req, callback) {
                ret.dummyData.orders.unshift({
                    id: parseInt(req.id),
                    name: "Order " + req.id,
                    status: "In Progress",
                    date: moment().format('MM/DD/YYYY')
                })
                callback({
                    status: true
                });
            }
        };
        return ret;
    }])

    .service('POSApi', ['$http', 'RandomOrdersApi', function ($http, RandomOrdersApi) {
        var ret = {
            getJson: function (file, callback) {
                $http.get('/data/' + file).then(function successCallback(response) {
                    callback(response.data)
                }, function errorCallback(response) {
                    callback(null);
                });
            },
            menu: function (callback) {
                var data = {
                }
                $http.post('/menu', data).then(function successCallback(response) {
                    callback(response.data)
                }, function errorCallback(response) {
                    ret.getJson("menu.json", callback);
                });
            },
            orders: function (callback) {
                var data = {
                }
                $http.post('/orders', data).then(function successCallback(response) {
                    if (response.data.orders) {
                        callback(response.data)
                    } else {
                        RandomOrdersApi.genOrders(100, 10, callback);
                    }
                }, function errorCallback(response) {
                    RandomOrdersApi.genOrders(100, 10, callback);
                });
            },
            confirm: function (req, callback) {
                $http.post('/confirm', req).then(function successCallback(response) {
                    if (response.data.status) {
                        callback(response.data)
                    } else {
                        RandomOrdersApi.confirmOrder(req, callback);
                    }
                }, function errorCallback(response) {
                    RandomOrdersApi.confirmOrder(req, callback);
                });
            }
        };
        return ret;

    }]);

