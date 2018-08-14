let questions = require('./questions').reduce(function(map, obj) {
    map[obj.id] = obj;
    map[obj.id].maxDifference = obj.answers.length - 0;
    return map;
}, {});

function getDifference(friend, matchFriend) {
    let aAnswers = friend.answers;
    let bAnswers = matchFriend.answers;
    let scores = [];

    for (var questionId in aAnswers) {

        // If the question is valid and if friendB answered this question.
        if (questions[questionId] && bAnswers[questionId]) {

            // Get the difference (absolute value) and then if it's not exact match (0),
            // divide by the maxDifference to get a ratio, push this to the array.
            // This means the lower the value, the less the difference is. Lower number = better match.
            let difference = Math.abs(aAnswers[questionId] - bAnswers[questionId]);

            if (difference !== 0) {
                scores.push({ 
                    id: questionId, 
                    value: difference / questions[questionId].maxDifference 
                });
            } else {
                scores.push({ 
                    id: questionId, 
                    value: 0 
                });
            }
        }
    }

    const matchScore = scores.reduce(function(prev, curr) {
        return prev + curr.value;
    }, 0) / scores.length;

    // Return the answer differences with the average of scores, which is the overall similarity.
    return {
        friend: matchFriend,
        scores: scores,
        total: matchScore,
        matchText: `${(1 - matchScore).toFixed(2) * 100}% match`
    };
}

function getMatches(friend, matchFriends) {
    return matchFriends.map(function(a) {
        return getDifference(friend, a);
    }).sort(function(a, b) {
        return a.total - b.total;
    });
}

module.exports = {
    getDifference: getDifference,
    getMatches: getMatches
};