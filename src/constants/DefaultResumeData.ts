export const DefaultResumeData: LocalStorageDataMap = {
  personalDetails: [
    {
      name: "John Doe",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      address: "123 Main Street, City, Country",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe",
    },
  ],
  objective: [
    {
      objective:
        "A highly motivated and skilled Frontend Developer looking for a challenging role where I can apply my skills in web development and contribute to a dynamic team.",
    },
  ],
  experience: [
    {
      id: "1",
      companyName: "Tech Solutions",
      jobTitle: "Frontend Developer",
      description:
        "Developed responsive web applications using React and Redux.",
      startDate: "Jan 2022",
      endDate: "Present",
    },
    {
      id: "2",
      companyName: "Creative Agency",
      jobTitle: "Junior Developer",
      description:
        "Worked on multiple client projects, building interactive websites.",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
    },
  ],
  education: [
    {
      id: "1",
      institution: "XYZ University",
      course: "BSc in Computer Science",
      score: "GPA: 3.8/4.0",
      year: "2018 - 2022",
    },
  ],
  skills: [
    { id: "1", skill: "HTML" },
    { id: "2", skill: "CSS" },
    { id: "3", skill: "JavaScript" },
    { id: "4", skill: "React" },
    { id: "5", skill: "Redux" },
  ],
  projects: [
    {
      id: "1",
      projectTitle: "Portfolio Website",
      description:
        "Designed and developed a personal portfolio using React and Tailwind CSS.",
    },
    {
      id: "2",
      projectTitle: "E-commerce App",
      description:
        "Built an e-commerce platform with payment gateway integration.",
    },
  ],
  languages: [
    { id: "1", languageTitle: "English" },
    { id: "2", languageTitle: "Spanish" },
  ],
  references: [
    {
      id: "1",
      referenceName: "Jane Smith",
      companyName: "Tech Solutions",
      jobTitle: "Senior Developer",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
    },
  ],
};
