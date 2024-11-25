import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

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

const Portfolio: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<PortfolioData>({
    aboutMe: "",
    skills: [],
    projects: [],
    contact: "",
  });
  const [newSkill, setNewSkill] = useState<string>(""); // 새로운 기술을 위한 상태 추가

  // 페이지 로드 시 로컬 저장소에서 데이터 불러오기
  useEffect(() => {
    const savedData = localStorage.getItem("portfolioData");
    if (savedData) {
      setPortfolioData(JSON.parse(savedData));
    } else {
      const initialData: PortfolioData = {
        aboutMe: "자신의 대한 소개를 적어주세요",
        skills: [
          "기술이나 자격증 적어주세요",
          "기술이나 자격증 적어주세요",
          "기술이나 자격증 적어주세요",
          "기술이나 자격증 적어주세요",
          "기술이나 자격증 적어주세요",
        ],
        projects: [
          {
            title: "프로젝트 경험",
            description: "",
            link: "#",
          },
          {
            title: "프로젝트 경험",
            description: "",
            link: "#",
          },
        ],
        contact: "Feel free to reach out to me via email: john.doe@example.com",
      };
      setPortfolioData(initialData);
      localStorage.setItem("portfolioData", JSON.stringify(initialData)); // 초기 데이터 로컬 저장소에 저장
    }
  }, []);

  // 데이터 수정 처리
  const handleEdit = (field: keyof PortfolioData, value: string) => {
    setPortfolioData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
      localStorage.setItem("portfolioData", JSON.stringify(updatedData)); // 수정된 데이터를 로컬 저장소에 저장
      return updatedData;
    });
  };

  const handleSkillsEdit = (index: number, value: string) => {
    const updatedSkills = [...portfolioData.skills];
    updatedSkills[index] = value;
    setPortfolioData((prevData) => {
      const updatedData = { ...prevData, skills: updatedSkills };
      localStorage.setItem("portfolioData", JSON.stringify(updatedData)); // 수정된 데이터를 로컬 저장소에 저장
      return updatedData;
    });
  };

  const handleProjectEdit = (
    index: number,
    field: keyof Project,
    value: string
  ) => {
    const updatedProjects = [...portfolioData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setPortfolioData((prevData) => {
      const updatedData = { ...prevData, projects: updatedProjects };
      localStorage.setItem("portfolioData", JSON.stringify(updatedData)); // 수정된 데이터를 로컬 저장소에 저장
      return updatedData;
    });
  };

  // 기술 추가 함수
  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setPortfolioData((prevData) => {
        const updatedSkills = [...prevData.skills, newSkill];
        const updatedData = { ...prevData, skills: updatedSkills };
        localStorage.setItem("portfolioData", JSON.stringify(updatedData)); // 수정된 데이터를 로컬 저장소에 저장
        return updatedData;
      });
      setNewSkill(""); // 입력 후 입력란 초기화
    }
  };

  // PDF 다운로드 함수
  const downloadPDF = () => {
    const input = document.getElementById("portfolio-content");
    if (input) {
      html2canvas(input, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const doc = new jsPDF("p", "mm", "a4"); // A4 사이즈
        doc.addImage(imgData, "PNG", 10, 10, 190, 277); // A4 크기에 맞춰 이미지 추가
        doc.save("portfolio.pdf");
      });
    }
  };

  return (
    <PageContainer>
      <Header>
        <Title>My Portfolio</Title>
      </Header>

      <PortfolioContent id="portfolio-content">
        <Section>
          <SectionTitle>About Me</SectionTitle>
          <EditableTextArea
            value={portfolioData.aboutMe}
            onChange={(e) => handleEdit("aboutMe", e.target.value)}
          />
        </Section>

        <Section>
          <SectionTitle>Skills</SectionTitle>
          <EditableList>
            {portfolioData.skills.map((skill, index) => (
              <EditableItem
                key={index}
                value={skill}
                onChange={(e) => handleSkillsEdit(index, e.target.value)}
              />
            ))}
          </EditableList>
          <SkillInputContainer>
            <EditableInput
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a new skill"
            />
            <AddSkillButton onClick={handleAddSkill}>Add Skill</AddSkillButton>
          </SkillInputContainer>
        </Section>

        <Section>
          <SectionTitle>Projects</SectionTitle>
          {portfolioData.projects.map((project, index) => (
            <ProjectContainer key={index}>
              <EditableInput
                value={project.title}
                onChange={(e) =>
                  handleProjectEdit(index, "title", e.target.value)
                }
              />
              <EditableTextArea
                value={project.description}
                onChange={(e) =>
                  handleProjectEdit(index, "description", e.target.value)
                }
              />
              <EditableInput
                value={project.link}
                onChange={(e) =>
                  handleProjectEdit(index, "link", e.target.value)
                }
              />
            </ProjectContainer>
          ))}
        </Section>

        <Section>
          <SectionTitle>Contact</SectionTitle>
          <EditableTextArea
            value={portfolioData.contact}
            onChange={(e) => handleEdit("contact", e.target.value)}
          />
        </Section>

        <Footer>
          <FooterText>© 2024 John Doe. All rights reserved.</FooterText>
        </Footer>
      </PortfolioContent>

      <DownloadButton onClick={downloadPDF}>Download as PDF</DownloadButton>
    </PageContainer>
  );
};

// 스타일링
const PageContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  background-color: #f4f4f9;
  color: #333;
  page-break-before: always;
  @media print {
    width: 100%;
  }
`;

const Header = styled.header`
  background-color: #41c777;
  color: white;
  text-align: center;
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
`;

const PortfolioContent = styled.div`
  page-break-before: always;
`;

const Section = styled.section`
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #41c777;
  margin-bottom: 15px;
`;

const EditableTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  min-height: 100px;
  resize: vertical;
`;

const EditableInput = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const EditableList = styled.div`
  margin-top: 10px;
`;

const EditableItem = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1.1rem;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

const SkillInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const AddSkillButton = styled.button`
  padding: 10px;
  background-color: #41c777;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  font-size: 1rem;
  &:hover {
    background-color: #36b267;
  }
`;

const ProjectContainer = styled.div`
  margin-bottom: 20px;
`;

const Footer = styled.footer`
  text-align: center;
  margin-top: 40px;
  padding: 10px;
`;

const FooterText = styled.p`
  font-size: 1rem;
  color: #777;
`;

const DownloadButton = styled.button`
  padding: 10px;
  background-color: #41c777;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  margin-top: 20px;
  display: block;
  width: 100%;
  &:hover {
    background-color: #36b267;
  }
`;

export default Portfolio;
