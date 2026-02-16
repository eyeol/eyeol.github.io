---
title: BFS
published: 2026-01-01
description: BFS
tags: [DSA, DFS]
category: Algorithms
draft: true
---

DFS의 기본 전략은, 

1) 아직 탐색하지 않은 edges가 달린
2) 가장 최근에 탐색한 vertex v
를 탐색하는 것이라고 적혀 있는데

그냥 현재 보고 있는 vertex에서 unexplored edge가 있다면 그걸 먼저 본다
거기에 연결된 vertex를 방문하고 그게 현재 보고 있는 vertex가 되는 것

만약 unexplored edge가 없다면, 현재 보고 있는 vertex를 발견할 때 찾은 edge를 통해 상위 vertex로 되돌아감
그리고 그게 현재 보고 있는 vertex가 됨

