# TypeScript

## TypeScript란?

JavaScript에 타입 시스템을 추가한 프로그래밍 언어. JavaScript의 확장판

코드 작성 중에 오류 발견 가능

자동 완성 기능 향상

코드 이해 쉬움

리팩토링 수월

## 기본 타입

### tuple

배열과 비슷하지만 길이와 각 위치의 타입 고정

```typescript
let response: [number, string] = [200, '성공'];
```

### unknown

any보다 안전한 버전 - 사용 전에 타입 체크 필요

```typescript
let value: unknown = 'hello';

// value.toUpperCase(); // 오류! 타입 체크 필요
if (typeof value === 'string') {
  value.toUpperCase(); // OK
}
```

### void

변환값 없는 함수에 사용

### never

절대 발생하지 않는 값의 타입. 함수가 정상적으로 끝나지 않거나, 절대 도달할 수 없는 코드 표현 시 사용

```typescript
// 1. 항상 에러를 던지는 함수
function throwError(message: string): never {
  throw new Error(message);
}

// void와의 차이
function logError(message: string): void {
  console.log(message);
  // 반환값이 없지만 함수는 정상 종료됨
}

// 2. 무한 루프
function infiniteLoop(): never {
  while (true) {}
}

// 3. 타입 가드에서 모든 경우를 처리했음을 보장
// 나중에 Shape에 새로운 타입을 추가했을 때 컴파일 에러가 발생해서 빠뜨린 케이스 찾을 수 있음
type Shape = 'circle' | 'square' | 'triangle';

function getArea(shape: Shape) {
  switch (shape) {
    case 'circle':
      return Math.PI * 10 * 10;
    case 'square':
      return 10 * 10;
    case 'triangle':
      return (10 * 10) / 2;
    default:
      // 여기 도달하면 안 되는 코드
      const exhaustiveCheck: never = shape;
      throw new Error(`처리되지 않은 shape: ${shape}`);
  }
}

// 4. 유니온 타입에서 불가능한 경우 제거
type A = string | number;
type B = string | boolean;

// A와 B 둘 다 만족하면서 string이 아닌 타입은?
type OnlyInBoth = A & B; // string

// string과 number를 제외하면?
type Excluded = Exclude<A, string>; // number
type NeverType = Exclude<string, string>; // never (아무것도 남지 않음)

// 5. 도달할 수 없는 코드
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else if (typeof value === 'number') {
    return value.toFixed(2);
  }

  // 여기는 절대 도달할 수 없음
  // value의 타입은 여기서 never
  value; // type: never
}
```

### 리터럴 타입

특정 값만 허용

```typescript
let direction: 'left' | 'right' | 'up' | 'down';
direction = 'left'; // OK
// direction = "center"; // 오류!

let status: 200 | 404 | 500 = 200;
```

## 타입 선언, 추론, 단언

타입 선언: 개발자가 명시적으로 타입 지정. 안정성 높음

타입 추론: 타입스크립트가 자동으로 타입 파악. 코드 간결성 높음

```typescript
// as 키워드 사용
let value: any = 'hello';
let length = (value as string).length;

// DOM 요소
const input = document.getElementById('myInput') as HTMLInputElement;
input.value = '새 값';

// Non-null assertion (!)
let userName: string | null = getUserName();
console.log(userName!.toUpperCase()); // null이 아님을 단언
```

### 타입 추론에 맡겨도 되는 경우

- 초기값이 명확한 변수
- 간단한 함수의 반환값
- 명백한 문맥이 있는 경우

타입 단언: 개발자가 타입스크립트보다 더 정확히 알고 있을 때 사용

## 인터페이스, 타입

### 인터페이스

객체 구조 정의

- 선택적 속성
- 읽기 전용 속성
- 함수 타입 정의

```typescript
interface Calculator {
  add: (a: number, b: number) => number;
  subtract: (a: number, b: number) => number;
}

const calc: Calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b
};
```

- 인터페이스 확장

```typescript
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const employee: Employee = {
  name: '홍길동',
  age: 25,
  employeeId: 'E001',
  department: '개발팀'
};

// 여러 인터페이스 확장
interface Manager extends Person, Employee {
  team: string[];
}
```

### 타입 별칭

- 기본, 객체 타입
- 유니온 타입(|)
- 인터섹션 타입(&)
- 함수 타입

