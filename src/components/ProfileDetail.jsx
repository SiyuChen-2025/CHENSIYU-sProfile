import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const PROFILE_CONTENT = {
  zh: {
    pageTitle: '个人介绍',
    backHome: '返回首页',
    modeButton: 'English Mode',
    name: '陈思羽 / CHEN SIYU',
    introPrimary: 'Hello，谢谢您的来访。这里是我的个人介绍页面，记录了2023-2026年期间的学习、科研、实践等经历。',
    introSecondary: '你也可以点击下方按钮下载我的简历 PDF 版本。',
    resumeButton: '下载简历',
    proofLabels: {
      certificate: '点击查看凭证',
      transcript: '点击查看成绩单',
    },
    sections: [
      {
        key: 'education',
        label: '教育经历',
        intro: '在本科期间，我认真学习了服装设计与工程专业的相关课程，课程体系覆盖工科大类数理化课程，政治思想类课程，结构工艺类基础课程，营销类课程以及新兴技术融合创新设计的交叉类课程。除了认真完成本专业的课程外，我还积极选修了数据库系统及应用，虚拟显示技术等其他专业的课程并取得了不错的成绩',
        items: [
          {
            title: '东华大学 · 服装与艺术设计学院 · 服装设计与工程',
            period: '2023.09 - 至今',
            details: [
              {
                text: '专业排名：1/85                                    GPA：4.14/5.0',
                proof: { label: 'certificate', href: 'ranking-proof.pdf' },
              },
              {
                text: '主修课程：服装人工智能导论（99）、虚拟显示技术（96）、服装CAD及虚拟仿真（93）、科学研究方法（96）、计算思维与人工智能 Python（91）、数据库系统及应用（91）、女装结构设计（92）、成衣工艺学（93）等',
                proof: { label: 'transcript', href: 'transcript.pdf' },
              },
              {
                text: '英语：CET-6 573，雅思 7.0',
                proof: { label: 'certificate', href: 'english-proof.pdf' },
              },
            ],
          },
        ],
      },
      {
        key: 'research',
        label: '科研经历',
        intro: '本科期间，作为负责人我主要参与了两个科研项目，分别是基于扩散模型的面料贴图生成项目以及工装智能设计平台搭建项目。（成果的具体内容可在工作&经历板块详细查看）',
        items: [
          {
            title: '“织创：基于Stable Diffusion的3D织物智能生成研究”',
            period: '2024.11 - 2025.11',
            details: [
              '大学生创新创业项目负责人，负责前期探索、实验室数据采集、模型训练与测试、论文正文撰写',
              '阶段成果：CVM会议学生一作；大创省级立项；相关发明专利申请中',
              '能力沉淀：熟悉扩散模型研究现状与训练实验流程，提升英文论文写作与数据分析可视化能力',
            ],
          },
          {
            title: '企业项目“工装智能设计平台”',
            period: '2025.10 - 至今',
            details: [
              '负责设计软件界面优化，并集成面料生成功能',
              '阶段成果：搭建“工装智能设计平台”；“LLM驱动的智能工装设计方法”作品集内容转化；相关论文撰写中',
              '能力沉淀：掌握前后端协作流程，实践Vibe Coding与VS Code / JupyterLab / Figma协同开发',
            ],
          },
        ],
      },
      {
        key: 'awards',
        label: '获奖与实践经历',
        intro: '在校期间，我积极参与学科竞赛、社会实践活动、暑期课程与实习，期待在各个领域的探索中获得多方面的成长。',
        items: [
          {
            title: '主要奖项与荣誉',
            period: '2023 - 2025',
            details: [
              '国家奖学金、东华大学优秀学生、东华大学学业奖学金',
              '东华大学高等数学竞赛三等奖',
              '第一届“当AI遇见非遗”主题活动三等奖',
              '第十九届中国好创意AIGC专项大赛全国三等奖',
            ],
          },
          {
            title: '实践与实习',
            period: '2024 - 2025',
            details: [
              '“艺术与我，锦绣丝路”东华大学暑期社会实践优秀项目：作为钢琴和合唱老师参与支教与文化传播活动',
              '上海交通大学ICCI暑期课程：探索生成式人工智能在文创产业的应用',
              '上海室内设计工作室实习：参与“逸装AI”小程序模型测试与训练优化',
            ],
          },
        ],
      },
      {
        key: 'self',
        label: '自我评价',
        intro: '我十分希望能够在研究生阶段进一步深耕“交互设计 + AI辅助设计”学科，并重点关注大健康、心理健康与时尚服装领域。',
        items: [
          {
            title: '核心优势',
            details: [
              '自学能力强，心态成熟坚韧，具有长期稳定的自驱力与持续进步意识',
              '设计视角兼具人文关怀与实用价值，对相关工作有较高的价值需求',
              '工作风格兼具设计与技术视角，能够在创意表达与工程落地之间建立有效连接',
              '团队协作意识强，具备组织协调与跨角色沟通能力',
            ],
          },
          {
            title: '工具与技能',
            details: [
              '设计与创作：Figma、PS/AI/PR、Blender、AIGC工具链',
              '互联网开发与实验：VS Code、Vibe Coding、Python、Arduino、Unity',
              '服装CAD软件：Vstitcher、至尊宝纺、CLO 3D 等相关软件',
            ],
          },
        ],
      },
    ],
  },
  en: {
    pageTitle: 'Profile',
    backHome: 'Back to Home',
    modeButton: '中文模式',
    name: 'SIYU CHEN / 陈思羽',
    introPrimary: 'Hello and welcome. This profile page presents my academic, research, and practical experience from 2023 to 2026.',
    introSecondary: 'You can also download my resume in PDF format using the button below.',
    resumeButton: 'Download Resume PDF',
    proofLabels: {
      certificate: 'View Certificate',
      transcript: 'View Transcript',
    },
    sections: [
      {
        key: 'education',
        label: 'Education',
        intro: 'During my undergraduate study, I built a solid foundation in Fashion Design and Engineering through coursework spanning engineering fundamentals, design methods, garment construction, marketing, and interdisciplinary technology-driven innovation.',
        items: [
          {
            title: 'Donghua University · College of Fashion and Art Design · Fashion Design and Engineering',
            period: '2023.09 - Present',
            details: [
              {
                text: 'Program Ranking: 1/85                                    GPA: 4.14/5.0',
                proof: { label: 'certificate', href: 'ranking-proof.pdf' },
              },
              {
                text: 'Key Courses: Introduction to AI in Fashion (99), Virtual Display Technology (96), Fashion CAD and Virtual Simulation (93), Research Methods (96), Computational Thinking and AI with Python (91), Database Systems and Applications (91), Women’s Pattern Making (92), Garment Technology (93), etc.',
                proof: { label: 'transcript', href: 'transcript.pdf' },
              },
              {
                text: 'English Proficiency: CET-6 573, IELTS 7.0',
                proof: { label: 'certificate', href: 'english-proof.pdf' },
              },
            ],
          },
        ],
      },
      {
        key: 'research',
        label: 'Research',
        intro: 'As a project lead, I have participated in two major research projects: diffusion-model-based fabric texture generation and intelligent tooling platform development for workwear design.',
        items: [
          {
            title: '"Zhichuang: 3D Fabric Intelligent Generation Based on Stable Diffusion"',
            period: '2024.11 - 2025.11',
            details: [
              'Project lead of an undergraduate innovation and entrepreneurship project; responsible for early exploration, lab data collection, model training/testing, and paper writing.',
              'Outcomes: student first author at CVM conference; provincial-level project approval; patent application in progress.',
              'Growth: gained full-process understanding of diffusion-model experiments and improved academic writing, analysis, and visualization skills.',
            ],
          },
          {
            title: 'Industry Project: "Intelligent Workwear Design Platform"',
            period: '2025.10 - Present',
            details: [
              'Responsible for interface optimization and integrating fabric generation capabilities.',
              'Outcomes: platform prototype delivered; "LLM-driven intelligent workwear design method" portfolio conversion; paper in progress.',
              'Growth: strengthened full-stack collaboration workflow and practical experience with Vibe Coding, VS Code, JupyterLab, and Figma.',
            ],
          },
        ],
      },
      {
        key: 'awards',
        label: 'Awards & Practice',
        intro: 'I actively engage in competitions, social practice, summer programs, and internships to build both creative thinking and execution capability.',
        items: [
          {
            title: 'Major Awards & Honors',
            period: '2023 - 2025',
            details: [
              'National Scholarship, Outstanding Student of Donghua University, Academic Scholarship of Donghua University',
              'Third Prize, Donghua University Advanced Mathematics Competition',
              'Third Prize, "When AI Meets Intangible Heritage" Themed Event',
              'National Third Prize, 19th China Creative Challenge AIGC Track',
            ],
          },
          {
            title: 'Practice & Internship',
            period: '2024 - 2025',
            details: [
              'Outstanding Summer Social Practice Project at Donghua University: participated in teaching support and cultural communication as piano and choir instructor.',
              'Shanghai Jiao Tong University ICCI Summer Program: explored generative AI applications in the creative industry.',
              'Interior Design Studio Internship: participated in model testing and optimization for the "Yizhuang AI" mini-program.',
            ],
          },
        ],
      },
      {
        key: 'self',
        label: 'Self-Evaluation',
        intro: 'At graduate level, I hope to continue deepening in "Interaction Design + AI-aided Design", with particular focus on healthcare, mental wellness, and fashion domains.',
        items: [
          {
            title: 'Core Strengths',
            details: [
              'Strong self-learning ability, resilient mindset, and stable long-term internal drive.',
              'A design perspective balancing human-centered care with practical impact.',
              'A hybrid design-technology workflow that bridges concept creation and engineering implementation.',
              'Strong teamwork awareness with effective coordination and cross-functional communication skills.',
            ],
          },
          {
            title: 'Tools & Skills',
            details: [
              'Design & Creation: Figma, PS/AI/PR, Blender, AIGC toolchain',
              'Development & Experimentation: VS Code, Vibe Coding, Python, Arduino, Unity',
              'Fashion CAD: Vstitcher, Zhizunbaofang, CLO 3D, and related software',
            ],
          },
        ],
      },
    ],
  },
}

