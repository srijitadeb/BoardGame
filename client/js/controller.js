app.controller('formCtrl', function($scope, $http, $uibModal) {

    $scope.searchBtn = function(){
        $scope.item ={};
        var urlPrefix = 'https://randomform.herokuapp.com';
        $http({
            method: 'GET',
            url: urlPrefix,
            config: {
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                'Access-Control-Allow-Origin': 'flights.makemytrip.com'
            }
        }).then( function(response) {
            $scope.item = response.data.data;
            console.log($scope.item);
            $scope.showDiv = true;
            $scope.hideDiv = true;
        });
    }
    $scope.submitForm = function(){
       console.log("hi");
        var url = 'https://randomform.herokuapp.com/submit';
        $http({
            method:'POST',
            url:url,
             headers: {
                'Content-Type': 'application/json'
            },
            data: { bar: 'foo',
                    foo:'bar'
                 }
        }) .then( function(res) {
            if(res.data.success == true){
                 $scope.showDiv = !true;
                $scope.hideDiv = !true;
                if ($scope.myForm.$valid) {
                     $uibModal.open({
                            templateUrl: "winPopup",
                            size: "sm"
                        });
                }
            }
        });      
    }
   
});
	