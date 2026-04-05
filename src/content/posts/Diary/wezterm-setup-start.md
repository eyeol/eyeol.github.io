---
title: "WezTerm 세팅"
published: 2026-04-05
description: "터미널 환경 세팅"
tags: [Diary, Terminal]
category: Diary
draft: true
---

## 왜 WezTerm을 쓰려고 했는가

요즘은 Mac과 Windows를 오가면서 작업하는 일이 많아졌다.
터미널 경험이 매번 달라지면 생각보다 피로감이 커서, 가능한 한 같은 감각으로 작업할 수 있는 환경을 만들고 싶었다.

그래서 이번에는 `WezTerm`을 메인 터미널로 맞춰 보기로 했다.
당장 목표는 화려한 커스터마이징보다는, 아래 두 가지를 먼저 안정적으로 맞추는 것이다.

1. Windows에서는 `WezTerm`으로 WSL을 바로 열기
2. WSL 안에서는 `zsh + Powerlevel10k` 프롬프트를 그대로 쓰기

## 현재 WSL 상태

다행히 WSL 내부 환경은 이미 많이 준비되어 있었다.

- 배포판은 `Ubuntu 24.04.3 LTS`
- 기본 쉘은 `zsh 5.9`
- 기본 사용자 쉘은 `/usr/bin/zsh`
- `~/.zshrc`에서 `Powerlevel10k`를 로드 중
- `~/.p10k.zsh`도 이미 존재

즉, 지금 필요한 건 WSL 안을 새로 꾸미는 작업이 아니라,
`WezTerm`이 이 환경을 제대로 불러오게 만드는 설정이다.

## 확인한 포인트

이번 점검에서 확인한 건 크게 세 가지다.

### 1. zsh와 p10k는 이미 연결되어 있었다

`~/.zshrc` 안에서 `Powerlevel10k` 테마와 `~/.p10k.zsh`를 읽고 있었다.
WSL 터미널에서 프롬프트를 이미 잘 쓰고 있었다면, WezTerm도 같은 셸만 열어주면 된다.

### 2. WSL 기본 사용자도 문제 없었다

`/etc/wsl.conf` 기준 기본 사용자는 `eyeol`이었다.
그래서 WezTerm이 `Ubuntu` 배포판만 정확히 열어주면, 평소 작업하던 계정으로 바로 들어갈 수 있다.

### 3. 핵심은 폰트와 실행 대상이었다

Powerlevel10k는 아이콘이 들어가는 프롬프트라서 Nerd Font 계열 폰트가 중요하다.
폰트 파일은 이미 받아 둔 상태였고, 이제 남은 건 Windows 쪽에서 `WezTerm`과 폰트를 함께 맞추는 일이다.

## 앞으로 할 설정

다음 단계는 아래 순서로 진행할 생각이다.

1. Windows에 `WezTerm` 설치
2. `MesloLGS NF` 폰트 확인
3. `C:\Users\eyeol\.wezterm.lua` 생성
4. WezTerm 실행 시 `Ubuntu WSL`이 기본으로 열리게 설정
5. `zsh + Powerlevel10k` 프롬프트가 깨지지 않는지 확인

## 설치 시작

### 1. winget으로 WezTerm 설치

```powershell
winget install wez.wezterm
```

공식 문서에도 안내된 가장 간단한 설치 방법이다.

### 2. 설치 확인

```powershell
wezterm --version
```

버전이 출력되면 PATH까지 정상적으로 잡힌 상태다.

### 3. 설정 파일 준비

```powershell
notepad $env:USERPROFILE\.wezterm.lua
```

Windows 기준 사용자 홈에 `.wezterm.lua`를 만들면 된다.

### 4. WSL Ubuntu를 기본으로 열기

```lua
local wezterm = require 'wezterm'

return {
  default_prog = { 'wsl.exe', '--distribution', 'Ubuntu', '--cd', '~' },
}
```

WezTerm을 열자마자 `Ubuntu`로 들어가게 만드는 최소 설정이다.

### 5. 폰트까지 같이 맞추기

```lua
local wezterm = require 'wezterm'

return {
  default_prog = { 'wsl.exe', '--distribution', 'Ubuntu', '--cd', '~' },
  font = wezterm.font_with_fallback({
    'MesloLGS NF',
    'JetBrainsMono Nerd Font',
    'Noto Color Emoji',
  }),
  font_size = 12.5,
  use_fancy_tab_bar = false,
  hide_tab_bar_if_only_one_tab = true,
}
```

`Powerlevel10k` 아이콘이 깨지지 않게 하려면 폰트 설정까지 같이 해두는 편이 좋다.

## 메모

아직은 `tmux`까지 바로 들어가지는 않을 생각이다.
지금 단계에서는 `WezTerm`으로 Mac과 Windows의 터미널 경험을 비슷하게 맞추는 게 우선이고,
원격 서버 작업이나 장기 실행 세션이 많아질 때 `tmux`를 따로 배우는 편이 더 자연스러워 보인다.

이번 세팅이 마무리되면,
다음 글에서는 실제 `WezTerm` 설치와 `~/.wezterm.lua` 설정 과정을 정리해 볼 생각이다.

## 앞으로 할 것

이번 글은 `WezTerm` 설치와 첫 세팅까지 정리하는 단계였다.
이후에는 터미널 커스터마이징을 조금 더 넓혀 보고, 개발환경과 인프라 쪽까지 천천히 이어서 공부해 볼 생각이다.

- `WezTerm`
  launch menu, keybindings, panes, workspaces, SSH domain 같은 확장 기능도 차례대로 써볼 생각이다. 지금은 기본 실행 환경과 외형을 맞췄다면, 다음에는 실제 작업 흐름을 빠르게 만드는 쪽으로 넘어가고 싶다.
- `tmux`
  아직은 `WezTerm`만으로도 충분하지만, 원격 서버 접속이 많아지고 장기 실행 작업이 늘어나면 그때 `tmux`를 배우는 흐름이 자연스러워 보인다.
- `Docker`
  2명이 같이 개발하고 서비스를 배포하려면 로컬 환경을 비슷하게 맞추는 작업이 중요해질 것 같다. 그래서 앞으로는 이미지, 컨테이너, Compose 같은 개념도 같이 정리해 볼 생각이다.
- `AWS`
  최종적으로는 직접 호스팅까지 해보는 것이 목표라서, 이후에는 `EC2`, 배포 흐름, 네트워크와 기본 인프라 개념도 차근차근 공부해 보려고 한다.

결국 지금의 `WezTerm` 세팅은 끝이라기보다 시작에 가깝다.
터미널 경험을 먼저 정리해 두고, 그다음에는 개발환경 통일과 배포 흐름까지 자연스럽게 확장해 나가고 싶다.
