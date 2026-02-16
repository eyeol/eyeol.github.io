---
title: BFS
published: 2025-11-25
description: BFS
tags: [DSA, BFS]
category: Algorithms
draft: true
---

글 흐름

먼저 BFS의 목적(최단 거리, 최단 경로)을 얘기하자, 왜 언제 쓰는지 알아야 하니까

그러고 나서 BFS의 이론적인 가정들(그래프, source s 주어짐, 인접 리스트가 있음)을 소개하자

무엇을 가정하고 쓰는 알고리즘인지 명확히 인지해야 하는게 좋으니까

그 다음에 BFT 라는게 있는데 이건 나중에 설명할거니까 일단 이런게 결과로 나온다는것만 기억하라고 언급


그리고 BFS라는건 frontier를 breadth하게 확장하는건데 그건 곧

s와의 거리가 k+1인 정점들을 발견하기 전에 거리가 k인 모든 정점들을 발견하도록 동작함

즉, 거리 순서대로 발견하기 때문에, 구조적으로 최단 거리를 보장하게 됨


그 다음은 CLRS에서 설명하는대로 frontier를 어떻게 breadth하게 확장하는지

white, gray, black으로 구분한다는 이론적 내용 설명

그리고 Breadth-first tree 소개 및 predecessor 설명 -> 얘네는 나중에 경로 복원할 떄 쓰임



## BFS의 목적

짱구는 철수, 유리, 훈이, 맹구라는 친구들이 있다.

짱구 집에서 각각의 친구들 집까지의 최단 거리(distance) 또는 최단 경로(path)를 구하고 싶다?

그럴 때 BFS를 쓰면 된다.

## What is BFS

Directed, undirected 상관 없이 쓸 수 있는 알고리즘이고, </br>
그래프 G = (V, E)와 source(탐색 시작 지점) 정점 s가 주어짐

> 나중에 나오는 Prim이나 Dijkstra 알고리즘과 아이디어가 비슷하다는걸 기억해두자

BFS가 하는 일은 기본적으로 2가지
1. source 정점 s에서 도달 가능(reachable)한 모든 정점들을 탐색하고, </br>
   각각의 정점까지의 거리를 계산함
2. 탐색 결과를 트리 형태로 저장(이걸 Breadth-first tree라고 함)

### 최단 거리


## 과정

### 영역 구분
탐색(Search)에서 이미 발견한 영역(discovered)과 아직 발견하지 않은 영역(undiscovered)이 있다고 할 때, 두 영역의 사이를 frontier라고 함.

BFS는 이 frontier를 breadth하게 확장하기 때문에 Breadth-first search라고 부르는 것.

그래서 구조적으로 frontier에서 source s와의 거리가 k인 vertex를 모두 발견한 뒤에야
s와의 거리가 k+1인 vertex를 발견할 수 있음

그러면 왜 frontier를 breadth하게 확장하냐?

정점들을 거리 순서대로 발견하면, 어떤 정점을 발견했을 때 그 거리가 곧 최단 경로이기 때문이다.

최단 거리를 구하는 목적을 위해 Breadth하게 탐색하는 것.


과정을 정확하게 트래킹하기 위해, BFS는 각각의 vertex의 상태를 3가지 색깔로 표시함
- Undiscovered : White (모든 정점은 탐색 전에 White로 초기화)
- Discovered : Gray, Black

Gray랑 Black은 둘다 발견된 정점이지만, BFS 상에서는 구분이 필요함

Black으로 칠해진 정점은 인접(adjacent)한 정점들도 모두 discovered(Gray or Black)임

Gray는 인접한 정점 중에 아직 발견되지 않은(undiscovered = White) 정점이 존재함

한마디로 Gray vertex가 frontier(현재 탐색중인 영역)이라고 보면 됨

### 세부 과정

맨 처음에 BFS는 source s로만 이루어진 tree를 구성함(이게 Breadth-first tree)

Breadth-first tree를 확장하는 원리는 아래 하나임

이미 발견된 어떤 정점 u의 인접 리스트를 훑다가 </br>
아직 방문 안 한(white) 정점 v를 발견하면 </br>
그 v를 트리에 넣고, 간선 (u,v)도 트리에 넣는다.

그림으로 보면 트리에 츄파춥스 한개가 추가되는 느낌

이렇게 연결된 관계에서 u를 v의 prodecessor 또는 parent라고 부르는데, </br>
(트리 상에서) '내 앞에 있는 애' 정도로 받아들이면 된다.

BFT의 확장 원리로는 한 정점이 발견될 때, 색이 White -> Gray로 변하기 때문에 </br>
그 이후로는 다시 White인 상태로 발견될 수 없음 </br>

그래서 각 정점은 최대 한 개의 부모를 가지게 되는 것

u랑 v는 그냥 인접한 것 뿐인데 왜 u를 prodecessor라고 하지? </br>
그건 source s에서 탐색을 시작했을 때, u가 먼저 발견되었기 때문 </br>

