---
title: "CSS와 웹 스타일링"
published: 2026-04-03
description: "인라인 스타일링의 한계부터 CSS의 역할, 셀렉터 개념까지 정리한다"
tags: [CSS, Frontend]
category: Dev
subcategory: Frontend
draft: false
---

## 웹 스타일링

[HTML 포스팅](/posts/dev/what-is-html/)에서 html 파일은 온라인에 발행할 디지털 출판물과 같다고 했다.<br>
출판물을 만들 때, 내용의 구조를 짜는 것만큼 스타일링 또한 중요하다.

스타일링의 방법에는 크게 인라인 스타일링과 CSS를 사용한 스타일링이 있다.


## 인라인 스타일링
```html
<p style="font-size: 17px; color: blue;"> 인라인 스타일링 </p>
```

`style` 속성을 태그 안에 적어서 스타일을 정의하는 방식을 인라인(inline) 스타일링이라고 한다.<br>
HTML에서 쓰는 대부분의 태그는 `style`을 활용한 인라인 스타일링이 가능하다.

### 속성(Property)과 값(Value)

`style`을 쓸 때는 `속성(property): 값(value);` 형태로 적는데, 이 한 쌍을 선언(declaration)이라고 한다.
```html
<p style="font-size: 10px; color: black; text-align: center;">
    여러 개의 속성(property)을 이용한 스타일링
</p>
```

여기서 속성(property)은 HTML의 속성(attribute)과 다른 개념이다.<br>
`style`은 HTML 속성(attribute)이고, 선언에 쓰이는게 CSS 속성(property)이다.

예시를 보면 느껴지겠지만, CSS 속성이 많아질수록 태그와 html 파일이 지저분해진다.<br>
그래서 CSS 속성만 따로 관리하자고 만든게 CSS 파일이다.


## CSS를 활용한 스타일링

### CSS란

CSS는 Cascading Style Sheets의 약자로 스타일 시트 관리를 위한 언어이다.<br>
여기서 스타일 시트라는건 html에 적용할 스타일 선언들을 모아놓은 파일이라고 이해하면 된다.


```css
/* my_style.css 파일 */
.text_style {           /* .text_style : 선택자(Selector) */
    font-size: 30px;    /* { } : 선언 블록(Declaration block) */
    font-family: Sans-serif;
    color: blue;
    text-align: center;
}
```
CSS의 핵심 구성 요소는 선택자(Selector)와 선언 블록(Declaration block)이다.<br>
- 선택자 : html 파일에서 스타일이 적용될 태그를 지정할 때 사용
- 선언 블록 : 선택자로 지정된 태그에 적용될 스타일을 정의

### html 파일에서 css 사용하기

```html 
<head>  <!-- 메타 데이터가 들어가는 <head> 태그 -->
    ...         
    <link href="my_style.css" rel="stylesheet">  <!-- 여기에 css 파일 경로 입력 -->
</head>
```
먼저 css 파일의 경로를 html 파일의 `<head>` 태그 안에 적어준다.
<br>
<br>

```html
<p class="my_style">내 스타일로 꾸민 텍스트</p>
```
그리고 스타일을 적용하고 싶은 태그의 `class` 속성에 선택자를 값으로 적으면 된다.


### 선택자(Selector)의 종류
인라인 스타일링의 `style` 속성 대신 튀어나온 `class`라는 속성이 어색할 수 있다.<br>
왜 굳이 새로운 속성을 추가했냐면 스타일을 적용할 대상을 유연하게 지정하기 위해서다.<br>

CSS에는 여러 가지 선택자가 있는데, 선택자의 종류에 따라 html에서 지정하는 방식이 달라진다.<br>
그 중 가장 기본적인 3가지를 소개한다.

| 선택자 | CSS 문법 | 적용 대상 | HTML 예시 |
|--------|----------|-----------|-----------|
| 태그 선택자 | `p { }` | 해당 태그 전체 | `<p>` |
| 클래스 선택자 | `.title { }` | `class` 속성이 일치하는 태그 | `<p class="title">` |
| ID 선택자 | `#header { }` | `id` 속성이 일치하는 태그 | `<div id="header">` |

그러니까 위에 예시로 적은 `.text_style`은 클래스 선택자라서 `class` 속성으로 추가한거다.<br>

이렇게 하면 선택자 종류에 따라 스타일 적용 범위를 조절할 수 있다.<br>

- 태그 선택자 : 해당 태그 전체에 일괄 적용<br>
- 클래스 선택자 : 같은 태그여도 특정 그룹만 골라서 적용<br>
- ID 선택자 : 딱 하나의 요소에만 적용<br>

인라인 스타일링은 태그 하나하나에 직접 적어야 했지만, 선택자를 쓰면 한번에 관리할 수 있는거다.

### 스타일 적용 우선순위

하나의 요소에 여러 선택자가 동시에 해당될 수 있다.
```css
p { color: blue; }
.title { color: red; }
```
```html
<p class="title">이 텍스트는 무슨 색..?</p>
```
이 `<p>`는 태그 선택자와 클래스 선택자 둘 다 해당되는데, 이렇게 겹칠 때를 위한 우선순위가 있다.

| 우선순위 | 적용 방식 | 예시 |
|----------|-----------|------|
| 1순위 | 인라인 스타일 | `style="color: red;"` |
| 2순위 | ID 선택자 | `#header { }` |
| 3순위 | 클래스 선택자 | `.title { }` |
| 4순위 | 태그 선택자 | `p { }` |

이 순서는 더 구체적인(대상이 좁은) 방식이 우선되도록 정해진 것이다.<br>

`id`의 경우, `class`와 달리 하나의 값이 여러 태그에 적용될 수 없다.<br>
`id`의 대상이 더 좁기 때문에 `class`보다 높은 우선순위를 가지는 것이다.

위 예시에서는 클래스가 태그보다 우선순위가 높기 때문에 텍스트 색은 빨간색이 된다.

---
> 코딩애플 프론트엔드 강의를 참고해 정리한 내용입니다