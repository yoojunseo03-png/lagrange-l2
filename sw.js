// 서비스 워커 (설계 8절) — build.mjs 가 아래 두 자리 (캐시 이름 = 버전 + 내용 해시, 미리 담을 파일 목록) 를 채운다.
// 설치: 첫 화면 파일을 담는다 (실험실 자료·Worker 는 처음 읽을 때). 기다림: 새 판은 단추 (SKIP_WAITING 메시지) 를 누를 때만 바뀐다 — install 에서 skipWaiting 하지 않는다.
// 가져오기: 같은 출처만, 담아 둔 것을 먼저 (오프라인). 외부 주소는 다루지 않는다.

const CACHE = "lagrange-v0.0.0-3b15c17-fe1f992cac6f";
const FILES = ["./","app.js","data/m0.tag_samples.json","data/m4.ephem.2026.bin","data/m4.ephem.json","data/m4.orbits.json","data/manifest.json","data/stage1.points.json","data/stage2.l2_directions.json","data/stage3.burns.bin","data/stage3.burns.json","data/stage3b.escape_samples.bin","data/stage3b.escape_samples.json","data/stage3c.halo_family.bin","data/stage3c.halo_family.json","data/stage4.reference.bin","data/stage4.reference.json","data/stage4a.jwst.bin","data/stage4a.jwst.json","data/stage5.jwst.bin","data/stage5.jwst.json","data/time.utc.bin","data/time.utc.json","fonts/LICENSE.txt","fonts/Pretendard-Light.subset.woff2","fonts/Pretendard-Regular.subset.woff2","fonts/Pretendard-SemiBold.subset.woff2","icons/icon-192.png","icons/icon-512.png","icons/icon-maskable-512.png","index.html","manifest.webmanifest","style.css","version.json"];
const LAZY = new Set(["data/m3.lab.json","data/m3.lab.bin","data/m3.d24.forest","data/m4.ephem.2022.bin","data/m4.ephem.2023.bin","data/m4.ephem.2024.bin","data/m4.ephem.2025.bin","data/m4.ephem.2027.bin","data/m4.ephem.2028.bin","data/m4.ephem.2029.bin","data/m4.ephem.2030.bin","data/m4.ephem.2031.bin","data/m4.ephem.2032.bin","data/m4.ephem.2033.bin","data/m4.ephem.2034.bin","data/m4.ephem.2035.bin","data/m4.ephem.2036.bin","data/m4.ephem.2037.bin","data/m4.ephem.2038.bin","data/m4.ephem.2039.bin","data/m4.ephem.2040.bin","data/m4.ephem.2041.bin","data/m4.ephem.2042.bin","data/m4.ephem.2043.bin","data/m4.ephem.2044.bin","data/m4.ephem.2045.bin","data/m4.ephem.2046.bin","data/m4.ephem.2047.bin","data/m4.ephem.2048.bin","data/m4.ephem.2049.bin","data/m5.stars.json","data/m5.stars.bin","data/m5.milkyway.json","data/m5.milkyway_2k.webp","data/m5.milkyway.webp","data/ephem.earth_moon.json","data/ephem.earth_moon.bin","data/m4.textures.json","data/m4.textures.bin","data/m4.moon_2k.webp","data/m4.moon_8k.webp","data/m4.earth_day_2k.webp","data/m4.earth_night_2k.webp","data/m4.earth_clouds_2k.webp","data/m4.earth_clouds_8k.webp","data/m4.earth_land.webp","data/m4.planet_mercury_2k.webp","data/m4.planet_venus_2k.webp","data/m4.planet_mars_2k.webp","data/m4.planet_jupiter_2k.webp","data/m4.planet_saturn_2k.webp","data/m4.planet_uranus_2k.webp","data/m4.planet_neptune_2k.webp","data/m4.planet_mercury_hi.webp","data/m4.planet_venus_hi.webp","data/m4.planet_mars_hi.webp","data/m4.planet_jupiter_hi.webp","data/m4.planet_saturn_hi.webp","data/m4.saturn_ring_2k.webp","data/m4.saturn_ring_hi.webp","lab-worker.js"]);          // 첫 화면 밖 (실험실 자료·Worker) — 처음 읽을 때 담는다 (오프라인에서도 한 번 연 뒤에는 쓰임)

self.addEventListener('install', (e) => {
  // cache: 'reload' — 브라우저 HTTP 캐시를 건너뛴다. 공개 주소는 max-age=600 이라, 옛 판을 연 지 10 분 안에 새 판이 나오면 새 캐시 이름에 옛 파일이 담겨 단추를 눌러도 옛 판이었다 (2026-11-09 공개 주소에서 찾음)
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: 'reload' })))));
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== self.location.origin) return;
  // 한 파일판 (공개 주소의 single/) 은 서비스 워커 범위 안이지만 따로인 판 — 아래 이동 대체 (웹판 index) 를 타면 한 파일판 대신 웹판이 뜬다 (2026-11-08)
  if (url.pathname.startsWith(new URL('./single/', self.location).pathname)) return;
  e.respondWith((async () => {
    const c = await caches.open(CACHE);
    const hit = await c.match(e.request, { ignoreSearch: true });
    if (hit) return hit;
    if (e.request.mode === 'navigate') {
      const index = await c.match('./');
      if (index) return index;
    }
    const rel = url.pathname.slice(new URL('./', self.location).pathname.length);
    const lazy = LAZY.has(rel);                  // 처음 읽을 때 담는 파일도 같은 까닭으로 HTTP 캐시를 건너뛴다
    const res = await fetch(lazy ? new Request(e.request, { cache: 'reload' }) : e.request);
    if (res.ok && lazy) await c.put(e.request, res.clone());
    return res;
  })());
});
