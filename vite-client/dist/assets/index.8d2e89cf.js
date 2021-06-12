import{S as e,R as t,D as a,a as r,L as n,i as o,B as s,b as c,c as l,d as m}from"./vendor.4ba86e08.js";const d=e.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,onOpen:t=>{t.addEventListener("mouseenter",e.stopTimer),t.addEventListener("mouseleave",e.resumeTimer)}}),i=(e,t)=>{d.fire({icon:e,title:t})};function u(e){const r=t.createRef(),n=t.createRef();return t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Login"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"player"},"Your name"),t.createElement("input",{type:"text",name:"text",id:"player",autoFocus:!0,placeholder:" ercode",ref:r})),t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"password"},"Password"),t.createElement("input",{type:"password",name:"password",id:"password",placeholder:" your password",ref:n})),t.createElement("button",{onClick:()=>{const t=r.current.value,o=n.current.value;a.post("/login",{name:t,password:o}).then((t=>{i("success",t.data.message),console.log(t.data),t.data.token&&(localStorage.setItem("Auth_token",t.data.token),e.history.push("/dashboard"))})).catch((e=>{i("error",e.res.data.message)}))}},"Sign in")))}function p(e){const r=t.createRef(),n=t.createRef();return t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Register"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"player"},"Your name"),t.createElement("input",{type:"text",name:"text",id:"player",autoFocus:!0,placeholder:" ercode",ref:r})),t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"password"},"Password"),t.createElement("input",{type:"password",name:"password",id:"password",placeholder:" your password",ref:n})),t.createElement("button",{onClick:()=>{const t=r.current.value,o=n.current.value;a.post("/register",{name:t,password:o}).then((t=>{i("success",t.data.message),console.log(t.data),e.history.push("/login")})).catch((e=>{i("error",e.res.data.message)}))}},"Sign up")))}function E(){const[e,o]=r.exports.useState([]),s=async()=>{try{const{data:e}=await a.get("/rooms",{headers:{auth:localStorage.getItem("Auth_token")}});o(e)}catch(e){setTimeout(s,3e3)}};return r.exports.useEffect((()=>{s()}),[]),t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Lobby"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"gameroom"},"Room name"),t.createElement("input",{type:"text",name:"gameroom",id:"gameroom",autoFocus:!0,placeholder:" secret room"})),t.createElement("button",null,"Create"),t.createElement("div",{className:"gamerooms"},e.map((e=>t.createElement("div",{key:e._id,className:"gameroom"},t.createElement("div",null,e.name),t.createElement(n,{to:"/room/"+e._id},t.createElement("div",{className:"join"},"Join"))))))))}function h(e){return t.useEffect((()=>{localStorage.getItem("Auth_token")?e.history.push("/dashboard"):e.history.push("/login")}),[]),t.createElement("div",null,"Homepage")}function g({match:e}){return e.params.id,o("http://localhost:5000",{query:{token:localStorage.getItem("Auth_token")}}),t.createElement("div",null,"Okey!")}function v(){const[e,a]=r.exports.useState(0),[n,o]=r.exports.useState("");return t.createElement("div",{className:"App"},t.createElement("header",{className:"App-header"},t.createElement("p",null,"Hi, ",n),t.createElement("p",null,t.createElement("button",{onClick:()=>a((e=>e+1))},"test: ",e)),t.createElement("p",null,t.createElement("a",{className:"App-link",href:"https://vitejs.dev/guide/features.html",target:"_blank",rel:"noopener noreferrer"},"Vite"))))}function f(){return t.createElement(s,null,t.createElement(c,null,t.createElement(l,{path:"/",component:h,exact:!0}),t.createElement(l,{path:"/login",component:u,exact:!0}),t.createElement(l,{path:"/register",component:p,exact:!0}),t.createElement(l,{path:"/dashboard",component:E,exact:!0}),t.createElement(l,{path:"/test",component:v,exact:!0}),t.createElement(l,{path:"/room/:id",component:g,exact:!0})))}m.render(t.createElement(t.StrictMode,null,t.createElement(f,null)),document.getElementById("root"));
