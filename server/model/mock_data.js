const Chance = require('chance');
const chance = new Chance();
const models = require('./models');
const db = require('../api/db');

let mockSize = process.env.MOCK_SIZE || 50;

let data = {
    hackers: [],
    volunteers: [],
    judges: [],
    sponsors: []
};

for(i = 0; i < mockSize; i++) {
    let hacker = new models.Hackers({
        'full_name': chance.first() + ' ' + chance.last(),
        'email': chance.email(),
        'password': '$2a$08$K2zg0yTD8RjlYsDWcbLcEupQM3j.mcT5z1MasEbZYCHFyIHQONPv2',
        'phone': chance.phone(),
        'school': chance.sentence({ words: 5 }),
        'age': chance.age(),
        'gender': chance.pickone(['Male', 'Female', 'Non-Binary/Other', 'Prefer Not To Say']),
        'skills': chance.pick(['Developement', 'Design', 'Data Science', 'Project Management'], chance.integer({ min: 0, max: 4})),
        'interests': chance.pick(['Front-End Web', 'Back-End Web', 'Mobile Apps', 'Embedded Devices', 'IOT', 'VR', 'Distributed Systems', 'Hardware', 'Data Science', 'Data Visualization'], chance.integer({ min: 0, max: 9})),
        'programming_languages': chance.pick(['Python', 'Java', 'C/C++', 'Javascript', 'Ruby', 'R'], chance.integer({ min: 0, max: 6})),
        'dietary_restrictions': chance.sentence({ words: 5 }),
        'allergies': chance.sentence({ words: 5 }),
        'special_needs': chance.sentence({ words: 5 }),
        'shirt_size': chance.pickone(['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large']),
        'previous_hackathons': chance.pickone(['0', '1-2', '3-4', '4+']),
        'have_team': chance.pickone(['yes', 'no']),
        'team_emails': chance.pickset([chance.email(), chance.email(), chance.email(), chance.email()], chance.integer({ min: 0, max: 4})),
        'require_reimbursement': chance.pickone(['yes', 'no']),
        'linkedin': 'http://linkedin.com/in/' + chance.word({ length: 7 }),
        'github': 'http://github.com/' + chance.word({ length: 7 }),
        'site_other': chance.domain(),
        'resume': chance.domain() + chance.word({ length: 5 }) + '.pdf',
        'application_status': chance.pickone(['received', 'under review', 'accepted']),
        'privileges': ['user', 'hacker'],
        'type': 'hacker'
    });
	let volunteer = new models.Volunteers({
		'full_name': chance.first() + ' ' + chance.last(),
		'phone': chance.phone(),
		'email': chance.email(),        
        'password': '$2a$08$K2zg0yTD8RjlYsDWcbLcEupQM3j.mcT5z1MasEbZYCHFyIHQONPv2',
        'age': chance.age(),
		'shirt_size': chance.pickone(['X-Small', 'Small', 'Medium', 'Large', 'X-Large']),
		'availability': '',
        "position": chance.sentence({ words: 5 }),
        'privileges': ['user', 'volunteer'],
		'type': 'volunteer'
	});
	let judge = new models.Judges({
		'full_name': chance.first() + ' ' + chance.last(),
		'title': chance.pickone(['Prof.', 'Software Engineer']),
		'email': chance.email(),
        'password': '$2a$08$K2zg0yTD8RjlYsDWcbLcEupQM3j.mcT5z1MasEbZYCHFyIHQONPv2',
		'phone': chance.phone(),
		'shirt_size': chance.pickone(['X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', 'XXX-Large']),
		'occupation': chance.pickone(['Faculty', 'Professional', 'Other']),
		'position': chance.sentence({ words: 3 }),
		'organization': chance.pick([chance.city()+' University','University of ' + chance.city(), chance.sentence({ words: 1 }) + ' Co.', chance.sentence({ words: 1 }) + ' Ltd']),
		'linkedin': 'http://linkedin.com/in/' + chance.word({ length: 7 }),
		'site_other': chance.domain(),
		'photo': 'person-icon.png',
        'privileges': ['user', 'judge'],
		'type': 'judge'		
	});
	let sponsor = new models.Sponsors({
		'organization': chance.pick([chance.city() + ' University','University of ' + chance.city(), chance.sentence({ words: 1 }) + ' Co.', chance.sentence({ words: 1 }) + ' Ltd']),
		'email': chance.email(),
        'password': '$2a$08$K2zg0yTD8RjlYsDWcbLcEupQM3j.mcT5z1MasEbZYCHFyIHQONPv2',
		'phone': chance.phone(),
		'rep_name': chance.first()  + chance.last(),
		'rep_position': chance.sentence({ words: 3 }),
		'linkedin': 'http://linkedin.com/in/' + chance.word({ length: 7 }),
		'site_other': chance.domain(),
		'photo': 'orange-triangle-banner.jpg',
        'privileges': ['user', 'sponsor'],
		'type': 'sponsor'
    });
    let announcement = new models.Announcements({
        'title': chance.sentence({words: 4}),
        'body': chance.sentence({words: 10}),
        'visible_to': ['hackers'],
        'slack_channel': chance.word()
    });
    data.hackers.push(hacker);
    data.volunteers.push(volunteer);
    data.judges.push(judge);
    data.sponsors.push(sponsor);
    //data.events.push(event);
    //data.timeline.push(event.id);
    data.announcements.push(announcement);
}

let docsAdded = 0;
/*
models.Hackers.insertMany(data.hackers, (error, docs) => {
    if(error) console.error(error);
    console.info(docs.length + ' hackers added');
    docsAdded += docs.length;
});

models.Volunteers.insertMany(data.volunteers, (error, docs) => {
    if(error) console.error(error);
    console.info(docs.length + ' volunteers added');
    docsAdded += docs.length;
});

models.Judges.insertMany(data.judges, (error, docs) => {
    if(error) console.error(error);
    console.info(docs.length + ' judges added');
    docsAdded += docs.length;
});

models.Sponsors.insertMany(data.sponsors, (error, docs) => {
    if(error) console.error(error);
    console.info(docs.length + ' sponsors added');
    docsAdded += docs.length;
});

const interval = setInterval(() => {
    if(docsAdded >= mockSize*Object.keys(data).length) {
        console.info('Closing database connections..');
        db.main.close();
        db.resources.close();
        clearInterval(interval);
    }
}, 500);
*/

models.Announcements.on('index', function(err) {
    if (err) {
        console.error('Announcements index error: %s', err);
    } else {
        console.info('Announcements indexing complete');
        models.Announcements.create(new models.Announcements({
            'title': chance.sentence({words: 4}),
            'body': chance.sentence({words: 10}),
            'visible_to': ['hackers'],
            'slack_channel': chance.word()
        }), (error, doc) => {
            if(error) console.info(error);
            console.info(doc);
        });
    }
});