/*
    문제
    N×N크기의 땅이 있고, 땅은 1×1개의 칸으로 나누어져 있다. 각각의 땅에는 나라가 하나씩 존재하며, r행 c열에 있는 나라에는 A[r][c]명이 살고 있다. 인접한 나라 사이에는 국경선이 존재한다. 모든 나라는 1×1 크기이기 때문에, 모든 국경선은 정사각형 형태이다.
    오늘부터 인구 이동이 시작되는 날이다.
    인구 이동은 하루 동안 다음과 같이 진행되고, 더 이상 아래 방법에 의해 인구 이동이 없을 때까지 지속된다.
    - 국경선을 공유하는 두 나라의 인구 차이가 L명 이상, R명 이하라면, 두 나라가 공유하는 국경선을 오늘 하루 동안 연다.
    - 위의 조건에 의해 열어야하는 국경선이 모두 열렸다면, 인구 이동을 시작한다.
    - 국경선이 열려있어 인접한 칸만을 이용해 이동할 수 있으면, 그 나라를 오늘 하루 동안은 연합이라고 한다.
    - 연합을 이루고 있는 각 칸의 인구수는 (연합의 인구수) / (연합을 이루고 있는 칸의 개수)가 된다. 편의상 소수점은 버린다.
    - 연합을 해체하고, 모든 국경선을 닫는다.

    각 나라의 인구수가 주어졌을 때, 인구 이동이 며칠 동안 발생하는지 구하는 프로그램을 작성하시오.

    입력
    첫째 줄에 N, L, R이 주어진다. (1 ≤ N ≤ 50, 1 ≤ L ≤ R ≤ 100)
    둘째 줄부터 N개의 줄에 각 나라의 인구수가 주어진다. r행 c열에 주어지는 정수는 A[r][c]의 값이다. (0 ≤ A[r][c] ≤ 100)
    인구 이동이 발생하는 일수가 2,000번 보다 작거나 같은 입력만 주어진다.

    출력
    인구 이동이 며칠 동안 발생하는지 첫째 줄에 출력한다.

    예제 입력 1     예제 입력 2     예제 입력 3     예제 입력 4     예제 입력 5 
    2 20 50         2 40 50         2 20 50        3 5 10          4 10 50
    50 30           50 30           50 30          10 15 20        10 100 20 90
    20 40           20 40           30 40          20 30 25        80 100 60 70
                                                   40 22 10        70 20 30 40
                                                                   50 20 100 10

    예제 출력 1     예제 출력 2     예제 출력 3     예제 출력 4     예제 출력 5
    1               0               1              2               3
*/

var input = require('fs').readFileSync('./example.txt').toString().trim().split('\n');
var [N,L,R] = input[0].split(' ').map(Number);
var A = new Array(N);
for(var i=1; i<=N; i++) {
    A[i-1] = input[i].split(' ').map(Number);
}

function solution(N, least, most, country) {
    const dx = [0,1,0,-1], dy=[1,0,-1,0];
    var union = Array.from({length:N}, ()=>Array(N).fill(0)); 
    var country_num = 1, country_info = {};
    var answer = 0;

    var out_of_board = (x,y) => x<0 || y<0 || x>=N || y>=N; 
    var in_the_range = (c_pop,n_pop) => 
        Math.abs(c_pop-n_pop) >= least && Math.abs(c_pop-n_pop) <= most;
    
    var move_population = (new_pop) => {
        for(var i=0; i<N; i++) {
            for(var j=0; j<N; j++) {
                if(union[i][j] === country_num) {
                    country[i][j] = new_pop;
                }
            }
        }
    }
    
    var connect_country = (curX,curY) => {
        union[curX][curY] = country_num;
        country_info[country_num].sum += country[curX][curY];
        country_info[country_num].count++;
        for(var i=0; i<dx.length; i++) {
            var [nextX,nextY] = [curX+dx[i], curY+dy[i]];
            if(out_of_board(nextX,nextY)) continue;
            if(!union[nextX][nextY] && in_the_range(country[curX][curY], country[nextX][nextY])) {
                connect_country(nextX,nextY);
            }
        }
    }
    
    var movement = true;
    while(movement) {
        movement = false;
        union = Array.from({length:N}, ()=>Array(N).fill(0)); 
        country_num = 1;
        country_info = {};
        for(var i=0; i<N; i++) {
            for(var j=0; j<N; j++) {
                if(!union[i][j]) {
                    country_info[country_num] = {count:0, sum:0};
                    connect_country(i,j);
                    if(country_info[country_num].count>1) {
                        movement = true;
                        move_population(Math.floor(country_info[country_num].sum/country_info[country_num].count));
                    }
                    country_num++;
                }
            }
        }
        if(movement) answer++;
    }
    return answer;
}

console.log(solution(N,L,R,A));