export interface FoodItem {
  name: string
  emoji: string
  category: string
  comment: string
}

export const FOOD_CATEGORIES: { key: string; label: string; emoji: string }[] = [
  { key: 'noodle', label: '面食', emoji: '🍜' },
  { key: 'rice', label: '米饭', emoji: '🍚' },
  { key: 'spicy', label: '麻辣', emoji: '🌶️' },
  { key: 'snack', label: '小吃', emoji: '🥟' },
  { key: 'western', label: '西式', emoji: '🍕' },
  { key: 'japanese', label: '日料', emoji: '🍣' },
  { key: 'korean', label: '韩料', emoji: '🇰🇷' },
  { key: 'light', label: '轻食', emoji: '🥗' },
  { key: 'bbq', label: '烧烤', emoji: '🍖' },
  { key: 'home', label: '家常', emoji: '🥘' },
  { key: 'seafood', label: '海鲜', emoji: '🦀' },
  { key: 'soup', label: '汤粥', emoji: '🥣' },
  { key: 'dessert', label: '甜点', emoji: '🍰' },
  { key: 'takeout', label: '外卖', emoji: '🥡' },
  { key: 'southeast', label: '东南亚', emoji: '🌏' },
  { key: 'midnight', label: '夜宵', emoji: '🌙' },
]

