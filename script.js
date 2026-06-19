const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navLinks");
const consultationForm = document.getElementById("consultationForm");
const netlifyForms = document.querySelectorAll("form[data-netlify='true']");
const formMessage = document.getElementById("formMessage");
const formPageUrl = document.getElementById("formPageUrl");
const formLanguage = document.getElementById("formLanguage");
const revealElements = document.querySelectorAll(".reveal");
const caseFilterButtons = document.querySelectorAll(".case-filter-button");
const caseCards = document.querySelectorAll(".case-card");
const mentorFilterButtons = document.querySelectorAll(".mentor-filter-button");
const mentorCards = document.querySelectorAll(".mentor-card");
const assessmentButton = document.getElementById("assessmentButton");
const assessmentBackground = document.getElementById("assessmentBackground");
const assessmentDestination = document.getElementById("assessmentDestination");
const assessmentLevel = document.getElementById("assessmentLevel");
const assessmentResult = document.getElementById("assessmentResult");
const heroPathwayCanvas = document.getElementById("heroPathwayAnimation");
const heroBrandMedia = document.querySelector(".hero-brand-media");
const heroBrandVideo = document.querySelector(".hero-brand-video");
const languageButtons = document.querySelectorAll("[data-lang-switch]");
const urlLanguage = new URLSearchParams(window.location.search).get("lang");
let currentLanguage = urlLanguage || localStorage.getItem("rainEducationLanguage") || "zh-CN";

