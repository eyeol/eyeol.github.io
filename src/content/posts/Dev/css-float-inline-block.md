---
title: "레이아웃 배치: float와 inline-block"
published: 2026-04-15T00:00:00
description: "박스를 가로로 배치하는 두 가지 방법 - float와 inline-block"
tags: [CSS, Frontend]
category: Dev
subcategory: Frontend
draft: false
---

## div 중첩하기

`<div>` 중첩해서 박스 안에 박스를 넣을 수도 있다.<br>

```html
<div class="container">
    <div class="box">박스 1</div>
    <div class="box">박스 2</div>
    <div class="box">박스 3</div>
</div>
```

`<div>`는 display의 기본값이 block이라 한 줄을 통째로 차지한다.<br>
그래서 이렇게 연속으로 쓰면 박스들이 세로로 쌓인다.


하지만 레이아웃을 짜다보면 박스를 가로 방향으로 쌓고 싶을 때도 있음.

## float로 가로 정렬

`float`는 말 그대로 박스를 띄우는 속성이다.<br>
원래 있던 자리에서 박스를 띄워서 왼쪽 또는 오른쪽 끝에 붙일 수 있음.

```css
.box {
    width: 100px;
    height: 100px;
    float: left;
}
```
위와 같이 float 속성에 left를 추가하면 박스들이 왼쪽에서부터 가로로 나란히 붙게 된다.

```html
<div class="header">
    <div class="sub-title">부제</div>
    <div class="description">설명</div>
</div>
```
이번에는 부제와 설명을 각각 왼쪽과 오른쪽에 두고 싶다.

```css
.header { 
    width: 600px; 
}

.sub-title {
    width: 200px;
    float: left;
}

.description {
    width: 200px;
    float: right;
}
```
이러면 부제는 왼쪽에, 설명은 오른쪽에 챱 붙게 된다.<br>
부제와 설명을 나란히 붙이고 싶다면 둘다 left로 하면 된다.

<br>

float를 사용한 이후에는 clear 속성을 써줘야 한다.


```html
<div class="header">
    <div class="sub-title">부제</div>
    <div class="description">설명</div>
    <div class="footer"></div>
</div>
```

```css
.footer {
    clear: both;
}
```
clear는 float된 박스들이랑 겸상 안하겠다는거다.<br>

float로 띄운 박스와 내가 앞으로 배치할 박스 사이에<br>
`clear: both`를 적용한 박스를 끼워넣는거다.

그래야 그 다음 오는 요소들이 튀지 않고 제자리를 잡게 된다.


## inline-block으로 가로 정렬

박스들을 가로로 정렬하고 싶을 때 다른 방법도 있다.<br>

```html
<div class="container">
    <div class="box">박스 1</div>
    <div class="box">박스 2</div>
    <div class="box">박스 3</div>
</div>
```
아까처럼 박스들을 `<div>` 태그로 나열해놓고

```css
.box {
    width: 100px;
    height: 100px;
    display: inline-block;
}
```
display 속성값을 inline-block로 바꾸면 박스들이 가로로 나란히 배치됨.<br>
다만, 이걸 실제로 렌더링해보면 박스들 사이에 조금씩 공백이 존재한다.

코딩애플 강의에서는 편법으로 없애는 방법도 알려주는데<br>
귀찮으니까 그냥 float를 쓰라고 한다.

근데 또 찾아보면 실무에서는 전부 flex나 grid 쓰지 float도 잘 안씀..

오늘 포스팅은 그냥 이런게 있다 알아두면 되는 내용


---
> 코딩애플 프론트엔드 강의를 참고해 정리한 내용입니다