# JavaScript

## JavaScript란?

웹페이지를 동적이고 인터랙티브하게 만드는 프로그래밍 언어. 웹페이지의 동작을 담당

## 객체 대입, 복사

변수를 ref, reactive로 초기화 했어도, a1에 a2를 대입하면 참조가 끊어져 a2의 값이 변해도 a1의 값은 화면에서 바로 변하지 않음

## 반복문

### for ... in 문

객체의 속성을 반복

<br>

```javascript
let car = {
  make: 'Ford',
  model: 'Mustang'
};

function dump_props(obj, obj_name) {
  var result = '';
  for (var i in obj) {
    result += obj_name + '.' + i + ' = ' + obj[i] + '<br>';
  }
  result += '<hr>';
  return result;
}

dump_props(car, 'car');
// car.make = Ford;
// car.model = Mustang;
```

### for ... of 문

배열의 요소를 반복

```javascript
let arr = [3, 5, 7];
arr.foo = 'hello';

for (let i in arr) {
  console.log(i); // logs "0", "1", "2", "foo"
}

for (let i of arr) {
  console.log(i); // logs "3", "5", "7"
}
```

### 배열의 반복 함수 foreach()

```javascript
const sparseArray = ['first', 'second', , 'fourth'];

sparseArray.forEach((element) => {
  console.log(element);
});
// Logs:
// first
// second
// fourth

if (sparseArray[2] === undefined) {
  console.log('sparseArray[2] is undefined'); // true
}

const nonsparseArray = ['first', 'second', undefined, 'fourth'];

nonsparseArray.forEach((element) => {
  console.log(element);
});
// Logs:
// first
// second
// undefined
// fourth
```

## 함수

### 함수 정의

<strong>함수 선언</strong>

```javascript
function square(number) {
  return number * number;
}
```

<br>

<strong>함수 표현식</strong>
함수 표현식은 함수를 다른 함수의 매개변수로 전달할 때 편리

```javascript
// 익명 함수
const square = function (number) {
  return number * number;
};

// 이름이 있는 함수
const factorial = function fac(n) {
  return n < 2 ? 1 : n * fac(n - 1);
};
```

### 콜백 함수

다른 함수에 인자로 전달되는 함수. 나중 특정 시점에 호출되어 돌아오는 함수.

## ES6 문법

ES6(ECMAScript 6)는 자바스크립트의 6번째 표준안. 현대적인 코드를 사용할수록 코드가 간결해지고 생산성 향상.

### 구조 분해(destructing)

객체와 배열의 값을 변수에 쉽게 저장

```javascript
// 객체
const introduce = { name: 'unknown', age: 23 };
// key와 같은 이름으로 변수 선언
const { name, age } = introduce;
// 다른 이름으로 변수 선언 -> 변수이름: 키값
const { myName: name, myAge: age } = introduce;

// 배열
const fruits = ['apple', 'mango', 'grape'];
// 앞에서부터 순차적으로 변수 선언 가능
const [zero, one, two] = fruits;
```

객체는 중괄호를 사용해 key와 같은 이름으로 꺼내올 수 있고, 다른 이름으로 꺼낼 땐 변수 이름 : 키 값 으로 꺼내옴. 배열은 대괄호를 사용해 순차적으로 꺼내옴.

### 템플릿 리터럴(Template Literals)

ES^부터 새로 도입된 문자열 표기법으로, 문자열 생성 시 따옴표 대신 백틱(`) 사용. 따옴표와 달리 백틱 안에서는 줄바꿈 반영

```javascript
var jsp = '자바스크립트';

// 기존 코드
console.log('이건 ' + jsp + '입니다.');

// 템플릿 리터럴 방식
console.log(`이건 ${jsp}입니다.`);

// 출력 결과 -> 이건 자바스크립트입니다.
```

### 전개 연산자(Spread Operator), 나머지 연산자(Rest Operator)

```javascript
// 전개 연산자
// 배열 복사/합치기
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const combined = [...arr1, ...arr2];

// 객체 복사/합치기
const obj1 = { name: '철수', age: 25 };
const obj2 = { ...obj1, city: '서울' }; // 속성 추가
const obj3 = { ...obj1, age: 30 }; // 속성 덮어쓰기

// 나머지 연산자
// 나머지 연산자는 마지막 매개변수에만 가능
// 나머지 요소들을 배열로 받기
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest); // [2, 3, 4, 5]

// 함수에서 사용
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

### 화살표 함수

화살표 함수 표현은 함수 표현식에 비해 짧은 문법

```javascript
var a = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium'];

var a2 = a.map(function (s) {
  return s.length;
});
console.log(a2); // logs [8, 6, 7, 9]

// 화살표 함수 사용
var a3 = a.map((s) => s.length);
console.log(a3); // logs [8, 6, 7, 9]
```

<br>

화살표 함수는 언제나 익명