그러니까 BFT 상에서 누가 조상이고 후손이냐 하는건 source s를 기준으로 한 상대적 관계 </br>
BFT 상에서 s에서 v까지의 경로 사이에 존재하는 모든 정점들은 v의 Ancestor라고 부를 수 있음 </br>
(반대로 v는 그 정점의 descendant)

### 구현

BFT 확장 원리를 보면 알수 있듯이 BFS는 그래프 G가 인접 리스트로 표현된걸 가정한다.

그리고 각 정점마다 추가적인 attributes를 필요로 하는데, </br>
1. 발견 여부(White, Gray, Black)
2. 부모(Prodecessor) ; prodecessor가 없으면 NIL로 저장
3. source s와의 거리

발견 여부는 BFS 시스템 상 필수적인 요소이다. 한번 방문한 정점을 다시 방문하지 않아야 하니까 </br>

뒤에 두 개는 BFS의 결과물로서 나중에 문제 풀이에 필요하니까 저장하는 애들 </br>
부모 -> 어떤 최단 경로를 복원하고 싶을 때 필요함
source s와의 거리 -> 거리에 대한 정보가 필요할 때 쓰려고 저장

그래서 보통 알고리즘 문제에서는 BFS를 구현할 때 </br>
- 발견 여부를 기록하기 위해서는 길이 |V|의 배열을 하나 만들고(각 정점의 발견 여부를 확인)
> 배열 이름은 보통 visited라고 많이 씀(Python 기준)

필요에 따라
- 경로 복원을 하고 싶을 때 길이 |V|의 배열을 만들어서 각 정점의 부모를 저장
- source s와의 거리도 마찬가지로 길이 |V|의 배열을 만들어서 저장함

BFS 수도 코드에서 기억할 점은 </br>
1. 처음에 그래프 속성 값들 어떻게 초기화하는지
2. 탐색 과정에서 큐(Queue)를 사용한다는 것
3. undiscovered vertex 발견했을 때 속성들이 어떻게 업데이트되는지

이렇게 3가지다.

처음 그래프 속성 값들 초기화는 읽어보면 당연한 내용임
- 색은 전부 White(발견 전이니까)
- 부모는 모두 NIL(source s는 무조건 부모가 NIL)
- 거리는 root s는 0, 나머지는 INF로 초기화

탐색 과정에서 큐(Queue)를 쓰는건, 일단 외우면 되긴 하는데 이유를 알면 더 잘 외워짐


### Queue를 쓰는 구조적 이유

BFS의 목표는 source s로부터 각 정점까지의 최단 거리와 그에 따른 최단 경로 트리를 얻는 것

이를 보장하려면 탐색이 항상 거리(트리 상에서는 레벨) 순서로 진행되어야 한다.


BFS는 frontier를 breadth하게 확장해야 하는데(최단 거리 보장 위해서), </br>
이때 지켜져야 할 조건이 있다.

1. source s로부터의 거리가 k인 정점과 </br>
   source s로부터의 거리가 k+2인 정점이 
   공존하면 안됨 </br>

2. frontier를 제어하는 자료구조 내에서 </br>
   정점들이 거리 순으로 나열되어 있어야 함 </br>


먼저 첫번째 조건부터, 왜 공존하면 안되냐? </br>

frontier에서 source s로부터의 거리가 k인 정점을 하나 꺼내서 </br>
그 정점의 인접 리스트를 훑으려고 한다. </br>
근데 그 중에 이미 앞에서 발견해서 거리가 k+2로 업데이트된 정점이 있다면? </br>

어떤 정점이든 frontier에 들어갈 때 색이 Gray로 업데이트되고, 이때 거리도 같이 업데이트된다. </br>
색은 나중에 Black으로 다시 업데이트되지만, 거리는 최초 발견될 때 이후에 업데이트되지 않는다. </br>

그러니까 한번 발견되어서 k+2로 업데이트 되었다면, 그 후에 거리 k인 정점의 인접 리스트에서 발견되더라도, 최초에 발견한게 아니기 때문에 이미 색은 바래있고 거리도 k+1로 업데이트할 수 없다.


Queue로 frontier를 제어할 때, while문을 쓰게 되는데 </br>
이때 반복문의 invariant는 Queue에서 Gray vertices만 들어있다는 것 </br>

Queue의 head에서 u라는 정점을 하나 꺼낸다. Adj[u]는 u의 인접 리스트,  </br>
그러니까 u에 인접한 정점들의 배열이다. 각각의 정점을 v라고 하자. </br>
이걸 훑으면서 아직 white이면, gray로 색칠하고 </br>
v의 거리를 u.d+1로, 부모를 u로 업데이트하고 Queue의 tail에 추가한다.

정점이 회색으로 칠해지면 Enqueue되고, 정점이 Dequeue한 후에는 검정으로 칠해지기 때문에 </br>
invariant는 무조건 지켜짐(그런데 invariant가 지켜진다는거 말고 왜 이런 invariant를 지키도록 설계되었는지를 기술하고 싶은데)

