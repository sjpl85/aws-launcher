angular.module('appControllers')
    .controller('IndexCtrl', function($scope, $interval, mainConfig, model, EC2) {
        $scope.hasError = false;
        $scope.EC2Service = new EC2();

        $scope.stop = function(instance) {
            if (instance.State.Code != 80) {
                $scope.EC2Service.stopInstance(instance.InstanceId, stopSuccess, errorHandler);
            }
        }
        $scope.start = function(instance) {
            if (instance.State.Code == 80) {
                $scope.EC2Service.startInstance(instance.InstanceId, startSuccess, errorHandler);
            }
        }
        $scope.terminate = function(instance) {
            if (instance.State.Code == 80 || instance.State.Code == 16) {
                $scope.EC2Service.terminateInstance(instance.InstanceId, terminateSuccess, errorHandler);
            }
        }
        $scope.launchInstance = function() {
            var launch = true;
            if ($scope.instances) {
                _.each($scope.instances, function(instance) {
                  if (instance.State.Code != 48) {
                      launch = false;
                  }
                });
            }
            if (launch) {
                $scope.EC2Service.launchInstance(launchSuccess, errorHandler);
            }
        }
        $scope.logout = function() {
            console.log("Login correctly");
            $scope.loggedIn = false;
            $scope.hasError = false;
            update_from_aws = undefined;
        }
        $scope.login = function() {
            $scope.hasError = false;
            $scope.loggedIn = true
            $scope.canLaunchInstance = false;
            $scope.updated_instances_ids = undefined
            $scope.instances = []

            AWS.config.region = mainConfig.region;
            AWS.config.sslEnabled = false;
            AWS.config.credentials = new AWS.Credentials({
                accessKeyId: $scope.accessKeyID,
                secretAccessKey: $scope.secretAccessKey,
            });

            var update_from_aws = $interval(function() {
                if (!$scope.loggedIn) $interval.cancel(update_from_aws);
                $scope.EC2Service.getInstances(connectionSuccess, errorHandler);
            }, mainConfig.refreshTime);
        }

        function connectionSuccess(response) {
            var launch = true;
            $scope.updated_instances_ids = []
            _.each(response, function(instance){
              $scope.updated_instances_ids.push(instance.InstanceId);
              if (instance.InstanceState.Code != 48) {
                  launch = false;
              }
            });
            $scope.canLaunchInstance = launch;
            $scope.$apply();
            if($scope.updated_instances_ids.length > 0){
              $scope.EC2Service.instanceDetail($scope.updated_instances_ids, loadingSuccess, errorHandler);
            }
        }

        function loadingSuccess(response) {
            $scope.instances = []
            _.each(response, function(instance){
              _.each(instance.Instances, function(subinstances) {
                $scope.instances.push(subinstances);
              });
            });
        }

        function startSuccess(response){
          console.log("Started instance " + response.StartingInstances[0].InstanceId);
        }

        function stopSuccess(response){
          console.log("Stopped instance " + response.StoppingInstances[0].InstanceId);
        }

        function terminateSuccess(response){
          console.log("Terminated instance " + response.TerminatingInstances[0].InstanceId);
        }

        function launchSuccess(response){
          console.log("Created instance " + response.Instances[0].InstanceId);
        }

        function errorHandler(error) {
            $scope.hasError = true;
            switch (error.statusCode) {
              case 401:
                $scope.errorMessage = error.name + ": accessKeyID or secretAccessKey invalid. "
                break;
              default:
                $scope.errorMessage = error.name + ": " + error.message;
            }
            console.log("Error: " + error);
            $scope.$apply();
        }
    });
