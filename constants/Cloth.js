let Clothes = [
    {
        name: "Áo sơ mi nữ xanh",
        size: 'M',
        height: "1m6",
        weight: '55kg',
        usedTime: '2 years',
        price: '30,000 VND',
        available: 1,
        seller: 1,
        imgSource: "https://canifa.s3.amazonaws.com/media/catalog/product/cache_generated/500x/6th19w013-sj527-51_thumb_.jpg",
        tag: [
            "shirt",
            "blue",
            "work",
        ]
    },
    {
        name: "Váy trắng",
        size: 'M',
        height: "1m6",
        weight: '55kg',
        usedTime: '2 years',
        price: '30,000 VND',
        available: 1,
        seller: 2,
        imgSource: "https://media3.scdn.vn/img3/2019/4_5/WZVc0y_simg_de2fe0_500x500_maxb.jpg",
        tag: [
            "skirt",
            "white",
            "short",
        ]
    },
    {
        name: "Quần short nâu",
        size: 'L',
        height: "1m6",
        weight: '60kg',
        usedTime: '1 years',
        price: '30,000 VND',
        available: 1,
        seller: 3,
        imgSource: "data:image/jpeg;base64,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",
        tag: [
            "brown",
            "short",
        ]
    },
    {
        name: "Áo kiểu đen",
        size: 'S',
        height: "1m5",
        weight: '46kg',
        usedTime: '2 years',
        price: '30,000 VND',
        available: 1,
        seller: 1,
        imgSource: "https://www.thivi.vn/images/product/2200/01a18.jpg",
        tag: [
            "black",
            "shirt",
            "fashion"
        ]
    },
    {
        name: "Áo 2 dây đen",
        size: 'S',
        height: "1m5",
        weight: '46kg',
        usedTime: '2 years',
        price: '30,000 VND',
        available: 1,
        seller: 3,
        imgSource: "https://scontent.fsgn3-1.fna.fbcdn.net/v/t1.15752-9/108012281_2750074085318229_7619223517156022396_n.jpg?_nc_cat=111&_nc_sid=b96e70&_nc_ohc=SfG6YMiqonEAX-YtmOK&_nc_ht=scontent.fsgn3-1.fna&oh=0667144ad8a74bdb119057bc0d234f94&oe=5F37EB02",
        tag: [
            "black",
            "shirt",
            "fashion"
        ]
    },
    {
        name: "Áo hoodie xanh",
        size: 'L',
        height: "1m6",
        weight: '60kg',
        usedTime: '4 years',
        price: '30,000 VND',
        available: 1,
        seller: 1,
        imgSource: "https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.15752-9/108664008_1212380705762913_181131300152151149_n.jpg?_nc_cat=101&_nc_sid=b96e70&_nc_ohc=rz930wkvzD0AX-KfRAs&_nc_ht=scontent.fsgn4-1.fna&oh=4aa9e30a1d9f7171cff29259ce0b5a90&oe=5F3929C1",
        tag: [
            "green",
            "shirt",
            "fashion"
        ]
    },
];

export default Clothes;