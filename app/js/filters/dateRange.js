(function() {
    'use strict'

    const app = angular.module('myApp')

    app.filter('dateRange', function() {
        return function(items, fromDate, toDate) {
            var filtered = []
            var from_date = parseInt(fromDate)-1
            var to_date = parseInt(toDate)+1
            if (!to_date || !from_date) {
                return items
            }
            angular.forEach(items, function(item) {
                if (parseInt(item.ano) > from_date && parseInt(item.ano) < to_date) {
                    filtered.push(item)
                }
            })
            return filtered
        }
    })
})()