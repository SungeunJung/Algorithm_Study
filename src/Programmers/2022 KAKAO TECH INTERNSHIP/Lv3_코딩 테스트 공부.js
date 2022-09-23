/*
    문제 설명
    [본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]
    당신은 코딩 테스트를 준비하기 위해 공부하려고 합니다. 코딩 테스트 문제를 풀기 위해서는 알고리즘에 대한 지식과 코드를 구현하는 능력이 필요합니다.
    알고리즘에 대한 지식은 알고력, 코드를 구현하는 능력은 코딩력이라고 표현합니다. 알고력과 코딩력은 0 이상의 정수로 표현됩니다.
    문제를 풀기 위해서는 문제가 요구하는 일정 이상의 알고력과 코딩력이 필요합니다.
    
    예를 들어, 당신의 현재 알고력이 15, 코딩력이 10이라고 가정해보겠습니다.
    A라는 문제가 알고력 10, 코딩력 10을 요구한다면 A 문제를 풀 수 있습니다.
    B라는 문제가 알고력 10, 코딩력 20을 요구한다면 코딩력이 부족하기 때문에 B 문제를 풀 수 없습니다.
    풀 수 없는 문제를 해결하기 위해서는 알고력과 코딩력을 높여야 합니다. 알고력과 코딩력을 높이기 위한 다음과 같은 방법들이 있습니다.

    알고력을 높이기 위해 알고리즘 공부를 합니다. 알고력 1을 높이기 위해서 1의 시간이 필요합니다.
    코딩력을 높이기 위해 코딩 공부를 합니다. 코딩력 1을 높이기 위해서 1의 시간이 필요합니다.
    현재 풀 수 있는 문제 중 하나를 풀어 알고력과 코딩력을 높입니다. 각 문제마다 문제를 풀면 올라가는 알고력과 코딩력이 정해져 있습니다.
    문제를 하나 푸는 데는 문제가 요구하는 시간이 필요하며 같은 문제를 여러 번 푸는 것이 가능합니다.
    당신은 주어진 모든 문제들을 풀 수 있는 알고력과 코딩력을 얻는 최단시간을 구하려 합니다.

    초기의 알고력과 코딩력을 담은 정수 alp와 cop, 문제의 정보를 담은 2차원 정수 배열 problems가 매개변수로 주어졌을 때, 모든 문제들을 풀 수 있는 알고력과 코딩력을 얻는 최단시간을 return 하도록 solution 함수를 작성해주세요.
    모든 문제들을 1번 이상씩 풀 필요는 없습니다. 입출력 예 설명을 참고해주세요.

    제한사항
    초기의 알고력을 나타내는 alp와 초기의 코딩력을 나타내는 cop가 입력으로 주어집니다.
    0 ≤ alp,cop ≤ 150
    1 ≤ problems의 길이 ≤ 100
    problems의 원소는 [alp_req, cop_req, alp_rwd, cop_rwd, cost]의 형태로 이루어져 있습니다.
    alp_req는 문제를 푸는데 필요한 알고력입니다.
    0 ≤ alp_req ≤ 150
    cop_req는 문제를 푸는데 필요한 코딩력입니다.
    0 ≤ cop_req ≤ 150
    alp_rwd는 문제를 풀었을 때 증가하는 알고력입니다.
    0 ≤ alp_rwd ≤ 30
    cop_rwd는 문제를 풀었을 때 증가하는 코딩력입니다.
    0 ≤ cop_rwd ≤ 30
    cost는 문제를 푸는데 드는 시간입니다.
    1 ≤ cost ≤ 100
    
    정확성 테스트 케이스 제한사항
    0 ≤ alp,cop ≤ 20
    1 ≤ problems의 길이 ≤ 6
    0 ≤ alp_req,cop_req ≤ 20
    0 ≤ alp_rwd,cop_rwd ≤ 5
    1 ≤ cost ≤ 10
    
    효율성 테스트 케이스 제한사항
    주어진 조건 외 추가 제한사항 없습니다.
    
    입출력 예
    alp	    cop	    problems	                                            result
    10	    10	    [[10,15,2,1,2],[20,20,3,3,4]]	                        15
    0	    0	    [[0,0,2,1,2],[4,5,3,1,2],[4,11,4,0,2],[10,4,0,4,2]]	    13
*/

function solution(alp, cop, problems) {
    var [max_alp, max_cop] = [0, 0];
    problems.forEach(v=> {
        var [a_req, c_req, a_rwd, c_rwd, cost] = v;
        if(max_alp < a_req) max_alp = a_req;
        if(max_cop < c_req) max_cop = c_req;
    });
    alp = Math.min(alp, max_alp);
    cop = Math.min(cop, max_cop);
    var dp = Array.from({length:max_alp+1}, ()=> Array(max_cop+1).fill(Infinity));
    dp[alp][cop] = 0;
    for(var i=alp; i<=max_alp; i++) {
        for(var j=cop; j<=max_cop; j++) {
            if(i+1<=max_alp)
                dp[i+1][j] = Math.min(dp[i][j]+1, dp[i+1][j]);
            if(j+1<=max_cop)
                dp[i][j+1] = Math.min(dp[i][j]+1, dp[i][j+1]);
            
            for(var k=0; k<problems.length; k++) {
                var [a_req, c_req, a_rwd, c_rwd, cost] = problems[k];
                if(a_req<=i && c_req<=j) {
                    var next_a = Math.min(i+a_rwd, max_alp);
                    var next_c = Math.min(j+c_rwd, max_cop);
                    dp[next_a][next_c] = Math.min(dp[i][j]+cost, dp[next_a][next_c]);
                }
            }
        }
    }
    return dp[max_alp][max_cop];
}

/*
    정확성: 50/50, 효율성: 10/50 (효율성 실패 코드)

    function solution(alp, cop, problems) {
        var answer = Number.MAX_SAFE_INTEGER;
        var [max_alp, max_cop] = [0, 0];
        var dp = Array.from({length:151}, ()=> Array(151).fill(250));
        dp[alp][cop] = 0;
        problems.forEach(v=> {
            var [a_req, c_req, a_rwd, c_rwd, cost] = v;
            if(max_alp < a_req) max_alp = a_req;
            if(max_cop < c_req) max_cop = c_req;
        });
        
        for(var i=alp; i<dp.length-1; i++) {
            for(var j=cop; j<dp.length-1; j++) {
                if(i>=max_alp && j>=max_cop) {
                    answer = Math.min(answer, dp[i][j]);
                    break;
                }
                dp[i+1][j] = Math.min(dp[i][j]+1, dp[i+1][j]);
                dp[i][j+1] = Math.min(dp[i][j]+1, dp[i][j+1]);
                
                for(var k=0; k<problems.length; k++) {
                    var [a_req, c_req, a_rwd, c_rwd, cost] = problems[k];
                    if(a_req<=i && c_req<=j) {
                        var next_a = i+a_rwd;
                        var next_c = j+c_rwd;
                        if(next_a>=dp.length || next_c>=dp.length) break;
                        dp[next_a][next_c] = Math.min(dp[i][j]+cost, dp[next_a][next_c]);
                        if(next_a>=max_alp && next_c>=max_cop) {
                            answer = Math.min(answer, dp[next_a][next_c]);
                        }
                    }
                }
            }
        }
        return answer;
    }
*/