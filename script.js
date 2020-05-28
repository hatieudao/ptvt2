const A = document.getElementById("A");
const B = document.getElementById("B");
const C = document.getElementById("C");
const a = document.getElementById("a");
const b = document.getElementById("b");
const a2 = document.getElementById("a2");
const b2 = document.getElementById("b2");
const c2 = document.getElementById("c2");
const alpha = document.getElementById("alpha");
const sub = document.getElementById("submit");
const result = document.getElementById("result");

let valA = '';
let valB = '';
let valC = '';
const reset = () => {
    xc0.value = null;
    xc1.value = null;
    xc2.value = null;
    yxc0.value = null;
    yxc1.value = null;
    yxc2.value = null;
}
const init = () => {
    if (sessionStorage.length === 0) return;
    A.value = sessionStorage.getItem("A1");
    B.value = sessionStorage.getItem("B1");
    C.value = sessionStorage.getItem("C1");
    a.value = sessionStorage.getItem("a1");
    b.value = sessionStorage.getItem("b1");
    alpha.value = sessionStorage.getItem("alp");
    a2.value = sessionStorage.getItem("a_2");
    b2.value = sessionStorage.getItem("b_2");
    c2.value = sessionStorage.getItem("c_2");
}
a2.addEventListener("keyup", (e) => {
    if (a2.value || b2.value || c2.value) {
        a.style.display = "none";
        b.style.display = "none";
    }
    else {
        a.style.display = "block";
        b.style.display = "block";
    }
});
b2.addEventListener("keyup", (e) => {
    if (a2.value || b2.value || c2.value) {
        a.style.display = "none";
        b.style.display = "none";
    }
    else {
        a.style.display = "block";
        b.style.display = "block";
    }
});
c2.addEventListener("keyup", (e) => {
    if (a2.value || b2.value || c2.value) {
        a.style.display = "none";
        b.style.display = "none";
    }
    else {
        a.style.display = "block";
        b.style.display = "block";
    }
});
a.addEventListener("keyup", (e) => {
    if (a.value || b.value) {
        a2.style.display = "none";
        b2.style.display = "none";
        c2.style.display = "none";
    }
    else {
        a2.style.display = "block";
        b2.style.display = "block";
        c2.style.display = "block";
    }
});
b.addEventListener("keyup", (e) => {
    if (a.value || b.value) {
        a2.style.display = "none";
        b2.style.display = "none";
        c2.style.display = "none";
    }
    else {
        a2.style.display = "block";
        b2.style.display = "block";
        c2.style.display = "block";
    }
});
const saveData = (A1, B1, C1, alp, a1, b1, a_2, b_2, c_2) => {
    sessionStorage.setItem("A1", A1);
    sessionStorage.setItem("B1", B1);
    sessionStorage.setItem("C1", C1);
    sessionStorage.setItem("a1", a1);
    sessionStorage.setItem("b1", b1);
    sessionStorage.setItem("alp", alp);
    sessionStorage.setItem("a_2", a_2);
    sessionStorage.setItem("b_2", b_2);
    sessionStorage.setItem("c_2", c_2);
}

