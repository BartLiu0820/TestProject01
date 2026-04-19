// =============================================
// BROKEN ARROW — 兵种数据库 & 筛选逻辑
// =============================================

const CATEGORIES = [
  { id: '侦察',    icon: '👁',  en: 'RECON' },
  { id: '步兵',    icon: '🪖', en: 'INFANTRY' },
  { id: '战斗载具', icon: '🚂', en: 'FIGHTING VEHICLES' },
  { id: '支援',    icon: '🎯', en: 'SUPPORT' },
  { id: '后勤',    icon: '📦', en: 'LOGISTICS' },
  { id: '直升机',  icon: '🚁', en: 'HELICOPTER' },
  { id: '空袭',    icon: '✈',  en: 'AIRSTRIKE' },
];

const UNITS = [
  // ============================================================
  // 侦察 · 美国
  // ============================================================
  {
    id: 'us-scout-sniper',
    name: '狙击侦察组',
    nameEn: 'Scout Sniper Team',
    faction: 'usa',
    category: '侦察',
    cost: 60,
    desc: '由狙击手与观测员组成的精锐二人组，专职远距离目标侦察与激光指示引导。可长时间潜伏敌后，为炮兵与空袭提供精确坐标。',
    equipment: [
      { icon: '🔫', name: 'M107 .50口径反器材狙击步枪', pts: 20, desc: '有效射程1800m，可摧毁轻型载具与精确点杀目标' },
      { icon: '🔭', name: 'AN/PAS-13热成像瞄准镜', pts: 12, desc: '全天候目标识别，夜间观测能力显著提升' },
      { icon: '🎯', name: 'AN/PEQ-1 SOFLAM激光指示器', pts: 18, desc: '引导激光制导炸弹与导弹实施精确打击' },
      { icon: '📻', name: '加密战术通讯系统', pts: 10, desc: '与指挥部实时共享情报，侦察数据传输无延迟' },
    ]
  },
  {
    id: 'us-gray-eagle',
    name: '灰鹰无人机',
    nameEn: 'MQ-1C Gray Eagle UAV',
    faction: 'usa',
    category: '侦察',
    cost: 110,
    desc: '中空长航时无人机，拥有超长滞空时间与广域监视能力。配备4枚地狱火导弹，可在侦察同时执行定点清除任务，是最具性价比的侦察单位之一。',
    equipment: [
      { icon: '📡', name: 'AN/ZPY-1 STARLite合成孔径雷达', pts: 25, desc: '全天候地面动目标指示，覆盖范围广' },
      { icon: '🎥', name: 'MX-15Di多光谱瞄准系统', pts: 20, desc: '高清光电/红外双模摄像，目标锁定精准' },
      { icon: '🚀', name: 'AGM-114 Hellfire导弹 ×4', pts: 40, desc: '激光制导反装甲导弹，穿甲厚度达900mm' },
      { icon: '⚡', name: '数据链加密通讯', pts: 15, desc: '与地面站及其他单位实时共享目标情报' },
    ]
  },
  {
    id: 'us-m1117',
    name: 'M1117卫士侦察车',
    nameEn: 'M1117 Guardian',
    faction: 'usa',
    category: '侦察',
    cost: 45,
    desc: '轮式装甲侦察车辆，机动灵活，适合在战线前沿快速探路。武装足以应对轻步兵威胁，但对装甲目标需保持距离。',
    equipment: [
      { icon: '🔫', name: 'M2 .50勃朗宁重机枪', pts: 12, desc: '1200m有效射程，压制步兵与轻型载具' },
      { icon: '💣', name: 'Mk 19自动榴弹发射器', pts: 10, desc: '400m内面杀伤，清除掩体内步兵效果显著' },
      { icon: '🛡', name: '复合装甲防护', pts: 15, desc: '可抵御7.62mm穿甲弹，防护级别超越普通装甲车' },
      { icon: '📡', name: '战术数据链终端', pts: 8, desc: '实时回传侦察图像至指挥部' },
    ]
  },
  // ============================================================
  // 侦察 · 俄罗斯
  // ============================================================
  {
    id: 'ru-sniper',
    name: '狙击手组',
    nameEn: 'Sniper Team',
    faction: 'russia',
    category: '侦察',
    cost: 50,
    desc: '由经验丰富的狙击手与观测兵组成，在城市废墟与复杂地形中潜伏侦察。可有效阻滞敌方步兵推进并引导炮火支援。',
    equipment: [
      { icon: '🔫', name: 'SVD德拉贡诺夫狙击步枪', pts: 15, desc: '800m半自动精准射击，城市狙击首选' },
      { icon: '🔫', name: 'KSVK 12.7mm反器材步枪（可选）', pts: 20, desc: '有效距离1500m，对轻型载具有威胁' },
      { icon: '🔭', name: '1PN93夜视瞄准仪', pts: 10, desc: '增强夜间侦察与作战能力' },
      { icon: '📻', name: 'R-168战术通讯电台', pts: 5, desc: '与炮兵单位联络，引导炮击坐标' },
    ]
  },
  {
    id: 'ru-orlan10',
    name: '猎鹰-10无人机',
    nameEn: 'Orlan-10 UAV',
    faction: 'russia',
    category: '侦察',
    cost: 80,
    desc: '俄军制式战术侦察无人机，部署灵活、操作简便。专注于战场态势感知与炮兵校射，是俄军炮兵体系的眼睛，对提升火炮打击精度有显著贡献。',
    equipment: [
      { icon: '📷', name: '光电侦察载荷', pts: 20, desc: '实时高清图像传输，侦察覆盖半径约120km' },
      { icon: '📡', name: '炮兵校射数据链', pts: 25, desc: '与炮兵连实时互联，显著提升炮击精度' },
      { icon: '🔋', name: '小型汽油发动机', pts: 15, desc: '续航时间长达16小时，持续情报保障' },
      { icon: '🚀', name: '（选装）小型破片杀伤弹', pts: 20, desc: '可携带轻型弹药对软目标实施打击' },
    ]
  },
  {
    id: 'ru-brdm2',
    name: 'BRDM-2侦察车',
    nameEn: 'BRDM-2',
    faction: 'russia',
    category: '侦察',
    cost: 35,
    desc: '经典苏制两栖侦察车，价格低廉、机动性强。浮渡能力使其能穿越水障执行侦察任务，是俄军前出侦察的常规力量。',
    equipment: [
      { icon: '🔫', name: 'KPVT 14.5mm重机枪', pts: 10, desc: '对轻型装甲目标有一定威胁，主要用于压制步兵' },
      { icon: '🔫', name: 'PKT 7.62mm同轴机枪', pts: 5, desc: '辅助防御武器，近距离补充火力' },
      { icon: '🚤', name: '两栖浮渡装置', pts: 12, desc: '水中推进速度9km/h，可直接渡越江河障碍' },
      { icon: '📻', name: 'R-123无线电台', pts: 8, desc: '战场通讯与协调，传输侦察情报' },
    ]
  },
  // ============================================================
  // 步兵 · 美国
  // ============================================================
  {
    id: 'us-rifle-squad',
    name: '步枪班',
    nameEn: 'Rifle Squad',
    faction: 'usa',
    category: '步兵',
    cost: 30,
    desc: '美军基础步兵单位，装备标准制式武器，能执行占领阵地、城镇清剿与机动防御等多种任务。在建筑物内具有明显优势。',
    equipment: [
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 8, desc: '班组制式武器，近中距离作战主力' },
      { icon: '💣', name: 'M320榴弹发射器', pts: 7, desc: '挂载于M4下方，有效清除掩体内目标' },
      { icon: '🔫', name: 'M249班用机枪', pts: 10, desc: '提供持续压制火力，有效射程800m' },
      { icon: '💨', name: 'M18烟雾手榴弹', pts: 5, desc: '遮蔽视线，掩护小组机动或撤退' },
    ]
  },
  {
    id: 'us-javelin-team',
    name: '标枪反坦克组',
    nameEn: 'Javelin AT Team',
    faction: 'usa',
    category: '步兵',
    cost: 55,
    desc: '装备FGM-148标枪导弹的反装甲步兵小组，是美军步兵对抗装甲目标的核心手段。顶攻模式攻击坦克最薄弱的顶部装甲，威胁极大。',
    equipment: [
      { icon: '🚀', name: 'FGM-148标枪反坦克导弹', pts: 35, desc: '双模攻击：顶攻（穿甲700mm）/ 直射模式，射程2500m' },
      { icon: '📷', name: 'CLU命令发射装置', pts: 12, desc: '内置红外热成像，自动锁定并追踪目标' },
      { icon: '🔫', name: 'M4A1卡宾枪（自卫）', pts: 5, desc: '近身防御武器' },
      { icon: '🔥', name: '发射后不管（LOBL）制导', pts: 3, desc: '发射后无需操作手持续引导，规避反击风险' },
    ]
  },
  {
    id: 'us-stinger-team',
    name: '毒刺防空组',
    nameEn: 'Stinger AA Team',
    faction: 'usa',
    category: '步兵',
    cost: 50,
    desc: '便携式防空导弹步兵组，可从掩蔽位置突然攻击低空飞行的直升机与无人机。发射后迅速转移，难以被反制。',
    equipment: [
      { icon: '🚀', name: 'FIM-92毒刺导弹', pts: 30, desc: '被动红外/紫外双模制导，射程5km，最大射高3.8km' },
      { icon: '🎯', name: '敌我识别（IFF）询问器', pts: 10, desc: '防止误击己方航空器' },
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 5, desc: '近身防御，发射后转移前自我保护' },
      { icon: '👁', name: '发射前锁定音响提示系统', pts: 5, desc: '确保导引头获得可靠锁定后再发射，提升命中率' },
    ]
  },
  {
    id: 'us-rangers',
    name: '游骑兵突击排',
    nameEn: 'Rangers Assault',
    faction: 'usa',
    category: '步兵',
    cost: 80,
    desc: '第75游骑兵团精英步兵，经过严苛近战战斗训练，擅长快速突击、机降渗透与要点夺取。比普通步兵拥有更强的火力与单兵战斗素质。',
    equipment: [
      { icon: '🔫', name: 'M4A1 SOPMOD卡宾枪', pts: 15, desc: '配备各类战术附件，近距作战效能提升30%' },
      { icon: '💥', name: 'AT4反装甲火箭筒', pts: 18, desc: '84mm一次性火箭筒，有效射程300m，对付轻装甲' },
      { icon: '💣', name: 'M67手榴弹×4', pts: 8, desc: '清除室内目标与掩体，杀伤半径5m' },
      { icon: '🔫', name: 'M240B中型机枪', pts: 15, desc: '班组火力支援，持续压制能力优秀' },
      { icon: '🦺', name: '改进型战术装甲', pts: 24, desc: '防弹能力优于普通步兵，减少战损' },
    ]
  },
  {
    id: 'us-sf-oda',
    name: '特种部队分遣队',
    nameEn: 'Special Forces ODA',
    faction: 'usa',
    category: '步兵',
    cost: 100,
    desc: '绿色贝雷帽特种作战分遣队A，具备侦察、引导、破坏与近距作战全能力。是美军最具威胁的步兵单位，但补充困难需谨慎使用。',
    equipment: [
      { icon: '🔫', name: 'HK416突击步枪', pts: 18, desc: '极高可靠性，近距作战首选' },
      { icon: '🚀', name: 'Carl Gustaf M4多用途火箭筒', pts: 22, desc: '多种弹种：HEAT反装甲、HEDP多用途、ILLUM照明弹' },
      { icon: '🎯', name: 'SOFLAM激光指示器', pts: 20, desc: '引导各类精确制导武器实施打击' },
      { icon: '💻', name: 'ROVER战术终端', pts: 15, desc: '接收无人机实时视频，实现战场态势共享' },
      { icon: '💣', name: 'C-4塑性炸药', pts: 25, desc: '定向爆破设施与桥梁，迟滞敌军推进' },
    ]
  },
  // ============================================================
  // 步兵 · 俄罗斯
  // ============================================================
  {
    id: 'ru-motostrelki',
    name: '摩托化步兵班',
    nameEn: 'Motostrelki Squad',
    faction: 'russia',
    category: '步兵',
    cost: 25,
    desc: '俄军标准机械化步兵单位，依托BMP或BTR战车快速部署。数量优势明显，价格低廉，是大规模地面推进的主要步兵力量。',
    equipment: [
      { icon: '🔫', name: 'AK-74M突击步枪', pts: 6, desc: '可靠耐用，各种环境下稳定工作' },
      { icon: '💣', name: 'RPG-7火箭筒', pts: 10, desc: '有效射程300m，穿甲厚度500mm，对付步兵战车' },
      { icon: '🔫', name: 'RPK-74轻机枪', pts: 6, desc: '班组火力支撑，持续压制敌方步兵' },
      { icon: '💨', name: 'RDG-2烟雾手榴弹', pts: 3, desc: '遮蔽战场视线，掩护班组冲锋' },
    ]
  },
  {
    id: 'ru-vdv',
    name: '空降突击兵',
    nameEn: 'VDV Assault',
    faction: 'russia',
    category: '步兵',
    cost: 70,
    desc: '俄军空降军精锐，单兵战斗力远超普通步兵。可通过直升机或空投方式部署于敌后，具备极强的攻坚与要点夺取能力。',
    equipment: [
      { icon: '🔫', name: 'AK-74M / AN-94突击步枪', pts: 15, desc: 'AN-94双点射模式可在极短时间命中目标' },
      { icon: '🚀', name: 'RPG-29"吸血鬼"火箭筒', pts: 22, desc: '穿甲厚度达750mm，可穿透现代主战坦克正面装甲' },
      { icon: '💣', name: 'RGD-5手榴弹', pts: 5, desc: '攻防两用，近战清场利器' },
      { icon: '🦺', name: '6B45战斗防护背心', pts: 28, desc: '全身防护系统，防护等级高于普通步兵' },
    ]
  },
  {
    id: 'ru-spetsnaz',
    name: '特种部队',
    nameEn: 'Spetsnaz',
    faction: 'russia',
    category: '步兵',
    cost: 95,
    desc: '俄联邦特种作战部队，在侦察渗透、突袭清除与引导精确打击方面均达到世界顶尖水平。擅长夜战与近身格斗，极难被发现。',
    equipment: [
      { icon: '🔫', name: 'AS Val消音突击步枪', pts: 20, desc: '内置消音器，9x39mm亚音速弹，近距离几乎无声' },
      { icon: '🔫', name: 'VSS "针线"消音狙击步枪', pts: 22, desc: '300m内精准点杀，配合热成像效果极佳' },
      { icon: '🚀', name: 'RPG-26一次性火箭筒', pts: 15, desc: '轻量化，对付轻装甲目标' },
      { icon: '🎯', name: '激光目标指示器', pts: 18, desc: '为炮兵与空袭单位提供实时精确坐标' },
      { icon: '💻', name: '战术平板终端', pts: 20, desc: '接收无人机侦察数据，掌握战场全局' },
    ]
  },
  {
    id: 'ru-igla-team',
    name: '针式防空组',
    nameEn: 'Igla AA Team',
    faction: 'russia',
    category: '步兵',
    cost: 45,
    desc: '携带9K38"针"式单兵防空导弹的步兵小组，可隐蔽于丛林或建筑中伏击低空目标，对直升机构成严重威胁。',
    equipment: [
      { icon: '🚀', name: '9K38-1针M型导弹', pts: 28, desc: '被动红外制导，射程5.2km，最大射高3.5km' },
      { icon: '🎯', name: '1L110目标识别装置', pts: 10, desc: '辅助判断目标机型，防止误击' },
      { icon: '🔫', name: 'AK-74M（自卫）', pts: 5, desc: '发射后转移期间防身武器' },
      { icon: '👂', name: '声学预警系统', pts: 2, desc: '通过发动机噪声特征提前预判目标方向' },
    ]
  },
  {
    id: 'ru-kornet-team',
    name: '科尔内特反坦克组',
    nameEn: 'Kornet AT Team',
    faction: 'russia',
    category: '步兵',
    cost: 65,
    desc: '装备9M133科尔内特激光制导反坦克导弹的步兵组，是俄军步兵对抗重型装甲的核心手段，穿甲能力可击穿任何现役主战坦克。',
    equipment: [
      { icon: '🚀', name: '9M133科尔内特导弹', pts: 40, desc: '激光驾束制导，穿甲厚度1100mm（串联战斗部），射程5500m' },
      { icon: '🎯', name: '双联装发射架', pts: 12, desc: '可同时制导两枚导弹攻击同一目标，对抗主动防护系统' },
      { icon: '🔥', name: '热压（燃料空气）战斗部选项', pts: 8, desc: '对城镇内软目标及工事具有毁灭性效果' },
      { icon: '🔫', name: 'AK-74M（自卫）', pts: 5, desc: '小组自我保护武器' },
    ]
  },
  // ============================================================
  // 战斗载具 · 美国
  // ============================================================
  {
    id: 'us-m1a2-sepv3',
    name: 'M1A2 SEP v3艾布拉姆斯',
    nameEn: 'M1A2 SEP v3 Abrams',
    faction: 'usa',
    category: '战斗载具',
    cost: 240,
    desc: '美军最强主战坦克，装备Trophy主动防护系统。结合超高的防护能力、精准的火控系统与先进的战场感知，是战场上最难被击毁的单辆单位之一。',
    equipment: [
      { icon: '💥', name: 'M256A1 120mm滑膛炮', pts: 70, desc: '发射M829A4 APFSDS穿甲厚度超900mm，亦可使用HEAT-MP多用途弹' },
      { icon: '🛡', name: 'Trophy主动防护系统（APS）', pts: 45, desc: '自动拦截来袭的反坦克导弹与火箭弹，大幅提升生存力' },
      { icon: '🔫', name: 'M2 .50重机枪（遥控）', pts: 15, desc: '遥控武器站，操作手无需暴露于炮塔外' },
      { icon: '🔫', name: 'M240机枪×2', pts: 10, desc: '炮长与装填手位置各一挺，近距离防御步兵' },
      { icon: '👁', name: '第三代前视红外系统', pts: 30, desc: '全天候目标识别与瞄准，夜战能力卓越' },
      { icon: '🛡', name: '贫铀/复合装甲', pts: 70, desc: '车体正面防护等级极高，侧面与后部相对薄弱' },
    ]
  },
  {
    id: 'us-m1a2-hc',
    name: 'M1A2 HC艾布拉姆斯',
    nameEn: 'M1A2 HC Abrams',
    faction: 'usa',
    category: '战斗载具',
    cost: 205,
    desc: '性价比最佳的美军主战坦克。相比SEP v3略微降低了正面装甲厚度，但换取了显著的成本优势，适合需要大量装甲支援的战术场景。',
    equipment: [
      { icon: '💥', name: 'M256 120mm滑膛炮', pts: 65, desc: '穿甲能力略低于SEP v3，但面对多数目标仍足够' },
      { icon: '🔫', name: 'M2重机枪 + M240同轴机枪', pts: 20, desc: '标准反步兵武装' },
      { icon: '👁', name: '第二代前视红外瞄准系统', pts: 22, desc: '夜战与不良天气条件下保持作战效能' },
      { icon: '🛡', name: '复合装甲（无贫铀强化）', pts: 55, desc: '防护能力略低于SEP v3，成本更低' },
    ]
  },
  {
    id: 'us-bradley-m3a3',
    name: 'M3A3布拉德利战车',
    nameEn: 'M3A3 Bradley CFV',
    faction: 'usa',
    category: '战斗载具',
    cost: 130,
    desc: '美军最佳步兵战车，集火力、防护与情报能力于一体。25mm链炮配合TOW导弹可威胁大多数装甲目标，是装甲旅不可或缺的战斗骨干。',
    equipment: [
      { icon: '💥', name: 'M242 25mm大毒蛇链炮', pts: 35, desc: '可发射APDS-T穿甲弹与HEI-T高爆燃烧弹，射速200发/分' },
      { icon: '🚀', name: 'BGM-71 TOW-2B反坦克导弹×2', pts: 40, desc: '顶攻型，穿甲厚度900mm，射程3750m' },
      { icon: '🔫', name: 'M240C同轴机枪', pts: 10, desc: '7.62mm，防步兵火力支援' },
      { icon: '👁', name: '战场管理系统（BMS）', pts: 25, desc: '实时数字化战场感知，共享目标情报给友军' },
      { icon: '🛡', name: '改进型装甲套件（BUSK III）', pts: 20, desc: '额外侧裙装甲，抵御RPG等破甲武器' },
    ]
  },
  {
    id: 'us-stryker-apc',
    name: '斯特赖克步兵战车',
    nameEn: 'Stryker ICV',
    faction: 'usa',
    category: '战斗载具',
    cost: 75,
    desc: '高速轮式装甲车，可搭载9名步兵快速机动。低廉的成本与出色的速度使其成为快速占点、早期侦察和机动防御的首选，弱点是装甲较薄。',
    equipment: [
      { icon: '🔫', name: '遥控武器站（可选装）', pts: 20, desc: '可搭载 M240 7.62mm / M2勃朗宁 .50 / Mk19 40mm / Javelin导弹 四选一' },
      { icon: '💨', name: '烟雾弹发射器×8', pts: 8, desc: '360°遮蔽，快速脱离接敌' },
      { icon: '🚗', name: '7×7轮式驱动', pts: 20, desc: '公路速度100km/h，越野机动性强' },
      { icon: '🛡', name: '双V形底盘', pts: 27, desc: '有效分散地雷与IED爆炸冲击波' },
    ]
  },
  {
    id: 'us-stryker-mgs',
    name: '斯特赖克机动火炮系统',
    nameEn: 'M1128 Stryker MGS',
    faction: 'usa',
    category: '战斗载具',
    cost: 100,
    desc: '装备105mm坦克炮的轮式火力支援车。在快速部队中填补重型反装甲火力空白，但装甲薄弱，不宜正面对抗主战坦克。',
    equipment: [
      { icon: '💥', name: 'M68A2 105mm线膛炮', pts: 45, desc: '发射M900 APFSDS穿甲弹，穿甲厚度约500mm' },
      { icon: '💥', name: 'M456 HEAT-T破甲弹', pts: 15, desc: '对付轻中型装甲目标，亦可使用M393 HESH碎甲弹' },
      { icon: '🔫', name: 'M2重机枪（炮塔顶部）', pts: 12, desc: '近身防御步兵威胁' },
      { icon: '🔭', name: '火控热成像系统', pts: 28, desc: '昼夜目标识别与射击解算' },
    ]
  },
  // ============================================================
  // 战斗载具 · 俄罗斯
  // ============================================================
  {
    id: 'ru-t14-armata',
    name: 'T-14阿玛塔主战坦克',
    nameEn: 'T-14 Armata',
    faction: 'russia',
    category: '战斗载具',
    cost: 390,
    desc: '俄罗斯最先进的第四代主战坦克，采用无人炮塔与全乘员隔离舱设计。Afganit主动防护系统可拦截来袭导弹，是战场上最昂贵但也最强大的陆战力量。',
    equipment: [
      { icon: '💥', name: '2A82-1M 125mm滑膛炮', pts: 100, desc: '穿甲能力超越所有现役西方坦克炮，可发射炮射导弹' },
      { icon: '🛡', name: 'Afganit主动防护系统', pts: 80, desc: '软硬兼施：毫米波雷达探测 + 快速烟雾弹 + 硬杀伤拦截弹' },
      { icon: '🤖', name: '无人遥控炮塔', pts: 60, desc: '乘员全部位于车体隔离舱，防护等级大幅提升' },
      { icon: '🛡', name: 'Malachit爆炸反应装甲（ERA）', pts: 80, desc: '覆盖炮塔与车体各面，对抗串联战斗部' },
      { icon: '👁', name: '第五代多通道火控系统', pts: 70, desc: '全天候目标识别，自动目标追踪，反应速度极快' },
    ]
  },
  {
    id: 'ru-t90m',
    name: 'T-90M主战坦克',
    nameEn: 'T-90M Proryv-3',
    faction: 'russia',
    category: '战斗载具',
    cost: 280,
    desc: '俄军现役主力主战坦克，"突破-3"改型大幅强化防护与火控。相比T-14成本更低，但战斗力依然强悍，适合作为装甲集群的中坚力量。',
    equipment: [
      { icon: '💥', name: '2A46M-5 125mm滑膛炮', pts: 75, desc: '可发射3BM60穿甲弹及9M119M炮射导弹（射程5km）' },
      { icon: '🛡', name: 'Relikt爆炸反应装甲', pts: 55, desc: '新一代ERA，有效对抗串联战斗部与动能穿甲弹' },
      { icon: '🛡', name: 'Shtora-1主动光电对抗系统', pts: 35, desc: '干扰激光制导导弹的制导系统，降低被命中概率' },
      { icon: '💥', name: '自动装弹机', pts: 30, desc: '射速7-8发/分，无需装填手，乘员减为3人' },
      { icon: '👁', name: 'PNK-5全景热成像系统', pts: 45, desc: '车长独立热成像，可同时观察多方向' },
    ]
  },
  {
    id: 'ru-t90',
    name: 'T-90主战坦克',
    nameEn: 'T-90',
    faction: 'russia',
    category: '战斗载具',
    cost: 185,
    desc: '性价比极高的俄军主战坦克，火力与T-90M相近但成本大幅降低。适合大规模编队部署，是低成本装甲战术的核心。',
    equipment: [
      { icon: '💥', name: '2A46M 125mm滑膛炮', pts: 60, desc: '穿甲与破甲弹均可发射，威胁大多数目标' },
      { icon: '🛡', name: 'Kontakt-5爆炸反应装甲', pts: 40, desc: '较旧型ERA，仍能有效对抗常规HEAT弹' },
      { icon: '👁', name: 'Essa热成像火控系统', pts: 35, desc: '夜战与不良天气条件下保持作战效能' },
      { icon: '🔫', name: 'PKMT同轴机枪 + NSV高射机枪', pts: 15, desc: '反步兵防御火力，防空可对付低速目标' },
    ]
  },
  {
    id: 'ru-t80bvm',
    name: 'T-80BVM主战坦克',
    nameEn: 'T-80BVM',
    faction: 'russia',
    category: '战斗载具',
    cost: 220,
    desc: '以燃气轮机为动力的高速主战坦克，寒冷环境中可靠性极佳。Relikt装甲显著提升防护，是俄军装甲部队中机动性最强的重型坦克。',
    equipment: [
      { icon: '💥', name: '2A46M-4 125mm滑膛炮', pts: 65, desc: '可发射炮射导弹9M119，兼顾远距反装甲能力' },
      { icon: '🛡', name: 'Relikt爆炸反应装甲', pts: 50, desc: '全覆盖防护，对抗多种反坦克武器' },
      { icon: '⚡', name: 'GTD-1250燃气轮机', pts: 55, desc: '最大功率1250马力，公路速度70km/h，爆发力强' },
      { icon: '🔫', name: 'NSVT 12.7mm高射机枪', pts: 12, desc: '对付低空目标与步兵' },
    ]
  },
  {
    id: 'ru-bmp3',
    name: 'BMP-3步兵战车',
    nameEn: 'BMP-3',
    faction: 'russia',
    category: '战斗载具',
    cost: 110,
    desc: '俄军先进步兵战车，火力超越同级西方同类产品。100mm炮与30mm链炮组合可威胁轻中型装甲目标，水陆两用能力提供战术灵活性。',
    equipment: [
      { icon: '💥', name: '2A70 100mm低压炮', pts: 30, desc: '可发射炮射导弹9M117 Bastion，兼顾反坦克与火力支援' },
      { icon: '💥', name: '2A72 30mm链炮', pts: 28, desc: '与100mm炮同轴，高速穿甲弹有效对抗轻型装甲' },
      { icon: '🔫', name: 'PKT 7.62mm同轴机枪×3', pts: 10, desc: '多向步兵防御' },
      { icon: '🚤', name: '浮渡推进装置', pts: 20, desc: '水中速度10km/h，无需架桥直接渡河' },
    ]
  },
  {
    id: 'ru-bmpt',
    name: 'BMPT"终结者"战车',
    nameEn: 'BMPT Terminator',
    faction: 'russia',
    category: '战斗载具',
    cost: 195,
    desc: '专为城市战与步坦协同研发的坦克支援战车，双联30mm链炮与多型导弹可360°消灭敌方步兵与反坦克小组，是坦克最佳伴侣。',
    equipment: [
      { icon: '💥', name: '2A42 30mm链炮×2（双联装）', pts: 50, desc: '全方位旋转炮架，超高射速清除步兵与轻装甲' },
      { icon: '🚀', name: '9M120 Ataka反坦克导弹×4', pts: 60, desc: '射程6km，串联战斗部穿甲950mm' },
      { icon: '💣', name: 'AG-17D自动榴弹发射器×2', pts: 30, desc: '压制建筑与掩体后方目标' },
      { icon: '🚀', name: '9M174 Kornet导弹×2（可选）', pts: 35, desc: '激光驾束制导，有效对抗反应装甲坦克' },
      { icon: '🛡', name: 'T-72B级防护装甲', pts: 20, desc: '可抵御大多数小口径武器攻击' },
    ]
  },
  // ============================================================
  // 支援 · 美国
  // ============================================================
  {
    id: 'us-m109-paladin',
    name: 'M109A7帕拉丁自行炮',
    nameEn: 'M109A7 Paladin',
    faction: 'usa',
    category: '支援',
    cost: 140,
    desc: '美军标准自行榴弹炮，数字化火控系统使其能在接到射击命令后60秒内完成部署并开火。可使用激光制导炮弹（铜斑蛇）实现精确打击。',
    equipment: [
      { icon: '💥', name: 'M284 155mm榴弹炮', pts: 60, desc: '射程22km（标准弹），最大射速4发/分' },
      { icon: '🎯', name: 'M712铜斑蛇激光制导炮弹', pts: 35, desc: '由前观察员激光指示，对静止目标精度极高' },
      { icon: '💨', name: 'M825 WP白磷烟雾弹', pts: 15, desc: '战场遮蔽与纵火，清除开阔地带目标' },
      { icon: '💻', name: 'AFATDS自动火力管制系统', pts: 30, desc: '数字化指挥系统，大幅缩短从请求到开火的时间' },
    ]
  },
  {
    id: 'us-m270-mlrs',
    name: 'M270多管火箭炮系统',
    nameEn: 'M270 MLRS',
    faction: 'usa',
    category: '支援',
    cost: 180,
    desc: '强力区域压制武器，单次齐射可覆盖大面积目标。配备GPS制导的GMLRS火箭弹可在70km外精确打击，射后再装填快速，极具威胁。',
    equipment: [
      { icon: '🚀', name: 'M26系列227mm火箭弹×12', pts: 55, desc: '射程45km，子母弹撒布，毁伤面积200m×100m' },
      { icon: '🚀', name: 'M31 GMLRS制导火箭弹', pts: 70, desc: 'GPS/INS复合制导，射程70km，圆概率误差<5m' },
      { icon: '🚀', name: 'MGM-140 ATACMS战术导弹（可选）', pts: 90, desc: '射程165km，对纵深目标实施战略级打击' },
      { icon: '⚡', name: '快速重装系统', pts: 25, desc: '完成射击后7分钟内可重新装填12枚火箭弹' },
    ]
  },
  {
    id: 'us-patriot',
    name: '爱国者PAC-3防空系统',
    nameEn: 'Patriot PAC-3',
    faction: 'usa',
    category: '支援',
    cost: 220,
    desc: '美军核心防空力量，具备拦截弹道导弹、巡航导弹与高速飞机的能力。部署于后方关键区域，为友军装甲集群提供防空保护伞。',
    equipment: [
      { icon: '🚀', name: 'PAC-3 MSE拦截弹', pts: 80, desc: '动能杀伤（HIT-TO-KILL），最大速度Mach 5，射程35km' },
      { icon: '📡', name: 'AN/MPQ-65相控阵雷达', pts: 60, desc: '同时追踪100个目标，探测距离>150km' },
      { icon: '💻', name: '作战管理中心（OMC）', pts: 40, desc: '自动化威胁判断与武器分配，反应时间<10秒' },
      { icon: '🔗', name: 'Link-16战术数据链', pts: 30, desc: '与其他防空系统和指挥部共享空情数据' },
    ]
  },
  // ============================================================
  // 支援 · 俄罗斯
  // ============================================================
  {
    id: 'ru-2s19-msta',
    name: '2S19姆斯塔-S自行炮',
    nameEn: '2S19 Msta-S',
    faction: 'russia',
    category: '支援',
    cost: 130,
    desc: '俄军主力自行榴弹炮，152mm口径提供强大火力投射能力。可发射多种弹种，包括激光制导炮弹科普耶，是俄军炮兵旅的中坚力量。',
    equipment: [
      { icon: '💥', name: '2A64 152mm榴弹炮', pts: 55, desc: '射程25km（增程弹30km），最大射速8发/分' },
      { icon: '🎯', name: '科普耶激光制导炮弹', pts: 32, desc: '激光半主动制导，对硬化目标精度极高' },
      { icon: '💣', name: '3OF45爆破榴弹', pts: 18, desc: '标准杀爆弹，面积杀伤效果优秀' },
      { icon: '🔫', name: 'NSVT 12.7mm防空机枪', pts: 15, desc: '近身防御低空目标' },
    ]
  },
  {
    id: 'ru-bm30-smerch',
    name: 'BM-30龙卷风多管火箭炮',
    nameEn: 'BM-30 Smerch',
    faction: 'russia',
    category: '支援',
    cost: 200,
    desc: '300mm超大口径多管火箭炮，单次齐射12枚火箭弹，可在20秒内将毁伤覆盖面积扩展至67万平方米。是战场上最具震慑力的面积压制武器之一。',
    equipment: [
      { icon: '🚀', name: '9M528 300mm火箭弹×12', pts: 65, desc: '射程90km，子母弹撒布，毁伤面积达67.2公顷' },
      { icon: '🚀', name: '9M542精确制导火箭弹', pts: 80, desc: 'GPS制导版本，射程120km，打击纵深重要目标' },
      { icon: '💣', name: '9N235子母弹战斗部', pts: 40, desc: '携带72枚子炸弹，对人员与非装甲目标毁伤极大' },
      { icon: '🚗', name: 'MAZ-543重型底盘', pts: 35, desc: '高机动底盘，射击后快速转移，躲避反炮兵火力' },
    ]
  },
  {
    id: 'ru-pantsir-s1',
    name: '铠甲-S1弹炮合一防空系统',
    nameEn: 'Pantsir-S1',
    faction: 'russia',
    category: '支援',
    cost: 170,
    desc: '俄军核心近程防空系统，采用导弹与火炮结合的双重拦截手段，可全方位应对低空威胁。能有效对抗无人机、巡航导弹与直升机。',
    equipment: [
      { icon: '🚀', name: '57E6导弹×12', pts: 65, desc: '射程20km，最大射高15km，拦截速度Mach 3目标' },
      { icon: '💥', name: '2A38M 30mm双联装机炮×2', pts: 40, desc: '4000m内对低空目标实施弹幕拦截' },
      { icon: '📡', name: '1RS2-E多功能相控阵雷达', pts: 45, desc: '同时跟踪20个目标，边扫描边跟踪' },
      { icon: '🔗', name: '防空指挥数据链', pts: 20, desc: '与上级防空指挥系统互联，共享空情威胁信息' },
    ]
  },
  // ============================================================
  // 后勤 · 美国
  // ============================================================
  {
    id: 'us-supply-truck',
    name: 'M977重型战术补给车',
    nameEn: 'M977 HEMTT Supply',
    faction: 'usa',
    category: '后勤',
    cost: 40,
    desc: '美军主力后勤补给车，向前线单位输送弹药、燃料与备件。没有补给，任何强大的装甲力量都将止步不前，后勤是战争的生命线。',
    equipment: [
      { icon: '📦', name: '弹药与燃料补给模块', pts: 20, desc: '一次运载可为4辆主战坦克满载弹药与燃料' },
      { icon: '🔫', name: 'M2 .50重机枪（选装）', pts: 8, desc: '基本自卫火力，应对零散威胁' },
      { icon: '🚗', name: '8×8全轮驱动底盘', pts: 8, desc: '具备越野行驶能力，可跟随装甲部队前进' },
      { icon: '📻', name: '战术通讯系统', pts: 4, desc: '与前线单位协调补给时机与地点' },
    ]
  },
  {
    id: 'us-m88-recovery',
    name: 'M88A2赫拉克勒斯救援车',
    nameEn: 'M88A2 Hercules',
    faction: 'usa',
    category: '后勤',
    cost: 70,
    desc: '美军重型装甲救援车，能在战场上拖救被击毁或抛锚的主战坦克。修复受损友军载具可在战场中途重建战斗力，极具战术价值。',
    equipment: [
      { icon: '🔧', name: '63.5吨液压绞盘', pts: 25, desc: '可在任何地形拖救M1A2艾布拉姆斯主战坦克' },
      { icon: '🔧', name: '战场抢修工具套件', pts: 18, desc: '修复履带断裂、发动机故障等常见战损' },
      { icon: '🔫', name: 'M60机枪（车顶）', pts: 10, desc: '驾驶员与维修人员近身防卫' },
      { icon: '🛡', name: 'M1级车体防护', pts: 17, desc: '与M1艾布拉姆斯相同的防护级别，保障维修人员安全' },
    ]
  },
  // ============================================================
  // 后勤 · 俄罗斯
  // ============================================================
  {
    id: 'ru-supply-truck',
    name: 'Ural-4320补给车',
    nameEn: 'Ural-4320 Supply',
    faction: 'russia',
    category: '后勤',
    cost: 30,
    desc: '俄军制式后勤卡车，皮实耐用、维护简单。在恶劣路况和极端天气下依然可靠运作，为前线装甲部队持续输送战斗物资。',
    equipment: [
      { icon: '📦', name: '通用货物补给模块', pts: 14, desc: '可运载弹药、燃料或医疗物资，灵活配置' },
      { icon: '🚗', name: '6×6全轮驱动系统', pts: 8, desc: '良好越野能力，可穿越泥地与雪地' },
      { icon: '🔫', name: 'DShK 12.7mm高射机枪（可选）', pts: 8, desc: '车厢顶部安装，兼顾对空与对地防卫' },
    ]
  },
  {
    id: 'ru-brem1',
    name: 'BREM-1M装甲抢修车',
    nameEn: 'BREM-1M ARV',
    faction: 'russia',
    category: '后勤',
    cost: 65,
    desc: '俄军T-72底盘改装的装甲抢修车，专门用于战场救援与修复任务。强大的牵引能力确保受损坦克能从战场上撤回，是装甲部队的隐形支柱。',
    equipment: [
      { icon: '🔧', name: '25吨液压起重机', pts: 20, desc: '可吊装坦克炮塔与动力组进行战地更换' },
      { icon: '🔧', name: '牵引绞盘系统', pts: 18, desc: '额定牵引力25吨，可拖救T-90及以下重量坦克' },
      { icon: '⛏', name: '推土铲', pts: 12, desc: '快速构筑临时掩护阵地，保护维修作业' },
      { icon: '🔫', name: 'PKT机枪', pts: 5, desc: '基本自卫武装' },
    ]
  },
  // ============================================================
  // 直升机 · 美国
  // ============================================================
  {
    id: 'us-ah64-apache',
    name: 'AH-64E阿帕奇武装直升机',
    nameEn: 'AH-64E Apache Guardian',
    faction: 'usa',
    category: '直升机',
    cost: 200,
    desc: '世界最强武装直升机，具备超强的反坦克能力与全天候作战性能。Longbow毫米波雷达可在云层与烟雾中发现并锁定目标，是装甲部队的噩梦。',
    equipment: [
      { icon: '🚀', name: 'AGM-114L Longbow Hellfire导弹×16', pts: 80, desc: '毫米波主动雷达制导，射程8km，不惧烟雾遮蔽' },
      { icon: '🚀', name: 'Hydra 70火箭弹×38', pts: 25, desc: '对步兵与轻型目标面积压制' },
      { icon: '💥', name: 'M230E1 30mm链炮', pts: 25, desc: '精准点射，压制步兵与轻型载具' },
      { icon: '📡', name: 'AN/APG-78 Longbow毫米波雷达', pts: 40, desc: '30秒内扫描并分类128个目标，同时打击16个' },
      { icon: '🎥', name: 'TADS/PNVS目标获取系统', pts: 30, desc: '全天候目标识别、锁定与激光测距' },
    ]
  },
  {
    id: 'us-uh60-blackhawk',
    name: 'UH-60黑鹰运输直升机',
    nameEn: 'UH-60 Black Hawk',
    faction: 'usa',
    category: '直升机',
    cost: 90,
    desc: '美军核心多用途直升机，主要承担步兵快速投送任务。可在战场热区快速插入步兵小组占领关键地形，也可用于伤员后送与物资补给。',
    equipment: [
      { icon: '👥', name: '11人运载能力', pts: 20, desc: '快速投送一个加强步兵班至任意地点' },
      { icon: '🔫', name: 'M240H 7.62mm舱门机枪×2', pts: 18, desc: '左右舱门各一挺，掩护着陆与离开' },
      { icon: '💨', name: '箔条/红外诱饵弹系统', pts: 22, desc: '对抗红外制导的单兵防空导弹' },
      { icon: '🔦', name: 'AN/AAS-44 FLIR系统（可选）', pts: 30, desc: '夜间目标识别，提升夜间作战能力' },
    ]
  },
  {
    id: 'us-oh58-kiowa',
    name: 'OH-58D科曼奇侦察直升机',
    nameEn: 'OH-58D Kiowa Warrior',
    faction: 'usa',
    category: '直升机',
    cost: 110,
    desc: '轻型武装侦察直升机，凭借桅顶球形传感器可在树线以下隐蔽同时对目标进行观测。武装灵活，是理想的前方侦察平台。',
    equipment: [
      { icon: '📡', name: 'MMS桅顶球形传感器', pts: 30, desc: '含热成像、电视摄像与激光测距/指示，悬停时可观测目标' },
      { icon: '🚀', name: 'AGM-114 Hellfire导弹×2（可选）', pts: 28, desc: '激光制导，精确反装甲' },
      { icon: '🚀', name: 'Hydra 70火箭弹×7（可选）', pts: 12, desc: '面积压制，对步兵有效' },
      { icon: '🔫', name: 'GAU-21 .50重机枪（可选）', pts: 15, desc: '近距离火力支援' },
      { icon: '🚀', name: 'FIM-92毒刺防空导弹×2（可选）', pts: 25, desc: '空对空自卫，防范敌方直升机' },
    ]
  },
  // ============================================================
  // 直升机 · 俄罗斯
  // ============================================================
  {
    id: 'ru-ka52-alligator',
    name: 'Ka-52鳄鱼武装直升机',
    nameEn: 'Ka-52 Alligator',
    faction: 'russia',
    category: '直升机',
    cost: 195,
    desc: '俄军主力武装直升机，采用独特的共轴双桨设计，可在狭小空间内实现高机动飞行。导弹载弹量大，持续战斗力强，是阿帕奇的劲敌。',
    equipment: [
      { icon: '🚀', name: '9M120 Ataka-V导弹×12', pts: 75, desc: '射程6km，无线电指令制导，穿甲950mm' },
      { icon: '💥', name: '2A42 30mm机炮', pts: 25, desc: '低速精准连射，有效清除步兵与轻型目标' },
      { icon: '🚀', name: 'B-8V20A 80mm火箭弹吊舱', pts: 20, desc: '每舱20枚，对面积目标实施火箭弹饱和攻击' },
      { icon: '🚀', name: 'R-60MK近距空空导弹（自卫）', pts: 30, desc: '应对敌方直升机与低速飞机威胁' },
      { icon: '💨', name: 'L-166V1A Otvet红外干扰系统', pts: 20, desc: '干扰来袭红外制导导弹' },
    ]
  },
  {
    id: 'ru-ka52k-katran',
    name: 'Ka-52K海鹰武装直升机',
    nameEn: 'Ka-52K Katran',
    faction: 'russia',
    category: '直升机',
    cost: 195,
    desc: '专为舰载与沿海作战设计，是俄军唯一可挂载顶攻导弹与反辐射导弹的直升机。穿甲能力极强但载弹量略少于鳄鱼。',
    equipment: [
      { icon: '🚀', name: 'Kh-38ME空对地导弹', pts: 50, desc: '精确制导，打击坚固目标，射程40km' },
      { icon: '🚀', name: 'Kh-31PD反辐射导弹', pts: 45, desc: '专门攻击雷达发射源，压制敌方防空系统' },
      { icon: '🚀', name: '9M120 Ataka-V导弹×8', pts: 50, desc: '数量少于鳄鱼但穿甲威力更强' },
      { icon: '💥', name: '2A42 30mm机炮', pts: 25, desc: '反步兵近距火力支援' },
      { icon: '🌊', name: '盐雾防护处理', pts: 10, desc: '机体特殊防腐处理，适应海洋高湿度盐雾环境' },
    ]
  },
  {
    id: 'ru-mi28',
    name: 'Mi-28N夜间猎手攻击直升机',
    nameEn: 'Mi-28N Night Hunter',
    faction: 'russia',
    category: '直升机',
    cost: 210,
    desc: '俄军专用全天候攻击直升机，配备LMUR顶攻导弹，是俄军唯一能在超视距使用顶攻反坦克导弹的直升机平台，对重型装甲威胁极大。',
    equipment: [
      { icon: '🚀', name: '9M305 LMUR顶攻导弹', pts: 85, desc: '绕过装甲最强的正面与侧面，直击顶部薄弱装甲' },
      { icon: '🚀', name: '9M120 Ataka-V导弹×8', pts: 50, desc: '无线电指令制导，备用反装甲武器' },
      { icon: '💥', name: '2A42 30mm机炮', pts: 25, desc: '精准点射，对步兵与轻型目标高度有效' },
      { icon: '📡', name: 'N025桅顶毫米波雷达', pts: 30, desc: '夜间与全天候目标探测，可发现低热信号目标' },
      { icon: '🚀', name: 'Igla-V近程空空导弹（自卫）', pts: 20, desc: '近距离自卫，应对直升机威胁' },
    ]
  },
  {
    id: 'ru-mi8',
    name: 'Mi-8MT运输直升机',
    nameEn: 'Mi-8MT Hip',
    faction: 'russia',
    category: '直升机',
    cost: 75,
    desc: '俄军最可靠的通用运输直升机，皮实耐用、载重量大。可运载完整步兵班并配备一定自卫武装，是投送VDV与特种部队的主要平台。',
    equipment: [
      { icon: '👥', name: '24名士兵运载能力', pts: 22, desc: '可一次投送超过两个步兵班' },
      { icon: '🚀', name: 'B-8V7火箭弹吊舱×4', pts: 20, desc: '共28枚80mm火箭弹，着陆前压制区域' },
      { icon: '🔫', name: 'PKT 7.62mm机枪×3', pts: 12, desc: '机鼻与舱门各一，360°防御覆盖' },
      { icon: '💨', name: '红外诱饵弹系统', pts: 10, desc: '基本对抗单兵防空导弹' },
    ]
  },
  // ============================================================
  // 空袭 · 美国
  // ============================================================
  {
    id: 'us-mq9-reaper',
    name: 'MQ-9死神无人攻击机',
    nameEn: 'MQ-9 Reaper',
    faction: 'usa',
    category: '空袭',
    cost: 110,
    desc: '高空长航时无人攻击机，兼顾侦察与精确打击。凭借优异的滞空时间与多种精确弹药，可对高价值目标实施外科手术式打击，难以被防空系统反制。',
    equipment: [
      { icon: '🚀', name: 'AGM-114R地狱火导弹×4', pts: 40, desc: '激光制导，精确点杀，附带伤害极低' },
      { icon: '💣', name: 'GBU-12铺路石激光制导炸弹×2', pts: 30, desc: '227kg精确制导炸弹，打击坚固掩体' },
      { icon: '📡', name: 'MTS-B多光谱目标指示系统', pts: 25, desc: '光电/红外/激光三合一，全天候目标定位' },
      { icon: '⏱', name: '超长滞空时间', pts: 15, desc: '最长27小时滞空，持续监视与随时打击' },
    ]
  },
  {
    id: 'us-a10-warthog',
    name: 'A-10雷电II攻击机',
    nameEn: 'A-10 Thunderbolt II',
    faction: 'usa',
    category: '空袭',
    cost: 160,
    desc: '专为近距支援设计的"坦克杀手"，装备的GAU-8航炮可在低空飞行时摧毁任何装甲目标。超强的战损容忍能力使其在高威胁环境下依然能坚持任务。',
    equipment: [
      { icon: '💥', name: 'GAU-8 30mm贫铀穿甲弹航炮', pts: 55, desc: '备弹1174发，穿甲厚度>69mm，覆盖大面积目标区域' },
      { icon: '🚀', name: 'AGM-65"小牛"电视制导导弹×6', pts: 45, desc: '锁定后不管，打击装甲与工事' },
      { icon: '💣', name: 'Mk82 227kg通用炸弹×12', pts: 30, desc: '面积压制，适合对付集群目标' },
      { icon: '🛡', name: '钛合金防护座舱', pts: 20, desc: '可承受23mm炮弹直接命中，战损容忍能力极强' },
      { icon: '💨', name: '箔条/红外诱饵弹×480', pts: 10, desc: '大量诱饵弹对抗各类导弹威胁' },
    ]
  },
  {
    id: 'us-f35-lightning',
    name: 'F-35A闪电II战斗机',
    nameEn: 'F-35A Lightning II',
    faction: 'usa',
    category: '空袭',
    cost: 250,
    desc: '五代隐身多用途战斗机，低雷达信号特征使其能突破敌方防空系统实施精确打击。多传感器融合系统赋予飞行员无与伦比的战场感知能力。',
    equipment: [
      { icon: '💣', name: 'GBU-31 JDAM 900kg卫星制导炸弹×2（内置弹仓）', pts: 90, desc: '全天候GPS制导，不受气象影响' },
      { icon: '🚀', name: 'AIM-120D AMRAAM空空导弹×2', pts: 50, desc: '主动雷达制导，射程180km，自卫兼反无人机' },
      { icon: '💥', name: 'GAU-22/A 25mm航炮（内置）', pts: 25, desc: '182发备弹，近距离补充攻击' },
      { icon: '🎭', name: '低可观测隐身涂层', pts: 55, desc: '正面RCS<0.001㎡，极难被防空雷达探测锁定' },
      { icon: '🔗', name: 'MADL多功能先进数据链', pts: 30, desc: '实时共享传感器数据给战场其他平台' },
    ]
  },
  // ============================================================
  // 空袭 · 俄罗斯
  // ============================================================
  {
    id: 'ru-su25-frogfoot',
    name: 'Su-25蛙足攻击机',
    nameEn: 'Su-25 Frogfoot',
    faction: 'russia',
    category: '空袭',
    cost: 130,
    desc: '俄军近距支援攻击机，坚固耐用，火力强大。双发发动机与钛合金座舱具备良好战损容忍能力，是俄军步兵最值得信赖的空中支援力量。',
    equipment: [
      { icon: '💥', name: 'GSh-30-2 30mm双管航炮', pts: 30, desc: '250发，对地面步兵与轻装甲目标高度有效' },
      { icon: '🚀', name: 'Kh-25ML激光制导导弹×4', pts: 50, desc: '精确打击坚固目标，射程10km' },
      { icon: '🚀', name: 'B-8M 80mm火箭弹吊舱×4', pts: 25, desc: '每舱20枚，对集群目标实施饱和打击' },
      { icon: '🛡', name: '钛合金座舱防护', pts: 15, desc: '可承受12.7mm穿甲弹命中，战损容忍能力强' },
      { icon: '💨', name: 'L-166V红外干扰系统', pts: 10, desc: '对抗便携式防空导弹' },
    ]
  },
  {
    id: 'ru-su34-fullback',
    name: 'Su-34战斗轰炸机',
    nameEn: 'Su-34 Fullback',
    faction: 'russia',
    category: '空袭',
    cost: 230,
    desc: '俄军最强战斗轰炸机，兼具超强载弹量与可观的空战能力。多种精确制导武器使其能从防区外安全距离打击高价值目标。',
    equipment: [
      { icon: '💣', name: 'KAB-500L激光制导炸弹×4', pts: 65, desc: '500kg级精确炸弹，对坚固目标效果显著' },
      { icon: '🚀', name: 'Kh-31PD反辐射导弹×2', pts: 55, desc: '压制敌方防空雷达，开辟空中走廊' },
      { icon: '🚀', name: 'Kh-38MA空对地导弹', pts: 60, desc: '主动雷达制导，射程40km，防区外精确打击' },
      { icon: '🚀', name: 'R-77 RVV-AE空空导弹×2', pts: 30, desc: '主动雷达制导，自卫兼拦截' },
      { icon: '💥', name: 'GSh-30-1 30mm航炮', pts: 20, desc: '150发，近距离补充火力' },
    ]
  },
  {
    id: 'ru-lancet-uav',
    name: 'Lancet-3游荡弹药',
    nameEn: 'Lancet-3 Loitering Munition',
    faction: 'russia',
    category: '空袭',
    cost: 70,
    desc: '俄军新一代游荡弹药，可在目标区域上空徘徊等待合适攻击时机。凭借较低的成本和高精度，已成为打击防空雷达与炮兵阵地的重要手段。',
    equipment: [
      { icon: '💣', name: '3kg累积破甲战斗部', pts: 25, desc: '小当量精确打击，主要针对雷达、车顶薄弱装甲' },
      { icon: '📷', name: '光电寻的系统', pts: 20, desc: '操作员实时画面制导，最后攻击阶段自主追踪' },
      { icon: '⏱', name: '40分钟滞空时间', pts: 15, desc: '在目标区域盘旋等待最佳攻击窗口' },
      { icon: '🔇', name: '低噪声电动推进', pts: 10, desc: '小型电机，低声学特征，难以被听音预警' },
    ]
  },
];

