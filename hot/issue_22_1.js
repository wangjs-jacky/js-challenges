const str = `
// hello world

/* 
  hello world
aaa */

/* hello world */

let a = 1; //  这段是注释
let b = 2;

`

const NEWLINE = /\r\n|[\n\r\u2028\u2029]/;
const lines = str.split(NEWLINE);

const reomveComment = (strArr) => {
  /* 多行情况 */
  let effectTag = [];
  let multiCommentStart = false;

  for (let i = 0; i < strArr.length; i++) {
    if (/\/\//.test(strArr[i])) {
      effectTag.push({ index: i, tag: "singleComment" });
      continue;
    }

    if (/\/\*/.test(strArr[i]) && /\*\//.test(strArr[i])) {
      effectTag.push({ index: i, tag: "singleComment" });
      continue;
    }

    /* 多行开始  */
    if (/\/\*/.test(strArr[i])) {
      effectTag.push({ index: i, tag: "muilteComment" });
      multiCommentStart = true;
      continue;
    }

    /* 多行结束  */
    if (/\*\//.test(strArr[i])) {
      effectTag.push({ index: i, tag: "muilteComment" });
      multiCommentStart = false;
      continue;
    };

    /* 多行中部记录 */
    if (multiCommentStart) {
      effectTag.push({ index: i, tag: "muilteComment" });
      continue;
    };
  }

  effectTag.forEach((cur) => {
    if (cur.tag === "singleComment") {
      strArr[cur.index] = strArr[cur.index].replace(/\/\/.*/, "").replace(/\/\*.*\*\//, "");
    } else if (cur.tag === "muilteComment") {
      strArr[cur.index] = "";
    }
  })

  return strArr.filter(Boolean).join("\n");
}

console.log(reomveComment(lines));