인수가 하나면 괄호 생략 가능. 하나도 없을 땐 괄호 비워놓으면 되고, 괄호 생략은 불가능. 본문 한 줄이면 중괄호 생략 가능. 중괄호 사용 시 return으로 반환해야 함.

객체 리터럴을 반환하려면 소괄호로 감싸야 함

화살표 함수에는 this가 존재하지 않음. this 키워드로 접근하면, 자신이 아닌 외부에서 값을 가져옴

화살표 함수엔 arguments가 없음. arguments란 일반 함수가 호출될 때 전달된 인수들을 담고 있는 유사 배열 객체. 대신에 나머지 매개변수(rest parameter) ...args 사용

화살표 함수는 생성자 함수가 없음. 객체를 생성하는 용도로 사용할 수 없음.

화살표 함수를 addEventListener 함수의 콜백 함수로 사용할 때도 주의 필요.
addEventListener 함수는 이벤트가 발생할 때마다 콜백 함수를 호출하는데, 이 때 콜백 함수의 this는 이벤트가 발생한 요소를 가리킴. 하지만 화살표 함수를 콜백 함수로 사용하면, this는 외부 렉시컬 환경의 this를 가리키므로, 원하지 않는 결과(this = window)가 나올 수 있음. 현업에서 화살표 함수를 쓰는 경우에는 addEventListener의 매개변수인 event 객체의 currentTarget 혹은 target 프로퍼티를 사용하여 이벤트 발생 요소에 접근하는 편.

```javascript
<button>Click me!</button>

<script>
let button = document.querySelector('button');

button.addEventListener('click', function() {
  console.log(this); // <button> 요소
});

button.addEventListener('click', () => {
  console.log(this); // window 객체
});
</script>
```

<br>

출처: https://inpa.tistory.com/entry/JS-📚-자바스크립트-화살표-함수-정리 [Inpa Dev 👨‍💻:티스토리]

<br>

### 모듈 내보내기, 가져오기(export, import)

```javascript
// named export 기본 형식
export { 모듈명1, 모듈명2 };
import { 모듈명1, 모듈명2 } from 'js 파일 경로';

// default export 기본 형식
export default 모듈명;
import 모듈명 from 'js 파일 경로';
```

named export는 한 파일에서 여러 개 export할 때 사용. 동일한 이름으로 import 하며 중괄호로 묶음. 다른 이름으로 하려면 as 사용. default export는 한 파일에서 하나의 변수 또는 클래스 등만 export 가능. import 할 때 아무 이름으로 가능. 중괄호 필요없음.

### 옵셔널 체이닝(?.)

```javascript
const user = {
  name: '철수',
  address: {
    city: '서울'
  }
};

// 기존 방식 (에러 방지)
const city1 = user && user.address && user.address.city;

// ES6+ 방식
const city2 = user?.address?.city; // 중간에 null/undefined면 undefined 반환
const zipCode = user?.address?.zipCode; // undefined (에러 안남)
```

### Null 병합 연산자(??)

```javascript
// || 연산자의 문제점
const count1 = 0 || 10; // 10 (0도 falsy로 취급)
const text1 = '' || '기본값'; // '기본값' (빈 문자열도 falsy)

// ?? 연산자 (null과 undefined만 체크)
const count2 = 0 ?? 10; // 0
const count3 = null ?? 10; // 10
const text2 = '' ?? '기본값'; // ''
const text3 = undefined ?? '기본값'; // '기본값'
```

## Single Thread, 병렬 처리

### Promise

어떤 작업의 중간상태를 나타내는 오브젝트

미래에 어떤 종류의 결과가 반환됨을 promise(약속) 해주는 오브젝트

작업이 완료되어 결과를 반환해주는 정확한 시간을 보장해주지는 않지만, 사용할 수 있는 결과를 반환했을 때 프로그래머의 의도대로 다음 코드를 진행 시키거나, 에러가 발생했을 때 그 에러를 처리

### async-await

JavaScript는 Single Thread로 동기식으로 처리됨. 한 번에 한 줄씩 순차적으로 실행됨. setTImeout이나 async 함수 같이 비동기 함수가 실행될 때는 비동기식으로 처리되도록 구성되어있음(Call Stack, Web API, Task Que, Event Loop)

함수 앞에 async를 붙이면 항상 프로미스를 결과로 반환하고 함수를 비동기 함수로 만듦. await는 프로미스가 처리될 때까지 기다린 후 결과 반환. await는 함수 내부 실행을 잠시 멈추는 것이지, 전체 프로그램 실행을 멈추는 게 아님. 이벤트 루프가 다른 작업(UI렌더링, 다른 네트워크 요청 등)을 계속 진행함

따라서 함수 내에 axios 호출(async-await)이 포함되어있으면 async-await를 걸어두지 않으면 비동기로 처리되기 때문에 응답을 제대로 활용할 수 없음

<br>

https://velog.io/@jaehyeon23/Javascript-%EC%99%80-%EC%8A%A4%EB%A0%88%EB%93%9CThread
