app.controller('gridgameCtrl', function($scope, $interval , $uibModal) {

    $scope.shuffleArray =function(array){
        for (var i =0; i<array.length; i++) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i].colorIndex;
            array[i].colorIndex = array[j].colorIndex;
            array[j].colorIndex = temp;
        }
        return array;
    }
    $scope.allcolors = [];
    $scope.timer;
    $scope.setup = function(){
        $scope.colors = ['red', 'green', 'blue', 'yellow'];
        for(var i=0; i<16;i++){
            $scope.allcolors.push({
                isVisible: false,
                isMatched: false,
                gridIndex: i,
                colorIndex: (i+1) % 4
            });
        }
        $scope.allcolors = $scope.shuffleArray($scope.allcolors);
        $scope.oldGrid = {color : null};
        $scope.scoreMatch = 0;
        $scope.timeOut = 60;
    }
    $scope.updateTime =function(){
        if($scope.timeOut >0){
            $scope.timeOut--;
        }else{
            alert("Time Out! Please try again later.")
        }
    }
    $scope.addColor = function(grid){
        console.log(grid);
        console.log($scope.allcolors);
        var selectedGrids = $scope.allcolors.filter(function(x){
            return x.isVisible && !x.isMatched? true: false;
        });
        if(selectedGrids.length > 1){
            selectedGrids.forEach(function(x){
                console.log(x);
                $scope.allcolors[x.gridIndex].isVisible = false;
            });
            $scope.allcolors[grid.gridIndex].isVisible = true;
        }
        else {
            $scope.allcolors[grid.gridIndex].isVisible = true;
            if(selectedGrids.length === 1) {
                if(selectedGrids[0].colorIndex === grid.colorIndex) {
                    $scope.allcolors[selectedGrids[0].gridIndex].isMatched = true;
                    $scope.allcolors[grid.gridIndex].isMatched = true;  
                    $scope.scoreMatch ++;
                    if($scope.scoreMatch == 8){
                        $uibModal.open({
                            templateUrl: "winPopup",
                            size: "sm"
                        });
                        $interval.cancel($scope.timer);
                    }
                }
            }
        }
    }
    $scope.startGmae = function(){
            $scope.hideDiv = true;
            $scope.timer = $interval($scope.updateTime, 1000);
    };
    $scope.tiles = $scope.setup($scope.colors);

});
	