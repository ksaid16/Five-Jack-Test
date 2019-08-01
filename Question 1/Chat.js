function solution(record)
{
    var answer = [];
    var splitArr = [];
    var users = {id: null, nickname: null, index: null, status: false}; //users object
    var usersArr = [];
    var tempStr;
    var exist = false;
    var tempArr = [];
    for(var i=0; i<record.length; i++)
    {
        splitArr = record[i].split(" "); //parse the string
        //console.log(splitArr);
        if(splitArr[0] == "Enter") //if someone enter the chat
        {
            
            //check if the user id already exist or not in history.
            var checkUserID = usersArr.some(checkID => {return checkID.id == splitArr[1]})
            //id doesn't have any history we create new user id.
            //and push it to the answer so that we have the answer in order.
            if(checkUserID == false) 
            {
                users = {id: splitArr[1], nickname: splitArr[2], index: answer.length, status: true};
                usersArr.push(users);
                tempStr = users.nickname + " Has Entered the Chat";
                answer.push(tempStr);
            }
            //if exist and they're not logged on we allowed them to enter
            //and change the name to whatever they enter.
            if(checkUserID == true)
            {
                for(var j = 0; j < usersArr.length; j++)
                {
                    if(usersArr[j].id == splitArr[1] && usersArr[j].status == false)
                    {
                        usersArr[j].nickname = splitArr[2];
                        tempStr = usersArr[j].nickname + " Has Entered the Chat";
                        answer.push(tempStr);
                        var num = answer.length -1;
                        usersArr[j].index += "," + num;
                        usersArr[j].status = true;
                    }
                }
            }
                
        }
        else if(splitArr[0] == "Leave") //when user wanted to left the chat
        {
            //the user must be logged on in order to leave.
            for(var j = usersArr.length; j>0; j--)
            {
                if(usersArr[j-1].id == splitArr[1] && usersArr[j-1].status == true)
                {
                tempStr = usersArr[j-1].nickname;
                var str2 = ",";
                var num = answer.length;
                str2 += num;
                usersArr[j-1].index += str2;
                usersArr[j-1].status = false;
                //console.log(usersArr[j-1].status = false);
                }
            }
            tempStr += " Has left the chat";
            answer.push(tempStr);
        }
        else if(splitArr[0] == "Change") //when someone wanted to change their name
        {
            //we check based on the users history
            for(var j = 0; j < usersArr.length; j++)
            {
                //users must be logged on. and their id matches with something in the history
                //change all of the name based on the index of their history chat.
                if(usersArr[j].id == splitArr[1] && usersArr[j].status == true)
                {
                    usersArr[j].nickname = splitArr[2];
                    tempArr = usersArr[j].index.toString().split(',');
                    for(var k = 0; k < tempArr.length; k++)
                    {
                    var temparr2 = [];
                    temparr2 = (answer[tempArr[k]].split(" "));
                    temparr2.shift();
                    tempStr = usersArr[j].nickname + " " + temparr2.join(" ");
                    answer[tempArr[k]] = tempStr;
                    }
                }
            }
            
           
        }
    }
    //console.log(usersArr);
    //finally based on the history of the usersArr chat
    //we convert them to the answer.
    for(var i = 0; i < usersArr.length; i++)
    {
        tempArr = usersArr[i].index.toString().split(',');
        for(var j = 0; j < tempArr.length; j++)
        {
            var temparr2 = [];
            temparr2 = (answer[tempArr[j]].split(" "));
            temparr2.shift();
            tempStr = usersArr[i].nickname + " " + temparr2.join(" ");
            answer[tempArr[j]] = tempStr;
        }
    }
    
    return answer;
}


var x = ["Enter uid1234 Muzi"
, "Enter uid4567 Prodo"
, "Enter uid1234 Bangkok"
, "Enter uid1234 Bangkok"
, "Enter uid4567 Italy"
, "Leave uid1234"
, "Change uid1234 Hunter"
, "Enter uid1234 Prodo"
, "Change uid4567 Ryan"
, "Enter uid123 Joshua"
, "Leave uid123"
, "Enter uid123 Angie"
, "Change uid123 Brad"]

console.log(solution(x));