/*
    문제 설명
    [본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]

    당신은 행렬에 적용할 수 있는 두 가지 연산을 만들었습니다.
    ShiftRow
    모든 행이 아래쪽으로 한 칸씩 밀려납니다. 즉, 모든 행에 대해서 i번째 행은 i+1번째 행이 됩니다. (마지막 행은 1번째 행이 됩니다.)
    Rotate
    행렬의 바깥쪽에 있는 원소들을 시계 방향으로 한 칸 회전시킵니다.
    행렬의 바깥쪽에 있는 원소들은 첫 행, 첫 열, 끝 행, 끝 열에 포함되는 원소들입니다.
    한 칸 회전시킨다는 것은 이 원소들이 시계 방향으로 한 칸씩 밀려난다는 것을 의미합니다. 즉, 다음 4개의 연산이 동시에 시행됩니다.
    첫 행에서 끝 열에 있는 원소를 제외한 첫 행의 모든 원소는 오른쪽으로 한 칸 이동합니다.
    끝 열에서 끝 행에 있는 원소를 제외한 끝 열의 모든 원소는 아래쪽으로 한 칸 이동합니다.
    끝 행에서 첫 열에 있는 원소를 제외한 끝 행의 모든 원소는 왼쪽으로 한 칸 이동합니다.
    첫 열에서 첫 행에 있는 원소를 제외한 첫 열의 모든 원소는 위쪽으로 한 칸 이동합니다.

    당신은 행렬에 연산을 여러 번 시행하려고 합니다.
    행렬의 초기 상태를 담고 있는 2차원 정수 배열 rc, 시행할 연산을 순서대로 담고 있는 문자열 배열 operations가 매개변수로 주어졌을 때, 연산을 차례대로 시행한 후의 행렬 상태를 return 하도록 solution 함수를 완성해주세요.

    제한사항
    2 ≤ rc의 행 길이(=행렬의 가로 길이) ≤ 50,000
        - rc의 모든 행의 길이는 동일합니다.
    2 ≤ rc의 열 길이(=행렬의 세로 길이) ≤ 50,000
        - rc의 모든 열의 길이는 동일합니다.
    4 ≤ rc의 행 길이 x rc의 열 길이 ≤ 100,000
    rc[i][j] 는 i+1번째 행 j+1번째 열에 있는 원소를 나타냅니다.
        - 1 ≤ rc[i][j] ≤ 1,000,000
    1 ≤ operations의 길이 ≤ 100,000
        - operations의 원소는 "ShiftRow" 혹은 "Rotate"입니다.
    
    정확성 테스트 케이스 제한 사항
    2 ≤ rc의 행 길이(=행렬의 가로 길이) ≤ 1,000
        - rc의 모든 행의 길이는 동일합니다.
    2 ≤ rc의 열 길이(=행렬의 세로 길이) ≤ 1,000
        - rc의 모든 열의 길이는 동일합니다.
    4 ≤ rc의 행 길이 x rc의 열 길이 ≤ 10,000
    1 ≤ operations의 길이 ≤ 100
    
    효율성 테스트 케이스 제한 사항
    주어진 조건 외 추가 제한사항 없습니다.
    
    입출력 예
    rc	                                            operations	                                    result
    [[1, 2, 3], [4, 5, 6], [7, 8, 9]]	            ["Rotate", "ShiftRow"]	                        [[8, 9, 6], [4, 1, 2], [7, 5, 3]]
    [[8, 6, 3], [3, 3, 7], [8, 4, 9]]	            ["Rotate", "ShiftRow", "ShiftRow"]	            [[8, 3, 3], [4, 9, 7], [3, 8, 6]]
    [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]	["ShiftRow", "Rotate", "ShiftRow", "Rotate"]	[[1, 6, 7 ,8], [5, 9, 10, 4], [2, 3, 12, 11]]
*/


// 정확성: 25/25, 효율성: 58.3/75 (효율성 실패 코드) 테스트케이스 4,7

