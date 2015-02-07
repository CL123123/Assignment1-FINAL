var app = angular.module('quizApp', [
	'ngRoute'

	]);


app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {
			scope.start = function() {
				scope.id = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
				scope.noAns = false;
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
			}

			scope.getQuestion = function(option) {
				var q = quizFactory.getQuestion(scope.id);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function(option) {
				var answer = scope.options.indexOf(option);

				if(answer === scope.answer) {
					scope.score++;
					scope.correctAns = true;

				} else {
					scope.correctAns = false;
				}
				scope.answerMode = false;
				angular.forEach(scope.options, function(options) {
      				options.answer_disabled = true;
    			});
			};

			scope.nextQuestion = function() {
				// scope.id++;
				// scope.getQuestion();
				if (scope.answerMode ==true) {
					scope.noAns = true;
					scope.message = 'Please select an answer';
				} else  {
					scope.id++;
					scope.getQuestion();
				}
			}

			scope.disableBTTN = function(option) {
				if (scope.answerMode = true) {
				document.getElementByID('option').disabled = true;			
				}
			}

			scope.reset();
		}
	}
});

app.factory('quizFactory', function() {
	var questions = [
		{
			question: "How many concentrations are within SIAT?",
			options: ["1", "2", "3", "4"],
			answer: 2
		},
		{
			question: "In which class do you read a book called “101 Things I Learned in Architecture School?",
			options: ["IAT 202", "IAT 233", "IAT 448", "IAT 381"],
			answer: 1
		},
		{
			question: "Which professor wears glasses made from cork?",
			options: ["Russell Taylor", "Halil Erhan", "Ken Zupan", "Andrew Hawr...something"],
			answer: 3
		},
		{
			question: "Which SIAT course is the best?",
			options: ["IAT 344", "IAT 100", "IAT 381", "IAT 233"],
			answer: 2
		},
		{	
			question: "Which is the SIAT ‘standard’ font for presentations?",
			options: ["DIN-Pro", "Comic-Sans", "Avenir", "Helvetica"],
			answer: 0
		},
		{
			question: "How many years does it take to graduate from SIAT?",
			options: ["Over 9000", "3", "4", "Graduate??? Pfft!"],
			answer: 3
		},
		{
			question: "Which phrases are heard throughout SIAT courses?",
			options: ["Less is more", "Show don't tell", "Strive to be a unicorn", "All of the Above"],
			answer: 3
		},	
		{
			question: "Where do SIAT Students go to work on projects?",
			options: ["Library", "Mezzanine", "Team Room", "Studios A, B, & C"],
			answer: 3
		}					
	];

	return {
		getQuestion: function(id) {
			if(id < questions.length) {
				return questions[id];
			} else {
				return false;
			}
		}
	};
});

// routes for the home, how to play, and contact page
app.config(function ($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'pages/home.html',
      controller : 'MainController'
    })
    .when('/about', {
      templateUrl: 'pages/about.html',
      controller : 'AboutController'
    })
    .when('/contact', {
      templateUrl: 'pages/contact.html',
      controller : 'ContactController'
    })
    .otherwise({
      redirectTo: '/home'
	});    
});    

