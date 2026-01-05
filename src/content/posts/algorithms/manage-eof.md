---
title: 파이썬에서 EOF 처리
published: 2026-01-05
description: EOF 처리 패턴 정리
tags: [Implementation, I/O]
category: Algorithms
draft: false
---

EOF(End Of File)은 컴퓨터에게 "여기가 입력의 마지막이다"라고 알려주는 신호다.

알고리즘 문제에서 입력 개수가 정해지지 않은 경우, EOF 처리를 해주는 코드를 짜야 코드 실행이 종료될 수 있다. 패턴 몇 가지만 기억하면 된다.

```
EOF 입력하는 방법
리눅스/맥 터미널 : ctrl + D
윈도우 콘솔 : ctrl + Z + Enter
```

## 입력을 한 줄씩 처리하는 패턴

sys.stdin.readline()을 사용하면 입력을 한줄씩 읽어오게 되는데, </br>
EOF를 입력 받으면 ""(빈 문자열)을 반환하게 된다.

이를 이용해서 EOF를 입력 시에 종료되는 반복문을 짜면 된다.

```python
import sys
# 내장 함수 덮어쓰기
input = sys.stdin.readline 

while True:
    line = input()
    if line == "": # EOF 만나면 반복문 탈출
        break
    ...
```
EOF를 만나면 무한 루프를 탈출하는 형태다. </br>

무한 루프가 불편하면 아래 코드를 쓰자.

```python
import sys

for line in sys.stdin:
    # 입력을 한줄씩 가져오다가
    # line에 EOF가 오면 자동으로 종료
    ...
```
내부적인 동작이 readline()과 동일하다고 보면 된다.


## 입력을 한번에 받아오는 패턴

read()로 입력을 한번에 받아서 처리할 수도 있다.
```python
import sys

data = sys.stdin.read()
for line in data.splitlines():
    # 개행 문자 x 
    ...

# 개행 문자가 필요한 경우
for line in data.splitlines(True):
    ...
```

line 구분 없이, 입력을 split하는게 목적이면 아래 패턴이 빠르다.
```python
import sys

# EOF까지 읽어서 공백 기준으로 split한걸 반복자(iter)로 만든다
it = iter(sys.stdin.read().split())

for tok in it:
    # tok를 int형으로 쓰고 싶으면 int(tok) 쓰면 됨
    ...

```

```python
# 최적화를 위해 buffer를 쓰는 버전
it = iter(sys.stdin.buffer.read().split())

for tok in it:
    # buffer를 쓰면 결과물이 bytes 토큰으로 바뀌기 때문에
    # 문자열로 쓰려면 decode()를 써서 str으로 바꿔야 한다
    s = tok.decode()
    # decode() 안해도 int(tok)는 가능

```

N과 N개의 값이 주어지는 경우, 아래와 같이 처리할 수도 있다.

```python
# 입력 형태
# 4
# 20 30 40 50

import sys

N, *arr = map(int, sys.stdin.buffer.read().split())

for num in arr:
    # 이미 int라 추가적인 형 변환 필요 x
    ...
```