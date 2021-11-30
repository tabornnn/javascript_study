"use strict";
// Step1
コールバック地獄
setTimeout(function () {
       console.log('2000ms秒経過');
       setTimeout(function () {
              console.log("2000ms秒けいか")
       }, 2000)
}, 2000);

// Step2
// Promiseの基本的な使い方
const promise = new Promise((resolve, reject) => {
       // resolve();
       reject();
}).then(() => {
       console.log("resolveしたよ");
}).catch(() => {
       console.log("rejectしたよ");
       console.log(promise);
});

// Promiseの応用的な使い方
const promise1 = new Promise((resolve) => {
       setTimeout(() => {
              resolve();
       }, 1000);
}).then(() => {
       console.log("promise1おわったよ！");
});

const promise2 = new Promise((resolve) => {
       setTimeout(() => {
              resolve();
       }, 3000);
}).then(() => {
       console.log("promise2おわったよ！");
});

// promise1とpromise2が全て終わったことを確認してから処理が動く。
Promise.all([promise1, promise2]).then(() => {
       console.log("全部おわったよ！");
});


// Step3
// Promiseの実用的な使い方
function getNumber(num) {
       return new Promise(function (resolve, reject) {
              // numが3以上ならnumを返し、3未満なら"Falied!"のメッセージを返す
              if (num >= 3) {
                     setTimeout(function () {
                            resolve(num);
                     }, 1000);
              } else {
                     reject("Falied!");
              }
       });
}

// 今回は3を渡しているので、resolveから3が返ってくる
getNumber(3).then(function (result) {
       console.log(result);
       //numに3を加算して、getNumberに返している
       return result + 3;
}).then(function (result) {
       //上と同じ処理の繰り返し。これがチェイン
       console.log(result);
       return result + 3;
}).then(function (result) {
       // 最終結果として、numに6を加算した数を表示
       console.log(result);
}, function (err) {
       // 3未満の場合はrejectが呼び出され、"Falied!"のメッセージが表示される
       console.log(err);
});


// Step4 async　awaitを利用
// https://rightcode.co.jp/blog/information-technology/javascript-async-await
const promiseFunc = value => {
       return new Promise((resolve, reject) => {
              setTimeout(() => {
                     resolve(value * 2);
              }, 1000);
       });
};

// 非同期関数
async function asyncFunc() {
       // 並行して処理が実行され、全ての処理が終わるまで待機
       const values = await Promise.all([
              promiseFunc(1),
              promiseFunc(2),
              promiseFunc(3)
       ]);

       console.log(values);
}

asyncFunc();