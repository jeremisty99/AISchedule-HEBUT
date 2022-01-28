function scheduleHtmlParser(html) {
    var courseInfos = [];
    $("tr").each(function (i) {
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
                    str[q * 5 + 4] = str[q * 5 + 4].replace("天津红桥", "");
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
                    with_di = str[q * 5 + 2].match(/第\d+周/g);
                    if (with_di != null) {
                        str[q * 5 + 2] = str[q * 5 + 2].replace(with_di[0], "");
                        with_di[0] = with_di[0].replace("第", "").replace("周", "");
                        weeks.push(parseInt(with_di[0]));
                    }
                    without_di = str[q * 5 + 2].match(/\d+周/g);
                    if (without_di != null && !str[q * 5 + 2].includes("-")) {
                        str[q * 5 + 2] = str[q * 5 + 2].replace(without_di[0], "");
                        without_di[0] = without_di[0].replace("周", "");
                        weeks.push(parseInt(without_di[0]));
                    }
                    if (str[q * 5 + 2] != "") {
                        str[q * 5 + 2] = str[q * 5 + 2].replace("周", "");
                        var subWeek = str[q * 5 + 2].split(",");
                        console.log(subWeek);
                        for (var l = 0; l < subWeek.length; l++) {
                            if (!subWeek[l].includes("-") && subWeek[l] != "") {
                                weeks.push(subWeek[l]);
                            } else {
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
                    courseInfos.push(course);
                }
            }
        });
    });
    return courseInfos;
}