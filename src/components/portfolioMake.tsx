import React from "react";
import styled from "styled-components";

// 데이터 타입 정의

interface Project {
  title: string;
  description: string;
  link: string;
}

interface PortfolioData {
  aboutMe: string;
  skills: string[];
  projects: Project[];
  contact: string;
}

// 포트폴리오 데이터 예시
const portfolioData: PortfolioData = {
  aboutMe:
    "Hello! I'm John Doe, a passionate web developer with experience in building modern, responsive, and scalable applications. I specialize in front-end technologies and love learning new skills.",
  skills: [
    "TypeScript",
    "React",
    "Styled-Components",
    "Node.js",
    "Express",
    "MongoDB",
  ],
  projects: [
    {
      title: "Portfolio Website",
      description:
        "A personal portfolio website built with React, TypeScript, and styled-components to showcase my projects and skills.",
      link: "#",
    },
    {
      title: "E-Commerce App",
      description:
        "An e-commerce application built with React, Redux, and Node.js to provide a seamless shopping experience.",
      link: "#",
    },
  ],
  contact:
    "If you'd like to get in touch, feel free to reach out to me via email: john.doe@example.com",
};

const PortfolioMake: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title>My Portfolio</Title>
        <Subtitle>Welcome to my personal portfolio website</Subtitle>
      </Header>

      <Section id="about">
        <SectionTitle>About Me</SectionTitle>
        <Paragraph>{portfolioData.aboutMe}</Paragraph>
      </Section>

      <Section id="skills">
        <SectionTitle>Skills</SectionTitle>
        <SkillsList>
          {portfolioData.skills.map((skill, index) => (
            <Skill key={index}>{skill}</Skill>
          ))}
        </SkillsList>
      </Section>

      <Section id="projects">
        <SectionTitle>Projects</SectionTitle>
        {portfolioData.projects.map((project, index) => (
          <Project key={index}>
            <ProjectTitle>{project.title}</ProjectTitle>
            <ProjectDescription>{project.description}</ProjectDescription>
            <ProjectLink href={project.link} target="_blank">
              View Project
            </ProjectLink>
          </Project>
        ))}
      </Section>

      <Section id="contact">
        <SectionTitle>Contact</SectionTitle>
        <Paragraph>{portfolioData.contact}</Paragraph>
      </Section>

      <Footer>
        <FooterText>© 2024 John Doe. All rights reserved.</FooterText>
      </Footer>
    </Container>
  );
};

// Styled-components

const Container = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f9;
  color: #333;
`;

const Header = styled.header`
  background-color: #007bff;
  color: white;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-top: 10px;
`;

const Section = styled.section`
  padding: 40px 20px;
  margin: 20px 0;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #007bff;
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #555;
`;

const SkillsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const Skill = styled.li`
  background-color: #e9ecef;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.1rem;
`;

const Project = styled.div`
  margin-bottom: 20px;
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: #555;
`;

const ProjectLink = styled.a`
  font-size: 1.1rem;
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.footer`
  background-color: #343a40;
  color: white;
  text-align: center;
  padding: 20px;
`;

const FooterText = styled.p`
  margin: 0;
`;

export default PortfolioMake;