sub.addEventListener("click", () => {
    valA = +(A.value);
    valB = +(B.value);
    valC = +(C.value);
    let alp = +(alpha.value);
    const ans = solveDelta(valA, valB, valC);

    let ydt = '';
    let C_1 = 'C<sub>1</sub>';
    let C_2 = 'C<sub>2</sub>';

    result.classList.add("showResult");

    if (ans[0] === 1) ydt = ` ${C_1}</sub>e<sup >${form(ans[1], 1)}x</sup> + ${C_2}</sub>e<sup >${form(ans[2], 1)}x</sup> `;
    if (ans[0] === 2) ydt = ` ${C_1}</sub>e<sup >${form(ans[1], 1)}x</sup> + x${C_2}</sub>e<sup>${form(ans[1], 1)}x</sup> `;
    if (ans[0] === 3) ydt = ` e<sup>${form(ans[1], 1)}x</sup>( ${C_1}</sub>sin(${form(ans[2], 1)}x) + ${C_2}</sub>cos(${form(ans[2], 1)}x)) `;

    let n = 0;
    if (ans[0] !== 3) {
        if (alp === ans[1]) ++n;
        if (alp === ans[2]) ++n;
    }

    let a_2 = +(a2.value);
    if (a_2) {
        let b_2 = +(b2.value);
        let c_2 = +(c2.value);

        const res_2 = solveYp2(valA, valB, valC, alp, a_2, b_2, c_2, n);
        let rpar_2 = '';

        if (alp !== 0) {
            if (alp === 1) rpar_2 += `e<sup>x</sup>`;
            else if (alp === -1) rpar_2 += `e<sup>-x</sup>`;
            else rpar_2 += `e<sup >${alp}x</sup>`;
        }
        if (res_2[0] === 0 && res_2[1] === 1);
        else {
            rpar_2 += '(';
            if (res_2[0] !== 0) rpar_2 += `${form(res_2[0], 1)}x<sup>2</sup>`;
            if (res_2[1] !== 0) rpar_2 += `${form(res_2[1], 2)}x`;
            if (res_2[2] !== 0) rpar_2 += `${form(res_2[2], 2)}`;
            rpar_2 += ')';
        }
        result.innerHTML = `<p>y =  ${ydt} + ${rpar_2}</p>`;
        saveData(valA, valB, valC, alp, '', '', a_2, b_2, c_2);
        return;
    }
    // giai pt P_n(x) bac 1
    let a1 = +(a.value);
    let b1 = +(b.value);


    saveData(valA, valB, valC, alp, a1, b1, '', '', '');
    if (!a1 && !b1) b1 = 1;
    const res = solveYp1(valA, valB, valC, alp, a1, b1, n);

    let rpar = '';
    if (res[0] === 'not exist') rpar = 'Vô Nghiệm';
    else {
        if (alp !== 0) {
            if (alp === 1) rpar += `e<sup>x</sup>`;
            else if (alp === -1) rpar += `e<sup>-x</sup>`;
            else rpar += `e<sup >${alp}x</sup>`;
        }
        if (res[0] === 0 && res[1] === 1);
        else {
            rpar += '(';
            if (res[0] !== 0) rpar += `${form(res[0], 1)}x`;
            if (res[1] !== 0) rpar += `${form(res[1], 2)}`;
            rpar += ')';
        }
    }

    if (rpar !== 'Vô Nghiệm') {
        result.classList.add("showResult");
        result.innerHTML = `<p>y =  ${ydt} +${rpar}</p>`;
    }
    else {
        result.innerText = rpar;
        result.classList.add("danger-nof");
    }
});
const form = (num, pos) => {
    if (pos === 1) {
        if (num === 1) return '';
        if (num === -1) return '-';
        return num;
    }
    if (num === 1) return '+1';
    if (num === -1) return '-1';
    if (num > 0) return `+${num}`;
    return num;
}
const solveDelta = (a, b, c) => {
    let del = b * b - 4 * a * c;
    if (del > 0) return [1, (-b - Math.sqrt(del)) / (2 * a), (-b + Math.sqrt(del)) / (2 * a)];
    if (del === 0) return [2, -b / (2 * a), -b / (2 * a)];
    return [3, -b / (2 * a), Math.sqrt(-del) / (2 * a)];
}
const solveB12 = (a, b, c, d, e, f) => {
    let del = a * e - b * d;
    let delX = c * e - b * f;
    let delY = a * f - c * d;
    if (del === 0) {
        if (!delX || !delY) return ['not exist'];
        if (delX === delY && delX === 0) return ['u', 'v'];
    }
    return [delX / del, delY / del];
}
const solveYp1 = (A1, B1, C1, alp, a1, b1, n) => {

    let ans = [];

    if (n === 0) {
        let a0 = a1 / (C1 + alp * B1 + alp * alp * A1);
        let b0 = (b1 - a0 * B1 - 2 * a0 * alp * A1) / (C1 + alp * B1 + alp * alp * A1);
        ans = [a0, b0];
    }
    if (n === 1) {
        let n0 = solveB12(4 * alp * A1 + 2 * B1, C1 + alp * B1 + alp * alp * A1, a1, 2 * A1, B1 + 2 * A1 * alp, b1);
        let t1 = alp * alp * A1 + alp * B1 + C1;
        if (!t1) ans = n0;
        else ans = ['not exist'];
    }
    if (n === 2) {
        let b0 = b1 / (2 * A1);
        let a0 = (a1 - 2 * B1 * b0 + 4 * b0 * alp * A1) / (6 * A1);
        let t1 = alp * alp * a0 * A1 + alp * a0 * B1 + a0 * C1;
        let t2 = 6 * alp * a0 * A1 + alp * alp * b0 * A1 + 3 * a0 * B1 + B1 * alp * b0 + b0 * C1;
        if (!t1 && !t2) ans = [a0, b0];
        else ans = ['not exist'];
    }
    return ans;
}

const solveYp2 = (A1, B1, C1, alp, a2, b2, c2, n) => {
    let ans = [];
    if (n === 0) {
        let u = a2 / (A1 * alp * alp + B1 * alp + C1);
        let v = (b2 - u * (4 * alp * A1 + 2 * B1)) / (A1 * alp * alp + B1 * alp + C1);
        let t = (c2 - 2 * A1 * u - (2 * A1 * alp + B1) * v) / (A1 * alp * alp + B1 * alp + C1);
        ans = [u, v, t];
    }
    if (n === 1) {
        let u = a2 / (6 * A1 * alp + 3 * B1);
        let v = (b2 - 6 * A1 * u) / (4 * alp * A1 + 2 * B1);
        let t = (c2 - 2 * A1 * v) / (2 * alp * A1 + B1);
        ans = [u, v, t];
    }
    if (n === 2) {
        let t = c2 / (2 * A1);
        let v = (b2 - (4 * A1 * alp + 2 * B1) * t) / (6 * A1);
        let u = (a2 - (6 * A1 * alp + 3 * B1) * v) / (12 * A1);
        ans = [u, v, t];
    }
    return ans;
}

init();

const member = document.getElementById("member");
const infor = document.getElementById("infor");
member.addEventListener("click", () => {
    const show = infor.style.display;
    if (show === "none") infor.style.display = "block";
    else infor.style.display = "none";
})