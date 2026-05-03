# Git

## Git이란?

버전 관리 시스템(Version Control System). 코드 변경 이력을 관리하고 협업을 도와주는 도구

모든 변경 이력이 자동으로 기록됨

깔끔한 파일 하나로 관리

이전 버전으로 쉽게 복구

## 저장소

### Working Directory, Staging Area, Repository

Working Directory: 실제로 작업하는 폴더

Staging Area: 커밋할 파일을 준비하는 공간. 논리적으로 관련된 변경사항만 묶어서 커밋 가능

Repository: 변경 이력이 영구적으로 저장되는 공간. .git 폴더에 저장됨

### 로컬 vs 원격

Git은 분산 버전 관리 시스템으로, 두 가지 저장 공간 사용

#### 로컬(Local)

내 컴퓨터에 있는 Git 저장소

구성 요소: Working Directory, Staging Area, Repository(.git)

#### 원격(Remote)

온라인 서버에 있는 Git 저장소(GitHub, GitLab, Bitbucket 등)

## 기본 작업

```bash
# 설정
git config (--global) user.name '<이름>'    # 사용자 이름 설정(--global: 모든 프로젝트에 적용)
git config (--global) user.email '<이메일>'    # 사용자 이메일 설정
git config --list   # 설정 확인
git config user.name

# 프로젝트 생성
git init (project-name)    # 현재 디렉토리를 Git 저장소로 초기화(새 폴더 만들면서 초기화)
git clone <URL>    # 원격 저장소를 복제하여 로컬에 생성
```

## 브랜치 관리

```bash
# 생성
git branch feature/new-feature

# 목록 확인
git branch

# 전환
git checkout feature/new-feature
git switch feature/new-feature

# 삭제
git branch -d feature/old-feature
```

### 브랜치 전략

Git Flow: main(운영 배포), develop(개발 통합), featrue(새 기능), release(배포 준비), hotfix(긴급 버그)

GitHub Flow: main(항상 배포 가능한 상태), feature(모든 작업용)

## 코드 버전 관리

```bash
# 변경사항 기록
git commit -m "msg"    # 스테이징 영역의 변경사항을 로컬 레퍼지토리에 기록

# 변경사항 병합
git merge feature    # 로컬 저장소 내 feature 브랜치를 현재 브랜치에 통합. 히스토리 보존
git rebase main    # 현재 브랜치를 main 위에 재배치. 선형 히스토리를 만듦. 선형 히스토리

# 변경사항 복구
git reset    # HEAD와 현재 브랜치를 특정 커밋으로 이동. 히스토리를 변경
git reflog    # HEAD와 브랜치 참조가 변경된 이력 기록. 로컬 기록만
git revert    # 특정 커밋을 되돌리는 새로운 커밋 생성. 히스토리 생성
git restore    # 파일을 특정상태로 복원(최신 방식)
```

### merge

1. Fast-Forward Merge

- main: A - B - C
- feature: D - E
- 결과: A - B - C - D - E (일직선)
  => 새로운 커밋 없음. 분기된 후 main에 새 커밋이 없을 때가 조건

2. 3-Way Merge

- main: A - B - C - F
- feature: D - E
- 결과:
  A - B - C - F - M
  ㅡㅡㅡ\ㅡㅡㅡㅡ/
  ㅡㅡㅡㅡD - E --
  => 새로운 커밋 생성. 두 부모 커밋을 가짐

### rebase

sub2: A - B - C
sub1: A - B - D - E
└─ 여기서 분기

git rebase sub2 실행 시:
sub2: A - B - C
sub1: A - B - C - D' - E'

이미 push한 공개 브랜치를 rebase 하면 안 됨. 히스토리가 변경되기 때문에 충돌 가능성, 작업 내용 손실 위험 높음

### reset

혼자 작업할 때 아직 push 안 했을 때 주로 사용

1. --soft
   작업 디렉토리, 스테이징 영역 유지. 커밋 취소.
   커밋 메시지 잘못 쓴 경우. 여러 커밋을 하나로 합치고 싶을 때
2. --mixed(기본)
   작업디렉토리 유지. 스테이징 영역, 커밋 취소.
   커밋을 다시 나눠서 하고싶을 때. git add를 잘못했을 때
3. --hard
   작업 디렉토리, 스테이징 영역, 커밋 취소
   모든 것을 버리고 특정 커밋으로. 원격과 완전 동일하게. 모든 로컬 변경사항 버리기

```bash
# 3개 전 커밋으로
git reset HEAD~3

# 특정 커밋으로
git reset abc1234
```

### revert

협업할 때 배포된 버그 수정 시 사용

```bash
# 특정 커밋을 되돌리는 새 커밋 생성
git revert abc1234
```

### restore

```bash
# 작업 디렉토리 복원
git resotre file.txt

# 스테이징 영역 복원
git restore --staged file.txt

# 둘 다 복원
git restore -SW file.txt

# 특정 커밋의 파일로 복원
git restore --source=HEAD~2 file.txt
```

## 로컬 - 원격 저장소 관리

```bash
git remote add origin <URL>    # 원격 저장소 연결
git push origin <branch>    # 로컬의 커밋을 원격 저장소에 업로드
git pull origin <branch>    # 원격 저장소의 변경사항을 현재 브랜치에 병합
```

### pull

원격 저장소의 최신 코드를 로컬로 가져와 자동으로 병합. 실제로는 fetch로 원격 저장소 변경사항을 가져온 후 merge로 현재 브랜치에 병합

### sub1 브랜치에서 내용 변경 후 sub2 브랜치로 체크아웃 후 커밋 및 푸시 하면 sub2 브랜치로 푸시 가능

## VSCode - GitHub 연동

GitHub 레퍼지토리 생성

<br>

VSCode

Ctrl + Shift + P > Git: Add Remote..

원격 이름 origin

main branch 개시 > 커밋 및 푸시

## Branch 게시

sub branch 게시

## Issue, Pull Request Template 생성

.github/ISSUE_TEMPLATE/bug_report.md, feature_request.md

.github/pull-request_template.md
