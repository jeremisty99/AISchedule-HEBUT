async function scheduleTimer() {
    // 支持异步操作 推荐await写法
    await loadTool('AIScheduleTools')
    const {
        AIScheduleAlert,
    } = AIScheduleTools()
    // await AIScheduleAlert('这是一条提示信息')
    var html = document.getElementById('courseTableBody').innerHTML;
    var place = 0; //0为北辰 1为红桥
    if (html.indexOf("红桥") != -1) {
        place = 1;
    }
    console.log(place);
    // 返回时间配置JSON，所有项都为可选项，如果不进行时间配置，请返回空对象
    var timer_beichen = {
        totalWeek: 20, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: false, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 3, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:30', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '09:15' // 结束时间：同上
            },
            {
                section: 2,
                startTime: '09:20',
                endTime: '10:05'
            },
            {
                section: 3,
                startTime: '10:25',
                endTime: '11:10'
            },
            {
                section: 4,
                startTime: '11:15',
                endTime: '12:00'
            },
            {
                section: 5,
                startTime: '14:00',
                endTime: '14:45'
            },
            {
                section: 6,
                startTime: '14:50',
                endTime: '15:35'
            },
            {
                section: 7,
                startTime: '15:55',
                endTime: '16:40'
            },
            {
                section: 8,
                startTime: '16:45',
                endTime: '17:30'
            },
            {
                section: 9,
                startTime: '18:40',
                endTime: '19:25'
            },
            {
                section: 10,
                startTime: '19:30',
                endTime: '20:15'
            },
            {
                section: 11,
                startTime: '20:20',
                endTime: '21:05'
            }
        ]
    }
    var timer_hongqiao = {
        totalWeek: 20, // 总周数：[1, 30]之间的整数
        startSemester: '', // 开学时间：时间戳，13位长度字符串，推荐用代码生成
        startWithSunday: false, // 是否是周日为起始日，该选项为true时，会开启显示周末选项
        showWeekend: false, // 是否显示周末
        forenoon: 4, // 上午课程节数：[1, 10]之间的整数
        afternoon: 4, // 下午课程节数：[0, 10]之间的整数
        night: 3, // 晚间课程节数：[0, 10]之间的整数
        sections: [{
                section: 1, // 节次：[1, 30]之间的整数
                startTime: '08:20', // 开始时间：参照这个标准格式5位长度字符串
                endTime: '09:05' // 结束时间：同上
            },
            {
                section: 2,
                startTime: '09:10',
                endTime: '09:55'
            },
            {
                section: 3,
                startTime: '10:25',
                endTime: '11:10'
            },
            {
                section: 4,
                startTime: '11:15',
                endTime: '12:00'
            },
            {
                section: 5,
                startTime: '14:00',
                endTime: '14:45'
            },
            {
                section: 6,
                startTime: '14:50',
                endTime: '15:35'
            },
            {
                section: 7,
                startTime: '16:05',
                endTime: '16:50'
            },
            {
                section: 8,
                startTime: '16:55',
                endTime: '17:40'
            },
            {
                section: 9,
                startTime: '18:40',
                endTime: '19:25'
            },
            {
                section: 10,
                startTime: '19:30',
                endTime: '20:15'
            },
            {
                section: 11,
                startTime: '20:20',
                endTime: '21:05'
            }
        ]
    }
    if (place == 1) {
        return timer_hongqiao;
    } else {
        return timer_beichen;
    }
}