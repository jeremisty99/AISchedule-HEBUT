async function scheduleHtmlProvider(dom = document) {
    await loadTool('AIScheduleTools')
    const {
        AIScheduleAlert
    } = AIScheduleTools()
    await loadTool('AIScheduleTools')
    // 模拟Alert
    await AIScheduleAlert('欢迎使用HEBUT小爱课程表教务处导入,如遇到导入失败等情况请联系QQ:865957991')
    return dom.getElementById('courseTableBody').innerHTML;
}