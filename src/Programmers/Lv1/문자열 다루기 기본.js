/*
    문제 설명
    문자열 s의 길이가 4 혹은 6이고, 숫자로만 구성돼있는지 확인해주는 함수, solution을 완성하세요. 예를 들어 s가 "a234"이면 False를 리턴하고 "1234"라면 True를 리턴하면 됩니다.

    제한 사항
    s는 길이 1 이상, 길이 8 이하인 문자열입니다.

    입출력 예
    s	        return
    "a234"	    false
    "1234"	    true
*/

function solution(s) {
    var answer = true;
    if(s.length!=4 && s.length!=6 || s!=Math.abs(parseInt(s))) answer = false;
    return answer;
}

/*
    처음에 isNaN()을 조건문에 사용했었는데 자연상수 e와 실수, 음수 모두 숫자로 인식한다.
    e.g.) isNaN()이 false를 반환하는 경우
        isNaN("123e+1")
        isNaN("123.4")
        isNaN("-123")

    그렇기 때문에 자연상수 e와 실수를 거르기 위해서 parseInt()를 사용하고, 
    음수 부호를 거르기 위해 Math.abs()를 사용하여 기존 string s와 값을 비교한다.

    다만 문제에서는 음수에 대한 테스트 케이스가 없는지 Math.abs()를 하지 않아도 통과한다. 
*/