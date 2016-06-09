(function (GAUGE, $) {
    //////////////////////////
    //   HOME CONTROLLER    //
    //////////////////////////
    'use strict';
    GAUGE.controller('ChartController', ['$http', '$log', '$timeout', '$window', '$scope', function ($http, $log, $timeout, $window, $scope) {
        var self = this,
            statusJsonLoaded = 0,
            chartOptions = {};
        self.brands = null;
        self.users = null;
        self.interactions = null;
        self.allDataLoaded = false;
        self.user = null;
        self.currentBrand = 'all';
        var defineChartOptions = function () {
            //define chart options
            var brands = [],
                share = [],
                comment = [],
                favorite = [],
                i = 0;
            //get brands
            for (i = 0; i < self.brands.length; i += 1) {
                brands.push(self.brands[i].name);
                share.push(self.user.interactions[self.brands[i].id].SHARE);
                comment.push(self.user.interactions[self.brands[i].id].COMMENT);
                favorite.push(self.user.interactions[self.brands[i].id].FAVORITE);
            }
            chartOptions = {
                chart: {
                    type: 'column'
                },
                title: {
                    text: 'Interactions by ' + self.user.login.username
                },
                subtitle: {
                    text: 'Interactions per brand'
                },
                xAxis: {
                    categories: brands,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Interactions'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'Share',
                    data: share
                }, {
                    name: 'Comment',
                    data: comment
                }, {
                    name: 'Favorite',
                    data: favorite
                }]
            };
            //$log.log(chartOptions);
        };
        var initDataControl = function () {
            //put interactions inside respective users
            var i = 0,
                y = 0,
                j = 0,
                totalInteractions = 0;
            for (i = 0; i < self.users.length; i += 1) {
                self.users[i].interactions = {};
                totalInteractions = 0;
                //INSTANCE BRAND FOR EACH USER
                for (j = 0; j < self.brands.length; j += 1) {
                    self.users[i].interactions[self.brands[j].id] = {
                        brand_name: self.brands[j].name,
                        totalInteractions: 0,
                        SHARE: 0,
                        COMMENT: 0,
                        FAVORITE: 0,
                        brand_image: self.brands[j].image
                    };
                }
                //COUNT TOTAL OF INTERACTIONS PER BRAND
                for (y = 0; y < self.interactions.length; y += 1) {
                    if (self.interactions[y].user === self.users[i].id) {
                        self.users[i].interactions[self.interactions[y].brand].totalInteractions += 1;
                        self.users[i].interactions[self.interactions[y].brand][self.interactions[y].type] += 1;
                        totalInteractions += 1;
                    }
                }
                self.users[i].totalInteractions = totalInteractions;
            }
            if (self.user !== null) {
                defineChartOptions();
            }
            self.allDataLoaded = true;
        };
        var dataLoadingStatus = function () {
            statusJsonLoaded += 1;
            if (statusJsonLoaded >= 3) {
                initDataControl();
            }
        };
        //////////////////
        // LOAD BRANDS  //
        //////////////////
        $http.get('data/brands.json').success(function (data) {
            self.brands = data;
            dataLoadingStatus();
        });
        /////////////////
        // LOAD USERS  //
        /////////////////
        $http.get('data/users.json').success(function (data) {
            self.users = data;
            dataLoadingStatus();
        });
        ////////////////////////
        // LOAD INTERACTIONS  //
        ////////////////////////
        $http.get('data/interactions.json').success(function (data) {
            self.interactions = data;
            dataLoadingStatus();
        });
        //////////////////////////
        // SET CURRENT USER ID  //
        //////////////////////////
        self.setCurrentUserID = function (id) {
            var i = 0;
            for (i = 0; i < self.users.length; i += 1) {
                if (self.users[i].id === id) {
                    self.user = self.users[i];
                    defineChartOptions();
                    $timeout(function () {
                        $('#interaction-chart').highcharts(chartOptions);
                    });
                    $log.log(self.user);
                    break;
                }
            }
        };
        ///////////////////
        // BRAND FILTER  //
        ///////////////////
        $scope.brandFilter = function () {
            return function (item) {
                if (self.currentBrand === 'all') {
                    return item.totalInteractions > 0;
                }
                return item.interactions[parseInt(self.currentBrand)].totalInteractions > 0;
            };
        };
        /////////////////
        // BRAND SORT  //
        /////////////////
        $scope.brandSort = function (item) {
            if (self.currentBrand === 'all') {
                return item.totalInteractions;
            }
            return item.interactions[parseInt(self.currentBrand)].totalInteractions;
        };
        $($window).resize(function () {
            if (self.user !== null) {
                $('#interaction-chart').highcharts(chartOptions);
            }
        });
    }]);
}(this.GAUGE, this.jQuery));