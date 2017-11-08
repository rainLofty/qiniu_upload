/*获取uptoken步骤
*1 确定上传策略
*2 将上传策略序列化成为json格式
*3 对json序列化后的上传策略进行URL安全的Base64编码,得到encoded
*4 用SecretKey对编码后的上传策略进行HMAC-SHA1加密，并且做URL安全的Base64编码,得到encoded_signed
*5 将 AccessKey、encode_signed 和 encoded 用 “:” 连接起来,得到UploadToken
*/

 var getToken = function(accessKey, secretKey, putPolicy) {

        //SETP 2
        var put_policy = JSON.stringify(putPolicy);

        var base64 = new Base64();
        var encoded = base64.encode(putPolicy);
        //SETP 4
        var hash = CryptoJS.HmacSHA1(encoded, secretKey);
        var encoded_signed = hash.toString(CryptoJS.enc.Base64);
        encoded_signed = encoded_signed.replace(/\//g,'_');

        //SETP 5
        var upload_token = accessKey + ":" + encoded_signed + ":" + encoded;
        return upload_token;

};