### 인터페이스, 타입 차이점

확장 - 인터페이스는 extends, 타입은 & 사용

병합 - 인터페이스는 선언으로 병합 가능, 타입은 선언으로 병합 불가

유니온 - 인터페이스는 직접 사용 불가, 타입은 사용 가능

```typescript
// Type - 유니온 사용 가능 ✅
type Status = 'loading' | 'success' | 'error';
type ID = string | number;

// Interface - 유니온 직접 사용 불가 ❌
// interface Status = "loading" | "success" | "error";  // 오류!
```

Computed Properties - 인터페이스는 제한적, 타입은 사용 가능

```typescript
// Type - 계산된 속성 사용 가능 ✅
type Keys = 'name' | 'age';
type User = {
  [key in Keys]: string;
};

// Interface - 계산된 속성 제한적
interface User2 {
  [key: string]: string; // 인덱스 시그니처만 가능
}
```

### 인터페이스, 타입, 클래스 차이점

인터페이스, 타입은 타입 정의만 가능. 컴파일 후 사라짐
클래스는 실제 값을 생성. 런타임에 존재
인터페이스, 타입은 메서드 시그니처만 정의. 구현은 직접 해야 함
클래스는 메서드 구현까지
클래스는 implement로 인터페이스, 타입 구현

타입 정의만 필요한 경우 인터페이스, 타입 사용. 비즈니스 로직이 있는 경우 클래스 사용

## 제네릭

### 여러 개의 제네릭

```typescript
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const result1 = pair<string, number>('age', 25);
const result2 = pair('name', '홍길동'); // 타입 추론
```

### 제네릭 제약

```typescript
// T는 반드시 length 속성을 가져야 함
function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

// 더 구체적인 제약
interface HasName {
  name: string;
}

function printName<T extends HasName>(obj: T): void {
  console.log(obj.name);
}

printName({ name: '홍길동', age: 25 }); // OK
// printName({ age: 25 });                // 오류! name이 없음

// keyof 사용
// K는 T의 키 중 하나여야 함
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  name: '홍길동',
  age: 25,
  email: 'hong@example.com'
};

const name = getProperty(user, 'name'); // string
const age = getProperty(user, 'age'); // number
// const x = getProperty(user, "phone");   // 오류! phone 키 없음
```

### 제네릭 기본값

```typescript
interface Response<T = string> {
  data: T;
  status: number;
}

// 타입 지정 안 하면 string이 기본값
// 다른 타입도 지정 가능
const response1: Response = {
  data: 'hello',
  status: 200
};
```

## 타입 가드, 타입 좁히기

### 타입 좁히기: 넓은 타입을 더 구체적인 타입으로 좁혀가는 과정

### typeof 타입 가드

원시 타입 구분할 때 사용
typeof로 체크 가능한 타입들: string, number, boolean, symbol, undefined, object, function

```typescript
// typeof의 한계
function check(value: string | string[] | null) {
  if (typeof value === 'object') {
    // value는 string[] | null (배열과 null 둘 다 object!)
    // value.length;  // 오류! null일 수도 있음
  }
}
```

### instanceof 타입 가드

클래스 인스턴스 구분할 때 사용. 내장 객체에도 사용 가능

```typescript
function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog로 좁혀짐
  } else {
    animal.meow(); // Cat으로 좁혀짐
  }
}
```

### in 타입 가드

객체에 특정 속성 있는지 확인

```typescript
function greet(person: User | Admin) {
  console.log(`안녕하세요, ${person.name}님`);

  if ('role' in person) {
    // Admin으로 좁혀짐
    console.log(`권한: ${person.role}`);
    console.log(`허가: ${person.permissions.join(', ')}`);
  } else {
    // User로 좁혀짐
    console.log(`이메일: ${person.email}`);
  }
}
```

### Truthiness 타입 좁히기

```typescript
if (value) {
  // false, 0, -0, 0n, '', null, undefined, NaN는 거짓으로 판별
}
```

## 유틸리티 타입

기존 타입을 변형해 새로운 타입을 만드는 내장 도구

### Partial<T>

모든 속성을 선택 사항으로 만듦

이 유틸리티는 주어진 형식의 모든 하위 집합을 나타내는 형식을 반환

### Required<T>

