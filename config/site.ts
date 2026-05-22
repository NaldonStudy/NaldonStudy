export const siteConfig = {
  name: "김도훈",
  englishName: "Dohun Kim",
  email: "luckyboyhoon@naver.com",
  links: {
    github: "https://github.com/NaldonStudy",
    linkedin: "https://linkedin.com/in/도훈-김-6b56993a2",
    velog: "https://velog.io/@naldon_study",
  },
  profile: {
    main: "/assets/profile/dohun-image.jpg",
    slider: [
      "/assets/profile/DoHun1.jpg",
      "/assets/profile/DoHun2.jpg",
      "/assets/profile/DoHun3.jpg",
      "/assets/profile/DoHun4.jpg",
    ],
  },
  roles: ["Backend", "Infra"],
};

export type SiteConfig = typeof siteConfig;
