export interface Screenshot {
  src: string
  description: string
}

export interface TeamMember {
  role: string
  count: number
  description?: string
  isMe?: boolean
}

export interface Project {
  id: string
  title: string
  shortDescription: string
  award?: string
  period: string
  teamSize: number
  teamMembers?: TeamMember[]
  techStack: string[]
  thumbnail?: string
  thumbnailPosition?: string
  role?: string
  links?: {
    github?: string
    demo?: string
    video?: string
  }
  details: {
    fullDescription: string
    features: string[]
    challenges: {
      problem: string
      solution: string
    }[]
    goals: string[]
    retrospective: {
      improvements: string[]
      lessonsLearned: string[]
    }
    screenshots?: Screenshot[]
  }
}

export const projectsData: Project[] = [
  {
    id: 'answer-with-song',
    title: '노래로 답해줘',
    shortDescription: '당신의 기분을 사람들과 노래로 공유하는 감성 소통 플랫폼',
    period: '2025.12.15 - 2026.05.15',
    teamSize: 4,
    teamMembers: [
      { role: 'Project Manager', count: 1 },
      { role: 'Frontend', count: 1 },
      { role: 'Backend', count: 1 },
      { role: 'Infra / Backend', count: 1, isMe: true },
    ],
    techStack: [
      'Java 21',
      'Spring Boot 3.4.1',
      'MySQL',
      'Redis',
      'AWS (EC2, S3, CodeDeploy)',
      'Docker',
      'Flyway',
      'Nginx',
    ],
    role: 'Backend / Infra',
    links: {
      github: 'https://github.com/SongDap/songdap_backend',
    },
    thumbnail: '/assets/projects/nodap/landing.webp',
    details: {
      fullDescription:
        '사용자의 현재 기분에 어울리는 노래를 추천하고 공유하며 소통하는 서비스입니다. PM 1명, FE 1명, BE 1명, INFRA+BE 1명으로 구성된 팀에서 백엔드 아키텍처 설계와 CI/CD 파이프라인 구축, 클라우드 인프라 운영을 담당했습니다. 도메인 주도 설계(DDD)를 지향하며, 데이터 무결성과 보안을 최우선으로 고려하여 개발했습니다. 특히 크로스 오리진 환경에서의 안전한 쿠키 기반 인증 체계를 구축하는 데 집중했습니다.',
      features: [
        'Spring Security + JWT 기반의 안전한 HttpOnly/Secure 쿠키 인증 체계 구축',
        'SameSite=None 설정을 통한 크로스 오리진(CORS) 환경에서의 인증 유지 해결',
        'Flyway를 활용한 데이터베이스 스키마 버전 관리 및 마이그레이션 자동화',
        'GitHub Actions와 AWS CodeDeploy를 활용한 무중단 배포 환경 구축',
        'Nginx 리버스 프록시 설정을 통한 대용량 이미지 업로드 처리 최적화',
      ],
      challenges: [
        {
          problem:
            '인프라 운영 중 하드코딩된 AWS Access Key 노출 위험 및 관리의 번거로움 발생',
          solution:
            'EC2 인스턴스에 IAM Role(Instance Profile)을 부여하고, DefaultCredentialsProvider 폴백 로직을 구현하여 소스코드 내 민감 정보 완전 제거 및 보안성 강화',
        },
        {
          problem:
            'jjwt 라이브러리 사용 중 보안 규격 미달(256-bit 미만) 시 시크릿 키 WeakKeyException 발생으로 인한 서버 기동 실패',
          solution:
            'openssl을 활용한 32바이트(256-bit) base64 시크릿 생성 자동화 및 안전한 환경 변수 주입 방식으로 교체하여 보안 수준 상향',
        },
        {
          problem:
            '프론트엔드에서 고해상도 이미지 업로드 시 Nginx 기본 제한(1MB)으로 인한 413 Request Entity Too Large 에러 발생',
          solution:
            'Nginx의 client_max_body_size 조정 및 Spring Boot multipart 설정 동기화를 통해 10MB 수준의 안정적인 파일 업로드 환경 구축',
        },
      ],
      goals: [
        '음악을 통한 사용자 간의 정서적 교감 증진 및 안정적인 소통 채널 확보',
        '테스트 코드를 통한 도메인 로직의 신뢰성 확보 및 지속 가능한 아키텍처 구축',
        '최소 권한 원칙(PoLP)에 기반한 클라우드 리소스 관리 체계 확립',
      ],
      retrospective: {
        improvements: [
          'AWS 프리티어 기간 만료에 따른 서비스 종료 및 비용 효율적인 대체 인프라(On-premise 또는 타 클라우드) 이전 검토',
          '사용자 행동 로그 분석을 위한 ELK 스택 또는 CloudWatch Logs 고도화 예정',
          '추천 엔진의 성능 향상을 위한 데이터 파이프라인 비동기화 및 캐싱 전략 강화',
        ],
        lessonsLearned: [
          '클라우드 자원 운영 시 프리티어 등 비용 제약 사항을 고려한 인프라 설계 및 단계적 확장 전략의 중요성 습득',
          '하드코딩된 자격 증명의 위험성을 깨닫고 IAM Role 기반의 현대적인 클라우드 보안 모델을 깊이 이해함',
          '인프라(Nginx, AWS)와 애플리케이션(Spring) 간의 설정 정렬이 사용자 경험에 미치는 영향을 수치로 확인',
          'Flyway를 통한 DB 버전 관리로 협업 시 데이터베이스 동기화 문제를 효율적으로 해결하는 경험 확보',
        ],
      },
      screenshots: [
        { src: '/assets/projects/nodap/landing.webp', description: '서비스 메인 랜딩 페이지' },
        { src: '/assets/projects/nodap/album.webp', description: '사용자별 감성 앨범 리스트' },
        { src: '/assets/projects/nodap/inside-album.webp', description: '앨범 상세 수록곡 뷰' },
        { src: '/assets/projects/nodap/create-album.webp', description: '새로운 감성 앨범 생성' },
        { src: '/assets/projects/nodap/create-cover.webp', description: '앨범 커버 이미지 설정' },
        { src: '/assets/projects/nodap/create-category.webp', description: '감성 카테고리 분류' },
        { src: '/assets/projects/nodap/add-song.webp', description: '앨범 내 노래 추가 및 관리' },
      ],
    },
  },
  {
    id: 'dollar-insight',
    title: 'Dollar Insight',
    shortDescription: 'AI와 함께 미국 주식을 스마트하게 / 삼성 청년 SWㆍAI 아카데미 자율 프로젝트',
    period: '2025.10.10 - 2025.11.20',
    teamSize: 6,
    teamMembers: [
      { role: 'Frontend', count: 3 },
      { role: 'Backend', count: 2, description: '아키텍처 설계 및 구현', isMe: true },
      { role: 'AI / Data', count: 1 },
    ],
    techStack: [
      'Java 21',
      'Spring Boot 3.5.7',
      'FastAPI',
      'PostgreSQL 16',
      'MongoDB',
      'ChromaDB',
      'Flyway',
      'Docker',
      'Flutter',
    ],
    role: 'Backend / Speaker',
    links: {
      github: 'https://github.com/NaldonStudy/DollarInsight',
    },
    thumbnail: '/assets/projects/dollarinsight/dollarinsight-intro.jpg',
    thumbnailPosition: 'top',
    details: {
      fullDescription:
        '미국 주식을 처음 시작하는 사람들을 위한 가이드를 제공하고, 여러 페르소나의 AI 어시스턴트와 대화하며 투자 인사이트를 얻을 수 있는 서비스입니다. 삼성 청년 SWㆍAI 아카데미 자율 프로젝트로 진행되었으며, 백엔드 아키텍처 설계와 AI 스트리밍 브리지 구축을 담당했습니다. 대용량 정형/비정형 데이터 처리를 위해 다중 데이터베이스 환경을 구축했습니다.',
      features: [
        'Flutter - Spring - FastAPI를 잇는 3계층 SSE(Server-Sent Events) 스트리밍 브리지 구축',
        '여러 페르소나의 AI(유명 투자자 등)와 실시간 그룹 채팅 및 토론 기능',
        'MongoDB를 활용한 대용량 채팅 메시지 및 뉴스 데이터의 효율적 관리',
        'ChromaDB(Vector DB) 기반의 유사도 검색을 활용한 개인화된 종목 추천',
        'Flyway를 활용한 안정적인 데이터베이스 마이그레이션 관리',
        'Kakao/Google OAuth를 통한 간편 로그인 및 JWT 보안 체계 수립',
      ],
      challenges: [
        {
          problem:
            '초기 WebSocket 구현 시, 단방향 소통 위주의 AI 응답 흐름에서 불필요한 리소스(메모리, 스레드) 소모 및 보안 설정의 복잡성 발생',
          solution:
            'SSE(Server-Sent Events)로 전환하여 가벼운 단방향 스트리밍 구현. 재연결 및 유실 복구 내장 기능을 활용하고, HTTP 표준 보안 헤더 처리를 간소화함',
        },
        {
          problem:
            'BFF 구조에서 FastAPI의 AI 응답을 Spring이 중계할 때, 메시지 저장 로직이 스트리밍 전송을 블로킹하여 지연 발생',
          solution:
            'WebClient(WebFlux)로 /stream을 구독하고 SseEmitter로 즉시 중계하는 브리지 구현. AI 메시지 저장 및 세션 갱신을 CompletableFuture로 비동기 처리하여 스트림 전송 성능 최적화',
        },
        {
          problem:
            '주가 정보(정형)와 채팅/뉴스(비정형) 데이터를 단일 DB에서 처리 시 성능 및 확장성 한계',
          solution:
            'PostgreSQL(사용자/종목)과 MongoDB(채팅/뉴스)를 분리하여 데이터 특성에 최적화된 저장소 아키텍처 설계 및 처리 속도 향상',
        },
      ],
      goals: [
        '팀원들의 Java 역량 향상을 위해 DDD(도메인 주도 설계)를 적용한 모범적인 코드 구조 제시',
        '테스트 코드 기반의 안정적인 개발 및 Setter 사용 지양을 통한 데이터 무결성 확보',
        'Swagger를 활용한 상세한 API 문서화로 팀 내 협업 효율 극대화',
      ],
      retrospective: {
        improvements: [
          '무상태성(Stateless) JWT 기반 인증 시스템의 보안 강화를 위한 Redis Blacklist 기반 로그아웃 무효화 전략 검토 중',
          'MSA 구조의 안정성 확보를 위해 Resilience4j를 활용한 서킷 브레이커 도입 및 AI 서비스 장애 전파 방지(Cascading Failure) 아키텍처 설계',
          'DDD 구조 적용 시 도메인 서비스가 인프라 계층에 직접 의존하게 된 경계 침범 이슈 발견 및 아키텍처 개선 필요',
        ],
        lessonsLearned: [
          'SSE와 비동기 처리를 결합한 효율적인 스트리밍 데이터 중계 아키텍처 설계 경험',
          'Polyglot Persistence(PostgreSQL, MongoDB, ChromaDB) 환경에서의 데이터 정합성 관리 역량 습득',
          '동료들에게 기술적 가이드를 제공하며 아키텍처 설계와 코드 품질 관리의 중요성을 깊이 체감',
        ],
      },
      screenshots: [
        { src: '/assets/projects/dollarinsight/splash.webp', description: '실시간 데이터 기반의 지능형 기업 분석 메인 화면' },
        { src: '/assets/projects/dollarinsight/stock-chart.webp', description: '다양한 보조지표와 함께 제공되는 상세 주가 차트' },
        { src: '/assets/projects/dollarinsight/chat-room.webp', description: '투자 전문가 페르소나 AI와의 실시간 상담 및 토론' },
        { src: '/assets/projects/dollarinsight/prediction.webp', description: 'AI 모델을 활용한 향후 주가 변동성 예측 정보' },
        { src: '/assets/projects/dollarinsight/news-detail.webp', description: '사용자 맞춤형 정밀 뉴스 큐레이션 및 상세 내용' },
        { src: '/assets/projects/dollarinsight/persona-1.webp', description: '다양한 투자 성향을 가진 AI 페르소나 라인업' },
        { src: '/assets/projects/dollarinsight/change-ai-friend.webp', description: '나의 투자 성향에 맞는 AI 어시스턴트 자유 설정' },
      ],
    },
  },
  {
    id: 'wallet-slot',
    title: 'Wallet Slot',
    shortDescription: '빈틈 Zero 금융생활을 위한 스마트 자산 관리 서비스 / 삼성 청년 SWㆍAI 아카데미 특화 프로젝트',
    award: '삼성 청년 SWㆍAI 아카데미 특화 프로젝트 우수상',
    period: '2025.08.25 - 2025.09.29',
    teamSize: 6,
    teamMembers: [
      { role: 'Infra', count: 1 },
      { role: 'Frontend', count: 3 },
      { role: 'Backend', count: 1, description: '팀 리더 / 보안 설계', isMe: true },
      { role: 'Data', count: 1 },
    ],
    techStack: [
      'Java 21',
      'Spring Boot 3.5.5',
      'Spring Security',
      'AWS KMS',
      'MySQL 8.0',
      'OpenAI API',
      'Naver CLOVA OCR',
      'Firebase (FCM)',
      'WebFlux',
      'Redis',
      'Docker',
    ],
    role: 'Backend Lead / Presenter',
    links: {
      github: 'https://github.com/NaldonStudy/WalletSlot',
    },
    thumbnail: '/assets/projects/walletslot/walletslot-intro.jpg',
    thumbnailPosition: 'top',
    details: {
      fullDescription:
        '본인의 소비 지출에 대해 무뎌져 있는 사람들을 위해 자동 및 수동으로 슬롯(계좌 분할)을 관리해주는 자산 관리 플랫폼입니다. 삼성 청년 SWㆍAI 아카데미 특화 프로젝트로 진행되었으며, 인프라 1, 프론트 3, 백엔드 2, 데이터 1 등 총 6인의 팀 프로젝트로 진행되었습니다. 백엔드 리더로서 전체 아키텍처와 보안 설계를 주도했습니다. SSAFY 내부 금융망과 연동하여 실제 금융 환경과 유사한 경험을 제공하며, AI 기반 소비 리포트를 통해 계획적인 소비 습관 형성을 돕습니다.',
      features: [
        '마이데이터 기반 계좌 연동 및 실시간 거래 내역 동기화 (SSAFY 금융망 API)',
        'AWS KMS 및 AES-256을 활용한 계좌 정보 암화화 및 PIN/OTP 기반의 다중 보안 체계 구축',
        'AI 기반 소비 패턴 분석 및 월간 소비 리포트 자동 생성 파이프라인 (OpenAI API)',
        '영수증 OCR 인식을 통한 자동 가계부 입력 및 거래 분류 기능 (Naver CLOVA OCR)',
        'Nimbus JOSE/JWT를 활용한 디바이스 바인딩 인증 및 리프레시 토큰 회전(RTR) 구현',
        'Firebase Cloud Messaging(FCM)을 활용한 실시간 예산 초과 및 거래 발생 알림',
        'WebClient(WebFlux)를 활용한 비동기 API 통신으로 외부 연동 성능 최적화',
      ],
      challenges: [
        {
          problem:
            '단일 앱/DB 환경에서 실제 금융사의 물리적 계층 분리를 구현하기 어려운 한계',
          solution:
            '계정계 수준 보호를 위해 논리적 통제 적용 (AES 암호화, JWT 디바이스 바인딩, PIN pepper+BCrypt, KMS 기반 키 관리, OTP HMAC, Refresh 토큰 JTI 관리)',
        },
        {
          problem:
            '베타 버전 피드백에서 단순 금액 정보만으로는 사용자 행동 변화를 이끌어내기 부족하다는 지적',
          solution:
            '구간별 거래를 집계하여 과지출 횟수, 자주 쓰는 분야, 개선 방안 등을 제시하는 AI 소비 리포트 파이프라인 구축 (JSON 강제 파싱 및 재시도 로직으로 안정화)',
        },
        {
          problem:
            '여러 계좌의 대규모 거래 내역 동기화 시 발생하는 성능 병목 및 API 호출 최적화 필요',
          solution:
            'WebClient를 활용한 비동기 병렬 API 호출과 배치 처리를 결합하여 동기화 속도 개선 및 효율적인 트랜잭션 관리 구현',
        },
      ],
      goals: [
        '실제 금융 서비스 수준의 보안 및 운영 방식 구현',
        '개인정보 보호를 위한 강화된 인증/인가 및 암호화 체계 구축',
        '물리적 분리가 불가능한 환경에서 최선의 논리적 보안 대안 제시',
      ],
      retrospective: {
        improvements: [
          '대량의 카드 내역 로딩 속도 개선을 위한 폴링 최적화 및 비동기 구성 고도화 필요',
          '향후 게이트웨이, 서킷브레이커, 읽기/쓰기 DB 분리 등 물리 분리 환경 고려 필요',
        ],
        lessonsLearned: [
          '금융 데이터 보안 아키텍처의 실제 설계 및 구현 경험 확보',
          'AI 모델 응답의 안정성을 높이기 위한 파이프라인 고도화 기법 습득',
          '비동기 논블로킹(WebFlux) 통신을 통한 대량의 외부 API 연동 처리 역량 강화',
          '복잡한 비즈니스 로직(슬롯 관리, 거래 분류)의 도메인 모델링 및 성능 최적화 경험',
        ],
      },
      screenshots: [
        { src: '/assets/projects/walletslot/dashboard-overview.webp', description: '소비 현황을 한눈에 파악하는 메인 대시보드' },
        { src: '/assets/projects/walletslot/dashboard-detailed-view.webp', description: '슬롯별 상세 예산 및 지출 내역' },
        { src: '/assets/projects/walletslot/divide-amount.webp', description: 'AI를 활용한 복합 결제 내역 금액 분할' },
        { src: '/assets/projects/walletslot/slot-detail.webp', description: '개별 슬롯의 소비 패턴 및 잔여 예산 확인' },
        { src: '/assets/projects/walletslot/spending-report-index.webp', description: 'AI 기반 월간 소비 리포트 분석 결과' },
        { src: '/assets/projects/walletslot/recommendation-result.webp', description: '사용자 소비 패턴 분석을 통한 맞춤형 슬롯 추천' },
        { src: '/assets/projects/walletslot/wishlist-main.webp', description: '목표 달성을 위한 위시리스트 및 저축 관리' },
        { src: '/assets/projects/walletslot/mydata-connect-complete.webp', description: '마이데이터 연동을 통한 전 금융권 자산 통합' },
        { src: '/assets/projects/walletslot/transaction-history.webp', description: '실시간으로 동기화되는 상세 거래 내역' },
        { src: '/assets/projects/walletslot/signup-complete.webp', description: '간편한 본인 인증 및 회원가입 프로세스 완료' },
      ],
    },
  },
  {
    id: 'promise-now',
    title: 'Promise Now',
    shortDescription: '약속부터 만남까지 한 화면에서 함께하는 즐거움, 실시간 약속 관리 플랫폼 / 삼성 청년 SWㆍAI 아카데미 공통 프로젝트',
    award: '삼성 청년 SWㆍAI 아카데미 공통 프로젝트 우수상',
    period: '2025.07.07 - 2025.08.18',
    teamSize: 5,
    teamMembers: [
      { role: 'Team Lead / Backend', count: 1, description: '핵심 도메인 설계', isMe: true },
      { role: 'Frontend', count: 3 },
      { role: 'Backend', count: 1 },
    ],
    techStack: [
      'Java 21',
      'Spring Boot 3.5.3',
      'MySQL 8.0',
      'Redis 7.2',
      'QueryDSL',
      'WebSocket (STOMP)',
      'Mediasoup (SFU)',
      'Spring Security',
      'Docker',
    ],
    role: 'Team Lead / Backend',
    links: {
      github: 'https://github.com/NaldonStudy/PromiseNow',
    },
    thumbnail: '/assets/projects/promisenow/promisenow-intro.jpg',
    thumbnailPosition: 'top',
    details: {
      fullDescription: '약속 시간 조율부터 실제 만남까지의 모든 과정을 하나의 service에서 관리할 수 있는 실시간 협업 플랫폼입니다. 삼성 청년 SWㆍAI 아카데미 공통 프로젝트로 진행되었으며, 백엔드 팀장으로서 실시간 위치 공유 리더보드, 비트마스크 기반 일정 조율 알고리즘, STOMP 기반 채팅 시스템 등 핵심 도메인 로직 설계를 주도했습니다. 특히 대규모 실시간 데이터 처리를 위해 Redis와 SFU 기반 WebRTC 아키텍처를 도입하여 성능을 최적화했습니다.',
      features: [
        'When2Meet 스타일의 30분 단위 비트마스크 기반 실시간 일정 조율 알고리즘 구현',
        'Redis Sorted Set과 Haversine 공식공식을 활용한 실시간 위치 공유 및 도착 리더보드 구축',
        'STOMP(WebSocket) 기반의 저지연 실시간 채팅 및 상태 업데이트 시스템',
        'Mediasoup(SFU) 기반의 고성능 다자간 화상 통화 서버 구축 및 연동',
        'Spring Security + OAuth2 기반의 소셜 로그인 및 JWT 보안 체계 수립',
        'QueryDSL을 활용한 타입 안정성이 보장된 동적 쿼리 최적화',
      ],
      challenges: [
        {
          problem: 'OpenVidu(MCU) 방식 사용 시 참여자 증가에 따른 서버 CPU 부하 급증 및 지연 발생',
          solution: 'SFU(Mediasoup) 아키텍처로 전환하여 서버 부하 49% 절감(507ms → 258ms) 및 지연 시간 50% 단축으로 다수 참여자 환경 안정화',
        },
        {
          problem: '실시간 위치 공유 시 매 초 발생하는 수많은 위치 데이터를 DB에 직접 저장할 경우 병목 발생 우려',
          solution: 'Redis를 Write-Back 캐시로 활용하고 Sorted Set으로 진행률 랭킹을 관리하여 DB 부하를 최소화하고 실시간 응답성(Sub-second) 확보',
        },
        {
          problem: '복잡한 다대다 일정 조율 로직 구현 시 수많은 날짜와 시간 데이터를 효율적으로 처리할 방법 필요',
          solution: '30분 단위의 시간 슬롯을 비트마스크(TimeData) 문자열로 관리하고, 이를 비트 연산 기반으로 누적 합산하는 Processor를 개발하여 연산 속도 및 저장 효율 극대화',
        },
      ],
      goals: [
        '약속의 전 과정을 끊김 없이 지원하는 실시간성 중심의 사용자 경험 제공',
        '실시간 통신 환경에서의 백엔드 부하 최적화 및 확장 가능한 아키텍처 구축',
        '팀장으로서 기술적 난제 해결 가이드라인 제시 및 일관된 코드 품질 유지',
      ],
      retrospective: {
        improvements: [
          '위치 공유 데이터의 휘발성을 고려한 Redis TTL 정밀 튜닝 및 장애 복구 시나리오 고도화 예정',
          '추후 마이크로서비스 아키텍처(MSA) 전환을 고려한 도메인 간 결합도 완화 필요',
        ],
        lessonsLearned: [
          'Redis의 다양한 자료구조(Sorted Set, Strings)를 실무 수준에서 활용하며 실시간 데이터 처리의 정수를 경험함',
          '비트마스크 기법을 활용하여 복잡한 비즈니스 로직(일정 조율)을 데이터 친화적으로 단순화하는 통찰력을 얻음',
          'SFU와 MCU의 성능 차이를 지표로 직접 검증하며 시스템 아키텍처 결정이 성능에 미치는 영향을 깊이 이해함',
        ],
      },
      screenshots: [
        { src: '/assets/projects/promisenow/landing.webp', description: '서비스 메인 랜딩 페이지' },
        { src: '/assets/projects/promisenow/room-selection.webp', description: '약속 방 선택 및 관리' },
        { src: '/assets/projects/promisenow/schedule-monthly.webp', description: '약속 일정 확인 및 조율' },
        { src: '/assets/projects/promisenow/schedule-weekly.webp', description: '주간 단위 상세 일정 조율' },
        { src: '/assets/projects/promisenow/schedule-modal.webp', description: '확정 일정 생성 및 수정' },
        { src: '/assets/projects/promisenow/map-view.webp', description: '실시간 위치 공유 및 지도 확인' },
        { src: '/assets/projects/promisenow/video-call-4p.webp', description: 'SFU 기반 고성능 다자간 화상 통화' },
        { src: '/assets/projects/promisenow/video-call-chat.webp', description: '화상 통화 중 실시간 채팅' },
        { src: '/assets/projects/promisenow/roulette.webp', description: '메뉴 선정을 위한 미니 게임(룰렛)' },
        { src: '/assets/projects/promisenow/settings.webp', description: '개인 및 약속 환경 설정' },
      ],
    },
  },
  {
    id: 'personal-portfolio',
    title: '개인 포트폴리오 제작 & 웹 성능 극대화',
    shortDescription: 'Next.js 16과 Tailwind 4를 사용한 포트폴리오 구축 및 대용량 갤러리 이미지 성능 극대화',
    period: '2026.05.15 - 2026.05.20',
    teamSize: 1,
    teamMembers: [
      { role: 'Frontend / Design', count: 1, isMe: true },
    ],
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript 5',
      'Tailwind CSS 4',
      'Zustand',
      'sharp',
      'Node.js',
    ],
    role: 'Frontend Developer / UI Designer',
    links: {
      github: 'https://github.com/NaldonStudy/NaldonStudy',
    },
    thumbnail: '/assets/projects/portfolio/portfolio-intro.webp',
    details: {
      fullDescription:
        '기존의 개인 포트폴리오 사이트를 React 19 및 Next.js 16 신규 스택으로 마이그레이션하고 GitHub Pages 정적 배포 환경에 맞추어 최적화했습니다. 초기 개발 이후 발생한 상세 팝업 오픈 시의 미세한 버벅임(Stuttering)을 해결하기 위해, 단순한 코드 수정을 넘어 프로젝트 전체의 아키텍처를 DDD/FSD 기반의 도메인 중심 구조로 전면 리팩토링했습니다. 또한 무거운 UI 요소에 지연 로딩을 적용하고, 이를 상시 감시하기 위한 커스텀 검증 툴을 직접 구축하여 기술적 완성도를 높였습니다.',
      features: [
        'Next.js 16 App Router 기반 정적 페이지 빌드 및 GitHub Pages 배포 환경 구축 (output: export)',
        '도메인 중심 아키텍처(DDD/FSD) 도입을 통한 대규모 컴포넌트(Projects, History 등)의 관심사 분리 및 구조화',
        'next/dynamic을 활용한 헤비 UI(모달, 상세 탭) 지연 로딩(Lazy Loading) 구현으로 인터랙션 속도 획기적 개선',
        'Atomic Design 규칙 준수 여부 및 데이터 격리 상태를 자동 감사하는 커스텀 Validator 스크립트 설계 및 구동',
        'Node.js 및 sharp 라이브러리를 연동한 SVG -> WebP 일괄 압축/변환 자동화 스크립트 설계 및 구동',
        'Tailwind 4의 transform-gpu와 will-change-transform 속성을 활용한 애니메이션 GPU 가속 적용',
      ],
      challenges: [
        {
          problem:
            '대용량 데이터(JSON)와 복잡한 UI 로직이 단일 파일에 밀집되어, 상세 정보 오픈 시 수천 개의 DOM 노드가 동시에 계산되며 발생하는 메인 스레드 병목 현상',
          solution:
            '컴포넌트 파편화 전략을 통해 데이터를 *-data.ts로 격리하고, UI를 기능 단위로 쪼개어 React.memo와 지연 로딩을 적용함으로써 렌더링 부하를 약 50% 이상 분산 및 제거',
        },
        {
          problem:
            '피그마 디자인 도구에서 고해상도로 빌드된 개당 4MB~11MB 수준의 복잡한 SVG 스크린샷 자원들이 브라우저 렌더링 엔진에 치명적인 블로킹 효과를 발생시킴',
          solution:
            'sharp를 사용한 일괄 압축 유틸리티를 구축하여 10MB 이상의 파일들을 10~20KB의 초경량 WebP 포맷으로 일괄 변환(평균 98% 용량 절감)하여 해결',
        },
      ],
      goals: [
        '최신 프론트엔드 최적화 베스트 프랙티스를 적용하여 Lighthouse 성능 점수 극대화',
        '정적 배포 제약을 철저히 준수하면서도 리액트 최신 기능 및 동적인 UI 모션을 안정적으로 지원',
        '아키텍처 설계와 성능 튜닝을 아우르는 풀스택적 엔지니어링 역량 증명',
      ],
      retrospective: {
        improvements: [
          '리팩토링된 도메인 구조를 바탕으로 향후 추가되는 섹션에 대해서도 일관된 최적화 규칙 자동 적용 체계 유지',
          '자동화된 품질 관리 스크립트를 CI/CD 파이프라인에 통합하여 빌드 전 성능 저하 요인 원천 차단',
        ],
        lessonsLearned: [
          '단순한 기능 구현보다 중요한 것은 사용자가 체감하는 "부드러움"이며, 이를 위해 아키텍처 수준에서의 구조적 설계가 필수적임을 체감',
          '성능 문제는 감이 아닌 수치와 분석(Diagnosis)을 통해 접근해야 함을 깨닫고, 이를 해결하기 위한 자동화 도구 제작의 가치를 이해함',
          '비대해진 코드를 쪼개고 지연 로딩을 적용하는 과정에서 React의 렌더링 메커니즘과 번들 최적화에 대한 깊은 통찰 확보',
        ],
      },
    },
  },
]