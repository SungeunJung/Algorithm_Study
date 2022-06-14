/*
    문제 설명
    n명의 사람이 일렬로 줄을 서고 있습니다. n명의 사람들에게는 각각 1번부터 n번까지 번호가 매겨져 있습니다. n명이 사람을 줄을 서는 방법은 여러가지 방법이 있습니다. 예를 들어서 3명의 사람이 있다면 다음과 같이 6개의 방법이 있습니다.

    [1, 2, 3]
    [1, 3, 2]
    [2, 1, 3]
    [2, 3, 1]
    [3, 1, 2]
    [3, 2, 1]
    
    사람의 수 n과, 자연수 k가 주어질 때, 사람을 나열 하는 방법을 사전 순으로 나열 했을 때, k번째 방법을 return하는 solution 함수를 완성해주세요.

    제한사항
    n은 20이하의 자연수 입니다.
    k는 n! 이하의 자연수 입니다.
    
    입출력 예
    n	k	result
    3	5	[3,1,2]
*/

function solution(n, k) {
    var answer = [];
    var arr = []; // 정렬해야 할 숫자가 담긴 배열
    
    for(var i=1; i<=n; i++) {
        arr.push(i);
    }
    
    while(arr.length>1) {
        var next = arr[Math.ceil(k/factorial(n-1))-1]; // 정렬할 숫자
        answer.push(next);
        arr.splice(arr.indexOf(next),1); // 정렬한 숫자를 arr 배열에서 제거
        k %= factorial(n-1); 
        n--; 
        if(k===1 || k===0) break; 
    }
    if(k===0) arr.reverse();
    answer.push(...arr);
    
    return answer;
}

function factorial(n){
    if(n===0) return 1;
    return n*factorial(n-1);
} 

/*
    알아야 하는 정보
    1부터 n까지의 수를 나열하는 모든 경우의 수는 n!이다.
*/