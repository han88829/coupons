// 请求连接前缀
let _HOST = 'http://127.0.0.1:7001';
// 线上环境 production
if (process.env.NODE_ENV != "development") {
    _HOST = 'https://tool.gotojs.cn';
}

export const HOST = _HOST;



export default async ({
    url = "",
    method = 'GET',
    data = {},
    header = {},
    loading = ""
}) => {

    try {
        loading && uni.showLoading({
            title: loading,
            mask: true
        });


        const [_, res] = await uni.request({
            url: _HOST + url,
            data,
            method: method.toUpperCase(),
            header: {
                ...header,
                'Content-Type': 'application/json'
            }
        });

        uni.hideLoading();
        return res.data

    } catch (error) {
        console.log('错误', error);
        uni.hideLoading();
    }
}