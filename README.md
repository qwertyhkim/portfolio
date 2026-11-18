# Yonghui Kim — Portfolio (Next.js + Vercel)

## 내용 수정
- **모든 문구·숫자·링크는 `lib/content.ts` 한 파일에 있습니다.**
- 프로젝트 자료 링크는 `links: { github: "...", slides: "...", tableau: "..." }`에 넣으면 버튼이 자동으로 생깁니다.
- 슬라이드 PDF를 사이트에 직접 올리려면 `public/slides/파일명.pdf`에 넣고 `slides: "/slides/파일명.pdf"`로 적으세요.
- GitHub 주소는 `profile.github`에 넣으면 Contact에 나타납니다.

## 디자인 메모
- 포인트 컬러(코랄)와 배경색: `app/globals.css` 맨 위 `:root`의 `--accent`, `--bg`
- Hero 모션: `public/hero-motion.js` (점 개수, 속도, 색은 파일 상단에서 조절)

## 로컬 실행 (선택)
```bash
npm install
npm run dev     # http://localhost:3000
```

## 배포 (GitHub → Vercel)
1. github.com에서 새 저장소 `portfolio` 만들기 (Public)
2. 이 폴더에서:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<아이디>/portfolio.git
   git push -u origin main
   ```
   (터미널이 어렵다면 GitHub 웹에서 "uploading an existing file"로 폴더 내용을 드래그해도 됩니다. `node_modules`, `.next`는 제외)
3. vercel.com → GitHub로 로그인 → **Add New → Project** → `portfolio` Import → **Deploy**
4. 이후 GitHub에 push할 때마다 자동 재배포됩니다.

## GTM 연결
1. tagmanager.google.com에서 Web 컨테이너 생성 → `GTM-XXXXXXX` 복사
2. Vercel → Project → Settings → Environment Variables
   `NEXT_PUBLIC_GTM_ID = GTM-XXXXXXX` 추가 → Deployments에서 **Redeploy**
3. GTM에서 아래 맞춤 이벤트용 트리거 + GA4 이벤트 태그 생성

| 이벤트 | 파라미터 | 발생 시점 |
|---|---|---|
| `project_open` | `project_name`, `location` | 카드 → 상세 페이지 |
| `project_link_click` | `project_name`, `link_type` (github/slides/tableau) | 자료 링크 클릭 |
| `contact_click` | `channel` (email/linkedin/github), `location` | 연락 링크 클릭 |
| `section_view` | `section_name` | 섹션이 40% 이상 보일 때 (페이지당 1회) |

페이지 이동(`page_view`)은 GA4 구성 태그의 향상된 측정(Enhanced Measurement → 브라우저 기록 기반 페이지 변경)으로 수집됩니다.
