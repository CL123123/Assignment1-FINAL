var app = angular.module('quizApp', [
	'ngRoute'

	]);


app.directive('quiz', function(quizFactory) {
	return {
		restrict: 'AE',
		scope: {},
		templateUrl: 'template.html',
		link: function(scope, elem, attrs) {

			scope.activeQuestion = {};

			scope.start = function() {
				scope.id = 0;
				scope.qCount = 0;
				scope.quizOver = false;
				scope.inProgress = true;
				scope.getQuestion();
			};

			scope.reset = function() {
				scope.inProgress = false;
				scope.score = 0;
				scope.qCount = 0;
				scope.noAns = false;
			}

			scope.getQuestion = function(option) {
				var counter = scope.qCount;
				var q = quizFactory.getQuestion(scope.id);
				scope.activeQuestion = angular.copy(q);
				if(q) {
					scope.question = q.question;
					scope.options = q.options;
					scope.answer = q.answer;
					scope.answerMode = true;
					scope.qCount++;
				} else {
					scope.quizOver = true;
				}
			};

			scope.checkAnswer = function(option) {
				var answer = scope.options.indexOf(option);

				if(answer === scope.answer) {
					scope.score++;
					scope.correctAns = true;
					scope.noAns = false;
				} else {
					scope.correctAns = false;
					scope.noAns = false;
				}
				scope.answerMode = false;

				scope.activeQuestion.disabled = true;
			};

			scope.nextQuestion = function() {
				if (scope.answerMode === true ) {
					scope.noAns = true;
				} else  {
					scope.id++;
					scope.getQuestion();
					scope.noAns = false;
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
			options: ["Russell Taylor", "Andrew Hawr...", "Ken Zupan", "Halil Erhan"],
			answer: 1
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
			options: ["Over 9000", "3", "4", "Graduate?? HAHA!"],
			answer: 3
		},
		{
			question: "Which phrases are heard throughout SIAT courses?",
			options: ["Less is more", "Show don't tell", "Strive to be a unicorn", "All of the Above"],
			answer: 3
		},	
		{
			question: "Where do SIAT Students go to work on projects?",
			options: ["Studios A, B, & C", "Mezzanine", "Team Room", "Library"],
			answer: 0
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

