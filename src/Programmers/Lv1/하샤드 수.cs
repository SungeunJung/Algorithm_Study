/*
    문제 설명
    양의 정수 x가 하샤드 수이려면 x의 자릿수의 합으로 x가 나누어져야 합니다. 예를 들어 18의 자릿수 합은 1+8=9이고, 18은 9로 나누어 떨어지므로 18은 하샤드 수입니다. 자연수 x를 입력받아 x가 하샤드 수인지 아닌지 검사하는 함수, solution을 완성해주세요.

    제한 조건
    x는 1 이상, 10000 이하인 정수입니다.
    
    입출력 예
    arr	    return
    10	    true
    12	    true
    11	    false
    13	    false
*/

public class Solution {
    public bool solution(int x) {
        bool answer = true;
        int sum = 0;
        int rest = x; 
        
        while(rest>0) {
            sum += rest%10;
            rest = rest/10;
        }
        
        if(x%sum != 0) answer=false;
        return answer;
    }
}

/*
    다른 사람 풀이

    using System.Linq;

    public class Solution {
        public bool solution(int x) {
            bool answer = true;

            var temp = x.ToString().ToList().Select(y => int.Parse(y.ToString())).Sum();

            if (x % temp != 0)
                answer = false;

            return answer;
        }
    }
*/