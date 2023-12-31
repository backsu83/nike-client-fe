// const BASE_URL = "http://localhost:5000/" //https://nike-by-hongdae.du.r.appspot.com/"
// const BASE_URL = "http://nsh-2f.event-pages.com:5000/"
const BASE_URL = "https://nsh-2f-flask.event-pages.com/"

// 공통적으로 사용하는 경우, request 정의.
const request = async (
    path,
    body = {},
    headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'no-cors',
    },
    method = 'GET'
) => {
    return (await fetch(BASE_URL + path + ((body && method.toLowerCase() === 'get') ? Object.entries(body).map(([key, value]) => (key + '=' + value)).join('&') : ''), {
        method,
        headers,
        body: method.toLowerCase() === 'get' ? null : JSON.stringify(body)
    })).json()
}

// 일반 GET, POST, PUT, DELETE 경우 request 사용하여 정의
const getProducts = () => request('product');
const getAssets = (custom_id) => request(`asset${custom_id ? `?custom_id=${custom_id}` : ""}`);
const postAssets = (category, price, img, name, img_back) => {
    // if (!category || !price || !img || !name )
    // throw new Error('asset 필수 입력 누락')
    return request('asset', {
        asset: {
            category, price, img, name, img_back
        }
    }, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": 'no-cors'
    }, "POST")
}


// Form 경우 fetch 정의
const uploadImage = async images => {
    console.log(images)
    const {url} = (
        await fetch(BASE_URL + 'signed', {
            method: 'POST',
            headers: {
                // content type = multipart를 넣지 않고 서버에서 해석 하도록 Content-type 정의 하지 않음
                'Access-Control-Allow-Origin': 'no-cors'
            },
            body: images
        })
    ).json()
    return url;
}

const postOrder = (name, phone, is_agreed, option_id, category, assets, img, img_back, work_img, work_img_back) => {
    if (!phone || !is_agreed || !category || !assets || !img)
        throw new Error('order 필수 입력 누락')
    return request('order', {
        order: {
            name, phone, is_agreed, option_id, category, assets, img, img_back, work_img, work_img_back
        }
    }, {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": 'no-cors'
    }, "POST")
}


const API = {
    uploadImage,
    getProducts,
    getAssets,
    postOrder,
    postAssets
}

export {
    uploadImage,
    getProducts,
    getAssets,
    postOrder,
    postAssets
}

export default API
