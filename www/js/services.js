angular.module('pos.services', [])

    .factory('Session', ['$rootScope', function($rootScope) {
        var Session = {
            data: {},
            set: function(key, value) {
                Session.data[key] = value;
            },
            get: function(key) {
                return Session.data[key];
            },
            getCached: function(key, loader, callback) {
                if (null == Session.data[key]) {
                    console.log('Not in cache loading');
                    loader(function(data) {
                        Session.data[key] = data;
                        callback(data);
                    });
                } else {
                    console.log('in cache returning');
                    callback(Session.data[key]);
                }
            },
            getCurrentPosition: function(callback) {
                var ret = Session.data['CurrentPosition'];
                if (null == ret) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        Session.data['CurrentPosition'] = position;
                        callback(position);
                    }, function(error) {
                        Session.data['CurrentPosition'] = null;
                        callback(null);
                    });
                } else {
                    callback(ret);
                };
            },
            fireEvent: function(msgId, args) {
                $rootScope.$broadcast(msgId, args);
            },
            onEvent: function(msgId, handler) {
                $rootScope.$on(msgId, function(event, args) {
                    handler(args);
                });
            }
        };
        return Session;
    }])

    .service('orderCart', [function() {
        var orderCart = {
            id: "110",
            counter: 110,
            entries: [],
            count: 0,
            total: 0,
            tax: 9.5,
            promos: [],
            order: {},
            payment: {
                number: "",
                expMonth: "",
                expYear: "",
                cvc: ""
            },
            response: {
            },
            init: function() {
            },
            add: function(item) {
                var existing = this.entries.find(function(entry) {
                    return entry.item.id === item.id;
                });
                if (null == existing) {
                    existing = {
                        item: item,
                        qty: 1
                    }
                    this.entries.push(existing);
                } else {
                    existing.qty += 1;
                }
                this.count++;
                this.total += item.priceValue;
            },
            clear: function() {
                this.counter += 1;
                this.id = "" + orderCart.counter;
                this.entries = [];
                this.promos = [];
                this.count = 0;
                this.total = 0;
                this.order = {};
                this.payment = {
                    number: "",
                    expMonth: "",
                    expYear: "",
                    cvc: ""
                };
                this.response = {
                };
            }
        };
        return orderCart;
    }])

    .service('dongleSwipe', ['moment', function(moment) {
        var dongleSwipe = {
            initialized: false,
            connected: false,
            init: function() {
                if (!this.initialized) {
                    this.initialized = true;
                    this.connected = true;
                }
            },
            startSwipe: function(callback) {
                callback({
                    first_name: "Saravana",
                    last_name: "Shanmugam",
                    card_number: "343434343434343",
                    expiry_year: moment().add('1', 'y').year(),
                    expiry_month: moment().add('1', 'y').month(),
                    cvc: "123",
                    status: true
                })
            }
        };
        return dongleSwipe;
    }])
    .factory('POSService', function(POSApi, Session) {
        var ret = {
            groupSize: function() {
                return 3;
            },
            group: function(array, blocks) {
                var ret = [];
                var block = [];
                array.forEach(function(entry) {
                    if (block.length == blocks) {
                        ret.push(block);
                        block = []
                    }
                    block.push(entry);
                });
                if (0 < block.length) {
                    for (var idx = block.length; idx < blocks; idx++) {
                        block.push([]);
                    }
                    ret.push(block);
                }
                return ret;
            },
            menu: function(cached, callback) {
                if (cached) {
                    Session.getCached('menu', function(loaderCallback) {
                        POSApi.menu(function(data) {
                            if (null != data) {
                                loaderCallback(data.menu);
                            }
                        });
                    }, function(data) {
                        callback(data);
                    });
                } else {
                    POSApi.menu(function(data) {
                        if (null != data) {
                            callback(data.menu);
                        }
                    });
                }
            },
            orders: function(cached, callback) {
                if (cached) {
                    Session.getCached('orders', function(loaderCallback) {
                        POSApi.orders(function(data) {
                            if (null != data) {
                                loaderCallback(data.orders);
                            }
                        });
                    }, function(data) {
                        callback(data);
                    });
                } else {
                    POSApi.orders(function(data) {
                        if (null != data) {
                            callback(data.orders);
                        }
                    });
                }
            },
            confirm: function(req, callback) {
                POSApi.confirm(req, function(data) {
                    if (null != data) {
                        callback(data);
                    }
                });
            },
            tax: function(req, callback) {
                var ret = {};
                ret.food = req.total
                ret.tax = req.total * req.tax / 100;
                ret.total = ret.food + ret.tax;
                callback(ret);
            },
            payment: function(req, callback) {
                setTimeout(function() {
                    callback({
                        id: req.id,
                        amount: req.order.total,
                        desc: 'Thank you for your purchase, your order is being prepared. Your order number is ' + req.id,
                        status: true
                    });
                }, 1000);
            }
        };
        return ret;
    });
