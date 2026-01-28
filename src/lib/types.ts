export type ResumeData = {
  about: {
    name: string;
    email: string;
    linkedin: string;
    github: string;
  };
  experience: {
    company: string;
    title: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  education: {
    institute: string;
    degree: string;
    startDate: Date;
    endDate: Date;
  }[];
  skills: {
    title: string;
    content: string;
  }[];
};
