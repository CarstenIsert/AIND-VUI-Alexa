/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This skill is developed for the Udacity Artificial Intelligence Nanodegree
 * class and it covers 6th grade histroy facts.
 **/

'use strict';

var Alexa = require('alexa-sdk');

var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var GET_FACT_MSG_EN = [
    "Here's your fact: ",
    "Here you go: ",
    "I found this: ",
    "What about: ",
    "This might be interesting: "
]

//Test hooks - do not remove!
exports.GetFactMsg = GET_FACT_MSG_EN;
var APP_ID_TEST = "mochatest";  // used for mocha tests to prevent warning
// end Test hooks

var languageStrings = {
    'en': {
        translation: {
            FACTS: [
                'The Jewish calendar begins with the creation of the world in the year 3761 before christ.',
                'Despite being farther from the Sun, Venus experiences higher temperatures than Mercury.',
                'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: '6th grade school history facts',
            GET_FACT_MESSAGE: "Here's your fact: ",
            HELP_MESSAGE: 'You can say tell me a history fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-US': {
        translation: {
            FACTS: [
    	        "Mohammed fled from Mekka to Medina in the year 622. So the Muslim calendar now reads 1395.",
    	        "The era ancient world started about 3000 before christ.",
    	        "The era middle age started around 500 and continued until the new age in 1500.",
    	        "Columbus discovered America in the year 1492.",
    	        "The new age started in around 1500.",
    	        "Christ was born 2017 years ago.",
    	        "Donal Trump was elected president of the United States of America in 2016.",
    	        "A so-called AI Winter occurred in 1974, when funding was cut after Speech Understanding research did not live up to its promise.",
    	        "A driverless robotic car named Stanley, engineered by Sebastian Thrun's Stanford Racing team, sped through the Mojave desert at 22 miles per hour to win the 2005 Darpa Grand Challenge.",
    	        "The Jewish calendar begins with the creation of the world in the year 3761 before christ."
            ],
            SKILL_NAME: 'American 6th grade history facts',
            GET_FACT_MESSAGE: GET_FACT_MSG_EN,
            HELP_MESSAGE: 'You can say tell me a history fact, or, you can say exit... What can I help you with?',
            HELP_REPROMPT: 'What can I help you with?',
            STOP_MESSAGE: 'Goodbye!',
        },
    },
    'en-GB': {
        translation: {
            FACTS: [
                'The Jewish calendar begins with the creation of the world in the year 3761 before christ.',
                'Venus rotates anti-clockwise, possibly because of a collision in the past with an asteroid.',
                'On Mars, the Sun appears about half the size as it does on Earth.',
                'Earth is the only planet not named after a god.',
                'Jupiter has the shortest day of all the planets.',
                'The Milky Way galaxy will collide with the Andromeda Galaxy in about 5 billion years.',
                'The Sun contains 99.86% of the mass in the Solar System.',
                'The Sun is an almost perfect sphere.',
                'A total solar eclipse can happen once every 1 to 2 years. This makes them a rare event.',
                'Saturn radiates two and a half times more energy into space than it receives from the sun.',
                'The temperature inside the Sun can reach 15 million degrees Celsius.',
                'The Moon is moving approximately 3.8 cm away from our planet every year.',
            ],
            SKILL_NAME: 'British 6th grade school history facts',
        },
    },
    'de': {
        translation: {
            FACTS: [
                'Der jüdische Kalender beginnt im Jahr 3761 vor Christus mit der Erschaffung der Welt.',
                'Die Venus ist zwar weiter von der Sonne entfernt, hat aber höhere Temperaturen als Merkur.',
                'Venus dreht sich entgegen dem Uhrzeigersinn, möglicherweise aufgrund eines früheren Zusammenstoßes mit einem Asteroiden.',
                'Auf dem Mars erscheint die Sonne nur halb so groß wie auf der Erde.',
                'Die Erde ist der einzige Planet, der nicht nach einem Gott benannt ist.',
                'Jupiter hat den kürzesten Tag aller Planeten.',
                'Die Milchstraßengalaxis wird in etwa 5 Milliarden Jahren mit der Andromeda-Galaxis zusammenstoßen.',
                'Die Sonne macht rund 99,86 % der Masse im Sonnensystem aus.',
                'Die Sonne ist eine fast perfekte Kugel.',
                'Eine Sonnenfinsternis kann alle ein bis zwei Jahre eintreten. Sie ist daher ein seltenes Ereignis.',
                'Der Saturn strahlt zweieinhalb mal mehr Energie in den Weltraum aus als er von der Sonne erhält.',
                'Die Temperatur in der Sonne kann 15 Millionen Grad Celsius erreichen.',
                'Der Mond entfernt sich von unserem Planeten etwa 3,8 cm pro Jahr.',
            ],
            SKILL_NAME: 'Geschichtswissen 6. Klasse auf Deutsch',
            GET_FACT_MESSAGE: 'Hier sind deine Fakten: ',
            HELP_MESSAGE: 'Du kannst sagen, „Nenne mir einen Fakt über Geschichte“, oder du kannst „Beenden“ sagen... Wie kann ich dir helfen?',
            HELP_REPROMPT: 'Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'GetNewFactIntent': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const randomFact = randomPhrase(factArr)

        var prefixArr = this.t('GET_FACT_MESSAGE');
        var randomPrefix = randomPhrase(prefixArr);
        
        // Create speech output
        const speechOutput = randomPrefix + randomFact;
        this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), randomFact);
    },
    'GetYearFact': function() {
        const factArr = this.t('FACTS');
    	var yearAsked = this.event.request.intent.slots.FACT_YEAR.value;
    	var answerMatchingYear = searchYearInText(yearAsked, factArr);
    	
    	var answerText;
    	if (answerMatchingYear === null) {
    		prefixText = "Could not find anything for this year. Here is a random fact: ";
    		answerText = randomPhrase(factArr);
    	} else {
            var prefixArr = this.t('GET_FACT_MESSAGE');
            var prefixText = randomPhrase(prefixArr);
            
    		answerText = answerMatchingYear;
    	}

    	const speechOutput = prefixText + answerText;

    	this.emit(':tellWithCard', speechOutput, this.t('SKILL_NAME'), answerText);
    },
    'GetNewYearFactIntent': function () {
        this.emit('GetYearFact')
    },
    'GetYearInfoIntent': function () {
        this.emit('GetYearFact')
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

function searchYearInText(year, textArray) {
	// TODO: Should build a list and return a random fact from the list
	// currently no need as not more than one fact per year
	for (var i=0 ; i < textArray.length ; i++) {
		var answer = textArray[i];
		if (answer.includes(year)) {
			return answer
		}
	}
	return null
};

function randomPhrase(phraseArr) {
    // returns a random phrase
    // where phraseArr is an array of string phrases
    var i = 0;
    i = Math.floor(Math.random() * phraseArr.length);
    return (phraseArr[i]);
};

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
   
    // set a test appId if running the mocha local tests
    if (event.session.application.applicationId == "mochatest") {
        alexa.appId = APP_ID_TEST
    }
    
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
