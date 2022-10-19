/*
    문제 설명
    [본 문제는 정확성과 효율성 테스트 각각 점수가 있는 문제입니다.]

    카카오는 하반기 경력 개발자 공개채용을 진행 중에 있으며 현재 지원서 접수와 코딩테스트가 종료되었습니다. 
    이번 채용에서 지원자는 지원서 작성 시 아래와 같이 4가지 항목을 반드시 선택하도록 하였습니다.
     - 코딩테스트 참여 개발언어 항목에 cpp, java, python 중 하나를 선택해야 합니다.
     - 지원 직군 항목에 backend와 frontend 중 하나를 선택해야 합니다.
     - 지원 경력구분 항목에 junior와 senior 중 하나를 선택해야 합니다.
     - 선호하는 소울푸드로 chicken과 pizza 중 하나를 선택해야 합니다.
    
    인재영입팀에 근무하고 있는 니니즈는 코딩테스트 결과를 분석하여 채용에 참여한 개발팀들에 제공하기 위해 지원자들의 지원 조건을 선택하면 해당 조건에 맞는 지원자가 몇 명인 지 쉽게 알 수 있는 도구를 만들고 있습니다.
    예를 들어, 개발팀에서 궁금해하는 문의사항은 다음과 같은 형태가 될 수 있습니다.
     - 코딩테스트에 java로 참여했으며, backend 직군을 선택했고, junior 경력이면서, 소울푸드로 pizza를 선택한 사람 중 코딩테스트 점수를 50점 이상 받은 지원자는 몇 명인가?

    물론 이 외에도 각 개발팀의 상황에 따라 아래와 같이 다양한 형태의 문의가 있을 수 있습니다.
     - 코딩테스트에 python으로 참여했으며, frontend 직군을 선택했고, senior 경력이면서, 소울푸드로 chicken을 선택한 사람 중 코딩테스트 점수를 100점 이상 받은 사람은 모두 몇 명인가?
     - 코딩테스트에 cpp로 참여했으며, senior 경력이면서, 소울푸드로 pizza를 선택한 사람 중 코딩테스트 점수를 100점 이상 받은 사람은 모두 몇 명인가?
     - backend 직군을 선택했고, senior 경력이면서 코딩테스트 점수를 200점 이상 받은 사람은 모두 몇 명인가?
     - 소울푸드로 chicken을 선택한 사람 중 코딩테스트 점수를 250점 이상 받은 사람은 모두 몇 명인가?
     - 코딩테스트 점수를 150점 이상 받은 사람은 모두 몇 명인가?
    
     즉, 개발팀에서 궁금해하는 내용은 다음과 같은 형태를 갖습니다.
    * [조건]을 만족하는 사람 중 코딩테스트 점수를 X점 이상 받은 사람은 모두 몇 명인가?
    
    
    [문제]
    지원자가 지원서에 입력한 4가지의 정보와 획득한 코딩테스트 점수를 하나의 문자열로 구성한 값의 배열 info, 개발팀이 궁금해하는 문의조건이 문자열 형태로 담긴 배열 query가 매개변수로 주어질 때,
    각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.

    [제한사항]
    info 배열의 크기는 1 이상 50,000 이하입니다.
    info 배열 각 원소의 값은 지원자가 지원서에 입력한 4가지 값과 코딩테스트 점수를 합친 "개발언어 직군 경력 소울푸드 점수" 형식입니다.
        - 개발언어는 cpp, java, python 중 하나입니다.
        - 직군은 backend, frontend 중 하나입니다.
        - 경력은 junior, senior 중 하나입니다.
        - 소울푸드는 chicken, pizza 중 하나입니다.
        - 점수는 코딩테스트 점수를 의미하며, 1 이상 100,000 이하인 자연수입니다.
        - 각 단어는 공백문자(스페이스 바) 하나로 구분되어 있습니다.
    query 배열의 크기는 1 이상 100,000 이하입니다.
    query의 각 문자열은 "[조건] X" 형식입니다.
        - [조건]은 "개발언어 and 직군 and 경력 and 소울푸드" 형식의 문자열입니다.
        - 언어는 cpp, java, python, - 중 하나입니다.
        - 직군은 backend, frontend, - 중 하나입니다.
        - 경력은 junior, senior, - 중 하나입니다.
        - 소울푸드는 chicken, pizza, - 중 하나입니다.
        - '-' 표시는 해당 조건을 고려하지 않겠다는 의미입니다.
        - X는 코딩테스트 점수를 의미하며 조건을 만족하는 사람 중 X점 이상 받은 사람은 모두 몇 명인 지를 의미합니다.
        - 각 단어는 공백문자(스페이스 바) 하나로 구분되어 있습니다.
        - 예를 들면, "cpp and - and senior and pizza 500"은 "cpp로 코딩테스트를 봤으며, 경력은 senior 이면서 소울푸드로 pizza를 선택한 지원자 중 코딩테스트 점수를 500점 이상 받은 사람은 모두 몇 명인가?"를 의미합니다.

    [입출력 예]
    info	                                query	                                            result
    ["java backend junior pizza 150",       ["java and backend and junior and pizza 100",       [1,1,1,1,2,4]
    "python frontend senior chicken 210",   "python and frontend and senior and chicken 200",
    "python frontend senior chicken 150",   "cpp and - and senior and pizza 250",
    "cpp backend senior pizza 260",         "- and backend and senior and - 150",
    "java backend junior chicken 80",       "- and - and - and chicken 100",
    "python backend senior chicken 50"]	    "- and - and - and - 150"]
*/

