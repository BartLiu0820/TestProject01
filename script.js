// =============================================
// BROKEN ARROW — 兵种数据库 & 筛选逻辑
// =============================================

/* ── SVG 军事战术图标 (NATO APP-6 风格) ── */
const SVG_ICONS = {

  // 侦察：双镜头望远镜 + 中心点
  '侦察': `<svg viewBox="0 0 28 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <circle cx="7.5" cy="14" r="6"/>
    <circle cx="20.5" cy="14" r="6"/>
    <path d="M7.5 8V5M20.5 8V5M7.5 5Q14 1.5 20.5 5"/>
    <line x1="13.5" y1="14" x2="14.5" y2="14" stroke-width="3" stroke-linecap="round"/>
    <circle cx="7.5" cy="14" r="2" fill="currentColor" stroke="none"/>
    <circle cx="20.5" cy="14" r="2" fill="currentColor" stroke="none"/>
  </svg>`,

  // 步兵：交叉步枪（NATO步兵符号）
  '步兵': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
    <line x1="4" y1="20" x2="20" y2="4"/>
    <line x1="20" y1="20" x2="4" y2="4"/>
    <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none"/>
    <line x1="4" y1="4" x2="7" y2="7"/>
    <line x1="20" y1="4" x2="17" y2="7"/>
  </svg>`,

  // 战斗载具：侧视坦克剪影
  '战斗载具': `<svg viewBox="0 0 32 22" fill="currentColor" stroke="none">
    <rect x="2" y="12" width="28" height="8" rx="2"/>
    <rect x="8" y="7" width="16" height="7" rx="1.5"/>
    <rect x="15" y="2" width="12" height="5" rx="1"/>
    <rect x="2" y="15" width="4" height="5" rx="1"/>
    <rect x="26" y="15" width="4" height="5" rx="1"/>
    <circle cx="6" cy="20" r="2" fill="#000" opacity="0.3"/>
    <circle cx="26" cy="20" r="2" fill="#000" opacity="0.3"/>
  </svg>`,

  // 支援：炮击靶心
  '支援': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/>
    <line x1="12" y1="1" x2="12" y2="5"/>
    <line x1="12" y1="19" x2="12" y2="23"/>
    <line x1="1" y1="12" x2="5" y2="12"/>
    <line x1="19" y1="12" x2="23" y2="12"/>
  </svg>`,

  // 后勤：补给箱 + 加号
  '后勤': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect x="3" y="9" width="18" height="13" rx="2"/>
    <path d="M8 9V6Q12 2.5 16 6V9"/>
    <line x1="12" y1="13" x2="12" y2="18"/>
    <line x1="9.5" y1="15.5" x2="14.5" y2="15.5"/>
  </svg>`,

  // 直升机：侧视直升机轮廓
  '直升机': `<svg viewBox="0 0 32 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
    <line x1="1" y1="9" x2="31" y2="9" stroke-width="2.5"/>
    <path d="M11 9 L10 17 Q16 22 22 17 L21 9"/>
    <line x1="16" y1="17" x2="16" y2="23"/>
    <line x1="12" y1="23" x2="20" y2="23"/>
    <circle cx="11" cy="9" r="2" fill="currentColor" stroke="none"/>
  </svg>`,

  // 空袭：战斗机侧视剪影
  '空袭': `<svg viewBox="0 0 32 26" fill="currentColor" stroke="none">
    <path d="M2 17 L14 6 L22 10 L18 14 L24 15 L20 18 L17 22 L13 17 L7 21 Z"/>
    <path d="M22 10 L30 8 L28 12 L22 12 Z" opacity="0.7"/>
  </svg>`,
};

/* ── 兵种图片映射（参考资源 PNG 图标）── */
const IMG_DIR = '参考资源/BArmory.net _ 机库_files/';
const UNIT_IMAGES = {
  // USA — 侦察
  'us-scout-sniper':    'US_SCOUT_SNIPERS.png',
  'us-gray-eagle':      'US_MQ_9.png',
  'us-m1117':           'US_M1117.png',
  'us-marine-recon':    'US_FORCE_RECON.png',
  'us-bfist':           'US_BRADLEY_FIST.png',
  'us-pathfinder':      'US_SCOUTS.png',
  'us-stryker-nbc':     'US_STRYKER_ESV.png',
  'us-jtac-socom':      'US_SCOUTS.png',
  // USA — 步兵
  'us-rifle-squad':     'US_MECH_RIFLEMEN.png',
  'us-javelin-team':    'US_M240_JAVELIN.png',
  'us-stinger-team':    'US_STINGER_F.png',
  'us-rangers':         'US_RANGERS.png',
  'us-sf-oda':          'US_GREEN_BERETS.png',
  'us-smaw-team':       'US_SMAW_TEAM.png',
  'us-airborne-squad':  'US_PARATROOPERS.png',
  'us-delta-force':     'US_DELTA_FORCE.png',
  'us-seal-team':       'US_MARINE_RAIDERS.png',
  // USA — 战斗载具
  'us-m1a2-sepv3':      'US_M1A2_SEPV3.png',
  'us-m1a2-hc':         'US_M1A2_HC.png',
  'us-bradley-m3a3':    'US_M3A3_CFV.png',
  'us-stryker-apc':     'US_STRYKER_ICV.png',
  'us-stryker-mgs':     'US_STRYKER_MGS.png',
  'us-aav7p1':          'US_AAVP.png',
  'us-lav25':           'US_LAV25.png',
  'us-m551-sheridan':   'US_SHERIDAN.png',
  'us-stryker-atgm':    'US_STRYKER_ATGM.png',
  'us-m1a1-abrams':     'US_M1A1_HC.png',
  'us-humvee-m1152':    'US_HUMVEE_PATROL.png',
  // USA — 支援
  'us-m109-paladin':    'US_M109_PALADIN.png',
  'us-m270-mlrs':       'US_M270A1.png',
  'us-patriot':         'US_PATRIOT_PAC3.png',
  'us-himars':          'US_HIMARS.png',
  'us-m1129-mc':        'US_STRYKER_MC.png',
  'us-m224-mortar':     'US_AMPV_MC.png',
  'us-m777-howitzer':   'US_M2.png',
  'us-m119-howitzer':   'US_M2.png',
  // USA — 后勤
  'us-supply-truck':    'US_HEMTT.png',
  'us-ch47-chinook-log':'US_CH47.png',
  'us-lcac':            'US_AAVP.png',
  'us-m88-recovery':    'US_M1150.png',
  // USA — 直升机
  'us-ah64-apache':     'US_AH64_APACHE.png',
  'us-uh60-blackhawk':  'US_UH60M.png',
  'us-oh58-kiowa':      'US_OH58_KIOWA.png',
  'us-ah1z-viper':      'US_AH_1Z.png',
  'us-mv22-osprey':     'US_MV22.png',
  'us-mh60l':           'US_MH60M_SOAR.png',
  'us-mh6-littlebird':  'US_MH6.png',
  'us-ch53e-seahorse':  'US_CH53.png',
  // USA — 空袭
  'us-mq9-reaper':      'US_MQ_9.png',
  'us-a10-warthog':     'US_A10.png',
  'us-f35-lightning':   'US_F35.png',
  'us-av8b-harrier':    'US_AV8B_PLUS.png',
  'us-f18d-hornet':     'US_FA18D.png',
  'us-c130h':           'US_C130.png',
  'us-ac130u':          'US_AC130_GUNSHIP.png',
  'us-f16c-viper':      'US_F16_BLOCK52.png',
  'us-f22a-raptor':     'US_F22.png',
  'us-b2-spirit':       'US_B2.png',
  // Russia — 侦察
  'ru-sniper':          'RU_SNAIPERY_SV98.png',
  'ru-orlan10':         'RU_FORPOST.png',
  'ru-brdm2':           'RU_BRDM2.png',
  'ru-motor-scout':     'RU_RAZVEDKA.png',
  'ru-vdv-scout':       'RU_VDV_RAZVEDKA.png',
  'ru-naval-scout':     'RU_MORSKAYA_RAZVEDKA.png',
  'ru-orion-uav':       'RU_ORION.png',
  // Russia — 步兵
  'ru-motostrelki':     'RU_MOTOSTRELKI.png',
  'ru-vdv':             'RU_VDV_ASAULT.png',
  'ru-spetsnaz':        'RU_SPECNAZ_GRU.png',
  'ru-igla-team':       'RU_IGLA_AK.png',
  'ru-kornet-team':     'RU_KORNET.png',
  'ru-naval-marines':   'RU_MORSKAYA_PEHOTA.png',
  'ru-ksso-alpha':      'RU_SSO_CQC.png',
  'ru-9k333-verba':     'RU_VERBA.png',
  // Russia — 战斗载具
  'ru-t14-armata':      'RU_T14.png',
  'ru-t90m':            'RU_T90M.png',
  'ru-t90':             'RU_T90A.png',
  'ru-t80bvm':          'RU_T80_BVM.png',
  'ru-bmp3':            'RU_BMP3.png',
  'ru-bmpt':            'RU_BMPT.png',
  'ru-btr82a':          'RU_BTR82.png',
  'ru-bmp2':            'RU_BMP2.png',
  'ru-bmd4m':           'RU_BMD_4.png',
  'ru-bmd4m-btr-mdm':   'RU_BTR_MDM.png',
  'ru-2s25m-sprut':     'RU_SPRUT_SD.png',
  'ru-pt76b':           'RU_PT76.png',
  'ru-bmp3f':           'RU_BMP3F.png',
  'ru-kornet-d':        'RU_KORNET_D1.png',
  'ru-t72b3m':          'RU_T72B.png',
  'ru-btr80':           'RU_BTR80.png',
  // Russia — 支援
  'ru-2s19-msta':       'RU_MSTA.png',
  'ru-bm30-smerch':     'RU_BM_30.png',
  'ru-pantsir-s1':      'RU_TUNGUSKA.png',
  'ru-2s1-gvozdika':    'RU_2S1_GVOZDIKA.png',
  'ru-tos1a':           'RU_TOS.png',
  'ru-tos2-tosochka':   'RU_TOS.png',
  'ru-2s35-koalitsiya': 'RU_KOALITSIYA.png',
  'ru-2s9-nona':        'RU_NONA_S.png',
  'ru-s300v4':          'RU_S300.png',
  'ru-2k22-tunguska':   'RU_TUNGUSKA.png',
  'ru-d30-howitzer':    'RU_BM_21.png',
  'ru-2a65-msta-b':     'RU_MSTA.png',
  // Russia — 后勤
  'ru-supply-truck':    'RU_URAL_4320.png',
  'ru-brem1':           'RU_MTLB.png',
  'ru-bk16-boat':       'RU_PTS4.png',
  // Russia — 直升机
  'ru-ka52-alligator':  'RU_KA52.png',
  'ru-ka52k-katran':    'RU_KA52K.png',
  'ru-mi28':            'RU_MI28N.png',
  'ru-mi8':             'RU_MI8_MTV5.png',
  'ru-mi24v':           'RU_MI24_VP.png',
  'ru-mi8amtsh':        'RU_MI8_AMTSH.png',
  'ru-ka29':            'RU_KA29.png',
  // Russia — 空袭
  'ru-su25-frogfoot':   'RU_SU25.png',
  'ru-su34-fullback':   'RU_SU34.png',
  'ru-lancet-uav':      'RU_KORSAR.png',
  'ru-su57-felon':      'RU_SU57.png',
  'ru-su24m2':          'RU_SU24M2.png',
  'ru-kh101-strike':    'RU_TU160.png',
  // USA — 新增单位
  'us-army-snipers':        'US_ARMY_SNIPERS.png',
  'us-cavalry-scouts':      'US_CAVALRY_SCOUTS.png',
  'us-tow2-team':           'US_TOW2.png',
  'us-cav-riflemen':        'US_CAV_RIFLEMEN.png',
  'us-humvee-avenger':      'US_HUMVEE_AVENGER.png',
  'us-stryker-shorad':      'US_STRYKER_SHORAD.png',
  'us-bradley-linebacker':  'US_BRADLEY_LINEBACKER.png',
  'us-acv':                 'US_ACV.png',
  'us-lav-ad':              'US_LAV_AD.png',
  'us-m10-booker':          'US_BOOKER.png',
  'us-ah1w-cobra':          'US_AH_1W.png',
  'us-uh1y-venom':          'US_UH1Y_VENOM.png',
  'us-f15e-strike-eagle':   'US_F15E.png',
  'us-b1b-lancer':          'US_B1B.png',
  // Russia — 新增单位
  'ru-t15-armata':          'RU_T15.png',
  'ru-kurganets25':         'RU_KURGANETS.png',
  'ru-brm3k':               'RU_BRM_3K.png',
  'ru-shilka':              'RU_SHILKA.png',
  'ru-strela10m':           'RU_STRELA10M.png',
  'ru-buk-m2':              'RU_BUK_M2.png',
  'ru-tor-m2':              'RU_TOR.png',
  'ru-malka':               'RU_MALKA.png',
  'ru-vdv-sniper':          'RU_VDV_SNIPER_T5000.png',
  'ru-specnaz-vmf':         'RU_SPECNAZ_VMF.png',
  'ru-mi35m':               'RU_MI35M.png',
  'ru-su27sm':              'RU_SU27SM.png',
  'ru-tu22m3':              'RU_TU22M3.png',
  'ru-nona-svk':            'RU_NONA_SVK.png',
};

/* ── 兵种配件图标映射（统一 SVG 风格）── */
const EQUIP_ICONS = {
  // 武器
  gun:      `<svg viewBox="0 0 28 14" fill="currentColor"><path d="M2 5h16l2 2h4l1 2H2z"/><rect x="4" y="8" width="3" height="5" rx="1"/><rect x="18" y="6" width="1.5" height="5" rx="0.5"/></svg>`,
  rocket:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2 C16 2 20 6 20 12 L12 22 L4 12 C4 6 8 2 12 2Z"/><circle cx="12" cy="10" r="2.5" fill="currentColor" stroke="none"/><path d="M8 19 L5 23M16 19 L19 23"/></svg>`,
  bomb:     `<svg viewBox="0 0 22 24" fill="currentColor"><ellipse cx="11" cy="14" rx="8" ry="9"/><rect x="9" y="2" width="4" height="5" rx="1"/><path d="M13 2 L17 1 L16 4" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>`,
  cannon:   `<svg viewBox="0 0 28 16" fill="currentColor"><rect x="2" y="5" width="18" height="6" rx="2"/><rect x="18" y="6" width="8" height="4" rx="1"/><circle cx="5" cy="13" r="3"/><circle cx="13" cy="13" r="3"/></svg>`,
  // 防护
  shield:   `<svg viewBox="0 0 22 26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2 L20 6 V13 C20 19 11 24 11 24 C11 24 2 19 2 13 V6 Z"/></svg>`,
  armor:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2 L20 5 V12 C20 17 16 21 12 22 C8 21 4 17 4 12 V5 Z"/><path d="M9 11 L11 13 L15 9" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  // 电子/传感器
  radar:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 12 L20 6"/><path d="M12 3 A9 9 0 0 1 21 12" stroke-dasharray="3 2"/><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none"/></svg>`,
  sensor:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M5 19 C3 16 3 8 5 5"/><path d="M8 16 C7 14 7 10 8 8"/><path d="M19 19 C21 16 21 8 19 5"/><path d="M16 16 C17 14 17 10 16 8"/><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/></svg>`,
  drone:    `<svg viewBox="0 0 28 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><line x1="4" y1="10" x2="24" y2="10"/><circle cx="14" cy="10" r="4"/><circle cx="4" cy="10" r="3"/><circle cx="24" cy="10" r="3"/><line x1="10" y1="7" x2="18" y2="13"/><line x1="18" y1="7" x2="10" y2="13"/></svg>`,
  // 辅助
  supply:   `<svg viewBox="0 0 24 22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="12" rx="2"/><path d="M8 8V5Q12 2 16 5V8"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg>`,
  comms:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 17 C3 10 8 4 12 4 C16 4 21 10 21 17"/><path d="M7 17 C7 12 9 8 12 8 C15 8 17 12 17 17"/><circle cx="12" cy="17" r="2.5" fill="currentColor" stroke="none"/></svg>`,
  wrench:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
  // 通用
  default:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="8"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/></svg>`,
};

/* 配件图标分类规则 */
function getEquipIcon(equipName, emojiHint) {
  const n = equipName;
  if (/导弹|missile|Hellfire|Ataka|LMUR|Kornet|Javelin|TOW|Igla|毒刺|针式|Stinger|AMRAAM|R-77|R-60/i.test(n)) return EQUIP_ICONS.rocket;
  if (/炸弹|JDAM|KAB|GBU|Mk8|bomb/i.test(n)) return EQUIP_ICONS.bomb;
  if (/炮|cannon|Paladin|Msta|龙卷风|Smerch|MLRS|火箭炮|榴弹炮/i.test(n)) return EQUIP_ICONS.cannon;
  if (/步枪|机枪|卡宾|AK|HK|M4|AS Val|VSS|SVD|KSVK|勃朗宁|PKT|NSVT|DShK|GAU|GSh|2A4|2A7|链炮/i.test(n)) return EQUIP_ICONS.gun;
  if (/装甲|防护|ERA|APS|Trophy|Afganit|Relikt|Kontakt|Shtora|Malachit|贫铀|复合装甲|钛合金/i.test(n)) return EQUIP_ICONS.armor;
  if (/主动防护|APS|拦截|盾|shield/i.test(n)) return EQUIP_ICONS.shield;
  if (/雷达|radar|相控阵|MPQ|APG|Longbow|毫米波|N025/i.test(n)) return EQUIP_ICONS.radar;
  if (/传感器|FLIR|热成像|红外|光电|MTS|TADS|PNVS|AN\/PAS|MMS|瞄准系统|目标指示|激光/i.test(n)) return EQUIP_ICONS.sensor;
  if (/无人机|UAV|ROVER|数据链|Link|BMS|通讯|电台|终端|数字化|加密/i.test(n)) return EQUIP_ICONS.comms;
  if (/补给|supply|弹药|燃料|物资|后勤|救援|绞盘|抢修|起重|推土/i.test(n)) return EQUIP_ICONS.supply;
  if (/无人机|drone|Orlan|Gray Eagle|Reaper|Lancet|游荡/i.test(n)) return EQUIP_ICONS.drone;
  if (/维修|修复|工具|扳手|维护/i.test(n)) return EQUIP_ICONS.wrench;
  return EQUIP_ICONS.default;
}

/* 阵营徽章 HTML */
function factionBadgeHTML(faction) {
  if (faction === 'usa') {
    return `<span class="faction-badge usa"><img class="faction-flag-img" src="${IMG_DIR}usa flag.png" alt="USA" onerror="this.style.display='none'"> USA</span>`;
  }
  return `<span class="faction-badge russia"><img class="faction-flag-img" src="${IMG_DIR}rus flag.png" alt="RUS" onerror="this.style.display='none'"> RUS</span>`;
}

const CATEGORIES = [
  { id: '侦察',    en: 'RECON' },
  { id: '步兵',    en: 'INFANTRY' },
  { id: '战斗载具', en: 'FIGHTING VEHICLES' },
  { id: '支援',    en: 'SUPPORT' },
  { id: '后勤',    en: 'LOGISTICS' },
  { id: '直升机',  en: 'HELICOPTER' },
  { id: '空袭',    en: 'AIRSTRIKE' },
];

const SPECS = {
  // USA
  marine:   { label: '海军陆战队', faction: 'usa',    icon: '⚓' },
  armor:    { label: '装甲旅',     faction: 'usa',    icon: '🛡' },
  airborne: { label: '空降步兵',   faction: 'usa',    icon: '🪂' },
  stryker:  { label: '斯特赖克骑兵', faction: 'usa',  icon: '🚗' },
  socom:    { label: '特种作战',   faction: 'usa',    icon: '🎖' },
  // Russia
  motor:    { label: '摩托化步兵', faction: 'russia', icon: '🚶' },
  armored:  { label: '装甲集团军', faction: 'russia', icon: '🛡' },
  vdv:      { label: '空降军',     faction: 'russia', icon: '🪂' },
  naval:    { label: '海军步兵',   faction: 'russia', icon: '⚓' },
  spetsnaz: { label: '特种部队',   faction: 'russia', icon: '🎖' },
};

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
    specs: ['marine'],
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
    specs: ['armor'],
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
    specs: ['stryker'],
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
    specs: ['spetsnaz'],
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
    specs: ['motor'],
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
    specs: ['motor'],
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
    specs: ['armor'],
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
    specs: ['airborne'],
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
    specs: ['airborne'],
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
    specs: ['airborne'],
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
    specs: ['socom'],
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
    specs: ['motor'],
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
    specs: ['vdv'],
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
    specs: ['spetsnaz'],
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
    specs: ['vdv'],
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
    specs: ['motor'],
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
    specs: ['armor'],
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
    specs: ['armor'],
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
    specs: ['armor'],
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
    specs: ['stryker'],
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
    specs: ['stryker'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armor'],
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
    specs: ['armor'],
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
    specs: ['armor'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['armor'],
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
    specs: ['armor'],
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
    specs: ['motor'],
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
    specs: ['armored'],
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
    specs: ['armor'],
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
    specs: ['airborne'],
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
    specs: ['armor'],
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
    specs: ['armored'],
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
    specs: ['naval'],
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
    specs: ['armored'],
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
    specs: ['vdv'],
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
    specs: ['socom'],
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
    specs: ['armor'],
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
    specs: ['socom'],
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
    specs: ['armored'],
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
    specs: ['armored'],
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
    specs: ['spetsnaz'],
    cost: 70,
    desc: '俄军新一代游荡弹药，可在目标区域上空徘徊等待合适攻击时机。凭借较低的成本和高精度，已成为打击防空雷达与炮兵阵地的重要手段。',
    equipment: [
      { icon: '💣', name: '3kg累积破甲战斗部', pts: 25, desc: '小当量精确打击，主要针对雷达、车顶薄弱装甲' },
      { icon: '📷', name: '光电寻的系统', pts: 20, desc: '操作员实时画面制导，最后攻击阶段自主追踪' },
      { icon: '⏱', name: '40分钟滞空时间', pts: 15, desc: '在目标区域盘旋等待最佳攻击窗口' },
      { icon: '🔇', name: '低噪声电动推进', pts: 10, desc: '小型电机，低声学特征，难以被听音预警' },
    ]
  },

  // ============================================================
  // 侦察 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-marine-recon',
    name: '海军陆战队侦察队',
    nameEn: 'USMC Force Recon',
    faction: 'usa',
    category: '侦察',
    specs: ['marine'],
    cost: 85,
    desc: '海军陆战队力量侦察分队，擅长两栖渗透与滩头侦察。可提前渗透敌后海岸，为登陆部队标记目标与障碍，是两栖作战的眼睛与耳朵。',
    equipment: [
      { icon: '🔫', name: 'Mk12 SPR 5.56mm精确射手步枪', pts: 18, desc: '600m内精准点射，兼顾侦察与自卫' },
      { icon: '🎯', name: 'SOFLAM激光指示器', pts: 18, desc: '引导舰炮与精确制导炸弹打击沿海目标' },
      { icon: '🚤', name: '闭路呼吸水下侦察装具', pts: 15, desc: '无气泡潜水侦察，适合隐蔽入侵' },
      { icon: '📡', name: 'MBITR加密电台', pts: 12, desc: '超视距加密通信，与作战指挥舰保持联络' },
    ]
  },
  {
    id: 'us-bfist',
    name: 'M7 BFIST火力支援车',
    nameEn: 'M7 Bradley FIST',
    faction: 'usa',
    category: '侦察',
    specs: ['armor'],
    cost: 90,
    desc: '基于布拉德利战车改装的装甲火力支援侦察车，装备先进目标定位系统。可在装甲部队前方安全引导炮兵与空袭火力，效率极高。',
    equipment: [
      { icon: '📡', name: 'LRAS3长距侦察先进系统', pts: 35, desc: '红外/光电双模，10km内精确定位目标并传输坐标' },
      { icon: '🔭', name: '激光测距仪 & 目标指示器', pts: 22, desc: '精确测距并为精确制导武器提供激光照射' },
      { icon: '💥', name: 'M242 25mm链炮（保留）', pts: 20, desc: '必要时可自卫或压制轻型目标' },
      { icon: '💻', name: 'AFATDS数字化火力系统终端', pts: 13, desc: '与炮兵单位实时联通，快速下达射击诸元' },
    ]
  },
  {
    id: 'us-pathfinder',
    name: '先锋侦察兵',
    nameEn: 'Pathfinder Team',
    faction: 'usa',
    category: '侦察',
    specs: ['airborne'],
    cost: 70,
    desc: '空降先锋部队，先于主力伞兵跳伞，负责选定、清除并标记着陆区。擅长轻装快速渗透与激光引导，为大规模空降行动铺路。',
    equipment: [
      { icon: '🎯', name: 'AN/PEQ-1 SOFLAM激光指示器', pts: 20, desc: '引导精确制导弹药清除着陆区威胁' },
      { icon: '📡', name: '着陆区标记信标', pts: 15, desc: '为跟进直升机与运输机提供精确导航信标' },
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 8, desc: '轻装自卫，以快速机动代替对抗' },
      { icon: '🗺', name: '数字化战场导航终端', pts: 10, desc: '精确GPS定位，确保着陆区坐标无误' },
    ]
  },
  {
    id: 'us-stryker-nbc',
    name: 'M1135 NBC侦察车',
    nameEn: 'M1135 Stryker NBC',
    faction: 'usa',
    category: '侦察',
    specs: ['stryker'],
    cost: 65,
    desc: '核生化侦察专用斯特赖克，装备先进化学/生物/核探测传感器组，可在污染区域安全执行侦察任务，为友军提供实时威胁数据。',
    equipment: [
      { icon: '📡', name: 'JCAD联合化学代理探测器', pts: 30, desc: '实时探测神经性、糜烂性等化学战剂' },
      { icon: '🔭', name: '核辐射探测系统', pts: 20, desc: '探测放射性污染区域并标记危险边界' },
      { icon: '💨', name: '正压过滤防护系统', pts: 18, desc: '车内维持正压防止外部污染气体渗入' },
      { icon: '📡', name: '实时污染数据链', pts: 12, desc: '将探测数据即时传输至指挥部与友军' },
    ]
  },
  {
    id: 'us-jtac-socom',
    name: 'JTAC联合终端攻击控制',
    nameEn: 'JTAC / TACP Team',
    faction: 'usa',
    category: '侦察',
    specs: ['socom'],
    cost: 75,
    desc: '联合终端攻击控制员，是地面部队与空中火力之间的关键节点。可同时引导多架飞机实施精确打击，大幅提升空袭精度与协调效率。',
    equipment: [
      { icon: '📡', name: 'AN/PRC-117G多波段电台', pts: 25, desc: '与各型飞机实时加密通信，支持SATCOM卫星中继' },
      { icon: '🎯', name: 'Viper激光目标指示器', pts: 22, desc: '为所有激光制导武器提供精确照射' },
      { icon: '💻', name: 'ROVER实时视频终端', pts: 18, desc: '接收无人机与攻击机传来的实时目标视频' },
      { icon: '🔫', name: 'M4A1 SOPMOD（自卫）', pts: 10, desc: '精锐单兵武装，保障控制员人身安全' },
    ]
  },

  // ============================================================
  // 侦察 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-motor-scout',
    name: '摩托化步兵侦察班',
    nameEn: 'Motor Rifle Recon Squad',
    faction: 'russia',
    category: '侦察',
    specs: ['motor'],
    cost: 40,
    desc: '以BMP步兵战车为载体的机械化侦察班，在装甲集群前方执行接触侦察任务。成本低廉但侦察能力可靠，是大规模推进前的标准选择。',
    equipment: [
      { icon: '🔭', name: 'BTR/BMP车载夜视系统', pts: 12, desc: '驾驶员与车长配备夜视仪，夜间侦察可靠' },
      { icon: '📻', name: 'R-168战术电台', pts: 10, desc: '与上级单位保持战术通联，传递侦察情报' },
      { icon: '🔫', name: 'AK-74M步枪（步兵下车）', pts: 8, desc: '下车侦察时的基本武装' },
      { icon: '💣', name: 'RPG-7火箭筒', pts: 10, desc: '应对接触时的轻装甲威胁' },
    ]
  },
  {
    id: 'ru-vdv-scout',
    name: 'VDV空降侦察兵',
    nameEn: 'VDV Reconnaissance',
    faction: 'russia',
    category: '侦察',
    specs: ['vdv'],
    cost: 65,
    desc: '俄空降军精锐侦察小组，经过严格跳伞训练，可空投至敌后侦察重要目标。携带轻型反坦克武器，可在必要时实施定点打击。',
    equipment: [
      { icon: '🔫', name: 'VSS针线消音狙击步枪', pts: 22, desc: '消音精准，适合敌后隐蔽侦察作战' },
      { icon: '🎯', name: '1D22S激光测距仪', pts: 15, desc: '精确测距，引导炮兵与空袭' },
      { icon: '💣', name: 'RPG-26一次性火箭筒', pts: 12, desc: '应对紧急装甲威胁，发射后抛弃轻装撤退' },
      { icon: '📻', name: 'R-187P1弩（加密电台）', pts: 10, desc: '频率跳变加密通信，防止敌方监听定位' },
    ]
  },
  {
    id: 'ru-naval-scout',
    name: '海军步兵侦察组',
    nameEn: 'Naval Infantry Recon',
    faction: 'russia',
    category: '侦察',
    specs: ['naval'],
    cost: 55,
    desc: '俄罗斯海军步兵侦察分队，擅长滨海地形与近岸水域侦察。利用小型快艇或水下侦察方式渗透，为两栖登陆选定突破点。',
    equipment: [
      { icon: '🚤', name: '小型橡皮艇（IBS）', pts: 12, desc: '低雷达信号，可在黑暗中悄无声息地接近海岸' },
      { icon: '🔫', name: 'AK-74M（浸水型）', pts: 8, desc: '防水处理，出水后立即可用' },
      { icon: '🎯', name: '激光目标指示器', pts: 15, desc: '为舰炮与岸基火力提供精确目标坐标' },
      { icon: '📡', name: '防水通讯系统', pts: 10, desc: '与舰队保持联络，传报滩头情况' },
    ]
  },
  {
    id: 'ru-orion-uav',
    name: '猎户座中空无人机',
    nameEn: 'Orion-E MALE UAV',
    faction: 'russia',
    category: '侦察',
    specs: ['spetsnaz'],
    cost: 130,
    desc: '俄军首款中空长航时攻击无人机，集侦察与精确打击于一身。由特种部队后方基站遥控操作，可在目标区域长时间滞空，实施定点清除。',
    equipment: [
      { icon: '📷', name: '多光谱侦察载荷', pts: 30, desc: '光电/红外/SAR雷达多模态目标侦察' },
      { icon: '🚀', name: 'Kh-50精确制导导弹×2', pts: 40, desc: '激光/卫星复合制导，精确打击高价值目标' },
      { icon: '⏱', name: '24小时超长滞空', pts: 20, desc: '持续情报保障，全程监视目标动态' },
      { icon: '📡', name: '卫星数据链', pts: 15, desc: '超视距控制，不受地形遮蔽影响' },
    ]
  },

  // ============================================================
  // 步兵 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-smaw-team',
    name: 'SMAW攻坚小组',
    nameEn: 'SMAW Assault Team',
    faction: 'usa',
    category: '步兵',
    specs: ['marine'],
    cost: 45,
    desc: '装备肩射多用途攻击武器的海军陆战队攻坚小组，擅长城市战中摧毁建筑物掩体与轻型装甲目标，是两栖登陆后城镇清扫的利器。',
    equipment: [
      { icon: '🚀', name: 'SMAW Mk153 83mm火箭发射器', pts: 25, desc: 'HEAA破甲弹穿甲500mm，HEDP多用途弹攻击碉堡' },
      { icon: '🔭', name: '昼夜瞄准具', pts: 10, desc: '夜视模式下可精准打击500m内目标' },
      { icon: '🔫', name: 'M16A4步枪', pts: 8, desc: '海军陆战队制式武器，近距离自卫' },
      { icon: '💣', name: 'M67手榴弹×4', pts: 7, desc: '清除建筑物内近距目标' },
    ]
  },
  {
    id: 'us-airborne-squad',
    name: '82nd空降步枪班',
    nameEn: '82nd Airborne Rifle Squad',
    faction: 'usa',
    category: '步兵',
    specs: ['airborne'],
    cost: 35,
    desc: '第82空降师轻步兵班，以快速机动和高昂士气著称。着陆后迅速占领阵地，在无重型装甲支援的情况下依然能坚守关键要点。',
    equipment: [
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 8, desc: '制式武器，可靠轻便' },
      { icon: '🚀', name: 'AT4反装甲火箭筒', pts: 15, desc: '一次性84mm火箭，应对轻装甲目标' },
      { icon: '🔫', name: 'M249 SAW班用机枪', pts: 10, desc: '持续压制火力' },
      { icon: '💣', name: 'M18A1"阔刀"定向地雷（可选）', pts: 12, desc: '布置于着陆区周边，阻止敌方反冲击' },
    ]
  },
  {
    id: 'us-delta-force',
    name: '三角洲部队突击队',
    nameEn: 'Delta Force (CAG)',
    faction: 'usa',
    category: '步兵',
    specs: ['socom'],
    cost: 130,
    desc: '美国陆军特种任务部队（CAG/Delta），全球最精锐的反恐与特种作战力量。超强单兵战力、极低可观测性与多样化战术能力，是战场上最昂贵也最危险的步兵单位。',
    equipment: [
      { icon: '🔫', name: 'HK416 10.4英寸CQB短步枪', pts: 22, desc: '近距作战首选，配备消音器与战术灯' },
      { icon: '🚀', name: 'Carl Gustaf M4多用途系统', pts: 25, desc: '多弹种，兼顾反装甲、多用途与照明弹' },
      { icon: '🎯', name: 'SOFLAM/MFAL激光系统', pts: 20, desc: '引导精确制导武器实施外科手术式打击' },
      { icon: '💣', name: 'M18A1定向雷', pts: 18, desc: '快速构建防御阵地，保护行动区域' },
      { icon: '🦺', name: 'Crye Precision改进型战术背心', pts: 25, desc: '最高防护等级，配备多种战术挂载' },
    ]
  },
  {
    id: 'us-seal-team',
    name: 'SEAL突击队',
    nameEn: 'SEAL Team (DEVGRU)',
    faction: 'usa',
    category: '步兵',
    specs: ['socom'],
    cost: 115,
    desc: '海军特种作战发展大队（DEVGRU/SEAL Team 6），擅长海上渗透、反恐与人质营救。两栖全能，可从海面、空中多方向突入目标。',
    equipment: [
      { icon: '🔫', name: 'Mk17 SCAR-H 7.62mm步枪', pts: 20, desc: '强大的穿透力与停止效果，适合多种防护目标' },
      { icon: '🚀', name: 'Mk14 EBR精确射手步枪', pts: 18, desc: '800m内精准压制，团队远程覆盖' },
      { icon: '🎯', name: 'PEQ-15激光/照明瞄准模块', pts: 15, desc: '全天候目标指示与夜视增强' },
      { icon: '🚤', name: 'SDV水下推进载具（待命）', pts: 20, desc: '从海面或水下无声潜入，渗透海岸目标' },
      { icon: '💣', name: '水下爆破装药', pts: 22, desc: '摧毁水下结构与近岸防御工事' },
    ]
  },

  // ============================================================
  // 步兵 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-naval-marines',
    name: '海军步兵班',
    nameEn: 'Naval Infantry Squad',
    faction: 'russia',
    category: '步兵',
    specs: ['naval'],
    cost: 40,
    desc: '俄罗斯海军步兵是经过强化训练的精锐步兵，专为两栖登陆与海岸线争夺而设计。黑色贝雷帽部队，具有比普通摩步更强的攻坚意志与火力。',
    equipment: [
      { icon: '🔫', name: 'AK-74M突击步枪', pts: 7, desc: '制式装备，适应盐雾湿热环境改装' },
      { icon: '💣', name: 'RPG-7V2火箭筒', pts: 12, desc: '配备PG-7VL破甲弹，应对滩头装甲威胁' },
      { icon: '🔫', name: 'PKM通用机枪', pts: 10, desc: '班组压制火力核心' },
      { icon: '💨', name: '烟雾手榴弹×4', pts: 5, desc: '遮蔽登陆冲滩时的暴露地形' },
    ]
  },
  {
    id: 'ru-ksso-alpha',
    name: 'FSB Alpha特种小组',
    nameEn: 'FSB Alpha Group',
    faction: 'russia',
    category: '步兵',
    specs: ['spetsnaz'],
    cost: 110,
    desc: '俄罗斯联邦安全局阿尔法小组，反恐与特种突击精英。单兵战力极高，擅长城市突入、人质营救与高价值目标定点清除。',
    equipment: [
      { icon: '🔫', name: 'AS Val消音步枪', pts: 20, desc: '9x39mm亚音速，100m内几乎静音击杀' },
      { icon: '🔫', name: 'PP-2000 9mm冲锋枪', pts: 15, desc: '紧凑型室内突击武器，可穿透3A级防弹衣' },
      { icon: '💣', name: 'RGO进攻型手榴弹×6', pts: 12, desc: '大威力破片，突入室内的主要工具' },
      { icon: '🦺', name: 'Ratnik-3战斗系统', pts: 30, desc: '第三代单兵战斗系统，集成头盔显示器与增强防护' },
      { icon: '🎯', name: '激光目标指示器', pts: 18, desc: '引导直升机与炮兵实施精确支援' },
    ]
  },
  {
    id: 'ru-9k333-verba',
    name: '柳树MANPADS防空组',
    nameEn: '9K333 Verba MANPADS Team',
    faction: 'russia',
    category: '步兵',
    specs: ['vdv'],
    cost: 55,
    desc: '装备最新型9K333柳树单兵防空导弹的防空步兵组，三模导引头使其对隐身目标与诱饵弹均有较强抗干扰能力，是前线防空网络的核心节点。',
    equipment: [
      { icon: '🚀', name: '9M336柳树导弹', pts: 35, desc: '三色红外制导（UV+近IR+远IR），射程6km，不惧诱饵弹干扰' },
      { icon: '🎯', name: '1L122便携式雷达探测仪', pts: 15, desc: '低空目标探测与告警，与其他防空单位组网' },
      { icon: '🔫', name: 'AK-74M（自卫）', pts: 5, desc: '目标发射后转移期间防身武器' },
    ]
  },

  // ============================================================
  // 战斗载具 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-aav7p1',
    name: 'AAV7P1A1两栖突击车',
    nameEn: 'AAV7P1A1 Amphibious Assault Vehicle',
    faction: 'usa',
    category: '战斗载具',
    specs: ['marine'],
    cost: 85,
    desc: '美国海军陆战队标志性两栖突击车，可将步兵从船坞登陆舰直接运送上滩，不需要任何登陆艇。水中速度8km/h，是两栖作战不可或缺的主力。',
    equipment: [
      { icon: '🔫', name: 'Mk19 40mm自动榴弹发射器', pts: 20, desc: '400m内面杀伤，清除滩头步兵效果显著' },
      { icon: '🔫', name: 'M2 .50重机枪（遥控）', pts: 15, desc: '压制滩头轻型目标与步兵' },
      { icon: '🚤', name: '双水喷射推进装置', pts: 22, desc: '两栖推进，水中最高8km/h，陆上72km/h' },
      { icon: '🛡', name: 'EAAK增强装甲改装套件', pts: 28, desc: '强化正面装甲，防御RPG攻击能力显著提升' },
    ]
  },
  {
    id: 'us-lav25',
    name: 'LAV-25 轻型装甲车',
    nameEn: 'LAV-25',
    faction: 'usa',
    category: '战斗载具',
    specs: ['marine'],
    cost: 70,
    desc: '8×8轮式轻型装甲车，兼具快速机动与一定火力。25mm链炮可威胁步兵战车，高速度使其成为机动侦察与快速占点的优秀选择。',
    equipment: [
      { icon: '💥', name: 'M242 25mm大毒蛇链炮', pts: 28, desc: '可发射APDS穿甲弹与HEI高爆弹，速射压制' },
      { icon: '🔫', name: 'M240C同轴机枪', pts: 10, desc: '近距步兵防御' },
      { icon: '🚗', name: '8×8全轮驱动', pts: 15, desc: '公路时速100km，越野能力强，可两栖浮游' },
      { icon: '💨', name: '烟雾弹发射器×4', pts: 7, desc: '快速遮蔽，脱离危险接触' },
    ]
  },
  {
    id: 'us-m551-sheridan',
    name: 'M551A1谢里登轻型坦克',
    nameEn: 'M551A1 Sheridan',
    faction: 'usa',
    category: '战斗载具',
    specs: ['airborne'],
    cost: 95,
    desc: '唯一可由C-130运输机空投的美军坦克，是空降部队的重型支援核心。152mm炮兼可发射制导导弹，对付装甲目标时比普通轻型战车更具威胁。',
    equipment: [
      { icon: '💥', name: 'M81 152mm导弹炮/榴弹炮', pts: 45, desc: '可发射MGM-51橡树棍反坦克导弹或传统炮弹' },
      { icon: '🔫', name: 'M2 .50重机枪（炮塔顶部）', pts: 12, desc: '反步兵防御武装' },
      { icon: '🪂', name: '空投加固底盘', pts: 20, desc: '专为C-130/C-17低空空投设计，着陆冲击缓冲' },
      { icon: '🛡', name: '铝合金车体装甲', pts: 18, desc: '轻量化设计，可抵御小口径武器与轻型破甲弹' },
    ]
  },
  {
    id: 'us-stryker-atgm',
    name: 'M1134 斯特赖克反坦克车',
    nameEn: 'M1134 Stryker ATGM',
    faction: 'usa',
    category: '战斗载具',
    specs: ['stryker'],
    cost: 115,
    desc: '以TOW-2B反坦克导弹为主要武装的斯特赖克变型车，是轻型机动部队的反装甲支柱。可在被装甲目标发现之前，从安全距离实施顶攻打击。',
    equipment: [
      { icon: '🚀', name: 'BGM-71 TOW-2B顶攻导弹×2（6枚备弹）', pts: 50, desc: '飞越目标上方引爆，穿击顶部薄弱装甲' },
      { icon: '🔭', name: '昼夜全天候热成像瞄准具', pts: 22, desc: '全天候目标识别与导弹制导' },
      { icon: '💨', name: '烟雾弹发射器', pts: 8, desc: '快速转移遮蔽' },
      { icon: '🚗', name: '8×8轮式底盘', pts: 20, desc: '高速机动，发射后立即转移，生存力强' },
    ]
  },
  {
    id: 'us-m1a1-abrams',
    name: 'M1A1艾布拉姆斯主战坦克',
    nameEn: 'M1A1 Abrams',
    faction: 'usa',
    category: '战斗载具',
    specs: ['marine'],
    cost: 155,
    desc: '美军基础版主战坦克，防护与火力均衡，是各专精通用重型支援装甲。相比SEP v3成本大幅降低，适合需要大量装甲力量的中等规模作战。',
    equipment: [
      { icon: '💥', name: 'M256 120mm滑膛炮', pts: 58, desc: '发射M829A2穿甲弹，面对T-90仍有显著优势' },
      { icon: '🔫', name: 'M2重机枪 + M240同轴机枪', pts: 18, desc: '标准反步兵装备' },
      { icon: '👁', name: '第二代热成像瞄准系统', pts: 20, desc: '夜战与烟雾中维持射击精度' },
      { icon: '🛡', name: '贫铀复合装甲（无Trophy）', pts: 59, desc: '正面防护极强，但缺乏主动防护系统' },
    ]
  },
  {
    id: 'us-humvee-m1152',
    name: 'HMMWV M1152武装吉普',
    nameEn: 'HMMWV M1152',
    faction: 'usa',
    category: '战斗载具',
    specs: ['airborne'],
    cost: 25,
    desc: '高机动多用途轮式车辆，美军最通用的轻型战术载具。根据任务需求可灵活搭载多种武器系统，成本低廉，是各兵种的通用快速机动工具。',
    equipment: [
      { icon: '🔫', name: '遥控武器站（M2/MK19/M240可选）', pts: 15, desc: '多武器配置，适应不同威胁等级' },
      { icon: '🚗', name: '4×4全轮驱动系统', pts: 8, desc: '越野能力良好，可快速抵达战场各点' },
      { icon: '🛡', name: 'B-Kit装甲防护套件（可选）', pts: 12, desc: '安装后可抵御7.62mm穿甲弹与炮弹破片' },
    ]
  },

  // ============================================================
  // 战斗载具 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-btr82a',
    name: 'BTR-82A装甲运兵车',
    nameEn: 'BTR-82A',
    faction: 'russia',
    category: '战斗载具',
    specs: ['motor'],
    cost: 65,
    desc: '俄军现役主力轮式装甲运兵车，火力与防护相对均衡。30mm链炮赋予其对抗轻型目标的能力，8×8驱动确保复杂地形机动性，是摩步部队的标配。',
    equipment: [
      { icon: '💥', name: '2A72 30mm链炮', pts: 25, desc: 'APDS-T穿甲弹有效对抗步兵战车级装甲' },
      { icon: '🔫', name: 'PKTM 7.62mm同轴机枪', pts: 8, desc: '压制步兵与无装甲目标' },
      { icon: '🚤', name: '两栖浮渡能力', pts: 15, desc: '水中最高9km/h，可直接穿越水障' },
      { icon: '👁', name: 'TPN-3热成像系统', pts: 12, desc: '夜间目标识别，提升夜战能力' },
    ]
  },
  {
    id: 'ru-bmp2',
    name: 'BMP-2步兵战车',
    nameEn: 'BMP-2',
    faction: 'russia',
    category: '战斗载具',
    specs: ['motor'],
    cost: 80,
    desc: '经典苏俄步兵战车，全球广泛装备。30mm链炮与AT-5反坦克导弹的组合使其可威胁轻中型装甲目标，高机动性适合大纵深机动作战。',
    equipment: [
      { icon: '💥', name: '2A42 30mm链炮', pts: 25, desc: '双速率射击，对付步兵战车级目标有效' },
      { icon: '🚀', name: '9M113竞技场反坦克导弹×1', pts: 22, desc: '激光制导，射程4km，穿甲550mm' },
      { icon: '🔫', name: 'PKT 7.62mm同轴机枪', pts: 6, desc: '近距离步兵防御' },
      { icon: '🚤', name: '浮游渡水能力', pts: 12, desc: '无需准备即可渡河' },
    ]
  },
  {
    id: 'ru-bmd4m',
    name: 'BMD-4M空降战车',
    nameEn: 'BMD-4M',
    faction: 'russia',
    category: '战斗载具',
    specs: ['vdv'],
    cost: 120,
    desc: '世界上最强悍的空降战车，专为俄空降军伞兵随车空投设计。100mm炮配合30mm链炮，使空降部队具备独立对抗装甲目标的能力，战斗力远超西方同类。',
    equipment: [
      { icon: '💥', name: '2A70 100mm低压炮', pts: 30, desc: '可发射炮射导弹9M117，兼顾步兵支援与反装甲' },
      { icon: '💥', name: '2A72 30mm链炮', pts: 22, desc: '与主炮同轴，高速穿甲对轻装甲威胁大' },
      { icon: '🪂', name: '随伞空投能力', pts: 30, desc: '可与乘员一同通过PBS-950系统空投' },
      { icon: '🚤', name: '两栖浮渡', pts: 12, desc: '水中喷水推进，支持水上作战' },
      { icon: '🛡', name: '改进型钢铝复合装甲', pts: 16, desc: '在轻量化基础上提升防护等级' },
    ]
  },
  {
    id: 'ru-bmd4m-btr-mdm',
    name: 'BTR-MDM海牛装甲车',
    nameEn: 'BTR-MDM Rakushka',
    faction: 'russia',
    category: '战斗载具',
    specs: ['vdv'],
    cost: 90,
    desc: '专为VDV研发的新一代多用途装甲运兵车，可随BMD-4M系统一同空投。比BMD火力弱但运兵能力更强，是VDV机械化机动的重要组成部分。',
    equipment: [
      { icon: '🔫', name: 'PKT机枪×2', pts: 12, desc: '车体前后各一挺，360°步兵防御' },
      { icon: '🪂', name: '随伞空投能力', pts: 25, desc: '随乘员一同通过低空空投系统投送' },
      { icon: '🚤', name: '两栖推进系统', pts: 15, desc: '全地形与水域机动能力' },
      { icon: '👥', name: '运载8名步兵', pts: 18, desc: '配合BMD-4M构成完整空降机械化战斗组' },
    ]
  },
  {
    id: 'ru-2s25m-sprut',
    name: '2S25M章鱼-SDK反坦克炮',
    nameEn: '2S25M Sprut-SDK',
    faction: 'russia',
    category: '战斗载具',
    specs: ['vdv'],
    cost: 160,
    desc: '世界唯一可空投的坦克歼击车，装备与主战坦克相同的125mm滑膛炮。使VDV在没有重型装甲支援的情况下，也能对抗敌方主战坦克。',
    equipment: [
      { icon: '💥', name: '2A75 125mm滑膛炮', pts: 70, desc: '可发射3BM42穿甲弹与9M119炮射导弹，威胁现役主战坦克' },
      { icon: '🪂', name: '随伞空投能力', pts: 35, desc: '全球首款可空投的坦克歼击车' },
      { icon: '🚤', name: '两栖浮渡', pts: 15, desc: '水上作战能力使VDV突击更灵活' },
      { icon: '👁', name: 'PNK-4S热成像火控系统', pts: 30, desc: '夜间与不良天气下维持全性能射击' },
    ]
  },
  {
    id: 'ru-pt76b',
    name: 'PT-76B水陆两用坦克',
    nameEn: 'PT-76B',
    faction: 'russia',
    category: '战斗载具',
    specs: ['naval'],
    cost: 70,
    desc: '苏联研发的水陆两用坦克，是俄军海军步兵的特色装备。在江河湖海障碍面前无需任何准备，直接驶入水中游至对岸，适合水网密集的两栖作战。',
    equipment: [
      { icon: '💥', name: 'D-56TM 76mm线膛炮', pts: 25, desc: '对步兵与轻型目标有效，对主战坦克威胁有限' },
      { icon: '🔫', name: 'SGMT同轴机枪', pts: 8, desc: '步兵防御武装' },
      { icon: '🚤', name: '喷水推进装置', pts: 25, desc: '水中最高10.2km/h，无需准备直接入水行驶' },
      { icon: '🛡', name: '薄型全钢装甲', pts: 12, desc: '防小口径步兵武器，但无法抵御反装甲武器' },
    ]
  },
  {
    id: 'ru-bmp3f',
    name: 'BMP-3F水陆步战车',
    nameEn: 'BMP-3F',
    faction: 'russia',
    category: '战斗载具',
    specs: ['naval'],
    cost: 120,
    desc: 'BMP-3的海军型改进，强化了浮渡稳定性与防海浪能力。火力强大的100mm+30mm双炮组合让其可在登陆作战中充当两栖火力支援平台。',
    equipment: [
      { icon: '💥', name: '2A70 100mm低压炮（含炮射导弹）', pts: 32, desc: '海上可发射9M117反坦克导弹，实施精确打击' },
      { icon: '💥', name: '2A72 30mm链炮', pts: 25, desc: '舰载与两栖平台防空与反步兵武装' },
      { icon: '🚤', name: '强化两栖套件', pts: 20, desc: '防浪板与改进推进，海况3级下仍可稳定作战' },
      { icon: '🔫', name: 'PKT机枪×3', pts: 10, desc: '多向步兵防御' },
    ]
  },
  {
    id: 'ru-kornet-d',
    name: 'Kornet-D反坦克导弹车',
    nameEn: 'Kornet-D AT Vehicle',
    faction: 'russia',
    category: '战斗载具',
    specs: ['armored'],
    cost: 135,
    desc: '以Tigr轻型车辆为底盘的科尔内特-D双联装反坦克导弹平台。两具发射架可同时制导两枚导弹攻击同一目标或不同目标，极难被主动防护系统拦截。',
    equipment: [
      { icon: '🚀', name: '9M133科尔内特×4（双联架）', pts: 60, desc: '双管同发可克服Trophy等主动防护，穿甲1100mm' },
      { icon: '🔭', name: '热成像自动跟踪系统', pts: 20, desc: '激光驾束制导，射程5.5km，夜间全效' },
      { icon: '🚗', name: 'Tigr高机动底盘', pts: 15, desc: '轻量化高机动，快速转移阵地' },
      { icon: '💥', name: '热压战斗部选项', pts: 10, desc: '对无装甲目标与工事具有毁灭性效果' },
    ]
  },
  {
    id: 'ru-t72b3m',
    name: 'T-72B3M主战坦克',
    nameEn: 'T-72B3M',
    faction: 'russia',
    category: '战斗载具',
    specs: ['armored'],
    cost: 195,
    desc: '俄军数量最多的现役主战坦克，B3M改型大幅升级了火控、动力与防护。在性价比上优于T-90，是俄军装甲旅大规模装甲推进的主要力量。',
    equipment: [
      { icon: '💥', name: '2A46M-5 125mm滑膛炮', pts: 60, desc: '可发射3BM60穿甲弹与9M119M炮射导弹' },
      { icon: '🛡', name: 'Kontakt-5 ERA（全覆盖）', pts: 45, desc: '覆盖炮塔与车体，可对抗早期串联战斗部' },
      { icon: '👁', name: 'Sosna-U热成像火控', pts: 35, desc: '法国热成像模块改进版，显著提升夜战能力' },
      { icon: '⚡', name: 'B-92S2 1000马力柴油机', pts: 35, desc: '强劲动力，越野机动性出色' },
      { icon: '🔫', name: 'PKMT+NSV高射机枪', pts: 20, desc: '全面反步兵防御' },
    ]
  },
  {
    id: 'ru-btr80',
    name: 'BTR-80装甲运兵车',
    nameEn: 'BTR-80',
    faction: 'russia',
    category: '战斗载具',
    specs: ['motor'],
    cost: 45,
    desc: '俄军通用8×8装甲运兵车，全球出口广泛。机动可靠、维护简单，虽然14.5mm机枪火力有限，但作为步兵运输与早期阵地占领的工具性价比极高。',
    equipment: [
      { icon: '🔫', name: 'KPVT 14.5mm重机枪', pts: 15, desc: '对轻型装甲有威胁，主要用于步兵压制' },
      { icon: '🔫', name: 'PKT 7.62mm同轴机枪', pts: 6, desc: '辅助压制步兵' },
      { icon: '🚤', name: '两栖浮渡能力', pts: 12, desc: '无准备直接渡河' },
      { icon: '👥', name: '搭载8名步兵', pts: 12, desc: '快速机动步兵至战场关键位置' },
    ]
  },

  // ============================================================
  // 支援 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-m777-howitzer',
    name: 'M777A2轻型榴弹炮组',
    nameEn: 'M777A2 Light Howitzer',
    faction: 'usa',
    category: '支援',
    specs: ['airborne'],
    cost: 100,
    desc: '钛合金结构的超轻型155mm榴弹炮，可由CH-47吊运部署，是空降部队与海军陆战队的重型火力支柱。数字化火控使其能快速精准射击后立即转移。',
    equipment: [
      { icon: '💥', name: 'M777 155mm榴弹炮', pts: 45, desc: '射程24km（M795），配合ERCB增程弹可达30km' },
      { icon: '🎯', name: 'M982神剑GPS制导炮弹', pts: 40, desc: 'GPS/INS制导，CEP<10m，射程50km+' },
      { icon: '💻', name: '数字化射击指挥系统', pts: 15, desc: '快速接收射击诸元，60秒内完成架设并开火' },
    ]
  },
  {
    id: 'us-m119-howitzer',
    name: 'M119A3 105mm牵引炮',
    nameEn: 'M119A3 Light Howitzer',
    faction: 'usa',
    category: '支援',
    specs: ['airborne'],
    cost: 70,
    desc: '82nd空降师制式轻型榴弹炮，可由C-130空投或直升机吊运。重量仅2吨，便于空降部队机动部署，为缺乏重炮的轻型部队提供关键火力支援。',
    equipment: [
      { icon: '💥', name: 'M119 105mm线膛炮', pts: 35, desc: '射程11.5km（M1标准弹），最大射速8发/分' },
      { icon: '🎯', name: 'M137 Copperhead激光制导炮弹', pts: 25, desc: '激光半主动制导，对装甲目标精度极高' },
      { icon: '🪂', name: 'C-130空投兼容设计', pts: 10, desc: '可随部队一同空降，部署快速灵活' },
    ]
  },
  {
    id: 'us-m1129-mc',
    name: 'M1129斯特赖克迫击炮车',
    nameEn: 'M1129 Stryker MC-A',
    faction: 'usa',
    category: '支援',
    specs: ['stryker'],
    cost: 90,
    desc: '以斯特赖克为底盘的120mm自行迫击炮，兼具机动性与火力支援能力。可跟随步兵战车快速机动，在行进中展开并提供即时炮兵支援，是轻型化炮兵的代表。',
    equipment: [
      { icon: '💥', name: 'M120 120mm重型迫击炮', pts: 40, desc: '射程7.2km，可使用精确制导弹药' },
      { icon: '🎯', name: 'M395精确制导迫击炮弹', pts: 30, desc: 'GPS制导，CEP<10m，对固定目标精度极高' },
      { icon: '💻', name: '数字化火控接口', pts: 15, desc: '与AFATDS整合，快速接收与执行射击任务' },
      { icon: '🚗', name: '斯特赖克轮式底盘', pts: 15, desc: '高速机动，发射后迅速转移防止反炮兵打击' },
    ]
  },
  {
    id: 'us-himars',
    name: 'M142 HIMARS高机动火箭炮',
    nameEn: 'M142 HIMARS',
    faction: 'usa',
    category: '支援',
    specs: ['stryker'],
    cost: 170,
    desc: '以5吨卡车为底盘的轻型化多管火箭炮系统，装备单个MLRS发射吊舱或ATACMS战术导弹。极高的机动性与射后快速转移能力使其极难被反炮兵火力摧毁。',
    equipment: [
      { icon: '🚀', name: 'M31 GMLRS制导火箭弹×6', pts: 60, desc: 'GPS/INS制导，射程70km，CEP<5m' },
      { icon: '🚀', name: 'MGM-168 ATACMS Block IVA导弹（单枚）', pts: 80, desc: '射程300km，打击敌方纵深关键目标' },
      { icon: '🚗', name: 'FMTV 5吨卡车底盘', pts: 20, desc: '公路速度85km/h，C-130运输机可空运' },
      { icon: '⚡', name: '快速重装系统', pts: 15, desc: '5分钟内完成再装填，快速转移阵地' },
    ]
  },
  {
    id: 'us-m224-mortar',
    name: 'M224 60mm迫击炮班',
    nameEn: 'M224 Mortar Team',
    faction: 'usa',
    category: '支援',
    specs: ['airborne'],
    cost: 30,
    desc: '轻型迫击炮班，是空降与特种部队最常用的有机火力支援工具。全重不足21kg，可由单人携行，两人操作，展开时间不足30秒。',
    equipment: [
      { icon: '💥', name: 'M224 60mm迫击炮', pts: 18, desc: '射程3.5km，高射速12发/分，对步兵杀伤效果好' },
      { icon: '🎯', name: 'M720精确迫击炮弹', pts: 15, desc: '激光半主动制导，精确打击400m内目标' },
      { icon: '💨', name: 'M722 WP白磷弹', pts: 7, desc: '战场遮蔽与燃烧效果，清除开阔地威胁' },
    ]
  },

  // ============================================================
  // 支援 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-2s1-gvozdika',
    name: '2S1康乃馨自行炮',
    nameEn: '2S1 Gvozdika',
    faction: 'russia',
    category: '支援',
    specs: ['motor'],
    cost: 90,
    desc: '122mm自行榴弹炮，以轻量化履带底盘为基础，具备两栖能力。是俄军摩步与空降部队的有机炮兵，在缺乏重型炮兵时提供直接火力支援。',
    equipment: [
      { icon: '💥', name: '2A31 122mm榴弹炮', pts: 40, desc: '射程15.3km，可发射多种弹种包括激光制导弹' },
      { icon: '🎯', name: 'Kitolov-2激光制导炮弹', pts: 28, desc: '激光半主动制导，对装甲与坚固目标精度高' },
      { icon: '🚤', name: '两栖浮渡能力', pts: 15, desc: '可以7km/h的水中速度直接渡河' },
      { icon: '💻', name: '自动化弹道解算系统', pts: 17, desc: '快速计算射击诸元，反应速度快' },
    ]
  },
  {
    id: 'ru-d30-howitzer',
    name: 'D-30 122mm牵引榴弹炮',
    nameEn: 'D-30 Howitzer Battery',
    faction: 'russia',
    category: '支援',
    specs: ['vdv'],
    cost: 65,
    desc: '经典全向射击牵引榴弹炮，VDV空降军的制式炮兵装备之一。360°全向射击设计使其可以原地应对各方向威胁，可空投或直升机吊运部署。',
    equipment: [
      { icon: '💥', name: 'D-30 122mm榴弹炮', pts: 35, desc: '射程15.4km，360°全向射击，反坦克直瞄射击亦可' },
      { icon: '💣', name: '3OF56杀爆榴弹', pts: 15, desc: '标准杀伤弹，面积压制效果良好' },
      { icon: '🪂', name: '空投/直升机吊运兼容', pts: 15, desc: '可随空降部队一同投送，快速建立炮兵阵地' },
    ]
  },
  {
    id: 'ru-tos1a',
    name: 'TOS-1A太阳神重型火箭炮',
    nameEn: 'TOS-1A Solntsepyok',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 220,
    desc: '以T-72为底盘的温压/燃烧武器系统，是城市战与工事清除的终极武器。近24枚220mm热压火箭弹可在数秒内将目标区域变为地狱，人员无处遁形。',
    equipment: [
      { icon: '🚀', name: 'MO.1.01.04温压火箭弹×24', pts: 80, desc: '温压效果使封闭工事内无法生存，射程3.5km' },
      { icon: '🔭', name: '激光测距仪与火控系统', pts: 25, desc: '精确计算弹着点，确保最大毁伤效果' },
      { icon: '🛡', name: 'T-72B级装甲防护', pts: 45, desc: '与T-72相同防护水平，可进入反击地带' },
      { icon: '🚗', name: 'T-72底盘', pts: 30, desc: '高机动越野能力，跟随装甲部队推进' },
    ]
  },
  {
    id: 'ru-2s35-koalitsiya',
    name: '2S35联盟-SV自行炮',
    nameEn: '2S35 Koalitsiya-SV',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 210,
    desc: '俄罗斯最先进的152mm自行榴弹炮，采用无人炮塔与全自动装弹机，最大射速达到惊人的15发/分。可发射精确制导炮弹在70km外精确打击目标。',
    equipment: [
      { icon: '💥', name: '2A88 152mm自行炮', pts: 75, desc: '射程70km（增程制导弹），标准弹射程40km' },
      { icon: '🤖', name: '全自动供弹系统', pts: 50, desc: '15发/分最大射速，射击准备时间不足1分钟' },
      { icon: '🎯', name: 'Krasnopol-M2激光制导炮弹', pts: 55, desc: '半主动激光制导，对固定目标精度<10m' },
      { icon: '💻', name: '一体化战斗管理系统', pts: 30, desc: '全数字化火力控制与战场协同' },
    ]
  },
  {
    id: 'ru-2s9-nona',
    name: '2S9野风空降自行炮',
    nameEn: '2S9 Nona-S',
    faction: 'russia',
    category: '支援',
    specs: ['vdv'],
    cost: 100,
    desc: '世界上唯一可空投的自行炮，装备120mm多功能炮，可发射迫击炮弹、炮射导弹与标准炮弹。使VDV空降部队具备独立远程炮火支援能力。',
    equipment: [
      { icon: '💥', name: '2A51 120mm多功能炮', pts: 45, desc: '可发射全系列120mm弹药，射程7~12km' },
      { icon: '🚀', name: '9M117激光炮射导弹', pts: 30, desc: '射程4km，可打击装甲目标' },
      { icon: '🪂', name: '随伞空投能力', pts: 25, desc: '与空降部队一同投送，展开后立即开火' },
      { icon: '🚤', name: '两栖浮渡', pts: 10, desc: '水中作战灵活性' },
    ]
  },
  {
    id: 'ru-2a65-msta-b',
    name: '2A65 152mm牵引榴弹炮',
    nameEn: '2A65 Msta-B Howitzer Battery',
    faction: 'russia',
    category: '支援',
    specs: ['motor'],
    cost: 85,
    desc: '俄军标准牵引榴弹炮，是海军步兵与摩步部队的有机炮兵支援武器。重量相对较轻，可由卡车拖曳，适合快速机动作战环境。',
    equipment: [
      { icon: '💥', name: '2A65 152mm炮', pts: 45, desc: '射程24km，标准炮兵旅装备，弹药通用性好' },
      { icon: '🎯', name: '科普耶激光制导炮弹', pts: 28, desc: '半主动激光制导精确炮弹' },
      { icon: '🚗', name: 'Ural/Kamaz卡车拖曳', pts: 12, desc: '可由标准军用卡车快速牵引机动' },
    ]
  },
  {
    id: 'ru-tos2-tosochka',
    name: 'TOS-2托索奇卡火箭炮',
    nameEn: 'TOS-2 Tosochka',
    faction: 'russia',
    category: '支援',
    specs: ['motor'],
    cost: 185,
    desc: '基于Ural卡车底盘的新型轮式温压火箭炮，机动性优于TOS-1A，适合特种部队快速支援任务。可远程引导，有效减少操作人员暴露风险。',
    equipment: [
      { icon: '🚀', name: '220mm温压火箭弹×18', pts: 65, desc: '热压效果强烈，对工事与步兵毁伤极大，射程10km' },
      { icon: '🔭', name: '遥控火控系统', pts: 20, desc: '操作员可在车内远程操控，降低暴露风险' },
      { icon: '🚗', name: '8×8 Ural轮式底盘', pts: 30, desc: '高机动性，可随机步部队快速推进' },
      { icon: '⚡', name: '快速重装套件', pts: 20, desc: '配合弹药补给车可在10分钟内完成再装填' },
    ]
  },
  {
    id: 'ru-s300v4',
    name: 'S-300V4防空导弹系统',
    nameEn: 'S-300V4 SA-23',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 280,
    desc: '俄军最强区域防空系统，具备拦截弹道导弹、巡航导弹与战术飞机的多层次防空能力。为整个战区提供防空保护伞，是敌方航空作战的最大威胁。',
    equipment: [
      { icon: '🚀', name: '9M82M拦截弹', pts: 100, desc: '射程400km，最高拦截速度Mach 14.5，可攻击ATACMS' },
      { icon: '📡', name: '9S15M多功能相控阵雷达', pts: 70, desc: '探测距离600km，可跟踪200个目标' },
      { icon: '🔗', name: '防空系统指挥数据链', pts: 50, desc: '与铠甲-S1等近程防空系统组网，构成多层防御' },
      { icon: '💻', name: '自动化目标分配系统', pts: 35, desc: '同时引导多枚导弹攻击不同目标' },
    ]
  },
  {
    id: 'ru-2k22-tunguska',
    name: '2K22通古斯卡弹炮合一',
    nameEn: '2K22 Tunguska',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 145,
    desc: '俄军标准近程防空系统，采用30mm双联装机炮与SA-19导弹的组合，可有效拦截低空直升机、无人机与攻击机。装甲履带底盘使其可跟随坦克部队前进。',
    equipment: [
      { icon: '🚀', name: '9M311导弹×8', pts: 55, desc: '射程8km，最大拦截高度3.5km' },
      { icon: '💥', name: '2A38M 30mm双联机炮×2', pts: 40, desc: '4000m近距离低空目标拦截，弹幕密集' },
      { icon: '📡', name: '1RS1-1E搜索与跟踪雷达', pts: 30, desc: '边扫描边跟踪，可同时处理多威胁' },
      { icon: '🛡', name: '履带装甲底盘', pts: 20, desc: '可随装甲部队并肩推进，提供前线防空保障' },
    ]
  },

  // ============================================================
  // 后勤 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-lcac',
    name: 'LCAC气垫登陆艇',
    nameEn: 'LCAC Landing Craft',
    faction: 'usa',
    category: '后勤',
    specs: ['marine'],
    cost: 80,
    desc: '美国海军核心两栖登陆装备，气垫设计使其可在70%的海岸线登陆，远超传统登陆艇的15%。可携带1辆M1A2坦克或多辆轻型载具直接冲上海滩。',
    equipment: [
      { icon: '🚤', name: '四台燃气轮机气垫推进', pts: 30, desc: '最高速度74km/h，航程300海里，海陆均可高速行驶' },
      { icon: '👥', name: '60吨载重能力', pts: 25, desc: '可运载1辆M1A2坦克或4辆HMMWV或承重60吨装备' },
      { icon: '🔫', name: 'Mk96双联25mm机炮（可选）', pts: 15, desc: '自卫武装，应对海岸轻型威胁' },
      { icon: '📡', name: '电子导航与通信系统', pts: 10, desc: '精确导航至预定登陆点，与舰队保持协同' },
    ]
  },
  {
    id: 'us-ch47-chinook-log',
    name: 'CH-47F支奴干后勤直升机',
    nameEn: 'CH-47F Chinook (Logistics)',
    faction: 'usa',
    category: '后勤',
    specs: ['airborne'],
    cost: 95,
    desc: '重型双旋翼运输直升机，是美军前线物资补给和装备吊运的主力。可将M777榴弹炮、斯特赖克装甲车或大量弹药直接运至前沿阵地。',
    equipment: [
      { icon: '📦', name: '10吨内部/13吨吊运载重', pts: 35, desc: '可吊运轻型战车、火炮或大批弹药' },
      { icon: '🔫', name: 'M240H舱门机枪×2', pts: 15, desc: '基本自卫武装' },
      { icon: '💨', name: '箔条/红外诱饵弹', pts: 18, desc: '对抗便携式防空导弹' },
      { icon: '📡', name: 'CAAS通用航空架构系统', pts: 12, desc: '数字化飞行管理，提升夜间与恶劣天气飞行安全性' },
    ]
  },

  // ============================================================
  // 后勤 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-bk16-boat',
    name: 'BK-16快速突击艇',
    nameEn: 'BK-16 Fast Assault Boat',
    faction: 'russia',
    category: '后勤',
    specs: ['naval'],
    cost: 50,
    desc: '俄海军步兵制式快速突击登陆艇，可运送一个步兵班快速抵达任意水岸阵地。高速与低雷达信号特征使其在夜间两栖突击中极难被发现。',
    equipment: [
      { icon: '🚤', name: '双发发动机高速推进', pts: 20, desc: '最高速度47节（87km/h），快速穿越水域' },
      { icon: '🔫', name: 'PKT 7.62mm机枪×2', pts: 12, desc: '前后自卫武装，掩护登陆与撤退' },
      { icon: '👥', name: '运载11名步兵', pts: 18, desc: '快速将一个强化班投送至滩头' },
    ]
  },

  // ============================================================
  // 直升机 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-ah1z-viper',
    name: 'AH-1Z蝰蛇武装直升机',
    nameEn: 'AH-1Z Viper',
    faction: 'usa',
    category: '直升机',
    specs: ['marine'],
    cost: 175,
    desc: '海军陆战队主力武装直升机，共轴双叶旋翼设计配合先进瞄准系统，可为登陆部队提供精确近距空中支援。与UH-1Y的高零件通用率大幅降低海上维护难度。',
    equipment: [
      { icon: '🚀', name: 'AGM-114 Hellfire导弹×8', pts: 55, desc: '激光/毫米波双模制导，精确反装甲' },
      { icon: '🚀', name: 'AIM-9X响尾蛇导弹×2', pts: 30, desc: '大离轴自卫空空导弹，应对直升机威胁' },
      { icon: '💥', name: 'M197 20mm三管旋转炮', pts: 22, desc: '高射速，压制步兵与轻型目标' },
      { icon: '📡', name: 'TSS目标瞄准系统', pts: 28, desc: '昼夜全天候目标识别与精确激光指示' },
    ]
  },
  {
    id: 'us-mv22-osprey',
    name: 'MV-22鱼鹰倾转旋翼机',
    nameEn: 'MV-22B Osprey',
    faction: 'usa',
    category: '直升机',
    specs: ['marine'],
    cost: 145,
    desc: '兼具直升机垂直起降与固定翼高速飞行能力的革命性倾转旋翼机，巡航速度高达509km/h。可将32名步兵从两栖舰迅速部署至内陆深处。',
    equipment: [
      { icon: '👥', name: '32名士兵运载能力', pts: 30, desc: '快速将一个加强排投送至任意地点' },
      { icon: '🔫', name: 'GAU-21 .50重机枪（机腹）', pts: 18, desc: '下方射界防御，掩护着陆区域' },
      { icon: '💨', name: '箔条/红外诱饵弹×90', pts: 22, desc: '大量诱饵弹对抗各类防空导弹' },
      { icon: '⚡', name: '509km/h高速飞行', pts: 25, desc: '固定翼模式高速飞行，压缩敌人反应时间' },
    ]
  },
  {
    id: 'us-mh60l',
    name: 'MH-60L直接行动渗透直升机',
    nameEn: 'MH-60L Black Hawk (SOCOM)',
    faction: 'usa',
    category: '直升机',
    specs: ['socom'],
    cost: 125,
    desc: '特种作战航空团（160th SOAR）装备的特战版黑鹰，配备超强的电子战与导航设备，可在极端复杂环境中精确投放特种部队，绰号"夜间追踪者"。',
    equipment: [
      { icon: '📡', name: 'AN/APQ-174B地形跟踪雷达', pts: 30, desc: '超低空夜间飞行，贴地30m避开雷达探测' },
      { icon: '🔫', name: 'M134 7.62mm"迷你炮"×2', pts: 25, desc: '6000发/分射速，压制着陆区周边步兵' },
      { icon: '💨', name: 'ALQ-144红外干扰系统', pts: 22, desc: '主动红外干扰，大幅降低被单兵导弹命中概率' },
      { icon: '⛽', name: '空中加油探管', pts: 18, desc: '无限续航能力，支持超远程特种渗透任务' },
    ]
  },
  {
    id: 'us-mh6-littlebird',
    name: 'MH-6M小鸟轻型直升机',
    nameEn: 'MH-6M Little Bird',
    faction: 'usa',
    category: '直升机',
    specs: ['socom'],
    cost: 80,
    desc: '160th SOAR的轻型侦察与突击直升机，以小巧灵活著称。可在城市高楼间穿梭，将特种部队精确投放至楼顶或窄小着陆区，是城市特种作战的利器。',
    equipment: [
      { icon: '🚀', name: 'AGM-114 Hellfire×2（可选）', pts: 25, desc: '点杀模式，精确清除高价值目标' },
      { icon: '🔫', name: 'M134迷你炮×2（可选）', pts: 20, desc: '为特种部队着陆提供密集火力压制' },
      { icon: '👥', name: '外挂平台，运载4名队员', pts: 15, desc: '特种部队坐于机外平台，到达即下机行动' },
      { icon: '⚡', name: '超低声学特征', pts: 10, desc: '安静引擎设计，城市作战中不易被发现' },
    ]
  },
  {
    id: 'us-ch53e-seahorse',
    name: 'CH-53E超级种马运输机',
    nameEn: 'CH-53E Super Stallion',
    faction: 'usa',
    category: '直升机',
    specs: ['marine'],
    cost: 110,
    desc: '美军最大的运输直升机，可将整辆LAV-25或M198榴弹炮吊运至战场。是海军陆战队垂直补给行动的绝对主力，沉重的装备运输依赖它完成。',
    equipment: [
      { icon: '📦', name: '16吨内部/14.5吨外挂载重', pts: 35, desc: '可吊运LAV-25、M198榴弹炮等大型装备' },
      { icon: '👥', name: '37名步兵运载能力', pts: 22, desc: '大规模兵力快速机动投送' },
      { icon: '🔫', name: 'M240机枪×2（可选）', pts: 12, desc: '舱门机枪提供基本自卫火力' },
      { icon: '💨', name: '红外干扰弹系统', pts: 15, desc: '对抗单兵防空导弹' },
    ]
  },

  // ============================================================
  // 直升机 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-mi24v',
    name: 'Mi-24V雌鹿武装运输直升机',
    nameEn: 'Mi-24V Hind',
    faction: 'russia',
    category: '直升机',
    specs: ['motor'],
    cost: 160,
    desc: '苏联经典武装运输直升机，独特的兼顾火力与兵员运输能力使其成为战场多面手。重型装甲使其可吸收相当程度的地面火力，独立飞翔的"堡垒"。',
    equipment: [
      { icon: '🚀', name: '9M114 Shturm导弹×4', pts: 45, desc: '无线电指令制导，射程5km，穿甲550mm' },
      { icon: '💥', name: 'YakB-12.7mm四管旋转机枪', pts: 25, desc: '4000发/分射速，压制步兵效果极强' },
      { icon: '🚀', name: 'S-8 80mm火箭弹×40', pts: 20, desc: '面积压制，清除软目标与轻型载具' },
      { icon: '👥', name: '运载8名步兵', pts: 15, desc: '兼顾火力支援与步兵投送，一机两用' },
      { icon: '🛡', name: '重型装甲防护（驾驶舱）', pts: 25, desc: '可承受23mm炮弹命中，生存能力在武装直升机中首屈一指' },
    ]
  },
  {
    id: 'ru-mi8amtsh',
    name: 'Mi-8AMTSh攻击运输直升机',
    nameEn: 'Mi-8AMTSh Terminator',
    faction: 'russia',
    category: '直升机',
    specs: ['spetsnaz'],
    cost: 105,
    desc: 'Mi-8的武装强化改型，保留充足的运兵能力同时大幅增强了作战火力。携带的Ataka导弹可威胁装甲目标，是VDV突击行动中的全能支援平台。',
    equipment: [
      { icon: '🚀', name: '9M120 Ataka导弹×4', pts: 45, desc: '射程6km，串联战斗部，可威胁现役主战坦克' },
      { icon: '🚀', name: 'B-8V20火箭弹吊舱×2', pts: 18, desc: '40枚80mm火箭弹，饱和打击软目标' },
      { icon: '🔫', name: 'PKT 7.62mm机枪×2', pts: 10, desc: '舱门机枪，掩护人员投送' },
      { icon: '👥', name: '运载24名步兵', pts: 20, desc: '大规模快速投送能力，与火力兼得' },
    ]
  },
  {
    id: 'ru-ka29',
    name: 'Ka-29海军运输直升机',
    nameEn: 'Ka-29 Helix',
    faction: 'russia',
    category: '直升机',
    specs: ['naval'],
    cost: 120,
    desc: '专为海军舰载作战设计的共轴双旋翼运输直升机，比Mi-8更适合舰船甲板操作。可携带反坦克导弹同时运载完整步兵班，是海军步兵的专属空中战马。',
    equipment: [
      { icon: '🚀', name: '9M114 Shturm导弹×4', pts: 40, desc: '为两栖登陆提供精确反装甲打击' },
      { icon: '🔫', name: 'GUV 12.7mm机枪吊舱×2', pts: 20, desc: '压制滩头步兵与轻型目标' },
      { icon: '👥', name: '16名步兵运载', pts: 20, desc: '与Ka-52K配合实施海岸立体突击' },
      { icon: '🌊', name: '防盐雾机体处理', pts: 10, desc: '适应海洋高湿度盐雾环境' },
    ]
  },

  // ============================================================
  // 空袭 · 美国（专精特有）
  // ============================================================
  {
    id: 'us-av8b-harrier',
    name: 'AV-8B+ 鹞式II攻击机',
    nameEn: 'AV-8B+ Harrier II',
    faction: 'usa',
    category: '空袭',
    specs: ['marine'],
    cost: 155,
    desc: '海军陆战队专属垂直/短距起降攻击机，可从两栖舰甲板或简易前方作战基地起飞。为地面部队提供快速响应的精确近距空中支援，无需大型机场。',
    equipment: [
      { icon: '💣', name: 'GBU-12铺路石激光制导炸弹×4', pts: 50, desc: '精确打击坚固目标，对城市建筑与碉堡效果极佳' },
      { icon: '🚀', name: 'AGM-65F马弗里克导弹×2', pts: 35, desc: '红外成像制导，舰船与重型装甲首选武器' },
      { icon: '💥', name: 'GAU-12均衡器 25mm机炮', pts: 22, desc: '高精度对地扫射，近距步兵与轻型目标' },
      { icon: '⚡', name: '垂直起降能力', pts: 18, desc: '无需跑道起降，从舰船甲板或任意平地直接出击' },
    ]
  },
  {
    id: 'us-f18d-hornet',
    name: 'F/A-18D大黄蜂战斗机',
    nameEn: 'F/A-18D Hornet',
    faction: 'usa',
    category: '空袭',
    specs: ['marine'],
    cost: 195,
    desc: '海军陆战队全天候双座战斗攻击机，后座WSO专职引导精确打击，与前方引导员协作能力极强。兼顾制空与对地，是两栖作战的重要空中火力支援。',
    equipment: [
      { icon: '💣', name: 'GBU-31 JDAM 900kg制导炸弹×2', pts: 65, desc: 'GPS制导，全天候精确轰炸' },
      { icon: '🚀', name: 'AGM-65 Maverick×2', pts: 40, desc: '多模制导，对装甲目标与船只威胁极大' },
      { icon: '🚀', name: 'AIM-120 AMRAAM×2', pts: 30, desc: '自卫空空导弹，维持制空权' },
      { icon: '💥', name: 'M61A1 20mm火神炮', pts: 20, desc: '近距离火力补充' },
    ]
  },
  {
    id: 'us-c130h',
    name: 'C-130H战术运输/空投',
    nameEn: 'C-130H Hercules Airdrop',
    faction: 'usa',
    category: '空袭',
    specs: ['airborne'],
    cost: 85,
    desc: '执行战术空降任务的C-130大力神运输机，可将大批伞兵与物资空投至目标区域。是空降作战的基石载具，也可作为快速前线补给手段使用。',
    equipment: [
      { icon: '🪂', name: '92名伞兵空投能力', pts: 40, desc: '大规模空降，在目标区域快速集结兵力' },
      { icon: '📦', name: '重装备空投平台', pts: 30, desc: '可投送M119火炮、HMMWV与弹药补给托盘' },
      { icon: '💨', name: '箔条/红外诱饵弹×120', pts: 15, desc: '大量诱饵弹降低被防空导弹命中概率' },
    ]
  },
  {
    id: 'us-ac130u',
    name: 'AC-130U炮艇机',
    nameEn: 'AC-130U Spooky II',
    faction: 'usa',
    category: '空袭',
    specs: ['socom'],
    cost: 230,
    desc: '改装自C-130的重型空中炮艇，装备三种口径火炮，可在空中长时间盘旋持续炮击地面目标。精确的传感器融合系统使其在城市与丛林战场均可精准区分目标。',
    equipment: [
      { icon: '💥', name: 'M102 105mm榴弹炮（侧射）', pts: 60, desc: '每分钟10发，对坚固目标毁伤效果极佳' },
      { icon: '💥', name: 'Bofors 40mm机炮（侧射）', pts: 35, desc: '精准快速对地火力，软目标清除率极高' },
      { icon: '💥', name: 'GAU-12 25mm机炮（侧射）', pts: 25, desc: '精确点射，建筑物射孔内目标亦可打击' },
      { icon: '📡', name: '多传感器目标定位系统', pts: 30, desc: '红外/光电/毫米波雷达融合，全天候精确打击' },
    ]
  },
  {
    id: 'us-f16c-viper',
    name: 'F-16C战隼战斗机',
    nameEn: 'F-16C Fighting Falcon',
    faction: 'usa',
    category: '空袭',
    specs: ['stryker'],
    cost: 175,
    desc: '美军最常见的多用途战斗机，可执行制空、对地攻击与压制防空等多种任务。成本适中且高度灵活，配合精确制导武器可对各类地面目标实施精确打击。',
    equipment: [
      { icon: '💣', name: 'GBU-12激光制导炸弹×4', pts: 50, desc: '精确打击装甲阵地与坚固目标' },
      { icon: '🚀', name: 'AGM-88 HARM反辐射导弹×2', pts: 45, desc: '压制敌方防空雷达，开辟突防走廊' },
      { icon: '🚀', name: 'AIM-9X响尾蛇×2 + AIM-120×2', pts: 40, desc: '自卫制空，应对各类空中威胁' },
      { icon: '💥', name: 'M61A1 20mm火神炮', pts: 20, desc: '近距离补充攻击' },
    ]
  },
  {
    id: 'us-f22a-raptor',
    name: 'F-22A猛禽战斗机',
    nameEn: 'F-22A Raptor',
    faction: 'usa',
    category: '空袭',
    specs: ['socom'],
    cost: 290,
    desc: '世界最先进的第五代制空战斗机，超音速巡航配合低可观测隐身特征，几乎无法被现有防空系统探测。是清除敌方空中优势的终极手段。',
    equipment: [
      { icon: '🚀', name: 'AIM-120D AMRAAM×6（内置弹仓）', pts: 80, desc: '主动雷达制导，射程180km，发射后不管' },
      { icon: '🚀', name: 'AIM-9X×2（内置弹仓）', pts: 30, desc: '大离轴近距空空导弹，近身格斗首选' },
      { icon: '💣', name: 'GBU-32 JDAM 450kg×2（可选）', pts: 45, desc: '对地模式精确打击高价值目标' },
      { icon: '🎭', name: '超低可观测隐身涂层', pts: 70, desc: '正面RCS<0.0001㎡，现有雷达几乎无法探测' },
      { icon: '⚡', name: '超音速巡航能力', pts: 35, desc: 'M1.8不开加力超音速巡航，在敌防空网内快速突防' },
    ]
  },
  {
    id: 'us-b2-spirit',
    name: 'B-2幽灵隐身轰炸机',
    nameEn: 'B-2A Spirit',
    faction: 'usa',
    category: '空袭',
    specs: ['socom'],
    cost: 350,
    desc: '世界唯一现役隐身战略轰炸机，可突破最严密防空网络对纵深目标实施核/常规精确打击。MOP超级炸弹可摧毁最坚固的地下掩体，战略震慑价值无与伦比。',
    equipment: [
      { icon: '💣', name: 'GBU-57 MOP超级炸弹×2', pts: 120, desc: '14吨穿地炸弹，可穿透60m混凝土摧毁深层指挥中心' },
      { icon: '💣', name: 'GBU-28激光制导钻地弹×4', pts: 80, desc: '灵巧钻地弹，对加固目标毁伤效果极佳' },
      { icon: '🎭', name: 'B-2飞翼隐身气动外形', pts: 80, desc: '全向隐身，现有防空系统无法有效探测拦截' },
      { icon: '🚀', name: 'JASSM-ER防区外巡航导弹×16', pts: 70, desc: '射程1000km防区外打击，不进入敌防空区域' },
    ]
  },

  // ============================================================
  // 空袭 · 俄罗斯（专精特有）
  // ============================================================
  {
    id: 'ru-su57-felon',
    name: 'Su-57 鹞鸭战斗机',
    nameEn: 'Su-57 Felon',
    faction: 'russia',
    category: '空袭',
    specs: ['armored'],
    cost: 270,
    desc: '俄罗斯第五代隐身多用途战斗机，等离子体隐身技术与超机动性赋予其独特的空战优势。可在防空导弹威胁区域内实施精确打击，是俄军最先进的空中平台。',
    equipment: [
      { icon: '🚀', name: 'Kh-59MK2防区外导弹×2（内弹仓）', pts: 70, desc: '光学制导，射程290km，精确打击地面目标' },
      { icon: '🚀', name: 'R-77-1空空导弹×4（内弹仓）', pts: 50, desc: '主动雷达制导，射程110km，格栅舵增强机动' },
      { icon: '🎭', name: '等离子体隐身系统', pts: 60, desc: '降低雷达反射截面，提升防空系统探测难度' },
      { icon: '⚡', name: '超机动矢量推力发动机', pts: 40, desc: 'AL-41F1带推力矢量控制，近距格斗中有压倒性优势' },
    ]
  },
  {
    id: 'ru-su24m2',
    name: 'Su-24M2前线轰炸机',
    nameEn: 'Su-24M2 Fencer',
    faction: 'russia',
    category: '空袭',
    specs: ['naval'],
    cost: 145,
    desc: '俄军主力前线轰炸机，可变后掠翼设计赋予其低空超音速突防能力。大载弹量和优异的低空性能，是对抗敌方后方目标的主力机型。',
    equipment: [
      { icon: '💣', name: 'KAB-500Kr电视制导炸弹×2', pts: 45, desc: '精确电视制导，对固定目标效果极佳' },
      { icon: '🚀', name: 'Kh-25ML激光制导导弹×4', pts: 45, desc: '激光半主动，精确打击各类点目标' },
      { icon: '🚀', name: 'B-8M1火箭弹吊舱×4', pts: 25, desc: '80枚80mm火箭弹，对步兵与车辆集群实施饱和打击' },
      { icon: '💥', name: 'GSh-6-23M 23mm机炮', pts: 20, desc: '六管旋转炮，对地扫射效果好' },
    ]
  },
  {
    id: 'ru-kh101-strike',
    name: 'Kh-101巡航导弹打击',
    nameEn: 'Kh-101 Cruise Missile Strike',
    faction: 'russia',
    category: '空袭',
    specs: ['armored'],
    cost: 200,
    desc: '由Tu-160或Tu-95战略轰炸机投射的远程巡航导弹打击，可在防区外5500km对任意目标实施精确打击。超低空飞行轮廓与隐身设计极难被拦截。',
    equipment: [
      { icon: '🚀', name: 'Kh-101常规弹头', pts: 90, desc: '400kg穿甲/爆破复合弹头，射程5500km，CEP<5m' },
      { icon: '🎭', name: '低RCS隐身气动外形', pts: 40, desc: '低空飞行结合隐身涂层，防空系统极难探测' },
      { icon: '💻', name: 'GLONASS+地形跟踪制导', pts: 40, desc: '复合制导系统，精确打击高价值目标' },
      { icon: '📡', name: '末段光学目标识别', pts: 30, desc: '末端图像匹配提升精度，CEP进一步压缩至<2m' },
    ]
  },

  // ============================================================
  // 补充单位 · 美国
  // ============================================================
  {
    id: 'us-army-snipers',
    name: '陆军狙击手组',
    nameEn: 'Army Sniper Team',
    faction: 'usa',
    category: '侦察',
    specs: ['stryker'],
    cost: 55,
    desc: '美国陆军精准射手与观测员二人组，专职远距离目标标记与压制。装备M2010增强型狙击步枪，可在800m外精确点杀目标并引导炮兵或空袭。',
    equipment: [
      { icon: '🔫', name: 'M2010增强型狙击步枪', pts: 18, desc: '.300 Win Mag口径，有效射程1200m，精度高于M24' },
      { icon: '🔭', name: 'AN/PVS-29昼夜瞄准镜', pts: 12, desc: '热成像附加组件，提升夜间与烟雾条件下目标识别' },
      { icon: '🎯', name: 'AN/PEQ-15激光指示器', pts: 10, desc: '为精确制导炸弹提供激光照射' },
      { icon: '📻', name: '战术无线电台', pts: 5, desc: '与炮兵与空中协调员实时通联' },
    ]
  },
  {
    id: 'us-cavalry-scouts',
    name: '骑兵侦察班',
    nameEn: 'Cavalry Scouts',
    faction: 'usa',
    category: '侦察',
    specs: ['stryker'],
    cost: 40,
    desc: '斯特赖克旅骑兵侦察班，乘车快速前出对敌阵地实施接触侦察。配备先进侦察传感器，是旅级战斗队获取战场情报的一线力量。',
    equipment: [
      { icon: '🔭', name: 'AN/PAS-13热成像瞄准镜', pts: 12, desc: '车载与步行均可使用，夜间侦察效果优秀' },
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 8, desc: '制式武器，下车侦察时自卫' },
      { icon: '📡', name: 'BFT蓝军追踪系统', pts: 10, desc: '实时共享己方位置与情报数据' },
      { icon: '💣', name: 'AT4反装甲火箭筒', pts: 15, desc: '应对接触时的轻装甲紧急威胁' },
    ]
  },
  {
    id: 'us-tow2-team',
    name: 'TOW-2反坦克组',
    nameEn: 'TOW-2 AT Team',
    faction: 'usa',
    category: '步兵',
    specs: ['armor'],
    cost: 60,
    desc: '装备BGM-71 TOW-2B顶攻型反坦克导弹的步兵组，是美军装甲旅步兵的反装甲骨干。可从掩体或建筑物阵地发射，对装甲目标构成远距离精确威胁。',
    equipment: [
      { icon: '🚀', name: 'BGM-71F TOW-2B顶攻导弹×2', pts: 45, desc: '飞越目标顶部引爆，穿击车顶薄弱装甲，射程3.75km' },
      { icon: '🔭', name: 'AN/TAS-4夜视热成像瞄准具', pts: 15, desc: '全天候目标锁定，夜间仍可精准制导' },
      { icon: '🔫', name: 'M4A1卡宾枪（自卫）', pts: 5, desc: '近身防御用' },
      { icon: '🛡', name: '三脚架快速展开系统', pts: 5, desc: '30秒内完成架设，快速转移阵地' },
    ]
  },
  {
    id: 'us-cav-riflemen',
    name: '骑兵步枪手班',
    nameEn: 'Cavalry Riflemen',
    faction: 'usa',
    category: '步兵',
    specs: ['stryker'],
    cost: 32,
    desc: '斯特赖克旅制式步兵班，搭乘斯特赖克ICV快速机动。步兵下车后占领关键地形，弹性作战能力强，是斯特赖克旅的战斗核心。',
    equipment: [
      { icon: '🔫', name: 'M4A1卡宾枪', pts: 8, desc: '制式突击步枪，装备全班' },
      { icon: '🚀', name: 'M72 LAW轻型反装甲武器', pts: 10, desc: '一次性66mm火箭，应急反装甲' },
      { icon: '🔫', name: 'M249 SAW班用机枪', pts: 10, desc: '班组持续压制火力' },
      { icon: '💨', name: 'AN/PRC-152多波段手持电台', pts: 4, desc: '与斯特赖克车辆实时协同' },
    ]
  },
  {
    id: 'us-humvee-avenger',
    name: '复仇者防空车',
    nameEn: 'M1097 Humvee Avenger',
    faction: 'usa',
    category: '支援',
    specs: ['stryker'],
    cost: 95,
    desc: '以HMMWV为底盘的快速部署近程防空系统，装备双联装FIM-92毒刺导弹与可选.50机枪。可跟随装甲部队推进，为前线单位提供野战防空保护。',
    equipment: [
      { icon: '🚀', name: 'FIM-92毒刺导弹×8（双联发射架）', pts: 55, desc: '射程5.5km，被动红外+紫外制导，反直升机与低空飞机' },
      { icon: '🔫', name: 'M3P .50重机枪（可选）', pts: 10, desc: '补充反低空与地面目标火力' },
      { icon: '📡', name: 'AGPU辅助动力单元', pts: 8, desc: '无需主发动机运转即可供电搜索目标，延长待机时间' },
      { icon: '🚗', name: 'HMMWV高机动底盘', pts: 7, desc: '公路速度113km/h，可跟随装甲部队快速机动' },
    ]
  },
  {
    id: 'us-stryker-shorad',
    name: '斯特赖克SHORAD防空车',
    nameEn: 'Stryker SHORAD',
    faction: 'usa',
    category: '支援',
    specs: ['stryker'],
    cost: 130,
    desc: '基于斯特赖克平台的短程防空系统，整合刺针导弹、Longbow雷达与30mm机炮，可全方位拦截无人机、直升机与低空飞机，是旅级防空的核心。',
    equipment: [
      { icon: '🚀', name: 'FIM-92刺针导弹×4', pts: 45, desc: '被动红外制导，射程5.5km，快速交战' },
      { icon: '💥', name: 'XM813 30mm链炮', pts: 30, desc: '高射速精准拦截，补充导弹近距离防御' },
      { icon: '📡', name: 'AN/MPQ-64哨兵雷达接口', pts: 25, desc: '接入旅级防空网络，实时共享空情' },
      { icon: '🚀', name: 'AGM-114 Hellfire导弹×2', pts: 30, desc: '对武装直升机与低速飞机具备极强威胁' },
    ]
  },
  {
    id: 'us-bradley-linebacker',
    name: 'M6林巴克防空战车',
    nameEn: 'M6 Bradley Linebacker',
    faction: 'usa',
    category: '支援',
    specs: ['armor'],
    cost: 115,
    desc: '在M2A2布拉德利基础上将TOW发射架替换为四联装刺针导弹的近程防空战车。可跟随装甲旅推进，为重型装甲部队提供野战防空保护伞，是装甲部队的防空骨干。',
    equipment: [
      { icon: '🚀', name: 'FIM-92毒刺导弹×4（四联装）', pts: 50, desc: '被动红外制导，射程5.5km，拦截直升机与低空飞机' },
      { icon: '💥', name: 'M242 25mm大毒蛇链炮', pts: 30, desc: '保留原有链炮，可压制低速目标与步兵' },
      { icon: '🛡', name: '布拉德利M2A2装甲防护', pts: 25, desc: '重型装甲，可伴随主战坦克推进' },
      { icon: '📡', name: '防空协同数据链', pts: 10, desc: '与帕特里奥特等防空系统组网，共享空情' },
    ]
  },
  {
    id: 'us-acv',
    name: 'ACV两栖战车',
    nameEn: 'ACV-15 Amphibious Combat Vehicle',
    faction: 'usa',
    category: '战斗载具',
    specs: ['marine'],
    cost: 95,
    desc: 'AAV7的接替者，海军陆战队新一代两栖战车。采用增强型两栖推进系统与更厚实的装甲，在保持高速渡海能力的同时大幅提升了对RPG与地雷的防护。',
    equipment: [
      { icon: '🔫', name: 'M2 .50重机枪 + Mk19榴弹发射器', pts: 22, desc: '遥控武器站，应对滩头步兵威胁' },
      { icon: '🚤', name: '增强型水喷推进系统', pts: 25, desc: '水中速度13km/h，海况4级仍可稳定作战' },
      { icon: '🛡', name: 'STANAG 4569 Level 4防护', pts: 30, desc: '可抵御14.5mm穿甲弹与155mm炮弹破片' },
      { icon: '👥', name: '运载13名海军陆战队员', pts: 18, desc: '比AAV7更少但防护更强' },
    ]
  },
  {
    id: 'us-lav-ad',
    name: 'LAV-AD轻型防空车',
    nameEn: 'LAV-AD Air Defense',
    faction: 'usa',
    category: '支援',
    specs: ['marine'],
    cost: 110,
    desc: '海军陆战队专属轻型防空车，将GAU-12机炮与刺针导弹整合于LAV-25底盘。机动灵活，可随海军陆战队旅快速机动，保护两栖登陆部队免受空中威胁。',
    equipment: [
      { icon: '💥', name: 'GAU-12 25mm五管旋转机炮', pts: 35, desc: '高射速，对低空目标弹幕拦截效果优秀' },
      { icon: '🚀', name: 'FIM-92毒刺导弹×8', pts: 50, desc: '被动红外制导，射程5.5km' },
      { icon: '🚗', name: 'LAV-25 8×8轮式底盘', pts: 15, desc: '两栖能力，与海军陆战队步兵配合推进' },
      { icon: '📡', name: '目标指示雷达', pts: 10, desc: '被动/主动双模搜索低空威胁' },
    ]
  },
  {
    id: 'us-m10-booker',
    name: 'M10布克轻型坦克',
    nameEn: 'M10 Booker',
    faction: 'usa',
    category: '战斗载具',
    specs: ['airborne'],
    cost: 130,
    desc: '美军全新轻型坦克，专为步兵旅与空降部队提供直接火力支援。105mm线膛炮可对付多数装甲威胁，C-17可运输2辆，是空降部队缺少重型支援时的关键选项。',
    equipment: [
      { icon: '💥', name: 'M35 105mm线膛炮', pts: 50, desc: '可发射M900 APFSDS穿甲弹，对付BMP级装甲效果好' },
      { icon: '🛡', name: 'LASSO主动保护系统', pts: 30, desc: '软杀伤系统，干扰来袭导弹制导' },
      { icon: '🔫', name: 'M2 .50重机枪 + M240同轴机枪', pts: 15, desc: '反步兵火力' },
      { icon: '👁', name: '第三代热成像火控系统', pts: 25, desc: '全天候目标识别，激光测距自动射击解算' },
    ]
  },
  {
    id: 'us-ah1w-cobra',
    name: 'AH-1W超级眼镜蛇武装直升机',
    nameEn: 'AH-1W Super Cobra',
    faction: 'usa',
    category: '直升机',
    specs: ['marine'],
    cost: 155,
    desc: '海军陆战队老将级武装直升机，以出色的可靠性与紧凑外形著称。可从两栖攻击舰甲板起飞，为登陆部队提供即时火力支援，是AH-1Z的前辈与搭档。',
    equipment: [
      { icon: '🚀', name: 'AGM-114 Hellfire导弹×8', pts: 55, desc: '激光制导，精确反装甲打击' },
      { icon: '🚀', name: 'Hydra 70火箭弹×38', pts: 20, desc: '面积压制，清除滩头步兵集群' },
      { icon: '💥', name: 'M197 20mm三管旋转炮', pts: 20, desc: '高射速，扫射步兵与轻型目标' },
      { icon: '🚀', name: 'AIM-9L响尾蛇导弹×2', pts: 22, desc: '近距离空对空自卫' },
    ]
  },
  {
    id: 'us-uh1y-venom',
    name: 'UH-1Y毒液运输直升机',
    nameEn: 'UH-1Y Venom',
    faction: 'usa',
    category: '直升机',
    specs: ['marine'],
    cost: 90,
    desc: '海军陆战队通用运输直升机，与AH-1Z共享80%零件，大幅降低海上维护压力。可快速运送步兵班至任意登陆点，也可执行伤员后送与物资补给任务。',
    equipment: [
      { icon: '👥', name: '10名步兵运载能力', pts: 18, desc: '快速投送一个步兵班至前沿阵地' },
      { icon: '🔫', name: 'M240机枪×2（舱门）', pts: 15, desc: '左右舱门各一，掩护着陆区' },
      { icon: '💨', name: '箔条/红外诱饵弹系统', pts: 18, desc: '对抗单兵防空导弹' },
      { icon: '🔦', name: 'AN/AVS-9夜视系统', pts: 14, desc: '夜间飞行与投送能力' },
    ]
  },
  {
    id: 'us-f15e-strike-eagle',
    name: 'F-15E攻击鹰战斗机',
    nameEn: 'F-15E Strike Eagle',
    faction: 'usa',
    category: '空袭',
    specs: ['armor'],
    cost: 220,
    desc: '美国空军主力双座战斗轰炸机，载弹量冠绝现役战术飞机。多种精确制导武器组合使其可对各类地面目标实施全天候远距精确打击，是装甲旅最有力的空中火力。',
    equipment: [
      { icon: '💣', name: 'GBU-28钻地弹×2', pts: 70, desc: '2.27吨激光制导钻地弹，穿透30m混凝土强化目标' },
      { icon: '🚀', name: 'AGM-130空对地导弹×2', pts: 55, desc: '电视/红外制导，射程56km，防区外精确打击' },
      { icon: '🚀', name: 'AIM-120 AMRAAM×4 + AIM-9X×2', pts: 50, desc: '全方位空战能力，维持制空权' },
      { icon: '💥', name: 'M61A1 20mm火神炮', pts: 15, desc: '近距离补充攻击' },
      { icon: '📡', name: 'AN/APG-70合成孔径雷达', pts: 30, desc: '全天候地面目标测绘与精确打击' },
    ]
  },
  {
    id: 'us-b1b-lancer',
    name: 'B-1B枪骑兵战略轰炸机',
    nameEn: 'B-1B Lancer',
    faction: 'usa',
    category: '空袭',
    specs: ['armor'],
    cost: 310,
    desc: '美国空军超音速战略轰炸机，载弹量高达34吨，可在3小时内抵达全球任意目标。低空超音速突防配合大量精确制导武器，是战场上最具震慑力的常规轰炸平台。',
    equipment: [
      { icon: '💣', name: 'GBU-31 JDAM制导炸弹×24', pts: 100, desc: 'GPS/INS制导，全天候精确打击，覆盖面积目标' },
      { icon: '🚀', name: 'JASSM-ER隐身巡航导弹×24', pts: 120, desc: '射程1000km防区外打击，低可观测隐身设计' },
      { icon: '⚡', name: 'M1.25超音速飞行', pts: 50, desc: '可变后掠翼超音速突防，压缩敌方反应时间' },
      { icon: '💨', name: '电子战自保系统', pts: 40, desc: '综合干扰与诱饵弹，对抗防空导弹系统' },
    ]
  },

  // ============================================================
  // 补充单位 · 俄罗斯
  // ============================================================
  {
    id: 'ru-t15-armata',
    name: 'T-15阿玛塔重型步兵战车',
    nameEn: 'T-15 Armata HIFV',
    faction: 'russia',
    category: '战斗载具',
    specs: ['armored'],
    cost: 270,
    desc: '基于阿玛塔通用平台研发的重型步兵战车，防护等级堪比主战坦克。双人无人炮塔装备57mm机炮，可有效对抗武装直升机与轻型装甲目标，是BMPT的接替候选。',
    equipment: [
      { icon: '💥', name: '2A90 57mm自动炮', pts: 65, desc: '高射速大口径，对低空目标和轻装甲均有极大威胁' },
      { icon: '🚀', name: '9M120 Ataka导弹×4', pts: 50, desc: '反坦克导弹，射程6km，穿甲950mm' },
      { icon: '🛡', name: 'Afganit主动防护系统', pts: 70, desc: '与T-14同款，软硬双重拦截来袭反坦克弹药' },
      { icon: '👥', name: '搭载9名步兵（乘员舱隔离）', pts: 35, desc: '乘员与车组均受到炮塔舱隔离保护' },
    ]
  },
  {
    id: 'ru-kurganets25',
    name: 'BMP库尔干涅茨-25步兵战车',
    nameEn: 'Kurganets-25',
    faction: 'russia',
    category: '战斗载具',
    specs: ['armored'],
    cost: 140,
    desc: '俄军新一代步兵战车，采用无人炮塔设计与主动防护系统，大幅超越BMP-3的防护等级。30mm机炮与Kornet导弹组合使其在面对各类目标时均有良好表现。',
    equipment: [
      { icon: '💥', name: '2A42 30mm链炮', pts: 30, desc: '双速率射击，精准压制步兵与轻装甲' },
      { icon: '🚀', name: '9M133科尔内特导弹×2', pts: 35, desc: '激光驾束制导，穿甲1100mm，射程5.5km' },
      { icon: '🛡', name: 'APS主动防护系统', pts: 35, desc: '拦截来袭RPG与反坦克导弹' },
      { icon: '🚤', name: '两栖推进装置', pts: 15, desc: '浮渡渡河能力，无需准备' },
    ]
  },
  {
    id: 'ru-brm3k',
    name: 'BRM-3K山猫侦察战车',
    nameEn: 'BRM-3K Rys',
    faction: 'russia',
    category: '侦察',
    specs: ['armored'],
    cost: 95,
    desc: '俄军装甲旅专用侦察战车，基于BMP-3底盘改装，配备多光谱侦察系统与激光测距仪。装甲防护充足，可伴随坦克推进中实施近距离战场侦察与目标定位。',
    equipment: [
      { icon: '📡', name: '多光谱侦察站（GORIZONT）', pts: 35, desc: '光电/红外/激光三合一，探测距离15km以上' },
      { icon: '🎯', name: '激光测距与目标指示', pts: 20, desc: '精确坐标传输给炮兵与航空兵' },
      { icon: '💥', name: '2A72 30mm链炮（保留）', pts: 22, desc: '自卫火力，压制步兵与轻型目标' },
      { icon: '💻', name: '战场管理系统终端', pts: 18, desc: '实时将侦察数据上传至旅级指挥系统' },
    ]
  },
  {
    id: 'ru-shilka',
    name: 'ZSU-23-4石勒喀河防空炮',
    nameEn: 'ZSU-23-4 Shilka',
    faction: 'russia',
    category: '支援',
    specs: ['motor'],
    cost: 100,
    desc: '苏联经典弹炮合一自行防空系统，四管23mm机炮配合搜索雷达，可在360°全方位拦截低空飞机与直升机。尽管已属老旧，但密集火力对低空目标仍具震慑力。',
    equipment: [
      { icon: '💥', name: 'AZP-23"Amur"23mm四管机炮', pts: 50, desc: '3400发/分总射速，有效射程2.5km，弹幕极为密集' },
      { icon: '📡', name: 'RPK-2搜索/跟踪雷达', pts: 30, desc: '探测距离20km，自动跟踪并计算射击提前角' },
      { icon: '🛡', name: '履带装甲底盘', pts: 20, desc: '可伴随装甲部队快速机动，全地形防空保护' },
    ]
  },
  {
    id: 'ru-strela10m',
    name: '箭-10M近程防空系统',
    nameEn: 'Strela-10M / SA-13',
    faction: 'russia',
    category: '支援',
    specs: ['motor'],
    cost: 115,
    desc: '以MT-LB为底盘的四联装近程防空导弹系统，采用光学/红外被动制导，可在电子对抗环境下对抗直升机与低空飞机。与石勒喀配合形成低空双层防护网络。',
    equipment: [
      { icon: '🚀', name: '9M37ME导弹×4（可重装）', pts: 55, desc: '红外+光学制导，射程5km，最大射高3.5km' },
      { icon: '👁', name: '光电跟踪与被动红外探测', pts: 25, desc: '不开雷达即可探测目标，低截获概率' },
      { icon: '🚗', name: 'MT-LB通用履带底盘', pts: 20, desc: '两栖能力，随摩步部队快速推进' },
      { icon: '🔗', name: '防空网络接口', pts: 15, desc: '与石勒喀及通古斯卡组成低层防空网络' },
    ]
  },
  {
    id: 'ru-buk-m2',
    name: 'BUK-M2山毛榉防空导弹系统',
    nameEn: 'Buk-M2 / SA-17',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 230,
    desc: '俄军中程区域防空导弹系统，半主动雷达制导，可同时跟踪多目标并应对4G过载机动飞机。是俄军野战防空的中层骨干，有效填补S-300与近程防空的衔接空白。',
    equipment: [
      { icon: '🚀', name: '9M317导弹×4', pts: 80, desc: '半主动雷达制导，射程45km，最大拦截高度25km' },
      { icon: '📡', name: '相控阵目标照射雷达', pts: 55, desc: '同时跟踪10个目标，引导多枚导弹拦截' },
      { icon: '🛡', name: '履带式发射车（9A317）', pts: 35, desc: '可随装甲部队机动，具备一定越野能力' },
      { icon: '🔗', name: '防空系统数据链', pts: 30, desc: '与S-300及近程防空系统联网，协同作战' },
    ]
  },
  {
    id: 'ru-tor-m2',
    name: 'TOR-M2防空系统',
    nameEn: 'Tor-M2 / SA-15',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 180,
    desc: '俄军先进近程全天候防空系统，可拦截隐身巡航导弹、无人机与精确制导炸弹。反应时间不足5秒，可在行进间发射，专门针对精确打击弹药设计。',
    equipment: [
      { icon: '🚀', name: '9M338导弹×16（四联装×4）', pts: 70, desc: '射程15km，最大拦截速度Mach 3，行进间发射' },
      { icon: '📡', name: '相控阵搜索/跟踪雷达（双天线）', pts: 50, desc: '48个目标同时跟踪，全自动目标识别' },
      { icon: '🛡', name: '履带装甲底盘', pts: 30, desc: '随装甲部队机动，全地形防空保障' },
      { icon: '💻', name: '自动化作战系统', pts: 30, desc: '从目标探测到拦截全程自动，反应时间<5秒' },
    ]
  },
  {
    id: 'ru-malka',
    name: '2S7M马尔卡大口径自行炮',
    nameEn: '2S7M Malka',
    faction: 'russia',
    category: '支援',
    specs: ['armored'],
    cost: 260,
    desc: '全球口径最大的自行榴弹炮之一，203mm炮弹可摧毁坚固要塞与深层目标。极远射程使其可在完全安全距离外对敌重要节点实施毁灭性打击，是俄军炮兵的终极王牌。',
    equipment: [
      { icon: '💥', name: '2A44 203mm榴弹炮', pts: 110, desc: '射程47km（增程弹），可发射核弹头，圆概率误差<40m' },
      { icon: '🎯', name: '克拉斯诺波利激光制导炮弹', pts: 60, desc: '激光半主动制导，对固定目标精度<5m' },
      { icon: '🛡', name: 'T-80底盘', pts: 50, desc: '重型承载底盘，适应各类地形' },
      { icon: '⚡', name: '自动供弹系统', pts: 40, desc: '减少装填人员，射速提升至1.5发/分' },
    ]
  },
  {
    id: 'ru-vdv-sniper',
    name: 'VDV狙击手（T-5000）',
    nameEn: 'VDV Sniper T-5000',
    faction: 'russia',
    category: '侦察',
    specs: ['vdv'],
    cost: 70,
    desc: '俄空降军精锐狙击手，装备ORSIS T-5000.308精密狙击步枪。可空投至敌后，在极端条件下执行超远距离侦察与定点清除任务，是VDV隐形打击力量的核心。',
    equipment: [
      { icon: '🔫', name: 'ORSIS T-5000精密狙击步枪', pts: 28, desc: '.308 Win口径，1500m内精准射击，MOA<0.3' },
      { icon: '🔭', name: 'Schmidt&Bender PM II 5-25×56瞄准镜', pts: 15, desc: '一流光学瞄准，适应各种光线条件' },
      { icon: '🪂', name: '高空低开跳伞装具', pts: 15, desc: 'HALO跳伞，从高空无声渗透至目标区' },
      { icon: '📡', name: 'R-187P1弩加密电台', pts: 10, desc: '抗干扰加密通信，与上级协调' },
    ]
  },
  {
    id: 'ru-specnaz-vmf',
    name: '海军特种部队',
    nameEn: 'Spetsnaz VMF',
    faction: 'russia',
    category: '步兵',
    specs: ['naval'],
    cost: 100,
    desc: '俄罗斯海军特种部队，专精两栖渗透、水下破坏与近海特种作战。可从潜艇或橡皮艇隐蔽接近目标，实施港口设施破坏、情报收集与高价值目标清除任务。',
    equipment: [
      { icon: '🔫', name: 'AS Val消音步枪', pts: 20, desc: '9x39mm亚音速，水下射击无误，近距无声打击' },
      { icon: '🚤', name: 'IDA-71闭路呼吸潜水装置', pts: 18, desc: '无气泡潜水，可在水下隐蔽行动数小时' },
      { icon: '💣', name: '水下定向爆破装药', pts: 22, desc: '摧毁船体、港口设施与水下管道' },
      { icon: '🎯', name: '激光目标指示器', pts: 15, desc: '引导舰炮或航空兵打击近岸目标' },
      { icon: '📡', name: '防水加密通讯系统', pts: 10, desc: '与舰队及岸基指挥实时联络' },
    ]
  },
  {
    id: 'ru-mi35m',
    name: 'Mi-35M雌鹿-M武装运输直升机',
    nameEn: 'Mi-35M Hind-E',
    faction: 'russia',
    category: '直升机',
    specs: ['naval'],
    cost: 165,
    desc: '雌鹿系列的现代化改型，换装新型短翼、夜视系统与Ataka-VM导弹，全面提升了夜战与精确打击能力。比原版Mi-24结构更紧凑，海军使用时更便于甲板操作。',
    equipment: [
      { icon: '🚀', name: '9M120-1 Ataka-VM导弹×8', pts: 60, desc: '新型制导，穿甲能力提升至960mm，射程6km' },
      { icon: '💥', name: 'NPPU-23火炮吊舱（23mm机炮）', pts: 22, desc: '灵活指向炮架，覆盖更大射击角度' },
      { icon: '🔦', name: 'GOES-342光电瞄准系统', pts: 28, desc: '热成像/电视/激光三合一，全天候目标定位' },
      { icon: '👥', name: '运载8名步兵', pts: 15, desc: '保留原版运兵能力，多用途定位' },
    ]
  },
  {
    id: 'ru-su27sm',
    name: 'Su-27SM侧卫战斗机',
    nameEn: 'Su-27SM Flanker',
    faction: 'russia',
    category: '空袭',
    specs: ['armored'],
    cost: 200,
    desc: '俄军骨干制空战斗机的现代化改型，加装多用途对地攻击能力与更先进的航电系统。强大的空战性能使其在执行对地打击任务时同时具备高度自我防卫能力。',
    equipment: [
      { icon: '🚀', name: 'Kh-29T电视制导导弹×2', pts: 50, desc: '发射后不管，射程10km，对固定目标精度高' },
      { icon: '💣', name: 'KAB-500Kr电视制导炸弹×4', pts: 50, desc: '精确制导，打击坚固工事与装甲集群' },
      { icon: '🚀', name: 'R-27ER/ET空空导弹×4', pts: 40, desc: '中距空空导弹，射程130km，制空优势明显' },
      { icon: '💥', name: 'GSh-30-1 30mm机炮', pts: 20, desc: '近距离对地扫射，步兵杀伤效果好' },
      { icon: '⚡', name: 'AL-31F超推比发动机', pts: 30, desc: '推力比佳，格斗机动性出色' },
    ]
  },
  {
    id: 'ru-tu22m3',
    name: 'Tu-22M3逆火战略轰炸机',
    nameEn: 'Tu-22M3 Backfire',
    faction: 'russia',
    category: '空袭',
    specs: ['armored'],
    cost: 280,
    desc: '俄罗斯超音速可变后掠翼战略轰炸机，专为突破北约防空网络而设计。Mach 1.8巡航配合大量精确制导武器，可对纵深目标实施毁灭性打击，是舰队反舰与对地两用平台。',
    equipment: [
      { icon: '🚀', name: 'Kh-22反舰/对地导弹×3', pts: 90, desc: '射程600km，Mach 4飞行，穿甲战斗部打击加固目标' },
      { icon: '💣', name: 'KAB-1500L制导炸弹×2', pts: 65, desc: '1.5吨级激光制导，对坚固掩体毁伤极大' },
      { icon: '⚡', name: 'Mach 1.88超音速突防', pts: 55, desc: '可变后掠翼，超音速突防降低被拦截概率' },
      { icon: '💨', name: '电子战干扰系统', pts: 40, desc: '主动干扰雷达，保护轰炸机免受导弹攻击' },
    ]
  },
  {
    id: 'ru-nona-svk',
    name: '2S23野风-SVK轮式自行炮',
    nameEn: '2S23 Nona-SVK',
    faction: 'russia',
    category: '支援',
    specs: ['naval'],
    cost: 105,
    desc: '以BTR-80底盘为基础的轮式自行炮，装备与2S9相同的120mm多功能炮。高机动性使其可随海军步兵或摩步部队快速部署，为轻型部队提供有机炮兵支援。',
    equipment: [
      { icon: '💥', name: '2A60 120mm多功能炮', pts: 40, desc: '发射全系列120mm弹药，可平射反坦克' },
      { icon: '🎯', name: '激光制导炮弹', pts: 28, desc: '精确打击装甲与碉堡，射程4km' },
      { icon: '🚗', name: 'BTR-80轮式底盘', pts: 20, desc: '两栖能力，公路速度80km/h，海军步兵理想支援' },
      { icon: '🔫', name: 'PKMT机枪', pts: 7, desc: '基本自卫武装' },
    ]
  },
];

// =============================================
// 筛选与渲染逻辑
// =============================================

let activeFaction  = 'all';
let activeCategory = 'all';
let activeSpec     = 'all';

function updateSpecButtons() {
  const bar = document.getElementById('spec-filter-bar');
  if (!bar) return;
  bar.querySelectorAll('.spec-btn[data-sfaction]').forEach(btn => {
    const sf = btn.dataset.sfaction;
    const visible = activeFaction === 'all' || activeFaction === sf;
    btn.style.display = visible ? '' : 'none';
  });
  // 若当前激活的spec不属于切换后的阵营，重置为all
  if (activeSpec !== 'all' && activeFaction !== 'all') {
    const specMeta = SPECS[activeSpec];
    if (specMeta && specMeta.faction !== activeFaction) {
      activeSpec = 'all';
      bar.querySelectorAll('.spec-btn').forEach(b => b.classList.remove('active'));
      bar.querySelector('.spec-btn[data-spec="all"]').classList.add('active');
    }
  }
}

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
      updateSpecButtons();
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

  document.querySelectorAll('.spec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeSpec = btn.dataset.spec;
      document.querySelectorAll('.spec-btn').forEach(b => b.classList.remove('active'));
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
  updateSpecButtons();
}

function unitMatchesSpec(u) {
  if (activeSpec === 'all') return true;
  return (u.specs || []).includes(activeSpec);
}

function renderUnits() {
  const container = document.getElementById('units-grid');
  const countEl   = document.getElementById('units-count');

  const filtered = UNITS.filter(u => {
    const factionOk  = activeFaction  === 'all' || u.faction  === activeFaction;
    const categoryOk = activeCategory === 'all' || u.category === activeCategory;
    const specOk     = unitMatchesSpec(u);
    return factionOk && categoryOk && specOk;
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

  const catsToShow = activeCategory === 'all'
    ? CATEGORIES.map(c => c.id)
    : [activeCategory];

  let html = '';
  catsToShow.forEach(catId => {
    const catMeta  = CATEGORIES.find(c => c.id === catId);
    const catUnits = filtered.filter(u => u.category === catId);
    if (!catUnits.length) return;

    const svgIcon = SVG_ICONS[catId] || '';

    // 按专精分组渲染
    const SPEC_ORDER = ['marine', 'armor', 'airborne', 'stryker', 'socom', 'motor', 'armored', 'vdv', 'naval', 'spetsnaz'];
    const specsPresent = SPEC_ORDER.filter(sid => catUnits.some(u => (u.specs || []).includes(sid)));

    let subGroupsHtml = '';
    specsPresent.forEach(sid => {
      const sm = SPECS[sid];
      const specUnits = catUnits.filter(u => (u.specs || []).includes(sid));
      if (!specUnits.length) return;
      subGroupsHtml += `
        <div class="spec-subgroup" data-spec="${sid}">
          <div class="spec-subgroup-header ${sm.faction}">
            <span class="spec-subgroup-icon">${sm.icon}</span>
            <span class="spec-subgroup-label">${sm.label}</span>
            <span class="spec-subgroup-count">${specUnits.length} 个单位</span>
          </div>
          <div class="units-grid">${specUnits.map(u => buildCard(u)).join('')}</div>
        </div>
      `;
    });

    html += `
      <div class="cat-section" data-catid="${catId}">
        <div class="cat-section-header">
          <span class="cat-section-icon">
            <span class="unit-type-icon" style="color:var(--cyan)">${svgIcon}</span>
          </span>
          <span class="cat-section-title">${catMeta.id}</span>
          <span class="cat-section-en">${catMeta.en}</span>
          <span class="cat-section-count">${catUnits.length} 个单位</span>
        </div>
        ${subGroupsHtml}
      </div>
    `;
  });

  container.innerHTML = html;

  // 装备展开
  container.querySelectorAll('.unit-equip-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const panel = toggle.nextElementSibling;
      toggle.classList.toggle('open');
      panel.classList.toggle('open');
    });
  });

}

function buildSpecBadges(u) {
  return (u.specs || []).map(sid => {
    const s = SPECS[sid];
    if (!s) return '';
    return `<span class="badge badge-spec ${s.faction}">${s.icon} ${s.label}</span>`;
  }).join('');
}

function buildCard(u) {
  const svgIcon  = SVG_ICONS[u.category] || '';
  const imgFile  = UNIT_IMAGES[u.id] || 'US_M1A2_SEPV3.png';
  const imgHTML  = `<img class="unit-img" src="${IMG_DIR}${imgFile}" alt="${u.nameEn}" loading="lazy" onerror="this.src='${IMG_DIR}US_M1A2_SEPV3.png'">`;

  const equipItems = u.equipment.map(e => {
    const iconSvg = getEquipIcon(e.name, e.icon);
    return `
    <li class="equip-item">
      <span class="equip-icon" style="color:var(--cyan);opacity:0.8">
        <span class="unit-type-icon" style="width:20px;height:20px">${iconSvg}</span>
      </span>
      <div class="equip-info">
        <div class="equip-name">
          ${e.name}
          <span class="equip-pts">${e.pts} 点</span>
        </div>
        <div class="equip-desc">${e.desc}</div>
      </div>
    </li>`;
  }).join('');

  const unitSpecsAttr = (u.specs || ['general']).join(' ');

  return `
    <div class="unit-card ${u.faction}" data-unitspecs="${unitSpecsAttr}">
      <div class="unit-card-header">
        <div class="unit-img-wrap ${u.faction}">
          ${imgHTML}
        </div>
        <div class="unit-title-area">
          <div class="unit-name">${u.name}</div>
          <div style="font-size:11px;font-family:var(--font-mono);color:var(--text-muted);font-weight:400;margin-bottom:6px">${u.nameEn}</div>
          <div class="unit-badges">
            <span class="badge badge-category" style="display:inline-flex;align-items:center;gap:5px">
              <span class="unit-type-icon" style="width:14px;height:14px;color:var(--cyan)">${svgIcon}</span>
              ${u.category}
            </span>
            ${factionBadgeHTML(u.faction)}
          </div>
          <div class="unit-spec-badges" style="margin-top:5px">${buildSpecBadges(u)}</div>
        </div>
        <div class="unit-cost-wrap">
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
