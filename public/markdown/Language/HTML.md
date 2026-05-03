# HTML

## DOM(문서 객체 모델)

웹 페이지를 스크립트 또는 프로그래밍 언어와 연결

이는 문서의 구조(예: 웹 페이지를 나타내는 HTML)를 메모리에 표현함으로써 이루어짐

일반적으로 JavaScript를 지칭하지만, HTML, SVG, 또는 XML 문서를 객체로 모델링하는 것은 핵심 JavaScript 언어의 일부가 아님

<br>

DOM은 HTML 문서의 요소를 논리적 트리로 표현

트리의 각 가지는 노드에서 끝나며, 각 노드는 객체를 포함

DOM 메서드를 사용하면 프로그래밍 방식으로 트리에 접근

이를 통해 문서의 구조, 스타일, 또는 내용을 변경

노드에는 이벤트 핸들러도 첨부 가능

이벤트가 트리거되면 이벤트 핸들러가 실행

## Event

### 이벤트 전파(Event Propagation)

전파 방향에 따라 버블링과 캡처링으로 구분

어떤 전파 방향을 사용할 것이냐는 자바스크립트 설정을 통해 제어할수 있으며 동시 사용도 가능

버블링(Bubbling): 자식 요소에서 발생한 이벤트가 바깥 부모 요소로 전파 (기본값)

캡쳐링(Capturing): 자식 요소에서 발생한 이벤트가 부모 요소부터 시작하여 안쪽 자식 요소까지 도달

만일 타깃 요소까지 이벤트를 전파하는 과정에서 그의 부모, 조상, 자식에도 이벤트 리스너가 등록되어 있다면 실행됨

### 버블링, 캡처링 동시 호출

```javascript
// 버블링 호출
child.addEventListener('click', (e) => {
  console.log('child clicked');
});

// 캡처링 호출
child.addEventListener(
  'click',
  (e) => {
    console.log('child clicked');
  },
  true
);
```

<br>

출처: https://inpa.tistory.com/entry/JS-📚-버블링-캡쳐링 [Inpa Dev 👨‍💻:티스토리]

### 이벤트 위임(Event Delegation)

이벤트 위임은 다수의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 대신 하나의 부모 요소에 이벤트 핸들러를 바인딩

```html
<ul id="post-list">
  <li id="post-1">Item 1</li>
  <li id="post-2">Item 2</li>
  <li id="post-3">Item 3</li>
  <li id="post-4">Item 4</li>
  <li id="post-5">Item 5</li>
  <li id="post-6">Item 6</li>
</ul>
```

```javascript
javascriptconst msg = document.querySelector('.msg');
const list = document.querySelector('ul#post-list')

list.addEventListener('click', function (e) {

  // 이벤트를 발생시킨 요소
  console.log('[target]: ' + e.target);
  // 이벤트를 발생시킨 요소의 nodeName
  console.log('[target.nodeName]: ' + e.target.nodeName);

  // li 요소 이외의 요소에서 발생한 이벤트는 대응하지 않는다.
  if (e.target && e.target.nodeName === 'LI') {
    msg.innerHTML = 'li#' + e.target.id + ' was clicked!';
  }
});
```

​위의 경우 6개의 자식 요소에 각각 이벤트 핸들러를 바인딩하는 것 대신 부모 요소(ul#post-list)에 이벤트 핸들러를 바인딩

이는 이벤트가 이벤트 흐름에 의해 이벤트를 발생시킨 요소의 부모 요소에도 영향(버블링)을 미치기 때문에 가능

실제로 이벤트를 발생시킨 요소를 알아내기 위해서는 Event.target을 사용한다.

<br>

출처: https://inpa.tistory.com/entry/JS-📚-이벤트-💯-총-정리 [Inpa Dev 👨‍💻:티스토리]

## CORS(Cross-Origin Resource Sharing, 교차 출처 리소스 공유)

브라우저가 다른 출처(도메인, 프로토콜, 포트)의 리소스에 접근할 수 있도록 허용하는 보안 메커니즘

웹 애플리케이션이 동일 출처 정책(Same-Origin Policy)을 우회하여 다른 웹 서버에서 리소스를 가져오도록 허용하는 HTTP 헤더 기반의 방식으로 동작

<br>

img, video, script, link 태그 등

→ 기본적으로 Cross-Origin 정책을 지원함. 다른 사이트의 리소스에 접근 가능

<br>

XMLHttpRequest, Fetch API 스크립트
 → 기본적으로 Same-Origin 정책을 따름. 자바스크립트에서의 요청은 기본적으로 서로 다른 도메인에 대한 요청을 보안상 제한

<br>

<strong>CORS 정책 위반 에러 발생 시 일반적으로 백엔드 쪽에서 허용 origin 설정 필요</strong>

<br>

출처: https://inpa.tistory.com/entry/WEB-📚-CORS-💯-정리-해결-방법-👏 [Inpa Dev 👨‍💻:티스토리]

## Markdown

### .md 파일 렌더링

```bash
npm install marked
```

<br>

```typescript
// nuxt.config.ts
vite: {
  assetsInclude: ['**/*.md']; // 마크다운 파일을 문자열로 파싱
}

// pages/**.vue
import markdownContent from '~/public/markdown/**.md?raw';
```

<br>

https://marked.js.org/

### 코드블럭 스타일 적용

```bash
npm install highlight.js
```

<br>

```typescript
// MardwonContent.vue
import 'highlight.js/styles/github-dark.css'; // or another theme
```

<br>

https://highlightjs.org/
