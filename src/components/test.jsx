// factorial: n이 자연수, 1~n까지의 곱.
// 이 함수는 재귀만 사용하고, 중간 계산값을 어디에도 저장하지 않음.
// 같은 n으로 여러 번 호출하면 매번 처음부터 다시 계산해요.
function factorial(n) {
  if(n ===0) return 1;
  return n * factorial(n-1);
}

/**
 * 전역에 lookupTable이라는 빈 객체를 하나 생성.
  이 객체는 n값을 key로, n! 결과를 value로 저장하는 캐시(메모이제이션 테이블) 역할.
  예: lookupTable[5]에 120을 저장해 두면, 다음에 factorial_memo(5)를 호출할 때 다시 계산하지 않고 바로 사용 가능. 
  factorial_memo라는 이름의 함수를 선언.
  factorial과 동일하게 n의 팩토리얼을 구하지만, 
  이미 계산한 값은 lookupTable에 저장해두고 재사용하는 버전.
메모이제이션 핵심 부분.

이미 lookupTable에 n에 대한 팩토리얼 값이 저장되어 있다면,
재귀 호출을 더 하지 않고 바로 그 값을 리턴.

예: 전에 factorial_memo(5)를 한 번 계산해서 lookupTable[5] = 120이 저장되어 있다면,
다음에 factorial_memo(5)를 부르면 여기서 바로 120 리턴.

다만, 이 줄은 살짝 주의할 점이 있어요.
lookupTable[n]이 0이거나 undefined인 경우도 고려하려면
if (lookupTable[n] !== undefined) 처럼 쓰는 게 더 안전한 패턴이에요.
(팩토리얼은 0이 안 나오긴 해서 여기선 큰 문제는 안 생기지만 패턴상으로는 조금 애매)

 */
const lookupTable = {}
function factorial_memo(n){
  if (n===0) return 1;
  if(lookupTable[n]) return lookupTable[n];
  const v = n * factorial_memo(n -1);
  lookupTable[n] = v;
  return v;
}