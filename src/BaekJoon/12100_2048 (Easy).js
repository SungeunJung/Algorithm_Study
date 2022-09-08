/*
    문제
    2048 게임은 4×4 크기의 보드에서 혼자 즐기는 재미있는 게임이다. 
    이 게임에서 한 번의 이동은 보드 위에 있는 전체 블록을 상하좌우 네 방향 중 하나로 이동시키는 것이다. 이때, 같은 값을 갖는 두 블록이 충돌하면 두 블록은 하나로 합쳐지게 된다. 
    한 번의 이동에서 이미 합쳐진 블록은 또 다른 블록과 다시 합쳐질 수 없다. (실제 게임에서는 이동을 한 번 할 때마다 블록이 추가되지만, 이 문제에서 블록이 추가되는 경우는 없다)
    이 문제에서 다루는 2048 게임은 보드의 크기가 N×N 이다. 보드의 크기와 보드판의 블록 상태가 주어졌을 때, 최대 5번 이동해서 만들 수 있는 가장 큰 블록의 값을 구하는 프로그램을 작성하시오.

    입력
    첫째 줄에 보드의 크기 N (1 ≤ N ≤ 20)이 주어진다. 둘째 줄부터 N개의 줄에는 게임판의 초기 상태가 주어진다. 0은 빈 칸을 나타내며, 이외의 값은 모두 블록을 나타낸다. 블록에 쓰여 있는 수는 2보다 크거나 같고, 1024보다 작거나 같은 2의 제곱꼴이다. 블록은 적어도 하나 주어진다.

    출력
    최대 5번 이동시켜서 얻을 수 있는 가장 큰 블록을 출력한다.

    예제 입력 1     예제 출력 1 
    3               16
    2 2 2
    4 4 4
    8 8 8
*/

var [s, ...info] = require('fs').readFileSync('./example.txt').toString().trim().split('\n'); 
info = info.map(v=>v.split(' ').map(Number));

function solution(scale, board) {
    const dir = ['R', 'D', 'L', 'U'];
    const next = {'R':-1, 'D':-1, 'L':1, 'U':1};
    const start = {'R':0, 'D':0, 'L':scale-1, 'U':scale-1};
    const MAX_MOVE = 5;
    var maxNum = 0;
    
    var getMaxNum = (B) => {
        B.map(v=> maxNum = Math.max(...v, maxNum));
    }

    var slide = (B, direction) => { // 0이 있는 공간 슬라이드
        for(var j=scale; j--; ) {
            var zeroIdx = [];
            for(var k=scale; k--;) {
                var startIdx = Math.abs(start[direction]-k);
                if(direction==='R'|| direction==='L') {
                    if(B[j][startIdx] && zeroIdx.length) {
                        var temp = zeroIdx.shift();
                        [B[j][startIdx], B[j][temp]] = [B[j][temp], B[j][startIdx]];
                    }
                    if(B[j][startIdx] === 0) {
                       zeroIdx.push(startIdx);
                    }
                }   
                if(direction==='D'|| direction==='U') {
                    if(B[startIdx][j] && zeroIdx.length) {
                        var temp = zeroIdx.shift();
                        [B[startIdx][j], B[temp][j]] = [B[temp][j], B[startIdx][j]];
                    }
                    if(B[startIdx][j] === 0) {
                       zeroIdx.push(startIdx);
                    }
                }
            }
        }
        return B;
    }

    var merge = (B, move) => { //같은 숫자 합치기
        if(move===MAX_MOVE) return getMaxNum(B);
        for(var i=0; i<dir.length; i++) {
            var copyB = slide(B.map(v=>v.slice()), dir[i]);
            for(var j=scale; j--; ) {
                for(var k=scale; k--;) {
                    var startIdx = Math.abs(start[dir[i]]-k);
                    var nextIdx = startIdx + next[dir[i]];
                    if(nextIdx>=scale||nextIdx<0) continue;
                    if(dir[i]==='R'|| dir[i]==='L') {
                        if(copyB[j][startIdx] === copyB[j][nextIdx]) {
                            copyB[j][startIdx] *= 2;
                            copyB[j][nextIdx] = 0;
                        }
                    }
                    if(dir[i]==='D'|| dir[i]==='U'){
                        if(copyB[startIdx][j] === copyB[nextIdx][j]) {
                            copyB[startIdx][j] *= 2;
                            copyB[nextIdx][j] = 0;
                        }
                    }
                }
            }
            merge(slide(copyB, dir[i]), move+1);
        }
    }
    merge(board, 0);
    
    return maxNum;
}

console.log(solution(+s, info));