function solution(relation) 
{

    var dupSet = new Set();
    var answer = 0;
    var rowIndex = []; //arr to store row index that have matching value in relation
    var colIndex = []; //arr to store col index that have matching value in relation
    var rowMatch = []; //store index for matching pair in relation
    var next = false; 
    var confirm = 0;

    //First gear of the loop through the relation data set.
    for(var i = 0; i < relation[i].length; i++)
    {
        for(var j = 0; j < relation.length; j++)
        {
            if(dupSet.size == 0) //if nothing in set add value to the set
                dupSet.add(relation[j][i]);
        
            else if(dupSet.has(relation[j][i]) == false) //if doesn't match add to the set
                dupSet.add(relation[j][i]);
    
            else if(dupSet.has(relation[j][i]) == true) //if match push index of row and col
            {
                rowIndex.push(j);
                colIndex.push(i);
            }

            if(dupSet.size == relation.length) //if the whole column value is unique add 1 to the answer
                answer ++;
        }

        var tempArr = []; //to hold set as an array
        tempArr = Array.from(dupSet.keys()); 

        //loop to find index of matching pairs
        for(var j = 0; j < rowIndex.length; j++)
        {
            for(var k = 0; k < tempArr.length; k++)
            {
                if(relation[rowIndex[j]][colIndex[j]] == tempArr[k])
                    rowMatch.push(k);
            }
        }

        //if there's matching pair in the column we go through another loop
        if(rowIndex.length > 0 && i < relation[i].length - 1)
        {
            for(var j = 0; j < rowIndex.length; j++)
            {
                for(var k = colIndex[j]+1; k <= relation[i].length; k++)
                {
                    //if the pairs value for another next category doesn't match
                    //we add a counter to confirm.
                    if(relation[rowIndex[j]][k] !== relation[rowMatch[j]][k])
                    {
                        confirm++;
                        next = true;
                    }
                    if(next == true)
                    {
                        //when confirm counter reach the matching pairs size means that all
                        //the value from the next category is unique
                        //which means we have another candidate key.
                        if(confirm == rowIndex.length)
                        {
                            answer++;
                            confirm = 0;
                        }
                        next = false;
                        break;
                    }
                    
                }
            }
        }
        //reset all of the index and set for each category column.
        rowMatch = [];
        rowIndex = [];
        colIndex = [];
        tempArr = [];
        dupSet.clear();
    }
    return answer;
}

//Testing Sample
var x = [
    ["100", "ryan", "music", "2"],
    ["200", "apeach", "math", "2"],
    ["300", "tube", "computer", "3"],
    ["400", "con", "computer", "4"],
    ["500", "muzi", "music", "3"],
    ["600", "apeach", "music", "2"]];

console.log(solution(x));