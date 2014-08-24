function deflate(val) {
    val = encodeURIComponent(val); // UTF16 → UTF8
    val = zip_deflate(val); // 圧縮
    val = btoa(val); // base64エンコード
    return val;
}

function inflate(val) {
    val = atob(val); // base64デコード
    val = zip_inflate(val); // 復号
    val = decodeURIComponent(val); // UTF8 → UTF16
    return val;
}