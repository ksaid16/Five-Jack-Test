function solution (N, users)
{
    var answer = [];
    var scoreAcc = [];
    var numOfUser = users.length; //get how many player in the game

    //initialize a 2d array. 1 column to be 0, with their pairs be the level index.
    for(var i = 0; i <= N; i++)
    {
        scoreAcc[i] = [];
        for(var j = 1; j <= 1; j++)
        {
            scoreAcc[i][j]= i+1;
        }
        scoreAcc[i][0] = 0;
    }
    
    //get how many users in each level.
    for(var i = 0; i < users.length; i++)
    {
        scoreAcc[users[i]-1][0] += 1;
    }
    scoreAcc.pop();
    
    //get the score for each level
    for(var i = 0; i < N; i++)
    {
        if(numOfUser !== 0)
        {
            var temp = scoreAcc[i][0]
        scoreAcc[i][0] /= numOfUser;
        numOfUser -= temp;
        }
    }
    //sort the score and push it to function.
    scoreAcc.sort(sortFunction);
    for(var i = 0; i < scoreAcc.length; i++)
    {
        answer[i] = scoreAcc[i][1];
    }
    return answer;
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (b[0] < a[0]) ? -1 : 1;
    }
}
var x = [2,1,2,2,2,4,3,3];
console.log(solution(5,x));