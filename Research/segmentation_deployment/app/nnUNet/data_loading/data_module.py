# Copyright (c) 2021-2022, NVIDIA CORPORATION. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

import glob
import os

import numpy as np
from pytorch_lightning import LightningDataModule
from sklearn.model_selection import KFold
from utils.utils import get_config_file, get_task_code, print0

from data_loading.dali_loader import fetch_dali_loader


class DataModule(LightningDataModule):
    def __init__(self, args):
        super().__init__()
        self.args = args
        self.data_path = get_data_path(args)
        self.kfold = get_kfold_splitter(args.nfolds)
        self.kwargs = {
            "dim": self.args.dim,
            "seed": self.args.seed,
            "gpus": self.args.gpus,
            "nvol": self.args.nvol,
            "layout": self.args.layout,
            "overlap": self.args.overlap,
            "benchmark": self.args.benchmark,
            "num_workers": self.args.num_workers,
            "oversampling": self.args.oversampling,
            "test_batches": self.args.test_batches,
            "train_batches": self.args.train_batches,
            "invert_resampled_y": self.args.invert_resampled_y,
            "patch_size": get_config_file(self.args)["patch_size"],
        }
        self.train_imgs, self.train_lbls, self.val_imgs, self.val_lbls, self.test_imgs = ([],) * 5

    def setup(self, stage=None):
        meta = load_data(self.data_path, "*_meta.npy")
        orig_lbl = load_data(self.data_path, "*_orig_lbl.npy")
        imgs, lbls = load_data(self.data_path, "*_x.npy"), load_data(self.data_path, "*_y.npy")
        self.test_imgs, test_meta = get_test_fnames(self.args, self.data_path, meta)

        if self.args.exec_mode != "predict" or self.args.benchmark:
            # train_idx, val_idx = list(self.kfold.split(imgs))[self.args.fold]


            # train_idx = [   1,    2,    3,    4,    5,    7,    8,    9,   11,   12,   13,   14,
            #                 15,   16,   18,   19,   21,   23,   24,   26,   27,   28,   31,   32,
            #                 34,   35,   36,   37,   38,   39,   40,   41,   42,   43,   44,   45,
            #                 46,   48,   49,   50,   51,   53,   54,   59,   60,   61,   62,   63,
            #                 64,   66,   67,   69,   71,   74,   75,   77,   78,   79,   80,   81,
            #                 83,   84,   85,   86,   88,   91,   93,   94,   95,   96,   99,  100,
            #                 102,  103,  105,  106,  107,  108,  109,  110,  112,  113,  114,  115,
            #                 116,  117,  119,  120,  121,  122,  123,  124,  125,  126,  127,  128,
            #                 129,  130,  132,  133,  134,  135,  137,  139,  140,  141,  142,  143,
            #                 144,  145,  146,  147,  148,  152,  155,  156,  157,  158,  159,  160,
            #                 161,  163,  164,  165,  166,  167,  168,  169,  170,  171,  172,  174,
            #                 175,  176,  177,  179,  180,  181,  182,  183,  184,  185,  186,  188,
            #                 189,  191,  192,  194,  195,  196,  197,  199,  200,  202,  203,  204,
            #                 205,  207,  209,  210,  211,  212,  213,  214,  215,  217,  218,  219,
            #                 220,  222,  224,  225,  226,  227,  228,  229,  230,  231,  232,  233,
            #                 234,  235,  236,  237,  240,  241,  242,  243,  244,  245,  246,  247,
            #                 248,  249,  251,  252,  254,  255,  256,  257,  259,  260,  261,  262,
            #                 263,  266,  267,  269,  270,  271,  272,  273,  274,  275,  276,  278,
            #                 279,  280,  282,  283,  285,  286,  287,  288,  289,  290,  291,  292,
            #                 293,  294,  295,  296,  297,  299,  301,  303,  305,  306,  309,  310,
            #                 312,  313,  314,  315,  316,  317,  318,  319,  320,  321,  322,  323,
            #                 324,  325,  327,  328,  329,  330,  331,  332,  333,  334,  336,  337,
            #                 339,  340,  341,  342,  344,  345,  346,  348,  349,  350,  351,  352,
            #                 353,  354,  355,  356,  357,  360,  361,  362,  363,  364,  365,  366,
            #                 367,  368,  369,  370,  371,  372,  373,  374,  375,  376,  377,  378,
            #                 379,  380,  381,  382,  384,  385,  386,  387,  388,  389,  390,  392,
            #                 393,  394,  395,  396,  397,  398,  399,  400,  401,  402,  403,  404,
            #                 405,  406,  407,  408,  409,  410,  412,  415,  416,  417,  418,  419,
            #                 420,  421,  423,  424,  425,  427,  429,  431,  432,  433,  434,  435,
            #                 436,  437,  438,  439,  440,  441,  442,  443,  444,  445,  446,  447,
            #                 449,  450,  451,  453,  455,  456,  457,  458,  459,  460,  461,  463,
            #                 464,  465,  466,  467,  468,  469,  470,  471,  472,  473,  474,  475,
            #                 476,  477,  478,  479,  480,  481,  482,  483,  484,  485,  486,  487,
            #                 488,  490,  491,  492,  493,  494,  495,  496,  497,  498,  500,  503,
            #                 504,  505,  506,  508,  509,  510,  511,  512,  514,  516,  517,  518,
            #                 519,  520,  521,  522,  523,  524,  525,  527,  529,  531,  532,  533,
            #                 534,  535,  537,  538,  541,  542,  543,  545,  546,  547,  548,  550,
            #                 552,  553,  554,  555,  556,  557,  558,  559,  560,  561,  562,  563,
            #                 564,  565,  567,  568,  569,  571,  572,  573,  574,  575,  576,  577,
            #                 580,  581,  582,  583,  584,  585,  587,  588,  591,  592,  593,  594,
            #                 595,  596,  597,  598,  599,  600,  601,  603,  604,  605,  606,  607,
            #                 608,  609,  610,  611,  612,  613,  614,  615,  616,  617,  618,  619,
            #                 620,  622,  623,  624,  625,  626,  628,  629,  630,  631,  632,  633,
            #                 636,  637,  638,  639,  640,  641,  643,  644,  645,  646,  648,  649,
            #                 651,  652,  653,  654,  655,  657,  658,  659,  660,  661,  662,  664,
            #                 666,  667,  668,  669,  670,  671,  674,  675,  676,  677,  678,  679,
            #                 681,  682,  683,  684,  686,  687,  688,  689,  690,  691,  692,  693,
            #                 695,  696,  697,  698,  699,  700,  701,  703,  704,  705,  706,  709,
            #                 710,  711,  712,  713,  714,  715,  716,  717,  718,  719,  720,  722,
            #                 723,  724,  727,  728,  729,  732,  733,  734,  735,  737,  738,  739,
            #                 740,  741,  742,  743,  744,  745,  747,  748,  749,  750,  751,  752,
            #                 755,  756,  758,  759,  760,  761,  762,  763,  764,  766,  768,  769,
            #                 770,  771,  772,  773,  774,  776,  777,  778,  779,  780,  781,  783,
            #                 784,  785,  786,  787,  788,  789,  791,  797,  798,  799,  800,  801,
            #                 802,  803,  804,  805,  806,  807,  808,  810,  811,  812,  813,  814,
            #                 816,  817,  818,  819,  820,  825,  826,  827,  828,  829,  830,  831,
            #                 832,  833,  834,  835,  836,  837,  838,  839,  840,  841,  842,  843,
            #                 844,  845,  847,  848,  850,  851,  852,  853,  854,  855,  856,  859,
            #                 860,  861,  862,  863,  864,  865,  869,  870,  871,  872,  874,  875,
            #                 876,  877,  879,  881,  882,  883,  884,  885,  886,  887,  888,  891,
            #                 892,  893,  894,  895,  897,  898,  899,  901,  902,  905,  906,  907,
            #                 908,  909,  911,  913,  914,  916,  918,  920,  921,  922,  925,  927,
            #                 928,  930,  931,  932,  935,  936,  937,  938,  939,  942,  944,  946,
            #                 948,  949,  950,  952,  953,  954,  955,  956,  957,  958,  960,  961,
            #                 962,  963,  964,  965,  966,  967,  968,  969,  970,  974,  975,  976,
            #                 977,  978,  979,  980,  981,  984,  985,  987,  988,  989,  990,  991,
            #                 992,  993,  994,  995,  996,  997,  998,  999, 1000, 1001, 1002, 1003,
            #                 1004, 1005, 1006, 1008, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017,
            #                 1018, 1019, 1020, 1021, 1022, 1023, 1025, 1026, 1028, 1029, 1030, 1031,
            #                 1032, 1033, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044,
            #                 1046, 1047, 1048, 1050, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059,
            #                 1061, 1062, 1063, 1066, 1067, 1068, 1069, 1070, 1071, 1075, 1077, 1079,
            #                 1081, 1082, 1083, 1086, 1087, 1088, 1089, 1090, 1092, 1093, 1094, 1095,
            #                 1096, 1098, 1099, 1100, 1101, 1103, 1104, 1107, 1109, 1110, 1111, 1112,
            #                 1113, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1123, 1125, 1126, 1127,
            #                 1128, 1129, 1130, 1132, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140,
            #                 1141, 1142, 1143, 1145, 1147, 1148, 1149, 1152, 1153, 1154, 1155, 1156,
            #                 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1167, 1169, 1170,
            #                 1171, 1172, 1173, 1174, 1175, 1176, 1179, 1180, 1181, 1182, 1184, 1186,
            #                 1187, 1188, 1189, 1190, 1191, 1194, 1195, 1196, 1199, 1200, 1201, 1202,
            #                 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1211, 1212, 1213, 1214, 1215,
            #                 1216, 1217, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228,
            #                 1229, 1230, 1231, 1232, 1233, 1234, 1238, 1239, 1240, 1241, 1242, 1243,
            #                 1247, 1248, 1249, 1250]
            
            # val_idx = [ 0,    6,   10,   17,   20,   22,   25,   29,   30,   33,   47,   52,
            #             55,   56,   57,   58,   65,   68,   70,   72,   73,   76,   82,   87,
            #             89,   90,   92,   97,   98,  101,  104,  111,  118,  131,  136,  138,
            #             149,  150,  151,  153,  154,  162,  173,  178,  187,  190,  193,  198,
            #             201,  206,  208,  216,  221,  223,  238,  239,  250,  253,  258,  264,
            #             265,  268,  277,  281,  284,  298,  300,  302,  304,  307,  308,  311,
            #             326,  335,  338,  343,  347,  358,  359,  383,  391,  411,  413,  414,
            #             422,  426,  428,  430,  448,  452,  454,  462,  489,  499,  501,  502,
            #             507,  513,  515,  526,  528,  530,  536,  539,  540,  544,  549,  551,
            #             566,  570,  578,  579,  586,  589,  590,  602,  621,  627,  634,  635,
            #             642,  647,  650,  656,  663,  665,  672,  673,  680,  685,  694,  702,
            #             707,  708,  721,  725,  726,  730,  731,  736,  746,  753,  754,  757,
            #             765,  767,  775,  782,  790,  792,  793,  794,  795,  796,  809,  815,
            #             821,  822,  823,  824,  846,  849,  857,  858,  866,  867,  868,  873,
            #             878,  880,  889,  890,  896,  900,  903,  904,  910,  912,  915,  917,
            #             919,  923,  924,  926,  929,  933,  934,  940,  941,  943,  945,  947,
            #             951,  959,  971,  972,  973,  982,  983,  986, 1007, 1009, 1024, 1027,
            #             1034, 1045, 1049, 1051, 1060, 1064, 1065, 1072, 1073, 1074, 1076, 1078,
            #             1080, 1084, 1085, 1091, 1097, 1102, 1105, 1106, 1108, 1114, 1122, 1124,
            #             1131, 1144, 1146, 1150, 1151, 1166, 1168, 1177, 1178, 1183, 1185, 1192,
            #             1193, 1197, 1198, 1210, 1218, 1235, 1236, 1237, 1244, 1245, 1246]

            train_idx = [ 1, 2, 3, 4, 5, 7, 8, 9, 11, 12, 13, 14, 15, 16, 18, 19, 21, 23, 24, 26, 27, 28, 31, 32, 34, 35, 36, 37, 38,
                          39, 40, 41, 42, 43, 44, 45, 46, 48, 49, 50, 51, 53, 54, 59, 60, 61, 62, 63, 64, 66, 67, 69, 71, 74, 75, 77, 
                          78, 79, 80, 81, 83, 84, 85, 86, 88, 91, 93, 94, 95, 96, 99, 100, 102, 103, 105, 106, 107, 108, 109, 110, 112, 
                          113, 114, 115, 116, 117, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 132, 133, 351, 352, 353,
                          354, 355, 356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367, 368, 369, 370, 371, 372, 373, 374, 375,
                          376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397,
                          398, 399, 400, 401, 402, 403, 404,405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 
                          420, 421, 422, 423, 424, 425, 426, 427, 428, 429, 430]
            
            val_idx = [ 0, 6, 10, 17, 20, 22, 25, 29, 30, 33, 47, 52, 55, 56, 57, 58, 65, 68, 70, 72, 73, 76, 82, 87, 89, 90, 92, 97, 98,
                        101, 104, 111, 118, 131, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 
                        152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174,
                        175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197,
                        198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220,
                        221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 
                        244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266,
                        267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 
                        290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311, 312,
                        313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 
                        336, 337, 338,339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350]


            orig_lbl, meta = get_split(orig_lbl, val_idx), get_split(meta, val_idx)
            self.kwargs.update({"orig_lbl": orig_lbl, "meta": meta})
            self.train_imgs, self.train_lbls = get_split(imgs, train_idx), get_split(lbls, train_idx)
            self.val_imgs, self.val_lbls = get_split(imgs, val_idx), get_split(lbls, val_idx)
            # Assuming self.val_imgs and self.val_lbls are lists of file paths
            # Iterate over each image-label pair and write them to a text file
            
            with open("/media/workstation04/New Volume/MMMAI/NVIDIA_PED_Trial/Uncertainty_sampling160/training_image_label_paths.txt", "w") as file:
                for img_path, lbl_path in zip(self.train_imgs, self.train_lbls):
                    file.write(f"Image: {img_path}\tLabel: {lbl_path}\n")

            with open("/media/workstation04/New Volume/MMMAI/NVIDIA_PED_Trial/Uncertainty_sampling160/val_image_label_paths.txt", "w") as file:
                for img_path, lbl_path in zip(self.val_imgs, self.val_lbls):
                    file.write(f"Image: {img_path}\tLabel: {lbl_path}\n")

            if self.args.gpus > 1:
                rank = int(os.getenv("LOCAL_RANK", "0"))
                self.val_imgs = self.val_imgs[rank :: self.args.gpus]
                self.val_lbls = self.val_lbls[rank :: self.args.gpus]
        else:
            self.kwargs.update({"meta": test_meta})
        print0(f"{len(self.train_imgs)} training, {len(self.val_imgs)} validation, {len(self.test_imgs)} test examples")

    def train_dataloader(self):
        return fetch_dali_loader(self.train_imgs, self.train_lbls, self.args.batch_size, "train", **self.kwargs)

    def val_dataloader(self):
        return fetch_dali_loader(self.val_imgs, self.val_lbls, 1, "eval", **self.kwargs)

    def test_dataloader(self):
        if self.kwargs["benchmark"]:
            return fetch_dali_loader(self.train_imgs, self.train_lbls, self.args.val_batch_size, "test", **self.kwargs)
        return fetch_dali_loader(self.test_imgs, None, 1, "test", **self.kwargs)


def get_split(data, idx):
    return list(np.array(data)[idx])


def load_data(path, files_pattern, non_empty=True):
    data = sorted(glob.glob(os.path.join(path, files_pattern)))
    # if non_empty:
    #     assert len(data) > 0, f"No data found in {path} with pattern {files_pattern}"
    return data


def get_kfold_splitter(nfolds):
    return KFold(n_splits=nfolds, shuffle=True, random_state=12345)


def get_test_fnames(args, data_path, meta=None):
    kfold = get_kfold_splitter(args.nfolds)
    test_imgs = load_data(data_path, "*_x.npy", non_empty=False)
    if args.exec_mode == "predict" and "val" in data_path:
        _, val_idx = list(kfold.split(test_imgs))[args.fold]
        test_imgs = sorted(get_split(test_imgs, val_idx))
        if meta is not None:
            meta = sorted(get_split(meta, val_idx))
    return test_imgs, meta


def get_data_path(args):
    if args.data != "/data":
        return args.data
    data_path = os.path.join(args.data, get_task_code(args))
    if args.exec_mode == "predict" and not args.benchmark:
        data_path = os.path.join(data_path, "test")
    return data_path