const SIDE_IMAGES = [
  { src: 'INFP.png', alt: 'INFP', className: 'profile-side-image profile-side-image-left' },
  { src: 'INTJ.png', alt: 'INTJ', className: 'profile-side-image profile-side-image-right' },
]

function ProfileDetail() {
  const [activeTab, setActiveTab] = useState(PROFILE_CONTENT.zh.sections[0].key)
  const [isEnglishMode, setIsEnglishMode] = useState(false)
  const currentContent = isEnglishMode ? PROFILE_CONTENT.en : PROFILE_CONTENT.zh
  const { sections, proofLabels } = currentContent
  const baseHref = import.meta.env.BASE_URL
  const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`

  const activeSection = useMemo(
    () => sections.find((section) => section.key === activeTab) ?? sections[0],
    [activeTab, sections]
  )

  const getProofLabel = (labelKey) => proofLabels[labelKey] ?? labelKey

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header-inner">
          <Link to="/" className="profile-back-button">{currentContent.backHome}</Link>
          <div className="profile-header-actions">
            <button
              type="button"
              className="profile-mode-button"
              onClick={() => setIsEnglishMode((value) => !value)}
            >
              {currentContent.modeButton}
            </button>
            <h1>{currentContent.pageTitle}</h1>
          </div>
        </div>
      </header>

      {SIDE_IMAGES.map((item) => (
        <img
          key={item.src}
          src={`${baseHref}${item.src}`}
          alt={item.alt}
          className={item.className}
        />
      ))}

      <main className="profile-main">
        <section className="profile-intro-card">
          <img
            src={`${import.meta.env.BASE_URL}avatar.png`}
            alt="陈思羽"
            className="profile-avatar"
          />
          <div className="profile-intro-content">
            <h2>{currentContent.name}</h2>
            <p className="profile-intro-text">
              <span>{currentContent.introPrimary}</span>
              <br />
              <span className="profile-intro-text-en">{currentContent.introSecondary}</span>
            </p>
            <a href={resumeHref} download="Chen-resume.pdf" className="profile-resume-link">
              {currentContent.resumeButton}
            </a>
          </div>
        </section>

        <section className="profile-tabs-card">
          <div className="profile-tabs">
            {sections.map((section) => (
              <button
                key={section.key}
                type="button"
                className={`profile-tab-button${activeTab === section.key ? ' is-active' : ''}`}
                onClick={() => setActiveTab(section.key)}
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="profile-tab-panel">
            <h3>{activeSection.label}</h3>
            <p className="profile-section-intro">{activeSection.intro}</p>
            <div className="profile-entry-list">
              {activeSection.items.map((item) => (
                <article key={item.title} className="profile-entry">
                  <div className="profile-entry-head">
                    <h4>{item.title}</h4>
                    {item.period ? <span>{item.period}</span> : null}
                  </div>
                  <ul>
                    {item.details.map((detail) => (
                      <li key={typeof detail === 'string' ? detail : detail.text}>
                        <span>{typeof detail === 'string' ? detail : detail.text}</span>
                        {typeof detail === 'string' || !detail.proof ? null : (
                          <a
                            href={`${baseHref}${detail.proof.href}`}
                            target="_blank"
                            rel="noreferrer"
                            className="profile-proof-link"
                          >
                            {getProofLabel(detail.proof.label)}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default ProfileDetail
