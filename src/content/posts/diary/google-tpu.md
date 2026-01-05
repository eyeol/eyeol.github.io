---
title: Google의 TPU는 어떤 녀석인가
published: 2025-11-26
description: 기술 트렌드 & 지식 교류 스터디 1주차
tags: [WT3, TPU]
category: Diary
draft: false
---

이번 주부터 Weekly Tech Trend Talk(일명 WT3)라는 기술 트랜드 & 지식 교류 스터디를 하게 되었다. </br>

예전에 했던 [논문 스터디](https://smoggy-frog-1f0.notion.site/157ab9834c5780b1aba0de47f3774976)는 논문을 꼼꼼하게 보는게 좋았지만 한편으로는 부담이 되기도 했다. </br>
이번 스터디는 논문에 국한되지 않고 뭐든 자유롭게 나누는 모임이다. </br>

가볍게 내용을 나누는만큼 까먹기도 쉬울 것 같아서 스터디에서 다룬 주제들을 간단하게 기록해두려고 한다.

## TPU 설계 목적

최근에 구글에서 Gemini 3.0을 발표했는데, 이 녀석이 엔비디아 GPU를 안쓰고 TPU를 썼다고 한다. </br>
다양한 작업을 수행할 수 있는 CPU나 GPU와 달리, TPU는 오직 행렬 계산만을 잘하기 위해 만들어졌다. 


![tpu 구조](./images/tpu_1.png)

일반적인 CPU나 GPU는 왼쪽 그림처럼 operation을 받을 때마다 다수의 레지스터에 접근하게 되는데, </br>
하나의 ALU 입장에서는 레지스터에 접근하는 것 자체가 시간과 자원 소모이다.

반면 오른쪽 그림의 ALU는 처음에 레지스터에서 받은 정보를 다음 ALU에 전달하면서 재사용한다. </br> 
명령어 올 때마다 레지스터에 접근한다고? 차라리 그 시간에 행렬 연산을 한번 더 하겠다는 마인드.

## Systolic array

![tpu 구조](./images/tpu_2.png)

이건 TPU v1의 Systolic array 구조인데 256x256개의 ALU로 이루어져 있다. </br>
데이터 흐름이 심장이 수축하면서 혈액을 밀어내는 모습과 비슷해서 Systolic array라고 부른다.

사실은 단순한 ALU가 아니라 8-bit MAC(Multiply-Accumulate Unit)인데, </br>
일반적으로 쓰는 float32를 int8로 양자화해서 계산한다. </br>
(최근 TPU는 연산에 따라 bf16, fp32를 쓰는 듯)

그러면 정보 표현이 약간 러프해지긴 하지만 한번에 메모리에 올리는 데이터도 많아지고, </br>
큰 정확도 손실 없이 추론 속도나 효율에서 이득을 볼 수 있다.

## TPU 구성

이렇게 수만개의 MAC로 이루어진 행렬곱 단위를 MXU라고 부른다. </br>

![tpu v2](./images/tpu_v2.jpg)

TPU v1에서는 256x256 MXU를 썼는데, v2에서는 128x128 MXU 2개를 썼다.

정확한 구성은 이러하다.
- TPU 칩에 하나 이상의 TensorCore
- 각 TensorCore에 하나 이상의 MXU

그리고 여러 개의 TPU 칩을 특수 네트워크로 그룹화한게 TPU Pod이다.


![tpu ironwood](./images/ironwood.png)

가장 최근에 나온 TPU v7 ironwood의 고급 버전은 Pod 하나에 칩이 9000개다. </br>
HBM 대역폭 같은건 어떤 내용인지 모르겠는데, 나중에 시간날 때 봐야겠다.


## 후기

예전에는 TPU라는게 있다는걸 아는 정도였는데, </br>
이제는 어떻게 생겼는지 대충은 안다 정도인 듯


아무튼 구글은 자기들 독자적인 하드웨어를 사용한 Gemini 3.0 성능이 잘 나오니까 </br> 
기분이 아주 좋을 것 같다. 엔비디아에 줄 돈이 적어지니까 토큰 값도 낮아졌다.


