---
title: "힙 (Heap)"
published: 2026-02-18
description: "Heap - Heap Sort, Priority Queue"
tags: ["Algorithms", "Heap", "CLRS"]
category: DSA
draft: true
---

## 핵심 개념



## 힙 속성 (Heap Property)

## 힙 연산

### 코드

#### heapify

```python
def min_heapify(A: list, i: int):
    A_length = len(A)
    # 0-based
    l = 2*i + 1
    r = 2*i + 2

    smallest = i
    # 범위 체크
    if l < A_length:
        # 왼쪽 확인
        if A[l] < A[smallest]:
            smallest = l
    # 범위 체크
    if r < A_length:
        # 오른쪽 확인
        if A[r] < A[smallest]:
            smallest = r
    # heap property 위반하는지 확인
    if smallest != i:
        # 위반하면 swap 후 재귀호출
        A[smallest], A[i] = A[i], A[smallest]
        min_heapify(A, smallest)
```

#### build heap
```python
def build_min_heap(A: list):
    for i in range(len(A)//2-1, -1, -1):
        min_heapify(A, i)
```

#### 결과 확인

```python
A = [4, 1, 2, 3, 16, 9, 10, 14, 8, 7]
build_min_heap(A)
print(A)
```

```bash
$ python build_min_heap.py
[1, 3, 2, 4, 7, 9, 10, 14, 8, 16]
```

## 힙 정렬 (Heapsort)

<!-- 힙 정렬 동작 원리, 시간복잡도 분석 -->

## 우선순위 큐 (Priority Queue)

<!-- 힙 기반 우선순위 큐 연산 -->

## 정리

<!-- 한 줄 요약 / 면접 답변용 -->