(() => {
  if (!heroBrandVideo || !heroBrandMedia) {
    return;
  }

  const mobileQuery = window.matchMedia("(max-width: 680px)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const desktopPoster = heroBrandVideo.dataset.desktopPoster;
  const mobilePoster = heroBrandVideo.dataset.mobilePoster;

  const updatePoster = () => {
    const nextPoster = mobileQuery.matches ? mobilePoster : desktopPoster;

    if (nextPoster) {
      heroBrandVideo.setAttribute("poster", nextPoster);
    }
  };

  const usePosterFallback = () => {
    heroBrandMedia.classList.add("is-video-fallback");
  };

  const enableVideo = () => {
    heroBrandMedia.classList.remove("is-video-fallback");
  };

  updatePoster();

  if (reducedMotionQuery.matches) {
    heroBrandVideo.removeAttribute("autoplay");
    heroBrandVideo.pause();
    usePosterFallback();
  } else {
    heroBrandVideo.play().catch(usePosterFallback);
  }

  heroBrandVideo.addEventListener("loadeddata", enableVideo);
  heroBrandVideo.addEventListener("playing", enableVideo);
  heroBrandVideo.addEventListener("canplay", enableVideo, { once: true });
  heroBrandVideo.addEventListener("error", usePosterFallback);

  mobileQuery.addEventListener("change", () => {
    updatePoster();
    heroBrandVideo.load();

    if (!reducedMotionQuery.matches) {
      heroBrandVideo.play().catch(usePosterFallback);
    }
  });

  reducedMotionQuery.addEventListener("change", () => {
    if (reducedMotionQuery.matches) {
      heroBrandVideo.pause();
      usePosterFallback();
      return;
    }

    enableVideo();
    heroBrandVideo.play().catch(usePosterFallback);
  });
})();

const englishTextMap = {
  "香港瑞恩国际教育集团": "Hong Kong Rain International Education Group",
  "香港瑞恩国际教育集团有限公司": "Hong Kong Rain International Education Group Limited",
  "本网站及相关咨询服务由": "This website and related consultation services are operated by",
  "运营，对外品牌为 Rain Education（香港瑞恩国际教育集团有限公司）。": "with Rain Education as the public-facing brand.",
  "首页": "Home",
  "服务产品": "Services",
  "升学路径": "Pathways",
  "全球视野": "Global View",
  "案例库": "Case Library",
  "规划指南": "Planning Guides",
  "免费评估": "Free Assessment",
  "讲座活动": "Events",
  "联系我们": "Contact Us",
  "录取标准": "Admissions Criteria",
  "学术体系": "Academic System",
  "服务优势": "Why Rain",
  "导师团队": "Mentor Team",
  "案例亮点": "Case Highlights",
  "合规说明": "Compliance",
  "发送邮件": "Email Us",
  "扫码咨询": "Scan QR",
  "专注香港、英国、新加坡及全球名校升学规划": "Admissions planning for Hong Kong, UK, Singapore and global top universities",
  "以香港为战略支点，连接国际院校资源与学术导师体系，为学生提供从升学定位、标化培训、申请材料、GPA 管理、背景提升到本科、硕士、博士申请的一站式教育咨询服务。": "Based in Hong Kong, we connect international university resources with academic mentor support, providing one-stop education consulting from positioning, test preparation, application materials, GPA management and profile building to undergraduate, master’s and doctoral applications.",
  "香港总部顾问体系": "Hong Kong-based advisory team",
  "一对一升学策略": "One-to-one admissions strategy",
  "GPA 与背景双线管理": "GPA and profile development",
  "预约咨询": "Book Consultation",
  "查看服务产品": "View Services",
  "数据与信任背书": "Trust & Experience",
  "以长期规划、学业管理和申请策略为核心，为不同阶段学生建立更清晰的升学路径。": "We combine long-term planning, academic management and admissions strategy to build clearer pathways for students at different stages.",
  "15年": "15 Years",
  "教育咨询经验": "Education consulting experience",
  "学生案例沉淀": "Student cases",
  "港三 / 新二 / G5": "HK Top 3 / SG Top 2 / G5",
  "QS Top 100 申请支持": "QS Top 100 application support",
  "香港总部": "Hong Kong HQ",
  "连接全球教育资源": "Connected global education resources",
  "具体服务内容、申请结果及正式条款以服务协议为准。": "Specific services, outcomes and formal terms are subject to the signed service agreement.",
  "不是普通中介，而是长期学术规划伙伴": "More Than an Agency: A Long-Term Academic Planning Partner",
  "先评估学生背景、成绩、语言、专业兴趣和目标院校梯度。": "Assess the student’s background, grades, language level, subject interests and target university range.",
  "把标化、GPA、阅读、竞赛、文书素材和面试能力纳入同一张成长图。": "Integrate tests, GPA, reading, competitions, application materials and interview ability into one academic growth map.",
  "围绕院校定位、材料准备、递交、面试和 offer 跟进持续管理。": "Manage university positioning, materials, submission, interviews and offer follow-up as one continuous process.",
  "顶尖大学真正看重什么": "What Top Universities Really Look For",
  "扎实学术能力": "Academic Excellence",
  "批判性思维": "Critical Thinking",
  "广泛阅读与知识积累": "Wider Reading & Knowledge",
  "真实学科热情": "Genuine Subject Passion",
  "找到你的升学路径": "Find Your Pathway",
  "根据学生当前背景快速匹配适合的申请方向，让咨询从更清晰的起点开始。": "Match students with suitable application directions based on their current background, so consultation starts with clarity.",
  "高考生": "Gaokao Student",
  "高考后多路径规划": "Post-Gaokao Multi-Path Planning",
  "国际课程学生": "International Curriculum Student",
  "本科申请与名校冲刺": "Undergraduate Applications & Top University Targeting",
  "副学士在读": "Associate Degree Student",
  "GPA 与本科转入管理": "GPA & Undergraduate Transfer Management",
  "本科在读": "Current Undergraduate",
  "学术成长与背景提升": "Academic Growth & Profile Building",
  "本科毕业": "Undergraduate Graduate",
  "研究生申请定位": "Postgraduate Application Positioning",
  "低 GPA 学生": "Low GPA Student",
  "补强方案与替代路径": "Strengthening Plan & Alternative Pathways",
  "核心项目": "Core Programmes",
  "顶尖名校申请支持": "Top Universities Application Support",
  "覆盖香港、英国、新加坡及全球 QS Top 100 院校申请规划。": "Application planning for Hong Kong, UK, Singapore and global QS Top 100 universities.",
  "标化培训与学术辅导": "Standardized Test Preparation & Academic Tutoring",
  "牛剑与 G5 申请支持": "Oxbridge & G5 Application Support",
  "硕士与博士申请规划": "Master’s & Doctoral Application Planning",
  "港八副学士升学路径": "HK8 Associate Degree Pathway",
  "GPA 管理与学业成长服务": "GPA Management & Academic Growth",
  "服务产品包": "Service Packages",
  "本科名校申请规划": "Undergraduate Top University Planning",
  "预约本科评估": "Book Undergraduate Assessment",
  "预约港八路径评估": "Book HK8 Pathway Assessment",
  "硕博申请规划": "Master’s & PhD Application Planning",
  "预约研究生评估": "Book Postgraduate Assessment",
  "GPA 管理与学业成长": "GPA Management & Academic Growth",
  "预约 GPA 诊断": "Book GPA Diagnosis",
  "预约 G5 规划": "Book G5 Planning",
  "背景提升与竞赛规划": "Profile Building & Competition Planning",
  "预约背景规划": "Book Profile Planning",
  "申请指南与路径推荐": "Application Guides & Pathway Recommendations",
  "香港": "Hong Kong",
  "英国": "United Kingdom",
  "新加坡": "Singapore",
  "美国": "United States",
  "澳洲 / 加拿大": "Australia / Canada",
  "全球名校": "Global Top Universities",
  "副学士": "Associate Degree",
  "本科": "Undergraduate",
  "硕士": "Master’s",
  "博士": "Doctoral",
  "商科": "Business",
  "金融": "Finance",
  "计算机": "Computer Science",
  "数据科学": "Data Science",
  "工程": "Engineering",
  "传媒": "Media",
  "教育": "Education",
  "心理学": "Psychology",
  "法律": "Law",
  "Rain 学术成长与申请支持体系": "Rain Academic Growth & Application Support System",
  "标化培训与语言成绩": "Standardized Tests & Language Scores",
  "学术阅读与思维训练": "Academic Reading & Thinking Training",
  "竞赛与背景提升": "Competitions & Profile Building",
  "个人陈述与文书策略": "Personal Statement & Essay Strategy",
  "入学测试与面试准备": "Admissions Tests & Interview Preparation",
  "GPA 管理与研究生申请": "GPA Management & Postgraduate Applications",
  "高考评估": "Gaokao Assessment",
  "副学士申请": "Associate Degree Application",
  "入学衔接": "Enrollment Transition",
  "GPA 管理": "GPA Management",
  "背景提升": "Profile Building",
  "本科转入 / 硕士规划": "Undergraduate Transfer / Master’s Planning",
  "高考成绩基础评估": "Gaokao Score Assessment",
  "英语能力评估": "English Ability Assessment",
  "一对一入学测试": "One-to-One Entry Assessment",
  "GPA监管与学业辅导": "GPA Monitoring & Academic Tutoring",
  "学士申请材料指导": "Bachelor’s Application Materials Guidance",
  "硕士升学规划": "Master’s Pathway Planning",
  "港九大本硕连读精英升学计划": "HK9 Bachelor-to-Master Elite Pathway Programme",
  "宣传册案例亮点": "Brochure Case Highlights",
  "案例库与申请难点拆解": "Case Library & Application Challenge Analysis",
  "全部案例": "All Cases",
  "牛剑 / G5": "Oxbridge / G5",
  "副学士路径": "Associate Degree Pathway",
  "申请难点": "Challenge",
  "服务方案": "Service Plan",
  "结果亮点": "Outcome Highlight",
  "为什么选择 Rain Education": "Why Choose Rain Education",
  "香港总部，连接全球资源": "Hong Kong Headquarters, Global Resources",
  "个性化升学方案": "Personalised Pathway Planning",
  "数据驱动申请策略": "Data-Driven Application Strategy",
  "高质量导师团队": "High-Quality Mentor Team",
  "全流程陪伴式服务": "End-to-End Accompanied Service",
  "严格筛选的导师团队": "Carefully Selected Mentor Team",
  "名校学术背景": "Top University Academic Backgrounds",
  "五步筛选流程": "Five-Step Selection Process",
  "持续培训机制": "Continuous Training System",
  "多层次支持体系": "Multi-Level Support System",
  "信任中心": "Trust Center",
  "香港总部地址": "Hong Kong Headquarters Address",
  "导师与顾问体系": "Mentor & Advisor System",
  "Offer 与案例材料": "Offers & Case Materials",
  "协议与服务边界": "Agreement & Service Boundaries",
  "服务流程": "Service Process",
  "初步评估": "Initial Assessment",
  "升学方案制定": "Pathway Planning",
  "标化与学术提升": "Tests & Academic Improvement",
  "申请材料准备": "Application Materials Preparation",
  "递交申请与面试辅导": "Submission & Interview Coaching",
  "Offer 跟进": "Offer Follow-Up",
  "入学与后续 GPA 管理": "Enrollment & Ongoing GPA Management",
  "最新讲座与咨询入口": "Upcoming Events & Consultation Entry",
  "高考后香港升学路径说明会": "Hong Kong Pathways After Gaokao Briefing",
  "港八副学士 2+2+1 规划讲座": "HK8 Associate Degree 2+2+1 Planning Seminar",
  "香港硕士申请策略咨询": "Hong Kong Master’s Application Strategy Consultation",
  "牛剑 / G5 申请规划公开课": "Oxbridge / G5 Application Planning Open Class",
  "适合：高考生及家长": "For: Gaokao students and parents",
  "适合：关注副学士、本科衔接及硕士规划的学生": "For: students considering associate degree, undergraduate transfer and master’s planning",
  "适合：本科在读、本科毕业及低 GPA 学生": "For: current undergraduates, graduates and low-GPA students",
  "适合：国际课程学生及目标顶尖院校家庭": "For: international curriculum students and families targeting top universities",
  "申请指南内容库": "Application Guide Library",
  "高考后如何规划香港升学路径": "How to Plan Hong Kong Pathways After Gaokao",
  "获取路径建议": "Get Pathway Advice",
  "英国 G5 与牛剑申请准备时间线": "UK G5 & Oxbridge Application Timeline",
  "获取时间线": "Get Timeline",
  "硕士申请如何提升研究与实习背景": "How to Strengthen Research and Internship Backgrounds for Master’s Applications",
  "获取硕士评估": "Get Master’s Assessment",
  "低 GPA 学生如何补强申请竞争力": "How Low-GPA Students Can Strengthen Competitiveness",
  "获取补强方案": "Get Strengthening Plan",
  "免费初步路径评估": "Free Initial Pathway Assessment",
  "当前背景": "Current Background",
  "目标地区": "Target Destination",
  "申请阶段": "Application Level",
  "副学士 / 本科衔接": "Associate Degree / Undergraduate Transfer",
  "生成初步建议": "Generate Initial Advice",
  "请选择上方信息，生成你的初步升学方向。": "Select the information above to generate your initial pathway direction.",
  "在线咨询表单": "Online Consultation Form",
  "顾问尽快跟进": "Advisor Follow-up",
  "资料仅用于咨询评估": "Information Used for Assessment Only",
  "支持推荐老师线索归属": "Supports Referring Teacher Attribution",
  "支持电话 / WhatsApp / 微信沟通": "Phone / WhatsApp / WeChat Support",
  "快速联系 Rain Education 顾问": "Quick Contact with a Rain Education Advisor",
  "香港电话": "Hong Kong Phone",
  "内地电话": "Mainland China Phone",
  "立即咨询": "Contact Now",
  "快速扫码咨询": "Quick Scan Consultation",
  "不想填写表单？可直接扫码联系 Rain Education 顾问。": "Prefer not to fill in the form? Scan to contact a Rain Education advisor directly.",
  "微信咨询": "WeChat Consultation",
  "WhatsApp 咨询": "WhatsApp Consultation",
  "扫码添加顾问，适合微信沟通和转发材料。": "Scan to add an advisor, suitable for WeChat communication and sharing materials.",
  "适合香港及海外家庭快速联系。": "Suitable for quick contact from Hong Kong and overseas families.",
  "学生姓名": "Student Name",
  "联系电话 / WhatsApp / 微信": "Phone / WhatsApp / WeChat",
  "当前年级": "Current Grade",
  "当前课程体系": "Current Curriculum",
  "请选择课程体系": "Select Curriculum",
  "高考体系": "Gaokao System",
  "香港副学士": "Hong Kong Associate Degree",
  "本科课程": "Undergraduate Curriculum",
  "其他": "Other",
  "请选择目标地区": "Select Destination",
  "目标项目": "Target Programme",
  "请选择目标项目": "Select Programme",
  "本科申请": "Undergraduate Application",
  "副学士升学路径": "Associate Degree Pathway",
  "硕士申请": "Master’s Application",
  "博士申请": "Doctoral Application",
  "标化培训": "Standardized Test Preparation",
  "目标专业": "Target Subject",
  "客户来源": "Lead Source",
  "请选择客户来源": "Select Lead Source",
  "朋友推荐": "Friend Referral",
  "老师推荐": "Teacher Referral",
  "合作机构推荐": "Partner Institution Referral",
  "小红书 / 抖音 / 微信": "Xiaohongshu / Douyin / WeChat",
  "讲座活动": "Seminar / Event",
  "Google / 官网搜索": "Google / Website Search",
  "推荐老师 / 推荐顾问（如有）": "Referring Teacher / Advisor (If Any)",
  "当前成绩 / GPA / 高考预估": "Current Grades / GPA / Gaokao Estimate",
  "备注": "Notes",
  "提交咨询": "Submit Consultation",
  "提交即表示你已阅读并同意": "By submitting, you confirm that you have read and agreed to",
  "隐私政策": "Privacy Policy",
  "服务说明": "Service Notes",
  "与": "and",
  "拨打香港电话": "Call Hong Kong Number",
  "打开 WhatsApp": "Open WhatsApp",
  "填写咨询表单": "Fill Consultation Form",
  "扫码添加顾问，获取初步升学判断": "Scan to Add an Advisor and Get an Initial Pathway View",
  "家长可通过微信或 WhatsApp 直接联系 Rain Education 顾问，发送学生年级、成绩和目标地区，我们会协助判断适合路径。": "Families can contact a Rain Education advisor directly via WeChat or WhatsApp and share the student’s grade, scores and target destinations for an initial pathway view.",
  "微信": "WeChat",
  "服务说明与合规边界": "Service Notes & Compliance Boundaries",
  "申请结果说明": "Application Outcome Notes",
  "服务范围说明": "Service Scope Notes",
  "隐私与资料保护": "Privacy & Data Protection",
  "请输入学生姓名": "Enter student name",
  "请输入电话、WhatsApp 或微信": "Enter phone, WhatsApp or WeChat",
  "例如：高三 / 大一 / 本科毕业": "e.g. Grade 12 / Year 1 / Undergraduate graduate",
  "例如：商科 / 金融 / 计算机": "e.g. Business / Finance / Computer Science",
  "请输入推荐老师姓名、顾问姓名或邀请码": "Enter referring teacher, advisor name or referral code",
  "用于推荐记录与后续跟进，不会在网站公开显示。": "Used for referral records and follow-up only. It will not be displayed publicly.",
  "例如：GPA、预估分、语言成绩、目前薄弱科目": "e.g. GPA, predicted scores, language scores, weak subjects",
  "请简单说明目前情况或目标院校": "Briefly describe your current situation or target universities",
  "提交后，Rain Education 顾问将根据你提供的信息进行初步评估，并通过电话、WhatsApp、微信或邮件联系你。学生信息仅用于咨询评估与服务沟通。": "After submission, a Rain Education advisor will review the information you provide and contact you by phone, WhatsApp, WeChat or email. Student information is used only for consultation assessment and service communication.",
  "提交后，Rain Education 顾问将根据你提供的信息进行初步评估，并通过电话、WhatsApp、微信或邮件联系你。学生信息仅用于咨询评估与服务沟通。提交即表示你已阅读并同意": "After submission, a Rain Education advisor will review the information you provide and contact you by phone, WhatsApp, WeChat or email. Student information is used only for consultation assessment and service communication. By submitting, you confirm that you have read and agreed to",
  "正在提交，请稍候。": "Submitting, please wait.",
  "感谢咨询，Rain Education 顾问将根据你的背景与目标，为你安排初步评估。": "Thank you. A Rain Education advisor will arrange an initial assessment based on your background and goals.",
  "感谢咨询，Rain Education 顾问将尽快与您联系。": "Thank you. A Rain Education advisor will contact you shortly.",
  "提交失败，请稍后再试，或直接邮件联系 info@rainedu.hk。": "Submission failed. Please try again later or email info@rainedu.hk directly.",
  "擅长：绘画、纺织、艺术写作、摄影、作品集准备": "Strengths: drawing, textiles, art writing, photography and portfolio preparation",
  "辅导方向：英国艺术院校申请、Foundation / Fine Art 方向": "Mentoring: UK art school applications, Foundation and Fine Art pathways",
  "擅长：实分析、微分方程、数学物理方法、PDE": "Strengths: real analysis, differential equations, mathematical physics methods and PDE",
  "辅导方向：A-Level 数学、大学数学 GPA、硕士/博士申请": "Mentoring: A-Level Mathematics, university mathematics GPA, master’s and PhD applications",
  "擅长：AI 教育、教育科技、个性化学习、青年领导力": "Strengths: AI education, EdTech, personalised learning and youth leadership",
  "辅导方向：AI 课程支持、GPA 管理、STEM 学术规划": "Mentoring: AI coursework, GPA management and STEM academic planning",
  "擅长：环境毒理、生物信息、科研写作、课程规划": "Strengths: environmental toxicology, bioinformatics, scientific writing and course planning",
  "辅导方向：副学士/本科 GPA 管理、理科升学与学术沟通": "Mentoring: associate/undergraduate GPA management, science pathways and academic communication",
  "擅长：经济学、中文、人文学科、商科写作": "Strengths: economics, Chinese language, humanities and business writing",
  "辅导方向：副学士支持、港英申请、个人陈述与选校策略": "Mentoring: associate degree support, Hong Kong/UK applications, personal statements and school selection",
  "擅长：物理、数学分析、机器学习、计算物理": "Strengths: physics, mathematical analysis, machine learning and computational physics",
  "辅导方向：A-Level Physics、G5 申请、科研与 GPA 规划": "Mentoring: A-Level Physics, G5 applications, research and GPA planning",
  "擅长：代数、数论、高等数学、MAT / STEP": "Strengths: algebra, number theory, advanced mathematics, MAT / STEP",
  "辅导方向：牛剑数学申请、笔试训练、面试与个人陈述": "Mentoring: Oxbridge mathematics applications, admissions tests, interviews and personal statements",
  "擅长：全球升学策略、学术规划、学生发展、研究型申请路径": "Strengths: global admissions strategy, academic planning, student development and research-based application pathways",
  "辅导方向：本科规划、硕博申请、GPA 提升与跨地区升学方案": "Mentoring: undergraduate planning, master’s/doctoral applications, GPA improvement and cross-border pathway planning",
  "擅长：副学士升本科、GPA 恢复、课程规划、家庭咨询沟通": "Strengths: associate degree transfer, GPA recovery, course planning and family consultation",
  "辅导方向：香港本科衔接、研究生申请、跨地区升学路径规划": "Mentoring: Hong Kong undergraduate progression, postgraduate applications and cross-border pathway planning",
  "根据已提供 CV 整理，展示 Rain Education 导师在数学、物理、人工智能、环境科学、艺术设计、商科、高等教育咨询与跨文化传播等方向的学术背景与辅导经验。": "Based on the provided CVs, this section presents Rain Education mentors across mathematics, physics, AI, environmental science, art and design, business, higher education advising and cross-cultural communication."
};

Object.assign(englishTextMap, {
  "Fast Enquiry": "Fast Enquiry",
  "快速咨询表单": "Quick Consultation Form",
  "适合手机端快速留资，顾问收到后会再补充完整评估信息。": "Designed for quick mobile enquiries. An advisor will follow up for full assessment details.",
  "电话 / 微信 / WhatsApp": "Phone / WeChat / WhatsApp",
  "请输入联系方式": "Enter your contact method",
  "当前阶段": "Current Stage",
  "请选择当前阶段": "Select Current Stage",
  "我同意 Rain Education 顾问通过电话、WhatsApp、微信或邮件联系我。": "I agree that a Rain Education advisor may contact me by phone, WhatsApp, WeChat or email.",
  "快速提交咨询": "Submit Quick Enquiry",
  "副学士升本科": "Associate Degree to Undergraduate",
  "港校本科": "Hong Kong Undergraduate",
  "硕博申请": "Master’s / PhD Applications",
  "低 GPA 补强": "Low GPA Strengthening",
  "案例分类说明": "Case Category Notes",
  "港校本科路径": "Hong Kong Undergraduate Pathways",
  "硕博申请规划": "Master’s / PhD Application Planning",
  "牛剑 / G5 冲刺": "Oxbridge / G5 Targeting",
  "适合 AD / HD 学生，重点看 GPA、专业匹配、Year 3 或 Advanced Standing 衔接。": "For AD / HD students, focusing on GPA, subject fit, Year 3 entry or Advanced Standing progression.",
  "覆盖高考后、本科直申、港八衔接和多地区联申策略。": "Covers post-Gaokao, direct undergraduate applications, Hong Kong progression and multi-destination applications.",
  "围绕研究兴趣、实习科研、推荐信和文书材料建立申请逻辑。": "Builds application logic around research interests, internships, academic evidence, references and essays.",
  "强调笔试、面试、专业阅读、文书表达和长期学术画像。": "Focuses on admissions tests, interviews, subject reading, essays and long-term academic profile.",
  "先诊断短板，再通过课程表现、背景提升和院校梯度重构降低风险。": "Diagnoses weaknesses first, then reduces risk through coursework, profile building and university list restructuring.",
  "低 GPA 学生的补强与院校梯度重构": "Low GPA Strengthening and University List Restructuring",
  "针对 GPA 不占优势的学生，先判断短板来源，再通过课程补强、实习科研和申请梯度降低风险。": "For students with weaker GPA, we first diagnose the source of risk, then reduce it through coursework, internships/research and application list strategy.",
  "成绩单竞争力不足，容易在热门专业筛选中被动。": "Transcript competitiveness is limited, which can be risky for popular programmes.",
  "GPA 诊断、选课建议、背景材料重构、推荐信和文书解释策略。": "GPA diagnosis, course selection advice, profile restructuring, recommendation strategy and essay explanation.",
  "以低 GPA 补强路径为参照，展示风险控制和材料表达方法。": "Uses a low-GPA strengthening pathway as a reference to show risk control and material presentation.",
  "香港硕士申请的专业定位与材料整合": "Subject Positioning and Material Integration for Hong Kong Master’s Applications",
  "围绕目标专业、过往课程、实习经历和职业方向，帮助学生建立更清晰的香港硕士申请叙事。": "Builds a clearer Hong Kong master’s application narrative around target subject, prior coursework, internships and career direction.",
  "专业选择不清晰，材料容易变成经历堆砌。": "Subject direction is unclear, making materials look like a list of experiences.",
  "专业定位、院校梯度、简历结构、个人陈述和面试问答准备。": "Subject positioning, university list, CV structure, personal statement and interview preparation.",
  "以香港硕士申请为参照，展示定位、材料和面试的系统推进。": "Uses Hong Kong master’s applications as a reference to show systematic positioning, materials and interview preparation.",
  "导师匹配机制": "Mentor Matching System",
  "按专业方向匹配": "Matched by Subject Direction",
  "统一学术与教学筛选": "Unified Academic & Teaching Screening",
  "阶段复盘与家长沟通": "Stage Reviews & Family Communication"
});

Object.assign(englishTextMap, {
  "高考路径": "Gaokao Pathway",
  "副学士认知": "Associate Degree Insight",
  "路径对比": "Pathway Comparison",
  "长期系统": "Long-Term System",
  "常见问题": "FAQ",
  "副学士Offer": "Associate Offers",
  "副学士升读本科成功案例 Offer": "Associate Degree Transfer Offer Cases",
  "根据已提供的真实 offer 文件整理，展示副学士 / Higher Diploma 学生升读香港本科、Year 3 或 Advanced Standing 的路径结果。网页展示已做匿名化处理。": "Based on the provided real offer files, this section shows associate degree / Higher Diploma progression outcomes to Hong Kong undergraduate programmes, Year 3 entry or Advanced Standing. Web display has been anonymized.",
  "不重复 Offer 案例": "Unique offer cases",
  "香港高校方向": "Hong Kong university destinations",
  "本科衔接与高年级入读": "Undergraduate progression and senior-year entry",
  "以课程表现驱动升读机会": "Progression opportunities driven by academic performance",
  "副学士学生获香港浸会大学工商管理方向 Year 3 conditional offer。": "An associate degree student received a Hong Kong Baptist University BBA Year 3 conditional offer.",
  "副学士学生获香港浸会大学社会科学方向 Year 3 conditional offer。": "An associate degree student received a Hong Kong Baptist University Social Sciences Year 3 conditional offer.",
  "Higher Diploma 学生获岭南大学风险及保险管理方向 Full-time Year 3 offer。": "A Higher Diploma student received a Lingnan University Risk and Insurance Management Full-time Year 3 offer.",
  "Higher Diploma 学生获岭南大学 UGC-funded BBA Year 3 conditional offer。": "A Higher Diploma student received a Lingnan University UGC-funded BBA Year 3 conditional offer.",
  "副学士学生获香港理工大学工商管理相关方向 conditional offer。": "An associate degree student received a Hong Kong Polytechnic University business-related conditional offer.",
  "副学士学生获香港城市大学 BBA Marketing Advanced Standing I offer。": "An associate degree student received a City University of Hong Kong BBA Marketing Advanced Standing I offer.",
  "副学士 / Higher Diploma 学生获社会政策方向本科三年级入读资格。": "An associate degree / Higher Diploma student received direct third-year entry to a Social Policy undergraduate programme.",
  "入读": "Entry",
  "条件": "Condition",
  "完成 AD / HD 或同等学历": "Completion of AD / HD or equivalent qualification",
  "以上案例基于已提供 offer 文件整理；网页展示已移除学生姓名、申请编号、地址等个人信息。个案结果受学生背景、GPA、材料质量、申请年份及院校政策影响，不构成录取承诺。": "The cases above are based on the provided offer files. Student names, application numbers, addresses and other personal information have been removed for web display. Individual outcomes depend on student background, GPA, material quality, application year and university policy, and do not constitute an admission guarantee.",
  "高考后香港升学路径诊断": "Post-Gaokao Hong Kong Pathway Diagnosis",
  "高考后不是只有“复读”或“直接出国”两种选择。Rain 会先判断学生成绩、英语基础、目标专业和家庭时间线，再设计直申、衔接或补强方案。": "After Gaokao, families have more than two choices. Rain first reviews grades, English ability, target subjects and family timelines before designing a direct application, bridge pathway or strengthening plan.",
  "一本线以上": "Above First-Tier Line",
  "港校本科直申 + 多地区联申": "Hong Kong Undergraduate Direct Application + Multi-Destination Applications",
  "适合成绩稳定、英语基础较好、希望同步冲刺香港、英国、新加坡或 QS Top 100 院校的学生。": "For students with stable grades and stronger English foundations who want to target Hong Kong, UK, Singapore or QS Top 100 universities together.",
  "本科线附近": "Around Undergraduate Line",
  "香港副学士 + 本科衔接": "Hong Kong Associate Degree + Undergraduate Progression",
  "适合高考发挥不理想、仍希望保留进入香港八大及全球名校机会的学生。": "For students whose Gaokao results were not ideal but who still want to keep opportunities for Hong Kong top universities and global options.",
  "英语基础较强": "Strong English Foundation",
  "香港 / 英国 / 新加坡组合申请": "Hong Kong / UK / Singapore Combined Applications",
  "通过语言成绩、文书材料和院校梯度组合，提高不同地区申请选择空间。": "Use language scores, application materials and a balanced university list to expand destination choices.",
  "成绩或 GPA 有短板": "Grade or GPA Gaps",
  "学术补强 + 背景重构": "Academic Strengthening + Profile Rebuilding",
  "围绕课程表现、英语能力、活动素材和申请节奏，建立更可执行的补强计划。": "Build a practical strengthening plan around coursework, English ability, activity evidence and application timing.",
  "以上仅为初步路径判断，正式方案需结合成绩单、语言成绩、目标专业、当年院校政策和服务协议确认。": "This is only an initial pathway reference. Formal plans depend on transcripts, language scores, target subjects, current university policies and the service agreement.",
  "重新理解香港副学士路径": "Rethinking the Hong Kong Associate Degree Pathway",
  "香港副学士不是简单的“低端替代”，它更像一个可以重新建立 GPA、适应全英文学习环境、再衔接本科的过渡平台。真正关键不只是入读，而是入读后的课程选择、成绩管理和本科转入节奏。": "A Hong Kong associate degree is not simply a lower-tier substitute. It can be a transition platform for rebuilding GPA, adapting to English-medium study and progressing to undergraduate study. The key is not only admission, but course selection, grade management and transfer timing after enrollment.",
  "预约副学士路径评估": "Book Associate Pathway Assessment",
  "不是终点，而是衔接平台": "Not an endpoint, but a progression platform",
  "适合高考后希望保留香港及全球本科机会的学生，路径重点在后续转入。": "For students who want to keep Hong Kong and global undergraduate options after Gaokao, with progression as the key focus.",
  "核心竞争力是 GPA": "GPA is the core competitiveness",
  "副学士阶段的课程表现会直接影响本科衔接空间，需要持续管理。": "Course performance during the associate degree stage directly affects undergraduate progression options and needs ongoing management.",
  "提前规划目标专业": "Plan target subjects early",
  "选课、材料、语言和背景活动应围绕未来本科专业提前布局。": "Course selection, materials, language and profile activities should be planned around the future undergraduate subject.",
  "家庭要看清服务边界": "Families should understand service boundaries",
  "任何录取、保障或退款安排均应以正式协议和实际申请条件为准。": "Any admission, assurance or refund arrangement is subject to the formal agreement and actual application conditions.",
  "主流升学路径对比": "Mainstream Pathway Comparison",
  "成熟的升学咨询不是单推某一条路线，而是把适合人群、机会、风险和执行难度讲清楚，再根据学生实际情况做选择。": "Mature admissions consulting does not push one single route. It explains fit, opportunities, risks and execution difficulty before choosing based on the student’s actual situation.",
  "香港副学士路径": "Hong Kong Associate Degree Pathway",
  "适合学生": "Suitable For",
  "高考未达理想本科线，但希望通过香港学习环境重新衔接本科。": "Students whose Gaokao results missed the ideal undergraduate line but who want to rebuild a route through Hong Kong study.",
  "核心机会": "Core Opportunity",
  "用副学士阶段 GPA、语言和背景表现争取本科转入。": "Use associate degree GPA, language and profile performance to pursue undergraduate progression.",
  "Rain 建议": "Rain Recommendation",
  "入读前就确定专业方向和 GPA 管理计划。": "Define subject direction and GPA management before enrollment.",
  "港校本科直申": "Hong Kong Undergraduate Direct Application",
  "高考成绩、英语能力和综合背景更接近目标院校要求。": "Students whose Gaokao scores, English ability and profile are closer to target university requirements.",
  "路径更直接，适合准备充分、时间线清晰的学生。": "A more direct route for students with strong preparation and a clear timeline.",
  "同步建立保底、匹配和冲刺院校组合。": "Build a balanced list of safer, matching and reach universities.",
  "海外预科 / 国际大一": "Overseas Foundation / International Year One",
  "希望进入英国、澳洲、加拿大等体系，并需要适应过渡课程。": "Students targeting UK, Australia, Canada or similar systems who need a transition programme.",
  "以桥梁课程衔接本科，申请时间相对灵活。": "Use a bridge programme to progress to undergraduate study, often with more flexible timing.",
  "重点比较升读规则、费用、专业限制和后续选择。": "Compare progression rules, cost, subject restrictions and later options carefully.",
  "国内本科后硕士申请": "Domestic Undergraduate to Master’s Application",
  "已经进入国内本科，计划通过 GPA、语言和实习科研冲刺硕士。": "Students already in a domestic undergraduate programme who plan to target master’s options through GPA, language, internships and research.",
  "用四年本科成绩和背景积累提升研究生申请竞争力。": "Use four years of undergraduate performance and profile building to strengthen postgraduate applications.",
  "大一开始管理 GPA、专业方向、实习和推荐信素材。": "Start managing GPA, subject direction, internships and recommendation evidence from Year 1.",
  "高考后香港长期升学系统": "Long-Term Hong Kong Pathway System After Gaokao",
  "把“申请入读”延伸为“入学适应、GPA 管理、本科转入、研究生规划”的连续服务。Rain 更关注学生进入课程后的表现和下一阶段选择，而不是只完成一次申请。": "We extend application support into enrollment transition, GPA management, undergraduate progression and postgraduate planning. Rain focuses on performance after enrollment and the next stage, not just a single application.",
  "背景评估": "Background Assessment",
  "高考成绩、英语能力、专业兴趣与家庭目标梳理。": "Review Gaokao results, English ability, subject interests and family goals.",
  "路径选择": "Pathway Selection",
  "判断本科直申、副学士衔接或多地区组合申请。": "Choose between direct undergraduate application, associate progression or multi-destination applications.",
  "入学落地": "Enrollment Landing",
  "材料准备、申请递交、入学衔接与课程适应建议。": "Support materials, submission, enrollment transition and course adaptation.",
  "学习计划、课程辅导、作业考试节点和反馈机制。": "Study planning, course tutoring, assignment/exam milestones and feedback.",
  "竞赛、实习、研究、公益和文书素材长期积累。": "Long-term development of competition, internship, research, service and essay evidence.",
  "本科转入": "Undergraduate Progression",
  "目标院校、专业匹配、材料策略与面试准备。": "Target universities, subject matching, materials strategy and interview preparation.",
  "硕博与职业规划": "Master’s / PhD and Career Planning",
  "研究生申请、就业实习和身份相关信息咨询以政策为准。": "Postgraduate applications, employment/internship planning and immigration-related information are subject to current policies.",
  "申请落地支持": "Application Execution Support",
  "把院校定位、材料准备、递交和跟进变成清晰任务表。": "Turn university positioning, materials, submission and follow-up into a clear task plan.",
  "学业与 GPA 管理": "Academic & GPA Management",
  "持续关注课程表现，帮助学生减少“入读后没人管”的风险。": "Track course performance to reduce the risk of losing support after enrollment.",
  "背景提升支持": "Profile Building Support",
  "围绕目标专业建立可写进文书、面试和简历的真实素材。": "Build real evidence that can support essays, interviews and resumes.",
  "升学进阶规划": "Progression Planning",
  "提前连接本科转入、硕士申请和长期学术成长目标。": "Connect undergraduate progression, master’s applications and long-term academic goals early.",
  "家长常见问题": "Parent FAQ",
  "把高客单价咨询中最容易被误解的问题提前讲清楚，帮助家庭建立更稳的预期。": "We clarify the most easily misunderstood questions in premium consulting so families can set realistic expectations.",
  "副学士是否等于内地大专？": "Is an associate degree the same as a mainland junior college diploma?",
  "不是同一套体系。香港副学士更适合作为本科衔接平台，但能否转入理想本科取决于 GPA、专业匹配、材料和当年招生政策。": "No. Hong Kong associate degrees belong to a different system and are better understood as a progression platform. Transfer results depend on GPA, subject fit, materials and current admission policies.",
  "为什么 GPA 管理这么重要？": "Why is GPA management so important?",
  "无论副学士转本科、本科申请硕士，GPA 都是核心学术证据之一。早期稳定成绩比后期临时补救更有效。": "For associate-to-undergraduate progression or master’s applications, GPA is a core academic indicator. Stabilizing grades early is more effective than last-minute repair.",
  "能否保证进入港八？": "Can entry into HK8 universities be guaranteed?",
  "录取结果受学生基础、课程表现、申请材料、院校政策和竞争环境影响。任何保障或退款机制均以正式协议为准。": "Admission results depend on student background, course performance, materials, university policy and competition. Any assurance or refund mechanism is subject to the formal agreement.",
  "什么时候开始准备英语？": "When should English preparation begin?",
  "越早越好。英语能力会影响课堂适应、GPA、文书表达、面试表现和后续地区选择。": "As early as possible. English ability affects classroom adaptation, GPA, essays, interviews and later destination choices.",
  "可以同步申请多个地区吗？": "Can students apply to multiple destinations at the same time?",
  "可以，但需要控制材料节奏、申请费用和时间线。Rain 会根据学生目标建立冲刺、匹配和稳妥组合。": "Yes, but materials, costs and timelines need careful control. Rain builds a balanced reach, match and safer application mix based on student goals.",
  "家长能看到哪些服务反馈？": "What service feedback can parents receive?",
  "可围绕申请节点、学习进度、材料准备和风险提醒建立定期沟通机制，具体反馈方式以服务方案为准。": "Regular communication can cover application milestones, study progress, materials and risk alerts. Specific feedback methods depend on the service plan."
});

Object.assign(englishTextMap, {
  "Rain Education 私享咨询路径": "Rain Education Private Advisory Pathway",
  "从一次咨询开始，建立完整升学行动图": "Build a Complete Admissions Action Map From the First Consultation",
  "我们先判断学生所处阶段、成绩风险、目标地区和专业方向，再把申请拆成可执行的时间线、材料线、学业线和背景提升线。": "We first assess the student’s stage, academic risks, target destinations and subject direction, then turn the application into an actionable timeline across materials, academics and profile building.",
  "初步咨询流程": "Initial Consultation Process",
  "背景诊断": "Background Diagnosis",
  "成绩、语言、课程体系与家庭目标。": "Grades, language ability, curriculum system and family goals.",
  "路径匹配": "Pathway Matching",
  "香港、英国、新加坡及全球名校组合。": "Hong Kong, UK, Singapore and global university combinations.",
  "风险拆解": "Risk Breakdown",
  "GPA、语言、专业选择与申请节点。": "GPA, language, subject choice and application milestones.",
  "行动方案": "Action Plan",
  "形成顾问可跟进的阶段计划。": "Create a stage-by-stage plan that advisors can follow up.",
  "获取初步评估": "Get Initial Assessment",
  "预约顾问咨询": "Book Advisor Consultation",
  "Rain Education 服务保障机制": "Rain Education Service Assurance Mechanism",
  "正式协议边界": "Formal Agreement Boundaries",
  "服务内容、双方责任、费用与条款以正式协议为准。": "Service scope, responsibilities, fees and terms are subject to the formal agreement.",
  "阶段反馈机制": "Stage Feedback Mechanism",
  "围绕申请节点、学业进度和风险点进行阶段沟通。": "Stage communication around application milestones, academic progress and risk points.",
  "学生资料保护": "Student Data Protection",
  "成绩单、文书和个人信息仅用于评估与服务执行。": "Transcripts, essays and personal information are used only for assessment and service execution.",
  "多路径策略": "Multi-Pathway Strategy",
  "根据学生条件建立冲刺、匹配、稳妥和备选方案。": "Build reach, match, safer and alternative plans based on the student’s profile.",
  "高端咨询不只是申请递交，而是全案管理系统": "Premium Consulting Is a Full-Case Management System, Not Just Application Submission",
  "面向高客单价家庭，Rain Education 将升学咨询拆解为诊断、规划、执行、反馈和复盘五个层级。每个阶段都围绕学生的真实条件和目标院校要求推进，减少盲目试错。": "For premium families, Rain Education breaks admissions consulting into diagnosis, planning, execution, feedback and review. Each stage is driven by the student’s real profile and target university requirements to reduce blind trial and error.",
  "Rain Education 全案管理交付": "Rain Education Full-Case Management Deliverables",
  "学生诊断报告": "Student Diagnostic Report",
  "梳理成绩、语言、课程体系、专业兴趣与申请风险。": "Review grades, language, curriculum, subject interests and application risks.",
  "院校梯度清单": "University Tier List",
  "建立冲刺、匹配、稳妥组合，控制申请节奏。": "Build reach, match and safer combinations while managing application pace.",
  "GPA 与学术计划": "GPA & Academic Plan",
  "围绕关键课程、作业、论文和考试节点持续管理。": "Manage key courses, assignments, papers and exam milestones continuously.",
  "材料与文书管理": "Materials & Essay Management",
  "从素材提炼、个人陈述到推荐信策略统一推进。": "Coordinate evidence extraction, personal statements and recommendation strategy.",
  "导师匹配与辅导": "Mentor Matching & Coaching",
  "按专业方向匹配学术导师，强化专业表达和面试能力。": "Match academic mentors by subject direction and strengthen subject expression and interview ability.",
  "Offer 跟进与入学衔接": "Offer Follow-Up & Enrollment Transition",
  "跟进申请结果、补件节点、入学准备和后续规划。": "Follow up on application results, document requests, enrollment preparation and next-stage planning.",
  "服务产品选择逻辑": "Service Package Selection Logic",
  "先判断路径，再选择服务": "Define the Pathway Before Choosing a Service",
  "根据学生背景、时间窗口和目标地区，决定是走本科直申、副学士衔接、GPA 修复、硕博申请，还是多地区联合申请。": "Based on the student’s background, timing and target destinations, decide between direct undergraduate application, associate progression, GPA recovery, postgraduate planning or multi-destination applications.",
  "每个服务包都有清晰交付": "Every Package Has Clear Deliverables",
  "从院校清单、时间线、文书材料、导师辅导到阶段复盘，避免只停留在泛泛建议。": "From school lists, timelines, essays and mentor coaching to stage reviews, each package goes beyond generic advice.",
  "结果导向，但边界清楚": "Outcome-Oriented With Clear Boundaries",
  "申请结果受学生背景、院校政策和递交情况影响，具体服务内容及条款以正式协议为准。": "Application outcomes depend on student background, university policy and submission status. Specific services and terms are subject to the formal agreement."
});

Object.assign(englishTextMap, {
  "决策中心": "Decision Center",
  "地区矩阵": "Destination Matrix",
  "服务交付": "Deliverables",
  "开始规划": "Start Planning",
  "家长最需要先搞清楚的 6 个问题": "Six Key Questions Families Should Clarify First",
  "高端升学咨询的第一步不是马上报名项目，而是先把目标、预算、时间、风险和服务边界讲清楚。Rain Education 帮家庭把复杂选择拆成更容易判断的决策框架。": "The first step in premium admissions consulting is not signing up immediately, but clarifying goals, budget, timing, risks and service boundaries. Rain Education helps families turn complex choices into a clearer decision framework.",
  "咨询前决策清单": "Pre-Consultation Decision Checklist",
  "一次有效咨询，应该先回答这些问题": "An Effective Consultation Should First Answer These Questions",
  "学生现在最主要的短板是成绩、语言、背景，还是时间？": "Is the student’s main gap grades, language, profile, or timing?",
  "目标地区是否需要同时做组合申请？": "Should the target destinations be planned as a combined application strategy?",
  "副学士、本科直申、硕士申请哪条路径更现实？": "Which route is more realistic: associate degree, direct undergraduate application, or postgraduate application?",
  "家长需要看到怎样的阶段反馈和服务交付？": "What stage feedback and service deliverables should parents expect?",
  "先做免费初步评估": "Start With a Free Initial Assessment",
  "学生背景判断": "Student Background Classification",
  "高考、国际课程、副学士、本科在读、低 GPA 学生的路径逻辑不同，需要先分类。": "Gaokao, international curriculum, associate degree, undergraduate and low-GPA students require different pathway logic and should be classified first.",
  "目标地区组合": "Destination Combination",
  "香港、英国、新加坡和全球名校可以组合规划，但材料节奏和预算要提前控制。": "Hong Kong, UK, Singapore and global universities can be planned together, but materials, timing and budget need early control.",
  "申请时间窗口": "Application Timing Window",
  "越晚开始，越需要聚焦关键动作；越早开始，越能做 GPA、语言和背景积累。": "The later the start, the more focused the actions must be; the earlier the start, the more GPA, language and profile building can be developed.",
  "专业方向风险": "Subject Direction Risk",
  "商科、金融、计算机、传媒、教育等专业竞争方式不同，不能只看院校排名。": "Business, finance, computer science, media and education compete differently; university ranking alone is not enough.",
  "服务交付清单": "Service Deliverables Checklist",
  "成熟服务应包含评估、院校清单、时间线、材料管理、导师辅导和阶段复盘。": "A mature service should include assessment, university list, timeline, materials management, mentor coaching and stage reviews.",
  "结果边界说明": "Outcome Boundary Notes",
  "申请结果受学生条件与院校政策影响，任何保障与责任边界均以正式协议为准。": "Application outcomes depend on the student’s profile and university policies. Any assurance or responsibility boundary is subject to the formal agreement.",
  "按目标地区建立申请策略，而不是只看学校名字": "Build Strategy by Destination, Not Just by University Name",
  "不同地区对成绩、语言、文书、面试、课程体系和专业匹配的要求并不相同。Rain Education 会先判断学生适合的地区组合，再设计申请动作。": "Different destinations assess grades, language, essays, interviews, curriculum and subject fit differently. Rain Education first identifies suitable destination combinations, then designs the application actions.",
  "适合关注港八、副学士衔接、本科转入、香港硕士和长期留港发展的学生。": "For students focusing on HK8 universities, associate progression, undergraduate transfer, Hong Kong master’s applications and long-term Hong Kong development.",
  "副学士 2+2+1 路径": "Associate Degree 2+2+1 Pathway",
  "本科与硕士申请": "Undergraduate and Master’s Applications",
  "GPA 管理与转入规划": "GPA Management and Transfer Planning",
  "咨询香港路径": "Ask About Hong Kong Pathways",
  "适合目标 G5、罗素集团、艺术院校、预科、本科和硕士申请的学生。": "For students targeting G5, Russell Group, art schools, foundation, undergraduate and master’s applications.",
  "A-Level / IELTS / 文书规划": "A-Level / IELTS / Essay Planning",
  "牛剑与 G5 面试准备": "Oxbridge and G5 Interview Preparation",
  "本科、硕士与博士申请": "Undergraduate, Master’s and Doctoral Applications",
  "咨询英国路径": "Ask About UK Pathways",
  "适合重视亚洲国际化环境、公立大学竞争力和多地区联合申请的家庭。": "For families valuing an international Asian environment, public university competitiveness and multi-destination applications.",
  "新二与国际化院校定位": "Singapore Top 2 and International University Positioning",
  "语言、材料与面试节奏": "Language, Materials and Interview Timeline",
  "香港 / 英国同步组合": "Hong Kong / UK Combined Planning",
  "咨询新加坡路径": "Ask About Singapore Pathways",
  "适合希望同时评估多个国家和院校层级，建立更稳申请组合的学生。": "For students who want to evaluate multiple countries and university tiers to build a more balanced application portfolio.",
  "院校梯度与专业匹配": "University Tiering and Subject Matching",
  "多地区材料策略": "Multi-Destination Materials Strategy",
  "冲刺、匹配、稳妥方案": "Reach, Match and Safer Plans",
  "咨询全球名校路径": "Ask About Global Top University Pathways"
});

Object.assign(englishTextMap, {
  "全部导师": "All Mentors",
  "数学 / 物理": "Math / Physics",
  "艺术作品集": "Art Portfolio",
  "商科 / 人文": "Business / Humanities",
  "AI / 科研": "AI / Research",
  "副学士衔接": "Associate Transfer",
  "报名咨询": "Register Interest",
  "6月上旬": "Early June",
  "6月中旬": "Mid-June",
  "6月下旬": "Late June",
  "每月滚动": "Monthly",
  "线上 / 香港同步": "Online / Hong Kong",
  "副学士专题": "Associate Degree Focus",
  "一对一评估": "One-to-One Assessment",
  "国际课程家庭": "International Curriculum Families",
  "阅读专题页面": "Read Topic Page",
  "阅读申请指南": "Read Application Guide",
  "查看硕博规划": "View Postgraduate Planning",
  "查看 GPA 方案": "View GPA Plan",
  "按需求进入专题页面": "Specialist Pages by Need",
  "导师团队与辅导体系": "Mentor Team & Tutoring System",
  "案例与 Offer 展示": "Cases & Offer Gallery",
  "申请指南与路径建议": "Application Guides & Pathway Advice",
  "首选联系方式": "Preferred Contact Method",
  "请选择首选联系方式": "Please select preferred contact method",
  "电话": "Phone",
  "邮件": "Email",
  "方便联系时间": "Preferred Contact Time",
  "例如：工作日晚上 / 周末下午": "e.g. weekday evenings / weekend afternoons",
  "我已阅读并同意隐私政策与服务说明，并同意 Rain Education 顾问通过电话、WhatsApp、微信或邮件联系我。": "I have read and agree to the Privacy Policy and Service Disclaimer, and agree that Rain Education advisors may contact me by phone, WhatsApp, WeChat or email.",
  "副学士专题": "Associate Degree Page",
  "硕博申请": "Postgraduate Applications",
  "案例展示": "Case Gallery"
});

Object.assign(englishTextMap, {
  "不是“口头建议”，而是可跟进的服务交付": "Not Verbal Advice, But Trackable Service Deliverables",
  "成熟的高端咨询必须让家庭看得见进度、看得懂风险、知道下一步要做什么。Rain Education 将咨询内容拆解为清晰交付物，便于学生、家长、顾问和导师同步推进。": "Mature premium consulting should make progress visible, risks understandable and next actions clear. Rain Education breaks consulting into concrete deliverables so students, parents, advisors and mentors can move together.",
  "每个学生都应有一张清晰的升学管理图": "Every Student Should Have a Clear Admissions Management Map",
  "从第一次评估到最终入学，所有任务都围绕目标院校、目标专业、学术表现、申请材料和家庭沟通展开。": "From the first assessment to enrollment, all tasks should align around target universities, subject goals, academic performance, application materials and family communication.",
  "预约查看适合你的服务清单": "Book a Review of Your Service Checklist",
  "背景诊断报告": "Background Diagnostic Report",
  "整理学生成绩、语言、课程体系、专业兴趣、活动经历和当前风险。": "Organize grades, language level, curriculum, subject interests, activities and current risks.",
  "目标院校与专业清单": "Target University and Subject List",
  "建立冲刺、匹配、稳妥与备选方案，不盲目只看排名。": "Build reach, match, safer and alternative options without relying only on rankings.",
  "申请时间线": "Application Timeline",
  "明确考试、文书、推荐信、递交、补件、面试和 offer 跟进节点。": "Clarify milestones for tests, essays, recommendations, submission, document requests, interviews and offer follow-up.",
  "GPA 与学习管理表": "GPA and Study Management Sheet",
  "围绕课程、作业、论文、考试和反馈建立阶段性学业管理。": "Build stage-based academic management around courses, assignments, papers, exams and feedback.",
  "文书与材料清单": "Essay and Materials Checklist",
  "把个人陈述、简历、推荐信、作品集和补充材料统一管理。": "Manage personal statements, CVs, recommendation letters, portfolios and supporting materials together.",
  "家庭阶段复盘": "Family Stage Review",
  "围绕进度、风险、下一步动作和服务边界进行阶段沟通。": "Communicate around progress, risks, next actions and service boundaries at each stage.",
  "把学生情况发给我们，先做一次初步判断": "Send Us the Student Profile for an Initial Review",
  "如果你还不确定该走香港副学士、本科直申、英国/新加坡联申、GPA 修复还是硕博申请，可以先提交基本信息。顾问会根据当前阶段和目标方向给出初步建议。": "If you are not yet sure whether to choose Hong Kong associate degree, direct undergraduate application, UK/Singapore joint applications, GPA recovery or postgraduate planning, submit basic information first. An advisor will provide an initial direction based on the current stage and goals.",
  "高考后路径": "Post-Gaokao Pathway",
  "适合高考生、家长、副学士路径关注者。": "For Gaokao students, parents and families considering associate degree pathways.",
  "GPA / 本科转入": "GPA / Undergraduate Transfer",
  "适合副学士、本科在读、低 GPA 学生。": "For associate degree students, current undergraduates and low-GPA students.",
  "硕博 / G5 / 全球名校": "Master’s / PhD / G5 / Global Top Universities",
  "适合目标高竞争项目和跨地区申请。": "For high-competition programmes and cross-destination applications.",
  "立即提交咨询": "Submit Consultation Now"
});

Object.assign(englishTextMap, {
  "本科 / 研究生 Offer 案例库": "Undergraduate & Postgraduate Offer Library",
  "根据新提供的本科与研究生 offer PDF 素材整理，精选可公开展示的录取、奖学金与申请结果信息。所有网页素材均已做匿名化处理，仅保留院校、项目、层级和申请方向。": "Curated from newly provided undergraduate and postgraduate offer PDFs, this section highlights admission, scholarship and application outcome information suitable for public display. All web materials have been anonymized and only retain university, programme, level and application direction.",
  "份 PDF 素材已盘点": "PDF materials reviewed",
  "香港、英国、新加坡、美国、澳洲、加拿大": "Hong Kong, UK, Singapore, US, Australia and Canada",
  "本硕": "UG & PG",
  "本科直申与研究生申请并行展示": "Direct undergraduate and postgraduate outcomes",
  "首页精选匿名化案例": "selected anonymized homepage cases",
  "新加坡国立大学中文文化与语言方向研究生 provisional offer，适合展示亚洲顶尖院校文社科申请成果。": "NUS provisional offer for the MA Chinese Culture and Language programme, suitable for demonstrating humanities and social science outcomes at a leading Asian university.",
  "香港科技大学商业分析硕士录取，体现商科、数据分析和港校研究生申请方向的案例储备。": "HKUST MSc Business Analytics admission offer, showing case depth in business, data analytics and Hong Kong postgraduate applications.",
  "香港大学教育学硕士 conditional offer，适合呈现教育、语言、教学与研究兴趣整合型申请。": "HKU Master of Education conditional offer, suitable for education, language, teaching and research-interest based applications.",
  "香港中文大学工程学院硕士 conditional offer，展示工程管理、系统工程和跨学科申请路径。": "CUHK Faculty of Engineering master’s conditional offer, highlighting engineering management, systems engineering and interdisciplinary pathways.",
  "伦敦国王学院经济与政策硕士 conditional offer，适合展示英国 G5/罗素集团方向的文书与背景策略。": "King’s College London Economics and Policy MSc conditional offer, showing UK Russell Group application strategy and background positioning.",
  "哥伦比亚大学企业风险管理方向录取，适合展示美国名校职业导向型研究生申请案例。": "Columbia University Enterprise Risk Management admission, suitable for career-oriented US postgraduate applications.",
  "伦敦大学学院心理学与教育本科 unconditional offer，适合展示英国本科高竞争专业申请结果。": "UCL BSc Psychology with Education unconditional offer, demonstrating a competitive UK undergraduate outcome.",
  "香港理工大学信息与人工智能工程本科 conditional offer，展示工程、AI 与香港本科直申方向。": "PolyU Information and Artificial Intelligence Engineering conditional offer, showing engineering, AI and direct Hong Kong undergraduate applications.",
  "多伦多大学密西沙加校区人文学科本科录取，补足加拿大方向本科申请成果展示。": "University of Toronto Mississauga undergraduate admission in Humanities, adding a Canadian undergraduate outcome.",
  "层级": "Level",
  "方向": "Direction",
  "授课型硕士": "Taught master’s",
  "中文文化、语言与跨文化研究": "Chinese culture, language and cross-cultural studies",
  "商业分析、数据决策、管理科技": "Business analytics, data-driven decisions and management technology",
  "教育学、教学发展、研究动机梳理": "Education, teaching development and research motivation",
  "系统工程、工程管理、技术商业化": "Systems engineering, engineering management and technology commercialization",
  "经济学、公共政策、量化分析": "Economics, public policy and quantitative analysis",
  "研究生项目": "Postgraduate programme",
  "风险管理、金融商业、职业发展": "Risk management, finance, business and career development",
  "本科 Year 1": "Undergraduate Year 1",
  "心理学、教育学、社会科学": "Psychology, education and social sciences",
  "本科四年制": "Four-year undergraduate",
  "信息工程、人工智能、理工科申请": "Information engineering, AI and STEM applications",
  "本科项目": "Undergraduate programme",
  "人文社科、加拿大本科、多地区联申": "Humanities and social sciences, Canadian undergraduate and multi-destination applications",
  "素材中包含录取通知、奖学金文件和申请流程记录；网页仅展示适合公开呈现的结果信息，并已移除学生姓名、申请编号、生日、邮箱、地址、学生 ID、二维码等可识别个人信息。": "The materials include admission notices, scholarship documents and application process records. The website only displays outcome information suitable for public viewing, with names, application numbers, dates of birth, emails, addresses, student IDs, QR codes and other identifiable personal information removed.",
  "查看完整案例筛选": "View Full Case Filters",
  "查看完整案例库": "View Full Case Library",
  "扫码咨询申请方案": "Scan to Discuss an Application Plan",
  "Offer案例": "Offer Cases",
  "港科大商业分析硕士录取案例": "HKUST Business Analytics Master’s Admission Case",
  "围绕数据分析、商业决策和量化背景，整理申请材料中的课程、项目与职业动机表达。": "Organized coursework, projects and career motivation around data analytics, business decisions and quantitative background.",
  "商科与数据方向竞争激烈，需要证明量化能力和清晰职业路径。": "Business and data programmes are highly competitive and require proof of quantitative ability and a clear career direction.",
  "项目经历梳理、文书逻辑重构、港校硕士时间线管理。": "Project experience review, essay logic restructuring and Hong Kong master’s timeline management.",
  "获得 HKUST MSc Business Analytics admission offer。": "Received an HKUST MSc Business Analytics admission offer.",
  "新加坡文社科硕士申请定位": "Singapore Humanities and Social Science Master’s Positioning",
  "从中文文化、语言研究和本科背景中提炼研究兴趣，让跨文化方向申请更聚焦。": "Refined research interests from Chinese culture, language studies and undergraduate background to focus the cross-cultural application direction.",
  "人文社科申请需要把兴趣、课程经历和未来方向连成完整叙事。": "Humanities and social science applications need to connect interests, coursework and future direction into a coherent narrative.",
  "研究动机梳理、课程匹配、材料递交节点跟进。": "Research motivation review, curriculum matching and submission milestone follow-up.",
  "获得 NUS MA Chinese Culture and Language provisional offer。": "Received an NUS MA Chinese Culture and Language provisional offer.",
  "英国本科心理学与教育方向录取": "UK Undergraduate Psychology and Education Offer",
  "围绕心理学兴趣、教育议题和本科专业匹配度，强化 UCAS 申请材料的学术表达。": "Strengthened academic expression in UCAS materials around psychology interests, education topics and subject fit.",
  "高竞争本科专业需要清楚呈现阅读、学科理解和长期兴趣。": "Competitive undergraduate programmes require clear evidence of reading, subject understanding and long-term interest.",
  "专业定位、PS 结构优化、材料提交节奏管理。": "Subject positioning, personal statement structure refinement and submission timeline management.",
  "获得 UCL BSc Psychology with Education unconditional offer。": "Received a UCL BSc Psychology with Education unconditional offer.",
  "澳洲本科商科与经济方向录取": "Australian Undergraduate Business and Economics Offers",
  "多份悉尼大学本科 offer 覆盖 Commerce 与 Economics，为澳洲本科联申提供可复用案例。": "Multiple University of Sydney undergraduate offers cover Commerce and Economics, providing reusable cases for Australian undergraduate applications.",
  "需要在课程选择、入学时间和材料完整性上做清晰规划。": "Clear planning is needed for course selection, intake timing and document completeness.",
  "澳洲院校梯度、专业匹配和 offer 跟进节奏管理。": "Australian university list planning, subject matching and offer follow-up timeline management.",
  "获得 University of Sydney Bachelor of Commerce / Economics offer。": "Received University of Sydney Bachelor of Commerce / Economics offers.",
  "加拿大本科多路径录取展示": "Canadian Undergraduate Multi-Pathway Offers",
  "素材覆盖 UBC Vantage One 到理学本科衔接，以及多伦多大学人文学科方向录取。": "Materials cover UBC Vantage One progression to Bachelor of Science and University of Toronto Humanities admission.",
  "加拿大本科需要兼顾学术成绩、语言准备、校区与专业路径选择。": "Canadian undergraduate planning must balance academics, language preparation, campus choice and programme pathway.",
  "多校区定位、专业路径解释、后续入学与签证材料提醒。": "Multi-campus positioning, programme pathway explanation and follow-up reminders for enrollment and visa materials.",
  "获得 UBC / University of Toronto 本科方向录取案例。": "Received UBC / University of Toronto undergraduate offer cases.",
  "香港本科工程与人工智能方向申请": "Hong Kong Undergraduate Engineering and AI Application",
  "香港理工大学 Information & Artificial Intelligence Engineering offer 展示了理工科本科直申方向。": "The PolyU Information & Artificial Intelligence Engineering offer demonstrates a direct Hong Kong STEM undergraduate application route.",
  "工程与 AI 方向需要同时体现数学、科学课程基础和专业兴趣。": "Engineering and AI applications need to show mathematics, science coursework and genuine subject interest.",
  "课程成绩呈现、理工专业匹配、条件录取后续文件管理。": "Course grade presentation, STEM subject matching and post-offer document management.",
  "获得 PolyU 本科工程类 conditional offer。": "Received a PolyU undergraduate engineering conditional offer."
});

Object.assign(englishTextMap, {
  "图书馆阅览室背景展示": "Library reading room background section",
  "图书馆长廊背景展示": "Library aisle background section",
  "校园外观背景展示": "Campus exterior background section",
  "课堂与学术成长背景展示": "Classroom and academic growth background section",
  "新加坡城市背景展示": "Singapore city background section",
  "欧洲雪山视野背景展示": "European alpine horizon background section",
  "先看见目标校园，": "See the target campus first,",
  "再决定怎么走": "then decide the route",
  "升学规划不是把学校名单堆满，而是帮学生把适合自己的课堂、城市和长期发展放进同一张路线图。": "Admissions planning is not about filling a school list; it is about placing the right classrooms, cities and long-term development into one roadmap.",
  "在图书馆里，": "Inside the library,",
  "在真正的学术空间里，": "Inside a true academic space,",
  "看见长期目标": "see the long-term goal",
  "先把学生放回阅读、课堂和专业兴趣的现场，再判断香港、副学士、本科直申或全球联申哪一条更值得投入。": "We first place the student back into the real context of reading, classrooms and subject interest, then decide whether Hong Kong, associate degree transfer, direct undergraduate admission or global applications deserve the focus.",
  "找到适合的升学路径": "Find the right pathway",
  "不是临时做材料，": "Not last-minute materials,",
  "而是把学术能力做深": "but deeper academic capability",
  "GPA、阅读、面试表达和专业理解需要提前管理。文书只是最后的呈现，长期积累才是申请的底层证据。": "GPA, reading, interview expression and subject understanding need to be managed early. Essays are the final presentation; long-term accumulation is the evidence underneath.",
  "查看学术支持体系": "View academic support",
  "从香港总部出发，": "From the Hong Kong headquarters,",
  "连接亚洲城市机会": "connect Asian city opportunities",
  "连接全球城市机会": "connect global city opportunities",
  "香港路径、港八衔接、新加坡与英国组合，都需要基于学生条件建立优先级，而不是临时追热点。": "Hong Kong pathways, HK8 progression, Singapore and UK combinations all need to be prioritized around the student’s profile, not temporary market noise.",
  "香港路径、港八衔接、新加坡、英国和更多全球城市组合，都需要基于学生条件建立优先级，而不是临时追热点。": "Hong Kong pathways, HK8 progression, Singapore, the UK and wider global city options all need to be prioritized around the student’s profile, not temporary market noise.",
  "查看地区策略": "View destination strategy",
  "把申请视野，": "Place the application horizon",
  "放到更远的山线之外": "beyond the farther ridgeline",
  "无论目标是香港、英国、新加坡、美国还是欧洲，好的申请都应该服务于学生未来想进入的课堂、行业和城市。": "Whether the target is Hong Kong, the UK, Singapore, the US or Europe, a strong application should serve the classrooms, industries and cities the student hopes to enter.",
  "查看全球案例库": "View global cases",
  "全球学术视野画廊": "Global academic horizons gallery",
  "美国校园、英国学院、伦敦学术区、香港城市与欧洲文化远景": "US campus, British college, London academic district, Hong Kong city and European cultural horizon",
  "把国际视野，落到真实的学习场景里": "Ground global vision in real learning environments",
  "这些画面不是为了堆风景，而是帮助家庭理解申请背后的真实目标：学生未来会进入怎样的校园、课堂、城市和文化环境。": "These visuals are not scenery for its own sake. They help families understand the real goals behind an application: the campus, classrooms, cities and cultural environments students may enter.",
  "红砖学院式校园草坪与学术建筑": "Red-brick collegiate lawn and academic buildings",
  "红砖校园与开放草坪": "Red-Brick Campus and Open Lawns",
  "适合讲本科目标、学术氛围和长期成长路线。": "A visual anchor for undergraduate goals, academic atmosphere and long-term growth routes.",
  "英国学院式庭院、拱廊与阅读氛围": "British collegiate courtyard, cloisters and reading atmosphere",
  "学院庭院与阅读传统": "College Courtyards and Reading Traditions",
  "用于承接牛剑、G5 与高阶学术准备叙事。": "Supports the story around Oxbridge, G5 and advanced academic preparation.",
  "伦敦学术区风格建筑与安静城市广场": "London academic district-style buildings and quiet urban square",
  "都市学术区与专业机会": "Urban Academic Districts and Professional Opportunity",
  "连接专业选择、实习资源和研究生申请方向。": "Connects subject choice, internship resources and postgraduate application direction.",
  "香港维港城市天际线与海湾": "Hong Kong Victoria Harbour skyline and bay",
  "香港总部与亚洲枢纽": "Hong Kong Headquarters and Asian Hub",
  "把港八衔接、港校本科和多地区联申放在同一张路线图里。": "Places HK8 progression, Hong Kong undergraduate routes and multi-destination applications into one roadmap.",
  "欧洲山地、历史建筑与文化远景": "European mountains, historic architecture and cultural horizon",
  "欧洲文化远景": "European Cultural Horizon",
  "作为少量点缀，补足全球申请视野与文化理解。": "Used as a restrained accent to extend global application vision and cultural understanding.",
  "10分钟路径诊断": "10-Minute Pathway Diagnosis",
  "家长最常问的第一步": "The first question families usually ask",
  "服务方案": "Services",
  "查看服务方案": "View Services",
  "香港总部升学规划：副学士升本科、GPA 管理、本科与硕博申请": "Hong Kong-based admissions planning: associate degree transfer, GPA management, undergraduate and postgraduate applications",
  "先做学生背景画像，再把目标地区、院校梯度、成绩风险、文书材料、导师辅导和申请节点放进同一张路线图，帮助家庭知道下一步该做什么。": "We first build a student profile, then place target destinations, university tiers, grade risks, application materials, mentor support and deadlines into one roadmap so families know what to do next.",
  "谁适合先咨询": "Who Should Start",
  "高考后 / AD / 本科 / 硕博": "Post-Gaokao / AD / Undergraduate / Postgraduate",
  "先判断学生处于哪个申请阶段，再决定香港、英国、新加坡或全球联申的优先级。": "Identify the student’s current stage first, then decide the priority of Hong Kong, UK, Singapore or global applications.",
  "咨询会看什么": "What We Review",
  "成绩 · 语言 · 专业 · 时间线": "Grades · Language · Subject · Timeline",
  "把 GPA、课程体系、目标专业和申请截止时间拆成可跟进的行动项。": "Turn GPA, curriculum, target subject and deadlines into trackable action items.",
  "如何降低不确定性": "How We Reduce Uncertainty",
  "冲刺 / 匹配 / 稳妥 / 备选": "Reach / Match / Safer / Backup",
  "不只押单一路径，而是围绕学生条件建立多地区、多梯度申请组合。": "We do not rely on one route only; we build multi-destination and multi-tier options around the student’s profile.",
  "为重视长期规划的家庭建立更清晰、更有胜算的全球升学路径": "Clearer, more strategic global admissions pathways for families planning ahead",
  "以香港为战略支点，结合国际院校资源、学术导师体系与申请路径管理，把本科、研究生、副学士衔接、GPA 管理和背景提升统一成一张可执行路线图。": "With Hong Kong as the strategic base, we combine international university resources, academic mentors and pathway management into one executable roadmap across undergraduate, postgraduate, associate degree transfer, GPA management and profile development.",
  "多地区组合策略": "Multi-Destination Strategy",
  "香港 / 英国 / 新加坡 / 全球组合": "Hong Kong / UK / Singapore / Global combinations",
  "Offer 成功案例库": "Offer Success Cases",
  "从背景到行动清单": "From student profile to action checklist",
  "看清谁来支持学术与申请": "See who supports academics and applications",
  "背景画像": "Student Profile",
  "梳理学生背景、目标地区和申请阶段，形成清晰可执行的升学路线图。": "Review the student profile, target destinations and application stage to create a clear and actionable admissions roadmap.",
  "地区组合": "Destination Stack",
  "选择香港、副学士、本科直申、研究生或多地区联申的优先顺序。": "Prioritize Hong Kong, associate degree, direct undergraduate, postgraduate or multi-destination routes.",
  "关键节点": "Execution Window",
  "确认考试、文书、材料、面试、Offer 跟进和入学衔接节点。": "Clarify milestones for tests, essays, documents, interviews, offer follow-up and enrollment transition.",
  "阶段复盘": "Advisory Rhythm",
  "顾问、导师、学生和家长围绕同一份进度表推进。": "Advisors, mentors, students and families work from the same progress map.",
  "从目标到录取，路径更清晰": "Clearer Routes From Goals to Offers",
  "围绕本科、研究生、副学士衔接与 GPA 提升，Rain Education 帮助学生明确申请方向、规划关键节点，并连接合适的顾问与学术导师支持。": "Across undergraduate, postgraduate, associate degree transfer and GPA improvement plans, Rain Education helps students clarify direction, plan key milestones and connect with suitable advisors and academic mentors.",
  "从这里快速进入 Rain Education 的核心能力": "Explore Rain Education’s Core Support Areas",
  "升学服务方案": "Admissions Service Plans",
  "本科、研究生、副学士、GPA 管理与 G5 规划。": "Undergraduate, postgraduate, associate degree, GPA management and G5 planning.",
  "了解服务方案": "Explore Services",
  "成功案例库": "Success Case Library",
  "匿名化 Offer、地区成果和申请路径说明。": "Anonymized offers, destination outcomes and pathway notes.",
  "查看案例库": "View Case Library",
  "导师与顾问体系": "Mentor & Advisor System",
  "学术导师、升学顾问和阶段反馈机制。": "Academic mentors, admissions advisors and stage review mechanisms.",
  "查看导师团队": "View Mentor Team",
  "立即做初步判断": "Start an Initial Review",
  "发送成绩、年级、目标地区，先判断路径。": "Send grades, current year and target destinations for an initial pathway view.",
  "扫码或提交评估": "Scan or Submit Assessment",
  "Offer 结果材料": "Offer Outcome Materials",
  "案例页展示已匿名化 offer 摘录，并保留申请结果与服务边界说明。": "The case page shows anonymized offer excerpts with outcome notes and service boundaries.",
  "导师履历依据": "Mentor Profile Basis",
  "导师信息按已提供 CV 与专业方向整理，适配数学、AI、艺术、商科、GPA 等需求。": "Mentor information is organized from provided CVs and subject areas, matching needs such as mathematics, AI, art, business and GPA support.",
  "服务协议边界": "Service Agreement Boundaries",
  "不承诺保证录取，服务范围、责任和费用以正式协议及服务说明为准。": "No admission result is guaranteed. Scope, responsibilities and fees are subject to formal agreements and service notes.",
  "查看服务说明": "View Service Notes",
  "案例故事路径": "Case Story Pathways",
  "高考后转向香港副学士，再用 GPA 争取本科衔接": "From post-Gaokao planning to Hong Kong associate degree transfer through GPA management",
  "学生不只需要“申请到一个项目”，更需要知道入读后如何选课、如何维持 GPA、何时准备本科转入材料。": "Students need more than admission to a programme; they need course planning, GPA management and transfer preparation after enrollment.",
  "本科背景分散时，先把硕士申请叙事重新搭起来": "When undergraduate experience is scattered, rebuild the postgraduate application narrative first",
  "很多学生不是没有经历，而是课程、实习、研究兴趣和职业目标没有形成清晰主线。": "Many students do have experiences, but coursework, internships, research interests and career goals need a clearer thread.",
  "低 GPA 不只补文书，更要解释风险来源和补强证据": "Low GPA cases need risk diagnosis and supporting evidence, not just essay polish",
  "成绩短板需要被诊断：是课程选择、学习方法、时间线还是专业匹配问题，再决定补强动作。": "Grade weaknesses must be diagnosed first: course choices, study methods, timeline or subject fit, before deciding the strengthening actions.",
  "需求诊断": "Needs Diagnosis",
  "先确认学生要解决的是 GPA、笔试、面试、作品集、科研还是申请叙事问题。": "First clarify whether the student needs help with GPA, tests, interviews, portfolio, research or application narrative.",
  "导师匹配": "Mentor Matching",
  "按学科方向、申请阶段和沟通方式匹配合适导师，并与顾问方案保持一致。": "Match mentors by subject area, application stage and communication needs, aligned with the advisor plan.",
  "阶段交付": "Stage Deliverables",
  "围绕课程表现、材料进度、练习反馈和下一步任务进行阶段复盘。": "Review course performance, material progress, practice feedback and next tasks by stage.",
  "家长反馈": "Family Feedback",
  "把关键风险和进展讲清楚，让家庭能判断时间、费用和申请选择。": "Clarify key risks and progress so families can judge timing, budget and application choices.",
  "家长常搜索的问题，我们拆成清晰专题": "Common parent search questions, organized into clear topic pages",
  "不同家庭进入官网时关心的问题不一样：首页负责快速判断方向，专题页负责解释路径、服务边界和下一步行动。": "Different families arrive with different questions. The homepage helps them orient quickly, while topic pages explain pathways, boundaries and next actions.",
  "香港升学": "Hong Kong Pathways",
  "高考后去香港读副学士，之后怎样升本科？": "After Gaokao, how does a Hong Kong associate degree lead to undergraduate transfer?",
  "进入副学士专题": "Open Associate Degree Guide",
  "研究生申请": "Postgraduate Applications",
  "香港、英国、新加坡硕士申请如何定位专业？": "How should Hong Kong, UK and Singapore master’s applications be positioned?",
  "进入硕博专题": "Open Postgraduate Guide",
  "学业风险": "Academic Risk",
  "GPA 偏低还能申请名校吗？需要先补什么？": "Can students with a lower GPA still apply to top universities, and what should be strengthened first?",
  "进入 GPA 专题": "Open GPA Guide",
  "案例判断": "Case Matching",
  "和我背景相似的学生，通常走什么路径？": "What routes do students with similar backgrounds usually take?"
});

const englishTermMap = [
  ["香港瑞恩国际教育集团", "Hong Kong Rain International Education Group"],
  ["升学规划", "pathway planning"],
  ["申请支持", "application support"],
  ["申请规划", "application planning"],
  ["申请策略", "application strategy"],
  ["申请材料", "application materials"],
  ["院校定位", "university positioning"],
  ["专业选择", "subject selection"],
  ["专业方向", "subject direction"],
  ["副学士", "associate degree"],
  ["本科", "undergraduate"],
  ["硕士", "master’s"],
  ["博士", "doctoral"],
  ["高考", "Gaokao"],
  ["香港", "Hong Kong"],
  ["英国", "United Kingdom"],
  ["新加坡", "Singapore"],
  ["全球", "global"],
  ["名校", "top universities"],
  ["课程", "course"],
  ["文书", "essays"],
  ["面试", "interviews"],
  ["笔试", "admissions tests"],
  ["背景提升", "profile building"],
  ["标化", "standardized tests"],
  ["语言成绩", "language scores"],
  ["个人陈述", "personal statement"],
  ["推荐信", "recommendation letters"],
  ["学术", "academic"],
  ["导师", "mentor"],
  ["顾问", "advisor"],
  ["学生", "student"],
  ["家长", "parents"],
  ["目标", "target"],
  ["服务", "service"],
  ["规划", "planning"],
  ["评估", "assessment"],
  ["咨询", "consultation"],
  ["路径", "pathway"],
  ["管理", "management"],
  ["支持", "support"],
  ["材料", "materials"],
  ["提升", "improvement"],
  ["准备", "preparation"],
  ["辅导", "coaching"],
  ["训练", "training"],
  ["方案", "plan"],
  ["方向", "direction"]
];

const traditionalPhraseMap = {
  "香港瑞恩国际教育集团": "香港瑞恩國際教育集團",
  "Elite Admissions & Academic Consulting": "Elite Admissions & Academic Consulting",
  "什么": "什麼",
  "怎么": "怎麼"
};

const traditionalPostPhraseMap = {
  "專註": "專注",
  "規划": "規劃",
  "計划": "計劃",
  "策划": "策劃",
  "聯系": "聯繫",
  "聯系": "聯繫",
  "咨詢": "諮詢",
  "文本": "文本",
  "項目": "項目",
  "裏程": "里程"
};

const simplifiedToTraditionalMap = {
  "与": "與", "业": "業", "专": "專", "东": "東", "个": "個", "临": "臨", "为": "為", "义": "義",
  "乌": "烏", "乐": "樂", "习": "習", "书": "書", "买": "買", "争": "爭", "于": "於", "云": "雲",
  "亚": "亞", "产": "產", "亩": "畝", "亲": "親", "亿": "億", "仅": "僅", "从": "從", "仓": "倉",
  "仪": "儀", "们": "們", "价": "價", "众": "眾", "优": "優", "会": "會", "传": "傳", "伞": "傘",
  "伟": "偉", "伦": "倫", "伪": "偽", "体": "體", "余": "餘", "佣": "傭", "侠": "俠", "侣": "侶",
  "侥": "僥", "侦": "偵", "侧": "側", "侨": "僑", "侩": "儈", "侪": "儕", "侬": "儂", "俣": "俁",
  "俦": "儔", "俨": "儼", "俩": "倆", "俪": "儷", "俭": "儉", "债": "債", "倾": "傾", "偬": "傯",
  "偻": "僂", "偿": "償", "储": "儲", "儿": "兒", "兑": "兌", "党": "黨", "兰": "蘭", "关": "關",
  "兴": "興", "养": "養", "兽": "獸", "内": "內", "冈": "岡", "册": "冊", "写": "寫", "军": "軍",
  "农": "農", "冯": "馮", "冲": "衝", "决": "決", "况": "況", "冻": "凍", "净": "淨", "准": "準",
  "凉": "涼", "减": "減", "凑": "湊", "几": "幾", "凤": "鳳", "凭": "憑", "凯": "凱", "击": "擊",
  "凿": "鑿", "刘": "劉", "则": "則", "刚": "剛", "创": "創", "删": "刪", "别": "別", "刬": "剗",
  "刭": "剄", "剂": "劑", "剐": "剮", "剑": "劍", "剥": "剝", "剧": "劇", "剩": "剩", "办": "辦",
  "务": "務", "劝": "勸", "动": "動", "励": "勵", "劲": "勁", "劳": "勞", "势": "勢", "勋": "勳",
  "匀": "勻", "区": "區", "医": "醫", "华": "華", "协": "協", "单": "單", "卖": "賣", "卢": "盧",
  "卫": "衛", "却": "卻", "厂": "廠", "厅": "廳", "历": "歷", "厉": "厲", "压": "壓", "厌": "厭",
  "厕": "廁", "厢": "廂", "厦": "廈", "县": "縣", "参": "參", "双": "雙", "发": "發", "变": "變",
  "叙": "敘", "叠": "疊", "叶": "葉", "号": "號", "叹": "嘆", "叽": "嘰", "吁": "籲", "后": "後",
  "向": "向", "吓": "嚇", "吕": "呂", "吗": "嗎", "听": "聽", "启": "啟", "吴": "吳", "呐": "吶",
  "员": "員", "呗": "唄", "呙": "咼", "呛": "嗆", "呜": "嗚", "咏": "詠", "咙": "嚨", "咛": "嚀",
  "咝": "噝", "咤": "吒", "咨": "諮", "咸": "鹹", "响": "響", "哑": "啞", "哒": "噠", "哓": "嘵",
  "哗": "嘩", "哙": "噲", "哜": "嚌", "哝": "噥", "哟": "喲", "唤": "喚", "唬": "嚇", "啧": "嘖",
  "啬": "嗇", "啭": "囀", "啮": "嚙", "啰": "囉", "啸": "嘯", "喷": "噴", "喽": "嘍", "嗫": "囁",
  "嗳": "噯", "嘘": "噓", "嘤": "嚶", "嘱": "囑", "噜": "嚕", "嚣": "囂", "团": "團", "园": "園",
  "围": "圍", "国": "國", "图": "圖", "圆": "圓", "圣": "聖", "场": "場", "坏": "壞", "块": "塊",
  "坚": "堅", "坛": "壇", "坜": "壢", "坝": "壩", "坞": "塢", "坟": "墳", "坠": "墜", "垄": "壟",
  "垅": "壟", "垆": "壚", "垒": "壘", "垦": "墾", "垩": "堊", "垫": "墊", "垭": "埡", "垱": "壋",
  "垲": "塏", "垴": "堖", "埘": "塒", "埙": "塤", "埚": "堝", "埯": "垵", "堑": "塹", "堕": "墮",
  "墙": "牆", "壮": "壯", "声": "聲", "壳": "殼", "处": "處", "备": "備", "复": "複", "够": "夠",
  "头": "頭", "夹": "夾", "夺": "奪", "奋": "奮", "奖": "獎", "奥": "奧", "妆": "妝", "妇": "婦",
  "妈": "媽", "妩": "嫵", "妪": "嫗", "姗": "姍", "姜": "薑", "娱": "娛", "娄": "婁", "娅": "婭",
  "娆": "嬈", "娇": "嬌", "娈": "孌", "娱": "娛", "婴": "嬰", "婵": "嬋", "婶": "嬸", "媪": "媼",
  "嫒": "嬡", "嫔": "嬪", "嫱": "嬙", "嬷": "嬤", "孙": "孫", "学": "學", "孪": "孿", "宁": "寧",
  "宝": "寶", "实": "實", "宠": "寵", "审": "審", "宪": "憲", "宫": "宮", "宽": "寬", "宾": "賓",
  "寝": "寢", "对": "對", "寻": "尋", "导": "導", "寿": "壽", "将": "將", "尔": "爾", "尘": "塵",
  "尝": "嘗", "尧": "堯", "尸": "屍", "尽": "盡", "层": "層", "屉": "屜", "属": "屬", "屡": "屢",
  "岁": "歲", "岂": "豈", "岗": "崗", "岛": "島", "岭": "嶺", "岳": "嶽", "峡": "峽", "峣": "嶢",
  "峤": "嶠", "峥": "崢", "峦": "巒", "崂": "嶗", "崃": "崍", "崄": "嶮", "嵘": "嶸", "嵚": "嶔",
  "巅": "巔", "巩": "鞏", "巯": "巰", "币": "幣", "帅": "帥", "师": "師", "帐": "帳", "帘": "簾",
  "帜": "幟", "带": "帶", "帧": "幀", "帮": "幫", "帱": "幬", "帻": "幘", "帼": "幗", "幂": "冪",
  "庄": "莊", "庆": "慶", "庐": "廬", "库": "庫", "应": "應", "庙": "廟", "庞": "龐", "废": "廢",
  "广": "廣", "开": "開", "异": "異", "弃": "棄", "张": "張", "弥": "彌", "弦": "弦", "弯": "彎",
  "弹": "彈", "强": "強", "归": "歸", "当": "當", "录": "錄", "彝": "彞", "彦": "彥", "彻": "徹",
  "径": "徑", "徕": "徠", "忆": "憶", "忧": "憂", "忾": "愾", "怀": "懷", "态": "態", "怂": "慫",
  "怃": "憮", "怄": "慪", "怅": "悵", "怆": "愴", "怜": "憐", "总": "總", "怼": "懟", "怿": "懌",
  "恋": "戀", "恒": "恆", "恳": "懇", "恶": "惡", "恸": "慟", "恹": "懨", "恺": "愷", "恻": "惻",
  "恼": "惱", "恽": "惲", "悦": "悅", "悬": "懸", "悭": "慳", "悯": "憫", "惊": "驚", "惧": "懼",
  "惨": "慘", "惩": "懲", "惫": "憊", "惬": "愜", "惭": "慚", "惮": "憚", "惯": "慣", "愠": "慍",
  "愤": "憤", "愿": "願", "慑": "懾", "懑": "懣", "懒": "懶", "戆": "戇", "戏": "戲", "战": "戰",
  "户": "戶", "扎": "紮", "扑": "撲", "执": "執", "扩": "擴", "扪": "捫", "扫": "掃", "扬": "揚",
  "扰": "擾", "抚": "撫", "抛": "拋", "抟": "摶", "抠": "摳", "抡": "掄", "抢": "搶", "护": "護",
  "报": "報", "担": "擔", "拟": "擬", "拢": "攏", "拣": "揀", "拥": "擁", "拦": "攔", "拧": "擰",
  "拨": "撥", "择": "擇", "挂": "掛", "挚": "摯", "挛": "攣", "挜": "掗", "挝": "撾", "挞": "撻",
  "挟": "挾", "挠": "撓", "挡": "擋", "挣": "掙", "挤": "擠", "挥": "揮", "挦": "撏", "捞": "撈",
  "损": "損", "捡": "撿", "换": "換", "捣": "搗", "据": "據", "掳": "擄", "掴": "摑", "掷": "擲",
  "掸": "撣", "掺": "摻", "揽": "攬", "揿": "撳", "搀": "攙", "搁": "擱", "搂": "摟", "搅": "攪",
  "携": "攜", "摄": "攝", "摅": "攄", "摆": "擺", "摇": "搖", "摈": "擯", "摊": "攤", "撄": "攖",
  "撑": "撐", "撵": "攆", "撷": "擷", "撸": "擼", "撺": "攛", "擞": "擻", "攒": "攢", "敌": "敵",
  "敛": "斂", "数": "數", "斋": "齋", "斓": "斕", "斗": "鬥", "斩": "斬", "断": "斷", "无": "無",
  "旧": "舊", "时": "時", "旷": "曠", "昆": "崑", "昙": "曇", "昵": "暱", "昼": "晝", "显": "顯",
  "晋": "晉", "晒": "曬", "晓": "曉", "晔": "曄", "晕": "暈", "暂": "暫", "术": "術", "机": "機",
  "杀": "殺", "杂": "雜", "权": "權", "杆": "桿", "条": "條", "来": "來", "杨": "楊", "杰": "傑",
  "极": "極", "构": "構", "枞": "樅", "枢": "樞", "枣": "棗", "枪": "槍", "枫": "楓", "枭": "梟",
  "柜": "櫃", "柠": "檸", "查": "查", "栀": "梔", "栅": "柵", "标": "標", "栈": "棧", "栉": "櫛",
  "栋": "棟", "栌": "櫨", "栎": "櫟", "栏": "欄", "树": "樹", "栖": "棲", "样": "樣", "栾": "欒",
  "桠": "椏", "桡": "橈", "桢": "楨", "档": "檔", "桤": "榿", "桥": "橋", "桦": "樺", "桧": "檜",
  "桨": "槳", "桩": "樁", "梦": "夢", "梼": "檮", "梾": "棶", "检": "檢", "棂": "欞", "椁": "槨",
  "椟": "櫝", "椠": "槧", "椤": "欏", "椭": "橢", "楼": "樓", "榄": "欖", "榇": "櫬", "榈": "櫚",
  "榉": "櫸", "槚": "檟", "槛": "檻", "槟": "檳", "横": "橫", "樯": "檣", "樱": "櫻", "橥": "櫫",
  "橱": "櫥", "橹": "櫓", "橼": "櫞", "檩": "檁", "欢": "歡", "欧": "歐", "歼": "殲", "殁": "歿",
  "残": "殘", "殒": "殞", "殓": "殮", "殚": "殫", "殡": "殯", "殴": "毆", "毁": "毀", "毂": "轂",
  "毕": "畢", "毙": "斃", "毡": "氈", "气": "氣", "氢": "氫", "氩": "氬", "氲": "氳", "汇": "匯",
  "汉": "漢", "汤": "湯", "沟": "溝", "没": "沒", "沣": "灃", "沤": "漚", "沥": "瀝", "沦": "淪",
  "沧": "滄", "沪": "滬", "泞": "濘", "注": "註", "泪": "淚", "泶": "澩", "泷": "瀧", "泸": "瀘",
  "泺": "濼", "泻": "瀉", "泼": "潑", "泽": "澤", "洁": "潔", "洒": "灑", "洼": "窪", "浃": "浹",
  "浅": "淺", "浆": "漿", "浇": "澆", "浈": "湞", "浊": "濁", "测": "測", "济": "濟", "浏": "瀏",
  "浐": "滻", "浑": "渾", "浒": "滸", "浓": "濃", "浔": "潯", "涛": "濤", "涝": "澇", "涞": "淶",
  "涟": "漣", "涠": "潿", "涡": "渦", "涢": "溳", "涣": "渙", "涤": "滌", "润": "潤", "涧": "澗",
  "涨": "漲", "涩": "澀", "渊": "淵", "渌": "淥", "渍": "漬", "渎": "瀆", "渐": "漸", "渑": "澠",
  "渔": "漁", "渖": "瀋", "渗": "滲", "温": "溫", "游": "遊", "湾": "灣", "湿": "濕", "溃": "潰",
  "溅": "濺", "溆": "漵", "滗": "潷", "滚": "滾", "滞": "滯", "滟": "灩", "滠": "灄", "满": "滿",
  "滢": "瀅", "滤": "濾", "滥": "濫", "滦": "灤", "滨": "濱", "滩": "灘", "滪": "澦", "漤": "灠",
  "潆": "瀠", "潇": "瀟", "潋": "瀲", "潍": "濰", "潜": "潛", "潴": "瀦", "澜": "瀾", "濑": "瀨",
  "灏": "灝", "灭": "滅", "灯": "燈", "灵": "靈", "灾": "災", "灿": "燦", "炀": "煬", "炉": "爐",
  "炖": "燉", "炜": "煒", "炝": "熗", "点": "點", "炼": "煉", "炽": "熾", "烁": "爍", "烂": "爛",
  "烃": "烴", "烛": "燭", "烟": "煙", "烦": "煩", "烧": "燒", "烨": "燁", "烩": "燴", "烫": "燙",
  "热": "熱", "焕": "煥", "焖": "燜", "焘": "燾", "煅": "煆", "爱": "愛", "爷": "爺", "牍": "牘",
  "牵": "牽", "牺": "犧", "犊": "犢", "状": "狀", "犷": "獷", "犸": "獁", "犹": "猶", "狈": "狽",
  "狝": "獮", "狞": "獰", "独": "獨", "狭": "狹", "狮": "獅", "狯": "獪", "狰": "猙", "狱": "獄",
  "猎": "獵", "猕": "獼", "猡": "玀", "猪": "豬", "猫": "貓", "献": "獻", "獭": "獺", "玑": "璣",
  "玛": "瑪", "玮": "瑋", "环": "環", "现": "現", "玱": "瑲", "玺": "璽", "珐": "琺", "珑": "瓏",
  "珰": "璫", "珲": "琿", "琏": "璉", "琐": "瑣", "琼": "瓊", "瑶": "瑤", "瑷": "璦", "璎": "瓔",
  "瓒": "瓚", "瓯": "甌", "电": "電", "画": "畫", "畅": "暢", "畴": "疇", "疖": "癤", "疗": "療",
  "疟": "瘧", "疠": "癘", "疡": "瘍", "疬": "癧", "疮": "瘡", "疯": "瘋", "疱": "皰", "疴": "痾",
  "痈": "癰", "痉": "痙", "痒": "癢", "痖": "瘂", "痨": "癆", "痪": "瘓", "痫": "癇", "瘅": "癉",
  "瘗": "瘞", "瘘": "瘻", "瘪": "癟", "瘫": "癱", "瘾": "癮", "瘿": "癭", "癞": "癩", "癣": "癬",
  "皱": "皺", "皲": "皸", "盏": "盞", "盐": "鹽", "监": "監", "盖": "蓋", "盗": "盜", "盘": "盤",
  "眍": "瞘", "眦": "眥", "眬": "矓", "着": "著", "睁": "睜", "睐": "睞", "睑": "瞼", "瞒": "瞞",
  "瞩": "矚", "矫": "矯", "矶": "磯", "矿": "礦", "砀": "碭", "码": "碼", "砖": "磚", "砗": "硨",
  "砚": "硯", "砜": "碸", "砺": "礪", "砻": "礱", "砾": "礫", "础": "礎", "硕": "碩", "硖": "硤",
  "硗": "磽", "硙": "磑", "碍": "礙", "碛": "磧", "碜": "磣", "礼": "禮", "祎": "禕", "祢": "禰",
  "祯": "禎", "祷": "禱", "祸": "禍", "禀": "稟", "禄": "祿", "离": "離", "秃": "禿", "秆": "稈",
  "种": "種", "积": "積", "称": "稱", "秽": "穢", "秾": "穠", "稆": "穭", "税": "稅", "稣": "穌",
  "稳": "穩", "穑": "穡", "穷": "窮", "窃": "竊", "窍": "竅", "窎": "窵", "窑": "窯", "窜": "竄",
  "窝": "窩", "窥": "窺", "窦": "竇", "窭": "窶", "竖": "豎", "竞": "競", "笃": "篤", "笋": "筍",
  "笔": "筆", "笕": "筧", "笺": "箋", "笼": "籠", "笾": "籩", "筑": "築", "筚": "篳", "筛": "篩",
  "筜": "簹", "筝": "箏", "筹": "籌", "签": "簽", "简": "簡", "箓": "籙", "箦": "簀", "箧": "篋",
  "箨": "籜", "箩": "籮", "箪": "簞", "箫": "簫", "篑": "簣", "篮": "籃", "篱": "籬", "簖": "籪",
  "籁": "籟", "籴": "糴", "类": "類", "籼": "秈", "粜": "糶", "粝": "糲", "粤": "粵", "粪": "糞",
  "粮": "糧", "糁": "糝", "糇": "餱", "糌": "糍", "糍": "糍", "糨": "糨", "系": "系", "紧": "緊",
  "絷": "縶", "纟": "糹", "纠": "糾", "纡": "紆", "红": "紅", "纣": "紂", "纤": "纖", "纥": "紇",
  "约": "約", "级": "級", "纨": "紈", "纩": "纊", "纪": "紀", "纫": "紉", "纬": "緯", "纭": "紜",
  "纯": "純", "纰": "紕", "纱": "紗", "纲": "綱", "纳": "納", "纵": "縱", "纶": "綸", "纷": "紛",
  "纸": "紙", "纹": "紋", "纺": "紡", "纽": "紐", "纾": "紓", "线": "線", "绀": "紺", "绁": "紲",
  "绂": "紱", "练": "練", "组": "組", "绅": "紳", "细": "細", "织": "織", "终": "終", "绉": "縐",
  "绊": "絆", "绋": "紼", "绌": "絀", "绍": "紹", "绎": "繹", "经": "經", "绑": "綁", "绒": "絨",
  "结": "結", "绔": "絝", "绕": "繞", "绗": "絎", "绘": "繪", "给": "給", "绚": "絢", "绛": "絳",
  "络": "絡", "绝": "絕", "绞": "絞", "统": "統", "绠": "綆", "绡": "綃", "绢": "絹", "绣": "繡",
  "绥": "綏", "绦": "縧", "继": "繼", "绩": "績", "绪": "緒", "绫": "綾", "续": "續", "绮": "綺",
  "绯": "緋", "绰": "綽", "绱": "緔", "绲": "緄", "绳": "繩", "维": "維", "绵": "綿", "绶": "綬",
  "绷": "繃", "绸": "綢", "绹": "綯", "绺": "綹", "绻": "綣", "综": "綜", "绽": "綻", "绾": "綰",
  "绿": "綠", "缀": "綴", "缁": "緇", "缂": "緙", "缃": "緗", "缄": "緘", "缅": "緬", "缆": "纜",
  "缇": "緹", "缈": "緲", "缉": "緝", "缊": "縕", "缋": "繢", "缌": "緦", "缍": "綞", "缎": "緞",
  "缏": "緶", "缑": "緱", "缒": "縋", "缓": "緩", "缔": "締", "缕": "縷", "编": "編", "缗": "緡",
  "缘": "緣", "缙": "縉", "缚": "縛", "缛": "縟", "缜": "縝", "缝": "縫", "缟": "縞", "缠": "纏",
  "缡": "縭", "缢": "縊", "缣": "縑", "缤": "繽", "缥": "縹", "缦": "縵", "缧": "縲", "缨": "纓",
  "缩": "縮", "缪": "繆", "缫": "繅", "缬": "纈", "缭": "繚", "缮": "繕", "缯": "繒", "缰": "韁",
  "缴": "繳", "缵": "纘", "罂": "罌", "网": "網", "罗": "羅", "罚": "罰", "罢": "罷", "羁": "羈",
  "羟": "羥", "羡": "羨", "翘": "翹", "耸": "聳", "耻": "恥", "聂": "聶", "职": "職", "联": "聯",
  "聩": "聵", "聪": "聰", "肃": "肅", "肠": "腸", "肤": "膚", "肾": "腎", "肿": "腫", "胀": "脹",
  "胁": "脅", "胆": "膽", "胜": "勝", "胧": "朧", "胨": "腖", "胪": "臚", "胫": "脛", "胶": "膠",
  "脉": "脈", "脍": "膾", "脏": "髒", "脑": "腦", "脓": "膿", "脔": "臠", "脚": "腳", "脱": "脫",
  "脸": "臉", "腊": "臘", "腘": "膕", "腻": "膩", "腼": "靦", "腽": "膃", "腾": "騰", "膑": "臏",
  "臜": "臢", "舆": "輿", "舣": "艤", "舰": "艦", "舱": "艙", "舻": "艫", "艰": "艱", "艳": "艷",
  "艺": "藝", "节": "節", "芈": "羋", "芗": "薌", "芜": "蕪", "苁": "蓯", "苇": "葦", "苈": "藶",
  "苋": "莧", "苌": "萇", "苍": "蒼", "苎": "苧", "苏": "蘇", "苹": "蘋", "茎": "莖", "茏": "蘢",
  "茑": "蔦", "茔": "塋", "茕": "煢", "茧": "繭", "荆": "荊", "荐": "薦", "荙": "薘", "荚": "莢",
  "荛": "蕘", "荜": "蓽", "荞": "蕎", "荟": "薈", "荠": "薺", "荡": "蕩", "荣": "榮", "荤": "葷",
  "荥": "滎", "荦": "犖", "荧": "熒", "荨": "蕁", "荩": "藎", "荪": "蓀", "荫": "蔭", "荬": "蕒",
  "荭": "葒", "荮": "葤", "药": "藥", "莅": "蒞", "莱": "萊", "莲": "蓮", "莳": "蒔", "莴": "萵",
  "莶": "薟", "获": "獲", "莸": "蕕", "莹": "瑩", "莺": "鶯", "莼": "蓴", "萝": "蘿", "萤": "螢",
  "营": "營", "萦": "縈", "萧": "蕭", "萨": "薩", "葱": "蔥", "蒇": "蕆", "蒉": "蕢", "蒋": "蔣",
  "蒌": "蔞", "蓝": "藍", "蓟": "薊", "蓠": "蘺", "蓣": "蕷", "蓥": "鎣", "蓦": "驀", "蔷": "薔",
  "蔹": "蘞", "蔺": "藺", "蔼": "藹", "蕰": "薀", "蕲": "蘄", "蕴": "蘊", "薮": "藪", "藓": "蘚",
  "蘖": "櫱", "虏": "虜", "虑": "慮", "虚": "虛", "虫": "蟲", "虬": "虯", "虮": "蟣", "虽": "雖",
  "虾": "蝦", "虿": "蠆", "蚀": "蝕", "蚁": "蟻", "蚂": "螞", "蚕": "蠶", "蚝": "蠔", "蚬": "蜆",
  "蛊": "蠱", "蛎": "蠣", "蛏": "蟶", "蛮": "蠻", "蛰": "蟄", "蛱": "蛺", "蛲": "蟯", "蛳": "螄",
  "蛴": "蠐", "蜕": "蛻", "蜗": "蝸", "蜡": "蠟", "蝇": "蠅", "蝈": "蟈", "蝉": "蟬", "蝼": "螻",
  "蝾": "蠑", "螀": "螿", "螨": "蟎", "蟏": "蠨", "衅": "釁", "衔": "銜", "补": "補", "衬": "襯",
  "衮": "袞", "袄": "襖", "袅": "裊", "袜": "襪", "袭": "襲", "装": "裝", "裆": "襠", "裢": "褳",
  "裣": "襝", "裤": "褲", "裥": "襇", "褛": "褸", "褴": "襤", "见": "見", "观": "觀", "规": "規",
  "觅": "覓", "视": "視", "览": "覽", "觉": "覺", "觊": "覬", "觋": "覡", "觌": "覿", "觎": "覦",
  "觏": "覯", "觐": "覲", "觑": "覷", "觞": "觴", "触": "觸", "觯": "觶", "詟": "讋", "誉": "譽",
  "誊": "謄", "讠": "訁", "计": "計", "订": "訂", "讣": "訃", "认": "認", "讥": "譏", "讦": "訐",
  "讧": "訌", "讨": "討", "让": "讓", "讪": "訕", "讫": "訖", "训": "訓", "议": "議", "讯": "訊",
  "记": "記", "讲": "講", "讳": "諱", "讴": "謳", "讵": "詎", "讶": "訝", "讷": "訥", "许": "許",
  "讹": "訛", "论": "論", "讼": "訟", "讽": "諷", "设": "設", "访": "訪", "诀": "訣", "证": "證",
  "诂": "詁", "诃": "訶", "评": "評", "诅": "詛", "识": "識", "诈": "詐", "诉": "訴", "诊": "診",
  "诋": "詆", "诌": "謅", "词": "詞", "诎": "詘", "诏": "詔", "译": "譯", "诒": "詒", "诓": "誆",
  "诔": "誄", "试": "試", "诖": "詿", "诗": "詩", "诘": "詰", "诙": "詼", "诚": "誠", "诛": "誅",
  "诜": "詵", "话": "話", "诞": "誕", "诟": "詬", "诠": "詮", "诡": "詭", "询": "詢", "诣": "詣",
  "诤": "諍", "该": "該", "详": "詳", "诧": "詫", "诨": "諢", "诩": "詡", "诫": "誡", "诬": "誣",
  "语": "語", "诮": "誚", "误": "誤", "诰": "誥", "诱": "誘", "诲": "誨", "诳": "誑", "说": "說",
  "诵": "誦", "诶": "誒", "请": "請", "诸": "諸", "诹": "諏", "诺": "諾", "读": "讀", "诼": "諑",
  "诽": "誹", "课": "課", "诿": "諉", "谀": "諛", "谁": "誰", "谂": "諗", "调": "調", "谄": "諂",
  "谅": "諒", "谆": "諄", "谈": "談", "谊": "誼", "谋": "謀", "谌": "諶", "谍": "諜", "谎": "謊",
  "谏": "諫", "谐": "諧", "谑": "謔", "谒": "謁", "谓": "謂", "谔": "諤", "谕": "諭", "谖": "諼",
  "谗": "讒", "谘": "諮", "谙": "諳", "谚": "諺", "谛": "諦", "谜": "謎", "谝": "諞", "谟": "謨",
  "谠": "讜", "谡": "謖", "谢": "謝", "谣": "謠", "谤": "謗", "谥": "謚", "谦": "謙", "谧": "謐",
  "谨": "謹", "谩": "謾", "谪": "謫", "谫": "譾", "谬": "謬", "谭": "譚", "谮": "譖", "谯": "譙",
  "谱": "譜", "谲": "譎", "谳": "讞", "谴": "譴", "谵": "譫", "谶": "讖", "谷": "谷", "豮": "豶",
  "贝": "貝", "负": "負", "贡": "貢", "财": "財", "责": "責", "贤": "賢", "败": "敗", "账": "賬",
  "货": "貨", "质": "質", "贩": "販", "贪": "貪", "贫": "貧", "贬": "貶", "购": "購", "贮": "貯",
  "贯": "貫", "贰": "貳", "贱": "賤", "贲": "賁", "贳": "貰", "贴": "貼", "贵": "貴", "贶": "貺",
  "贷": "貸", "贸": "貿", "费": "費", "贺": "賀", "贻": "貽", "贼": "賊", "贽": "贄", "贾": "賈",
  "贿": "賄", "赀": "貲", "赁": "賃", "赂": "賂", "赃": "贓", "资": "資", "赅": "賅", "赆": "贐",
  "赇": "賕", "赈": "賑", "赉": "賚", "赊": "賒", "赋": "賦", "赌": "賭", "赍": "齎", "赎": "贖",
  "赏": "賞", "赐": "賜", "赑": "贔", "赒": "賙", "赓": "賡", "赔": "賠", "赕": "賧", "赖": "賴",
  "赗": "賵", "赘": "贅", "赙": "賻", "赚": "賺", "赛": "賽", "赜": "賾", "赝": "贗", "赞": "讚",
  "赠": "贈", "赡": "贍", "赢": "贏", "赣": "贛", "赵": "趙", "赶": "趕", "趋": "趨", "趱": "趲",
  "趸": "躉", "跃": "躍", "跄": "蹌", "跞": "躒", "践": "踐", "跶": "躂", "跷": "蹺", "跸": "蹕",
  "跹": "躚", "跻": "躋", "踊": "踴", "踌": "躊", "踪": "蹤", "踬": "躓", "踯": "躑", "蹑": "躡",
  "蹒": "蹣", "蹰": "躕", "蹿": "躥", "躏": "躪", "躜": "躦", "躯": "軀", "车": "車", "轧": "軋",
  "轨": "軌", "轩": "軒", "轫": "軔", "转": "轉", "轭": "軛", "轮": "輪", "软": "軟", "轰": "轟",
  "轱": "軲", "轲": "軻", "轳": "轤", "轴": "軸", "轵": "軹", "轶": "軼", "轷": "軤", "轸": "軫",
  "轹": "轢", "轺": "軺", "轻": "輕", "轼": "軾", "载": "載", "轾": "輊", "轿": "轎", "辀": "輈",
  "辁": "輇", "辂": "輅", "较": "較", "辄": "輒", "辅": "輔", "辆": "輛", "辇": "輦", "辈": "輩",
  "辉": "輝", "辊": "輥", "辋": "輞", "辍": "輟", "辎": "輜", "辏": "輳", "辐": "輻", "辑": "輯",
  "输": "輸", "辔": "轡", "辖": "轄", "辗": "輾", "辘": "轆", "辙": "轍", "辚": "轔", "辞": "辭",
  "辩": "辯", "辫": "辮", "边": "邊", "辽": "遼", "达": "達", "迁": "遷", "过": "過", "迈": "邁",
  "运": "運", "还": "還", "这": "這", "进": "進", "远": "遠", "违": "違", "连": "連", "迟": "遲",
  "迩": "邇", "迳": "逕", "迹": "跡", "适": "適", "选": "選", "逊": "遜", "递": "遞", "逻": "邏",
  "遗": "遺", "遥": "遙", "邓": "鄧", "邝": "鄺", "邬": "鄔", "邮": "郵", "邹": "鄒", "邺": "鄴",
  "邻": "鄰", "郁": "鬱", "郄": "郤", "郏": "郟", "郐": "鄶", "郑": "鄭", "郓": "鄆", "郦": "酈",
  "郧": "鄖", "郸": "鄲", "酝": "醞", "酦": "醱", "酱": "醬", "酽": "釅", "酾": "釃", "酿": "釀",
  "释": "釋", "里": "裏", "鉴": "鑒", "銮": "鑾", "针": "針", "钉": "釘", "钊": "釗", "钋": "釙",
  "钌": "釕", "钍": "釷", "钎": "釺", "钏": "釧", "钐": "釤", "钑": "鈒", "钒": "釩", "钓": "釣",
  "钔": "鍆", "钕": "釹", "钖": "鍚", "钗": "釵", "钘": "鈃", "钙": "鈣", "钚": "鈈", "钛": "鈦",
  "钜": "鉅", "钝": "鈍", "钞": "鈔", "钟": "鐘", "钠": "鈉", "钡": "鋇", "钢": "鋼", "钣": "鈑",
  "钤": "鈐", "钥": "鑰", "钦": "欽", "钧": "鈞", "钨": "鎢", "钩": "鉤", "钪": "鈧", "钫": "鈁",
  "钬": "鈥", "钭": "鈄", "钮": "鈕", "钯": "鈀", "钰": "鈺", "钱": "錢", "钲": "鉦", "钳": "鉗",
  "钴": "鈷", "钵": "缽", "钶": "鈳", "钷": "鉕", "钸": "鈽", "钹": "鈸", "钺": "鉞", "钻": "鑽",
  "钼": "鉬", "钽": "鉭", "钾": "鉀", "钿": "鈿", "铀": "鈾", "铁": "鐵", "铂": "鉑", "铃": "鈴",
  "铄": "鑠", "铅": "鉛", "铆": "鉚", "铈": "鈰", "铉": "鉉", "铊": "鉈", "铋": "鉍", "铌": "鈮",
  "铍": "鈹", "铎": "鐸", "铐": "銬", "铑": "銠", "铒": "鉺", "铓": "鋩", "铔": "錏", "铕": "銪",
  "铖": "鋮", "铗": "鋏", "铘": "鋣", "铙": "鐃", "铚": "銍", "铛": "鐺", "铜": "銅", "铝": "鋁",
  "铞": "銱", "铟": "銦", "铠": "鎧", "铡": "鍘", "铢": "銖", "铣": "銑", "铤": "鋌", "铥": "銩",
  "铦": "銛", "铧": "鏵", "铨": "銓", "铩": "鎩", "铪": "鉿", "铫": "銚", "铬": "鉻", "铭": "銘",
  "铮": "錚", "铯": "銫", "铰": "鉸", "铱": "銥", "铲": "鏟", "铳": "銃", "铴": "鐋", "铵": "銨",
  "银": "銀", "铷": "銣", "铸": "鑄", "铹": "鐒", "铺": "鋪", "铻": "鋙", "铼": "錸", "铽": "鋱",
  "链": "鏈", "铿": "鏗", "销": "銷", "锁": "鎖", "锂": "鋰", "锃": "鋥", "锄": "鋤", "锅": "鍋",
  "锆": "鋯", "锇": "鋨", "锈": "鏽", "锉": "銼", "锊": "鋝", "锋": "鋒", "锌": "鋅", "锍": "鋶",
  "锎": "鐦", "锏": "鐧", "锐": "銳", "锑": "銻", "锒": "鋃", "锓": "鋟", "锔": "鋦", "锕": "錒",
  "锖": "錆", "锗": "鍺", "锘": "鍩", "错": "錯", "锚": "錨", "锛": "錛", "锜": "錡", "锝": "鍀",
  "锞": "錁", "锟": "錕", "锡": "錫", "锢": "錮", "锣": "鑼", "锤": "錘", "锥": "錐", "锦": "錦",
  "锧": "鑕", "锨": "鍁", "锩": "錈", "锪": "鍃", "锫": "錇", "锬": "錟", "锭": "錠", "键": "鍵",
  "锯": "鋸", "锰": "錳", "锱": "錙", "锲": "鍥", "锴": "鍇", "锵": "鏘", "锶": "鍶", "锷": "鍔",
  "锸": "鍤", "锹": "鍬", "锺": "鍾", "锻": "鍛", "锼": "鎪", "锽": "鍠", "锾": "鍰", "锿": "鎄",
  "镀": "鍍", "镁": "鎂", "镂": "鏤", "镃": "鎡", "镄": "鐨", "镅": "鎇", "镆": "鏌", "镇": "鎮",
  "镈": "鎛", "镉": "鎘", "镊": "鑷", "镋": "钂", "镌": "鐫", "镍": "鎳", "镎": "鎿", "镏": "鎦",
  "镐": "鎬", "镑": "鎊", "镒": "鎰", "镓": "鎵", "镔": "鑌", "镕": "鎔", "镖": "鏢", "镗": "鏜",
  "镘": "鏝", "镙": "鏍", "镚": "鏰", "镛": "鏞", "镜": "鏡", "镝": "鏑", "镞": "鏃", "镟": "鏇",
  "镠": "鏐", "镡": "鐔", "镢": "钁", "镣": "鐐", "镤": "鏷", "镥": "鑥", "镦": "鐓", "镧": "鑭",
  "镨": "鐠", "镩": "鑹", "镪": "鏹", "镫": "鐙", "镬": "鑊", "镭": "鐳", "镮": "鐶", "镯": "鐲",
  "镰": "鐮", "镱": "鐿", "镲": "鑔", "镳": "鑣", "镴": "鑞", "镶": "鑲", "长": "長", "门": "門",
  "闩": "閂", "闪": "閃", "闫": "閆", "闭": "閉", "问": "問", "闯": "闖", "闰": "閏", "闱": "闈",
  "闲": "閒", "间": "間", "闵": "閔", "闶": "閌", "闷": "悶", "闸": "閘", "闹": "鬧", "闺": "閨",
  "闻": "聞", "闼": "闥", "闽": "閩", "闾": "閭", "阀": "閥", "阁": "閣", "阂": "閡", "阃": "閫",
  "阄": "鬮", "阅": "閱", "阆": "閬", "阇": "闍", "阈": "閾", "阉": "閹", "阊": "閶", "阋": "鬩",
  "阌": "閿", "阍": "閽", "阎": "閻", "阏": "閼", "阐": "闡", "阑": "闌", "阒": "闃", "阔": "闊",
  "阕": "闋", "阖": "闔", "阗": "闐", "阙": "闕", "阚": "闞", "队": "隊", "阳": "陽", "阴": "陰",
  "阵": "陣", "阶": "階", "际": "際", "陆": "陸", "陇": "隴", "陈": "陳", "陉": "陘", "陕": "陝",
  "陧": "隉", "陨": "隕", "险": "險", "随": "隨", "隐": "隱", "隶": "隸", "隽": "雋", "难": "難",
  "雏": "雛", "雠": "讎", "雳": "靂", "雾": "霧", "霁": "霽", "霉": "霉", "静": "靜", "靥": "靨",
  "鞑": "韃", "鞒": "鞽", "鞯": "韉", "韦": "韋", "韧": "韌", "韨": "韍", "韩": "韓", "韪": "韙",
  "韫": "韞", "韬": "韜", "韵": "韻", "页": "頁", "顶": "頂", "顷": "頃", "项": "項", "顺": "順",
  "须": "須", "顼": "頊", "顽": "頑", "顾": "顧", "顿": "頓", "颀": "頎", "颁": "頒", "颂": "頌",
  "预": "預", "颅": "顱", "领": "領", "颇": "頗", "颈": "頸", "颉": "頡", "颊": "頰", "颋": "頲",
  "颌": "頜", "颍": "潁", "颎": "熲", "颏": "頦", "颐": "頤", "频": "頻", "颓": "頹", "颔": "頷",
  "颖": "穎", "颗": "顆", "题": "題", "颚": "顎", "颛": "顓", "颜": "顏", "额": "額", "颞": "顳",
  "颟": "顢", "颠": "顛", "颡": "顙", "颢": "顥", "颤": "顫", "颥": "顬", "颦": "顰", "颧": "顴",
  "风": "風", "飒": "颯", "飓": "颶", "飕": "颼", "飘": "飄", "飙": "飆", "飚": "飆", "飞": "飛",
  "飨": "饗", "餍": "饜", "饣": "飠", "饥": "饑", "饧": "餳", "饨": "飩", "饩": "餼", "饪": "飪",
  "饫": "飫", "饬": "飭", "饭": "飯", "饮": "飲", "饯": "餞", "饰": "飾", "饱": "飽", "饲": "飼",
  "饳": "飿", "饴": "飴", "饵": "餌", "饶": "饒", "饷": "餉", "饸": "餄", "饹": "餎", "饺": "餃",
  "饻": "餏", "饼": "餅", "饽": "餑", "饿": "餓", "馀": "餘", "馁": "餒", "馂": "餕", "馃": "餜",
  "馄": "餛", "馅": "餡", "馆": "館", "馇": "餷", "馈": "饋", "馊": "餿", "馋": "饞", "馍": "饃",
  "馎": "餺", "馏": "餾", "馐": "饈", "馑": "饉", "馒": "饅", "馓": "饊", "馔": "饌", "馕": "饢",
  "马": "馬", "驭": "馭", "驮": "馱", "驯": "馴", "驰": "馳", "驱": "驅", "驲": "馹", "驳": "駁",
  "驴": "驢", "驵": "駔", "驶": "駛", "驷": "駟", "驸": "駙", "驹": "駒", "驺": "騶", "驻": "駐",
  "驼": "駝", "驽": "駑", "驾": "駕", "驿": "驛", "骀": "駘", "骁": "驍", "骂": "罵", "骄": "驕",
  "骅": "驊", "骆": "駱", "骇": "駭", "骈": "駢", "骊": "驪", "骋": "騁", "验": "驗", "骏": "駿",
  "骐": "騏", "骑": "騎", "骒": "騍", "骓": "騅", "骖": "驂", "骗": "騙", "骘": "騭", "骚": "騷",
  "骛": "騖", "骜": "驁", "骝": "騮", "骟": "騸", "骠": "驃", "骡": "騾", "骢": "驄", "骣": "驏",
  "骤": "驟", "骥": "驥", "骧": "驤", "髅": "髏", "髋": "髖", "髌": "髕", "鬓": "鬢", "魇": "魘",
  "魉": "魎", "鱼": "魚", "鱿": "魷", "鲁": "魯", "鲂": "魴", "鲅": "鮁", "鲆": "鮃", "鲇": "鯰",
  "鲈": "鱸", "鲉": "鮋", "鲊": "鮓", "鲋": "鮒", "鲌": "鮊", "鲍": "鮑", "鲎": "鱟", "鲏": "鮍",
  "鲐": "鮐", "鲑": "鮭", "鲒": "鮚", "鲔": "鮪", "鲕": "鮞", "鲖": "鮦", "鲗": "鰂", "鲘": "鮜",
  "鲙": "鱠", "鲚": "鱭", "鲛": "鮫", "鲜": "鮮", "鲝": "鮺", "鲞": "鯗", "鲟": "鱘", "鲠": "鯁",
  "鲡": "鱺", "鲢": "鰱", "鲣": "鰹", "鲤": "鯉", "鲥": "鰣", "鲦": "鰷", "鲧": "鯀", "鲨": "鯊",
  "鲩": "鯇", "鲫": "鯽", "鲭": "鯖", "鲮": "鯪", "鲰": "鯫", "鲱": "鯡", "鲲": "鯤", "鲳": "鯧",
  "鲴": "鯝", "鲵": "鯢", "鲶": "鯰", "鲷": "鯛", "鲸": "鯨", "鲺": "鯴", "鲻": "鯔", "鲼": "鱝",
  "鲽": "鰈", "鳄": "鱷", "鳅": "鰍", "鳆": "鰒", "鳇": "鰉", "鳌": "鰲", "鳍": "鰭", "鳎": "鰨",
  "鳏": "鰥", "鳐": "鰩", "鳓": "鰳", "鳔": "鰾", "鳕": "鱈", "鳖": "鱉", "鳗": "鰻", "鳘": "鰵",
  "鳙": "鱅", "鳜": "鱖", "鳝": "鱔", "鳞": "鱗", "鳟": "鱒", "鳢": "鱧", "鸟": "鳥", "鸠": "鳩",
  "鸡": "雞", "鸢": "鳶", "鸣": "鳴", "鸥": "鷗", "鸦": "鴉", "鸧": "鶬", "鸨": "鴇", "鸩": "鴆",
  "鸪": "鴣", "鸫": "鶇", "鸬": "鸕", "鸭": "鴨", "鸮": "鴞", "鸯": "鴦", "鸰": "鴒", "鸱": "鴟",
  "鸲": "鴝", "鸳": "鴛", "鸴": "鷽", "鸵": "鴕", "鸶": "鷥", "鸷": "鷙", "鸸": "鴯", "鸹": "鴰",
  "鸺": "鵂", "鸻": "鴴", "鸼": "鵃", "鸽": "鴿", "鸾": "鸞", "鸿": "鴻", "鹁": "鵓", "鹂": "鸝",
  "鹃": "鵑", "鹄": "鵠", "鹅": "鵝", "鹆": "鵒", "鹇": "鷳", "鹈": "鵜", "鹉": "鵡", "鹊": "鵲",
  "鹋": "鶓", "鹌": "鵪", "鹍": "鵾", "鹏": "鵬", "鹐": "鵮", "鹑": "鶉", "鹒": "鶊", "鹓": "鵷",
  "鹕": "鶘", "鹖": "鶡", "鹗": "鶚", "鹘": "鶻", "鹙": "鶖", "鹚": "鶿", "鹛": "鶥", "鹜": "鶩",
  "鹝": "鷊", "鹞": "鷂", "鹟": "鶲", "鹠": "鶹", "鹡": "鶺", "鹣": "鶼", "鹤": "鶴", "鹦": "鸚",
  "鹧": "鷓", "鹨": "鷚", "鹩": "鷯", "鹪": "鷦", "鹫": "鷲", "鹬": "鷸", "鹭": "鷺", "鹰": "鷹",
  "鹳": "鸛", "麦": "麥", "麸": "麩", "黄": "黃", "黉": "黌", "齐": "齊", "齑": "齏", "齿": "齒",
  "龀": "齔", "龁": "齕", "龂": "齗", "龃": "齟", "龄": "齡", "龅": "齙", "龆": "齠", "龇": "齜",
  "龈": "齦", "龉": "齬", "龊": "齪", "龋": "齲", "龌": "齷", "龙": "龍", "龚": "龔", "龛": "龕"
};

function toTraditional(text) {
  let converted = text;
  Object.keys(traditionalPhraseMap).forEach(function (key) {
    converted = converted.split(key).join(traditionalPhraseMap[key]);
  });
  return Array.from(converted).map(function (char) {
    return simplifiedToTraditionalMap[char] || char;
  }).join("").replace(/專註|規划|計划|策划|聯系|聯系|咨詢|文本|項目|裏程/g, function (match) {
    return traditionalPostPhraseMap[match] || match;
  });
}

function smartEnglish(text) {
  if (!/[\u4e00-\u9fff]/.test(text)) {
    return text;
  }

  if (englishTextMap[text]) {
    return englishTextMap[text];
  }

  let converted = text;
  englishTermMap.forEach(function (item) {
    converted = converted.split(item[0]).join(item[1]);
  });

  return converted === text ? toTraditional(text) : converted;
}

function translateValue(value, language) {
  if (!value || !value.trim()) {
    return value;
  }

  const leading = value.match(/^\s*/)[0];
  const trailing = value.match(/\s*$/)[0];
  const core = value.trim().replace(/\s+/g, " ");
  let translated = core;

  if (language === "zh-HK") {
    translated = toTraditional(core);
  }

  if (language === "en") {
    translated = smartEnglish(core);
  }

  return leading + translated + trailing;
}

const translatableTextNodes = [];
const translatableAttributes = [];

function shouldSkipTranslation(node) {
  const parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  return !parent || Boolean(parent.closest("script, style, [data-no-translate]"));
}

function collectTranslatableContent() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let currentNode = walker.nextNode();

  while (currentNode) {
    if (!shouldSkipTranslation(currentNode) && currentNode.nodeValue.trim()) {
      translatableTextNodes.push({
        node: currentNode,
        original: currentNode.nodeValue
      });
    }
    currentNode = walker.nextNode();
  }

  document.querySelectorAll("[placeholder], [aria-label], [alt], [title]").forEach(function (element) {
    if (shouldSkipTranslation(element)) {
      return;
    }

    ["placeholder", "aria-label", "alt", "title"].forEach(function (attribute) {
      const value = element.getAttribute(attribute);
      if (value && value.trim()) {
        translatableAttributes.push({
          element: element,
          attribute: attribute,
          original: value
        });
      }
    });
  });
}

