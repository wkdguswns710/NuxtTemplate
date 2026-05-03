## merge test

1. sub2에서 commit, sub1에서 merge => 그냥 병합됨
2. sub1에서 commit, sub2에서 staging 후 merge => 병합 안 됨
3. sub1에서 commit, sub2에서 commit 후 merge => 충돌 편집기에서 해결 후 병합됨

## rebase test

## reset test

1. 특정 커밋으로 reset => 해당 커밋의 변경 후 내용으로 복구됨. 그 후에 변경됐던 내용들은 변경사항으로 남아있음

## reflog test

1. reset 후 reflog 확인. 다시 reset을 사용하여 첫 reset된 커밋을 복구

## restore test

1. 특정 커밋으로 restore => 해당 파일이 이전 커밋 내용으로 바뀜. 커밋 히스토리는 변경 없음.
