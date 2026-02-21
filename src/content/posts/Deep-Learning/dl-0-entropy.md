---
title: "정보이론: 정보량과 엔트로피"
published: 2026-02-18
description: "딥러닝에 필요한 정보이론 - 정보량, 엔트로피, 크로스 엔트로피, KL 다이버전스"
tags: ["deep-learning", "information-theory"]
category: "Deep-Learning"
draft: true
---

## 결론 먼저

예전에 크로스 엔트로피를 배우면서 완벽하게 이해 못했다는 찝찝함을 느꼈다.

이제 와서 다시 공부해보니, 엄청 복잡한 내용은 아니다.

### 엔트로피

확률 분포는 평균, 분산, 표준편차 같은 대표값을 가진다. 

엔트로피도 그 중 하나인데, 확률 분포의 불확실성을 나타내는 값이다.

우리가 쓰는 인공지능 모델도 하나의 확률 함수라고 볼 수 있기 때문에

고유의 확률 분포와 그에 따른 엔트로피를 갖고 있다.


### 모델 학습

모델을 학습한다는건 확률 함수를 빚어가



## 1. 정보량 (Information Content)




## 2. 엔트로피 (Entropy)

$$H(p) = -\sum_i p_i \log p_i = \mathbb{E}[I(X)]$$

## 3. 크로스 엔트로피 (Cross-Entropy)

$$H(p, q) = -\sum_i p_i \log q_i$$

## 4. KL 다이버전스 (KL Divergence)

$$H(p, q) = H(p) + D_{KL}(p | q)$$

$$D_{KL}(p | q) = H(p, q) - H(p) = \sum_i p_i \log \frac{p_i}{q_i}$$

## 5. 정리
