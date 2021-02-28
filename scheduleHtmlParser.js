function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    //以下为示例，您可以完全重写或在此基础上更改
    var result = {
        "courseInfos": [],
        "sectionTimes": [{
                "section": 1,
                "startTime": "08:30",
                "endTime": "09:15"
            },
            {
                "section": 2,
                "startTime": "09:20",
                "endTime": "10:05"
            },
            {
                "section": 3,
                "startTime": "10:25",
                "endTime": "11:10"
            },
            {
                "section": 4,
                "startTime": "11:15",
                "endTime": "12:00"
            },
            {
                "section": 5,
                "startTime": "14:00",
                "endTime": "14:45"
            },
            {
                "section": 6,
                "startTime": "14:50",
                "endTime": "15:35"
            },
            {
                "section": 7,
                "startTime": "15:55",
                "endTime": "16:40"
            },
            {
                "section": 8,
                "startTime": "16:45",
                "endTime": "17:30"
            },
            {
                "section": 9,
                "startTime": "18:40",
                "endTime": "19:25"
            },
            {
                "section": 10,
                "startTime": "19:30",
                "endTime": "20:15"
            },
            {
                "section": 11,
                "startTime": "20:20",
                "endTime": "21:05"
            }
        ]

    };
    $('#courseTableBody tr').each(function (i) {
        $(this).children('td').each(function (j) {
            if (($(this).text() != "。") && ($(this).text() != "")) {
                var num = JSON.stringify($(this).html().match("classnum=\"\\d+\"")).match(/[0-9]/ig);
                var str = [];
                var unique = 0;
                $(this).find('p').each(function (k) {
                    str[k] = $(this).text();
                    if (k % 5 == 0 && k != 0)
                        unique++;
                });
                for (var q = 0; q < unique + 1; q++) {
                    str[q * 5] = str[q * 5].split("_")[0];
                    str[q * 5 + 1] = str[q * 5 + 1].replace(/[a-zA-Z]+/, "");
                    str[q * 5 + 1] = str[q * 5 + 1].replace("\*", "");
                    str[q * 5 + 1] = str[q * 5 + 1].replace(/(\s*$)/g, "");
                    str[q * 5 + 4] = str[q * 5 + 4].replace("天津北辰", "");
                    str[q * 5 + 4] = str[q * 5 + 4].replace("教学楼12", "");
                    var weeks = [];
                    dan = str[q * 5 + 2].match(/\d+-\d+周单周/g);
                    if (dan != null) {
                        for (var a = 0; a < dan.length; a++) {
                            str[q * 5 + 2] = str[q * 5 + 2].replace(dan[a], "");
                            dan[a].replace("周单周", "");
                            var begin = parseInt(dan[a].split("-")[0]);
                            var end = parseInt(dan[a].split("-")[1]);
                            for (var m = begin; m < end + 1; m++) {
                                if (m % 2 == 1)
                                    weeks.push(m);
                            }
                        }
                    }
                    shuang = str[q * 5 + 2].match(/\d+-\d+周双周/g);
                    if (shuang != null) {
                        for (var a = 0; a < shuang.length; a++) {
                            str[q * 5 + 2] = str[q * 5 + 2].replace(shuang[a], "");
                            shuang[a].replace("周双周", "");
                            var begin = parseInt(shuang[a].split("-")[0]);
                            var end = parseInt(shuang[a].split("-")[1]);
                            for (var m = begin; m < end + 1; m++) {
                                if (m % 2 == 0)
                                    weeks.push(m);
                            }
                        }
                    }
                    single = str[q * 5 + 2].match(/第\d+周/g);
                    if (single != null) {
                        str[q * 5 + 2] = str[q * 5 + 2].replace(single[0], "");
                        single[0] = single[0].replace("第", "").replace("周", "");
                        weeks.push(parseInt(single[0]));
                    }
                    if (str[q * 5 + 2] != "") {
                        str[q * 5 + 2] = str[q * 5 + 2].replace("周", "");
                        var subWeek = str[q * 5 + 2].split(",");
                        for (var l = 0; l < subWeek.length; l++) {
                            if (!subWeek[l].includes("-")) {
                                for (var m = 0; m < subWeek.length; m++) {
                                    weeks.push(subWeek[m]);
                                }
                                break;
                            }
                        }
                        if (subWeek != null) {
                            for (var l = 0; l < subWeek.length; l++) {
                                var week = subWeek[l];
                                if (week != "") {
                                    var begin = parseInt(week.split("-")[0]);
                                    var end = parseInt(week.split("-")[1]);
                                    for (var m = begin; m < end + 1; m++) {
                                        weeks.push(m);
                                    }
                                }
                            }
                        }
                    }
                    var sectionArr = [];
                    for (var s = 0; s < num; s++) {
                        var itemSection = {
                            "section": i + 1 + s,
                        };
                        sectionArr.push(itemSection);
                    }
                    var course = {
                        "name": str[q * 5],
                        "teacher": str[q * 5 + 1],
                        "position": str[q * 5 + 4],
                        "weeks": weeks,
                        "day": j + 1,
                        "sections": sectionArr
                    };
                    result.courseInfos.push(course);
                }
            }
        });
    });
    console.log(result);
    return result;
}