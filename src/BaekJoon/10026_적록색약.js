/* 
    문제
    적록색약은 빨간색과 초록색의 차이를 거의 느끼지 못한다. 따라서, 적록색약인 사람이 보는 그림은 아닌 사람이 보는 그림과는 좀 다를 수 있다.
    크기가 N×N인 그리드의 각 칸에 R(빨강), G(초록), B(파랑) 중 하나를 색칠한 그림이 있다. 그림은 몇 개의 구역으로 나뉘어져 있는데, 구역은 같은 색으로 이루어져 있다. 또, 같은 색상이 상하좌우로 인접해 있는 경우에 두 글자는 같은 구역에 속한다. (색상의 차이를 거의 느끼지 못하는 경우도 같은 색상이라 한다)

    예를 들어, 그림이 아래와 같은 경우에
    RRRBB
    GGBBB
    BBBRR
    BBRRR
    RRRRR
    적록색약이 아닌 사람이 봤을 때 구역의 수는 총 4개이다. (빨강 2, 파랑 1, 초록 1) 하지만, 적록색약인 사람은 구역을 3개 볼 수 있다. (빨강-초록 2, 파랑 1)
    그림이 입력으로 주어졌을 때, 적록색약인 사람이 봤을 때와 아닌 사람이 봤을 때 구역의 수를 구하는 프로그램을 작성하시오.

    입력
    첫째 줄에 N이 주어진다. (1 ≤ N ≤ 100)
    둘째 줄부터 N개 줄에는 그림이 주어진다.

    출력
    적록색약이 아닌 사람이 봤을 때의 구역의 개수와 적록색약인 사람이 봤을 때의 구역의 수를 공백으로 구분해 출력한다.

    예제 입력
    5
    RRRBB
    GGBBB
    BBBRR
    BBRRR
    RRRRR
    
    예제 출력
    4 3
*/

var input = require('fs').readFileSync('./example.txt').toString().trim().split('\n'); 
var total = input.shift();
var pic = [], check = [], answer = [];

for(let i=0; i<total; i++) {
    pic[i] = input[i].trim().split('');
}

var getUnsearched = (arr) => {
    for(let i=0; i<total; i++) {
        if(arr[i].indexOf(false) !== -1) {
            return [i, arr[i].indexOf(false)];
        }
    }
    return false;
}

var reset = (arr) => {
    for(let i=0; i<total; i++) {
        arr[i] = [];
        for(let j=0; j<total; j++) {
            arr[i][j] = false;
        }
    }
    return arr;
}

var search = (x, y, color) => {
    check[x][y] = true;
    
    if(x-1>=0 && pic[x-1][y]===color && !check[x-1][y]) search(x-1, y, color);
    if(x+1<total && pic[x+1][y]===color && !check[x+1][y]) search(x+1, y, color);
    if(y-1>=0 && pic[x][y-1]===color && !check[x][y-1]) search(x, y-1, color);
    if(y+1<total && pic[x][y+1]===color && !check[x][y+1]) search(x, y+1, color);
}

var replaceG_to_R = () => {
    for(let i=0; i<total; i++) {
        pic[i] = input[i].trim().replace(/G/gi, 'R').split('');
    }
    return pic;
}

var divideColor = () => {
    check = reset(check);
    var temp = getUnsearched(check);
    var count = 0;
    
    while(temp !== false) {
        search(temp[0], temp[1], pic[temp[0]][temp[1]]);
        count++;
        temp = getUnsearched(check);
    }
    return count;
}

answer.push(divideColor());
pic = replaceG_to_R();
answer.push(divideColor());

console.log(answer.join(' '));