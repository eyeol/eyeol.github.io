---
title: "[TEST] DB 더미"
published: 2026-03-26
description: "서브카테고리 테스트용"
tags: []
category: CS
subcategory: DB
draft: true
---

## 왜 Cross-Entropy는 w, b에 대해 볼록(Convex)한가?

### 1단계: Cross-entropy에 sigmoid 대입

Loss function:

$$L = -[y \log(\hat{y}) + (1-y) \log(1-\hat{y})]$$

여기서 $\hat{y} = \sigma(z)$, $z = wx + b$

sigmoid의 log 성질:

$$\log(\sigma(z)) = \log\left(\frac{1}{1+e^{-z}}\right) = -\log(1 + e^{-z})$$

$$\log(1 - \sigma(z)) = \log\left(\frac{e^{-z}}{1+e^{-z}}\right) = \log(e^{-z}) - \log(1+e^{-z}) = -z - \log(1+e^{-z}) = -\log(1 + e^{z})$$

대입하면:

$$L = y \cdot \log(1+e^{-z}) + (1-y) \cdot \log(1+e^{z})$$

### 2단계: y=0, y=1 각각 확인

- $y=1$일 때: $L = \log(1+e^{-z})$
- $y=0$일 때: $L = \log(1+e^{z})$

둘 다 **softplus** 형태 → $z$에 대해 항상 볼록 (이계도함수 $\geq 0$)

### 3단계: 핵심 — z는 w, b의 선형 함수

$$z = wx + b$$

**볼록 함수 ∘ 선형 함수 = 볼록 함수** (convexity 보존 정리)

따라서 $L$은 $w, b$에 대해 **볼록(convex)**하다.

### 반면 MSE는?

$$L_{MSE} = (\sigma(z) - y)^2$$

$y=1$일 때: $L = (\sigma(z) - 1)^2$

sigmoid의 미분: $\sigma'(z) = \sigma(z)(1-\sigma(z))$

이걸 두 번 미분하면:

$$\frac{d^2L}{dz^2} = -2\sigma(z)(1-\sigma(z))^2[1 - 3\sigma(z)]$$

- $\sigma(z) < \frac{1}{3}$이면 → **음수** (오목, concave)
- $\sigma(z) > \frac{1}{3}$이면 → **양수** (볼록, convex)

이계도함수 부호가 바뀜 → **convex 아님** → local minimum 다수 발생

직관적으로: sigmoid가 양 끝에서 평평해지기 때문에, 예측이 틀려도 gradient ≈ 0이 되는 구간이 생김 → gradient descent가 local minimum에 갇힐 수 있음

### 결론

Cross-entropy는 sigmoid와 수학적으로 궁합이 맞아서 convex가 보장되고, gradient descent가 global minimum으로 수렴할 수 있다.

