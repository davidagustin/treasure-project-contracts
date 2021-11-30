const deployments = require('../data/deployments');
const fs = require('fs');

task('get-assets').setAction(async function () {
  const [sender] = await ethers.getSigners();

  const instance = await ethers.getContractAt('Treasure', deployments.treasure);

  const path = './out.json';

  const tokenIds = [
    6961, 126, 5381, 1721, 4483, 3164, 5746, 6210, 8187, 7190, 8676, 5948, 283,
    8655, 916, 5076, 8958, 618, 307, 6059, 7177, 4789, 2560, 4693, 7384, 4365,
    4366, 4361, 4356, 4359, 3232, 8799, 8797, 8796, 8795, 8794, 8793, 8788,
    8790, 8789, 8697, 8696, 8692, 8695, 8693, 8690, 8686, 1673, 1671, 1319,
    1317, 1316, 1312, 8367, 7236, 1305, 5523, 518, 147, 5648, 1545, 2788, 3254,
    4458, 4784, 8447, 5922, 3463, 4102, 7192, 318, 6584, 8124, 5020, 1284, 5798,
    7963, 1905, 4829, 7212, 7884, 1439, 4244, 63, 500, 701, 4156, 2564, 1766,
    1570, 1584, 1590, 1591, 1594, 1592, 1596, 7517, 7516, 5430, 5427, 5439,
    5438, 4550, 4551, 4549, 4541, 4539, 4540, 3302, 4050, 7326, 3886, 4341,
    2699, 8493, 2692, 767, 4827, 8727, 179, 8518, 1495, 1496, 1497, 1498, 1504,
    1505, 1506, 1507, 1508, 1509, 2594, 4307, 4308, 4340, 670, 5583, 669, 990,
    5547, 923, 5540, 6578, 5680, 6576, 6577, 5999, 2684, 3307, 3108, 6606, 6092,
    6184, 6639, 66, 2004, 7904, 4928, 281, 1161, 6828, 4228, 78, 6988, 994, 997,
    971, 970, 959, 949, 948, 947, 940, 937, 936, 935, 934, 933, 931, 929, 928,
    926, 920, 914, 913, 910, 908, 907, 905, 887, 687, 915, 7395, 2663, 1310,
    3689, 3082, 1793, 6257, 5548, 799, 7585, 2245, 1581, 6872, 8740, 6978, 6762,
    4088, 4922, 7140, 6854, 299, 1159, 6173, 1299, 4798, 4711, 4707, 4709, 4705,
    4704, 4667, 4669, 4658, 4651, 4650, 4649, 4647, 4644, 4640, 4573, 4570,
    4571, 4568, 4450, 4439, 4438, 4442, 4441, 4446, 4440, 4400, 4394, 4392,
    4393, 4387, 4388, 4390, 4382, 4381, 4378, 4399, 4401, 4404, 4405, 7552,
    4380, 1820, 7857, 8147, 5420, 4857, 1990, 4617, 8391, 3378, 3129, 2891,
    3144, 138, 2554, 7860, 7886, 8651, 7080, 4603, 1176, 2758, 4054, 3260, 249,
    1382, 1548, 1995, 3063, 3065, 3854, 3979, 5307, 5539, 5550, 646, 7059, 7951,
    8094, 8717, 5545, 92, 172, 821, 8561, 24, 137, 7315, 3048, 1767, 1106, 6905,
    7865, 1402, 7391, 4180, 3498, 6540, 3622, 2676, 8131, 4182, 1614, 5568,
    6497, 4260, 3387, 8171, 7873, 7863, 7861, 7858, 244, 1202, 8729, 240, 2523,
    7874, 4680, 2906, 2910, 2911, 2913, 4894, 4896, 4897, 4909, 5203, 5207,
    5208, 5221, 5227, 5311, 6513, 6514, 6519, 8316, 8317, 8321, 217, 6101, 1223,
    8330, 8679, 5804, 1475, 8337, 1392, 1308, 6630, 6274, 5358, 2851, 8929, 221,
    5001, 1843, 4200, 255, 1133, 5145, 7433, 1854, 3370, 3092, 8987, 3928, 7184,
    7201, 6376, 6598, 8758, 6374, 6372, 7628, 6368, 2930, 7885, 2905, 6570,
    1758, 2086, 5967, 6286, 7896, 7787, 2528, 4235, 4486, 4485, 4476, 5379,
    4474, 4475, 8024, 5600, 8849, 2370, 1654, 2427, 6711, 3820, 2926, 6553,
    8671, 5093, 7806, 3548, 6611, 1750, 4337, 4725, 4135, 5272, 6532, 4178,
    8326, 7837, 5164, 796, 6070, 6959, 6809, 3100, 5357, 5351, 6050, 4435, 6193,
    2813, 2082, 7055, 4089, 7844, 4217, 3464, 1267, 2552, 7843, 1246, 2005,
    3285, 8553, 6294, 2366, 1984, 499, 1744, 7639, 171, 8144, 5729, 1648, 6048,
    1529, 501, 8779, 2429, 3459, 2925, 5750, 7281, 5671, 7431, 6247, 2812, 1910,
    1222, 2947, 8040, 4919, 4916, 4596, 4594, 8638, 8637, 4959, 3680, 459, 857,
    3634, 3635, 3649, 4481, 4525, 1405, 7717, 2648, 1460, 83, 77, 4729, 480,
    5725, 7752, 863, 861, 4427, 5312, 5214, 752, 1446, 1857, 6653, 6056, 4029,
    8780, 8263, 272, 7584, 1400, 4199, 65, 5490, 6870, 2803, 4795, 5702, 758,
    1974, 1667, 5120, 3452, 4775, 8583, 5659, 8684, 8523, 4306, 7300, 6783,
    1451, 158, 7422, 8064, 8097, 8081, 878, 5193, 5862, 5739, 3642, 7819, 7817,
    7818, 7816, 7065, 3513, 3517, 3515, 3516, 3514, 619, 1770, 1531, 1532, 1533,
    1534, 1535, 2489, 2491, 2654, 8270, 5095, 5109, 7174, 1663, 6684, 5086,
    3745, 4626, 8843, 4125, 8542, 4588, 505, 1563, 5978, 1863, 1859, 345, 8467,
    206, 8051, 7570, 4472, 3494, 6047, 8059, 1727, 7704, 7572, 5092, 5097, 8566,
    5104, 8136, 2007, 2522, 379, 5155, 8770, 3132, 2873, 6157, 2027, 2644, 8142,
    5081, 8175, 7218, 2138, 2040, 7499, 800, 76, 1700, 5721, 5685, 1200, 5349,
    3709, 6313, 6309, 6304, 4504, 5189, 5617, 472, 610, 7402, 5830, 5829, 8416,
    8415, 8805, 195, 815, 245, 8916, 4436, 1261, 5733, 6972, 6437, 2641, 4236,
    3206, 7330, 267, 1608, 5567, 4294, 5426, 4712, 2468, 4078, 896, 3364, 901,
    893, 898, 1555, 1554, 899, 3905, 6506, 4418, 4420, 3771, 3773, 3775, 8791,
    5752, 5653, 7505, 6646, 6150, 5198, 5780, 5781, 5782, 5760, 1193, 5784,
    5785, 5786, 5787, 5779, 5764, 8982, 7503, 4512, 5765, 5766, 5767, 5768,
    5769, 5754, 5335, 5336, 5337, 5261, 5271, 5277, 5278, 5280, 5281, 5282,
    5163, 5162, 5154, 5153, 5152, 5446, 5215, 1146, 5591, 5338, 5339, 5343,
    5356, 5355, 5359, 5262, 5161, 2055, 5450, 3712, 2154, 1696, 1718, 1704,
    1831, 1719, 1834, 1724, 1722, 1715, 1711, 1827, 1720, 1826, 1837, 1701,
    1698, 1717, 1836, 1716, 1697, 1694, 1693, 8284, 8303, 8544, 6993, 2661,
    5968, 1964, 3885, 166, 160, 1256, 8879, 8878, 1440, 3341, 6082, 6882, 1189,
    8152, 4091, 8307, 2422, 8902, 1528, 1006, 5577, 8840, 5546, 7901, 8192,
    8460, 5945, 3590, 5139, 8537, 4299, 143, 3872, 4020, 8304, 7256, 740, 355,
    4411, 8860, 6602, 8428, 1302, 3288, 8702, 4204, 5678, 8201, 4516, 79, 6118,
    6717, 8621, 549, 6571, 7034, 7040, 7042, 7046, 7047, 7049, 7085, 7097, 7146,
    7150, 5141, 354, 7381, 7715, 8098, 201, 5669, 4431, 5268, 6026, 6647, 1961,
    5623, 5564, 7740, 1104, 1109, 7745, 1740, 6126, 6597, 8379, 7916, 6927,
    4006, 3472, 1483, 573, 259, 8820, 6482, 6517, 52, 43, 45, 72, 46, 48, 4982,
    23, 5463, 6199, 6433, 6879, 8239, 8772, 2875, 615, 2819, 7716, 5628, 6968,
    73, 74, 95, 97, 102, 98, 104, 103, 106, 109, 5755, 5756, 5758, 5759, 5761,
    8190, 8189, 8186, 8174, 8166, 8161, 8153, 8159, 8160, 8122, 8121, 8119,
    8117, 8116, 8115, 8114, 8113, 8107, 8112, 8103, 8101, 4465, 4248, 5619,
    5613, 6317, 7550, 7525, 7128, 7127, 554, 588, 4346, 6547, 7958, 5995, 7846,
    6716, 3849, 3848, 724, 725, 728, 729, 4534, 731, 734, 735, 738, 6797, 652,
    2728, 8846, 5857, 7759, 6107, 2777, 8424, 8611, 4295, 8584, 768, 5303, 4279,
    4238, 1142, 8429, 284, 8755, 8425, 1756, 5660, 6827, 2897, 5260, 2731, 2742,
    2739, 5219, 3424, 5400, 5113, 7592, 5218, 2067, 5327, 1180, 5217, 3784,
    8287, 726, 8286, 5477, 4264, 4865, 2924, 620, 8920, 4280, 124, 3641, 5106,
    6805, 3098, 2418, 5276, 5167, 5056, 4886, 775, 7868, 7875, 7883, 7893, 4072,
    692, 7994, 5385, 5422, 5421, 2763, 1258, 6745, 455, 8642, 5204, 4155, 6906,
    8430, 879, 6691, 6137, 3890, 3036, 873, 855, 8486, 8487, 4134, 814, 5562,
    177, 942, 648, 1266, 5627, 3985, 2750, 5058, 3660, 6089, 6086, 6081, 5691,
    7310, 7507, 372, 5483, 2448, 1175, 264, 5833, 155, 8154, 6062, 5624, 8856,
    7669, 6410, 8104, 6473, 3856, 4779, 609, 834, 8857, 44, 18, 19, 788, 8989,
    780, 6677, 786, 2211, 3344, 2323, 5689, 2233, 4455, 2735, 5524, 2738, 2003,
    8294, 3011, 4885, 8283, 2573, 2460, 7064, 7292, 293, 749, 6926, 2445, 8661,
    2529, 8013, 1804, 6607, 4511, 2582, 1352, 7580, 1135, 5146, 5009, 5007, 600,
    7199, 3319, 7770, 7489, 2918, 6418, 5228, 3322, 8890, 7618, 2267, 2265,
    2259, 2256, 4270, 3952, 3947, 3941, 3943, 3944, 8597, 6251, 7033, 2446,
    8035, 3552, 2021, 2754, 8163, 3085, 661, 4587, 347, 995, 4623, 8953, 515,
    5512, 7001, 1864, 1526, 1525, 1517, 1008, 960, 1226, 7753, 7757, 7756, 5480,
    5475, 5431, 5535, 7984, 1991, 1992, 7788, 3737, 8615, 6776, 6771, 6773,
    6772, 6770, 6769, 6765, 5994, 3361, 6868, 8007, 1879, 3493, 6565, 7234,
    1560, 8302, 8298, 8297, 1547, 5206, 6618, 2824, 1996, 6120, 3746, 6957, 816,
    4257, 7210, 1737, 6779, 6780, 3946, 3949, 3950, 3951, 7954, 2579, 2834,
    2538, 370, 3209, 6237, 6244, 6243, 6240, 8355, 6235, 6234, 4875, 6522, 1169,
    630, 3407, 673, 5525, 5532, 7905, 8417, 5246, 3706, 6881, 2806, 8602, 4739,
    5634, 7446, 3182, 7671, 5647, 8744, 6346, 571, 611, 570, 7297, 3926, 3506,
    1514, 4412, 888, 3527, 6840, 1773, 228, 7864, 7859, 2525, 6562, 3102, 7800,
    5626, 829, 5953, 7761, 3844, 4567, 3194, 3519, 4776, 830, 6471, 3240, 1844,
    4044, 1385, 1921, 5588, 4884, 1296, 4298, 1467, 4858, 7722, 8962, 8388,
    6962, 1237, 831, 7559, 7625, 5353, 900, 2310, 3920, 8674, 2132, 7445, 7532,
    4535, 5772, 1870, 6285, 4032, 3489, 3005, 2841, 8899, 2593, 6208, 5346,
    1123, 1174, 1695, 4358, 5460, 694, 3201, 6074, 2862, 2084, 6801, 4408, 6145,
    6550, 6261, 4691, 7141, 613, 5810, 7459, 3823, 2818, 5576, 6250, 3839, 3840,
    6664, 5584, 4876, 4997, 4278, 6264, 3533, 8496, 1736, 925, 5815, 1130, 2533,
    4963, 2890, 6790, 5522, 7226, 1562, 5252, 5510, 4741, 4732, 5121, 7533,
    1522, 1920, 575, 8893, 1111, 2888, 4888, 8014, 1353, 6998, 6997, 6996, 6992,
    6991, 6990, 7233, 765, 6966, 6963, 6960, 6958, 6956, 6954, 1688, 3331, 8881,
    6161, 5959, 8184, 6796, 8739, 6610, 8822, 4290, 8700, 8610, 1484, 8640,
    5492, 1083, 2521, 4233, 7614, 1264, 696, 6483, 8047, 7651, 4288, 2662, 7072,
    6975, 5712, 3490, 706, 7331, 6546, 5363, 2946, 2577, 91, 1339, 2892, 3321,
    4451, 7272, 4231, 8484, 7979, 5515, 5251, 1502, 1494, 1493, 1492, 1491,
    1489, 1482, 1481, 1479, 1478, 1477, 1472, 1476, 1474, 1471, 1464, 1463,
    1465, 1466, 1431, 1429, 1427, 1426, 1425, 1424, 1396, 1395, 1399, 1398,
    1397, 1394, 1387, 1384, 1381, 1378, 1379, 1374, 1376, 1372, 1375, 1371,
    1354, 1344, 1347, 1343, 1327, 1279, 1275, 1276, 1281, 1259, 1257, 1255,
    1253, 1248, 1229, 1247, 1239, 1228, 1227, 1217, 1197, 1198, 1218, 1196,
    1194, 1216, 1192, 1219, 1195, 1185, 1183, 1182, 1143, 1141, 1211, 1210,
    1208, 1203, 1206, 1204, 1098, 1201, 1097, 1093, 1094, 1096, 1095, 1088,
    1090, 1085, 1091, 1089, 1084, 1082, 1081, 1078, 1079, 1075, 1072, 1073,
    1071, 1068, 1067, 1065, 1066, 1063, 1064, 1061, 1062, 1058, 1057, 1049,
    1055, 1054, 1045, 1053, 1047, 1043, 1051, 1044, 1046, 1039, 1048, 1042,
    1052, 1037, 1038, 1036, 1035, 1034, 1032, 1033, 536, 7645, 5283, 3390, 537,
    490, 806, 685, 2058, 2042, 1254, 3026, 3256, 2241,
  ];

  const assets = [];

  for (let i = 0; i < tokenIds.length; i++) {
    const asset = {
      tokenId: `${tokenIds[i]}`,
      asset1: await instance.callStatic.getAsset1(tokenIds[i]),
      asset2: await instance.callStatic.getAsset2(tokenIds[i]),
      asset3: await instance.callStatic.getAsset3(tokenIds[i]),
      asset4: await instance.callStatic.getAsset4(tokenIds[i]),
      asset5: await instance.callStatic.getAsset5(tokenIds[i]),
      asset6: await instance.callStatic.getAsset6(tokenIds[i]),
      asset7: await instance.callStatic.getAsset7(tokenIds[i]),
      asset8: await instance.callStatic.getAsset8(tokenIds[i]),
    };
    assets.push(asset);
  }

  fs.writeFileSync(
    '/Users/yutamoxley/sol_projects/treasurePool2/treasure-for-loot-contracts/tasks/build/out.json',
    JSON.stringify(assets),
  );
});
