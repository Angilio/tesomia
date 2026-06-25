import{j as e,u as g,r as d,H as N,L as x}from"./app-BpGU61_3.js";import{I as h}from"./InputError-Du4xPSDc.js";import{P as v}from"./PrimaryButton-CUTzBCfA.js";import{T as u}from"./TextInput-rIj4bONc.js";import{U as w}from"./users-Db2_eTtf.js";import{W as y}from"./wallet-M4zGt3Wz.js";import{C as S}from"./calendar-days-Bf2VRjIK.js";import{S as k}from"./shield-check-DRdn7ChK.js";import{A}from"./arrow-left-fF9e039p.js";import{M as C,S as M}from"./sun-COi5ikd8.js";import{M as E}from"./mail-DZTYnVkf.js";import{L as I}from"./lock-Cwg6voGO.js";import"./createLucideIcon-D74lDxxu.js";function T({className:t="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}function R({status:t,canResetPassword:a}){const{data:l,setData:r,post:p,processing:i,errors:o,reset:b}=g({email:"",password:"",remember:!1}),[c,m]=d.useState("light");d.useEffect(()=>{const s=localStorage.getItem("theme")||"light";m(s),document.documentElement.setAttribute("data-theme",s)},[]);const j=()=>{const s=c==="light"?"dark":"light";m(s),document.documentElement.setAttribute("data-theme",s),localStorage.setItem("theme",s)},f=s=>{s.preventDefault(),p(route("login"),{onFinish:()=>b("password")})};return e.jsxs(e.Fragment,{children:[e.jsx(N,{title:"Connexion"}),e.jsx("div",{className:"min-h-screen bg-base-200 flex items-center justify-center",children:e.jsxs("div",{className:"w-full min-h-screen grid grid-cols-1 lg:grid-cols-2",children:[e.jsxs("div",{className:`
                        hidden lg:flex
                        relative overflow-hidden
                        bg-gradient-to-br
                        from-green-600
                        via-blue-500
                        to-pink-500
                        text-white
                        items-center
                        justify-center
                        p-12
                    `,children:[e.jsx("div",{className:"absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/20 rounded-full blur-3xl"}),e.jsxs("div",{className:"relative z-10 max-w-xl",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("h1",{className:"text-5xl font-extrabold leading-tight",children:["Bienvenue sur ",e.jsx("br",{}),e.jsx("span",{className:"text-yellow-300",children:"TESOMIA"})]}),e.jsx("p",{className:"mt-5 text-lg text-white/90 leading-relaxed",children:"Gérez facilement les membres, les cotisations, les événements et les activités de votre association."})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-5",children:[e.jsx(n,{icon:e.jsx(w,{className:"w-9 h-9 mb-3"}),title:"Membres",text:"Gestion complète"}),e.jsx(n,{icon:e.jsx(y,{className:"w-9 h-9 mb-3"}),title:"Finances",text:"Suivi des cotisations"}),e.jsx(n,{icon:e.jsx(S,{className:"w-9 h-9 mb-3"}),title:"Événements",text:"Activités organisées"}),e.jsx(n,{icon:e.jsx(k,{className:"w-9 h-9 mb-3"}),title:"Sécurité",text:"Accès protégé"})]})]})]}),e.jsx("div",{className:"flex items-center justify-center px-6 py-10",children:e.jsxs("div",{className:"w-full max-w-md",children:[e.jsxs("div",{className:"flex items-center justify-between mb-5",children:[e.jsxs(x,{href:"/",className:"btn btn-ghost rounded-full",children:[e.jsx(A,{className:"w-4 h-4"}),"Accueil"]}),e.jsx("button",{onClick:j,className:"btn btn-circle btn-ghost",children:c==="light"?e.jsx(C,{className:"w-5 h-5"}):e.jsx(M,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"lg:hidden text-center mb-8",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-primary",children:"TESOMIA"}),e.jsx("p",{className:"text-base-content/60 mt-2",children:"Gestion interne de l'association"})]}),e.jsxs("div",{className:`
                                bg-base-100
                                rounded-3xl
                                shadow-2xl
                                border border-base-300
                                p-8
                            `,children:[e.jsxs("div",{className:"mb-8 text-center",children:[e.jsx("h2",{className:"text-3xl font-extrabold",children:"Se connecter"}),e.jsx("p",{className:"mt-2 text-base-content/60",children:"Accédez à votre espace de gestion"})]}),t&&e.jsx("div",{className:"alert alert-success mb-5",children:e.jsx("span",{children:t})}),e.jsxs("form",{onSubmit:f,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-semibold",children:"Adresse email"}),e.jsxs("div",{className:"relative",children:[e.jsx(E,{className:`
                                                absolute left-4 top-1/2
                                                -translate-y-1/2
                                                w-5 h-5 opacity-50
                                            `}),e.jsx(u,{id:"email",type:"email",name:"email",value:l.email,className:`
                                                    input input-bordered
                                                    w-full
                                                    pl-12
                                                    rounded-2xl
                                                `,autoComplete:"username",isFocused:!0,placeholder:"E-mail ou numéro de mobile",onChange:s=>r("email",s.target.value)})]}),e.jsx(h,{message:o.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-semibold",children:"Mot de passe"}),e.jsxs("div",{className:"relative",children:[e.jsx(I,{className:`
                                                absolute left-4 top-1/2
                                                -translate-y-1/2
                                                w-5 h-5 opacity-50
                                            `}),e.jsx(u,{id:"password",type:"password",name:"password",value:l.password,className:`
                                                    input input-bordered
                                                    w-full
                                                    pl-12
                                                    rounded-2xl
                                                `,autoComplete:"current-password",placeholder:"Mot de passe",onChange:s=>r("password",s.target.value)})]}),e.jsx(h,{message:o.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[e.jsx(T,{name:"remember",checked:l.remember,onChange:s=>r("remember",s.target.checked)}),e.jsx("span",{className:"text-sm opacity-70",children:"Se souvenir de moi"})]}),a&&e.jsx(x,{href:route("password.request"),className:"text-sm link link-hover text-primary",children:"Mot de passe oublié ?"})]}),e.jsx(v,{className:`
                                            btn btn-primary
                                            w-full
                                            rounded-2xl
                                            text-base
                                            border-none
                                        `,disabled:i,children:i?"Connexion...":"Se connecter"})]}),e.jsx("div",{className:"divider my-7",children:"TESOMIA"}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm opacity-60",children:"Plateforme sécurisée"}),e.jsx("p",{className:"mt-2 text-lg font-bold",children:"TESOMIA"})]})]})]})})]})})]})}function n({icon:t,title:a,text:l}){return e.jsxs("div",{className:`
            bg-white/15
            backdrop-blur-md
            rounded-3xl
            p-5
            shadow-lg
        `,children:[t,e.jsx("h3",{className:"font-bold",children:a}),e.jsx("p",{className:"text-sm text-white/80",children:l})]})}export{R as default};
