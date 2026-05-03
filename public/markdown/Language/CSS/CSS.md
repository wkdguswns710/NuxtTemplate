# CSS

## flex

flex-basis (기본값: auto)

아이템의 기본 크기를 설정.

flex-direction이 row일 때는 너비, column일 때는 높이

<br>

flex-grow (기본값: 0)

아이템이 flex-basis의 값보다 커질 수 있는지를 결정하는 속성

0보다 크면 아이템이 유연한 박스로 변하고 flex-basis보다 커지며 빈 공간을 메우게 됨

아이템들이 flex-basis를 제외한 여백 부분을 flex-grow에 지정된 숫자의 비율로 나누어 가짐

<br>

flex-shrink (기본값: 1)

아이템이 flex-basis의 값보다 작아질 수 있는지를 결정하는 속성

0보다 크면 아이템이 유연한 박스로 변하고 flex-basis보다 작아짐

<br>

flex (flex-grow: 0; flex-shrink: 1; flex-basis: 0%;)

flex-grow, flex-shrink, flex-basis를 한 번에 쓸 수 있는 축약형 속성

<br>

https://studiomeal.com/archives/197