function setLanguage(language) {
  currentLanguage = language;
  localStorage.setItem("rainEducationLanguage", language);
  document.documentElement.lang = language === "en" ? "en" : language === "zh-HK" ? "zh-Hant-HK" : "zh-CN";
  document.body.dataset.language = language;

  translatableTextNodes.forEach(function (item) {
    item.node.nodeValue = translateValue(item.original, language);
  });

  translatableAttributes.forEach(function (item) {
    item.element.setAttribute(item.attribute, translateValue(item.original, language));
  });

  languageButtons.forEach(function (button) {
    button.classList.toggle("is-active", button.dataset.langSwitch === language);
  });

  updateConsultationMeta();
}

function updateHeaderState() {
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  document.body.classList.toggle("show-floating-cta", window.scrollY > Math.min(620, window.innerHeight * 0.72));
}

function updateConsultationMeta() {
  if (formPageUrl) {
    formPageUrl.value = window.location.href;
  }

  if (formLanguage) {
    formLanguage.value = currentLanguage;
  }

  document.querySelectorAll('input[name="page_url"]').forEach(function (input) {
    input.value = window.location.href;
  });

  document.querySelectorAll('input[name="selected_language"]').forEach(function (input) {
    input.value = currentLanguage;
  });
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState);

collectTranslatableContent();
if (!["zh-CN", "zh-HK", "en"].includes(currentLanguage)) {
  currentLanguage = "zh-CN";
}
setLanguage(currentLanguage);

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    setLanguage(button.dataset.langSwitch);
  });
});

