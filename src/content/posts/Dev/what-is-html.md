---
title: "HTML의 기본 개념과 태그 구조"
published: 2026-03-29
description: "HTML의 정의부터 문서 구조, 태그와 속성 사용법까지 간단히 정리한다"
tags: [HTML, Frontend]
category: Dev
subcategory: Frontend
draft: false
---

## HTML이란

HTML은 Hypertext Markup Language의 약자로 프로그래밍 언어가 아니라 마크업 언어다.


Markup은 원래 출판 업계에서 쓰는 용어인데,<br>
에디터가 출판물 원고에 표시(마크)를 남기면서 "여기는 제목", "여기는 본문" 하던걸 Markup이라고 한다.

HTML이 하는게 이런 일이다. HTML에서는 마크 대신 **태그**라는걸 사용하는데<br>
텍스트나 사진 같은 내용을 태그로 감싸면서 "이 부분은 제목", "이 부분은 본문" 하는거다.

## HTML의 목적

문서의 내용들을 태그로 구분하는 것은 문서를 구조화하는 것이라고 이해할 수 있다.<br>
문서의 어떤 부분이 제목인지, 어떤 부분이 본문인지, 어떤 부분이 웹페이지 상에서 버튼인지 등을 정의하는 것이다.

브라우저가 웹 페이지를 렌더링할 때 이 구조화된 문서, 즉 html 파일을 전달받아서 화면에 그려준다.<br>
그러니까 html 파일은 온라인 발행을 위해 브라우저에 보낼 디지털 출판물이라고 볼 수 있다.

## HTML의 구조

디지털 출판물을 작성하기 위해서는 HTML의 기본 구조와 태그 사용법을 알아야 한다.<br>

먼저 기본적인 HTML 파일의 구조를 살펴보자.

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title of Document</title>
    <link href="example.css" rel="stylesheet">
</head>
<body>

</body>
</html>

```

### 태그 읽는 법
`<html>`, `<head>` 이런 녀석들이 아까 말한 태그다.

아무개 태그라는게 있다고 치자.<br>
`<아무개>`로 열고 `</아무개>`로 닫는다고 표현하는데, "여기서부터 여기까지는 아무개임"이라고 구분하는거다.


### 각 코드의 의미

```html
<!DOCTYPE html>     <!-- HTML5 표준 모드로 렌더링해주세요 -->
```
이걸 안쓰면 예전 방식으로 렌더링되니까 항상 맨 처음에 써줘야 한다.
<br><br>


```html     
<html>      <!-- 여기서부터 -->
    ...
</html>     <!-- 여기까지가 HTML로 구조화한 내용임 -->
```
브라우저가 렌더링해줄 전체 영역을 명시하는거다.
<br><br>

```html
<head>
    <meta charset="UTF-8">                      <!-- UTF-8로 인코딩해줘 -->
    <title>Title of Document</title>            <!-- 브라우저 탭에 표시할 제목 -->
    <link href="example.css" rel="stylesheet">  <!-- 링크된 css 파일로 스타일링해줘 -->
</head>
```
`<head>` 태그로 감싼 부분은 문서의 메타 데이터 영역이다.<br>
브라우저가 이 문서를 처리하기 전에 알아야 할 사전 정보들이다.
<br><br>

```html     
<body>      <!-- 여기서부터 -->
    ...
</body>     <!-- 여기까지가 실제로 렌더링할 내용 -->
```

마지막으로 `<body>` 태그로 감싼 부분이 사용자한테 보여줄 내용들이다.

결국 HTML 코딩의 핵심은 `<body>` 안을 잘 구조화하는 것이고, 그러려면 어떤 태그가 있는지 알아야 한다.

## 자주 쓰는 태그

<!-- 텍스트 관련 태그 먼저: h1~h6(제목), p(문단), a(링크), strong/em -->
<!-- 미디어: img -->
<!-- 레이아웃용: div, span 소개 (block vs inline은 CSS에서 다룬다고 언급) -->

## 속성(Attribute)

<!-- 태그에 추가 정보를 주는 방법: <태그 속성명="값"> 문법 설명 -->
<!-- 자주 쓰는 속성 예시: href, src, alt, class, id -->

## 인라인 스타일링

<!-- style 속성으로 직접 스타일 주는 법 맛보기 -->
<!-- color, font-size 같은 간단한 예시 -->
<!-- 실제로는 CSS 파일로 분리하는게 낫다고 언급하고 마무리 -->