// =============================================
// 筛选与渲染逻辑
// =============================================

let activeFaction  = 'all';
let activeCategory = 'all';

function initFilters() {
  const params = new URLSearchParams(window.location.search);
  const presetCat = params.get('cat');
  if (presetCat) activeCategory = presetCat;

  document.querySelectorAll('.filter-btn[data-faction]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeFaction = btn.dataset.faction;
      document.querySelectorAll('.filter-btn[data-faction]').forEach(b => {
        b.className = b.className.replace(/ active-usa| active-russia| active/g, '').trim();
      });
      if (activeFaction === 'usa')         btn.classList.add('active-usa');
      else if (activeFaction === 'russia') btn.classList.add('active-russia');
      else btn.classList.add('active');
      renderUnits();
    });
  });

  document.querySelectorAll('.filter-btn[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.cat;
      document.querySelectorAll('.filter-btn[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderUnits();
    });
  });

  // 初始高亮
  document.querySelectorAll('.filter-btn[data-cat]').forEach(b => {
    if (b.dataset.cat === activeCategory) b.classList.add('active');
  });
  document.querySelectorAll('.filter-btn[data-faction]').forEach(b => {
    if (b.dataset.faction === activeFaction) b.classList.add('active');
  });
}

function renderUnits() {
  const container = document.getElementById('units-grid');
  const countEl   = document.getElementById('units-count');

  const filtered = UNITS.filter(u => {
    const factionOk  = activeFaction  === 'all' || u.faction  === activeFaction;
    const categoryOk = activeCategory === 'all' || u.category === activeCategory;
    return factionOk && categoryOk;
  });

  countEl.innerHTML = `显示 <span>${filtered.length}</span> / ${UNITS.length} 个单位`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <div class="empty-state-text">未找到符合筛选条件的单位</div>
      </div>`;
    return;
  }

  // 按分类分组渲染
  const catsToShow = activeCategory === 'all'
    ? CATEGORIES.map(c => c.id)
    : [activeCategory];

  let html = '';
  catsToShow.forEach(catId => {
    const catMeta  = CATEGORIES.find(c => c.id === catId);
    const catUnits = filtered.filter(u => u.category === catId);
    if (!catUnits.length) return;

    const cardsHtml = catUnits.map(u => buildCard(u)).join('');

    html += `
      <div class="cat-section">
        <div class="cat-section-header">
          <span class="cat-section-icon">${catMeta.icon}</span>
          <span class="cat-section-title">${catMeta.id}</span>
          <span class="cat-section-en">${catMeta.en}</span>
          <span class="cat-section-count">${catUnits.length} 个单位</span>
        </div>
        <div class="units-grid">${cardsHtml}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  // 绑定展开配件面板
  container.querySelectorAll('.unit-equip-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = toggle.nextElementSibling;
      toggle.classList.toggle('open');
      panel.classList.toggle('open');
    });
  });
}