if (window.location.hash) {
  window.addEventListener("load", function () {
    function scrollToHashTarget() {
      const target = document.querySelector(window.location.hash);
      if (target) {
        target.scrollIntoView({ block: "start" });
      }
    }

    [80, 520, 1200].forEach(function (delay) {
      setTimeout(scrollToHashTarget, delay);
    });
  });
}

function initHeroPathwayAnimation() {
  if (!heroPathwayCanvas) {
    return;
  }

  const context = heroPathwayCanvas.getContext("2d", { alpha: true });

  if (!context) {
    return;
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let deviceScale = 1;
  let animationFrame = 0;
  let isVisible = true;
  let lastFrameTime = 0;

  function resizeCanvas() {
    const bounds = heroPathwayCanvas.getBoundingClientRect();
    width = Math.max(1, Math.round(bounds.width));
    height = Math.max(1, Math.round(bounds.height));
    deviceScale = Math.min(window.devicePixelRatio || 1, 2.25);
    heroPathwayCanvas.width = Math.round(width * deviceScale);
    heroPathwayCanvas.height = Math.round(height * deviceScale);
    context.setTransform(deviceScale, 0, 0, deviceScale, 0, 0);
  }

  function getPathwayPoints() {
    const mobile = width < 720;
    const offset = mobile ? 0.04 : 0;

    return [
      { x: mobile ? 0.14 : 0.48, y: 0.3 + offset },
      { x: mobile ? 0.35 : 0.62, y: mobile ? 0.2 : 0.23 },
      { x: mobile ? 0.62 : 0.78, y: mobile ? 0.32 : 0.35 },
      { x: mobile ? 0.82 : 0.88, y: mobile ? 0.54 : 0.53 },
      { x: mobile ? 0.58 : 0.72, y: mobile ? 0.76 : 0.71 },
      { x: mobile ? 0.24 : 0.56, y: mobile ? 0.65 : 0.62 }
    ].map(function (point) {
      return {
        x: point.x * width,
        y: point.y * height
      };
    });
  }

  function drawSoftGrid(time) {
    const spacing = width < 720 ? 72 : 88;
    const drift = (time * 0.012) % spacing;

    context.save();
    context.globalAlpha = width < 720 ? 0.13 : 0.18;
    context.lineWidth = 1;
    context.strokeStyle = "rgba(108, 179, 232, 0.26)";

    for (let x = -spacing + drift; x < width + spacing; x += spacing) {
      context.beginPath();
      context.moveTo(x, height * 0.12);
      context.lineTo(x + height * 0.26, height * 0.92);
      context.stroke();
    }

    context.strokeStyle = "rgba(236, 185, 88, 0.18)";

    for (let y = height * 0.18; y < height; y += spacing * 0.74) {
      context.beginPath();
      context.moveTo(width * 0.4, y);
      context.lineTo(width * 0.98, y + Math.sin(time * 0.001 + y) * 10);
      context.stroke();
    }

    context.restore();
  }

  function drawRoute(points, time) {
    context.save();
    context.lineCap = "round";
    context.lineJoin = "round";

    const routeGradient = context.createLinearGradient(width * 0.42, height * 0.16, width * 0.94, height * 0.78);
    routeGradient.addColorStop(0, "rgba(95, 177, 239, 0.04)");
    routeGradient.addColorStop(0.24, "rgba(95, 177, 239, 0.38)");
    routeGradient.addColorStop(0.58, "rgba(237, 197, 111, 0.42)");
    routeGradient.addColorStop(1, "rgba(255, 244, 205, 0.05)");

    context.strokeStyle = routeGradient;
    context.lineWidth = width < 720 ? 1.4 : 1.8;
    context.setLineDash([10, 18]);
    context.lineDashOffset = -time * 0.038;

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);

    for (let index = 1; index < points.length; index += 1) {
      const previous = points[index - 1];
      const current = points[index];
      const controlX = (previous.x + current.x) / 2;
      const controlY = Math.min(previous.y, current.y) - height * (index % 2 ? 0.08 : 0.03);
      context.quadraticCurveTo(controlX, controlY, current.x, current.y);
    }

    context.stroke();
    context.setLineDash([]);

    context.globalAlpha = 0.18;
    context.lineWidth = width < 720 ? 12 : 18;
    context.stroke();
    context.restore();
  }

  function drawNodes(points, time) {
    context.save();

    points.forEach(function (point, index) {
      const phase = time * 0.002 + index * 0.78;
      const size = (width < 720 ? 7 : 9) + Math.sin(phase) * 1.4;
      const halo = size * (2.4 + Math.sin(phase * 0.8) * 0.3);

      context.save();
      context.translate(point.x, point.y);
      context.rotate(Math.PI / 4);

      context.fillStyle = "rgba(255, 246, 216, 0.13)";
      context.fillRect(-halo / 2, -halo / 2, halo, halo);

      context.fillStyle = index % 2 ? "rgba(113, 197, 255, 0.72)" : "rgba(238, 190, 86, 0.72)";
      context.fillRect(-size / 2, -size / 2, size, size);

      context.strokeStyle = "rgba(255, 255, 255, 0.56)";
      context.lineWidth = 1;
      context.strokeRect(-size / 2, -size / 2, size, size);

      context.restore();
    });

    context.restore();
  }

  function roundedRectPath(x, y, rectWidth, rectHeight, radius) {
    const safeRadius = Math.min(radius, rectWidth / 2, rectHeight / 2);

    context.beginPath();
    context.moveTo(x + safeRadius, y);
    context.lineTo(x + rectWidth - safeRadius, y);
    context.quadraticCurveTo(x + rectWidth, y, x + rectWidth, y + safeRadius);
    context.lineTo(x + rectWidth, y + rectHeight - safeRadius);
    context.quadraticCurveTo(x + rectWidth, y + rectHeight, x + rectWidth - safeRadius, y + rectHeight);
    context.lineTo(x + safeRadius, y + rectHeight);
    context.quadraticCurveTo(x, y + rectHeight, x, y + rectHeight - safeRadius);
    context.lineTo(x, y + safeRadius);
    context.quadraticCurveTo(x, y, x + safeRadius, y);
    context.closePath();
  }

  function drawPulse(points, time) {
    const loop = ((time * 0.00012) % 1) * (points.length - 1);
    const segmentIndex = Math.min(points.length - 2, Math.floor(loop));
    const segmentProgress = loop - segmentIndex;
    const start = points[segmentIndex];
    const end = points[segmentIndex + 1];
    const x = start.x + (end.x - start.x) * segmentProgress;
    const y = start.y + (end.y - start.y) * segmentProgress - Math.sin(segmentProgress * Math.PI) * height * 0.045;

    context.save();
    context.globalAlpha = 0.82;
    context.fillStyle = "rgba(255, 237, 180, 0.82)";
    roundedRectPath(x - 22, y - 2, 44, 4, 2);
    context.fill();

    context.globalAlpha = 0.24;
    context.fillStyle = "rgba(112, 194, 255, 0.86)";
    roundedRectPath(x - 46, y - 1, 92, 2, 1);
    context.fill();
    context.restore();
  }

  function drawMilestonePanels(points, time) {
    context.save();
    const panelWidth = width < 720 ? 58 : 84;
    const panelHeight = width < 720 ? 24 : 30;

    points.slice(1, 5).forEach(function (point, index) {
      const shift = Math.sin(time * 0.0012 + index) * 3;
      const x = point.x - panelWidth / 2;
      const y = point.y + 18 + shift;

      context.fillStyle = "rgba(7, 26, 44, 0.2)";
      context.strokeStyle = index % 2 ? "rgba(111, 194, 255, 0.24)" : "rgba(237, 190, 88, 0.24)";
      context.lineWidth = 1;
      roundedRectPath(x, y, panelWidth, panelHeight, 4);
      context.fill();
      context.stroke();

      context.globalAlpha = 0.52;
      context.fillStyle = index % 2 ? "rgba(111, 194, 255, 0.58)" : "rgba(237, 190, 88, 0.58)";
      context.fillRect(x + 8, y + 8, panelWidth - 16, 2);
      context.globalAlpha = 0.28;
      context.fillRect(x + 8, y + 15, panelWidth * 0.52, 2);
      context.globalAlpha = 1;
    });

    context.restore();
  }

  function renderFrame(time) {
    context.clearRect(0, 0, width, height);

    if (!width || !height) {
      return;
    }

    const points = getPathwayPoints();
    drawSoftGrid(time);
    drawRoute(points, time);
    drawMilestonePanels(points, time);
    drawNodes(points, time);

    if (!reducedMotionQuery.matches) {
      drawPulse(points, time);
    }
  }

  function animate(time) {
    if (!lastFrameTime || time - lastFrameTime > 1000 / 32) {
      renderFrame(time);
      lastFrameTime = time;
    }

    if (isVisible && !reducedMotionQuery.matches) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  function startAnimation() {
    window.cancelAnimationFrame(animationFrame);
    renderFrame(performance.now());

    if (!reducedMotionQuery.matches && isVisible) {
      animationFrame = window.requestAnimationFrame(animate);
    }
  }

  resizeCanvas();
  startAnimation();
  window.addEventListener("resize", function () {
    resizeCanvas();
    startAnimation();
  });

  reducedMotionQuery.addEventListener("change", startAnimation);

  if ("IntersectionObserver" in window) {
    const canvasObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startAnimation();
        } else {
          window.cancelAnimationFrame(animationFrame);
        }
      });
    });

    canvasObserver.observe(heroPathwayCanvas);
  }
}