export const ALL_FOODS: FoodItem[] = [
  // ===== 🍜 面食 (13) =====
  { name: '牛肉面', emoji: '🍜', category: 'noodle', comment: '红烧牛肉软烂入味，筋道的面条吸满汤汁，泡芙觉得今天需要这一碗来充电！' },
  { name: '炸酱面', emoji: '🥢', category: 'noodle', comment: '浓郁的炸酱裹满每一根面条，黄瓜丝一拌，老北京的幸福就是这么简单~' },
  { name: '螺蛳粉', emoji: '🐚', category: 'noodle', comment: '臭是真的臭，香也是真的香！酸笋腐竹花生米，吃完记得开窗通风…' },
  { name: '葱油拌面', emoji: '🧅', category: 'noodle', comment: '热油一浇，葱香四溢！最简单的食材往往最让人满足，泡芙拍爪子推荐！' },
  { name: '担担面', emoji: '🌰', category: 'noodle', comment: '芝麻酱和肉末的完美结合，麻辣鲜香，一口下去魂穿成都街头~' },
  { name: '阳春面', emoji: '🍲', category: 'noodle', comment: '清汤寡水但鲜美无比，有时候简单就是最好的治愈，暖胃又暖心。' },
  { name: 'biangbiang面', emoji: '🫓', category: 'noodle', comment: '裤带一样宽的面条，油泼辣子一浇，滋滋作响的声音就让人流口水！' },
  { name: '热干面', emoji: '🍂', category: 'noodle', comment: '芝麻酱裹满碱水面条，配上一碗蛋酒，武汉人的早晨从这一碗开始！' },
  { name: '油泼面', emoji: '🌶️', category: 'noodle', comment: '热油浇在辣椒面和蒜末上滋啦一声，陕西人的豪爽全在这一碗里！' },
  { name: '刀削面', emoji: '🔪', category: 'noodle', comment: '师傅刀刀削出柳叶状的面片，筋道有嚼劲，山西面食之王名不虚传~' },
  { name: '臊子面', emoji: '🥩', category: 'noodle', comment: '肉臊子酸辣鲜香，面条细薄筋道，岐山臊子面一碗下肚浑身都暖和！' },
  { name: '冷面', emoji: '🧊', category: 'noodle', comment: '酸甜冰凉的汤底配上筋道荞麦面，夏天来一碗直接从头顶凉到脚底！' },
  { name: '车仔面', emoji: '🍝', category: 'noodle', comment: '粗面配上咖喱鱼蛋和牛腩汁，香港街头的灵魂comfort food~' },

  // ===== 🍚 米饭 (13) =====
  { name: '煲仔饭', emoji: '🍲', category: 'rice', comment: '锅底焦香的锅巴是灵魂！腊味油脂渗透米饭，每一粒都闪着诱人的光泽~' },
  { name: '蛋炒饭', emoji: '🍳', category: 'rice', comment: '粒粒分明的黄金炒饭，蛋白质和碳水完美组合，简单又满足的一餐！' },
  { name: '卤肉饭', emoji: '🥩', category: 'rice', comment: '卤到软烂的五花肉浇在米饭上，肉汁渗透每一粒米，台湾街头的味道~' },
  { name: '韩式拌饭', emoji: '🇰🇷', category: 'rice', comment: '五颜六色的蔬菜配溏心蛋，拌上辣酱，一口吃到所有营养！' },
  { name: '咖喱饭', emoji: '🍛', category: 'rice', comment: '浓稠的咖喱裹着鸡肉和土豆，米饭蘸咖喱汁的快乐，谁吃谁知道~' },
  { name: '海南鸡饭', emoji: '🐔', category: 'rice', comment: '皮滑肉嫩的鸡肉配姜葱蘸料，鸡油饭香到不用配菜都能吃三碗！' },
  { name: '排骨饭', emoji: '🦴', category: 'rice', comment: '排骨软烂脱骨，米饭吸饱了肉汤汁的精华，一口下去满满的幸福感。' },
  { name: '扬州炒饭', emoji: '🍤', category: 'rice', comment: '虾仁火腿青豆鸡蛋，配料丰富的豪华炒饭，淮扬菜的经典之作！' },
  { name: '腊味饭', emoji: '🥓', category: 'rice', comment: '腊肠腊肉在米饭上蒸得油亮，掀开锅盖的瞬间香味能把邻居馋哭~' },
  { name: '滑蛋牛肉饭', emoji: '🥚', category: 'rice', comment: '嫩滑的炒蛋盖在牛肉和米饭上，蛋液微微流动的状态最销魂！' },
  { name: '叉烧饭', emoji: '🍖', category: 'rice', comment: '蜜汁叉烧红亮诱人，切成薄片铺在米饭上淋上豉油，港式经典~' },
  { name: '手抓饭', emoji: '🫴', category: 'rice', comment: '胡萝卜和黄萝卜配大块羊肉，米饭吸饱了肉汁，新疆人的待客大菜！' },
  { name: '三宝饭', emoji: '🍱', category: 'rice', comment: '叉烧油鸡烧鸭三拼盖在米饭上，淋一勺卤汁，港式烧腊的巅峰！' },

  // ===== 🌶️ 麻辣 (13) =====
  { name: '麻辣烫', emoji: '🫕', category: 'spicy', comment: '自选食材随心搭，红油汤底里涮一涮，冬天暖身夏天过瘾，全年通用！' },
  { name: '火锅', emoji: '🍲', category: 'spicy', comment: '没有什么是一顿火锅解决不了的！毛肚七上八下，鸭肠涮三秒，开动！' },
  { name: '麻辣香锅', emoji: '🥘', category: 'spicy', comment: '干锅爆炒的麻辣味太够劲了！藕片土豆午餐肉，每样都来一点~' },
  { name: '酸菜鱼', emoji: '🐟', category: 'spicy', comment: '酸爽开胃的酸菜配上嫩滑鱼片，汤都要喝干净，米饭杀手排名前三！' },
  { name: '水煮牛肉', emoji: '🌊', category: 'spicy', comment: '看似被辣椒淹没实则牛肉鲜嫩无比，夹一块在红油里打个滚，太香了！' },
  { name: '毛血旺', emoji: '🩸', category: 'spicy', comment: '鸭血毛肚午餐肉，满满一盆麻辣鲜香，重口味爱好者的终极幸福！' },
  { name: '剁椒鱼头', emoji: '🐠', category: 'spicy', comment: '铺满剁椒的大鱼头蒸得鲜嫩入味，最后下碗面条拌汤，绝了！' },
  { name: '辣子鸡', emoji: '🌶️', category: 'spicy', comment: '辣椒堆里找鸡丁的乐趣！外酥里嫩麻辣鲜香，泡芙先帮你擦下汗…' },
  { name: '冒菜', emoji: '🥘', category: 'spicy', comment: '一个人的火锅！各种食材在红油里烫熟，配上蒜泥香油碟，安逸得很~' },
  { name: '钵钵鸡', emoji: '🍗', category: 'spicy', comment: '冷锅串串泡在芝麻红油里，鸡肉脆嫩藕片爽口，乐山人的神仙小吃！' },
  { name: '沸腾鱼', emoji: '🐟', category: 'spicy', comment: '滚烫的热油浇在鱼片上滋滋沸腾，鱼肉嫩滑到筷子都夹不住！' },
  { name: '口水鸡', emoji: '🐔', category: 'spicy', comment: '红油芝麻酱浇在嫩鸡上，光看着就让人流口水，名副其实的口水鸡！' },
  { name: '香辣蟹', emoji: '🦀', category: 'spicy', comment: '螃蟹在辣椒花椒里爆炒，蟹肉鲜甜辣味入魂，吃完手指都要嗦干净~' },

  // ===== 🥟 小吃 (13) =====
  { name: '饺子', emoji: '🥟', category: 'snack', comment: '好吃不过饺子！韭菜鸡蛋还是猪肉大葱？蘸醋还是酱油？泡芙选醋！' },
  { name: '煎饼果子', emoji: '🫓', category: 'snack', comment: '绿豆面摊开打个鸡蛋撒葱花，夹上薄脆，天津人的精致早餐~' },
  { name: '小笼包', emoji: '🧆', category: 'snack', comment: '轻轻提慢慢移，先开窗后喝汤！小心烫嘴但值得每一个步骤的仪式感~' },
  { name: '生煎', emoji: '🫠', category: 'snack', comment: '底部煎得金黄酥脆，咬开爆汁！上海生煎的魅力就在那一口汤汁里~' },
  { name: '肉夹馍', emoji: '🥙', category: 'snack', comment: '腊汁肉剁得碎碎的夹在白吉馍里，肥瘦相间肉香四溢，西安的灵魂小吃！' },
  { name: '肠粉', emoji: '🫔', category: 'snack', comment: '滑溜溜的肠粉淋上甜酱油，加个鸡蛋加个肉馅，广东人的早餐标配~' },
  { name: '锅贴', emoji: '🥟', category: 'snack', comment: '煎得金黄的长条饺子，底部焦脆内馅多汁，蘸点醋一口一个停不下来！' },
  { name: '韭菜盒子', emoji: '🟢', category: 'snack', comment: '表皮煎得酥脆，韭菜鸡蛋粉条的内馅香喷喷，趁热吃最香！' },
  { name: '烧麦', emoji: '🫔', category: 'snack', comment: '薄皮大馅顶部开花，糯米和肉丁的组合，一口一个糯香满嘴~' },
  { name: '灌汤包', emoji: '🥟', category: 'snack', comment: '皮薄如纸汤汁丰盈，先咬个小口吸汤再吃包子，仪式感拉满！' },
  { name: '春卷', emoji: '🌯', category: 'snack', comment: '外皮炸得金黄酥脆，豆芽肉丝韭菜馅料满满，过年必吃的美味~' },
  { name: '驴打滚', emoji: '🫘', category: 'snack', comment: '糯米团子滚上黄豆粉，软糯香甜，老北京的传统甜点，名字可爱味道更可爱~' },
  { name: '煎堆', emoji: '🏀', category: 'snack', comment: '炸得圆圆鼓鼓的芝麻团，外脆内糯，广东人过年必备的吉利小吃！' },

  // ===== 🍕 西式 (13) =====
  { name: '披萨', emoji: '🍕', category: 'western', comment: '拉丝就是正义！芝士就是力量！薄底厚底都是好底，今天放纵一下~' },
  { name: '汉堡', emoji: '🍔', category: 'western', comment: '牛肉饼多汁生菜脆爽，一口咬下所有层次，配薯条和可乐就是完美套餐！' },
  { name: '意面', emoji: '🍝', category: 'western', comment: '肉酱番茄还是奶油培根？螺旋面蝴蝶面通心粉，每种形状都有不同快乐~' },
  { name: '薯条', emoji: '🍟', category: 'western', comment: '外酥里软的金黄薯条蘸番茄酱，最简单的快乐往往最持久！' },
  { name: '塔可', emoji: '🌮', category: 'western', comment: '玉米饼夹着烤肉菠萝莎莎酱，一口下去满满的墨西哥风情，酸辣清爽！' },
  { name: '焗饭', emoji: '🧀', category: 'western', comment: '芝士盖在炒饭上烤到金黄冒泡，挖一勺拉丝拉到天花板，太满足了！' },
  { name: '牛排', emoji: '🥩', category: 'western', comment: '五分熟刚刚好，切开粉嫩多汁，黑胡椒海盐简单调味就能吃到牛肉原香~' },
  { name: '三明治', emoji: '🥪', category: 'western', comment: '吐司夹万物！鸡蛋火腿生菜芝士叠起来，一口咬下所有层次，野餐必备~' },
  { name: '热狗', emoji: '🌭', category: 'western', comment: '面包夹着热腾腾的香肠，挤上番茄酱和芥末，看球赛的最佳搭档！' },
  { name: '炸鸡', emoji: '🍗', category: 'western', comment: '金黄酥脆的外皮锁住鲜嫩多汁的鸡肉，咔嚓一口下去幸福感爆棚！' },
  { name: '凯撒沙拉', emoji: '🥬', category: 'western', comment: '罗马生菜配帕玛森芝士碎和烤面包丁，凯撒酱一拌，沙拉也能很满足~' },
  { name: '罗宋汤', emoji: '🥫', category: 'western', comment: '浓郁番茄汤底炖牛肉和蔬菜，配一勺酸奶油，东欧的暖胃神器！' },
  { name: '法式焗蜗牛', emoji: '🐌', category: 'western', comment: '蒜香黄油焗蜗牛肉嫩味鲜，法餐经典前菜，别被外表吓到真的很好吃~' },

  // ===== 🍣 日料 (13) =====
  { name: '寿司', emoji: '🍣', category: 'japanese', comment: '三文鱼在召唤你…醋饭配上新鲜鱼生，蘸一点芥末酱油就是天堂！' },
  { name: '拉面', emoji: '🍥', category: 'japanese', comment: '浓郁的豚骨汤底配上溏心蛋和叉烧，面条筋道汤头醇厚，日式拉面赛高！' },
  { name: '鳗鱼饭', emoji: '😋', category: 'japanese', comment: '蒲烧鳗鱼油亮焦香铺在米饭上，甜咸酱汁渗进米里，每一口都是奢华~' },
  { name: '天妇罗', emoji: '🍤', category: 'japanese', comment: '薄脆的面衣裹着大虾和蔬菜，蘸上天汁清爽不腻，炸物的极致优雅！' },
  { name: '牛丼', emoji: '🍱', category: 'japanese', comment: '肥牛片和洋葱在甜咸酱汁里煮得入味，盖在米饭上配个生鸡蛋，绝了！' },
  { name: '章鱼烧', emoji: '🐙', category: 'japanese', comment: '外皮微脆内里柔软，章鱼块弹牙有嚼劲，木鱼花在上面跳舞，太可爱了~' },
  { name: '乌冬面', emoji: '🍜', category: 'japanese', comment: '粗粗的面条弹牙有嚼劲，清汤或者咖喱都超好味，吸溜吸溜一大碗！' },
  { name: '大阪烧', emoji: '🫓', category: 'japanese', comment: '日式蔬菜煎饼淋上美乃滋和大阪烧酱，木鱼花在热气中翩翩起舞~' },
  { name: '荞麦面', emoji: '🍜', category: 'japanese', comment: '灰褐色的荞麦面条蘸上冰凉的酱汁，清爽解暑，夏天吸溜一大口超过瘾！' },
  { name: '亲子丼', emoji: '🐣', category: 'japanese', comment: '鸡肉和鸡蛋在甜咸酱汁里煮成滑嫩的盖饭，妈妈和孩子都在碗里了~' },
  { name: '炸猪排', emoji: '🐷', category: 'japanese', comment: '厚切猪排裹上面包糠炸得金黄酥脆，咬开咔嚓一声，配卷心菜丝解腻一绝！' },
  { name: '味噌汤', emoji: '🥣', category: 'japanese', comment: '豆腐海带在味噌汤里轻轻漂浮，日料套餐的灵魂配角，暖心又暖胃~' },
  { name: '咖喱乌冬', emoji: '🍛', category: 'japanese', comment: '浓稠的咖喱汤裹着粗乌冬面，吸溜吸溜停不下来，冬天吃一碗暖到心窝~' },

  // ===== 🇰🇷 韩料 (13) =====
  { name: '石锅拌饭', emoji: '🫕', category: 'korean', comment: '滚烫的石锅把底下米饭烤出锅巴，拌上辣酱和各种蔬菜，滋滋作响太诱人了！' },
  { name: '韩式炸鸡', emoji: '🍗', category: 'korean', comment: '外皮酥脆裹满甜辣酱，配上一杯冰啤酒，今天做个韩剧女主！' },
  { name: '部队锅', emoji: '🪖', category: 'korean', comment: '午餐肉香肠拉面年糕泡菜一锅炖，最后下拉面吸满汤汁，韩式暖锅yyds！' },
  { name: '炒年糕', emoji: '🍡', category: 'korean', comment: '软糯Q弹的年糕裹满甜辣酱，配鱼饼和煮鸡蛋，街头小吃之王！' },
  { name: '大酱汤', emoji: '🥣', category: 'korean', comment: '发酵大酱的醇厚配上豆腐西葫芦，热乎乎的喝一碗，配米饭就是完美一餐~' },
  { name: '冷面', emoji: '🧊', category: 'korean', comment: '冰凉的牛肉高汤配上筋道荞麦面，夏天来一碗直接降温五度，清爽解暑！' },
  { name: '紫菜包饭', emoji: '🍙', category: 'korean', comment: '芝麻油香扑鼻，黄萝卜腌萝卜菠菜鸡蛋卷在一起，一口一个停不下来~' },
  { name: '泡菜饼', emoji: '🫓', category: 'korean', comment: '酸辣泡菜和面糊煎得外脆内软，下雨天配马格利酒，韩国人的雨天标配！' },
  { name: '参鸡汤', emoji: '🐔', category: 'korean', comment: '整只嫩鸡肚子里塞满糯米红枣和人参，汤白肉嫩，三伏天进补的最佳选择！' },
  { name: '辣炒猪肉', emoji: '🐷', category: 'korean', comment: '猪肉片在辣酱里大火翻炒，配生菜包着吃，韩国人的家常下饭菜~' },
  { name: '泡菜炒饭', emoji: '🍳', category: 'korean', comment: '酸辣泡菜和米饭在锅里翻炒，盖个溏心煎蛋撒上紫菜碎，简单又上头！' },
  { name: '海鲜葱饼', emoji: '🫓', category: 'korean', comment: '满满的葱段和海鲜在面糊里煎得金黄，蘸酱油醋碟吃，韩式煎饼之王！' },
  { name: '韩式猪蹄', emoji: '🐷', category: 'korean', comment: '卤得软糯的猪蹄切成薄片，蘸虾酱包在生菜里吃，满满的胶原蛋白~' },

  // ===== 🥗 轻食 (13) =====
  { name: '沙拉', emoji: '🥗', category: 'light', comment: '新鲜蔬菜配上油醋汁，清爽可口无负担，吃完感觉自己轻盈得像泡泡芙~' },
  { name: '酸奶碗', emoji: '🫙', category: 'light', comment: '浓稠酸奶铺上格兰诺拉和莓果，颜值高味道好，早餐来一碗元气满满！' },
  { name: '越南春卷', emoji: '🌯', category: 'light', comment: '透明的米纸包着鲜虾米粉生菜薄荷，蘸鱼露吃清爽解腻，夏天首选！' },
  { name: '波奇饭', emoji: '🥑', category: 'light', comment: '夏威夷来的颜值担当！三文鱼牛油果铺在米饭上淋酱油，健康又好吃~' },
  { name: '藜麦碗', emoji: '🌾', category: 'light', comment: '高蛋白藜麦配上烤蔬菜和鹰嘴豆，超级食物的组合，吃完精力+10！' },
  { name: '鹰嘴豆泥', emoji: '🫘', category: 'light', comment: '丝滑的鹰嘴豆泥淋上橄榄油，蘸皮塔饼吃，地中海风情满满~' },
  { name: '考伯沙拉', emoji: '🥑', category: 'light', comment: '鸡蛋培根牛油果蓝纹芝士切丁排排坐，一道彩虹沙拉，好看又好吃！' },
  { name: '水果碗', emoji: '🍓', category: 'light', comment: '各种新鲜水果切块堆成小山，淋上蜂蜜和椰奶，吃一碗就是度假的感觉~' },
  { name: '牛油果吐司', emoji: '🥑', category: 'light', comment: '烤脆的欧包涂上捣碎的牛油果撒上海盐和辣椒碎，简约但不简单的brunch~' },
  { name: '奇亚籽布丁', emoji: '🍮', category: 'light', comment: '奇亚籽在椰奶里膨胀成布丁，铺上水果，高纤维高蛋白的完美早餐！' },
  { name: '地中海碗', emoji: '🫒', category: 'light', comment: '鹰嘴豆藜麦黄瓜番茄橄榄菲达芝士，地中海的味道全在这一碗里~' },
  { name: '羽衣甘蓝沙拉', emoji: '🥬', category: 'light', comment: '羽衣甘蓝按摩后变软，配上坚果干果和柠檬汁，嚼劲十足营养满分！' },
  { name: '甜菜根沙拉', emoji: '🫒', category: 'light', comment: '烤甜菜根配山羊芝士和核桃，甜咸交织口感丰富，吃一次就爱上~' },

  // ===== 🍖 烧烤 (13) =====
  { name: '烤肉', emoji: '🔥', category: 'bbq', comment: '滋滋冒油的五花肉在烤盘上跳舞，包在生菜里加蒜片青椒，一口闷！' },
  { name: '烤鱼', emoji: '🐠', category: 'bbq', comment: '整条鱼烤得外皮焦香鱼肉细嫩，配菜吸满汤汁，越烤越入味~' },
  { name: '串串', emoji: '🍢', category: 'bbq', comment: '竹签串起各种食材在红油锅里翻滚，数签子结账的仪式感，成都人的快乐！' },
  { name: '铁板烧', emoji: '🥘', category: 'bbq', comment: '厨师当面表演铁板火焰秀，牛肉粒在铁板上滋滋作响，好看又好吃！' },
  { name: '烤鸡翅', emoji: '🍗', category: 'bbq', comment: '外皮焦脆刷上蜂蜜，里面的肉嫩到流汁，泡芙觉得这个最稳，永不出错！' },
  { name: '烤生蚝', emoji: '🦪', category: 'bbq', comment: '蒜蓉粉丝铺在肥美的生蚝上，碳火一烤滋滋冒泡，男人的加油站女人的美容院！' },
  { name: '烤茄子', emoji: '🍆', category: 'bbq', comment: '整条茄子烤软划开铺满蒜蓉辣椒，软糯入味，素菜烤出肉的味道！' },
  { name: '烤鱿鱼', emoji: '🦑', category: 'bbq', comment: '整条鱿鱼刷上酱料在炭火上翻转，Q弹有嚼劲，夜市里的当家花旦！' },
  { name: '烤玉米', emoji: '🌽', category: 'bbq', comment: '烤到微焦的玉米刷上黄油撒上辣椒面，香甜和辣味碰撞，夜市必点！' },
  { name: '烤虾', emoji: '🦐', category: 'bbq', comment: '大虾串在竹签上烤得红亮，虾壳脆虾肉弹，撒点椒盐就很完美~' },
  { name: '烤豆腐', emoji: '🧈', category: 'bbq', comment: '豆腐烤到外皮金黄微焦，刷上酱料撒上孜然和葱花，素菜也能很惊艳！' },
  { name: '烤青椒', emoji: '🫑', category: 'bbq', comment: '青椒烤到表面起泡变软，撒上盐和孜然，简单的美味最是回味~' },
  { name: '烤土豆', emoji: '🥔', category: 'bbq', comment: '整个土豆烤得外焦里糯，切开抹上黄油，碳水的终极幸福形态！' },

  // ===== 🥘 家常 (16) =====
  { name: '西红柿炒蛋', emoji: '🍅', category: 'home', comment: '国民第一家常菜！酸甜的西红柿配嫩滑炒蛋，拌饭能吃三大碗，永远的comfort food~' },
  { name: '红烧肉', emoji: '🥘', category: 'home', comment: '五花肉炖到入口即化，肥而不腻红亮诱人，每一块都在闪闪发光！' },
  { name: '麻婆豆腐', emoji: '🫛', category: 'home', comment: '麻辣鲜香嫩烫酥，豆腐在红油里颤颤巍巍，米饭杀手排行榜第一名！' },
  { name: '糖醋排骨', emoji: '🦴', category: 'home', comment: '酸甜口的排骨外酥里嫩，糖醋汁挂在排骨上晶莹剔透，泡芙拍爪子推荐！' },
  { name: '鱼香肉丝', emoji: '🥕', category: 'home', comment: '没有鱼的鱼香肉丝！木耳胡萝卜肉丝在酸甜辣汁里翻炒，米饭的绝配~' },
  { name: '宫保鸡丁', emoji: '🥜', category: 'home', comment: '鸡肉嫩滑花生酥脆，荔枝味的酸甜微辣酱汁，花生和鸡丁的绝妙组合！' },
  { name: '回锅肉', emoji: '🐷', category: 'home', comment: '二刀肉煮过再回锅炒出灯盏窝，配蒜苗和豆瓣酱，川菜之魂名不虚传！' },
  { name: '干煸豆角', emoji: '🫘', category: 'home', comment: '豆角煸到表面微焦带虎皮纹，加肉末辣椒炒香，素菜吃出肉的味道来~' },
  { name: '醋溜白菜', emoji: '🥬', category: 'home', comment: '白菜帮子在醋和辣椒里翻炒，酸辣脆爽，最便宜却最下饭的神菜！' },
  { name: '红烧茄子', emoji: '🍆', category: 'home', comment: '茄子吸饱了酱油糖醋汁变得软糯入味，配米饭就是一顿完美的素食餐~' },
  { name: '青椒肉丝', emoji: '🫑', category: 'home', comment: '肉丝嫩滑青椒脆爽，最朴实的家常菜，却是很多人心中妈妈的味道~' },
  { name: '地三鲜', emoji: '🥔', category: 'home', comment: '土豆茄子青椒三兄弟在油锅里走一遭，东北菜的扛把子，素菜也豪迈！' },
  { name: '蒜蓉西兰花', emoji: '🥦', category: 'home', comment: '翠绿的西兰花焯水后爆香蒜蓉，简单清爽，餐桌上的一抹绿色~' },
  { name: '可乐鸡翅', emoji: '🍗', category: 'home', comment: '可乐和酱油把鸡翅炖得酱红油亮甜咸适中，新手也不会翻车的懒人菜！' },
  { name: '土豆炖牛肉', emoji: '🥩', category: 'home', comment: '牛肉炖到酥烂土豆吸满汤汁，一锅炖出来满屋子都是幸福的味道~' },
  { name: '尖椒炒蛋', emoji: '🌶️', category: 'home', comment: '尖椒微辣配上嫩滑的炒蛋，简单快手却超下饭，五分钟搞定的美味！' },

  // ===== 🦀 海鲜 (13) =====
  { name: '清蒸鲈鱼', emoji: '🐟', category: 'seafood', comment: '最简单的做法最考验食材，蒸得恰到好处的鲈鱼鲜嫩无比，淋上蒸鱼豉油就是王道！' },
  { name: '蒜蓉大虾', emoji: '🦐', category: 'seafood', comment: '铺满蒜蓉的大虾蒸得鲜红，虾肉弹牙蒜香四溢，虾头里的虾黄才是精华！' },
  { name: '辣炒蛤蜊', emoji: '🐚', category: 'seafood', comment: '蛤蜊在辣椒和蒜末里爆炒，开口的瞬间就是最好吃的时候，配啤酒一绝！' },
  { name: '葱姜螃蟹', emoji: '🦀', category: 'seafood', comment: '大螃蟹和葱姜一起爆炒，蟹肉鲜甜蟹黄浓郁，吃完手指都要舔干净~' },
  { name: '椒盐皮皮虾', emoji: '🦞', category: 'seafood', comment: '皮皮虾裹上薄薄的面衣炸到酥脆，撒上椒盐辣椒，香到连壳都想吃掉！' },
  { name: '蒜蓉粉丝扇贝', emoji: '🐚', category: 'seafood', comment: '扇贝上铺满蒜蓉粉丝，蒸好淋热油，一口一个鲜到眉毛掉下来~' },
  { name: '捞汁小海鲜', emoji: '🦑', category: 'seafood', comment: '各种小海鲜泡在酸辣捞汁里，冰镇后吃爽口开胃，夏天嗦一口太快乐了！' },
  { name: '清蒸大闸蟹', emoji: '🦀', category: 'seafood', comment: '秋天的蟹黄饱满到流油，蘸姜醋吃每一口都是金秋的味道，泡芙想想都流口水~' },
  { name: '白灼虾', emoji: '🦐', category: 'seafood', comment: '活虾白灼最能吃到虾本身的鲜甜，蘸姜葱酱油，简单到极致的鲜美！' },
  { name: '葱油蛏子', emoji: '🐚', category: 'seafood', comment: '蛏子在葱油里快速翻炒，肥美鲜嫩，一口咬下去汁水在嘴里爆开~' },
  { name: '椒盐虾', emoji: '🦐', category: 'seafood', comment: '大虾炸得酥脆裹上椒盐蒜末辣椒，连壳吃都香，下酒神器！' },
  { name: '蒜蓉生蚝', emoji: '🦪', category: 'seafood', comment: '肥美的生蚝铺上金银蒜蒸熟，一口吸进去满满都是大海的鲜味~' },
  { name: '盐焗花螺', emoji: '🐚', category: 'seafood', comment: '花螺埋在粗盐里焗熟，螺肉弹牙鲜甜，用牙签挑出来蘸酱油醋超满足！' },

  // ===== 🥣 汤粥 (13) =====
  { name: '皮蛋瘦肉粥', emoji: '🥚', category: 'soup', comment: '熬到米粒开花，皮蛋和瘦肉丝在粥里若隐若现，撒上葱花暖心暖胃~' },
  { name: '南瓜小米粥', emoji: '🎃', category: 'soup', comment: '南瓜的清甜配上小米的醇厚，金灿灿的一碗，喝完感觉整个人都暖洋洋的~' },
  { name: '番茄牛腩汤', emoji: '🍅', category: 'soup', comment: '牛腩炖得软烂，番茄的酸甜完全融入汤里，配米饭蘸馒头都好吃！' },
  { name: '酸辣汤', emoji: '🥣', category: 'soup', comment: '胡椒的辣和醋的酸在口中交织，豆腐丝木耳丝蛋花丝，冬天喝一碗浑身发热！' },
  { name: '排骨莲藕汤', emoji: '🦴', category: 'soup', comment: '粉糯的莲藕和排骨一起慢炖，汤色奶白，湖北人的乡愁就藏在这一碗里~' },
  { name: '菌菇汤', emoji: '🍄', category: 'soup', comment: '各种菌菇炖出的鲜美高汤，不放味精都鲜掉眉毛，素食者的福音！' },
  { name: '馄饨', emoji: '🥟', category: 'soup', comment: '薄皮大馅的小馄饨漂在紫菜虾皮汤里，一口一个滑溜溜，早餐来一碗元气满满~' },
  { name: '疙瘩汤', emoji: '🍲', category: 'soup', comment: '小小的面疙瘩在番茄蛋花汤里翻滚，朴实无华但喝起来就是家里的味道~' },
  { name: '紫菜蛋花汤', emoji: '🥚', category: 'soup', comment: '紫菜和蛋花在清汤里飘散，最简单的中式例汤，但配什么菜都完美~' },
  { name: '冬瓜排骨汤', emoji: '🍖', category: 'soup', comment: '冬瓜清甜排骨鲜香，夏天喝清热解暑，冬天喝暖身滋润，一年四季都适合~' },
  { name: '银耳莲子羹', emoji: '🪷', category: 'soup', comment: '银耳炖到出胶质，莲子百合红枣一起熬，甜润养颜，女生的美容圣品~' },
  { name: '绿豆汤', emoji: '🫘', category: 'soup', comment: '冰糖绿豆熬到开花，冰镇后喝一碗，夏天的消暑神器，从小到大都爱喝~' },
  { name: '酸梅汤', emoji: '🍒', category: 'soup', comment: '乌梅山楂桂花冰糖熬制，冰镇后酸甜解暑，吃火锅配一杯简直神仙搭配！' },

  // ===== 🍰 甜点 (13) =====
  { name: '蛋糕', emoji: '🍰', category: 'dessert', comment: '松软的蛋糕胚配上绵密的奶油，一口下去快乐值直接拉满！不开心就吃蛋糕！' },
  { name: '冰淇淋', emoji: '🍦', category: 'dessert', comment: '冰冰凉凉甜甜的，夏天抱着盒子挖着吃的快乐，泡芙觉得抹茶味最棒！' },
  { name: '奶茶', emoji: '🧋', category: 'dessert', comment: '珍珠Q弹奶茶香浓，今天也要当个奶茶女孩！少糖去冰是最后的倔强~' },
  { name: '布丁', emoji: '🍮', category: 'dessert', comment: '轻轻一拍就duang~duang~晃动，入口即化的焦糖布丁，幸福感爆棚！' },
  { name: '华夫饼', emoji: '🧇', category: 'dessert', comment: '外酥内软的格子饼淋上枫糖浆和奶油，配上新鲜水果，下午茶的王者！' },
  { name: '双皮奶', emoji: '🥛', category: 'dessert', comment: '两层奶皮滑嫩香甜，顺德甜品之光！红豆双皮奶是经典中的经典~' },
  { name: '提拉米苏', emoji: '☕', category: 'dessert', comment: '咖啡和可可的微苦配上马斯卡彭的细腻甜美，意大利人说它能让人开心，泡芙同意！' },
  { name: '杨枝甘露', emoji: '🥭', category: 'dessert', comment: '芒果西柚椰奶西米的完美组合，酸甜清爽，港式甜品的巅峰之作！' },
  { name: '马卡龙', emoji: '🍬', category: 'dessert', comment: '色彩缤纷的杏仁小圆饼，外壳酥脆内里柔软，法式甜点的优雅代表~' },
  { name: '舒芙蕾', emoji: '☁️', category: 'dessert', comment: '蓬松轻盈到像在吃一朵云，趁热吃的黄金三分钟，松软到心都化了~' },
  { name: '红豆沙', emoji: '🫘', category: 'dessert', comment: '陈皮熬煮的红豆沙香甜绵密，热乎乎的一碗，老广的甜蜜记忆~' },
  { name: '芋圆', emoji: '🟣', category: 'dessert', comment: 'Q弹紫薯芋圆配上红豆仙草和椰奶，一碗台式甜品就是最好的下午茶~' },
  { name: '班戟', emoji: '🥭', category: 'dessert', comment: '薄薄的饼皮包着奶油和芒果，港式茶餐厅的经典甜品，皮薄馅多超满足~' },

  // ===== 🥡 外卖 (13) =====
  { name: '黄焖鸡', emoji: '🐔', category: 'takeout', comment: '鸡肉焖得软烂入味，汤汁浓郁配米饭，外卖界的销量冠军不是吹的！' },
  { name: '麻辣拌', emoji: '🌪️', category: 'takeout', comment: '芝麻酱和辣椒油拌一切，比麻辣烫更浓郁，抚顺人的伟大发明！' },
  { name: '炒米粉', emoji: '🍝', category: 'takeout', comment: '细米粉在锅里大火翻炒，加鸡蛋豆芽青菜，路边摊的灵魂美食~' },
  { name: '盖浇饭', emoji: '🍛', category: 'takeout', comment: '现炒的菜浇在米饭上，菜汁渗进米饭的瞬间就是魔法，简单粗暴的好吃！' },
  { name: '米线', emoji: '🍲', category: 'takeout', comment: '细滑的米线在鸡汤里烫熟，配上各种码子，云南人的日常就是一碗米线~' },
  { name: '酸辣粉', emoji: '🌶️', category: 'takeout', comment: '酸辣鲜香的薯粉配上花生碎和榨菜，吸溜一口酸辣开胃，停不下来！' },
  { name: '沙县小吃', emoji: '🥟', category: 'takeout', comment: '扁肉拌面炖罐，中国人的深夜食堂，便宜又好吃永远的神！' },
  { name: '木桶饭', emoji: '🪣', category: 'takeout', comment: '木桶蒸出的米饭带着淡淡木香，配一荤一素就是打工人最实在的一餐~' },
  { name: '凉皮', emoji: '🍜', category: 'takeout', comment: '爽滑的凉皮配上黄瓜丝面筋和辣油醋汁，夏天来一碗爽到飞起！' },
  { name: '卤味饭', emoji: '🍖', category: 'takeout', comment: '卤得入味的猪脚鸡腿豆腐干配米饭，卤汁浇上去的一刻灵魂升华~' },
  { name: '炸鸡饭', emoji: '🍗', category: 'takeout', comment: '酥脆炸鸡排盖在米饭上淋上照烧酱，简单粗暴的快乐就是这种！' },
  { name: '肉沫茄子饭', emoji: '🍆', category: 'takeout', comment: '软糯茄子配咸香肉沫，和米饭拌在一起吃，打工人午餐的满分选择~' },
  { name: '叉鸭饭', emoji: '🦆', category: 'takeout', comment: '油亮叉烧配烧鸭，双拼盖饭淋上卤汁，港式烧腊外卖之王！' },

  // ===== 🌏 东南亚 (13) =====
  { name: '冬阴功', emoji: '🦐', category: 'southeast', comment: '酸辣鲜香的大虾汤，香茅和柠檬叶的香气直冲天灵盖，一口秒穿泰国！' },
  { name: '越南河粉', emoji: '🍜', category: 'southeast', comment: '清澈鲜美的牛肉汤配上滑嫩河粉，挤点柠檬加把薄荷，清爽到灵魂出窍~' },
  { name: '泰式炒河粉', emoji: '🥡', category: 'southeast', comment: '酸甜鲜辣的Pad Thai配上花生碎和豆芽，挤上青柠汁，泰国的国菜名不虚传！' },
  { name: '肉骨茶', emoji: '🍖', category: 'southeast', comment: '药材香料炖出的排骨汤浓郁滋补，配油条蘸汤吃，东南亚华人的养生美食~' },
  { name: '叻沙', emoji: '🥥', category: 'southeast', comment: '椰奶和咖喱的浓汤配上米粉和虾，浓郁的南洋风味，一口就上瘾！' },
  { name: '芒果糯米饭', emoji: '🥭', category: 'southeast', comment: '甜到流蜜的芒果配上椰浆糯米，泰国的国民甜品，吃完嘴角会不自觉上扬~' },
  { name: '打抛猪肉', emoji: '🐷', category: 'southeast', comment: '罗勒叶和肉末爆炒盖在米饭上配煎蛋，泰国的国民菜，简单但太上头了！' },
  { name: '槟城炒粿条', emoji: '🍝', category: 'southeast', comment: '大火镬气十足的炒河粉配上大虾和腊肠，马来西亚槟城的街头之王！' },
  { name: '菠萝炒饭', emoji: '🍍', category: 'southeast', comment: '炒饭装在挖空的菠萝里，腰果肉松虾仁配上菠萝的酸甜，颜值和味道都在线~' },
  { name: '泰式绿咖喱', emoji: '🟢', category: 'southeast', comment: '椰奶绿咖喱炖鸡肉和茄子，香辣浓郁，配一碗茉莉花米饭就是天堂~' },
  { name: '沙爹肉串', emoji: '🍢', category: 'southeast', comment: '腌制过的肉串在炭火上烤得焦香，蘸上浓郁的花生酱，东南亚烧烤之王！' },
  { name: '印尼炒饭', emoji: '🍛', category: 'southeast', comment: '甜酱油炒出的深色炒饭配煎蛋和虾片，Nasi Goreng的魅力无法抵挡~' },
  { name: '越南法棍', emoji: '🥖', category: 'southeast', comment: '法棍面包夹着烤肉腌萝卜香菜和辣椒，法国和越南的完美混血，酥脆清爽！' },

  // ===== 🌙 夜宵 (8) =====
  { name: '泡面', emoji: '🍜', category: 'midnight', comment: '深夜饿了泡一碗面，加个鸡蛋加根火腿肠，最简单的幸福就是半夜偷吃~' },
  { name: '烤冷面', emoji: '🫓', category: 'midnight', comment: '铁板上煎冷面打鸡蛋刷酱卷起来切段，东北夜市的顶流小吃！' },
  { name: '炸串', emoji: '🍢', category: 'midnight', comment: '各种食材裹上面糊炸到金黄，刷上甜辣酱撒上孜然，深夜罪恶但快乐！' },
  { name: '麻辣小龙虾', emoji: '🦞', category: 'midnight', comment: '红亮的小龙虾在麻辣汤汁里泡着，剥壳吸汁一条龙，夏天的夜晚就该这样~' },
  { name: '卤鸭脖', emoji: '🦴', category: 'midnight', comment: '啃着卤得入味的鸭脖追剧，辣中带甜越啃越香，根本停不下来！' },
  { name: '炒河粉', emoji: '🍝', category: 'midnight', comment: '大火镬气十足的炒河粉，牛肉芥蓝配上豉油，大排档的灵魂夜宵！' },
  { name: '煎饺', emoji: '🥟', category: 'midnight', comment: '剩饺子用油煎到两面金黄，深夜翻冰箱的最大惊喜，蘸醋吃太幸福了~' },
  { name: '炒田螺', emoji: '🐌', category: 'midnight', comment: '辣椒紫苏爆炒田螺，用牙签挑出来蘸汤汁，配冰啤酒就是夏夜最佳CP！' },
]

export const MYSTERY_BOX: FoodItem = {
  name: '泡芙盲盒',
  emoji: '❓',
  category: 'mystery',
  comment: '泡芙帮你盲选一个！相信泡芙的直觉，说不定就选到你最想吃的那道~',
}

export function getRandomFoods(count: number, excludeCategory?: string): FoodItem[] {
  let pool = excludeCategory ? ALL_FOODS.filter(f => f.category !== excludeCategory) : [...ALL_FOODS]
  const result: FoodItem[] = []
  for (let i = 0; i < count && pool.length > 0; i++) {
    const idx = Math.floor(Math.random() * pool.length)
    result.push(pool[idx])
    pool.splice(idx, 1)
  }
  return result
}

export function getRandomFoodByCategory(): FoodItem {
  const cats = [...new Set(ALL_FOODS.map(f => f.category))]
  const cat = cats[Math.floor(Math.random() * cats.length)]
  const foods = ALL_FOODS.filter(f => f.category === cat)
  return foods[Math.floor(Math.random() * foods.length)]
}
