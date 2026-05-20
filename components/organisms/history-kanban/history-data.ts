export interface HistoryCard {
  id: string
  type: 'Story' | 'Task'
  title: string
  subtitle: string
  content?: string
  details?: string[]
  tags?: string[]
  status: 'Done' | 'In Progress' | 'To Do'
  period: string
  logo?: string
}

export interface HistoryColumn {
  epic: string
  period: string
  cards: HistoryCard[]
}

export const historyData: HistoryColumn[] = [
  {
    epic: 'Core Engineering',
    period: '2019.03 ~ 2024.12',
    cards: [
      {
        id: 'DH-101',
        type: 'Story',
        title: '고려대학교 세종캠퍼스',
        subtitle: '전자및정보공학과 (2019.03 ~ 2025.02)',
        logo: '/assets/history/korea-univ-1-removebg.png',
        content: '전자공학 전공을 통해 하드웨어와 소프트웨어의 통합적 엔지니어링 기반 구축',
        details: [
          'HW 뿐만 아니라 AI, 컴퓨터 아키텍처 등 SW 수업 수강',
          '디지털 논리 회로 및 임베디드 시스템 설계 역량 확보',
          'C, Python의 다양한 프로그래밍 언어 및 알고리즘 학습'
        ],
        tags: ['CS기초', '전자정보공학', 'Academic'],
        status: 'Done',
        period: '2019.03 ~ 2025.02'
      },
      {
        id: 'DH-102',
        type: 'Task',
        title: '유나이티드 (United) 학회원',
        subtitle: '교내 메타버스 학회 (2023.03 ~ 2024.02)',
        content: '교내 메타버스 학회 활동을 통한 SW 능력 향상',
        details: [
          'C#, Unity, Unreal Engine, Blender 등 다양한 메타버스 관련 학습',
          '외부강사 초빙을 통한 SW 지식 향상',
          '학회 내 스터디 진행 및 지식 공유'
        ],
        tags: ['Metaverse', 'C#', 'Unity', 'Collaboration'],
        status: 'Done',
        period: '2023.03 ~ 2024.02'
      },
      {
        id: 'DH-103',
        type: 'Task',
        title: '고려대학교 AIVS 연구실 학부연구생',
        subtitle: '인공지능 비전시스템 연구실 (2024.01 ~ 2024.08)',
        logo: '/assets/history/korea-univ-1-removebg.png',
        tags: ['AI', 'ComputerVision', 'PyTorch'],
        content: '인공지능 및 컴퓨터 비전 시스템 연구 실무 경험',
        details: [
          '논문 리뷰 및 구현을 통한 인공지능 지식 학습',
          '최신 AI 논문 리뷰 및 연구실 정기 세미나 참여',
          '연구실 내부 프로젝트 관리 및 기술 지원',
          '연구실 구성원들과의 스터디를 통한 지식 공유'
        ],
        status: 'Done',
        period: '2024.01 ~ 2024.08'
      },
      {
        id: 'DH-104',
        type: 'Task',
        title: '4IR EDU 인턴',
        subtitle: '대학교 현장실습 (2024.09 ~ 2024.12)',
        content: '4차 산업혁명 교육 전문 기업에서의 실무 프로세스 경험',
        details: [
          '실무 환경에서의 개발을 통한 기초 능력 향상',
          '교육용 IT 콘텐츠 개발 보조 및 기술 지원',
          '비즈니스 커뮤니케이션 및 팀 협업 역량 강화',
          '각종 문서화 작업에 대한 경험 및 학습'
        ],
        status: 'Done',
        period: '2024.09 ~ 2024.12'
      },
    ],
  },
  {
    epic: 'Advanced Architecture',
    period: '2025.01 ~ 2025.12',
    cards: [
      {
        id: 'DH-201',
        type: 'Story',
        title: '삼성청년 SW-AI 아카데미 13기 \nJAVA트랙 수료',
        subtitle: '우수 수료 (2025.01 ~ 2025.12)',
        logo: '/assets/history/ssafy-blue.jpg',
        content: '백엔드 및 인프라 심화 역량을 갖춘 개발자로 성장 및 커뮤니케이션(협업) 능력 향상.',
        details: [
          'SSAFY 공통 프로젝트 및 특화 프로젝트 연속 우수상 수상',
          'Docker, AWS 기반의 CI/CD 파이프라인 구축 및 운영',
          'Java/SpringBoot 기반 고성능 서버 아키텍처 설계',
          'CA(부반장) 활동 및 지역 간담회, 내부 축제 무대 참여 등 적극적인 참여도',
        ],
        tags: ['Java', 'SpringBoot', 'MySQL', 'Docker', 'AWS'],
        status: 'Done',
        period: '2025.01 ~ 2025.12'
      },
    ],
  },
  {
    epic: 'Mentoring & Scale-out',
    period: '2026.01 ~ Present',
    cards: [
      {
        id: 'DH-301',
        type: 'Story',
        title: '삼성청년 SW-AI 아카데미 14기 \n실습코치',
        subtitle: 'SW Practice Coach (2026.01 ~ 현재)',
        logo: '/assets/history/ssafy-blue.jpg',
        content: '교육생 대상 프로젝트 아키텍처 설계 멘토링 및 코드 리뷰 진행.',
        details: [
          '교육생들의 기술적 문제 해결(Troubleshooting) 지원 및 가이드',
          '코드 퀄리티 향상을 위한 코드 리뷰 및 기술 멘토링 수행',
          '프로젝트 관리 노하우 및 협업 프로세스 전파',
          '실습 과제 설계 보조 및 기술적 가이드라인 제공',
          '기술 발표를 통한 지식 공유',
          '교육생들의 학업 성취를 위한 멘탈케어',
        ],
        tags: ['Mentoring', 'CodeReview', 'Leadership', 'Architecture'],
        status: 'In Progress',
        period: '2026.01 ~ Present'
      },
    ],
  },
]