initHeroPathwayAnimation();

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("is-open");
    document.body.classList.toggle("menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (consultationForm) {
  consultationForm.addEventListener("submit", updateConsultationMeta);
}

if (netlifyForms.length) {
  netlifyForms.forEach(function (form) {
    form.addEventListener("submit", updateConsultationMeta);
  });
}

if (consultationForm && formMessage && consultationForm.dataset.nativeSubmit !== "true") {
  consultationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = consultationForm.querySelector("[type='submit']");
    const formData = new FormData(consultationForm);

    formMessage.textContent = translateValue("正在提交，请稍候。", currentLanguage);
    formMessage.classList.add("is-visible");

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      formMessage.textContent = translateValue("感谢咨询，Rain Education 顾问将根据你的背景与目标，为你安排初步评估。", currentLanguage);
      consultationForm.reset();
    } catch (error) {
      formMessage.textContent = translateValue("提交失败，请稍后再试，或直接邮件联系 info@rainedu.hk。", currentLanguage);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

if (caseFilterButtons.length && caseCards.length) {
  caseFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.filter;

      caseFilterButtons.forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");

      caseCards.forEach(function (card) {
        const categories = (card.dataset.category || "").split(/\s+/);
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

if (mentorFilterButtons.length && mentorCards.length) {
  mentorFilterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const filter = button.dataset.mentorFilter;

      mentorFilterButtons.forEach(function (item) {
        item.classList.remove("is-active");
      });
      button.classList.add("is-active");

      mentorCards.forEach(function (card) {
        const categories = (card.dataset.mentorCategory || "").split(/\s+/);
        const shouldShow = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });
}

if (assessmentButton && assessmentBackground && assessmentDestination && assessmentLevel && assessmentResult) {
  const backgroundMap = {
    gaokao: "建议优先评估香港副学士路径、香港/新加坡本科补录可能性，以及英语能力提升计划。",
    international: "建议围绕目标专业建立本科申请组合，同时尽早安排标化、文书素材和面试准备。",
    associate: "建议把 GPA 管理、本科转入策略、背景提升和转学文书作为主线。",
    undergraduate: "建议同步规划 GPA、科研/实习/竞赛背景，以及硕士申请时间线。",
    graduate: "建议先做院校定位和专业匹配，再推进文书、推荐信、语言和面试准备。",
    "low-gpa": "建议优先诊断低 GPA 原因，通过课程补强、背景提升和院校梯度重构降低申请风险。"
  };

  const destinationMap = {
    hk: "目标香港方向，可重点关注港八、港三、硕士项目和副学士转入路径。",
    uk: "目标英国方向，可重点关注 G5、罗素集团、UCAS 时间线和笔试面试要求。",
    sg: "目标新加坡方向，可重点关注 NUS、NTU、公立大学与国际化项目组合。",
    global: "目标全球名校方向，建议建立多地区、多梯度、多专业匹配的申请组合。"
  };

  const levelMap = {
    associate: "申请阶段偏向副学士/本科衔接，应重点管理入学、GPA 和转学节点。",
    undergraduate: "申请阶段偏向本科，应重点管理标化、专业探索、文书和院校梯度。",
    postgraduate: "申请阶段偏向硕士，应重点管理研究兴趣、实习科研、推荐信和文书。",
    doctoral: "申请阶段偏向博士，应重点管理研究计划、导师匹配、学术产出和套磁策略。"
  };

  assessmentButton.addEventListener("click", function () {
    const background = backgroundMap[assessmentBackground.value];
    const destination = destinationMap[assessmentDestination.value];
    const level = levelMap[assessmentLevel.value];

    assessmentResult.innerHTML = [
      "<strong>" + translateValue("初步建议：", currentLanguage) + "</strong>",
      translateValue(background, currentLanguage),
      translateValue(destination, currentLanguage),
      translateValue(level, currentLanguage),
      translateValue("下一步建议提交成绩、年级、语言成绩和目标专业，顾问会进一步做正式评估。", currentLanguage)
    ].join("<br>");
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(function (element) {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(function (element) {
    element.classList.add("is-visible");
  });
}