모든 속성을 필수 사항으로 만듦. Partial의 반대

### Readonly<T>

모든 속성을 읽기 전용으로 만듦

### Record<K, T>

속성 키가 Keys 이고 속성 값이 Type 인 객체 유형을 생성

이 유틸리티는 유형의 속성을 다른 유형에 매핑하는 데 사용

```typescript
type CatName = 'miffy' | 'boris' | 'mordred';

interface CatInfo {
  age: number;
  breed: string;
}

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' }
};
```

### Pick<T, K>

특정 속성만 선택해서 타입 만들기

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false
};
```

### Omit<T, K>

특정 속성을 제외하고 타입 만들기. Pick의 반대

### Exclude<T, U>

유니온 타입에서 특정 타입 제외

### Extract<T, U>

유니온 타입에서 특정 타입만 추출. Exclude의 반대

### NonNullable<T>

null과 undefined 제거

### ReturnType<T>

함수의 반환 타입 추출

```typescript
function getUser() {
  return {
    id: '001',
    name: '홍길동',
    email: 'hong@example.com'
  };
}

type User = ReturnType<typeof getUser>;
// { id: string; name: string; email: string; }

// 실전 예제
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

type FetchDataResult = ReturnType<typeof fetchData>;
// Promise<any>

// Awaited와 조합
type Data = Awaited<ReturnType<typeof fetchData>>;
```

### Parameters<T>

함수의 매개변수 타입들을 튜플로 추출

```typescript
function createUser(name: string, age: number, email?: string) {
  return { name, age, email };
}

type CreateUserParams = Parameters<typeof createUser>;
// [name: string, age: number, email?: string | undefined]

// 실전 예제: 함수 래퍼
function logAndCall<T extends (...args: any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T> {
  console.log('함수 호출:', args);
  return fn(...args);
}

logAndCall(createUser, '홍길동', 25);
```

### Awaited<T>

Promise의 최종 결과 타입 추출

```typescript
type PromiseString = Promise<string>;
type Result = Awaited<PromiseString>;
// string

// 중첩된 Promise도 해결
type NestedPromise = Promise<Promise<number>>;
type NestedResult = Awaited<NestedPromise>;
// number

// 실전 예제
async function fetchUser() {
  return { id: '001', name: '홍길동' };
}

type User = Awaited<ReturnType<typeof fetchUser>>;
// { id: string; name: string; }
```

### 실전 예제

```typescript
// API 타입 관리
// 기본 User 타입
interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

// 회원가입 시 - id, createdAt, updatedAt 제외
type SignupData = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

// 로그인 시 - email과 password만
type LoginData = Pick<User, 'email' | 'password'>;

// 공개 프로필 - password 제외
type PublicProfile = Omit<User, 'password'>;

// 업데이트 - 일부만 선택적으로
type UpdateData = Partial<Pick<User, 'name' | 'email'>>;

// 읽기 전용 응답
type UserResponse = Readonly<PublicProfile>;

function signup(data: SignupData): Promise<UserResponse> {
  // 회원가입 로직
  return Promise.resolve({} as UserResponse);
}

function login(data: LoginData): Promise<UserResponse> {
  // 로그인 로직
  return Promise.resolve({} as UserResponse);
}

function updateProfile(id: string, data: UpdateData): Promise<UserResponse> {
  // 프로필 업데이트
  return Promise.resolve({} as UserResponse);
}

// 폼 타입 관리
interface FormField {
  name: string;
  value: string;
  error?: string;
  touched: boolean;
}

// 폼 데이터는 name을 키로
type FormData<T extends string> = Record<T, FormField>;

// 폼 값만 추출
type FormValues<T extends FormData<any>> = {
  [K in keyof T]: T[K]['value'];
};

// 사용 예제
type LoginFields = 'email' | 'password';
type LoginForm = FormData<LoginFields>;

const loginForm: LoginForm = {
  email: {
    name: 'email',
    value: '',
    touched: false
  },
  password: {
    name: 'password',
    value: '',
    touched: false
  }
};

type LoginValues = FormValues<LoginForm>;
// { email: string; password: string; }
```

## 조건부 타입

조건에 따라 타입을 다르게 정의. 삼항 연산자처럼 동작

```typescript
T extends U ? X : Y
// T가  U를 확장(포함)하면 X, 아니면 Y
```
