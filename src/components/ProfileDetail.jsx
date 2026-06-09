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
        intro: '自 2023 年进入东华大学服装与艺术设计学院以来，我系统学习了服装设计与工程专业课程，训练内容覆盖数学基础、服装材料与人体工效、结构工艺、数字化设计、科研方法、市场营销以及人工智能辅助设计等方向，并在跨学科课程学习中不断强化研究与设计并重的能力结构。',
        items: [
          {
            title: '东华大学 · 服装与艺术设计学院 · 服装设计与工程',
            period: '2023.09 - 至今',
            details: [
              {
                text: '专业排名：1/85，GPA：4.15/5.0',
                proof: { label: 'certificate', href: 'ranking-proof.pdf' },
              },
              {
                text: '主修课程：高等数学（92）、概率论（91）、数据库系统及应用（91）、服装人工智能导论（99）、服装材料学（90）、服装人体工效学（90）、服装CAD及虚拟仿真（93）、服装设计思维与方法、科学研究方法（96）、女装结构设计（92）、服装立裁、计算思维与人工智能（Python）（91）、服装市场营销与市场调研等。',
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
        intro: '本科阶段，我持续将设计学习与科研实践结合，重点围绕生成式模型在服装设计场景中的应用，以及 AI 辅助设计平台的原型构建与落地路径展开探索。',
        items: [
          {
            title: '“织创：基于 Stable Diffusion 的高清织物智能生成研究”',
            period: '2024.11 - 2025.11',
            details: [
              '项目角色：大学生创新创业项目负责人。',
              '负责工作：完成前期探索与调研、部分实验室数据采集、模型训练与测试，以及论文正文撰写。',
              '成果收获：CVM 会议接收（CCF-C, 学生一作）；大创省级立项；相关发明专利申请中。',
              '个人收获：参与显微镜高清织物结构采集与参数标签配对整理，尝试基于织物参数进行物理属性调整；对生成式模型研究现状形成较完整认知，熟悉打标、训练、测试的完整实验流程；提升了英文论文写作、数据处理分析与可视化表达能力。',
            ],
          },
          {
            title: '“工装智能设计平台”与 “FashionFlow” 服装智能设计平台搭建',
            period: '2025.10 - 至今',
            details: [
              '负责工作：进行平台原型设计、整合与界面优化，并基于 d2g 平台集成样片专业化改造、面料生成、纹样生成等功能。',
              '成果收获：完成作品集转化；相关论文撰写中。',
              '个人收获：熟悉 AI 辅助设计原型搭建方式，接触较完整的前后端开发流程，并熟悉 VS Code、JupyterLab、Figma 等平台与软件协同操作。',
            ],
          },
        ],
      },
      {
        key: 'awards',
        label: '获奖与实践经历',
        intro: '除课堂与科研训练外，我也持续通过竞赛、社会实践、暑期课程以及个人作品开发扩展自己的观察视角与项目执行能力。',
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
            title: '实践与项目经历',
            period: '2024 - 至今',
            details: [
              '2024.07 “艺术与我，锦绣丝路”东华大学暑期社会实践优秀项目：在校艺术团中担任钢琴和合唱老师，前往云南盐津进行为期一周的支教。',
              '2025.07 上海交通大学 ICCI 暑期课程《探索生成式人工智能及其在文化创意产业的应用》：完成暑期实践课程，制作 AIGC 影视作品《汴京一梦》，并获得中国好创意国赛三等奖。',
              '2026.01 - 至今 个人作品集及个人作品网站制作开发：围绕 AIGC 工具对服装设计与制造工作流的影响、AI 辅助睡眠健康设计、面向 BFRB 群体的交互矫正方法等主题持续展开内容策划与原型开发，基本契合研究生阶段拟深入研究的方向。',
            ],
          },
        ],
      },
      {
        key: 'self',
        label: '自我评价',
        intro: '我希望在研究生阶段继续主修交互设计与 AI 辅助设计，将设计研究与技术实践结合起来，进一步深入大健康、心理健康、时尚与纺织服装等议题。',
        items: [
          {
            title: '核心优势',
            details: [
              '学习能力较强，具备良好的自我驱动力，能够主动探索并持续学习新事物。',
              '心态乐观稳定，具备较强的团队协作与领导能力，能够在项目中承担推进与协调职责。',
              '擅长从多维视角观察生活中的设计与交互问题，能够在用户需求、设计表达与技术实现之间建立联系。',
              '乐于尝试新的研究方法与创作工具，对跨学科议题保持长期兴趣与投入。',
            ],
          },
          {
            title: '语言与学术能力',
            details: [
              '具有较强的英语阅读能力（雅思阅读 8.0）。',
              '具有良好的英语口语能力（雅思口语 6.5）。',
              '具有较为丰富的学术英语写作经验，能够支持英文论文阅读、整理与撰写。',
            ],
          },
          {
            title: '工具与软件能力',
            details: [
              '开发与实验：VS Code、Arduino 简易硬件、Unity、JupyterLab。',
              '设计与创作：Figma、PS/AI/PR、AIGC 生成应用、Blender。',
              '分析与可视化：GraphPad 绘图及相关数据整理表达。',
              '服装 CAD 软件：Vstitcher、至尊宝纺、CLO 3D 等相关软件。',
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
        intro: 'Since entering Donghua University in 2023, I have built a structured academic foundation in Fashion Design and Engineering through coursework spanning mathematics, garment materials and ergonomics, construction and draping, digital design, research methods, marketing, and AI-aided design.',
        items: [
          {
            title: 'Donghua University · College of Fashion and Art Design · Fashion Design and Engineering',
            period: '2023.09 - Present',
            details: [
              {
                text: 'Program Ranking: 1/85, GPA: 4.14/5.0',
                proof: { label: 'certificate', href: 'ranking-proof.pdf' },
              },
              {
                text: 'Key Courses: Advanced Mathematics (92), Probability Theory (91), Database Systems and Applications (91), Introduction to AI in Fashion (99), Clothing Materials (90), Clothing Ergonomics (90), Fashion CAD and Virtual Simulation (93), Design Thinking and Methods for Fashion, Research Methods (96), Women’s Pattern Making (92), Draping, Computational Thinking and AI with Python (91), Fashion Marketing and Market Research, etc.',
                proof: { label: 'transcript', href: 'transcript.pdf' },
              },
              {
                text: 'English Proficiency: CET-6 (573), IELTS 7.0.',
                proof: { label: 'certificate', href: 'english-proof.pdf' },
              },
            ],
          },
        ],
      },
      {
        key: 'research',
        label: 'Research',
        intro: 'During my undergraduate study, I have combined design training with research practice, focusing on generative-model applications in fashion design and the prototyping of AI-aided design platforms.',
        items: [
          {
            title: '"Zhichuang: High-Definition Intelligent Fabric Generation Based on Stable Diffusion"',
            period: '2024.11 - 2025.11',
            details: [
              'Role: project lead of an undergraduate innovation and entrepreneurship project.',
              'Responsibilities: early-stage exploration and review, partial lab data collection, model training and testing, and manuscript writing.',
              'Outcomes: accepted by CVM conference as student first author; approved as a provincial-level innovation project; related invention patent application in progress.',
              'Learning gains: participated in microscope-based collection of high-definition fabric structures and parameter-label pairing; explored physical attribute adjustment based on fabric parameters; developed a more comprehensive understanding of generative-model research, labeling, training, and testing workflows; strengthened academic writing, data analysis, and visualization skills.',
            ],
          },
          {
            title: '"Intelligent Workwear Design Platform" and "FashionFlow" Platform Development',
            period: '2025.10 - Present',
            details: [
              'Responsibilities: designed, integrated, and optimized the platform prototype; based on the d2g platform, participated in professional sample adaptation and the integration of fabric generation and pattern generation features.',
              'Outcomes: supported portfolio conversion and related paper writing now in progress.',
              'Learning gains: became familiar with AI-aided design prototyping, gained exposure to a relatively complete front-end and back-end development workflow, and improved collaborative use of VS Code, JupyterLab, and Figma.',
            ],
          },
        ],
      },
      {
        key: 'awards',
        label: 'Awards & Practice',
        intro: 'Beyond coursework and research, I continue to expand my perspective and execution ability through competitions, social practice, summer programs, and self-initiated project development.',
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
            title: 'Practice & Projects',
            period: '2024 - Present',
            details: [
              '2024.07 Outstanding Summer Social Practice Project at Donghua University, "Art and Me, Splendid Silk Road": served as a piano and choir instructor and joined a one-week teaching-support program in Yanjin, Yunnan.',
              '2025.07 Shanghai Jiao Tong University ICCI Summer Course, "Exploring Generative AI and Its Applications in the Cultural and Creative Industries": completed the practice-based course, produced the AIGC short film "A Dream of Bianjing", and received a national third prize in the China Creative Challenge.',
              '2026.01 - Present Personal portfolio and portfolio website development: continued to develop projects around the impact of AIGC tools on fashion design and manufacturing workflows, AI-aided sleep-health design, and interactive correction methods for BFRB groups, which closely align with my intended graduate research directions.',
            ],
          },
        ],
      },
      {
        key: 'self',
        label: 'Self-Evaluation',
        intro: 'For graduate study, I hope to continue focusing on interaction design and AI-aided design, connecting design research with technical practice while exploring healthcare, mental wellness, fashion, and textile-related topics.',
        items: [
          {
            title: 'Core Strengths',
            details: [
              'Strong learning ability and solid self-motivation, with a willingness to actively explore and learn new things.',
              'Optimistic and emotionally stable mindset, with strong teamwork and leadership capability.',
              'Able to observe design and interaction problems in everyday life from multiple perspectives and connect user insight, design expression, and technical implementation.',
              'Open to new research methods and creative tools, with sustained interest in interdisciplinary work.',
            ],
          },
          {
            title: 'Language & Academic Skills',
            details: [
              'Strong English reading ability (IELTS Reading 8.0).',
              'Good spoken English ability (IELTS Speaking 6.5).',
              'Relatively rich experience in academic English writing, supporting literature reading, synthesis, and paper development.',
            ],
          },
          {
            title: 'Tools & Software',
            details: [
              'Development & Experimentation: VS Code, Arduino-based hardware prototyping, Unity, and JupyterLab.',
              'Design & Creation: Figma, PS/AI/PR, AIGC generation tools, and Blender.',
              'Analysis & Visualization: GraphPad and related data organization and visual expression workflows.',
              'Fashion CAD: Vstitcher, Zhizunbaofang, CLO 3D, and related software.',
            ],
          },
          {
            title: 'Interests & Research Plan',
            details: [
              'Broad interests including piano (Amateur Level 10 with distinction), calligraphy (Gold Award, comprehensive category, Hangzhou Art Festival 2022), and film.',
              'At graduate level, I plan to continue studying interaction design and AI-aided design, with strong interest in healthcare, mental wellness, fashion, and textile-apparel fields.',
              'I hope to combine emerging technologies with user-centered perspectives to produce thoughtful and meaningful design work.',
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
  const modeKey = isEnglishMode ? 'en' : 'zh'
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
          <div key={modeKey} className="profile-intro-content profile-switch-fade">
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

          <div key={`${modeKey}-${activeTab}`} className="profile-tab-panel profile-switch-fade">
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
