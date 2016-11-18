angular.module('pos.routes', [])

    .config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('tabs', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })
            .state('tabs.orders', {
                url: '/orders',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/orders.html',
                        controller: 'OrdersCtrl'
                    }
                }
            })
            .state('tabs.order-menu', {
                url: '/menu',
                views: {
                    'tab-menu': {
                        templateUrl: 'templates/menu.html',
                        controller: 'OrderMenuCtrl'
                    }
                }
            })
            .state('tabs.new-order', {
                url: '/new-order',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/new-order.html',
                        controller: 'NewOrderCtrl'
                    }
                }
            })
            .state('tabs.select-menu-item', {
                url: '/select-menu-item',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/select-menu-item.html',
                        controller: 'SelectMenuItemCtrl'
                    }
                }
            })
            .state('tabs.checkout', {
                url: '/checkout',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/card-details.html',
                        controller: 'CardDetailsCtrl'
                    }
                }
            })
            .state('tabs.confirm', {
                url: '/confirm',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/confirm.html',
                        controller: 'ConfirmCtrl'
                    }
                }
            })
            .state('tabs.payment-done', {
                url: '/payment-done',
                views: {
                    'tab-orders': {
                        templateUrl: 'templates/payment-done.html',
                        controller: 'PaymentDoneCtrl'
                    }
                }
            })
            .state('tabs.sales', {
                url: '/sales',
                views: {
                    'tab-sales': {
                        templateUrl: 'templates/sales.html',
                        controller: 'SalesCtrl'
                    }
                }
            })
            ;

        $urlRouterProvider.otherwise('/tab/orders');

    })