function solution(rc, operations) {
    const [N,M] = [rc.length, rc[0].length];
    const outline = (N-1)*2 + (M-1)*2;
    var answer = new Array(N);
    var front = new Array(N), back = new Array(N), middle = Array.from({length: N}, ()=>Array(M-2));
    const first = middle[0].length, second = first+N, third = second + first;
    
    var init = () => {
        for(var i=0; i<N; i++) {
            for(var j=0; j<M; j++) {
                if(j===0) front[N-1-i] = rc[i][j];
                else if(j===M-1) back[i] = rc[i][j];
                else middle[i][j-1] = rc[i][j];
            }
        }
    }
    
    var rotate = (count) => {
        var rotate_arr = [...middle[0],...back,...middle[N-1].reverse(),...front];
        rotate_arr.unshift(...rotate_arr.splice(-count));
        
        for(var i=0; i<rotate_arr.length; i++) {
            if(i<first) middle[0][i] = rotate_arr[i];
            else if(i<second) back[i-first] = rotate_arr[i];
            else if(i<third) middle[N-1][first-1-(i-second)] = rotate_arr[i];
            else front[i-third] = rotate_arr[i];
        }
    }
    
    var shift_row = (count) => {
        front.push(...front.splice(0,count));
        back.push(...back.splice(0,N-count));
        middle.push(...middle.splice(0,N-count));
    }
    
    var operate = () => {
        var count = 1;
        for(var i=0; i<operations.length; i++) {
            if(i+1<operations.length && operations[i]===operations[i+1]) {
                count++;
                continue;
            }
            switch(operations[i]) {
                case "Rotate": 
                    if(count%outline) rotate(count%outline);
                    break;
                case "ShiftRow":
                    if(count%N) shift_row(count%N);
                    break;
            }
            count = 1;
        }
    }
    
    var get_answer = () => {
        for(var i=0; i<N; i++) {
            answer[i] = [front[N-1-i],...middle[i], back[i]];
        }
        return answer;
    }
    
    init();
    operate();
    
    return get_answer();
}


/* 
    정확성: 25/25, 효율성: 50/75 (효율성 실패 코드) 테스트케이스 2,4,7

    function solution(rc, operations) {
        const [N,M] = [rc.length, rc[0].length];
        const total = N*M;
        var answer = new Array(N);
        var matrix = new Map();
        var rotate_index = new Array();
        
        var init = () => {
            var front = [], bottom = [];
            
            for(var i=0, index=1; i<N; i++) {
                for(var j=0; j<M; j++, index++) {
                    matrix.set(index, rc[i][j]);
                    var temp = i*M + (j+1);
                    if(i===0) rotate_index.push(temp);
                    else if(i===N-1) bottom.unshift(temp);
                    else if(j===0) front.unshift(temp);
                    else if(j===M-1) rotate_index.push(temp);
                }
            }
            rotate_index = [...rotate_index,...bottom,...front];
        }
        
        var rotate = (count) => {
            var temp = [...matrix.values()];
            if(count<=rotate_index.length/2) {
                for(var i=0; i<rotate_index.length; i++) {
                    if(i+count>=rotate_index.length) matrix.set(rotate_index[i+count-rotate_index.length], temp[rotate_index[i]-1]);
                    else matrix.set(rotate_index[i+count], temp[rotate_index[i]-1]); 
                }
            } else { //반대 방향
                count = rotate_index.length-count;
                for(var i=0; i<rotate_index.length; i++) {
                    if(i-count<0)
                        matrix.set(rotate_index[i-count+rotate_index.length], temp[rotate_index[i]-1]);
                    else 
                        matrix.set(rotate_index[i-count], temp[rotate_index[i]-1]);
                }
            }
        }
        
        var shift_row = (count) => {
            var temp = [...matrix.values()];
            if(count<=N/2) {
                for(var i=total; i>0; i--) {
                    if(M*count+i<=total) matrix.set(M*count+i, temp[i-1]);
                    else matrix.set((M*count+i)-total, temp[i-1]);
                }
            } else { //반대 방향
                count = N-count;
                for(var i=total; i>0; i--) {
                    if(i-M*count>0) matrix.set(i-M*count, temp[i-1]);
                    else matrix.set((i-M*count)+total, temp[i-1]);
                }
            }
        }
        
        var operate = () => {
            var count = 1;
            for(var i=0; i<operations.length; i++) {
                if(i+1<operations.length && operations[i]===operations[i+1]) {
                    count++;
                    continue;
                }
                switch(operations[i]) {
                    case "Rotate": 
                        if(count%rotate_index.length) rotate(count%rotate_index.length);
                        break;
                    case "ShiftRow":
                        if(count%N) shift_row(count%N);
                        break;
                }
                count = 1;
            }
        }
        
        init();
        operate();
        
        var temp = [...matrix.values()];
        
        for(var i=0; i<N; i++) {
            answer[i] = temp.splice(0,M);
        }
        
        return answer;
    }
*/