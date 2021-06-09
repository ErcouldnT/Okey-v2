import{S as e,R as t,D as a,L as r,i as n,a as o,B as s,b as l,c,d as m}from"./vendor.4ba86e08.js";const d=e.mixin({toast:!0,position:"top-end",showConfirmButton:!1,timer:3e3,timerProgressBar:!0,onOpen:t=>{t.addEventListener("mouseenter",e.stopTimer),t.addEventListener("mouseleave",e.resumeTimer)}}),u=(e,t)=>{d.fire({icon:e,title:t})};function i(e){const r=t.createRef(),n=t.createRef();return t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Login"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"player"},"Your name"),t.createElement("input",{type:"text",name:"text",id:"player",autoFocus:!0,placeholder:"ercode",ref:r})),t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"password"},"Password"),t.createElement("input",{type:"password",name:"password",id:"password",placeholder:"your password",ref:n})),t.createElement("button",{onClick:()=>{const t=r.current.value,o=n.current.value;a.post("/login",{name:t,password:o}).then((t=>{u("success",t.data.message),console.log(t.data),localStorage.setItem("Auth_token",t.data.token),e.history.push("/dashboard")})).catch((e=>{u("error",e.res.data.message)}))}},"Sign in")))}function p(e){const r=t.createRef(),n=t.createRef();return t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Register"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"player"},"Your name"),t.createElement("input",{type:"text",name:"text",id:"player",autoFocus:!0,placeholder:"ercode",ref:r})),t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"password"},"Password"),t.createElement("input",{type:"password",name:"password",id:"password",placeholder:"your password",ref:n})),t.createElement("button",{onClick:()=>{const t=r.current.value,o=n.current.value;a.post("/register",{name:t,password:o}).then((t=>{u("success",t.data.message),console.log(t.data),e.history.push("/login")})).catch((e=>{u("error",e.res.data.message)}))}},"Sign up")))}function E(){const[e,r]=t.useState([]),n=()=>{a.get("/rooms",{headers:{auth:localStorage.getItem("Auth_token")}}).then((e=>{console.log(e.data),r(e.data)})).catch((e=>{setTimeout(n,3e3)}))};return t.useEffect((()=>{n()}),[]),t.createElement("div",{className:"card"},t.createElement("div",{className:"cardHeader"},"Lobby"),t.createElement("div",{className:"cardBody"},t.createElement("div",{className:"inputGroup"},t.createElement("label",{htmlFor:"gameroom"},"Room name"),t.createElement("input",{type:"text",name:"gameroom",id:"gameroom",autoFocus:!0,placeholder:"secret room"})),t.createElement("button",null,"Create"),t.createElement("div",{className:"gamerooms"},[{_id:"1",name:"erkuttss"},{_id:"2",name:"erkuasdfsttss"}].map((e=>{e._id,e.name,e._id})))))}function h(e){return t.useEffect((()=>{localStorage.getItem("Auth_token")?e.history.push("/dashboard"):e.history.push("/login")}),[]),t.createElement("div",null,"Homepage")}function g({match:e}){return e.params.id,n("http://localhost:5000",{query:{token:localStorage.getItem("Auth_token")}}),t.createElement("div",null,"Okey!")}function v(){const[e,a]=o.exports.useState(0),[r,n]=o.exports.useState("");return t.createElement("div",{className:"App"},t.createElement("header",{className:"App-header"},t.createElement("p",null,"Hi, ",r),t.createElement("p",null,t.createElement("button",{onClick:()=>a((e=>e+1))},"test: ",e)),t.createElement("p",null,t.createElement("a",{className:"App-link",href:"https://vitejs.dev/guide/features.html",target:"_blank",rel:"noopener noreferrer"},"Vite"))))}function f(){return t.createElement(s,null,t.createElement(l,null,t.createElement(c,{path:"/",component:h,exact:!0}),t.createElement(c,{path:"/login",component:i,exact:!0}),t.createElement(c,{path:"/register",component:p,exact:!0}),t.createElement(c,{path:"/dashboard",component:E,exact:!0}),t.createElement(c,{path:"/test",component:v,exact:!0}),t.createElement(c,{path:"/room/:id",component:g,exact:!0})))}m.render(t.createElement(t.StrictMode,null,t.createElement(f,null)),document.getElementById("root"));