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
]

export const ALL_FOODS: FoodItem[] = [
  // ===== 🍜 面食 =====
  { name: '牛肉面', emoji: '🍜', category: 'noodle', comment: '红烧牛肉软烂入味，筋道的面条吸满汤汁，泡芙觉得今天需要这一碗来充电！' },
  { name: '炸酱面', emoji: '🥢', category: 'noodle', comment: '浓郁的炸酱裹满每一根面条，黄瓜丝一拌，老北京的幸福就是这么简单~' },
  { name: '螺蛳粉', emoji: '🐚', category: 'noodle', comment: '臭是真的臭，香也是真的香！酸笋腐竹花生米，吃完记得开窗通风…' },
  { name: '葱油拌面', emoji: '🧅', category: 'noodle', comment: '热油一浇，葱香四溢！最简单的食材往往最让人满足，泡芙拍爪子推荐！' },
  { name: '担担面', emoji: '🌰', category: 'noodle', comment: '芝麻酱和肉末的完美结合，麻辣鲜香，一口下去魂穿成都街头~' },
  { name: '阳春面', emoji: '🍲', category: 'noodle', comment: '清汤寡水但鲜美无比，有时候简单就是最好的治愈，暖胃又暖心。' },
  { name: 'biangbiang面', emoji: '🫓', category: 'noodle', comment: '裤带一样宽的面条，油泼辣子一浇，滋滋作响的声音就让人流口水！' },
  { name: '热干面', emoji: '🍂', category: 'noodle', comment: '芝麻酱裹满碱水面条，配上一碗蛋酒，武汉人的早晨从这一碗开始！' },

  // ===== 🍚 米饭 =====
  { name: '煲仔饭', emoji: '🍲', category: 'rice', comment: '锅底焦香的锅巴是灵魂！腊味油脂渗透米饭，每一粒都闪着诱人的光泽~' },
  { name: '蛋炒饭', emoji: '🍳', category: 'rice', comment: '粒粒分明的黄金炒饭，蛋白质和碳水完美组合，简单又满足的一餐！' },
  { name: '卤肉饭', emoji: '🥩', category: 'rice', comment: '卤到软烂的五花肉浇在米饭上，肉汁渗透每一粒米，台湾街头的味道~' },
  { name: '韩式拌饭', emoji: '🇰🇷', category: 'rice', comment: '五颜六色的蔬菜配溏心蛋，拌上辣酱，一口吃到所有营养！' },
  { name: '咖喱饭', emoji: '🍛', category: 'rice', comment: '浓稠的咖喱裹着鸡肉和土豆，米饭蘸咖喱汁的快乐，谁吃谁知道~' },
  { name: '海南鸡饭', emoji: '🐔', category: 'rice', comment: '皮滑肉嫩的鸡肉配姜葱蘸料，鸡油饭香到不用配菜都能吃三碗！' },
  { name: '排骨饭', emoji: '🦴', category: 'rice', comment: '排骨软烂脱骨，米饭吸饱了肉汤汁的精华，一口下去满满的幸福感。' },
  { name: '扬州炒饭', emoji: '🍤', category: 'rice', comment: '虾仁火腿青豆鸡蛋，配料丰富的豪华炒饭，淮扬菜的经典之作！' },

  // ===== 🌶️ 麻辣 =====
  { name: '麻辣烫', emoji: '🫕', category: 'spicy', comment: '自选食材随心搭，红油汤底里涮一涮，冬天暖身夏天过瘾，全年通用！' },
  { name: '火锅', emoji: '🍲', category: 'spicy', comment: '没有什么是一顿火锅解决不了的！毛肚七上八下，鸭肠涮三秒，开动！' },
  { name: '麻辣香锅', emoji: '🥘', category: 'spicy', comment: '干锅爆炒的麻辣味太够劲了！藕片土豆午餐肉，每样都来一点~' },
  { name: '酸菜鱼', emoji: '🐟', category: 'spicy', comment: '酸爽开胃的酸菜配上嫩滑鱼片，汤都要喝干净，米饭杀手排名前三！' },
  { name: '水煮牛肉', emoji: '🌊', category: 'spicy', comment: '看似被辣椒淹没实则牛肉鲜嫩无比，夹一块在红油里打个滚，太香了！' },
  { name: '毛血旺', emoji: '🩸', category: 'spicy', comment: '鸭血毛肚午餐肉，满满一盆麻辣鲜香，重口味爱好者的终极幸福！' },
  { name: '剁椒鱼头', emoji: '🐠', category: 'spicy', comment: '铺满剁椒的大鱼头蒸得鲜嫩入味，最后下碗面条拌汤，绝了！' },
  { name: '辣子鸡', emoji: '🌶️', category: 'spicy', comment: '辣椒堆里找鸡丁的乐趣！外酥里嫩麻辣鲜香，泡芙先帮你擦下汗…' },

  // ===== 🥟 小吃 =====
  { name: '饺子', emoji: '🥟', category: 'snack', comment: '好吃不过饺子！韭菜鸡蛋还是猪肉大葱？蘸醋还是酱油？泡芙选醋！' },
  { name: '煎饼果子', emoji: '🫓', category: 'snack', comment: '绿豆面摊开打个鸡蛋撒葱花，夹上薄脆，天津人的精致早餐~' },
  { name: '小笼包', emoji: '🧆', category: 'snack', comment: '轻轻提慢慢移，先开窗后喝汤！小心烫嘴但值得每一个步骤的仪式感~' },
  { name: '生煎', emoji: '🫠', category: 'snack', comment: '底部煎得金黄酥脆，咬开爆汁！上海生煎的魅力就在那一口汤汁里~' },
  { name: '肉夹馍', emoji: '🥙', category: 'snack', comment: '腊汁肉剁得碎碎的夹在白吉馍里，肥瘦相间肉香四溢，西安的灵魂小吃！' },
  { name: '肠粉', emoji: '🫔', category: 'snack', comment: '滑溜溜的肠粉淋上甜酱油，加个鸡蛋加个肉馅，广东人的早餐标配~' },
  { name: '锅贴', emoji: '🥟', category: 'snack', comment: '煎得金黄的长条饺子，底部焦脆内馅多汁，蘸点醋一口一个停不下来！' },
  { name: '韭菜盒子', emoji: '🟢', category: 'snack', comment: '表皮煎得酥脆，韭菜鸡蛋粉条的内馅香喷喷，趁热吃最香！' },

  // ===== 🍕 西式 =====
  { name: '披萨', emoji: '🍕', category: 'western', comment: '拉丝就是正义！芝士就是力量！薄底厚底都是好底，今天放纵一下~' },
  { name: '汉堡', emoji: '🍔', category: 'western', comment: '牛肉饼多汁生菜脆爽，一口咬下所有层次，配薯条和可乐就是完美套餐！' },
  { name: '意面', emoji: '🍝', category: 'western', comment: '肉酱番茄还是奶油培根？螺旋面蝴蝶面通心粉，每种形状都有不同快乐~' },
  { name: '薯条', emoji: '🍟', category: 'western', comment: '外酥里软的金黄薯条蘸番茄酱，最简单的快乐往往最持久！' },
  { name: '塔可', emoji: '🌮', category: 'western', comment: '玉米饼夹着烤肉菠萝莎莎酱，一口下去满满的墨西哥风情，酸辣清爽！' },
  { name: '焗饭', emoji: '🧀', category: 'western', comment: '芝士盖在炒饭上烤到金黄冒泡，挖一勺拉丝拉到天花板，太满足了！' },
  { name: '牛排', emoji: '🥩', category: 'western', comment: '五分熟刚刚好，切开粉嫩多汁，黑胡椒海盐简单调味就能吃到牛肉原香~' },
  { name: '三明治', emoji: '🥪', category: 'western', comment: '吐司夹万物！鸡蛋火腿生菜芝士叠起来，一口咬下所有层次，野餐必备~' },

  // ===== 🍣 日料 =====
  { name: '寿司', emoji: '🍣', category: 'japanese', comment: '三文鱼在召唤你…醋饭配上新鲜鱼生，蘸一点芥末酱油就是天堂！' },
  { name: '拉面', emoji: '🍥', category: 'japanese', comment: '浓郁的豚骨汤底配上溏心蛋和叉烧，面条筋道汤头醇厚，日式拉面赛高！' },
  { name: '鳗鱼饭', emoji: '😋', category: 'japanese', comment: '蒲烧鳗鱼油亮焦香铺在米饭上，甜咸酱汁渗进米里，每一口都是奢华~' },
  { name: '天妇罗', emoji: '🍤', category: 'japanese', comment: '薄脆的面衣裹着大虾和蔬菜，蘸上天汁清爽不腻，炸物的极致优雅！' },
  { name: '牛丼', emoji: '🍱', category: 'japanese', comment: '肥牛片和洋葱在甜咸酱汁里煮得入味，盖在米饭上配个生鸡蛋，绝了！' },
  { name: '章鱼烧', emoji: '🐙', category: 'japanese', comment: '外皮微脆内里柔软，章鱼块弹牙有嚼劲，木鱼花在上面跳舞，太可爱了~' },
  { name: '乌冬面', emoji: '🍜', category: 'japanese', comment: '粗粗的面条弹牙有嚼劲，清汤或者咖喱都超好味，吸溜吸溜一大碗！' },
  { name: '大阪烧', emoji: '🫓', category: 'japanese', comment: '日式蔬菜煎饼淋上美乃滋和大阪烧酱，木鱼花在热气中翩翩起舞~' },

  // ===== 🇰🇷 韩料 =====
  { name: '石锅拌饭', emoji: '🫕', category: 'korean', comment: '滚烫的石锅把底下米饭烤出锅巴，拌上辣酱和各种蔬菜，滋滋作响太诱人了！' },
  { name: '韩式炸鸡', emoji: '🍗', category: 'korean', comment: '外皮酥脆裹满甜辣酱，配上一杯冰啤酒，今天做个韩剧女主！' },
  { name: '部队锅', emoji: '🪖', category: 'korean', comment: '午餐肉香肠拉面年糕泡菜一锅炖，最后下拉面吸满汤汁，韩式暖锅yyds！' },
  { name: '炒年糕', emoji: '🍡', category: 'korean', comment: '软糯Q弹的年糕裹满甜辣酱，配鱼饼和煮鸡蛋，街头小吃之王！' },
  { name: '大酱汤', emoji: '🥣', category: 'korean', comment: '发酵大酱的醇厚配上豆腐西葫芦，热乎乎的喝一碗，配米饭就是完美一餐~' },
  { name: '冷面', emoji: '🧊', category: 'korean', comment: '冰凉的牛肉高汤配上筋道荞麦面，夏天来一碗直接降温五度，清爽解暑！' },
  { name: '紫菜包饭', emoji: '🍙', category: 'korean', comment: '芝麻油香扑鼻，黄萝卜腌萝卜菠菜鸡蛋卷在一起，一口一个停不下来~' },
  { name: '泡菜饼', emoji: '🫓', category: 'korean', comment: '酸辣泡菜和面糊煎得外脆内软，下雨天配马格利酒，韩国人的雨天标配！' },

  // ===== 🥗 轻食 =====
  { name: '沙拉', emoji: '🥗', category: 'light', comment: '新鲜蔬菜配上油醋汁，清爽可口无负担，吃完感觉自己轻盈得像泡泡芙~' },
  { name: '酸奶碗', emoji: '🫙', category: 'light', comment: '浓稠酸奶铺上格兰诺拉和莓果，颜值高味道好，早餐来一碗元气满满！' },
  { name: '越南春卷', emoji: '🌯', category: 'light', comment: '透明的米纸包着鲜虾米粉生菜薄荷，蘸鱼露吃清爽解腻，夏天首选！' },
  { name: '波奇饭', emoji: '🥑', category: 'light', comment: '夏威夷来的颜值担当！三文鱼牛油果铺在米饭上淋酱油，健康又好吃~' },
  { name: '藜麦碗', emoji: '🌾', category: 'light', comment: '高蛋白藜麦配上烤蔬菜和鹰嘴豆，超级食物的组合，吃完精力+10！' },
  { name: '鹰嘴豆泥', emoji: '🫘', category: 'light', comment: '丝滑的鹰嘴豆泥淋上橄榄油，蘸皮塔饼吃，地中海风情满满~' },
  { name: '考伯沙拉', emoji: '🥑', category: 'light', comment: '鸡蛋培根牛油果蓝纹芝士切丁排排坐，一道彩虹沙拉，好看又好吃！' },
  { name: '水果碗', emoji: '🍓', category: 'light', comment: '各种新鲜水果切块堆成小山，淋上蜂蜜和椰奶，吃一碗就是度假的感觉~' },

  // ===== 🍖 烧烤 =====
  { name: '烤肉', emoji: '🔥', category: 'bbq', comment: '滋滋冒油的五花肉在烤盘上跳舞，包在生菜里加蒜片青椒，一口闷！' },
  { name: '烤鱼', emoji: '🐠', category: 'bbq', comment: '整条鱼烤得外皮焦香鱼肉细嫩，配菜吸满汤汁，越烤越入味~' },
  { name: '串串', emoji: '🍢', category: 'bbq', comment: '竹签串起各种食材在红油锅里翻滚，数签子结账的仪式感，成都人的快乐！' },
  { name: '铁板烧', emoji: '🥘', category: 'bbq', comment: '厨师当面表演铁板火焰秀，牛肉粒在铁板上滋滋作响，好看又好吃！' },
  { name: '烤鸡翅', emoji: '🍗', category: 'bbq', comment: '外皮焦脆刷上蜂蜜，里面的肉嫩到流汁，泡芙觉得这个最稳，永不出错！' },
  { name: '烤生蚝', emoji: '🦪', category: 'bbq', comment: '蒜蓉粉丝铺在肥美的生蚝上，碳火一烤滋滋冒泡，男人的加油站女人的美容院！' },
  { name: '烤茄子', emoji: '🍆', category: 'bbq', comment: '整条茄子烤软划开铺满蒜蓉辣椒，软糯入味，素菜烤出肉的味道！' },
  { name: '烤鱿鱼', emoji: '🦑', category: 'bbq', comment: '整条鱿鱼刷上酱料在炭火上翻转，Q弹有嚼劲，夜市里的当家花旦！' },

  // ===== 🥘 家常 =====
  { name: '西红柿炒蛋', emoji: '🍅', category: 'home', comment: '国民第一家常菜！酸甜的西红柿配嫩滑炒蛋，拌饭能吃三大碗，永远的comfort food~' },
  { name: '红烧肉', emoji: '🥘', category: 'home', comment: '五花肉炖到入口即化，肥而不腻红亮诱人，每一块都在闪闪发光！' },
  { name: '麻婆豆腐', emoji: '🫛', category: 'home', comment: '麻辣鲜香嫩烫酥，豆腐在红油里颤颤巍巍，米饭杀手排行榜第一名！' },
  { name: '糖醋排骨', emoji: '🦴', category: 'home', comment: '酸甜口的排骨外酥里嫩，糖醋汁挂在排骨上晶莹剔透，泡芙拍爪子推荐！' },
  { name: '鱼香肉丝', emoji: '🥕', category: 'home', comment: '没有鱼的鱼香肉丝！木耳胡萝卜肉丝在酸甜辣汁里翻炒，米饭的绝配~' },
  { name: '宫保鸡丁', emoji: '🥜', category: 'home', comment: '鸡肉嫩滑花生酥脆，荔枝味的酸甜微辣酱汁，花生和鸡丁的绝妙组合！' },
  { name: '回锅肉', emoji: '🐷', category: 'home', comment: '二刀肉煮过再回锅炒出灯盏窝，配蒜苗和豆瓣酱，川菜之魂名不虚传！' },
  { name: '干煸豆角', emoji: '🫘', category: 'home', comment: '豆角煸到表面微焦带虎皮纹，加肉末辣椒炒香，素菜吃出肉的味道来~' },

  // ===== 🦀 海鲜 =====
  { name: '清蒸鲈鱼', emoji: '🐟', category: 'seafood', comment: '最简单的做法最考验食材，蒸得恰到好处的鲈鱼鲜嫩无比，淋上蒸鱼豉油就是王道！' },
  { name: '蒜蓉大虾', emoji: '🦐', category: 'seafood', comment: '铺满蒜蓉的大虾蒸得鲜红，虾肉弹牙蒜香四溢，虾头里的虾黄才是精华！' },
  { name: '辣炒蛤蜊', emoji: '🐚', category: 'seafood', comment: '蛤蜊在辣椒和蒜末里爆炒，开口的瞬间就是最好吃的时候，配啤酒一绝！' },
  { name: '葱姜螃蟹', emoji: '🦀', category: 'seafood', comment: '大螃蟹和葱姜一起爆炒，蟹肉鲜甜蟹黄浓郁，吃完手指都要舔干净~' },
  { name: '椒盐皮皮虾', emoji: '🦞', category: 'seafood', comment: '皮皮虾裹上薄薄的面衣炸到酥脆，撒上椒盐辣椒，香到连壳都想吃掉！' },
  { name: '蒜蓉粉丝扇贝', emoji: '🐚', category: 'seafood', comment: '扇贝上铺满蒜蓉粉丝，蒸好淋热油，一口一个鲜到眉毛掉下来~' },
  { name: '捞汁小海鲜', emoji: '🦑', category: 'seafood', comment: '各种小海鲜泡在酸辣捞汁里，冰镇后吃爽口开胃，夏天嗦一口太快乐了！' },
  { name: '清蒸大闸蟹', emoji: '🦀', category: 'seafood', comment: '秋天的蟹黄饱满到流油，蘸姜醋吃每一口都是金秋的味道，泡芙想想都流口水~' },

  // ===== 🥣 汤粥 =====
  { name: '皮蛋瘦肉粥', emoji: '🥚', category: 'soup', comment: '熬到米粒开花，皮蛋和瘦肉丝在粥里若隐若现，撒上葱花暖心暖胃~' },
  { name: '南瓜小米粥', emoji: '🎃', category: 'soup', comment: '南瓜的清甜配上小米的醇厚，金灿灿的一碗，喝完感觉整个人都暖洋洋的~' },
  { name: '番茄牛腩汤', emoji: '🍅', category: 'soup', comment: '牛腩炖得软烂，番茄的酸甜完全融入汤里，配米饭蘸馒头都好吃！' },
  { name: '酸辣汤', emoji: '🥣', category: 'soup', comment: '胡椒的辣和醋的酸在口中交织，豆腐丝木耳丝蛋花丝，冬天喝一碗浑身发热！' },
  { name: '排骨莲藕汤', emoji: '🦴', category: 'soup', comment: '粉糯的莲藕和排骨一起慢炖，汤色奶白，湖北人的乡愁就藏在这一碗里~' },
  { name: '菌菇汤', emoji: '🍄', category: 'soup', comment: '各种菌菇炖出的鲜美高汤，不放味精都鲜掉眉毛，素食者的福音！' },
  { name: '馄饨', emoji: '🥟', category: 'soup', comment: '薄皮大馅的小馄饨漂在紫菜虾皮汤里，一口一个滑溜溜，早餐来一碗元气满满~' },
  { name: '疙瘩汤', emoji: '🍲', category: 'soup', comment: '小小的面疙瘩在番茄蛋花汤里翻滚，朴实无华但喝起来就是家里的味道~' },

  // ===== 🍰 甜点 =====
  { name: '蛋糕', emoji: '🍰', category: 'dessert', comment: '松软的蛋糕胚配上绵密的奶油，一口下去快乐值直接拉满！不开心就吃蛋糕！' },
  { name: '冰淇淋', emoji: '🍦', category: 'dessert', comment: '冰冰凉凉甜甜的，夏天抱着盒子挖着吃的快乐，泡芙觉得抹茶味最棒！' },
  { name: '奶茶', emoji: '🧋', category: 'dessert', comment: '珍珠Q弹奶茶香浓，今天也要当个奶茶女孩！少糖去冰是最后的倔强~' },
  { name: '布丁', emoji: '🍮', category: 'dessert', comment: '轻轻一拍就duang~duang~晃动，入口即化的焦糖布丁，幸福感爆棚！' },
  { name: '华夫饼', emoji: '🧇', category: 'dessert', comment: '外酥内软的格子饼淋上枫糖浆和奶油，配上新鲜水果，下午茶的王者！' },
  { name: '双皮奶', emoji: '🥛', category: 'dessert', comment: '两层奶皮滑嫩香甜，顺德甜品之光！红豆双皮奶是经典中的经典~' },
  { name: '提拉米苏', emoji: '☕', category: 'dessert', comment: '咖啡和可可的微苦配上马斯卡彭的细腻甜美，意大利人说它能让人开心，泡芙同意！' },
  { name: '杨枝甘露', emoji: '🥭', category: 'dessert', comment: '芒果西柚椰奶西米的完美组合，酸甜清爽，港式甜品的巅峰之作！' },

  // ===== 🥡 外卖 =====
  { name: '黄焖鸡', emoji: '🐔', category: 'takeout', comment: '鸡肉焖得软烂入味，汤汁浓郁配米饭，外卖界的销量冠军不是吹的！' },
  { name: '麻辣拌', emoji: '🌪️', category: 'takeout', comment: '芝麻酱和辣椒油拌一切，比麻辣烫更浓郁，抚顺人的伟大发明！' },
  { name: '炒米粉', emoji: '🍝', category: 'takeout', comment: '细米粉在锅里大火翻炒，加鸡蛋豆芽青菜，路边摊的灵魂美食~' },
  { name: '盖浇饭', emoji: '🍛', category: 'takeout', comment: '现炒的菜浇在米饭上，菜汁渗进米饭的瞬间就是魔法，简单粗暴的好吃！' },
  { name: '米线', emoji: '🍲', category: 'takeout', comment: '细滑的米线在鸡汤里烫熟，配上各种码子，云南人的日常就是一碗米线~' },
  { name: '酸辣粉', emoji: '🌶️', category: 'takeout', comment: '酸辣鲜香的薯粉配上花生碎和榨菜，吸溜一口酸辣开胃，停不下来！' },
  { name: '沙县小吃', emoji: '🥟', category: 'takeout', comment: '扁肉拌面炖罐，中国人的深夜食堂，便宜又好吃永远的神！' },
  { name: '木桶饭', emoji: '🪣', category: 'takeout', comment: '木桶蒸出的米饭带着淡淡木香，配一荤一素就是打工人最实在的一餐~' },

  // ===== 🌏 东南亚 =====
  { name: '冬阴功', emoji: '🦐', category: 'southeast', comment: '酸辣鲜香的大虾汤，香茅和柠檬叶的香气直冲天灵盖，一口秒穿泰国！' },
  { name: '越南河粉', emoji: '🍜', category: 'southeast', comment: '清澈鲜美的牛肉汤配上滑嫩河粉，挤点柠檬加把薄荷，清爽到灵魂出窍~' },
  { name: '泰式炒河粉', emoji: '🥡', category: 'southeast', comment: '酸甜鲜辣的Pad Thai配上花生碎和豆芽，挤上青柠汁，泰国的国菜名不虚传！' },
  { name: '肉骨茶', emoji: '🍖', category: 'southeast', comment: '药材香料炖出的排骨汤浓郁滋补，配油条蘸汤吃，东南亚华人的养生美食~' },
  { name: '叻沙', emoji: '🥥', category: 'southeast', comment: '椰奶和咖喱的浓汤配上米粉和虾，浓郁的南洋风味，一口就上瘾！' },
  { name: '芒果糯米饭', emoji: '🥭', category: 'southeast', comment: '甜到流蜜的芒果配上椰浆糯米，泰国的国民甜品，吃完嘴角会不自觉上扬~' },
  { name: '打抛猪肉', emoji: '🐷', category: 'southeast', comment: '罗勒叶和肉末爆炒盖在米饭上配煎蛋，泰国的国民菜，简单但太上头了！' },
  { name: '槟城炒粿条', emoji: '🍝', category: 'southeast', comment: '大火镬气十足的炒河粉配上大虾和腊肠，马来西亚槟城的街头之王！' },
]

// 随机盲盒选项
export const MYSTERY_BOX: FoodItem = {
  name: '泡芙盲盒',
  emoji: '❓',
  category: 'mystery',
  comment: '泡芙帮你盲选一个！相信泡芙的直觉，说不定就选到你最想吃的那道~',
}

// 获取随机菜品
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

// 按分类取随机
export function getRandomFoodByCategory(): FoodItem {
  const cats = [...new Set(ALL_FOODS.map(f => f.category))]
  const cat = cats[Math.floor(Math.random() * cats.length)]
  const foods = ALL_FOODS.filter(f => f.category === cat)
  return foods[Math.floor(Math.random() * foods.length)]
}
