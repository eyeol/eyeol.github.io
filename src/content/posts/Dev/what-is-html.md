---
title: "HTML 개념"
published: 2026-03-29
description: "HTML의 의미와 기본 구조"
tags: [HTML, Frontend]
category: Dev
subcategory: frontend
draft: false
---

## HTML이란

HTML은 Hypertext Markup Language로, 프로그래밍 언어가 아니라 마크업 언어다.


Mark up의 어원은 출판 업계에서 왔다.<br>
에디터가 출판물 원고에 **마크**를 남기면서 "여기는 제목", "여기는 본문" 하던걸 마크업이라고 한다고 함.

HTML이 하는게 그거다.<br>
**태그**로 텍스트나 사진 같은 컨텐츠를 감싸면서 "이건 제목이에요", "이건 문단이에요" 알려주는거임.<br>

HTML 파일을 크롬 같은 브라우저가 받으면, 우리가 마크업한대로 웹페이지가 나타나는(렌더링되는)거다.<br>


## HTML의 구조
HTML의 기본 구조는 다음과 같다.
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

### 태그
`<html>`, `<head>` 이런 녀석들이 아까 말한 태그다.

아무개 태그라는게 있다고 치자.<br>
`<아무개>`로 열고 `</아무개>`로 닫는다고 표현하는데, "여기서부터 여기까지는 아무개임"이라고 구조화하는거다.

텍스트든 이미지든 태그로 감싸서 내가 원하는 형태로 구조화하는게 HTML 코딩의 본질이다.

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

마지막으로 `<body>` 태그로 감싼 부분이 사용자한테 보여줄 내용들이다.<br>

`<body>` 안에 내용들을 잘 구조화하고 예쁘게 만드는 법을 배운다고 생각하면 될 듯