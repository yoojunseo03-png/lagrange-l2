# 출처와 라이선스 (7단계 웹)

화면 "출처" 창과 같은 내용. 외부 자료는 받을 때 `data/<자료>/manifest.json` 에 주소·받은 날짜·SHA256·라이선스를 적는다 (CLAUDE.md 7-1절).

## 소프트웨어 (빌드에 묶이는 것)

| 이름 | 버전 | 라이선스 | 쓰임 |
|---|---|---|---|
| three.js | 0.186.1 | MIT | 3D 그리기 (OrbitControls 포함) |

빌드·시험에만 쓰는 것 (배포물에 안 들어감): esbuild 0.28.2 (MIT), @playwright/test 1.64.0 (Apache-2.0). 버전 확인 2026-10-27 (`npm view`), 고정 `web/package-lock.json`.

## 자료

| 자료 | 출처 | 라이선스 | 상태 |
|---|---|---|---|
| 계산 결과 (`results/web/`) | 이 저장소의 Python 계산 (상수: DE441 header.441 원문 환산) | 코드 MIT, 결과·문서 CC BY 4.0 (사용자 결정 ⑧, `LICENSE`·`LICENSES.md`) | M0 |
| 천체 위치·JWST 궤적 | NASA/JPL Horizons System (ssd.jpl.nasa.gov/horizons) — 천체력 DE441, JWST 재구성·무분사 예측 | 출처 표기. 미리 받아 둔 자료만 쓰고 실행 중 호출 없음 (CLAUDE.md 7절) | 화면 아래 출처 줄과 출처 창 (2026-11-08) |
| 앱 아이콘 (`src/pwa/icons/`) | 임시 — `web_icon.py` 로 그림 (사용자 결정 ⑪, 나중에 바꿈) | 이 저장소 | M0 |
| 행성 공전 궤도선 (`results/web/m4.orbits.json`) | JPL SSD, Keplerian elements for approximate positions of the major planets 표 1 (ssd.jpl.nasa.gov/planets/approx_pos.html, E. M. Standish) — `stage7_공전궤도.py` 로 닫힌 선을 만듦 | 궤도 요소 수치, 출처 표기 (`data/jpl_approx_pos/manifest.json`) | 표시용 근사 — 궤도 모양만 (2026-11-09) |
| 지구 낮 표면 (Blue Marble Next Generation 2004-07, 21600×10800 → 면적 평균 8K·2K → WebP) | NASA Earth Observatory (science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map) | NASA 자료 — 미국 저작권 대상 아님. 출처 표기, NASA 로고·보증 암시 없음 | 그래픽 묶음 2 (2026-11-03 받음, 결정 ㉛ NASA 로 변경, `data/textures/earth/manifest.json`) — 공개판 2K → 화면에서 크면 8K, 휴대폰·한 파일판 2K |
| 지구 밤 불빛 (Black Marble 2016 색 지도 3 km, 13500×6750 → 8K·2K) | NASA Earth Observatory — Earth at Night (science.nasa.gov/earth/earth-observatory/earth-at-night/maps), Suomi NPP VIIRS | 위와 같음 | 그래픽 묶음 2 (2026-11-03). 구름 층은 원본을 받지 못해 없음 |
| 달·지구 자세 계수 | 달: IAU WGCCRE 2009 (Archinal 외 2011) — NAIF `pck00011.tpc` (naif.jpl.nasa.gov). 지구: IAU 2006/2000A (pyerfa — SOFA/ERFA) | NAIF 공개 자료 / ERFA BSD-3 (Python 쪽만, 배포물에 안 들어감) | 그래픽 묶음 2·3 (`data/iau/manifest.json`) |
| 달 표면 (LRO LROC 색 모자이크, 2K·8K → WebP 품질 90) | NASA's Scientific Visualization Studio — CGI Moon Kit (svs.gsfc.nasa.gov/4720) | 공공 영역 (SVS: "All of our content is in the public domain (unless otherwise noted)"), 출처 표기 "NASA's Scientific Visualization Studio". NASA 로고·보증 암시 없음 | M4 화면 (2026-11-02 받음, `data/textures/moon/manifest.json`) — 공개판 2K → 8K, 휴대폰·한 파일판 2K |
| 별 (HYG v4.4) | HYG Database v4.4 — David Nash (astronexus), codeberg.org/astronexus/hyg | CC BY-SA 4.0 — 파생 별 파일 (`results/web/m5.stars.*`, 6.5 등급까지·황도 J2000) 도 같은 조건 | M5 화면 (화면 아래 출처 줄). 색지수 없는 별 33 개는 분광형으로 추정 (결정 ㉙) |
| 분광형 → B−V 표 (86 행, 두 열만) | E. Mamajek, "A Modern Mean Dwarf Stellar Color and Effective Temperature Sequence" v2022.04.16 — 인용 Pecaut & Mamajek (2013, ApJS 208, 9) | 원문에 라이선스 표기 없음 → 원문 파일은 넣지 않고 사실 자료 두 열만 (`data/spectral_ci/manifest.json`) | 결정 ㉙ (2026-11-02) |
| 은하수 (ESA Gaia sky in colour — 그래픽 묶음 4: 40000×20000 원본 (git 밖) → 면적 평균 8192×4096 → WebP, 2K 먼저. 한 파일판·휴대폰 2K) | ESA/Gaia/DPAC. Acknowledgement: Gaia Data Processing and Analysis Consortium (DPAC); A. Moitinho / A. F. Silva / M. Barros / C. Barata, University of Lisbon, Portugal; H. Savietto, Fork Research, Portugal | CC BY-SA 3.0 IGO — 가공 이미지 (`results/web/m5.milkyway*.webp`) 도 같은 조건 | M5 화면 (결정 ㉕ — SSIM 비교 `results/stage7_M5_은하수_품질.json`). 화면 아래 출처 줄 (#credits) 에 표기 + "표시용 근사" |

## 글꼴

| 이름 | 버전 | 라이선스 | 쓰임 |
|---|---|---|---|
| Pretendard (부분 글꼴 Regular·SemiBold, woff2) | 1.3.9 | SIL OFL 1.1 — 예약 글꼴 이름 "Pretendard" (파일은 받은 그대로, 고치지 않음) | 본문 400·제목·이름표 600 |

- 원본·주소·받은 날짜·SHA256: `data/fonts/manifest.json`, 라이선스 원문 `data/fonts/LICENSE.txt`. Copyright (c) 2021, Kil Hyung-jin.
- 배포물: 서버판은 `fonts/` 에 글꼴과 `LICENSE.txt` 를 함께, 한 파일판은 글꼴을 `data:` 로 넣고 옆에 `Pretendard-LICENSE.txt` 를 둔다 (`web/build.mjs`).
- 실행 중 외부 글꼴 요청은 없다 (시험: `web/tests/e2e/design.spec.mjs` "외부 요청 0").