function buildCard(u) {
  const factionLabel = u.faction === 'usa' ? '🇺🇸 美国' : '🇷🇺 俄罗斯';
  const factionBadge = u.faction === 'usa'
    ? `<span class="badge badge-usa">${factionLabel}</span>`
    : `<span class="badge badge-russia">${factionLabel}</span>`;

  const catIcons = {
    '侦察': '👁', '步兵': '🪖', '战斗载具': '🚂',
    '支援': '🎯', '后勤': '📦', '直升机': '🚁', '空袭': '✈'
  };

  const equipItems = u.equipment.map(e => `
    <li class="equip-item">
      <span class="equip-icon">${e.icon}</span>
      <div class="equip-info">
        <div class="equip-name">
          ${e.name}
          <span class="equip-pts">${e.pts} 点</span>
        </div>
        <div class="equip-desc">${e.desc}</div>
      </div>
    </li>
  `).join('');

  return `
    <div class="unit-card ${u.faction}">
      <div class="unit-card-header">
        <div class="unit-title-area">
          <div class="unit-name">${u.name}</div>
          <div style="font-size:12px;font-family:var(--font-mono);color:var(--text-muted);font-weight:400;margin-bottom:8px">${u.nameEn}</div>
          <div class="unit-badges">
            <span class="badge badge-category">${catIcons[u.category] || ''} ${u.category}</span>
            ${factionBadge}
          </div>
        </div>
        <div>
          <div class="unit-cost">${u.cost}</div>
          <div class="unit-cost-label">点数</div>
        </div>
      </div>
      <div class="unit-card-body">
        <p class="unit-desc">${u.desc}</p>
        <div class="unit-equip-toggle">
          <span>⚙ 装备配件 (${u.equipment.length})</span>
          <span class="toggle-arrow">▼</span>
        </div>
        <div class="unit-equip-panel">
          <ul class="equip-list">${equipItems}</ul>
        </div>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  renderUnits();
});
