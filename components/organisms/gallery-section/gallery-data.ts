export interface GalleryItem {
  id: string
  type: 'image' | 'youtube'
  title: string
  description?: string
  src: string
  thumbnail?: string
}

export const galleryData: GalleryItem[] = [
  {
    id: 'yt-lunch-attack',
    type: 'youtube',
    title: 'SSAFY Lunch Attack 현장 기록',
    description: 'SSAFY 11기 서울 캠퍼스에서 진행된 생생한 런치 어택 이벤트 현장',
    src: 'https://www.youtube.com/embed/Mbz1TnP2Rj4',
    thumbnail: 'https://img.youtube.com/vi/Mbz1TnP2Rj4/maxresdefault.jpg'
  },
  {
    id: 'yt-campus-tour',
    type: 'youtube',
    title: 'SSAFY 캠퍼스 투어: 대전편',
    description: 'SSAFY 11기 대전 캠퍼스 탐방과 맛있는 먹부림 기록',
    src: 'https://www.youtube.com/embed/SmNfX6bY8pk',
    thumbnail: 'https://img.youtube.com/vi/SmNfX6bY8pk/maxresdefault.jpg'
  },
  {
    id: 'ssafy-daily-1',
    type: 'image',
    title: '데일리 콘텐츠: 기술 발표 #1',
    description: 'SSAFY 교육생들을 대상으로 동기/비동기, 블로킹/논블로킹 개념에 대해 발표',
    src: '/assets/gallery/SSAFY 데일리컨텐츠 1번.svg'
  },
  {
    id: 'ssafy-daily-2',
    type: 'image',
    title: '데일리 콘텐츠: 기술 발표 #2',
    description: '복잡한 CS 지식을 동료들에게 쉽게 전달하기 위한 데일리 콘텐츠 세션',
    src: '/assets/gallery/SSAFY 데일리컨텐츠 2번.svg'
  },
  {
    id: 'ssafy-meetup-1',
    type: 'image',
    title: 'SSAFY 밋업 인터뷰 #1',
    description: 'SSAFY 교육생들 간의 교류 현장에서 진행된 대표 인터뷰 활동',
    src: '/assets/gallery/SSAFY 밋업 1번.png'
  },
  {
    id: 'ssafy-meetup-2',
    type: 'image',
    title: 'SSAFY 밋업 인터뷰 #2',
    description: '동료들의 이야기를 듣고 기록하며 네트워크를 넓힌 밋업 세션',
    src: '/assets/gallery/SSAFY 밋업 2번.png'
  },
  {
    id: 'shorts-benefits',
    type: 'youtube',
    title: 'SSAFY 비밀 혜택 소개 (Shorts)',
    description: '삼성 SSAFY 교육생들만이 누리는 특별한 혜택 공유',
    src: 'https://www.youtube.com/embed/mICS4itPI8U',
    thumbnail: 'https://img.youtube.com/vi/mICS4itPI8U/maxresdefault.jpg'
  },
  {
    id: 'shorts-deer',
    type: 'youtube',
    title: 'SSAFY 대전 캠퍼스 고라니 소동 (Shorts)',
    description: '대전 캠퍼스의 전설적인 고라니 출몰 사건 현장',
    src: 'https://www.youtube.com/embed/gpW1Gxc7jeI',
    thumbnail: 'https://img.youtube.com/vi/gpW1Gxc7jeI/maxresdefault.jpg'
  },
  {
    id: 'shorts-daejeon',
    type: 'youtube',
    title: '대전 캠퍼스의 반전 매력 (Shorts)',
    description: '노잼도시 대전에서의 유잼 라이프, SSAFY 라이프',
    src: 'https://www.youtube.com/embed/ChO0Hc_Oq50',
    thumbnail: 'https://img.youtube.com/vi/ChO0Hc_Oq50/maxresdefault.jpg'
  },
  {
    id: 'lab-1',
    type: 'image',
    title: '연구실 동료들과의 추억 #1',
    description: '학부 연구실에서 함께 고생하며 즐겁게 지낸 동료들과 한 컷',
    src: '/assets/gallery/연구실 1번.png'
  },
  {
    id: 'lab-2',
    type: 'image',
    title: '연구실 동료들과의 추억 #2',
    description: '연구와 프로젝트 사이사이 소중한 일상을 담은 연구실 단체 사진',
    src: '/assets/gallery/연구실 2번.png'
  },
  {
    id: 'ssafy-broadcast',
    type: 'image',
    title: 'SSAFY 13기 자치회 활동',
    description: 'SSAFY 13기 자치회 방송 위원으로서 활약했던 기록',
    src: '/assets/gallery/SSAFY 자치회방송.png'
  },
  {
    id: 'ssafy-ddd',
    type: 'image',
    title: 'SSAFY 코치 세션 수강',
    description: 'TDD와 DDD에 대한 깊이 있는 이해를 위한 코치 세션 참여',
    src: '/assets/gallery/SSAFY 코치세션-TDD DDD가 뭔가요.png'
  }
]