function solution(info, query) {
    var rule = new Map();
    
    const lowerBound = (arr, target) => {
        let left = 0;
        let right = arr.length; 
        while(left < right){
            const mid = Math.floor((left + right) / 2);

            if(arr[mid] >= target) right = mid;
            else left = mid + 1;
        }
        return left;
    }

    const search = (rule, conditions) => {
        const score = conditions.pop();
        return Array.from(rule.keys())
            .filter(key => conditions.every(v => key.includes(v)))
            .reduce((a, c) => a + rule.get(c).slice(lowerBound(rule.get(c), score)).length, 0);
    }
    
    info.forEach(v => {
        var temp = v.split(' ');
        var score = Number(temp.pop());

        var key = temp.join(''); 
        rule.set(key, rule.has(key) ? [...rule.get(key), score] : [score]);
    });

    for(let [key, value] of rule){
        rule.set(key, value.sort((a, b) => a - b));
    }

    return query.map(e => {
        var conditions = e.split(/ and | |-/i).filter(e => e);
        return search(rule, conditions);
    });
}

/* 
    정확성: 40/40, 효율성: 0/60 (효율성 실패 코드 1)

    function solution(info, query) {
        var answer = [];
        var classification  = {};
        var score = [];
        
        var put_info = (key, index) => {
            if(key in classification) classification[key].push(index);
            else classification[key] = [index];
        }
        
        var classify = (index, arr) => {
            score.push(+arr.pop());
            for(var i=0; i<arr.length; i++) {
                put_info(arr[i], index);
            }
        }
        
        var get_above_score = (standard) => {
            var arr = [];
            score.forEach((v,i) => {
                if(v>=standard) arr.push(i);
            });
            return arr;
        }
        
        info.forEach((v,i)=> classify(i, v.split(' ')));
        
        query.forEach(v=> {
            var temp = v.split(' ');
            var q_score = temp.pop();
            var list = get_above_score(q_score);
            
            for(var i=0; i<temp.length; i++) {
                if(temp[i] === 'and' || temp[i] === '-') continue;
                list = list.filter(v=> classification[temp[i]].includes(v));
            }
            answer.push(list.length);
        });
        
        return answer;
    }
*/

/*
    정확성: 40/40, 효율성: 0/60 (효율성 실패 코드 2)

    function solution(info, query) {
        var answer = [];
        const LANGUAGE = 0, GROUP = 1, CAREER = 2, FOOD = 3, SCORE = 4;
        
        var check_condition = (a,b) => 
            (b[LANGUAGE] === '-' || a[LANGUAGE] === b[LANGUAGE]) &&
            (b[GROUP] === '-' || a[GROUP] === b[GROUP]) &&
            (b[CAREER] === '-' || a[CAREER] === b[CAREER]) &&
            (b[FOOD] === '-' || a[FOOD] === b[FOOD])
        
        var low_boundary = (target) => {
            var left = 0;
            var right = info.length; 
            while(left < right){
                var mid = Math.floor((left + right) / 2);

                if(info[mid] >= target) right = mid;
                else left = mid + 1;
            }
            return left;
        }
        
        info = info.map(v => v.split(' ')).sort((a,b)=> +a[SCORE]- +b[SCORE]);
        query.forEach(v => {
            var temp  = v.replace(/ and /g, ' ').split(' ');
            var count = 0;
            var start = low_boundary(temp[SCORE]);
            
            for(var i=start; i<info.length; i++) {
                if(+info[i][SCORE] >= +temp[SCORE]) {
                    if(check_condition(info[i], temp)) count++;
                }
            }
            answer.push(count);
        });
        return answer;
    }
*/