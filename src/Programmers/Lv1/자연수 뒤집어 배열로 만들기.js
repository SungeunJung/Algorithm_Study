/*
문제 설명
자연수 n을 뒤집어 각 자리 숫자를 원소로 가지는 배열 형태로 리턴해주세요. 예를들어 n이 12345이면 [5,4,3,2,1]을 리턴합니다.

제한 조건
n은 10,000,000,000이하인 자연수입니다.

입출력 예
n	    return
12345	[5,4,3,2,1]
*/

function solution(n) {
    var answer = [];
    answer = n.toString().split('').reverse();

    //answer에는 Number가 아닌 string으로 들어가 있어서
    //형변환해줘야 함
    for(let i=0; i<answer.length; i++) {
        answer[i]= parseInt(answer[i]);
    }
    
    return answer;
}

/*
map을 사용해서 더 간략하게 표현하기
n.toString().split('').reverse().map(val => parseInt(val));
*/