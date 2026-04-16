import { readFileSync } from 'fs'

// These are the portfolio pages from ryznsquare.oopy.io
// We'll use browser to capture screenshots of each page
const portfolioLinks = [
  { name: 'KDB인베스트먼트', ref: 'e5' },
  { name: 'CJ AI CENTER', ref: 'e8' },
  { name: '[용돈] 용하게 돈벌다', ref: 'e11' },
  { name: '플레이키키', ref: 'e14' },
  { name: '오피유커스', ref: 'e17' },
  { name: '해피한', ref: 'e20' },
  { name: '드림잡스쿨', ref: 'e23' },
  { name: '스카이업드래곤', ref: 'e27' },
  { name: '법무법인세림', ref: 'e32' },
  { name: '리바이모', ref: 'e36' },
  { name: '윤호병원', ref: 'e41' },
  { name: 'JWP파트너스', ref: 'e45' },
  { name: '커뮤니케이션즈 코리아', ref: 'e49' },
  { name: '오월학교', ref: 'e53' },
  { name: '우리아토즈', ref: 'e57' },
  { name: '다란인테리어', ref: 'e61' },
  { name: '아토즈오프쇼어', ref: 'e65' },
  { name: '맥스플러스원', ref: 'e70' },
  { name: '렉스소프트', ref: 'e74' },
  { name: '유미코 에어 매트리스', ref: 'e78' },
  { name: 'WSL', ref: 'e82' },
  { name: '진주교육대 100주년', ref: 'e87' },
  { name: '신원레저산업', ref: 'e91' },
  { name: 'LH 플랫폼', ref: 'e96' },
  { name: '세븐의료기 리쇼드', ref: 'e99' },
]

console.log(JSON.stringify(portfolioLinks, null, 2))
