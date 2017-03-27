describe('EC2 factory', function() {
  var EC2, $rootScope, $_http_, AWS;

	beforeEach(angular.mock.module('ngRoute'));
	beforeEach(angular.mock.module('appConfig'));
	beforeEach(angular.mock.module('appControllers'));
	beforeEach(angular.mock.module('appServices'));
	beforeEach(angular.mock.module('appDirectives'));
	beforeEach(angular.mock.module('appModel'));
	beforeEach(angular.mock.module('aws'));

  beforeEach(inject(function( _EC2_) {
    EC2 = _EC2_;
  }));

  it('should exist', function() {
    expect(EC2).toBeDefined();
  });
});

describe('IndexCtrl', function() {
    var scope, interval, createController, mainConfig, model, EC2;

		beforeEach(angular.mock.module('ngRoute'));
		beforeEach(angular.mock.module('appConfig'));
		beforeEach(angular.mock.module('appControllers'));
		beforeEach(angular.mock.module('appServices'));
		beforeEach(angular.mock.module('appDirectives'));
		beforeEach(angular.mock.module('appModel'));
		beforeEach(angular.mock.module('aws'));

    beforeEach(inject(function ($rootScope, $controller, _$interval_, _mainConfig_, _model_, _EC2_) {
        interval = _$interval_;
				mainConfig = _mainConfig_;
				model = _model_;
				EC2 = _EC2_;
        scope = $rootScope.$new();

        createController = function() {
            return $controller('IndexCtrl', {
                '$scope': scope,
								'$interval': interval,
								'mainConfig': mainConfig,
								'model': model,
								'EC2': EC2
            });
        };
    }));

    it('should be undefined at first', function() {
        var controller = createController();
        expect(scope.instances).toBe(undefined);
    });
});
