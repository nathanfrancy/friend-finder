const FriendFinder = require('./../lib');

let friend = {
    name: 'Nathan',
    answers: {
        'color': 2,
        'hang-out': 3,
        'drink': 3,
        'place-to-live': 5,
        'favorite-season': 2
    }
};

let friends = [
    {
        name: 'Mike',
        answers: {
            'color': 5,
            'hang-out': 1,
            'drink': 2,
            'place-to-live': 1,
            'favorite-season': 4
        }
    },
    {
        name: 'Dusty',
        answers: {
            'color': 3,
            'hang-out': 3,
            'drink': 3,
            'place-to-live': 5,
            'favorite-season': 2
        }
    }
];

console.log(FriendFinder.comparer.getMatches(friend, friends));